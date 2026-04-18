import { Hono } from "hono";
import type { PrismaClient } from "../generated/prisma/client.js";
import { TicketPriority, TicketStatus } from "../generated/prisma/enums.js";
import { requireRole } from "../lib/rbac.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const tickets = new Hono<ContextWithPrisma>();

// GET /tickets — list tiket
// - user biasa: hanya tiket miliknya
// - helpdesk/admin: semua tiket
// Query params: status, priority, categoryId, assigneeId, page, limit
tickets.get("/", requireRole("ADMIN", "HELPDESK", "USER"), async (c) => {
	const prisma = c.get("prisma");

	const status = c.req.query("status") as TicketStatus | undefined;
	const priority = c.req.query("priority") as TicketPriority | undefined;
	const categoryId = c.req.query("categoryId");
	const assigneeId = c.req.query("assigneeId");
	const creatorId = c.req.query("creatorId");
	const page = parseInt(c.req.query("page") ?? "1", 10);
	const limit = parseInt(c.req.query("limit") ?? "10", 10);
	const skip = (page - 1) * limit;

	const where = {
		...(status && { status }),
		...(priority && { priority }),
		...(categoryId && { categoryId }),
		...(assigneeId && { assigneeId }),
		...(creatorId && { creatorId }),
	};

	const [tickets, total] = await Promise.all([
		prisma.ticket.findMany({
			where,
			skip,
			take: limit,
			orderBy: { createdAt: "desc" },
			include: {
				creator: { select: { id: true, fullName: true, avatarUrl: true } },
				assignee: { select: { id: true, fullName: true, avatarUrl: true } },
				category: { select: { id: true, name: true } },
				attachments: true,
				_count: { select: { comments: true } },
			},
		}),
		prisma.ticket.count({ where }),
	]);

	return c.json({
		tickets,
		meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
	});
});

// GET /tickets/stats — statistik tiket untuk dashboard (FR-008)
tickets.get("/stats", requireRole("ADMIN", "HELPDESK"), async (c) => {
	const prisma = c.get("prisma");

	const [total, open, inProgress, pending, resolved, closed] =
		await Promise.all([
			prisma.ticket.count(),
			prisma.ticket.count({ where: { status: "OPEN" } }),
			prisma.ticket.count({ where: { status: "IN_PROGRESS" } }),
			prisma.ticket.count({ where: { status: "PENDING" } }),
			prisma.ticket.count({ where: { status: "RESOLVED" } }),
			prisma.ticket.count({ where: { status: "CLOSED" } }),
		]);

	return c.json({
		stats: { total, open, inProgress, pending, resolved, closed },
	});
});

// GET /tickets/:id — detail tiket (FR-005)
tickets.get("/:id", requireRole("ADMIN", "HELPDESK", "USER"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	const ticket = await prisma.ticket.findUnique({
		where: { id },
		include: {
			creator: {
				select: { id: true, fullName: true, avatarUrl: true, email: true },
			},
			assignee: {
				select: { id: true, fullName: true, avatarUrl: true, email: true },
			},
			category: true,
			attachments: true,
			comments: {
				include: {
					author: {
						select: { id: true, fullName: true, avatarUrl: true, role: true },
					},
				},
				orderBy: { createdAt: "asc" },
			},
			histories: {
				include: {
					changedBy: { select: { id: true, fullName: true, role: true } },
				},
				orderBy: { createdAt: "asc" },
			},
		},
	});

	if (!ticket) return c.json({ error: "Tiket tidak ditemukan" }, 404);
	return c.json({ ticket });
});

// POST /tickets — buat tiket baru (FR-005)
tickets.post("/", requireRole("USER"), async (c) => {
	const prisma = c.get("prisma");
	const body = await c.req.json();

	const { title, description, priority, categoryId, creatorId, attachments } =
		body;

	if (!title || !description || !creatorId) {
		return c.json(
			{ error: "title, description, dan creatorId wajib diisi" },
			400,
		);
	}

	const ticket = await prisma.ticket.create({
		data: {
			title,
			description,
			priority: priority ?? TicketPriority.MEDIUM,
			creatorId,
			categoryId: categoryId ?? null,

			...(attachments?.length && {
				attachments: {
					create: attachments.map((file: any) => ({
						fileName: file.fileName,
						fileUrl: file.fileUrl,
						fileSize: file.fileSize,
						mimeType: file.mimeType,
					})),
				},
			}),
		},
		include: {
			creator: { select: { id: true, fullName: true } },
			category: { select: { id: true, name: true } },
			attachments: true,
		},
	});

	await prisma.ticketHistory.create({
		data: {
			ticketId: ticket.id,
			changedById: creatorId,
			field: "status",
			oldValue: null,
			newValue: TicketStatus.OPEN,
			note: "Tiket dibuat",
		},
	});

	return c.json({ ticket }, 201);
});

