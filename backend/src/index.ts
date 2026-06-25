import { serve } from "@hono/node-server";
import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";
import type { PrismaClient } from "./generated/prisma/client.js";
import logger from "./lib/logger.js";
import withPrisma from "./lib/prisma.js";
import { authMiddleware } from "./middleware/auth.js";
import { loggerMiddleware } from "./middleware/logger.js";
import auth from "./routes/auth.js";
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

// const app = new Hono<ContextWithPrisma>();
const app = new OpenAPIHono<ContextWithPrisma>();

// Global logger middleware
app.use("*", withPrisma);
app.use("api/users/*", authMiddleware);
app.use("api/tickets/*", authMiddleware);
app.use("api/categories/*", authMiddleware);
app.use("api/notifications/*", authMiddleware);
app.use("*", loggerMiddleware);

// ===== ROUTES ==== //
const healthRoute = createRoute({
	method: "get",
	path: "api/health",
	tags: ["Health"],
	responses: {
		200: {
			content: {
				"text/plain": {
					schema: z.string().openapi({
						example: "Hello Hono! Helpdesk API Server Activated",
					}),
				},
			},
			description: "Server berjalan dengan normal",
		},
	},
});

app.openapi(healthRoute, (c) => {
	return c.text("Hello Hono! Helpdesk API Server Activated");
});

app.route("api/auth", auth);
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

// ─────────────────────────────────────────
// OPEN API - SWAGGER API DOCUMENTATION
// ─────────────────────────────────────────
app.openAPIRegistry.registerComponent("securitySchemes", "BearerAuth", {
	type: "http",
	scheme: "bearer",
	bearerFormat: "JWT",
	description: 'Masukkan token JWT kamu di sini (Tanpa tulisan "Bearer ")',
});

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		title: "Helpdesk Ticketing API",
		version: "1.0.0",
		// Gunakan description untuk memasukkan Ringkasan Sistem & Fitur Utama (Mendukung format Markdown)
		description: `
# Ticket Management System - Mobile Application

Sistem manajemen tiket keluhan berbasis mobile yang menghubungkan pengguna dengan tim helpdesk/admin secara real-time. Aplikasi ini memungkinkan pengguna membuat tiket, melacak status, dan berkomunikasi langsung dengan support team.

---

### 🎯 Fitur Utama & Ruang Lingkup

#### 👤 Untuk Pengguna (User)
* **Autentikasi:** Login, Register, Logout, Reset Password.
* **Membuat Tiket:** Laporan keluhan dengan upload file/gambar.
* **Tracking Tiket:** Melihat status real-time tiket yang dibuat (Open, In Progress, Resolved, Closed).
* **Komunikasi & Notifikasi:** Memberikan komentar/reply pada tiket & menerima update status via Push Notification.

#### 🛠 Untuk Admin/Helpdesk
* **Manajemen & Assign Tiket:** Melihat semua tiket masuk dan menugaskan ke support staff yang tepat.
* **Update Status & Response:** Mengubah status progress tiket dan memberikan feedback/solusi.
* **Dashboard Analytics:** Memantau statistik penanganan tiket secara real-time.

---

### 🛠 Teknologi Stack
* **Backend:** Node.js (Hono JS) dengan TypeScript
* **Database & ORM:** PostgreSQL dengan Prisma ORM
* **Authentication:** JWT Token (Supabase Auth)
* **File Storage:** Supabase Storage (untuk attachment tiket)
    `,
		contact: {
			name: "Helpdesk Core Support Team",
			email: "support@helpdesk-ticketing.local",
		},
	},
	// Mengelompokkan endpoint sesuai dengan modul Fitur Utama di PRD
	tags: [
		{
			name: "Auth",
			description:
				"Fitur Autentikasi: Login, Register, Logout, dan manajemen token JWT.",
		},
		{
			name: "Tickets",
			description:
				"Manajemen pembuatan tiket oleh User, serta validasi, assignment, dan tracking status oleh Admin/Helpdesk.",
		},
		{
			name: "Comments",
			description:
				"Fitur komunikasi real-time berupa feedback/balasan komentar antara User dan tim Support pada tiket terkait.",
		},
		{
			name: "Health Check",
			description:
				"Endpoint monitoring untuk memastikan status engine server Helpdesk API aktif.",
		},
	],
});

app.get("/ui", swaggerUI({ url: "/doc" }));

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
