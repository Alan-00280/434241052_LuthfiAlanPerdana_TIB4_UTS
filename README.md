# Ticket Management System - Mobile Application

Sistem manajemen tiket keluhan berbasis mobile yang menghubungkan pengguna dengan tim helpdesk/admin secara real-time. Aplikasi ini memungkinkan pengguna membuat tiket, melacak status, dan berkomunikasi langsung dengan support team.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi Stack](#teknologi-stack)
- [Ruang Lingkup](#ruang-lingkup)
- [Functional Requirements](#functional-requirements)
- [Non-Functional Requirements](#non-functional-requirements)
- [Arsitektur Sistem](#arsitektur-sistem)
- [UI/UX Screens](#uiux-screens)
- [Installation](#installation)
- [API Integration](#api-integration)
- [Database Schema](#database-schema)
- [Timeline](#timeline)

---

## 🎯 Fitur Utama

### Untuk Pengguna (User)
- ✅ **Autentikasi**: Login, Register, Logout, Reset Password
- ✅ **Membuat Tiket**: Laporan keluhan dengan upload file/gambar dari kamera atau galeri
- ✅ **Tracking Tiket**: Melihat status real-time tiket yang dibuat
- ✅ **Komunikasi**: Memberikan komentar/reply pada tiket
- ✅ **Notifikasi**: Menerima update status tiket
- ✅ **Dashboard**: Statistik dan ringkasan tiket
- ✅ **Riwayat**: Melihat daftar tiket yang pernah dibuat

### Untuk Admin/Helpdesk & Tech Support
- ✅ **Manajemen Pengguna (Admin)**: Mengelola akun staff, role, dan menonaktifkan pengguna inaktif (soft delete).
- ✅ **Manajemen Tiket**: Melihat semua tiket masuk
- ✅ **Assign Tiket**: Menugaskan tiket ke support staff (Tech Support)
- ✅ **Update Status**: Mengubah status tiket (Open, Assigned, In Progress, Pending, Resolved, Closed)
- ✅ **Penanganan Tiket (Tech Support)**: Menerima tiket *Assigned* dan melakukan otomasi ke *In Progress*, hingga penyelesaian *Resolved*.
- ✅ **Response**: Memberikan balasan/komentar pada tiket secara realtime (WebSocket Broadcast).
- ✅ **Dashboard**: Statistik dan analytics tiket (6 Kartu Status).
- ✅ **Tracking**: Memantau penanganan setiap tiket dengan notifikasi realtime (CDC).

---

## 🛠 Teknologi Stack

### Frontend (Mobile)
```
Platform: Flutter
Languages: Dart
State Management: Provider / Riverpod / GetX
Local Storage: SQLite / SharedPreferences
API Client: Dio / HTTP
Image Handling: Image Picker / Camera
```

### Backend
```
Framework: Node.js (Hono) / Golang / Laravel
Language: JavaScript/TypeScript / Go / PHP
API Style: RESTful API
Authentication: JWT Token (Supabase Auth)
```

### Database
```
Primary: PostgreSQL / MySQL
ORM: Prisma / Sequelize / SQLAlchemy
Caching: Redis (optional)
```

### Backend-as-a-Service (BaaS)
```
Authentication: Supabase Auth
File Storage: Supabase Storage / Firebase Storage
Real-time Database: Firebase Realtime / Supabase Realtime
Push Notifications: Firebase Cloud Messaging (FCM)
```

### DevOps & Tools
```
Version Control: Git / GitHub
API Testing: Postman / Insomnia
Project Management: Jira / Trello
CI/CD: GitHub Actions / GitLab CI
Deployment: Docker / Kubernetes / Cloud Run
```

---

## 📐 Ruang Lingkup

### 1. Pengguna (User)
- Membuat tiket keluhan dengan deskripsi dan attachment
- Melihat daftar dan detail tiket yang telah dibuat
- Melacak status penanganan tiket secara real-time
- Berkomunikasi dengan helpdesk melalui komentar
- Menerima notifikasi perubahan status tiket
- Melihat statistik tiket di dashboard
- Mengakses riwayat lengkap tiket

### 2. Admin/Helpdesk & Tech Support
- Manajemen pengguna (Tambah staff, nonaktifkan akun inaktif dengan proteksi Guard UI)
- Melihat dashboard dengan statistik tiket (6 Kartu Status)
- Mengelola semua tiket yang masuk
- Assign tiket ke staff (Tech Support) yang tepat dan aktif
- Update status tiket (Open → Assigned → In Progress → Pending → Resolved → Closed)
- Penanganan teknis (Otomasi In Progress & tombol khusus Done/Confirm)
- Memberikan response/feedback pada setiap tiket (Real-time Broadcast)
- Melihat tracking penanganan tiket
- Generate laporan dan analytics

---

## 📝 Functional Requirements

### FR-001: Login
- **Deskripsi**: Pengguna dapat login menggunakan username/email dan password
- **Actor**: Semua tipe user (User, Admin, Helpdesk)
- **Flow**:
  1. Input username/email dan password
  2. Validasi credential di backend
  3. Generate JWT token via Supabase Auth
  4. Simpan token di local storage
  5. Redirect ke dashboard

### FR-002: Logout
- **Deskripsi**: Pengguna dapat logout dan session berakhir
- **Actor**: Semua tipe user
- **Flow**:
  1. Tap tombol logout
  2. Hapus JWT token dari local storage
  3. Clear session data
  4. Redirect ke login screen

### FR-003: Register
- **Deskripsi**: Pengguna baru dapat melakukan pendaftaran
- **Actor**: User (Regular user)
- **Flow**:
  1. Input nama, email, nomor HP, password
  2. Validasi format email dan password strength
  3. Buat akun di Supabase Auth
  4. Simpan profile data ke database
  5. Kirim email verification (optional)
  6. Redirect ke login

### FR-004: Reset Password
- **Deskripsi**: Pengguna dapat reset password jika lupa
- **Actor**: Semua tipe user
- **Flow**:
  1. Klik "Lupa Password" di login screen
  2. Input email terdaftar
  3. Kirim reset link via email
  4. User klik link dan input password baru
  5. Update password di Supabase Auth

### FR-005: User Ticket Management
- **Deskripsi**: User dapat membuat, melihat, dan mengelola tiket
- **Actor**: User
- **Flow**:
  1. **Buat Tiket**:
     - Input judul, kategori, deskripsi, priority
     - Upload file/gambar (dari kamera atau galeri)
     - Submit → Buat entry di database
  2. **Lihat Daftar Tiket**:
     - Tampilkan list tiket user dengan status
     - Implementasi lazy loading
  3. **Lihat Detail Tiket**:
     - Tampilkan informasi lengkap tiket
     - Attachment yang di-upload
     - Timeline aktivitas
  4. **Berikan Komentar**:
     - Input reply/komentar pada tiket
     - Real-time update ke helpdesk

### FR-006: Admin/Helpdesk Ticket Management
- **Deskripsi**: Admin/Helpdesk mengelola semua tiket masuk
- **Actor**: Admin, Helpdesk
- **Flow**:
  1. **Lihat Semua Tiket**:
     - Filter by status, kategori, priority
     - Sorting by created date, priority
  2. **Assign Tiket**:
     - Pilih staff yang tepat
     - Update assigned_to field di database
  3. **Update Status**:
     - Change status: Open → Assigned → In Progress → Pending → Resolved → Closed
     - Add notes/reason untuk perubahan
  4. **Response/Reply**:
     - Berikan feedback kepada user
     - Trigger notifikasi ke user

### FR-007: Notification System
- **Deskripsi**: Sistem notifikasi push untuk update tiket
- **Actor**: Semua tipe user
- **Flow**:
  1. Tiket status berubah atau komentar baru → trigger CDC (Supabase Realtime) / FCM
  2. Kirim push notification & real-time event ke device user
  3. Tap notifikasi → navigate ke detail tiket
  4. Simpan notifikasi history di database

### FR-008: Dashboard & Statistics
- **Deskripsi**: Menampilkan ringkasan dan statistik tiket
- **Actor**: Semua tipe user
- **Metrics** (User):
  - Total tiket dibuat
  - Status breakdown (Open, Assigned, In Progress, Pending, Resolved, Closed)
  - Rata-rata waktu resolusi
- **Metrics** (Admin/Helpdesk):
  - Total tiket dalam sistem
  - Tiket per staff member
  - SLA compliance
  - Tiket by kategori dan priority

### FR-010: Ticket History
- **Deskripsi**: Menampilkan riwayat lengkap tiket
- **Actor**: Semua tipe user
- **Flow**:
  1. User: Lihat semua tiket yang pernah dibuat
  2. Admin/Helpdesk: Lihat riwayat penanganan tiket
  3. Filter by date range, status, kategori
  4. Export history (PDF/CSV) - optional

### FR-011: Ticket Tracking
- **Deskripsi**: Real-time tracking status tiket
- **Actor**: Semua tipe user
- **Flow** (User):
  1. Buka detail tiket
  2. Lihat timeline: Created → Assigned → In Progress → Pending → Resolved → Closed
  3. Waktu estimasi resolusi (jika ada SLA)
- **Flow** (Admin/Helpdesk):
  1. Dashboard menampilkan tiket yang sedang ditangani
  2. Timeline aktivitas untuk setiap tiket
  3. Last update time

---

## 📊 Non-Functional Requirements

### Performance
- **Lazy Loading**: List tiket dimuat secara bertahap (pagination/infinite scroll)
- **Load Time**: Setiap screen harus load < 2 detik
- **API Response**: Maximum 1 detik untuk response API
- **Database Query**: Optimasi dengan indexing dan caching
- **Image Optimization**: Compress image sebelum upload

### Usability
- **Responsive UI**: Mendukung berbagai ukuran layar (phone, tablet)
- **Consistency**: Design language yang konsisten antar halaman
- **Accessibility**: Mendukung dark & light mode
- **Navigation**: Menu intuitif dan mudah dipahami
- **Error Handling**: Pesan error yang jelas dan helpful

### Compatibility
- **Platform**: Android (min SDK 21) & iOS (min 11.0)
- **Device**: Support phone dengan berbagai screen size
- **Network**: Offline mode handling (cached data)

### Maintainability
- **Clean Architecture**: Separation of concerns (UI, Logic, Data)
- **Code Quality**: 
  - Consistent naming convention
  - Unit & integration tests
  - Code documentation
- **Version Control**: Git workflow (main, develop, feature branches)
- **API Documentation**: OpenAPI/Swagger spec

### Security
- **JWT Token**: Secure token storage & validation
- **Password**: Minimum 8 char, hashing dengan bcrypt
- **SSL/TLS**: Encrypted network communication
- **Data Privacy**: Compliance dengan privacy policy
- **Input Validation**: Sanitize semua user input

---

## 🏗 Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────────────┐
│                      MOBILE CLIENT (Flutter)                     │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Presentation Layer (UI/UX)                              │   │
│  │  - Login, Dashboard, List Tiket, etc     │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Business Logic Layer (State Management)                │   │
│  │  - Provider / Riverpod / GetX                            │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Data Layer (API Client, Local Storage)                 │   │
│  │  - Dio/HTTP, SQLite, SharedPreferences                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ REST API
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Hono/Node.js)                    │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  REST API Endpoints                                      │   │
│  │  - Auth: /auth/login, /auth/register, /auth/logout      │   │
│  │  - Ticket: /tickets (CRUD), /tickets/:id/assign, etc   │   │
│  │  - Users: /users, /users/:id/profile                    │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Business Logic                                          │   │
│  │  - Authentication, Ticket Management, Validation        │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Middleware & Services                                   │   │
│  │  - JWT Verification, Error Handling, Logging            │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↕ ORM (Prisma)           ↕ JWT Verify    ↕ File Upload
┌──────────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   PostgreSQL DB      │    │  Supabase Auth   │    │ Supabase Storage │
│  - Users             │    │  - Auth & JWT    │    │ - File Storage   │
│  - Tickets           │    │  - Token Gen     │    │ - Image Storage  │
│  - Comments          │    │                  │    │                  │
│  - Notifications     │    │                  │    │                  │
└──────────────────────┘    └──────────────────┘    └──────────────────┘
                                                          
```

---

## 🎨 UI/UX Screens

### 1. Splash Screen
- Logo aplikasi
- Loading indicator
- Auto navigate ke login/dashboard sesuai auth state

### 2. Login Screen
- Input: Email/Username & Password
- "Lupa Password?" link
- "Belum punya akun?" → Register
- Social login (optional)
- Dark/Light mode toggle

### 3. Register Screen
- Input: Nama, Email, No HP, Password, Confirm Password
- Password strength indicator
- Terms & conditions checkbox
- Back to login button

### 4. Dashboard
- Welcome greeting
- Quick stats (Total tiket, status breakdown)
- Recent tickets list
- Quick action buttons (Buat Tiket, Lihat Semua)
- Navigation bar: Dashboard, Tiket, Profile
- Admin-specific: Analytics, Staff Performance

### 5. List Tiket
- Filter by: Status, Category, Priority, Date range
- Search functionality
- Sorting options (Newest, Priority, Status)
- Lazy loading / Pagination
- Each item: ID, Title, Status, Priority, Created Date, Avatar
- Swipe to assign (admin only)

### 6. Detail Tiket
- Header: Tiket ID, Status, Priority, Category
- Ticket Info: Title, Description, Created by, Created date
- Attachment section: Preview image/file
- Timeline: All activities and comments
- Comment section: Input box, Submit button
- Action buttons:
  - User: Edit (if open), Close request
  - Admin: Assign, Update status, Add notes
- Related info: Assigned to, SLA deadline

### 7. Create Tiket
- Input fields:
  - Judul (required, max 200 char)
  - Kategori (dropdown)
  - Priority (Urgent, High, Medium, Low)
  - Deskripsi (required, max 2000 char)
- Upload section:
  - Camera: Ambil foto langsung
  - Gallery: Pilih dari galeri
  - Multiple attachment support
  - Preview thumbnail
- Buttons: Submit, Cancel, Clear form
- Validation & error messages

### 8. Profile Screen
- User Info: Nama, Email, No HP, Profile picture
- Statistics: Total tiket, Resolved, In progress
- Settings:
  - Notification preferences
  - Privacy settings
  - Language & timezone
  - Dark/Light mode
- Actions: Edit profile, Change password, Logout

### 9. Dark & Light Mode
- Consistent color scheme
- Toggle button di header/settings
- Persistent preference (save ke local storage)
- Apply ke semua screens

---

## 🚀 Installation

### Prerequisites
```
Flutter SDK: >= 3.0.0
Dart SDK: >= 3.0.0
Node.js: >= 16.0.0
PostgreSQL: >= 12
Git
```

### Clone Repository
```bash
git clone https://github.com/your-org/ticket-system.git
cd ticket-system
```

### Frontend Setup (Flutter)
```bash
cd mobile

# Install dependencies
flutter pub get

# Generate code (if using build_runner)
flutter pub run build_runner build

# Run on emulator/device
flutter run

# Build APK/IPA
flutter build apk
flutter build ios
```

### Backend Setup (Node.js + Hono)
```bash
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your config

# Run database migrations
npx prisma migrate dev

# Seed database (optional)
npx prisma db seed

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

### Database Setup
```bash
# Using Prisma
cd backend

# Create database
createdb ticket_system

# Run migrations
npx prisma migrate dev --name init

# View database
npx prisma studio
```

---

## 🔌 API Integration

### Base URL
```
Development: http://localhost:3000/api/v1
<!-- Production: https://api.ticketsystem.com/api/v1 -->
```

### Authentication
```
Header: Authorization: Bearer <JWT_TOKEN>
Token obtained from: Supabase Auth
Token refresh: Automatic or manual
```

### API Endpoints

#### Auth Endpoints
```
POST   /auth/register          # User registration
POST   /auth/login             # Login
POST   /auth/logout            # Logout
```
<!-- 
#### Ticket Endpoints
```
GET    /tickets                # List all tickets (with filters)
POST   /tickets                # Create new ticket
GET    /tickets/:id            # Get ticket detail
PUT    /tickets/:id            # Update ticket
DELETE /tickets/:id            # Delete ticket
PATCH  /tickets/:id/status     # Update ticket status
PATCH  /tickets/:id/assign     # Assign ticket to staff

GET    /tickets/:id/comments   # Get ticket comments
POST   /tickets/:id/comments   # Add comment
DELETE /tickets/:id/comments/:commentId  # Delete comment

GET    /tickets/:id/attachments  # List attachments
POST   /tickets/:id/attachments  # Upload attachment
DELETE /tickets/:id/attachments/:attachmentId
```

#### User Endpoints
```
GET    /users                  # List users (admin only)
GET    /users/:id              # Get user profile
PUT    /users/:id              # Update user profile
GET    /users/:id/tickets      # Get user tickets
GET    /users/:id/statistics   # Get user statistics
```

#### Admin Endpoints
```
GET    /admin/dashboard        # Dashboard stats
GET    /admin/tickets          # All tickets with filters
GET    /admin/reports          # Generate reports
GET    /admin/staff            # List staff members
``` -->

---

## 💾 Database Schema
<!-- 
### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20),
  profile_picture_url TEXT,
  role ENUM('user', 'helpdesk', 'techsupport', 'admin') DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### Tickets Table
```sql
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number VARCHAR(50) UNIQUE NOT NULL,
  user_id UUID NOT NULL REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  category VARCHAR(100) NOT NULL,
  priority ENUM('urgent', 'high', 'medium', 'low') DEFAULT 'medium',
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'assigned', 'in_progress', 'pending', 'resolved', 'closed') DEFAULT 'open',
  sla_deadline TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_user_id ON tickets(user_id);
CREATE INDEX idx_assigned_to ON tickets(assigned_to);
CREATE INDEX idx_status ON tickets(status);
```

### Comments Table
```sql
CREATE TABLE comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  is_internal BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_ticket_id ON comments(ticket_id);
```

### Attachments Table
```sql
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  file_type VARCHAR(100),
  uploaded_by UUID NOT NULL REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_ticket_id ON attachments(ticket_id);
```

### Notifications Table
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  ticket_id UUID REFERENCES tickets(id),
  type VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  is_read BOOLEAN DEFAULT false,
  action_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  deleted_at TIMESTAMP
);

CREATE INDEX idx_user_id ON notifications(user_id);
CREATE INDEX idx_is_read ON notifications(is_read);
``` -->

---

<!-- ## 📅 Timeline & Milestones

### Phase 1: Planning & Design (Week 1-2)
- [x] Requirement gathering & analysis
- [x] UI/UX mockup design
- [x] Database schema design
- [x] API specification (OpenAPI)
- [x] Architecture planning

### Phase 2: Setup & Infrastructure (Week 3)
- [ ] Project setup (Flutter, Node.js)
- [ ] Database initialization
- [ ] Supabase project setup
- [ ] Firebase project setup
- [ ] Environment configuration

### Phase 3: Backend Development (Week 4-6)
- [ ] Auth service (login, register, JWT)
- [ ] Ticket CRUD operations
- [ ] User management
- [ ] Comment system
- [ ] File upload handling
- [ ] Notification service
- [ ] Admin features

### Phase 4: Frontend Development (Week 4-7)
- [ ] Login & Register screens
- [ ] Dashboard & statistics
- [ ] Ticket list & filter
- [ ] Create ticket workflow
- [ ] Ticket detail & comments
- [ ] Profile management
- [ ] Dark/Light mode
- [ ] Push notifications

### Phase 5: Integration & Testing (Week 8)
- [ ] API integration
- [ ] Unit testing (Backend & Frontend)
- [ ] Integration testing
- [ ] User acceptance testing (UAT)
- [ ] Bug fixing & optimization

### Phase 6: Deployment (Week 9)
- [ ] Backend deployment (Cloud Run/Docker)
- [ ] Database migration to production
- [ ] APK/IPA build & signing
- [ ] App store/Play store submission
- [ ] Production monitoring setup

### Phase 7: Documentation & Handover (Week 10)
- [ ] API documentation complete
- [ ] Code documentation
- [ ] Deployment guide
- [ ] User manual
- [ ] Handover to maintenance team

--- -->


---

**Last Updated**: April 2026  
**Version**: 1.0.0  
**Status**: Complete V1.0.0
