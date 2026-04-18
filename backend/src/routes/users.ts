import { Hono } from "hono";
import type { PrismaClient } from "../generated/prisma/client.js";
import { requireRole } from "../lib/rbac.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const users = new Hono<ContextWithPrisma>();

// GET /users — list semua user (admin only nanti)
users.get("/", requireRole("ADMIN"), async (c) => {
	const prisma = c.get("prisma");
	const users = await prisma.user.findMany({
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
	return c.json({ users });
});

// GET /users/:id — detail user
users.get("/:id", requireRole("ADMIN", "USER"), async (c) => {
	const prisma = c.get("prisma");
	let { id } = c.req.param();

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
users.put("/:id", requireRole("ADMIN", "USER"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();
	const body = await c.req.json();

	const { fullName, phone, avatarUrl } = body;

	const user = await prisma.user.update({
		where: { id },
		data: { fullName, phone, avatarUrl },
		select: {
			id: true,
			username: true,
			email: true,
			fullName: true,
			phone: true,
			avatarUrl: true,
		},
	});

	return c.json({ user });
});

// DELETE /users/:id — nonaktifkan user (soft delete)
users.delete("/:id", requireRole("ADMIN", "USER"), async (c) => {
	const prisma = c.get("prisma");
	const { id } = c.req.param();

	await prisma.user.update({
		where: { id },
		data: { isActive: false },
	});

	return c.json({ message: "User berhasil dinonaktifkan" });
});

export default users;
