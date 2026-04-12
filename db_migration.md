# 📦 Database Migration Guide (Prisma + PostgreSQL)

Dokumentasi ini menjelaskan cara melakukan migrasi database menggunakan Prisma untuk sistem **Helpdesk Ticketing**.

---

# 🧱 1. Prasyarat

Pastikan sudah tersedia:

* PostgreSQL berjalan di lokal
* Database sudah dibuat (contoh: `helpdesk_ticketing`)
* Prisma sudah terinstall

---

# ⚙️ 2. Setup Environment

Edit file `.env`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/helpdesk_ticketing"
```

---

# 🧬 3. Setup Prisma Schema

Pastikan file `prisma/schema.prisma` berisi:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Lalu tambahkan seluruh ENUM dan MODEL (sesuai yang sudah kamu definisikan).

---

# 🚀 4. Menjalankan Migrasi

Gunakan perintah berikut:

```bash
pnpm prisma migrate dev --name init
```

### Apa yang terjadi:

* Membuat migration file di `prisma/migrations`
* Membuat tabel di PostgreSQL
* Generate Prisma Client

---

# 🧩 5. Struktur Database yang Terbentuk

## ENUMS

* `UserRole`
* `TicketStatus`
* `TicketPriority`
* `NotificationType`
* `AttachmentSource`

---

## TABLES

### 👤 users

Menyimpan data user (admin, helpdesk, user biasa)

### 🔐 password_reset_tokens

Token reset password (relasi ke users)

### 🗂 ticket_categories

Kategori tiket

### 🎫 tickets

Data utama tiket helpdesk

Relasi:

* creator → users
* assignee → users
* category → ticket_categories

---

### 📎 attachments

File/gambar yang diupload ke tiket

---

### 💬 ticket_comments

Komentar pada tiket

---

### 🕓 ticket_histories

Log perubahan tiket (audit trail)

---

### 🔔 notifications

Notifikasi ke user terkait tiket

---

---
### Source Code
/ ─────────────────────────────────────────
// ENUMS
// ─────────────────────────────────────────

enum UserRole {
  USER
  HELPDESK
  ADMIN
}

enum TicketStatus {
  OPEN
  IN_PROGRESS
  PENDING
  RESOLVED
  CLOSED
}

enum TicketPriority {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum NotificationType {
  TICKET_CREATED
  TICKET_ASSIGNED
  TICKET_STATUS_UPDATED
  TICKET_COMMENT_ADDED
  TICKET_RESOLVED
  TICKET_CLOSED
}

enum AttachmentSource {
  UPLOAD   // dari file picker
  CAMERA   // dari kamera langsung
}

// ─────────────────────────────────────────
// USER & AUTH (FR-001 ~ FR-004)
// ─────────────────────────────────────────

model User {
  id             String    @id @default(uuid())
  username       String    @unique
  email          String    @unique
  passwordHash   String
  role           UserRole  @default(USER)
  fullName       String
  avatarUrl      String?
  phone          String?
  isActive       Boolean   @default(true)
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
  lastLoginAt    DateTime?

  // Auth
  passwordResetTokens PasswordResetToken[]

  // Ticket relations
  ticketsCreated    Ticket[]       @relation("TicketCreator")
  ticketsAssignedTo Ticket[]       @relation("TicketAssignee")
  comments          TicketComment[]
  ticketHistories   TicketHistory[]
  notifications     Notification[]

  @@map("users")
}

model PasswordResetToken {
  id        String   @id @default(uuid())
  token     String   @unique
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  usedAt    DateTime?
  createdAt DateTime @default(now())

  @@map("password_reset_tokens")
}

// ─────────────────────────────────────────
// TICKET CATEGORY (pengelompokan tiket)
// ─────────────────────────────────────────

model TicketCategory {
  id          String   @id @default(uuid())
  name        String   @unique
  description String?
  createdAt   DateTime @default(now())

  tickets Ticket[]

  @@map("ticket_categories")
}

// ─────────────────────────────────────────
// TICKET (FR-005, FR-006)
// ─────────────────────────────────────────

model Ticket {
  id          String         @id @default(uuid())
  title       String
  description String
  status      TicketStatus   @default(OPEN)
  priority    TicketPriority @default(MEDIUM)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
  resolvedAt  DateTime?
  closedAt    DateTime?

  // Relasi user
  creatorId   String
  creator     User           @relation("TicketCreator", fields: [creatorId], references: [id])

  // Assign ke helpdesk/admin (FR-006)
  assigneeId  String?
  assignee    User?          @relation("TicketAssignee", fields: [assigneeId], references: [id])

  // Kategori
  categoryId  String?
  category    TicketCategory? @relation(fields: [categoryId], references: [id])

  // Relasi lainnya
  attachments Attachment[]
  comments    TicketComment[]
  histories   TicketHistory[]
  notifications Notification[]

  @@map("tickets")
}

// ─────────────────────────────────────────
// ATTACHMENT — upload gambar/file (FR-005)
// ─────────────────────────────────────────

model Attachment {
  id        String           @id @default(uuid())
  ticketId  String
  ticket    Ticket           @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  fileName  String
  fileUrl   String
  fileSize  Int              // bytes
  mimeType  String
  source    AttachmentSource @default(UPLOAD)
  uploadedAt DateTime        @default(now())

  @@map("attachments")
}

// ─────────────────────────────────────────
// TICKET COMMENT — komentar / reply (FR-005)
// ─────────────────────────────────────────

model TicketComment {
  id        String   @id @default(uuid())
  ticketId  String
  ticket    Ticket   @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  authorId  String
  author    User     @relation(fields: [authorId], references: [id])
  body      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("ticket_comments")
}

// ─────────────────────────────────────────
// TICKET HISTORY — riwayat & tracking (FR-010, FR-011)
// ─────────────────────────────────────────

model TicketHistory {
  id          String       @id @default(uuid())
  ticketId    String
  ticket      Ticket       @relation(fields: [ticketId], references: [id], onDelete: Cascade)
  changedById String
  changedBy   User         @relation(fields: [changedById], references: [id])

  // Apa yang berubah
  field       String       // misal: "status", "assignee", "priority"
  oldValue    String?
  newValue    String?
  note        String?

  createdAt   DateTime     @default(now())

  @@map("ticket_histories")
}

// ─────────────────────────────────────────
// NOTIFICATION (FR-007)
// ─────────────────────────────────────────

model Notification {
  id         String           @id @default(uuid())
  userId     String
  user       User             @relation(fields: [userId], references: [id], onDelete: Cascade)
  ticketId   String?
  ticket     Ticket?          @relation(fields: [ticketId], references: [id], onDelete: SetNull)
  type       NotificationType
  title      String
  body       String
  isRead     Boolean          @default(false)
  readAt     DateTime?
  createdAt  DateTime         @default(now())

  @@map("notifications")
}
---

