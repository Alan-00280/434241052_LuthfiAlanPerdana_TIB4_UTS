// import { Hono } from "hono";

import { OpenAPIHono } from "@hono/zod-openapi";
import {
	assignTicketRoute,
	createTicketRoute,
	deleteTicketRoute,
	getStatsRoute,
	getTicketDetailRoute,
	getTicketsRoute,
	updateTicketRoute,
	updateTicketStatusRoute,
} from "../docs/ticket.openapi.js";
import type { Prisma, PrismaClient, User } from "../generated/prisma/client.js";
import { TicketPriority, TicketStatus } from "../generated/prisma/enums.js";
import { uploadAttachments } from "../lib/attachment.js";
import { requireRole } from "../lib/rbac.js";
import { insertNotifications } from "../../supabase/repository/insert.js";
import { supabase } from "../lib/supabase.js";
import { selectTicketComments } from "../../supabase/repository/index.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
		user: User;
		role: string;
	};
};

const tickets = new OpenAPIHono<ContextWithPrisma>();

// GET /tickets — List tiket berdasarkan role-based flow diagram
// Query params: status, priority, categoryId, search, page, limit
// tickets.get("/", requireRole("ADMIN", "HELPDESK", "USER"), async (c) => {
//     const prisma = c.get("prisma");
//     const currentUser = c.get("user") // Ambil data user dari middleware auth

//     // Ambil semua filter dari Query Parameters
//     const statusParam = c.req.query("status") as TicketStatus | undefined;
//     const priority = c.req.query("priority") as TicketPriority | undefined;
//     const categoryId = c.req.query("categoryId");
//     const search = c.req.query("search");

//     const page = parseInt(c.req.query("page") ?? "1", 10);
//     const limit = parseInt(c.req.query("limit") ?? "10", 10);
//     const skip = (page - 1) * limit;

//     // ─── IMPLEMENTASI LOGIKA DIAGRAM (DI SINI KUNCINYA) ──────────────────────
//     let roleCondition: any = {};

//     if (currentUser.role === "ADMIN") {
//         // Admin -> SELECT Ticket ALL (tanpa batasan kepemilikan)
//         roleCondition = {};
//     }
//     else if (currentUser.role === "HELPDESK") {
//         // Helpdesk -> (Assignee_ID = milik sendiri) OR (Status = OPEN)
//         roleCondition = {
//             OR: [
//                 { assigneeId: currentUser.id },
//                 { status: "OPEN" }
//             ]
//         };
//     }
//     else {
//         // User Biasa -> Hanya tiket yang dibuat oleh dirinya sendiri
//         roleCondition = { creatorId: currentUser.id };
//     }
//     // ─────────────────────────────────────────────────────────────────────────

//     // Gabungkan filter pencarian/kategori dengan aturan role di atas
//     const where = {
//         ...roleCondition,
//         ...(statusParam && { status: statusParam }),
//         ...(priority && { priority }),
//         ...(categoryId && { categoryId }),
//         ...(search && {
//             OR: [
//                 { title: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//                 { description: { contains: search, mode: "insensitive" as Prisma.QueryMode } },
//             ],
//         }),
//     };

//     const [tickets, total] = await Promise.all([
//         prisma.ticket.findMany({
//             where,
//             skip,
//             take: limit,
//             orderBy: { createdAt: "desc" },
//             include: {
//                 creator: { select: { id: true, fullName: true, avatarUrl: true } },
//                 assignee: { select: { id: true, fullName: true, avatarUrl: true } },
//                 category: { select: { id: true, name: true } },
//                 attachments: true,
//                 _count: { select: { comments: true } },
//             },
//         }),
//         prisma.ticket.count({ where }),
//     ]);

//     return c.json({
//         tickets,
//         meta: {
//             total,
//             page,
//             limit,
//             totalPages: Math.ceil(total / limit),
//             hasNextPage: page * limit < total,
//         },
//     });
// });

