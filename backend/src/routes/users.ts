import { OpenAPIHono } from "@hono/zod-openapi";
import {
	deleteUserRoute,
	getAssigneesRoute,
	getTechSupportsRoute,
	getUserDetailRoute,
	getUsersRoute,
	updateUserRoute,
} from "../docs/user.openapi.js";
import { type PrismaClient, UserRole } from "../generated/prisma/client.js";
import { requireRole } from "../lib/rbac.js";

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
			isActive: true,
		},
		select: {
			id: true,
			username: true,
			fullName: true,
			role: true,
			avatarUrl: true,
			techSupports: true,
		},
	});

	return c.json({ techsupports });
});

// GET /users/:id — detail user
users.get("/:id", requireRole("ADMIN", "USER", "HELPDESK"));
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
users.put("/:id", requireRole("ADMIN", "USER", "HELPDESK"));
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

export default users;
