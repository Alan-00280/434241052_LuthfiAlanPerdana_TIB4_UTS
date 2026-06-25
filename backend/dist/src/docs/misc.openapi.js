import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import { AttachmentSchema, NotificationSchema, TicketCategorySchema, TicketHistorySchema } from "../../prisma/zod/index.js";
// ─────────────────────────────────────────
// ATTACHMENTS
// ─────────────────────────────────────────
export const getAttachmentsRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Misc'],
    summary: 'List ticket attachments',
    description: 'Mengambil semua data lampiran file untuk tiket tertentu.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            ticketId: z.string().openapi({ description: 'ID Tiket' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        attachments: z.array(z.any()).openapi({ description: 'Daftar lampiran tiket' }),
                    }),
                },
            },
            description: 'Daftar lampiran berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const createAttachmentRoute = createRoute({
    method: 'post',
    path: '/',
    tags: ['Misc'],
    summary: 'Add ticket attachment',
    description: 'Mengunggah file lampiran baru ke tiket.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            ticketId: z.string().openapi({ description: 'ID Tiket' }),
        }),
        body: {
            content: {
                'multipart/form-data': {
                    schema: z.object({
                        changedById: z.string().openapi({ description: 'ID User pengunggah' }),
                        attachments: z.union([z.any(), z.array(z.any())]).openapi({ description: 'File yang diupload' }),
                    }),
                },
            },
        },
    },
    responses: {
        201: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                        count: z.number(),
                    }),
                },
            },
            description: 'Attachment berhasil diupload',
        },
        400: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Input tidak valid',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
        404: {
            description: 'Tiket tidak ditemukan',
        },
    },
});
export const deleteAttachmentRoute = createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Misc'],
    summary: 'Delete ticket attachment',
    description: 'Menghapus file lampiran dari tiket dan penyimpanan cloud.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            ticketId: z.string().openapi({ description: 'ID Tiket' }),
            id: z.string().openapi({ description: 'ID Attachment' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        changedById: z.string().openapi({ description: 'ID User yang menghapus' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
            description: 'Attachment berhasil dihapus',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
        404: {
            description: 'Attachment tidak ditemukan',
        },
    },
});
// ─────────────────────────────────────────
// NOTIFICATIONS
// ─────────────────────────────────────────
export const getNotificationsRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Misc'],
    summary: 'List user notifications',
    description: 'Mengambil daftar notifikasi milik user.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        query: z.object({
            userId: z.string().openapi({ description: 'ID User penerima notifikasi' }),
            supaId: z.string().optional().openapi({ description: 'Gunakan ID Supabase UID jika diisi' }),
            unread: z.string().optional().openapi({ description: 'Set "true" untuk memfilter hanya notifikasi belum dibaca' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        notifications: z.array(z.any()),
                        unreadCount: z.number(),
                    }),
                },
            },
            description: 'Daftar notifikasi berhasil ditemukan',
        },
        400: {
            description: 'Bad Request - userId wajib diisi',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const readNotificationRoute = createRoute({
    method: 'patch',
    path: '/{id}/read',
    tags: ['Misc'],
    summary: 'Mark notification as read',
    description: 'Menandai satu notifikasi tertentu sebagai telah dibaca.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID Notifikasi' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        notification: z.any(),
                    }),
                },
            },
            description: 'Notifikasi ditandai telah dibaca',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const readAllNotificationsRoute = createRoute({
    method: 'patch',
    path: '/read-all',
    tags: ['Misc'],
    summary: 'Mark all notifications as read',
    description: 'Menandai seluruh notifikasi user sebagai telah dibaca.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        userId: z.string().openapi({ description: 'ID User' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
            description: 'Seluruh notifikasi berhasil ditandai dibaca',
        },
        400: {
            description: 'Bad Request',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
// ─────────────────────────────────────────
// TICKET CATEGORIES
// ─────────────────────────────────────────
export const getCategoriesRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Misc'],
    summary: 'List ticket categories',
    description: 'Mengambil daftar semua kategori tiket.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        categories: z.array(TicketCategorySchema),
                    }),
                },
            },
            description: 'Daftar kategori berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const createCategoryRoute = createRoute({
    method: 'post',
    path: '/',
    tags: ['Misc'],
    summary: 'Create ticket category',
    description: 'Membuat kategori tiket baru.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string().openapi({ description: 'Nama kategori baru' }),
                        description: z.string().optional().openapi({ description: 'Deskripsi kategori baru' }),
                    }),
                },
            },
        },
    },
    responses: {
        201: {
            content: {
                'application/json': {
                    schema: z.object({
                        category: TicketCategorySchema,
                    }),
                },
            },
            description: 'Kategori tiket berhasil dibuat',
        },
        400: {
            description: 'Bad Request',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const updateCategoryRoute = createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['Misc'],
    summary: 'Update category details',
    description: 'Memperbarui nama atau deskripsi kategori tiket.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID Kategori' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        name: z.string().optional().openapi({ description: 'Nama kategori baru' }),
                        description: z.string().optional().openapi({ description: 'Deskripsi kategori baru' }),
                    }),
                },
            },
        },
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        category: TicketCategorySchema,
                    }),
                },
            },
            description: 'Kategori tiket berhasil diperbarui',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const deleteCategoryRoute = createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Misc'],
    summary: 'Delete category',
    description: 'Menghapus kategori tiket dari sistem.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID Kategori' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
            description: 'Kategori berhasil dihapus',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
// ─────────────────────────────────────────
// TICKET HISTORY
// ─────────────────────────────────────────
export const getHistoriesRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Misc'],
    summary: 'List ticket histories',
    description: 'Mengambil seluruh riwayat perubahan suatu tiket.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            ticketId: z.string().openapi({ description: 'ID Tiket' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        histories: z.array(z.any()),
                    }),
                },
            },
            description: 'Daftar riwayat tiket ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