tickets.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
tickets.openapi(getTicketsRoute, async (c) => {
	const prisma = c.get("prisma");
	const currentUser = c.get("user"); // Ambil data user dari middleware auth

	// Ambil semua filter dari Query Parameters
	const statusParam = c.req.query("status") as TicketStatus | undefined;
	const priority = c.req.query("priority") as TicketPriority | undefined;
	const categoryId = c.req.query("categoryId");
	const search = c.req.query("search");

	const page = parseInt(c.req.query("page") ?? "1", 10);
	const limit = parseInt(c.req.query("limit") ?? "10", 10);
	const skip = (page - 1) * limit;

	// ─── IMPLEMENTASI LOGIKA DIAGRAM (DI SINI KUNCINYA) ──────────────────────
	let roleCondition: Prisma.TicketWhereInput = {};

	if (currentUser.role === "ADMIN") {
		// Admin -> SELECT Ticket ALL (tanpa batasan kepemilikan)
		roleCondition = {};
	} else if (currentUser.role === "HELPDESK") {
		// Helpdesk -> (Assignee_ID = milik sendiri) OR (Status = OPEN)
		roleCondition = {
			OR: [{ assigneeId: currentUser.id }, { status: "OPEN" }],
		};
	} else {
		// User Biasa -> Hanya tiket yang dibuat oleh dirinya sendiri
		roleCondition = { creatorId: currentUser.id };
	}
	// ─────────────────────────────────────────────────────────────────────────

	// Gabungkan filter pencarian/kategori dengan aturan role di atas
	const where = {
		...roleCondition,
		...(statusParam && { status: statusParam }),
		...(priority && { priority }),
		...(categoryId && { categoryId }),
		...(search && {
			OR: [
				{
					title: { contains: search, mode: "insensitive" as Prisma.QueryMode },
				},
				{
					description: {
						contains: search,
						mode: "insensitive" as Prisma.QueryMode,
					},
				},
			],
		}),
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
				attachments: true
				// _count: { select: { comments: true } },
			},
		}),
		prisma.ticket.count({ where }),
	]);

	return c.json({
		tickets,
		meta: {
			total,
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			hasNextPage: page * limit < total,
		},
	});
});

// GET /tickets/stats — statistik tiket untuk dashboard (FR-008)
tickets.get("/stats", requireRole("ADMIN", "HELPDESK", "USER"));
tickets.openapi(getStatsRoute, async (c) => {
	const prisma = c.get("prisma");
	const currentUser = c.get("user"); // Ambil user dari middleware context

	// ─── IMPLEMENTASI LOGIKA FILTER BERDASARKAN ROLE ─────────────────────────
	let roleCondition: Prisma.TicketWhereInput = {};

	if (currentUser.role === "ADMIN") {
		// Admin: Bisa melihat statistik seluruh tiket di sistem
		roleCondition = {};
	} else if (currentUser.role === "HELPDESK") {
		// Helpdesk: Statistik menghitung tiket yang di-assign ke dirinya ATAU yang statusnya masih OPEN
		roleCondition = {
			OR: [{ assigneeId: currentUser.id }, { status: "OPEN" }],
		};
	} else {
		// User Biasa: PAKSA hanya menghitung statistik tiket miliknya sendiri
		roleCondition = { creatorId: currentUser.id };
	}
	// ─────────────────────────────────────────────────────────────────────────

	// Hitung seluruh status secara paralel memanfaatkan base filter roleCondition di atas
	const [total, open, inProgress, pending, resolved, closed] =
		await Promise.all([
			prisma.ticket.count({
				where: roleCondition,
			}),
			prisma.ticket.count({
				where: { ...roleCondition, status: "OPEN" },
			}),
			prisma.ticket.count({
				where: { ...roleCondition, status: "IN_PROGRESS" },
			}),
			prisma.ticket.count({
				where: { ...roleCondition, status: "PENDING" },
			}),
			prisma.ticket.count({
				where: { ...roleCondition, status: "RESOLVED" },
			}),
			prisma.ticket.count({
				where: { ...roleCondition, status: "CLOSED" },
			}),
		]);

	return c.json({
		stats: { total, open, inProgress, pending, resolved, closed },
		filteredBy: currentUser.role, // Berikan info role apa yang sedang menyaring data ini
	});
});

// GET /tickets/:id — detail tiket (FR-005)
tickets.get("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
tickets.openapi(getTicketDetailRoute, async (c) => {
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
			techSupport: {
				include: {
					user: {
						select: { id: true, fullName: true, avatarUrl: true, email: true },
					},
				},
			},
			category: true,
			attachments: true,
			histories: {
				include: {
					changedBy: { select: { id: true, fullName: true, role: true } },
				},
				orderBy: { createdAt: "asc" },
			},
		},
	});

	if (!ticket) return c.json({ error: "Tiket tidak ditemukan" }, 404);

	// Ambil data komentar dari Supabase
	const commentsData = await selectTicketComments(supabase, { ticketId: id });

	// Ambil detail author komentar dari Prisma & gabungkan di memori
	let commentsWithAuthor: any[] = [];
	if (commentsData && commentsData.length > 0) {
		const authorIds = Array.from(new Set(commentsData.map((comment) => comment.authorId)));
		const authors = await prisma.user.findMany({
			where: { id: { in: authorIds } },
			select: { id: true, fullName: true, avatarUrl: true, role: true },
		});
		const authorMap = new Map(authors.map((a) => [a.id, a]));

		commentsWithAuthor = commentsData
			.map((comment) => ({
				...comment,
				author: authorMap.get(comment.authorId) || null,
			}))
			// Urutkan berdasarkan createdAt asc
			.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
	}

	const ticketWithComments = {
		...ticket,
		comments: commentsWithAuthor,
	};

	return c.json({ ticket: ticketWithComments });
});

