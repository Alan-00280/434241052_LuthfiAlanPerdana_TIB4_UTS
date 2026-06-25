import { createRoute } from "@hono/zod-openapi";
import z from "zod";
import { UserSchema } from "../../prisma/zod/index.js";
export const getUsersRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Users'],
    summary: 'List all users',
    description: 'Mengambil daftar semua pengguna di dalam sistem (khusus Admin).',
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
                        users: z.array(z.any()).openapi({ description: 'Daftar semua pengguna' }),
                    }),
                },
            },
            description: 'Daftar pengguna berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const getAssigneesRoute = createRoute({
    method: 'get',
    path: '/assignees',
    tags: ['Users'],
    summary: 'List available assignees',
    description: 'Mengambil semua pengguna aktif yang memiliki role ADMIN atau HELPDESK untuk ditugaskan ke tiket.',
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
                        assignees: z.array(z.any()).openapi({ description: 'Daftar user assignee yang tersedia' }),
                    }),
                },
            },
            description: 'Daftar assignee berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const getTechSupportsRoute = createRoute({
    method: 'get',
    path: '/tech-supports',
    tags: ['Users'],
    summary: 'List tech supports',
    description: 'Mengambil semua pengguna aktif dengan role TECHSUPPORT.',
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
                        techsupports: z.array(z.any()).openapi({ description: 'Daftar user tech support yang tersedia' }),
                    }),
                },
            },
            description: 'Daftar tech support berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const getUserDetailRoute = createRoute({
    method: 'get',
    path: '/{id}',
    tags: ['Users'],
    summary: 'Get user detail',
    description: 'Mengambil detail informasi profil seorang pengguna.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID User' }),
        }),
        query: z.object({
            supaId: z.string().optional().openapi({ description: 'Gunakan ID Supabase UID jika diisi "true"' }),
        }),
    },
    responses: {
        200: {
            content: {
                'application/json': {
                    schema: z.object({
                        user: z.any().openapi({ description: 'Data profil user' }),
                    }),
                },
            },
            description: 'Detail pengguna berhasil ditemukan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
        404: {
            content: {
                'application/json': {
                    schema: z.object({
                        error: z.string(),
                    }),
                },
            },
            description: 'Pengguna tidak ditemukan',
        },
    },
});
export const updateUserRoute = createRoute({
    method: 'put',
    path: '/{id}',
    tags: ['Users'],
    summary: 'Update user profile',
    description: 'Memperbarui informasi profil pengguna seperti nama lengkap, nomor telepon, dan URL avatar.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID User' }),
        }),
        body: {
            content: {
                'application/json': {
                    schema: z.object({
                        fullName: z.string().optional().openapi({ description: 'Nama lengkap baru' }),
                        phone: z.string().optional().openapi({ description: 'Nomor telepon baru' }),
                        avatarUrl: z.string().optional().openapi({ description: 'URL avatar baru' }),
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
                        user: z.any().openapi({ description: 'Data profil user terupdate' }),
                    }),
                },
            },
            description: 'Profil berhasil diperbarui',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
export const deleteUserRoute = createRoute({
    method: 'delete',
    path: '/{id}',
    tags: ['Users'],
    summary: 'Deactivate user',
    description: 'Menonaktifkan status akun pengguna secara soft-delete.',
    security: [
        {
            BearerAuth: [],
        }
    ],
    request: {
        params: z.object({
            id: z.string().openapi({ description: 'ID User' }),
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
            description: 'Akun pengguna berhasil dinonaktifkan',
        },
        401: {
            description: 'Unauthorized',
        },
        403: {
            description: 'Forbidden',
        },
    },
});
