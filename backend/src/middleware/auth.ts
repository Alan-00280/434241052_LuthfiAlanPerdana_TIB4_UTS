import type { Context, Next } from "hono";
import { supabase } from "../lib/supabase.js";

export const authMiddleware = async (c: Context, next: Next) => {
	const token = c.req.header("Authorization")?.replace("Bearer ", "");
	if (!token) return c.json({ error: "Unauthorized" }, 401);

	const {
		data: { user },
		error,
	} = await supabase.auth.getUser(token);
	if (error || !user) return c.json({ error: "Invalid token" }, 401);

	// Ambil role dari PostgreSQL
	const prisma = c.get("prisma");
	const dbUser = await prisma.user.findUnique({
		where: { supabaseUid: user.id },
	});

	c.set("user", dbUser); // tersedia di semua route berikutnya
	await next();
};
