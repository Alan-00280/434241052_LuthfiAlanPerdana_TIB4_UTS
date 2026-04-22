import { serve } from "@hono/node-server";
import { Hono } from "hono";
import type { PrismaClient } from "./generated/prisma/client.js";
import logger from "./lib/logger.js";
import withPrisma from "./lib/prisma.js";
import { authMiddleware } from "./middleware/auth.js";
import { loggerMiddleware } from "./middleware/logger.js";
import comments from "./routes/comments.js";
import {
	attachments,
	categories,
	histories,
	notifications,
} from "./routes/misc.js";
import tickets from "./routes/tickets.js";
import users from "./routes/users.js";

type ContextWithPrisma = {
	Variables: {
		prisma: PrismaClient;
	};
};

const app = new Hono<ContextWithPrisma>();

// Global logger middleware
app.use("*", withPrisma);
app.use("api/users/*", authMiddleware);
app.use("api/tickets/*", authMiddleware);
app.use("api/categories/*", authMiddleware);
app.use("api/notifications/*", authMiddleware);
app.use("*", loggerMiddleware);

app.get("api/health", (c) => {
	return c.text("Hello Hono! Helpdesk API Server Activated");
});

app.route("api/users", users);
app.route("api/tickets", tickets);
app.route("api/categories", categories);
app.route("api/notifications", notifications);

// Nested routes under /tickets/:ticketId
app.route("api/tickets/:ticketId/comments", comments);
app.route("api/tickets/:ticketId/attachments", attachments);
app.route("api/tickets/:ticketId/histories", histories);

// ─────────────────────────────────────────
// 404 HANDLER
// ─────────────────────────────────────────

app.notFound((c) => c.json({ error: "Route tidak ditemukan" }, 404));

app.onError((err, c) => {
	console.error(err);
	return c.json({ error: "Internal server error", detail: err.message }, 500);
});

serve(
	{
		fetch: app.fetch,
		port: 3000,
		hostname: "0.0.0.0",
	},
	(info) => {
		logger.info(`Server is running on http://localhost:${info.port}`);
	},
);
