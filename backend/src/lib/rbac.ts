import type { Context, Next } from "hono";

type Role = ("ADMIN" | "HELPDESK" | "USER")[];

export function requireRole(...roles: Role) {
	return async (c: Context, next: Next) => {
		const role = c.get("role");
		if (!roles.includes(role)) {
			return c.json({ error: "forbidden" }, 403);
		}
		await next();
	};
}
