import { createRoute } from "@hono/zod-openapi";
import z from "zod";

export const registerRoute = createRoute({
	method: "post",
	path: "/",
	tags: ["Auth"],
	summary: "Register new user",
	description:
		"Mendaftarkan akun pengguna baru ke sistem (terintegrasi dengan Supabase Auth).",
	request: {
		body: {
			content: {
				"application/json": {
					schema: z.object({
						email: z
							.string()
							.email()
							.openapi({ description: "Alamat email pengguna" }),
						password: z
							.string()
							.min(6)
							.openapi({ description: "Kata sandi akun (minimal 6 karakter)" }),
						username: z.string().openapi({ description: "Nama pengguna unik" }),
						fullName: z
							.string()
							.openapi({ description: "Nama lengkap pengguna" }),
						phone: z
							.string()
							.optional()
							.openapi({ description: "Nomor telepon (opsional)" }),
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
						message: z.string(),
						user: z
							.any()
							.openapi({ description: "Data user yang berhasil dibuat" }),
					}),
				},
			},
			description: "Registrasi berhasil dilakukan",
		},
		400: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Input registrasi tidak lengkap atau error dari Supabase",
		},
		500: {
			content: {
				"application/json": {
					schema: z.object({
						error: z.string(),
					}),
				},
			},
			description: "Gagal menyimpan data ke database lokal",
		},
	},
});
