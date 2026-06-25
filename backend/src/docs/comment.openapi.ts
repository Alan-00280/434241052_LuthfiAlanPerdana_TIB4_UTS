import { createRoute } from "@hono/zod-openapi";
import z from "zod";

export const getCommentsRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Comments"],
	summary: "List ticket comments",
	description: "Mengambil daftar seluruh komentar untuk tiket tertentu.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			ticketId: z.string().openapi({ description: "ID Tiket" }),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						comments: z
							.array(z.any())
							.openapi({ description: "Daftar komentar tiket" }),
					}),
				},
			},
			description: "Daftar komentar berhasil ditemukan",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});

export const createCommentRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["Comments"],
	summary: "Create a new ticket comment",
	description: "Menambahkan komentar atau balasan baru ke tiket.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			ticketId: z.string().openapi({ description: "ID Tiket" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						authorId: z
							.string()
							.openapi({ description: "ID User pembuat komentar" }),
						body: z.string().openapi({ description: "Isi komentar" }),
					}),
				},
			},
		},
	},
	responses: {
		201: {
			content: {
				"application/json": {
					schema: z.object({
						comment: z
							.any()
							.openapi({ description: "Objek komentar yang berhasil dibuat" }),
					}),
				},
			},
			description: "Komentar berhasil ditambahkan",
		},
		400: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Input tidak valid",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
		404: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Tiket tidak ditemukan",
		},
	},
});

export const updateCommentRoute = createRoute({
	method: "put",
	path: "/{id}",
	tags: ["Comments"],
	summary: "Update comment",
	description: "Mengubah isi dari komentar yang sudah ada.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			ticketId: z.string().openapi({ description: "ID Tiket" }),
			id: z.string().openapi({ description: "ID Komentar" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						body: z.string().openapi({ description: "Isi baru dari komentar" }),
					}),
				},
			},
		},
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						comment: z.any(),
					}),
				},
			},
			description: "Komentar berhasil diupdate",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});

export const deleteCommentRoute = createRoute({
	method: "delete",
	path: "/{id}",
	tags: ["Comments"],
	summary: "Delete comment",
	description:
		"Menghapus komentar (hanya bisa dilakukan oleh pembuat komentar atau ADMIN).",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			ticketId: z.string().openapi({ description: "ID Tiket" }),
			id: z.string().openapi({ description: "ID Komentar" }),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						message: z.string(),
					}),
				},
			},
			description: "Komentar berhasil dihapus",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});
