import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";
import { PrismaClient } from "../src/generated/prisma/client.js";
import { AttachmentSource, NotificationType, TechSupportSpecialty, TicketPriority, TicketStatus, UserRole, } from "../src/generated/prisma/enums.js";
import { supabase } from "../src/lib/supabase.js";
const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({
    adapter,
});
async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}
// Helper: buat user di Supabase Auth lalu upsert ke PostgreSQL
async function createUser(data) {
    // 1. Buat di Supabase Auth Jika role nya bukan Techsupport
    let authData = null;
    if (data.role !== UserRole.TECHSUPPORT) {
        const { data: auth, error } = await supabase.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: true, // langsung confirmed, tidak perlu verifikasi email
        });
        authData = auth;
        if (error && error.message !== "User already registered") {
            throw new Error(`Supabase error for ${data.email}: ${error.message}`);
        }
    }
    const supabaseUid = authData?.user?.id ?? null;
    // 2. Upsert ke PostgreSQL dengan supabaseUid menyesuaikan role
    const user = await prisma.user.upsert({
        where: { email: data.email },
        update: { supabaseUid },
        create: {
            supabaseUid,
            username: data.username,
            email: data.email,
            passwordHash: await hashPassword(data.password),
            role: data.role,
            fullName: data.fullName,
            phone: data.phone,
        },
    });
    if (data.role == UserRole.TECHSUPPORT) {
        const techUser = await prisma.techSupport.upsert({
            where: { userId: user.id },
            update: {},
            create: {
                userId: user.id,
                speciality: data.speciality ?? TechSupportSpecialty.SOFTWARE,
            }
        });
        user.id = techUser.id;
    }
    return user;
}
async function main() {
    console.log("🌱 Starting seed...");
    // ─────────────────────────────────────────
    // USERS
    // ─────────────────────────────────────────
    console.log("👤 Seeding users...");
    // 1. Admin
    const admin = await createUser({
        email: "admin@helpdesk.com",
        password: "Admin@123",
        username: "admin",
        fullName: "Administrator",
        phone: "081200000001",
        role: UserRole.ADMIN,
    });
    // 2. Helpdesk
    const helpdesk1 = await createUser({
        email: "helpdesk1@helpdesk.com",
        password: "Helpdesk@123",
        username: "helpdesk_budi",
        fullName: "Budi Santoso",
        phone: "081200000002",
        role: UserRole.HELPDESK,
    });
    const helpdesk2 = await createUser({
        email: "helpdesk2@helpdesk.com",
        password: "Helpdesk@123",
        username: "helpdesk_sari",
        fullName: "Sari Dewi",
        phone: "081200000003",
        role: UserRole.HELPDESK,
    });
    // 3. Tech Support
    const techsupport1 = await createUser({
        email: "techsupport1@techsuport.com",
        password: "11223344",
        username: "techsuport1",
        fullName: "techsuport1",
        phone: "000000000000",
        role: UserRole.TECHSUPPORT,
        speciality: TechSupportSpecialty.INFRASTRUCTURE
    });
    const techsupport2 = await createUser({
        email: "techsupport2@techsupport.com",
        password: "11223344",
        username: "techsupport_network",
        fullName: "Ferry Network Admin",
        phone: "081234567891",
        role: UserRole.TECHSUPPORT,
        speciality: TechSupportSpecialty.NETWORK
    });
    const techsupport3 = await createUser({
        email: "techsupport3@techsupport.com",
        password: "11223344",
        username: "techsupport_hardware",
        fullName: "Budi Hardware Specialist",
        phone: "081234567892",
        role: UserRole.TECHSUPPORT,
        speciality: TechSupportSpecialty.HARDWARE
    });
    const techsupport4 = await createUser({
        email: "techsupport4@techsupport.com",
        password: "11223344",
        username: "techsupport_software",
        fullName: "Siti Software Support",
        phone: "081234567893",
        role: UserRole.TECHSUPPORT,
        speciality: TechSupportSpecialty.SOFTWARE
    });
    const techsupport5 = await createUser({
        email: "techsupport5@techsupport.com",
        password: "11223344",
        username: "techsupport_auth",
        fullName: "Andi Account Security",
        phone: "081234567894",
        role: UserRole.TECHSUPPORT,
        speciality: TechSupportSpecialty.ACCOUNT_AUTH
    });
    // 4. Regular Users
    const user1 = await createUser({
        email: "user1@example.com",
        password: "User@123",
        username: "andi_pratama",
        fullName: "Andi Pratama",
        phone: "081300000001",
        role: UserRole.USER,
    });
    const user2 = await createUser({
        email: "user2@example.com",
        password: "User@123",
        username: "rina_kusuma",
        fullName: "Rina Kusuma",
        phone: "081300000002",
        role: UserRole.USER,
    });
    const user3 = await createUser({
        email: "user3@example.com",
        password: "User@123",
        username: "doni_wijaya",
        fullName: "Doni Wijaya",
        phone: "081300000003",
        role: UserRole.USER,
    });
    console.log("✅ Users seeded");
    // ─────────────────────────────────────────
    // TICKET CATEGORIES
    // ─────────────────────────────────────────
    console.log("🏷️  Seeding categories...");
    const categories = await Promise.all([
        prisma.ticketCategory.upsert({
            where: { name: "Jaringan & Konektivitas" },
            update: {},
            create: {
                name: "Jaringan & Konektivitas",
                description: "Masalah internet, WiFi, VPN, dan koneksi jaringan",
            },
        }),
        prisma.ticketCategory.upsert({
            where: { name: "Perangkat Keras" },
            update: {},
            create: {
                name: "Perangkat Keras",
                description: "Kerusakan komputer, printer, dan perangkat fisik lainnya",
            },
        }),
        prisma.ticketCategory.upsert({
            where: { name: "Perangkat Lunak" },
            update: {},
            create: {
                name: "Perangkat Lunak",
                description: "Bug aplikasi, instalasi software, dan lisensi",
            },
        }),
        prisma.ticketCategory.upsert({
            where: { name: "Akun & Akses" },
            update: {},
            create: {
                name: "Akun & Akses",
                description: "Reset password, hak akses, dan manajemen akun",
            },
        }),
        prisma.ticketCategory.upsert({
            where: { name: "Lainnya" },
            update: {},
            create: {
                name: "Lainnya",
                description: "Keluhan atau permintaan yang tidak termasuk kategori di atas",
            },
        }),
    ]);
    const [catJaringan, catHardware, catSoftware, catAkun, _catLainnya] = categories;
    console.log("✅ Categories seeded");
    // ─────────────────────────────────────────
    // TICKETS
    // ─────────────────────────────────────────
    console.log("🎫 Seeding tickets...");
    // =========================================================================
    // 3 TIKET STATUS: OPEN (Belum di-assign ke Helpdesk maupun Tech Support)
    // =========================================================================
    // Ticket 1 — OPEN
    const ticket1 = await prisma.ticket.create({
        data: {
            title: "Tidak bisa terhubung ke WiFi kantor",
            description: "Sejak pagi tadi laptop saya tidak bisa terhubung ke jaringan WiFi kantor. Sudah dicoba restart tapi tetap tidak bisa. Perangkat lain sepertinya bisa terhubung normal.",
            status: TicketStatus.OPEN,
            priority: TicketPriority.HIGH,
            creatorId: user1.id,
            categoryId: catJaringan.id,
        },
    });
    // Ticket 2 — OPEN
    const ticket2 = await prisma.ticket.create({
        data: {
            title: "Keyboard Macbook macet beberapa tombol",
            description: "Tombol spacebar dan huruf 'E' di laptop dinas saya keras sekali saat ditekan dan sering tidak merespons. Mohon bantuan pengecekan atau penggantian unit.",
            status: TicketStatus.OPEN,
            priority: TicketPriority.MEDIUM,
            creatorId: user2.id,
            categoryId: catHardware.id,
        },
    });
    // Ticket 3 — OPEN
    const ticket3 = await prisma.ticket.create({
        data: {
            title: "Request instalasi Adobe Photoshop terbaru",
            description: "Saya membutuhkan aplikasi Adobe Photoshop berlisensi resmi untuk kebutuhan editing materi campaign media sosial divisi marketing.",
            status: TicketStatus.OPEN,
            priority: TicketPriority.LOW,
            creatorId: user3.id,
            categoryId: catSoftware.id,
        },
    });
    // =========================================================================
    // 1 TIKET STATUS: IN_PROGRESS (Sudah di-assign ke Helpdesk & Tech Support)
    // =========================================================================
    // Ticket 4 — IN_PROGRESS
    const ticket4 = await prisma.ticket.create({
        data: {
            title: "Printer tidak bisa mencetak dokumen",
            description: 'Printer di ruang administrasi menampilkan error "Paper Jam" padahal tidak ada kertas yang tersangkut. Sudah dibersihkan tapi tetap muncul pesan yang sama.',
            status: TicketStatus.IN_PROGRESS,
            priority: TicketPriority.MEDIUM,
            creatorId: user2.id,
            assigneeId: helpdesk1.id, // Assigned ke Helpdesk
            techSupportId: techsupport3.id, // Diteruskan ke TechSupport (Hardware Specialist)
            categoryId: catHardware.id,
        },
    });
    // =========================================================================
    // 2 TIKET STATUS: PENDING (Tertunda menunggu verifikasi/part/proses lanjut)
    // =========================================================================
    // Ticket 5 — PENDING
    const ticket5 = await prisma.ticket.create({
        data: {
            title: "Aplikasi ERP crash saat buka laporan bulanan",
            description: "Setiap kali membuka menu laporan bulanan di aplikasi ERP, aplikasi langsung tertutup sendiri. Sudah terjadi sejak update versi terbaru kemarin.",
            status: TicketStatus.PENDING,
            priority: TicketPriority.CRITICAL,
            creatorId: user1.id,
            assigneeId: helpdesk2.id, // Assigned ke Helpdesk
            techSupportId: techsupport4.id, // Diteruskan ke TechSupport (Software Support)
            categoryId: catSoftware.id,
        },
    });
    // Ticket 6 — PENDING
    const ticket6 = await prisma.ticket.create({
        data: {
            title: "Internet lantai 3 sangat lambat dan sering RTO",
            description: "Koneksi internet via kabel LAN maupun WiFi di area kerja lantai 3 drop parah sejak siang ini. Sering Request Time Out (RTO) saat meeting online.",
            status: TicketStatus.PENDING,
            priority: TicketPriority.HIGH,
            creatorId: user3.id,
            assigneeId: helpdesk1.id, // Assigned ke Helpdesk
            techSupportId: techsupport2.id, // Diteruskan ke TechSupport (Network Admin)
            categoryId: catJaringan.id,
        },
    });
    // =========================================================================
    // 2 TIKET STATUS: CLOSED (Selesai diproses dan sudah ditutup riwayatnya)
    // =========================================================================
    // Ticket 7 — CLOSED
    const ticket7 = await prisma.ticket.create({
        data: {
            title: "Lupa password akun email kantor",
            description: "Saya tidak bisa login ke email kantor karena lupa password. Mohon bantuan untuk reset password.",
            status: TicketStatus.CLOSED,
            priority: TicketPriority.LOW,
            creatorId: user3.id,
            assigneeId: helpdesk2.id, // Assigned ke Helpdesk
            techSupportId: techsupport5.id, // Selesai oleh TechSupport (Account Security)
            categoryId: catAkun.id,
            resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // Selesai 2 jam lalu
            closedAt: new Date(Date.now() - 1000 * 60 * 60 * 1), // Ditutup 1 jam lalu
        },
    });
    // Ticket 8 — CLOSED
    const ticket8 = await prisma.ticket.create({
        data: {
            title: "Permintaan penambahan akses folder shared drive",
            description: 'Saya membutuhkan akses ke folder "Dokumen Proyek 2026" di shared drive untuk keperluan pekerjaan tim.',
            status: TicketStatus.CLOSED,
            priority: TicketPriority.LOW,
            creatorId: user2.id,
            assigneeId: helpdesk1.id, // Assigned ke Helpdesk
            techSupportId: techsupport1.id, // Selesai oleh TechSupport (Infrastructure)
            categoryId: catAkun.id,
            resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // Selesai 1 hari lalu
            closedAt: new Date(Date.now() - 1000 * 60 * 60 * 20), // Ditutup 20 jam lalu
        },
    });
    console.log("✅ Tickets seeded");
    // ─────────────────────────────────────────
    // ATTACHMENTS
    // ─────────────────────────────────────────
    console.log("📎 Seeding attachments...");
    await prisma.attachment.createMany({
        data: [
            {
                ticketId: ticket1.id,
                fileName: "screenshot_error_wifi.png",
                fileUrl: "https://storage.example.com/attachments/screenshot_error_wifi.png",
                fileSize: 204800,
                mimeType: "image/png",
                source: AttachmentSource.CAMERA,
            },
            {
                ticketId: ticket2.id,
                fileName: "foto_printer_error.jpg",
                fileUrl: "https://storage.example.com/attachments/foto_printer_error.jpg",
                fileSize: 512000,
                mimeType: "image/jpeg",
                source: AttachmentSource.CAMERA,
            },
            {
                ticketId: ticket4.id,
                fileName: "log_erp_crash.txt",
                fileUrl: "https://storage.example.com/attachments/log_erp_crash.txt",
                fileSize: 8192,
                mimeType: "text/plain",
                source: AttachmentSource.UPLOAD,
            },
            {
                ticketId: ticket4.id,
                fileName: "screenshot_erp_error.png",
                fileUrl: "https://storage.example.com/attachments/screenshot_erp_error.png",
                fileSize: 307200,
                mimeType: "image/png",
                source: AttachmentSource.CAMERA,
            },
        ],
    });
    console.log("✅ Attachments seeded");
    // ─────────────────────────────────────────
    // TICKET COMMENTS
    // ─────────────────────────────────────────
    console.log("💬 Seeding comments...");
    await prisma.ticketComment.createMany({
        data: [
            // Ticket 2 (printer)
            {
                ticketId: ticket2.id,
                authorId: helpdesk1.id,
                body: "Halo, terima kasih telah melaporkan masalah ini. Saya akan segera datang ke ruang administrasi untuk mengecek printer secara langsung.",
            },
            {
                ticketId: ticket2.id,
                authorId: user2.id,
                body: "Baik, saya tunggu di ruang administrasi ya. Terima kasih.",
            },
            {
                ticketId: ticket2.id,
                authorId: helpdesk1.id,
                body: "Sudah saya cek. Ternyata ada sisa potongan kertas kecil yang tersangkut di dalam roller. Sedang dalam proses pembersihan.",
            },
            // Ticket 3 (password — resolved)
            {
                ticketId: ticket3.id,
                authorId: helpdesk2.id,
                body: "Halo, password email Anda sudah kami reset. Silakan cek SMS untuk password sementara dan segera ganti setelah login.",
            },
            {
                ticketId: ticket3.id,
                authorId: user3.id,
                body: "Sudah berhasil login. Terima kasih atas bantuannya!",
            },
            // Ticket 4 (ERP crash)
            {
                ticketId: ticket4.id,
                authorId: helpdesk2.id,
                body: "Terima kasih sudah menyertakan log error. Saya sudah eskalasi ke tim developer untuk investigasi lebih lanjut. Mohon ditunggu.",
            },
            {
                ticketId: ticket4.id,
                authorId: user1.id,
                body: "Baik, apakah ada perkiraan waktu penyelesaiannya?",
            },
            {
                ticketId: ticket4.id,
                authorId: helpdesk2.id,
                body: "Estimasi 1–2 hari kerja. Tim developer sedang menganalisis log yang Anda kirimkan.",
            },
        ],
    });
    console.log("✅ Comments seeded");
    // ─────────────────────────────────────────
    // TICKET HISTORIES
    // ─────────────────────────────────────────
    console.log("📋 Seeding ticket histories...");
    await prisma.ticketHistory.createMany({
        data: [
            // =========================================================================
            // TIKET 4 (IN_PROGRESS) — Macam-macam langkah: assign helpdesk -> assign tech support -> in progress
            // =========================================================================
            {
                ticketId: ticket4.id,
                changedById: admin.id,
                field: "assignee",
                oldValue: null,
                newValue: helpdesk1.fullName,
                note: "Tiket di-assign ke helpdesk untuk triage awal",
            },
            {
                ticketId: ticket4.id,
                changedById: helpdesk1.id,
                field: "techSupport",
                oldValue: null,
                newValue: "Hardware Specialist",
                note: "Kendala fisik printer diteruskan ke tim Tech Support Hardware",
            },
            {
                ticketId: ticket4.id,
                changedById: helpdesk1.id,
                field: "status",
                oldValue: TicketStatus.OPEN,
                newValue: TicketStatus.IN_PROGRESS,
                note: "Tim lapangan mulai mengecek unit printer di ruang administrasi",
            },
            // =========================================================================
            // TIKET 5 (PENDING) — Alur: assign helpdesk -> assign tech support -> pending (investigasi crash)
            // =========================================================================
            {
                ticketId: ticket5.id,
                changedById: admin.id,
                field: "assignee",
                oldValue: null,
                newValue: helpdesk2.fullName,
                note: "Tiket di-assign ke helpdesk",
            },
            {
                ticketId: ticket5.id,
                changedById: helpdesk2.id,
                field: "techSupport",
                oldValue: null,
                newValue: "Software Support",
                note: "Masalah crash aplikasi ERP dialihkan ke spesialis software",
            },
            {
                ticketId: ticket5.id,
                changedById: helpdesk2.id,
                field: "status",
                oldValue: TicketStatus.OPEN,
                newValue: TicketStatus.PENDING,
                note: "Status ditangguhkan sementara, menunggu log file dari tim developer pusat",
            },
            // =========================================================================
            // TIKET 6 (PENDING) — Alur: assign helpdesk -> assign tech support -> pending (nunggu part/vendor)
            // =========================================================================
            {
                ticketId: ticket6.id,
                changedById: admin.id,
                field: "assignee",
                oldValue: null,
                newValue: helpdesk1.fullName,
                note: "Tiket di-assign ke helpdesk",
            },
            {
                ticketId: ticket6.id,
                changedById: helpdesk1.id,
                field: "techSupport",
                oldValue: null,
                newValue: "Network Admin",
                note: "Laporan RTO jaringan lantai 3 dialihkan ke tim network",
            },
            {
                ticketId: ticket6.id,
                changedById: helpdesk1.id,
                field: "status",
                oldValue: TicketStatus.OPEN,
                newValue: TicketStatus.PENDING,
                note: "Pending: Sedang menunggu proses penggantian access point cadangan dari gudang",
            },
            // =========================================================================
            // TIKET 7 (CLOSED) — Alur lengkap: assign -> forwarded -> resolved -> closed
            // =========================================================================
            {
                ticketId: ticket7.id,
                changedById: admin.id,
                field: "assignee",
                oldValue: null,
                newValue: helpdesk2.fullName,
                note: "Tiket di-assign ke helpdesk",
            },
            {
                ticketId: ticket7.id,
                changedById: helpdesk2.id,
                field: "techSupport",
                oldValue: null,
                newValue: "Account Security",
                note: "Diteruskan ke tim Auth & Security untuk keperluan reset email",
            },
            {
                ticketId: ticket7.id,
                changedById: helpdesk2.id,
                field: "status",
                oldValue: TicketStatus.OPEN,
                newValue: TicketStatus.CLOSED,
                note: "Password baru berhasil di-generate, dikonfirmasi oleh user, dan tiket resmi ditutup",
            },
            // =========================================================================
            // TIKET 8 (CLOSED) — Alur lengkap: assign -> forwarded -> closed
            // =========================================================================
            {
                ticketId: ticket8.id,
                changedById: admin.id,
                field: "assignee",
                oldValue: null,
                newValue: helpdesk1.fullName,
                note: "Tiket di-assign ke helpdesk",
            },
            {
                ticketId: ticket8.id,
                changedById: helpdesk1.id,
                field: "techSupport",
                oldValue: null,
                newValue: "Infrastructure",
                note: "Akses shared drive dikerjakan oleh tim infra",
            },
            {
                ticketId: ticket8.id,
                changedById: helpdesk1.id,
                field: "status",
                oldValue: TicketStatus.OPEN,
                newValue: TicketStatus.CLOSED,
                note: "Hak akses folder proyek dirubah dan tiket ditutup otomatis oleh sistem",
            },
        ],
    });
    console.log("✅ Ticket histories seeded");
    // ─────────────────────────────────────────
    // NOTIFICATIONS
    // ─────────────────────────────────────────
    console.log("🔔 Seeding notifications...");
    await prisma.notification.createMany({
        data: [
            // Notif untuk admin: tiket baru masuk
            {
                userId: admin.id,
                ticketId: ticket1.id,
                type: NotificationType.TICKET_CREATED,
                title: "Tiket baru masuk",
                body: 'Andi Pratama membuat tiket: "Tidak bisa terhubung ke WiFi kantor"',
                isRead: false,
            },
            {
                userId: admin.id,
                ticketId: ticket4.id,
                type: NotificationType.TICKET_CREATED,
                title: "Tiket baru masuk",
                body: 'Andi Pratama membuat tiket: "Aplikasi ERP crash saat buka laporan bulanan"',
                isRead: true,
                readAt: new Date(),
            },
            // Notif untuk helpdesk1: dapat assign
            {
                userId: helpdesk1.id,
                ticketId: ticket2.id,
                type: NotificationType.TICKET_ASSIGNED,
                title: "Tiket baru di-assign ke kamu",
                body: 'Kamu mendapat tiket: "Printer tidak bisa mencetak dokumen"',
                isRead: true,
                readAt: new Date(),
            },
            // Notif untuk helpdesk2: dapat assign
            {
                userId: helpdesk2.id,
                ticketId: ticket3.id,
                type: NotificationType.TICKET_ASSIGNED,
                title: "Tiket baru di-assign ke kamu",
                body: 'Kamu mendapat tiket: "Lupa password akun email kantor"',
                isRead: true,
                readAt: new Date(),
            },
            {
                userId: helpdesk2.id,
                ticketId: ticket4.id,
                type: NotificationType.TICKET_ASSIGNED,
                title: "Tiket baru di-assign ke kamu",
                body: 'Kamu mendapat tiket: "Aplikasi ERP crash saat buka laporan bulanan"',
                isRead: true,
                readAt: new Date(),
            },
            // Notif untuk user: status update
            {
                userId: user2.id,
                ticketId: ticket2.id,
                type: NotificationType.TICKET_STATUS_UPDATED,
                title: "Status tiket diperbarui",
                body: 'Tiket "Printer tidak bisa mencetak dokumen" sedang dalam proses penanganan.',
                isRead: false,
            },
            {
                userId: user3.id,
                ticketId: ticket3.id,
                type: NotificationType.TICKET_RESOLVED,
                title: "Tiket kamu berhasil diselesaikan",
                body: 'Tiket "Lupa password akun email kantor" telah diselesaikan. Silakan konfirmasi.',
                isRead: true,
                readAt: new Date(),
            },
            {
                userId: user1.id,
                ticketId: ticket4.id,
                type: NotificationType.TICKET_COMMENT_ADDED,
                title: "Komentar baru pada tiketmu",
                body: 'Sari Dewi membalas tiket "Aplikasi ERP crash saat buka laporan bulanan".',
                isRead: false,
            },
            {
                userId: user2.id,
                ticketId: ticket5.id,
                type: NotificationType.TICKET_CLOSED,
                title: "Tiket ditutup",
                body: 'Tiket "Permintaan penambahan akses folder shared drive" telah ditutup.',
                isRead: true,
                readAt: new Date(),
            },
        ],
    });
    console.log("✅ Notifications seeded");
    // ─────────────────────────────────────────
    // SUMMARY
    // ─────────────────────────────────────────
    console.log("\n🎉 Seed completed!");
    console.log("─────────────────────────────────");
    console.log("📊 Summary:");
    console.log(`   Users         : 6  (1 admin, 2 helpdesk, 3 user)`);
    console.log(`   Categories    : 5`);
    console.log(`   Tickets       : 5  (1 open, 1 in_progress, 1 pending, 1 resolved, 1 closed)`);
    console.log(`   Attachments   : 4`);
    console.log(`   Comments      : 8`);
    console.log(`   Histories     : 11`);
    console.log(`   Notifications : 9`);
    console.log("─────────────────────────────────");
    console.log("\n🔑 Login credentials:");
    console.log("   Admin     : admin@helpdesk.com       / Admin@123");
    console.log("   Helpdesk  : helpdesk1@helpdesk.com   / Helpdesk@123");
    console.log("   Helpdesk  : helpdesk2@helpdesk.com   / Helpdesk@123");
    console.log("   User      : user1@example.com        / User@123");
    console.log("   User      : user2@example.com        / User@123");
    console.log("   User      : user3@example.com        / User@123");
}
main()
    .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
