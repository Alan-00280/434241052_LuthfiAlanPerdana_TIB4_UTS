import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import {
	TicketPrioritySchema,
	TicketStatusSchema,
} from "../../prisma/zod/index.js";

export const getTicketsRoute = createRoute({
	method: "get",
	path: "/",
	tags: ["Tickets"],
	summary: "Get filtered tickets with role-based access controls",
	description:
		"Mengambil data semua tiket dengan filter pagination, status, prioritas, kategori, dan pencarian teks.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		query: z.object({
			status: TicketStatusSchema.optional().openapi({
				description: "Filter status tiket",
			}),
			priority: TicketPrioritySchema.optional().openapi({
				description: "Filter prioritas tiket",
			}),
			categoryId: z
				.string()
				.optional()
				.openapi({ description: "Filter berdasarkan ID Kategori" }),
			search: z
				.string()
				.optional()
				.openapi({ description: "Pencarian pada title atau description" }),
			page: z
				.string()
				.optional()
				.default("1")
				.openapi({ description: "Nomor halaman untuk pagination" }),
			limit: z
				.string()
				.optional()
				.default("10")
				.openapi({ description: "Jumlah data per halaman" }),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						tickets: z.array(z.any()).openapi({
							description: "Daftar data tiket yang berhasil difilter",
						}),
						meta: z.object({
							total: z.number(),
							page: z.number(),
							limit: z.number(),
							totalPages: z.number(),
							hasNextPage: z.boolean(),
						}),
					}),
				},
			},
			description: "Daftar tiket berhasil ditemukan",
		},
		401: {
			description: "Unauthorized - Token salah atau tidak disertakan",
		},
		403: {
			description: "Forbidden - Role user tidak memiliki akses",
		},
	},
});

export const getStatsRoute = createRoute({
	method: "get",
	path: "/stats",
	tags: ["Tickets"],
	summary: "Get ticket statistics",
	description:
		"Mengambil statistik tiket untuk dashboard berdasarkan aturan role-based access controls.",
	security: [
		{
			BearerAuth: [],
		},
	],
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						stats: z.object({
							total: z.number(),
							open: z.number(),
							inProgress: z.number(),
							pending: z.number(),
							resolved: z.number(),
							closed: z.number(),
						}),
						filteredBy: z.string(),
					}),
				},
			},
			description: "Statistik tiket berhasil diambil",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});

export const getTicketDetailRoute = createRoute({
	method: "get",
	path: "/{id}",
	tags: ["Tickets"],
	summary: "Get ticket detail",
	description:
		"Mengambil informasi detail tiket beserta relasi creator, assignee, tech support, kategori, komentar, dan riwayat.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z.string().openapi({ description: "ID Tiket (UUID)" }),
		}),
	},
	responses: {
		200: {
			content: {
				"application/json": {
					schema: z.object({
						ticket: z.any().openapi({ description: "Detail objek tiket" }),
					}),
				},
			},
			description: "Detail tiket ditemukan",
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

export const createTicketRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["Tickets"],
	summary: "Create a new ticket",
	description:
		"Membuat tiket baru oleh User dengan lampiran file opsional menggunakan form data.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		body: {
			content: {
				"multipart/form-data": {
					schema: z.object({
						title: z.string().openapi({ description: "Judul tiket" }),
						description: z.string().openapi({ description: "Deskripsi tiket" }),
						creatorId: z
							.string()
							.openapi({ description: "ID User pembuat tiket" }),
						priority: TicketPrioritySchema.optional().openapi({
							description: "Prioritas tiket (LOW, MEDIUM, HIGH, CRITICAL)",
						}),
						categoryId: z
							.string()
							.optional()
							.openapi({ description: "ID Kategori tiket jika ada" }),
						attachments: z
							.union([z.any(), z.array(z.any())])
							.optional()
							.openapi({ description: "File lampiran (Single/Multiple)" }),
					}),
				},
				"application/json": {
					schema: z.object({
						title: z.string().openapi({ description: "Judul tiket" }),
						description: z.string().openapi({ description: "Deskripsi tiket" }),
						creatorId: z
							.string()
							.openapi({ description: "ID User pembuat tiket" }),
						priority: TicketPrioritySchema.optional().openapi({
							description: "Prioritas tiket (LOW, MEDIUM, HIGH, CRITICAL)",
						}),
						categoryId: z
							.string()
							.optional()
							.openapi({ description: "ID Kategori tiket jika ada" }),
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
						ticket: z
							.any()
							.openapi({ description: "Objek tiket yang berhasil dibuat" }),
					}),
				},
			},
			description: "Tiket berhasil dibuat",
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
	},
});

