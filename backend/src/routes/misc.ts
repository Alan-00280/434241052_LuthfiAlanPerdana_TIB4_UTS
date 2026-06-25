import { OpenAPIHono } from "@hono/zod-openapi";
import {
	createAttachmentRoute,
	createCategoryRoute,
	deleteAttachmentRoute,
	deleteCategoryRoute,
	getAttachmentsRoute,
	getCategoriesRoute,
	getHistoriesRoute,
	getNotificationsRoute,
	readAllNotificationsRoute,
	readNotificationRoute,
	updateCategoryRoute,
} from "../docs/misc.openapi.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { uploadAttachments } from "../lib/attachment.js";
import { requireRole } from "../lib/rbac.js";
import { supabase } from "../lib/supabase.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

// ─────────────────────────────────────────
// ATTACHMENTS
// ─────────────────────────────────────────

export const attachments = new OpenAPIHono<ContextWithPrisma>();

// GET /tickets/:ticketId/attachments — list attachment tiket
attachments.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
attachments.openapi(getAttachmentsRoute, async (c) => {
	const prisma = c.get("prisma");
	const ticketId = c.req.param("ticketId");

	const data = await prisma.attachment.findMany({
		where: { ticketId },
		orderBy: { uploadedAt: "desc" },
	});

	return c.json({ attachments: data });
});

// POST /tickets/:ticketId/attachments — tambah attachment (FR-005)
attachments.post("/", requireRole("USER"));
attachments.openapi(createAttachmentRoute, async (c) => {
	const prisma = c.get("prisma");
	const ticketId = c.req.param("ticketId");
	const formData = await c.req.formData();

	const changedById = formData.get("changedById") as string;
	if (!changedById) return c.json({ error: "Changed by Id Wajib di isi" }, 401);

	if (!ticketId) {
		return c.json({ error: "ticketId wajib ada" }, 400);
	}

	const files = formData.getAll("attachments") as File[];

	if (!files || files.length === 0) {
		return c.json({ error: "File wajib diupload" }, 400);
	}

	const ticket = await prisma.ticket.findUnique({
		where: { id: ticketId },
	});

	if (!ticket) {
		return c.json({ error: "Ticket tidak ditemukan" }, 404);
	}

	const currentAttch = await prisma.attachment.findMany({
		where: { ticketId },
		orderBy: { uploadedAt: "desc" },
	});

	try {
		const uploadedFiles = await uploadAttachments({
			files,
			userId: ticket.creatorId,
			ticketId,
		});

		const attachmentsData = await prisma.attachment.createMany({
			data: uploadedFiles,
		});

		// 4. history
		await prisma.ticketHistory.create({
			data: {
				ticketId,
				changedById,
				field: "add_attachment",
				oldValue: currentAttch.length.toString(),
				newValue: attachmentsData.count.toString(),
				note: `Menambah Attachments`,
			},
		});

		return c.json(
			{
				message: "Attachment berhasil diupload",
				count: attachmentsData.count,
			},
			201,
		);
	} catch (err: unknown) {
		return c.json(
			{ error: err instanceof Error ? err.message : String(err) },
			500,
		);
	}
});

// DELETE /tickets/:ticketId/attachments/:id — hapus attachment
attachments.delete("/:id", requireRole("USER"));
attachments.openapi(deleteAttachmentRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { changedById } = body;
	if (!changedById) return c.json({ error: "Changed by Id Wajib di isi" }, 401);

	// 1. Ambil data attachment dulu
	const attachment = await prisma.attachment.findUnique({
		where: { id },
	});

	if (!attachment) {
		return c.json({ error: "Attachment tidak ditemukan" }, 404);
	}

	// 2. Hapus file di Supabase Storage
	const { error: storageError } = await supabase.storage
		.from("tickets")
		.remove([attachment.fileUrl]); // fileUrl = path saat upload

	if (storageError && !storageError.message.includes("not found")) {
		return c.json({ error: storageError.message }, 500);
	}

	// 3. Hapus record di PostgreSQL (via Prisma)
	await prisma.attachment.delete({
		where: { id },
	});

	// 4. history
	await prisma.ticketHistory.create({
		data: {
			ticketId: attachment.ticketId,
			changedById,
			field: "delete_attachment",
			oldValue: attachment.fileName,
			newValue: null,
			note: `Menghapus Attachment ${attachment.fileName}`,
		},
	});

	return c.json({ message: "Attachment berhasil dihapus" });
});

// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────

export const notifications = new OpenAPIHono<ContextWithPrisma>();

// GET /notifications?userId= — list notifikasi user (FR-007)
notifications.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
notifications.openapi(getNotificationsRoute, async (c) => {
	const prisma = c.get("prisma");
	let userId = c.req.query("userId");
	const supaId = c.req.query("supaId");
	const unreadOnly = c.req.query("unread") === "true";

	if (!userId) return c.json({ error: "userId wajib diisi" }, 400);
	if (supaId) {
		const user = await prisma.user.findUnique({
			where: {
				supabaseUid: userId,
			},
			select: {
				id: true, // Kita hanya mengambil kolom id saja
			},
		});

		if (user) {
			userId = user.id;
		} else {
			return c.json({ error: "User not found. supa id = true" }, 404);
		}
	}

	const data = await prisma.notification.findMany({
		where: {
			userId,
			...(unreadOnly && { isRead: false }),
		},
		include: {
			ticket: { select: { id: true, title: true, status: true } },
		},
		orderBy: { createdAt: "desc" },
	});

	const unreadCount = await prisma.notification.count({
		where: { userId, isRead: false },
	});

	return c.json({ notifications: data, unreadCount });
});

// PATCH /notifications/:id/read — tandai satu notifikasi sudah dibaca (FR-007)
notifications.patch("/:id/read", requireRole("ADMIN", "HELPDESK", "USER"));
notifications.openapi(readNotificationRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	const notification = await prisma.notification.update({
		where: { id },
		data: { isRead: true, readAt: new Date() },
	});

	return c.json({ notification });
});

// PATCH /notifications/read-all — tandai semua notifikasi dibaca
notifications.patch("/read-all", requireRole("ADMIN", "HELPDESK", "USER"));
notifications.openapi(readAllNotificationsRoute, async (c) => {
	const prisma = c.get("prisma");
	const body = await c.req.json();
	const { userId } = body;

	if (!userId) return c.json({ error: "userId wajib diisi" }, 400);

	await prisma.notification.updateMany({
		where: { userId, isRead: false },
		data: { isRead: true, readAt: new Date() },
	});

	return c.json({ message: "Semua notifikasi telah ditandai dibaca" });
});

// ─────────────────────────────────────────
// TICKET CATEGORIES
// ─────────────────────────────────────────

export const categories = new OpenAPIHono<ContextWithPrisma>();

// GET /categories — list semua kategori
categories.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
categories.openapi(getCategoriesRoute, async (c) => {
	const prisma = c.get("prisma");
	const data = await prisma.ticketCategory.findMany({
		orderBy: { name: "asc" },
	});
	return c.json({ categories: data });
});

// POST /categories — buat kategori baru (admin)
categories.post("/", requireRole("ADMIN", "HELPDESK", "USER"));
categories.openapi(createCategoryRoute, async (c) => {
	const prisma = c.get("prisma");
	const body = await c.req.json();

	const { name, description } = body;
	if (!name) return c.json({ error: "name wajib diisi" }, 400);

	const category = await prisma.ticketCategory.create({
		data: { name, description },
	});

	return c.json({ category }, 201);
});

// PUT /categories/:id — update kategori
categories.put("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
categories.openapi(updateCategoryRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const category = await prisma.ticketCategory.update({
		where: { id },
		data: { name: body.name, description: body.description },
	});

	return c.json({ category });
});

// DELETE /categories/:id — hapus kategori
categories.delete("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
categories.openapi(deleteCategoryRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	await prisma.ticketCategory.delete({ where: { id } });
	return c.json({ message: "Kategori berhasil dihapus" });
});

// ─────────────────────────────────────────
// TICKET HISTORY (tracking FR-010, FR-011)
// ─────────────────────────────────────────

export const histories = new OpenAPIHono<ContextWithPrisma>();

// GET /tickets/:ticketId/histories — riwayat lengkap tiket
histories.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
histories.openapi(getHistoriesRoute, async (c) => {
	const prisma = c.get("prisma");
	const ticketId = c.req.param("ticketId");

	const data = await prisma.ticketHistory.findMany({
		where: { ticketId },
		include: {
			changedBy: {
				select: { id: true, fullName: true, role: true, avatarUrl: true },
			},
		},
		orderBy: { createdAt: "desc" },
	});

	return c.json({ histories: data });
});
