export function requireRole(...roles) {
    return async (c, next) => {
        const role = c.get("role");
        if (!roles.includes(role)) {
            return c.json({ error: "forbidden" }, 403);
        }
        await next();
    };
}
