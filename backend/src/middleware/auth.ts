import type { Context, Next } from "hono";
import { supabase } from "../lib/supabase.js";

// export const authMiddleware = async (c: Context, next: Next) => {
// 	const token = c.req.header("Authorization")?.replace("Bearer ", "");
// 	if (!token) return c.json({ error: "Unauthorized" }, 401);

// 	const {
// 		data: { user },
// 		error,
// 	} = await supabase.auth.getUser(token);
// 	if (error || !user) return c.json({ error: "Invalid token" }, 401);

// 	// Ambil role dari PostgreSQL
// 	const prisma = c.get("prisma");
// 	const dbUser = await prisma.user.findUnique({
// 		where: { supabaseUid: user.id },
// 	});

// 	c.set("user", dbUser);
// 	c.set("role", dbUser.role); // tersedia di semua route berikutnya
// 	await next();
// };

export const authMiddleware = async (c: Context, next: Next) => {
	const token = c.req.header("Authorization")?.replace("Bearer ", "");
	if (!token) return c.json({ error: "Unauthorized" }, 401);

	// Ambil data dan error secara terpisah
	const { data, error } = await supabase.auth.getUser(token);

	// Cek apakah data ada DAN user ada di dalamnya
	if (error || !data?.user) {
		return c.json({ error: "Invalid token" }, 401);
	}

	const user = data.user; // Sekarang aman untuk diakses

	const prisma = c.get("prisma");
	const dbUser = await prisma.user.findUnique({
		where: { supabaseUid: user.id },
	});

	// Validasi jika user ada di Supabase tapi belum ada di DB Prisma kamu
	if (!dbUser) {
		return c.json({ error: "User not found in database" }, 404);
	}

	c.set("user", dbUser);
	c.set("role", dbUser.role);
	await next();
};
