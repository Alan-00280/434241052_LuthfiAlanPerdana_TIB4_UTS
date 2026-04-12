import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js'
import { UserRole, TicketStatus, TicketPriority, NotificationType, AttachmentSource } from '../src/generated/prisma/enums.js'

import * as bcrypt from 'bcrypt'


const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

async function main() {
  console.log('🌱 Starting seed...')

  // ─────────────────────────────────────────
  // USERS
  // ─────────────────────────────────────────

  console.log('👤 Seeding users...')

  const admin = await prisma.user.upsert({
    where: { email: 'admin@helpdesk.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@helpdesk.com',
      passwordHash: await hashPassword('Admin@123'),
      role: UserRole.ADMIN,
      fullName: 'Administrator',
      phone: '081200000001',
    },
  })

  const helpdesk1 = await prisma.user.upsert({
    where: { email: 'helpdesk1@helpdesk.com' },
    update: {},
    create: {
      username: 'helpdesk_budi',
      email: 'helpdesk1@helpdesk.com',
      passwordHash: await hashPassword('Helpdesk@123'),
      role: UserRole.HELPDESK,
      fullName: 'Budi Santoso',
      phone: '081200000002',
    },
  })

  const helpdesk2 = await prisma.user.upsert({
    where: { email: 'helpdesk2@helpdesk.com' },
    update: {},
    create: {
      username: 'helpdesk_sari',
      email: 'helpdesk2@helpdesk.com',
      passwordHash: await hashPassword('Helpdesk@123'),
      role: UserRole.HELPDESK,
      fullName: 'Sari Dewi',
      phone: '081200000003',
    },
  })

  const user1 = await prisma.user.upsert({
    where: { email: 'user1@example.com' },
    update: {},
    create: {
      username: 'andi_pratama',
      email: 'user1@example.com',
      passwordHash: await hashPassword('User@123'),
      role: UserRole.USER,
      fullName: 'Andi Pratama',
      phone: '081300000001',
    },
  })

  const user2 = await prisma.user.upsert({
    where: { email: 'user2@example.com' },
    update: {},
    create: {
      username: 'rina_kusuma',
      email: 'user2@example.com',
      passwordHash: await hashPassword('User@123'),
      role: UserRole.USER,
      fullName: 'Rina Kusuma',
      phone: '081300000002',
    },
  })

  const user3 = await prisma.user.upsert({
    where: { email: 'user3@example.com' },
    update: {},
    create: {
      username: 'doni_wijaya',
      email: 'user3@example.com',
      passwordHash: await hashPassword('User@123'),
      role: UserRole.USER,
      fullName: 'Doni Wijaya',
      phone: '081300000003',
    },
  })

  console.log('✅ Users seeded')

  // ─────────────────────────────────────────
  // TICKET CATEGORIES
  // ─────────────────────────────────────────

  console.log('🏷️  Seeding categories...')

  const categories = await Promise.all([
    prisma.ticketCategory.upsert({
      where: { name: 'Jaringan & Konektivitas' },
      update: {},
      create: { name: 'Jaringan & Konektivitas', description: 'Masalah internet, WiFi, VPN, dan koneksi jaringan' },
    }),
    prisma.ticketCategory.upsert({
      where: { name: 'Perangkat Keras' },
      update: {},
      create: { name: 'Perangkat Keras', description: 'Kerusakan komputer, printer, dan perangkat fisik lainnya' },
    }),
    prisma.ticketCategory.upsert({
      where: { name: 'Perangkat Lunak' },
      update: {},
      create: { name: 'Perangkat Lunak', description: 'Bug aplikasi, instalasi software, dan lisensi' },
    }),
    prisma.ticketCategory.upsert({
      where: { name: 'Akun & Akses' },
      update: {},
      create: { name: 'Akun & Akses', description: 'Reset password, hak akses, dan manajemen akun' },
    }),
    prisma.ticketCategory.upsert({
      where: { name: 'Lainnya' },
      update: {},
      create: { name: 'Lainnya', description: 'Keluhan atau permintaan yang tidak termasuk kategori di atas' },
    }),
  ])

  const [catJaringan, catHardware, catSoftware, catAkun, catLainnya] = categories

  console.log('✅ Categories seeded')

  // ─────────────────────────────────────────
  // TICKETS
  // ─────────────────────────────────────────

  console.log('🎫 Seeding tickets...')

  // Ticket 1 — OPEN, belum di-assign
  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Tidak bisa terhubung ke WiFi kantor',
      description: 'Sejak pagi tadi laptop saya tidak bisa terhubung ke jaringan WiFi kantor. Sudah dicoba restart tapi tetap tidak bisa. Perangkat lain sepertinya bisa terhubung normal.',
      status: TicketStatus.OPEN,
      priority: TicketPriority.HIGH,
      creatorId: user1.id,
      categoryId: catJaringan.id,
    },
  })

  // Ticket 2 — IN_PROGRESS, sudah di-assign ke helpdesk1
  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Printer tidak bisa mencetak dokumen',
      description: 'Printer di ruang administrasi menampilkan error "Paper Jam" padahal tidak ada kertas yang tersangkut. Sudah dibersihkan tapi tetap muncul pesan yang sama.',
      status: TicketStatus.IN_PROGRESS,
      priority: TicketPriority.MEDIUM,
      creatorId: user2.id,
      assigneeId: helpdesk1.id,
      categoryId: catHardware.id,
    },
  })

  // Ticket 3 — RESOLVED
  const ticket3 = await prisma.ticket.create({
    data: {
      title: 'Lupa password akun email kantor',
      description: 'Saya tidak bisa login ke email kantor karena lupa password. Mohon bantuan untuk reset password.',
      status: TicketStatus.RESOLVED,
      priority: TicketPriority.LOW,
      creatorId: user3.id,
      assigneeId: helpdesk2.id,
      categoryId: catAkun.id,
      resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 jam lalu
    },
  })

  // Ticket 4 — PENDING, sudah di-assign ke helpdesk2
  const ticket4 = await prisma.ticket.create({
    data: {
      title: 'Aplikasi ERP crash saat buka laporan bulanan',
      description: 'Setiap kali membuka menu laporan bulanan di aplikasi ERP, aplikasi langsung tertutup sendiri. Sudah terjadi sejak update versi terbaru kemarin.',
      status: TicketStatus.PENDING,
      priority: TicketPriority.CRITICAL,
      creatorId: user1.id,
      assigneeId: helpdesk2.id,
      categoryId: catSoftware.id,
    },
  })

  // Ticket 5 — CLOSED
  const ticket5 = await prisma.ticket.create({
    data: {
      title: 'Permintaan penambahan akses folder shared drive',
      description: 'Saya membutuhkan akses ke folder "Dokumen Proyek 2024" di shared drive untuk keperluan pekerjaan tim.',
      status: TicketStatus.CLOSED,
      priority: TicketPriority.LOW,
      creatorId: user2.id,
      assigneeId: helpdesk1.id,
      categoryId: catAkun.id,
      resolvedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 hari lalu
      closedAt: new Date(Date.now() - 1000 * 60 * 60 * 20),   // 20 jam lalu
    },
  })

  console.log('✅ Tickets seeded')

  // ─────────────────────────────────────────
  // ATTACHMENTS
  // ─────────────────────────────────────────

  console.log('📎 Seeding attachments...')

  await prisma.attachment.createMany({
    data: [
      {
        ticketId: ticket1.id,
        fileName: 'screenshot_error_wifi.png',
        fileUrl: 'https://storage.example.com/attachments/screenshot_error_wifi.png',
        fileSize: 204800,
        mimeType: 'image/png',
        source: AttachmentSource.CAMERA,
      },
      {
        ticketId: ticket2.id,
        fileName: 'foto_printer_error.jpg',
        fileUrl: 'https://storage.example.com/attachments/foto_printer_error.jpg',
        fileSize: 512000,
        mimeType: 'image/jpeg',
        source: AttachmentSource.CAMERA,
      },
      {
        ticketId: ticket4.id,
        fileName: 'log_erp_crash.txt',
        fileUrl: 'https://storage.example.com/attachments/log_erp_crash.txt',
        fileSize: 8192,
        mimeType: 'text/plain',
        source: AttachmentSource.UPLOAD,
      },
      {
        ticketId: ticket4.id,
        fileName: 'screenshot_erp_error.png',
        fileUrl: 'https://storage.example.com/attachments/screenshot_erp_error.png',
        fileSize: 307200,
        mimeType: 'image/png',
        source: AttachmentSource.CAMERA,
      },
    ],
  })

  console.log('✅ Attachments seeded')

  // ─────────────────────────────────────────
  // TICKET COMMENTS
  // ─────────────────────────────────────────

  console.log('💬 Seeding comments...')

  await prisma.ticketComment.createMany({
    data: [
      // Ticket 2 (printer)
      {
        ticketId: ticket2.id,
        authorId: helpdesk1.id,
        body: 'Halo, terima kasih telah melaporkan masalah ini. Saya akan segera datang ke ruang administrasi untuk mengecek printer secara langsung.',
      },
      {
        ticketId: ticket2.id,
        authorId: user2.id,
        body: 'Baik, saya tunggu di ruang administrasi ya. Terima kasih.',
      },
      {
        ticketId: ticket2.id,
        authorId: helpdesk1.id,
        body: 'Sudah saya cek. Ternyata ada sisa potongan kertas kecil yang tersangkut di dalam roller. Sedang dalam proses pembersihan.',
      },
      // Ticket 3 (password — resolved)
      {
        ticketId: ticket3.id,
        authorId: helpdesk2.id,
        body: 'Halo, password email Anda sudah kami reset. Silakan cek SMS untuk password sementara dan segera ganti setelah login.',
      },
      {
        ticketId: ticket3.id,
        authorId: user3.id,
        body: 'Sudah berhasil login. Terima kasih atas bantuannya!',
      },
      // Ticket 4 (ERP crash)
      {
        ticketId: ticket4.id,
        authorId: helpdesk2.id,
        body: 'Terima kasih sudah menyertakan log error. Saya sudah eskalasi ke tim developer untuk investigasi lebih lanjut. Mohon ditunggu.',
      },
      {
        ticketId: ticket4.id,
        authorId: user1.id,
        body: 'Baik, apakah ada perkiraan waktu penyelesaiannya?',
      },
      {
        ticketId: ticket4.id,
        authorId: helpdesk2.id,
        body: 'Estimasi 1–2 hari kerja. Tim developer sedang menganalisis log yang Anda kirimkan.',
      },
    ],
  })

  console.log('✅ Comments seeded')

  // ─────────────────────────────────────────
  // TICKET HISTORIES
  // ─────────────────────────────────────────

  console.log('📋 Seeding ticket histories...')

  await prisma.ticketHistory.createMany({
    data: [
      // Ticket 2: dibuat → assign → in progress
      {
        ticketId: ticket2.id,
        changedById: admin.id,
        field: 'assignee',
        oldValue: null,
        newValue: helpdesk1.fullName,
        note: 'Tiket di-assign ke helpdesk',
      },
      {
        ticketId: ticket2.id,
        changedById: helpdesk1.id,
        field: 'status',
        oldValue: TicketStatus.OPEN,
        newValue: TicketStatus.IN_PROGRESS,
        note: 'Helpdesk mulai menangani tiket',
      },
      // Ticket 3: assign → in progress → resolved
      {
        ticketId: ticket3.id,
        changedById: admin.id,
        field: 'assignee',
        oldValue: null,
        newValue: helpdesk2.fullName,
        note: 'Tiket di-assign ke helpdesk',
      },
      {
        ticketId: ticket3.id,
        changedById: helpdesk2.id,
        field: 'status',
        oldValue: TicketStatus.OPEN,
        newValue: TicketStatus.IN_PROGRESS,
        note: 'Sedang proses reset password',
      },
      {
        ticketId: ticket3.id,
        changedById: helpdesk2.id,
        field: 'status',
        oldValue: TicketStatus.IN_PROGRESS,
        newValue: TicketStatus.RESOLVED,
        note: 'Password berhasil direset dan dikonfirmasi user',
      },
      // Ticket 4: assign → pending
      {
        ticketId: ticket4.id,
        changedById: admin.id,
        field: 'assignee',
        oldValue: null,
        newValue: helpdesk2.fullName,
        note: 'Tiket di-assign ke helpdesk',
      },
      {
        ticketId: ticket4.id,
        changedById: helpdesk2.id,
        field: 'status',
        oldValue: TicketStatus.OPEN,
        newValue: TicketStatus.IN_PROGRESS,
        note: 'Investigasi dimulai',
      },
      {
        ticketId: ticket4.id,
        changedById: helpdesk2.id,
        field: 'status',
        oldValue: TicketStatus.IN_PROGRESS,
        newValue: TicketStatus.PENDING,
        note: 'Menunggu feedback dari tim developer',
      },
      // Ticket 5: assign → in progress → resolved → closed
      {
        ticketId: ticket5.id,
        changedById: admin.id,
        field: 'assignee',
        oldValue: null,
        newValue: helpdesk1.fullName,
        note: 'Tiket di-assign ke helpdesk',
      },
      {
        ticketId: ticket5.id,
        changedById: helpdesk1.id,
        field: 'status',
        oldValue: TicketStatus.OPEN,
        newValue: TicketStatus.RESOLVED,
        note: 'Akses folder sudah diberikan',
      },
      {
        ticketId: ticket5.id,
        changedById: admin.id,
        field: 'status',
        oldValue: TicketStatus.RESOLVED,
        newValue: TicketStatus.CLOSED,
        note: 'Tiket ditutup setelah konfirmasi user',
      },
    ],
  })

  console.log('✅ Ticket histories seeded')

  // ─────────────────────────────────────────
  // NOTIFICATIONS
  // ─────────────────────────────────────────

  console.log('🔔 Seeding notifications...')

  await prisma.notification.createMany({
    data: [
      // Notif untuk admin: tiket baru masuk
      {
        userId: admin.id,
        ticketId: ticket1.id,
        type: NotificationType.TICKET_CREATED,
        title: 'Tiket baru masuk',
        body: 'Andi Pratama membuat tiket: "Tidak bisa terhubung ke WiFi kantor"',
        isRead: false,
      },
      {
        userId: admin.id,
        ticketId: ticket4.id,
        type: NotificationType.TICKET_CREATED,
        title: 'Tiket baru masuk',
        body: 'Andi Pratama membuat tiket: "Aplikasi ERP crash saat buka laporan bulanan"',
        isRead: true,
        readAt: new Date(),
      },
      // Notif untuk helpdesk1: dapat assign
      {
        userId: helpdesk1.id,
        ticketId: ticket2.id,
        type: NotificationType.TICKET_ASSIGNED,
        title: 'Tiket baru di-assign ke kamu',
        body: 'Kamu mendapat tiket: "Printer tidak bisa mencetak dokumen"',
        isRead: true,
        readAt: new Date(),
      },
      // Notif untuk helpdesk2: dapat assign
      {
        userId: helpdesk2.id,
        ticketId: ticket3.id,
        type: NotificationType.TICKET_ASSIGNED,
        title: 'Tiket baru di-assign ke kamu',
        body: 'Kamu mendapat tiket: "Lupa password akun email kantor"',
        isRead: true,
        readAt: new Date(),
      },
      {
        userId: helpdesk2.id,
        ticketId: ticket4.id,
        type: NotificationType.TICKET_ASSIGNED,
        title: 'Tiket baru di-assign ke kamu',
        body: 'Kamu mendapat tiket: "Aplikasi ERP crash saat buka laporan bulanan"',
        isRead: true,
        readAt: new Date(),
      },
      // Notif untuk user: status update
      {
        userId: user2.id,
        ticketId: ticket2.id,
        type: NotificationType.TICKET_STATUS_UPDATED,
        title: 'Status tiket diperbarui',
        body: 'Tiket "Printer tidak bisa mencetak dokumen" sedang dalam proses penanganan.',
        isRead: false,
      },
      {
        userId: user3.id,
        ticketId: ticket3.id,
        type: NotificationType.TICKET_RESOLVED,
        title: 'Tiket kamu berhasil diselesaikan',
        body: 'Tiket "Lupa password akun email kantor" telah diselesaikan. Silakan konfirmasi.',
        isRead: true,
        readAt: new Date(),
      },
      {
        userId: user1.id,
        ticketId: ticket4.id,
        type: NotificationType.TICKET_COMMENT_ADDED,
        title: 'Komentar baru pada tiketmu',
        body: 'Sari Dewi membalas tiket "Aplikasi ERP crash saat buka laporan bulanan".',
        isRead: false,
      },
      {
        userId: user2.id,
        ticketId: ticket5.id,
        type: NotificationType.TICKET_CLOSED,
        title: 'Tiket ditutup',
        body: 'Tiket "Permintaan penambahan akses folder shared drive" telah ditutup.',
        isRead: true,
        readAt: new Date(),
      },
    ],
  })

  console.log('✅ Notifications seeded')

  // ─────────────────────────────────────────
  // SUMMARY
  // ─────────────────────────────────────────

  console.log('\n🎉 Seed completed!')
  console.log('─────────────────────────────────')
  console.log('📊 Summary:')
  console.log(`   Users         : 6  (1 admin, 2 helpdesk, 3 user)`)
  console.log(`   Categories    : 5`)
  console.log(`   Tickets       : 5  (1 open, 1 in_progress, 1 pending, 1 resolved, 1 closed)`)
  console.log(`   Attachments   : 4`)
  console.log(`   Comments      : 8`)
  console.log(`   Histories     : 11`)
  console.log(`   Notifications : 9`)
  console.log('─────────────────────────────────')
  console.log('\n🔑 Login credentials:')
  console.log('   Admin     : admin@helpdesk.com       / Admin@123')
  console.log('   Helpdesk  : helpdesk1@helpdesk.com   / Helpdesk@123')
  console.log('   Helpdesk  : helpdesk2@helpdesk.com   / Helpdesk@123')
  console.log('   User      : user1@example.com        / User@123')
  console.log('   User      : user2@example.com        / User@123')
  console.log('   User      : user3@example.com        / User@123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })