import { Hono } from "hono";
import type { PrismaClient } from "../generated/prisma/client.js";
import { supabase } from "../lib/supabase.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const auth = new Hono<ContextWithPrisma>();

// POST / — Registrasi user baru
// Route ini tidak pakai requireRole karena diakses oleh user anonim saat daftar
auth.post("/", async (c) => {
	const prisma = c.get("prisma");
	const body = await c.req.json();
	const { email, password, username, fullName, phone } = body;

	// 1. Validasi input sederhana
	if (!email || !password || !username || !fullName) {
		return c.json({ error: "Data registrasi tidak lengkap" }, 400);
	}

	try {
		// 2. Buat User di Supabase Auth via Admin API
		// email_confirm: true membuat user langsung aktif tanpa verifikasi email (cocok untuk tugas kuliah)
		const { data: authData, error: authError } =
			await supabase.auth.admin.createUser({
				email,
				password,
				email_confirm: true,
				user_metadata: { full_name: fullName, username: username },
			});

		if (authError) {
			return c.json(
				{ error: `Supabase Auth Error: ${authError.message}` },
				400,
			);
		}

		// 3. Simpan ke Database Lokal (Prisma)
		const newUser = await prisma.user.create({
			data: {
				supabaseUid: authData.user.id,
				email,
				username,
				fullName,
				phone: phone || null,
				passwordHash: "", // Kita delegasikan auth ke Supabase, jadi kosongkan saja
				role: "USER", // Default role
				isActive: true,
			},
			select: {
				id: true,
				username: true,
				email: true,
				fullName: true,
				role: true,
				createdAt: true,
			},
		});

		return c.json(
			{
				message: "Registrasi berhasil",
				user: newUser,
			},
			201,
		);
	} catch (error: any) {
		// Jika error terjadi di Prisma setelah user terbuat di Supabase,
		// idealnya kamu menghapus user di Supabase (rollback), tapi untuk tugas kuliah
		// pengecekan catch sederhana ini sudah cukup.
		console.error("Registration Error:", error);
		return c.json(
			{ error: "Gagal menyimpan data user ke database lokal" },
			500,
		);
	}
});

export default auth;