// PUT /tickets/:id — update tiket (FR-006)
tickets.put("/:id", requireRole("ADMIN", "HELPDESK"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { title, description, priority, categoryId, attachments } = body;

	const ticket = await prisma.ticket.update({
		where: { id },
		data: {
			...(title && { title }),
			...(description && { description }),
			...(priority && { priority }),
			...(categoryId && { categoryId }),

			...(attachments?.length && {
				attachments: {
					create: attachments.map((file: any) => ({
						fileName: file.fileName,
						fileUrl: file.fileUrl,
						fileSize: file.fileSize,
						mimeType: file.mimeType,
					})),
				},
			}),
		},
		include: {
			attachments: true,
		},
	});

	return c.json({ ticket });
});
// PATCH /tickets/:id/status — update status tiket (FR-006)
tickets.patch("/:id/status", requireRole("ADMIN", "HELPDESK"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { status, changedById, note } = body;

	if (!status || !changedById) {
		return c.json({ error: "status dan changedById wajib diisi" }, 400);
	}

	const existing = await prisma.ticket.findUnique({ where: { id } });
	if (!existing) return c.json({ error: "Tiket tidak ditemukan" }, 404);

	const now = new Date();
	const ticket = await prisma.ticket.update({
		where: { id },
		data: {
			status,
			...(status === "RESOLVED" && { resolvedAt: now }),
			...(status === "CLOSED" && { closedAt: now }),
		},
	});

	// Catat history
	await prisma.ticketHistory.create({
		data: {
			ticketId: id,
			changedById,
			field: "status",
			oldValue: existing.status,
			newValue: status,
			note: note ?? null,
		},
	});

	// Kirim notifikasi ke creator
	await prisma.notification.create({
		data: {
			userId: existing.creatorId,
			ticketId: id,
			type:
				status === "RESOLVED"
					? "TICKET_RESOLVED"
					: status === "CLOSED"
						? "TICKET_CLOSED"
						: "TICKET_STATUS_UPDATED",
			title: "Status tiket diperbarui",
			body: `Tiket "${existing.title}" sekarang berstatus ${status}.`,
		},
	});

	return c.json({ ticket });
});

// PATCH /tickets/:id/assign — assign tiket ke helpdesk (FR-006)
tickets.patch("/:id/assign", requireRole("ADMIN", "HELPDESK"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { assigneeId, changedById } = body;

	if (!assigneeId || !changedById) {
		return c.json({ error: "assigneeId dan changedById wajib diisi" }, 400);
	}

	const existing = await prisma.ticket.findUnique({
		where: { id },
		include: { assignee: { select: { fullName: true } } },
	});
	if (!existing) return c.json({ error: "Tiket tidak ditemukan" }, 404);

	const assignee = await prisma.user.findUnique({ where: { id: assigneeId } });
	if (!assignee) return c.json({ error: "Assignee tidak ditemukan" }, 404);

	const ticket = await prisma.ticket.update({
		where: { id },
		data: { assigneeId },
		include: {
			assignee: { select: { id: true, fullName: true } },
		},
	});

	// Catat history
	await prisma.ticketHistory.create({
		data: {
			ticketId: id,
			changedById,
			field: "assignee",
			oldValue: existing.assignee?.fullName ?? null,
			newValue: assignee.fullName,
			note: "Tiket di-assign",
		},
	});

	// Notifikasi ke assignee baru
	await prisma.notification.create({
		data: {
			userId: assigneeId,
			ticketId: id,
			type: "TICKET_ASSIGNED",
			title: "Tiket baru di-assign ke kamu",
			body: `Kamu mendapat tiket: "${existing.title}"`,
		},
	});

	return c.json({ ticket });
});

// DELETE /tickets/:id — hapus tiket (admin only)
tickets.delete("/:id", requireRole("ADMIN"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	await prisma.ticket.delete({ where: { id } });
	return c.json({ message: "Tiket berhasil dihapus" });
});

export default tickets;