export const updateTicketRoute = createRoute({
	method: "put",
	path: "/{id}",
	tags: ["Tickets"],
	summary: "Update ticket details",
	description: "Mengubah informasi tiket oleh User pembuat.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z.string().openapi({ description: "ID Tiket" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						title: z
							.string()
							.optional()
							.openapi({ description: "Judul baru tiket" }),
						description: z
							.string()
							.optional()
							.openapi({ description: "Deskripsi baru tiket" }),
						priority: TicketPrioritySchema.optional().openapi({
							description: "Prioritas baru",
						}),
						categoryId: z
							.string()
							.optional()
							.openapi({ description: "ID Kategori baru" }),
						attachments: z
							.array(
								z.object({
									fileName: z.string(),
									fileUrl: z.string(),
									fileSize: z.number(),
									mimeType: z.string(),
								}),
							)
							.optional()
							.openapi({ description: "Daftar lampiran baru" }),
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
						ticket: z.any(),
					}),
				},
			},
			description: "Tiket berhasil diperbarui",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});

export const updateTicketStatusRoute = createRoute({
	method: "patch",
	path: "/{id}/status",
	tags: ["Tickets"],
	summary: "Update ticket status",
	description: "Memperbarui status tiket oleh Admin atau Helpdesk.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z.string().openapi({ description: "ID Tiket" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						status: TicketStatusSchema.openapi({
							description:
								"Status baru tiket (OPEN, IN_PROGRESS, PENDING, RESOLVED, CLOSED)",
						}),
						changedById: z
							.string()
							.openapi({ description: "ID User yang mengubah status" }),
						note: z
							.string()
							.optional()
							.openapi({ description: "Catatan perubahan status" }),
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
						ticket: z.any(),
					}),
				},
			},
			description: "Status tiket berhasil diupdate",
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

export const assignTicketRoute = createRoute({
	method: "patch",
	path: "/{id}/assign",
	tags: ["Tickets"],
	summary: "Assign ticket to Support/Helpdesk",
	description:
		"Menugaskan tiket ke Helpdesk/Tech Support oleh Admin atau Helpdesk.",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z.string().openapi({ description: "ID Tiket" }),
		}),
		body: {
			content: {
				"application/json": {
					schema: z.object({
						assigneeId: z
							.string()
							.openapi({ description: "ID Helpdesk yang ditugaskan" }),
						changedById: z
							.string()
							.openapi({ description: "ID User yang melakukan assignment" }),
						techSupportId: z
							.string()
							.openapi({ description: "ID User Tech Support yang ditugaskan" }),
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
						ticket: z.any(),
					}),
				},
			},
			description: "Tiket berhasil di-assign",
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
			description: "Tiket, Assignee atau Tech Support tidak ditemukan",
		},
	},
});

export const deleteTicketRoute = createRoute({
	method: "delete",
	path: "/{id}",
	tags: ["Tickets"],
	summary: "Delete ticket",
	description: "Menghapus tiket dari database (hanya untuk Admin).",
	security: [
		{
			BearerAuth: [],
		},
	],
	request: {
		params: z.object({
			id: z.string().openapi({ description: "ID Tiket" }),
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
			description: "Tiket berhasil dihapus",
		},
		401: {
			description: "Unauthorized",
		},
		403: {
			description: "Forbidden",
		},
	},
});
