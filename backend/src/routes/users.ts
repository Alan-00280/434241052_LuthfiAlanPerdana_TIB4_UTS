import { OpenAPIHono } from "@hono/zod-openapi";
import {
	deleteUserRoute,
	getAssigneesRoute,
	getTechSupportsRoute,
	getUserDetailRoute,
	getUsersRoute,
	updateUserRoute,
	toggleUserActiveRoute,
	createUserRoute,
} from "../docs/user.openapi.js";
import { type PrismaClient, UserRole } from "../generated/prisma/client.js";
import { requireRole } from "../lib/rbac.js";
import { supabase } from "../lib/supabase.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const users = new OpenAPIHono<ContextWithPrisma>();

// GET /users — list semua user (admin only nanti)
users.get("/", requireRole("ADMIN"));
users.openapi(getUsersRoute, async (c) => {
	const prisma = c.get("prisma");
	const usersData = await prisma.user.findMany({
		select: {
			id: true,
			username: true,
			email: true,
			fullName: true,
			role: true,
			phone: true,
			avatarUrl: true,
			isActive: true,
			createdAt: true,
			lastLoginAt: true,
		},
	});
	return c.json({ users: usersData });
});

// GET /users/assignees — mengambil semua asignee yang tersedia
users.get("/assignees", requireRole("ADMIN", "HELPDESK"));
users.openapi(getAssigneesRoute, async (c) => {
	const prisma = c.get("prisma");

	const assignees = await prisma.user.findMany({
		where: {
			role: {
				in: ["HELPDESK", "ADMIN"],
			},
			isActive: true,
		},
		select: {
			id: true,
			username: true,
			fullName: true,
			role: true,
			avatarUrl: true,
		},
	});

	return c.json({ assignees });
});

// GET /users/tech-supports — mengambil semua techsupport yang tersedia
users.get("/tech-supports", requireRole("ADMIN", "HELPDESK"));
users.openapi(getTechSupportsRoute, async (c) => {
	const prisma = c.get("prisma");

	const techsupports = await prisma.user.findMany({
		where: {
			role: {
				in: [UserRole.TECHSUPPORT],
			},
		},
		select: {
			id: true,
			username: true,
			fullName: true,
			role: true,
			avatarUrl: true,
			isActive: true,
			techSupports: true,
		},
	});

	return c.json({ techsupports });
});

// GET /users/:id — detail user
users.get("/:id", requireRole("ADMIN", "USER", "HELPDESK", "TECHSUPPORT"));
users.openapi(getUserDetailRoute, async (c) => {
	const prisma = c.get("prisma");
	let id = c.req.param("id");

	const supaId = c.req.query("supaId"); // true || null
	if (supaId) {
		const user = await prisma.user.findUnique({
			where: {
				supabaseUid: id,
			},
			select: {
				id: true, // Kita hanya mengambil kolom id saja
			},
		});

		if (user) {
			id = user.id;
		} else {
			return c.json({ error: "User not found. supa id = true" }, 404);
		}
	}

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			username: true,
			email: true,
			fullName: true,
			role: true,
			phone: true,
			avatarUrl: true,
			isActive: true,
			createdAt: true,
			lastLoginAt: true,
		},
	});

	if (!user) return c.json({ error: "User tidak ditemukan" }, 404);
	return c.json({ user });
});

// PUT /users/:id — update profil user
users.put("/:id", requireRole("ADMIN", "USER", "HELPDESK", "TECHSUPPORT"));
users.openapi(updateUserRoute, async (c) => {
	const prisma = c.get("prisma");
	const id = c.req.param("id");
	const body = await c.req.json();

	const { fullName, phone, avatarUrl } = body;

	const user = await prisma.user.update({
		where: { id },
		data: {
			...(fullName !== undefined && { fullName }),
			...(phone !== undefined && { phone }),
			...(avatarUrl !== undefined && { avatarUrl }),
		},
		select: {
			id: true,
			username: true,
			email: true,
			fullName: true,
			role: true,
			phone: true,
			avatarUrl: true,
			isActive: true,
			createdAt: true,
			lastLoginAt: true,
		},
	});

	return c.json({ user });
});

