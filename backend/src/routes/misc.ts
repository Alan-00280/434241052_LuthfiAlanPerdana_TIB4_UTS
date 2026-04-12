import { Hono } from "hono";
import withPrisma from "../lib/prisma.js";
import type { PrismaClient } from "../generated/prisma/client.js";

// ─────────────────────────────────────────
// ATTACHMENTS
// ─────────────────────────────────────────

type ContextWithPrisma = {
  Variables: {
    prisma: PrismaClient; 
  }; 
}; 

export const attachments = new Hono<ContextWithPrisma>(); 

// GET /tickets/:ticketId/attachments — list attachment tiket
attachments.get("/", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const ticketId = c.req.param("ticketId");

  const data = await prisma.attachment.findMany({
    where: { ticketId },
    orderBy: { uploadedAt: "desc" },
  });

  return c.json({ attachments: data });
});

// POST /tickets/:ticketId/attachments — tambah attachment (FR-005)
// Catatan: fileUrl diasumsikan sudah diupload ke Supabase Storage duluan,
// lalu URL-nya dikirim ke endpoint ini untuk disimpan ke DB
// attachments.post("/", withPrisma, async (c) => {
//   const prisma = c.get("prisma");
//   const ticketId = c.req.param("ticketId");
//   const body = await c.req.json();

//   const { fileName, fileUrl, fileSize, mimeType, source } = body;

//   if (!fileName || !fileUrl || !fileSize || !mimeType) {
//     return c.json({ error: "fileName, fileUrl, fileSize, dan mimeType wajib diisi" }, 400);
//   }

//   const attachment = await prisma.attachment.create({
//     data: {
//       ticketId,
//       fileName,
//       fileUrl,
//       fileSize,
//       mimeType,
//       source: source ?? "UPLOAD",
//     },
//   });

//   return c.json({ attachment }, 201);
// });

// DELETE /tickets/:ticketId/attachments/:id — hapus attachment
attachments.delete("/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const { id } = c.req.param();

  await prisma.attachment.delete({ where: { id } });
  return c.json({ message: "Attachment berhasil dihapus" });
});

// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────

export const notifications = new Hono<ContextWithPrisma>(); 

// GET /notifications?userId= — list notifikasi user (FR-007)
notifications.get("/", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const userId  = c.req.query("userId");
  const unreadOnly = c.req.query("unread") === "true";

  if (!userId) return c.json({ error: "userId wajib diisi" }, 400);

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
notifications.patch("/:id/read", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const { id } = c.req.param();

  const notification = await prisma.notification.update({
    where: { id },
    data: { isRead: true, readAt: new Date() },
  });

  return c.json({ notification });
});

// PATCH /notifications/read-all — tandai semua notifikasi dibaca
notifications.patch("/read-all", withPrisma, async (c) => {
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

export const categories = new Hono<ContextWithPrisma>(); 

// GET /categories — list semua kategori
categories.get("/", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const data = await prisma.ticketCategory.findMany({
    orderBy: { name: "asc" },
  });
  return c.json({ categories: data });
});

// POST /categories — buat kategori baru (admin)
categories.post("/", withPrisma, async (c) => {
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
categories.put("/:id", withPrisma, async (c) => {
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
categories.delete("/:id", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const { id } = c.req.param();

  await prisma.ticketCategory.delete({ where: { id } });
  return c.json({ message: "Kategori berhasil dihapus" });
});

// ─────────────────────────────────────────
// TICKET HISTORY (tracking FR-010, FR-011)
// ─────────────────────────────────────────

export const histories = new Hono<ContextWithPrisma>(); 

// GET /tickets/:ticketId/histories — riwayat lengkap tiket
histories.get("/", withPrisma, async (c) => {
  const prisma = c.get("prisma");
  const ticketId = c.req.param("ticketId");

  const data = await prisma.ticketHistory.findMany({
    where: { ticketId },
    include: {
      changedBy: { select: { id: true, fullName: true, role: true, avatarUrl: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  return c.json({ histories: data });
});