// POST /tickets — buat tiket baru (FR-005)
tickets.post("/", requireRole("USER"));
tickets.openapi(createTicketRoute, async (c) => {
	const prisma = c.get("prisma");

	const contentType = c.req.header("content-type") || "";
	let title: string;
	let description: string;
	let creatorId: string;
	let priority: TicketPriority;
	let categoryId: string | null = null;
	let files: File[] = [];

	if (
		contentType.includes("multipart/form-data") ||
		contentType.includes("application/x-www-form-urlencoded")
	) {
		const formData = await c.req.formData();
		title = formData.get("title") as string;
		description = formData.get("description") as string;
		creatorId = formData.get("creatorId") as string;
		priority = formData.get("priority") as TicketPriority;
		categoryId = formData.get("categoryId") as string | null;

		const rawFiles = formData.getAll("attachments");
		files = rawFiles.filter(
			(file): file is File =>
				typeof file === "object" &&
				file !== null &&
				file.name !== "" &&
				file.size > 0,
		);
	} else {
		const body = await c.req.json();
		title = body.title;
		description = body.description;
		creatorId = body.creatorId;
		priority = body.priority;
		categoryId = body.categoryId;
	}

	if (!title || !description || !creatorId) {
		return c.json(
			{ error: "title, description, dan creatorId wajib diisi" },
			400,
		);
	}

	// 1. Create ticket dulu
	const ticket = await prisma.ticket.create({
		data: {
			title,
			description,
			priority: priority ?? TicketPriority.MEDIUM,
			creatorId,
			categoryId: categoryId ?? null,
		},
	});

	let uploadedFiles: Prisma.AttachmentCreateManyInput[] = [];

	// 2. Upload attachments (optional)
	if (files.length > 0) {
		try {
			uploadedFiles = await uploadAttachments({
				files,
				userId: creatorId,
				ticketId: ticket.id,
			});

			await prisma.attachment.createMany({
				data: uploadedFiles,
			});
		} catch (err: unknown) {
			return c.json(
				{ error: err instanceof Error ? err.message : String(err) },
				500,
			);
		}
	}

	// 3. Ticket history
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

	// 4. Return full data
	const result = await prisma.ticket.findUnique({
		where: { id: ticket.id },
		include: {
			creator: { select: { id: true, fullName: true } },
			category: { select: { id: true, name: true } },
			attachments: true,
		},
	});

	return c.json({ ticket: result }, 201);
});

// PUT /tickets/:id — update tiket (FR-006)
tickets.put("/:id", requireRole("USER"));
tickets.openapi(updateTicketRoute, async (c) => {
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
					create: attachments.map(
						(file: {
							fileName: string;
							fileUrl: string;
							fileSize: number;
							mimeType: string;
						}) => ({
							fileName: file.fileName,
							fileUrl: file.fileUrl,
							fileSize: file.fileSize,
							mimeType: file.mimeType,
						}),
					),
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
tickets.patch("/:id/status", requireRole("ADMIN", "HELPDESK"));
tickets.openapi(updateTicketStatusRoute, async (c) => {
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
	await insertNotifications(supabase,
		{
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
	);

	return c.json({ ticket });
});

// PATCH /tickets/:id/assign — assign tiket ke helpdesk (FR-007) ==> [*UPDATE] assign ke tech support
tickets.patch("/:id/assign", requireRole("ADMIN", "HELPDESK"));
tickets.openapi(assignTicketRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { assigneeId, changedById, techSupportId } = body;

	if (!assigneeId || !changedById || !techSupportId) {
		return c.json(
			{ error: "assigneeId dan changedById dan techSupportId wajib diisi" },
			400,
		);
	}

	const existing = await prisma.ticket.findUnique({
		where: { id },
		include: { assignee: { select: { fullName: true } } },
	});
	if (!existing) return c.json({ error: "Tiket tidak ditemukan" }, 404);

	const assignee = await prisma.user.findUnique({ where: { id: assigneeId } });
	if (!assignee) return c.json({ error: "Assignee tidak ditemukan" }, 404);

	const techSupport = await prisma.techSupport.findUnique({
		where: { userId: techSupportId },
	});
	if (!techSupport)
		return c.json({ error: "Tech Support tidak ditemukan" }, 404);

	const ticket = await prisma.ticket.update({
		where: { id },
		data: {
			assigneeId,
			techSupportId: techSupport.id,
			status: TicketStatus.IN_PROGRESS,
		},
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

	// Notifikasi ke tech support baru
	await insertNotifications(supabase,
		{
			userId: techSupportId,
			ticketId: id,
			type: "TICKET_ASSIGNED",
			title: "Tiket baru di-assign ke kamu",
			body: `Kamu mendapat tiket: "${existing.title}"`,
		},
	);

	return c.json({ ticket });
});

// DELETE /tickets/:id — hapus tiket (admin only)
tickets.delete("/:id", requireRole("ADMIN"));
tickets.openapi(deleteTicketRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	await prisma.ticket.delete({ where: { id } });
	return c.json({ message: "Tiket berhasil dihapus" });
});

export default tickets;