// DELETE /users/:id — nonaktifkan user (soft delete)
users.delete("/:id", requireRole("ADMIN", "USER"));
users.openapi(deleteUserRoute, async (c) => {
	const prisma = c.get("prisma");
	const id = c.req.param("id");

	await prisma.user.update({
		where: { id },
		data: { isActive: false },
	});

	return c.json({ message: "User berhasil dinonaktifkan" });
});

// PATCH /users/:id/toggle-active — toggle status aktif (admin only)
users.patch("/:id/toggle-active", requireRole("ADMIN"));
users.openapi(toggleUserActiveRoute, async (c) => {
	const prisma = c.get("prisma");
	const id = c.req.param("id");

	// Cari user terlebih dahulu untuk mendapatkan status keaktifan saat ini
	const existingUser = await prisma.user.findUnique({
		where: { id },
		select: { isActive: true },
	});

	if (!existingUser) {
		return c.json({ error: "Pengguna tidak ditemukan" }, 404);
	}

	// Update status dengan kebalikan dari status saat ini
	const updatedUser = await prisma.user.update({
		where: { id },
		data: { isActive: !existingUser.isActive },
		select: {
			id: true,
			username: true,
			email: true,
			fullName: true,
			role: true,
			phone: true,
			avatarUrl: true,
			isActive: true,
			createdAt: true,
			lastLoginAt: true,
		},
	});

	return c.json({
		message: `User berhasil ${updatedUser.isActive ? "diaktifkan" : "dinonaktifkan"}`,
		user: updatedUser,
	}, 200);
});

// POST / — buat staff baru (admin only)
users.post("/", requireRole("ADMIN"));
users.openapi(createUserRoute, async (c) => {
	const prisma = c.get("prisma");
	const body = await c.req.json();
	const { email, password, username, fullName, phone, role, speciality } = body;

	// 1. Validasi input sederhana
	if (!email || !password || !username || !fullName || !role) {
		return c.json({ error: "Data staf tidak lengkap" }, 400);
	}

	if (role === "TECHSUPPORT" && !speciality) {
		return c.json({ error: "Spesialisasi wajib diisi untuk peran TECHSUPPORT" }, 400);
	}

	try {
		// 2. Cek apakah username atau email sudah ada di database lokal
		const existingUser = await prisma.user.findFirst({
			where: {
				OR: [
					{ email },
					{ username },
				],
			},
		});

		if (existingUser) {
			return c.json({ error: "Username atau Email sudah terdaftar" }, 400);
		}

		// 3. Buat User di Supabase Auth via Admin API
		const { data: authData, error: authError } =
			await supabase.auth.admin.createUser({
				email,
				password,
				email_confirm: true,
				user_metadata: {
					full_name: fullName,
					username,
				},
			});

		if (authError) {
			return c.json(
				{ error: `Supabase Auth Error: ${authError.message}` },
				400,
			);
		}

		// 4. Simpan ke Database Lokal (Prisma)
		const newUser = await prisma.$transaction(async (tx) => {
			const user = await tx.user.create({
				data: {
					supabaseUid: authData?.user?.id || null,
					email,
					username,
					fullName,
					phone: phone || null,
					passwordHash: "", // Delegasikan auth ke Supabase
					role: role as UserRole,
					isActive: true,
				},
			});

			if (role === "TECHSUPPORT") {
				await tx.techSupport.create({
					data: {
						userId: user.id,
						speciality: speciality,
					},
				});
			}

			return user;
		});

		return c.json(
			{
				message: "Staf berhasil dibuat",
				user: {
					id: newUser.id,
					username: newUser.username,
					email: newUser.email,
					fullName: newUser.fullName,
					role: newUser.role,
					phone: newUser.phone,
					isActive: newUser.isActive,
					createdAt: newUser.createdAt,
				},
			},
			201,
		);
	} catch (error: unknown) {
		console.error("Create Staff Error:", error);
		return c.json(
			{ error: "Gagal menyimpan data staf ke database" },
			500,
		);
	}
});

export default users;
