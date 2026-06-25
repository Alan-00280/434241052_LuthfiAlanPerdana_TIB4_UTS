import { requireRole } from "../lib/rbac.js";
import { OpenAPIHono } from "@hono/zod-openapi";
import { getCommentsRoute, createCommentRoute, updateCommentRoute, deleteCommentRoute, } from "../docs/comment.openapi.js";
const comments = new OpenAPIHono();
// GET /tickets/:ticketId/comments — list komentar tiket (FR-005)
comments.get("/", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(getCommentsRoute, async (c) => {
    const prisma = c.get("prisma");
    const ticketId = c.req.param("ticketId");
    const data = await prisma.ticketComment.findMany({
        where: { ticketId },
        include: {
            author: {
                select: { id: true, fullName: true, avatarUrl: true, role: true },
            },
        },
        orderBy: { createdAt: "asc" },
    });
    return c.json({ comments: data });
});
// POST /tickets/:ticketId/comments — tambah komentar / reply (FR-005)
comments.post("/", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(createCommentRoute, async (c) => {
    const prisma = c.get("prisma");
    const ticketId = c.req.param("ticketId");
    const body = await c.req.json();
    const { authorId, body: commentBody } = body;
    if (!authorId || !commentBody) {
        return c.json({ error: "authorId dan body wajib diisi" }, 400);
    }
    // Ambil ticket + creator + assignee sekaligus
    const ticket = await prisma.ticket.findUnique({
        where: { id: ticketId },
        include: {
            creator: { select: { id: true } },
            assignee: { select: { id: true } },
        },
    });
    if (!ticket) {
        return c.json({ error: "Tiket tidak ditemukan" }, 404);
    }
    if (!ticketId) {
        return c.json({ error: "Tiket tidak ditemukan" }, 404);
    }
    // Create comment
    const comment = await prisma.ticketComment.create({
        data: {
            ticketId,
            authorId,
            body: commentBody,
        },
        include: {
            author: {
                select: {
                    id: true,
                    fullName: true,
                    avatarUrl: true,
                    role: true,
                },
            },
        },
    });
    // Ambil nama author sekali saja
    const author = comment.author;
    // 🔔 Notifikasi ke creator
    if (ticket.creatorId !== authorId) {
        await prisma.notification.create({
            data: {
                userId: ticket.creatorId,
                ticketId,
                type: "TICKET_COMMENT_ADDED",
                title: "Komentar baru pada tiketmu",
                body: `${author.fullName} membalas tiket "${ticket.title}"`,
            },
        });
    }
    // 🔔 Notifikasi ke assignee (jika ada & bukan author)
    if (ticket.assigneeId && ticket.assigneeId !== authorId) {
        await prisma.notification.create({
            data: {
                userId: ticket.assigneeId,
                ticketId,
                type: "TICKET_COMMENT_ADDED",
                title: "Komentar baru pada tiket",
                body: `${author.fullName} menambahkan komentar pada tiket "${ticket.title}"`,
            },
        });
    }
    return c.json({ comment }, 201);
});
// PUT /tickets/:ticketId/comments/:id — edit komentar
comments.put("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(updateCommentRoute, async (c) => {
    const prisma = c.get("prisma");
    const { id } = c.req.param();
    const body = await c.req.json();
    const comment = await prisma.ticketComment.update({
        where: { id },
        data: { body: body.body },
        include: {
            author: { select: { id: true, fullName: true } },
        },
    });
    return c.json({ comment });
});
// DELETE /tickets/:ticketId/comments/:id — hapus komentar (author atau ADMIN)
comments.delete("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(deleteCommentRoute, async (c) => {
    const prisma = c.get("prisma");
    const { id } = c.req.param();
    await prisma.ticketComment.delete({ where: { id } });
    return c.json({ message: "Komentar berhasil dihapus" });
});
export default comments;
