import { OpenAPIHono } from "@hono/zod-openapi";
import {
	createCommentRoute,
	deleteCommentRoute,
	getCommentsRoute,
	updateCommentRoute,
} from "../docs/comment.openapi.js";
import type { PrismaClient } from "../generated/prisma/client.js";
import { requireRole } from "../lib/rbac.js";
import { supabase } from "../lib/supabase.js";
import {
	selectTicketComments,
	insertTicketComments,
	updateTicketComments,
	deleteTicketComments,
	insertNotifications,
} from "../../supabase/repository/index.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const comments = new OpenAPIHono<ContextWithPrisma>();

// GET /tickets/:ticketId/comments — list komentar tiket (FR-005)
comments.get("/", requireRole("ADMIN", "HELPDESK", "USER", "TECHSUPPORT"));
comments.openapi(getCommentsRoute, async (c) => {
	const prisma = c.get("prisma");
	const ticketId = c.req.param("ticketId");

	try {
		const commentsData = await selectTicketComments(supabase, { ticketId });
		if (!commentsData || commentsData.length === 0) {
			return c.json({ comments: [] });
		}

		// Ambil authorIds unik
		const authorIds = Array.from(new Set(commentsData.map((c) => c.authorId)));

		// Ambil data user dari Prisma
		const authors = await prisma.user.findMany({
			where: { id: { in: authorIds } },
			select: { id: true, fullName: true, avatarUrl: true, role: true },
		});

		// Buat map untuk mapping cepat
		const authorMap = new Map(authors.map((a) => [a.id, a]));

		// Gabungkan data
		const commentsWithAuthor = commentsData.map((comment) => ({
			...comment,
			author: authorMap.get(comment.authorId) || null,
		}));

		return c.json({ comments: commentsWithAuthor });
	} catch (err: unknown) {
		console.error("Get Comments Error:", err);
		return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
});

// POST /tickets/:ticketId/comments — tambah komentar / reply (FR-005)
comments.post("/", requireRole("ADMIN", "HELPDESK", "USER", "TECHSUPPORT"));
comments.openapi(createCommentRoute, async (c) => {
	const prisma = c.get("prisma");
	const ticketId = c.req.param("ticketId");
	const body = await c.req.json();

	const { authorId, body: commentBody } = body;

	if (!authorId || !commentBody) {
		return c.json({ error: "authorId dan body wajib diisi" }, 400);
	}

	if (!ticketId) {
		return c.json({ error: "Tiket tidak ditemukan" }, 404);
	}

	// Ambil ticket + creator + assignee sekaligus menggunakan Prisma
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

	try {
		// Create comment via Supabase
		const insertResult = await insertTicketComments(supabase, {
			ticketId,
			authorId,
			body: commentBody,
		});

		if (!insertResult || insertResult.length === 0) {
			return c.json({ error: "Gagal menyimpan komentar" }, 500);
		}

		const newComment = insertResult[0];

		let userTechSupport;
		if (ticket.techSupportId) {
			const techSupport = await prisma.techSupport.findFirst({
				where: { id: ticket.techSupportId },
			});
			userTechSupport = await prisma.user.findFirst({
				where: { id: techSupport?.userId },
			})
		}

		// Ambil data author dari Prisma
		const author = await prisma.user.findUnique({
			where: { id: authorId },
			select: { id: true, fullName: true, avatarUrl: true, role: true },
		});

		if (author) {
			// 🔔 Notifikasi ke creator
			if (ticket.creatorId !== authorId) {
				await insertNotifications(supabase, {
					userId: ticket.creatorId,
					ticketId,
					type: "TICKET_COMMENT_ADDED",
					title: "Komentar baru pada tiketmu",
					body: `${author.fullName} membalas tiket "${ticket.title}"`,
				});
			}

			// 🔔 Notifikasi ke assignee (jika ada & bukan author)
			if (ticket.assigneeId && ticket.assigneeId !== authorId) {
				await insertNotifications(supabase, {
					userId: ticket.assigneeId,
					ticketId,
					type: "TICKET_COMMENT_ADDED",
					title: "Komentar baru pada tiket",
					body: `${author.fullName} menambahkan komentar pada tiket "${ticket.title}"`,
				});
			}

			//TODO Notifikasi ke TECHSUPPORT
			// 🔔 Notifikasi ke techsupport (jika ada & bukan author)
			if (userTechSupport && userTechSupport.id !== authorId) {
				await insertNotifications(supabase, {
					userId: userTechSupport.id,
					ticketId,
					type: "TICKET_COMMENT_ADDED",
					title: "Komentar baru pada tiket",
					body: `${author.fullName} menambahkan komentar pada tiket "${ticket.title}"`,
				});
			}
		}

		const responseComment = {
			...newComment,
			author: author || null,
		};

		// Broadcast komentar baru ke channel realtime Supabase
		const channel = supabase.channel(`ticket_room:${ticketId}`);
		channel.subscribe(async (status) => {
			if (status === "SUBSCRIBED") {
				await channel.send({
					type: "broadcast",
					event: "new_comment",
					payload: { comment: responseComment },
				});
				// Beri jeda agar data selesai di-transmit sebelum di-remove
				setTimeout(() => {
					supabase.removeChannel(channel);
				}, 2000);
			} else {
				console.log("Realtime status:", status);
			}
		});

		return c.json({ comment: responseComment }, 201);
	} catch (err: unknown) {
		console.error("Create Comment Error:", err);
		return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
});

// PUT /tickets/:ticketId/comments/:id — edit komentar
comments.put("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(updateCommentRoute, async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	try {
		const updatedComment = await updateTicketComments(supabase, id, { body: body.body });
		if (!updatedComment) {
			return c.json({ error: "Komentar tidak ditemukan" }, 404);
		}

		// Ambil data author dari Prisma
		const author = await prisma.user.findUnique({
			where: { id: updatedComment.authorId },
			select: { id: true, fullName: true, avatarUrl: true, role: true },
		});

		return c.json({
			comment: {
				...updatedComment,
				author: author || null,
			},
		});
	} catch (err: unknown) {
		console.error("Update Comment Error:", err);
		return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
});

// DELETE /tickets/:ticketId/comments/:id — hapus komentar (author atau ADMIN)
comments.delete("/:id", requireRole("ADMIN", "HELPDESK", "USER"));
comments.openapi(deleteCommentRoute, async (c) => {
	const { id } = c.req.param();

	try {
		await deleteTicketComments(supabase, id);
		return c.json({ message: "Komentar berhasil dihapus" });
	} catch (err: unknown) {
		console.error("Delete Comment Error:", err);
		return c.json({ error: err instanceof Error ? err.message : String(err) }, 500);
	}
});

export default comments;
