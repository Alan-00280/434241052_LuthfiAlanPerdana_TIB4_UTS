--
-- PostgreSQL database dump
--

\restrict lT6sbqocHZsMUWXSk7PqHShijyCL7WhQFJ6nG7QHwrRFEu19m1wxO1kssvuicsy

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

-- Started on 2026-07-06 20:48:43

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5107 (class 1262 OID 46790)
-- Name: helpdesk_ticketing; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE helpdesk_ticketing WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';


ALTER DATABASE helpdesk_ticketing OWNER TO postgres;

\unrestrict lT6sbqocHZsMUWXSk7PqHShijyCL7WhQFJ6nG7QHwrRFEu19m1wxO1kssvuicsy
\connect helpdesk_ticketing
\restrict lT6sbqocHZsMUWXSk7PqHShijyCL7WhQFJ6nG7QHwrRFEu19m1wxO1kssvuicsy

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 72611)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 5108 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


--
-- TOC entry 900 (class 1247 OID 72670)
-- Name: AttachmentSource; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."AttachmentSource" AS ENUM (
    'UPLOAD',
    'CAMERA'
);


ALTER TYPE public."AttachmentSource" OWNER TO postgres;

--
-- TOC entry 897 (class 1247 OID 72656)
-- Name: NotificationType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."NotificationType" AS ENUM (
    'TICKET_CREATED',
    'TICKET_ASSIGNED',
    'TICKET_STATUS_UPDATED',
    'TICKET_COMMENT_ADDED',
    'TICKET_RESOLVED',
    'TICKET_CLOSED'
);


ALTER TYPE public."NotificationType" OWNER TO postgres;

--
-- TOC entry 879 (class 1247 OID 72857)
-- Name: TechSupportSpecialty; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TechSupportSpecialty" AS ENUM (
    'NETWORK',
    'HARDWARE',
    'SOFTWARE',
    'ACCOUNT_AUTH',
    'INFRASTRUCTURE'
);


ALTER TYPE public."TechSupportSpecialty" OWNER TO postgres;

--
-- TOC entry 894 (class 1247 OID 72646)
-- Name: TicketPriority; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TicketPriority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);


ALTER TYPE public."TicketPriority" OWNER TO postgres;

--
-- TOC entry 885 (class 1247 OID 76782)
-- Name: TicketStatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."TicketStatus" AS ENUM (
    'OPEN',
    'ASSIGNED',
    'IN_PROGRESS',
    'RESOLVED',
    'CLOSED',
    'PENDING'
);


ALTER TYPE public."TicketStatus" OWNER TO postgres;

--
-- TOC entry 891 (class 1247 OID 72627)
-- Name: UserRole; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."UserRole" AS ENUM (
    'USER',
    'HELPDESK',
    'ADMIN',
    'TECHSUPPORT'
);


ALTER TYPE public."UserRole" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 219 (class 1259 OID 72612)
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 72736)
-- Name: attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attachments (
    id text NOT NULL,
    "ticketId" text NOT NULL,
    "fileName" text NOT NULL,
    "fileUrl" text NOT NULL,
    "fileSize" integer NOT NULL,
    "mimeType" text NOT NULL,
    source public."AttachmentSource" DEFAULT 'UPLOAD'::public."AttachmentSource" NOT NULL,
    "uploadedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.attachments OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 72694)
-- Name: password_reset_tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.password_reset_tokens (
    id text NOT NULL,
    token text NOT NULL,
    "userId" text NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "usedAt" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.password_reset_tokens OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 72869)
-- Name: tech_support; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tech_support (
    id text NOT NULL,
    "userId" text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    speciality public."TechSupportSpecialty" DEFAULT 'SOFTWARE'::public."TechSupportSpecialty" NOT NULL
);


ALTER TABLE public.tech_support OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 72707)
-- Name: ticket_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket_categories (
    id text NOT NULL,
    name text NOT NULL,
    description text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ticket_categories OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 72767)
-- Name: ticket_histories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ticket_histories (
    id text NOT NULL,
    "ticketId" text NOT NULL,
    "changedById" text NOT NULL,
    field text NOT NULL,
    "oldValue" text,
    "newValue" text,
    note text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.ticket_histories OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 72718)
-- Name: tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tickets (
    id text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    status public."TicketStatus" DEFAULT 'OPEN'::public."TicketStatus" NOT NULL,
    priority public."TicketPriority" DEFAULT 'MEDIUM'::public."TicketPriority" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "resolvedAt" timestamp(3) without time zone,
    "closedAt" timestamp(3) without time zone,
    "creatorId" text NOT NULL,
    "assigneeId" text,
    "categoryId" text,
    "techSupportId" text
);


ALTER TABLE public.tickets OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 72675)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id text NOT NULL,
    username text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    role public."UserRole" DEFAULT 'USER'::public."UserRole" NOT NULL,
    "fullName" text NOT NULL,
    "avatarUrl" text,
    phone text,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "supabaseUid" text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 5094 (class 0 OID 72612)
-- Dependencies: 219
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public._prisma_migrations VALUES ('6c9183ec-ab8f-48f8-b5ed-c1893ff57017', 'fd200d664600d58d5d40737201cd3d4439ccc44f44c3a45be62f9f6983d1c588', '2026-06-27 08:52:52.446732+07', '20260412040046_init', NULL, NULL, '2026-06-27 08:52:52.311781+07', 1);
INSERT INTO public._prisma_migrations VALUES ('1e18a1cf-839b-4316-be67-597d4cd34d9d', '2ee41742d4effbe7b8e3530d26df7ef11a47c7dd33b6c01cd2d00aa7c7a98c59', '2026-06-27 08:52:52.452384+07', '20260416023305_add_supabase_uid', NULL, NULL, '2026-06-27 08:52:52.447448+07', 1);
INSERT INTO public._prisma_migrations VALUES ('ac06dba2-1cb9-4d9c-9404-8901b28f2b11', '15ebe64cd028ceb2a681a3648993f020b6a1994f0d18f1ea3dae47ecd8c85339', '2026-06-27 08:52:52.48071+07', '20260530050230_add_tech_support_table', NULL, NULL, '2026-06-27 08:52:52.452984+07', 1);
INSERT INTO public._prisma_migrations VALUES ('0214096f-f4fd-48ae-aedc-992694cda381', '8be10a9a3bc3501dbd4211388d4a499c48845683e9073e90b89d28903c133a15', '2026-06-27 08:52:52.495839+07', '20260627001028_moved_notification_table', NULL, NULL, '2026-06-27 08:52:52.48131+07', 1);
INSERT INTO public._prisma_migrations VALUES ('0d50dff0-6fdc-4774-8578-035975e4c93b', '65b6cf4e293b3ccc23b177ac529bd00e9d3037d3b69ef693c2a1369a99fc5f29', '2026-06-27 08:52:52.503703+07', '20260627001823_moving_ticket_comments', NULL, NULL, '2026-06-27 08:52:52.496858+07', 1);
INSERT INTO public._prisma_migrations VALUES ('4fc54d98-86f3-4da3-8cd8-8bc006d72550', 'f8a4a93547d4e82aa1ecd11e7167b92ee4e53b1fd5015f7f0b4fe776bb4fb4e9', NULL, '20260701154223_changed_enum_status_ticket', NULL, '2026-07-01 22:59:03.044958+07', '2026-07-01 22:42:23.201093+07', 0);
INSERT INTO public._prisma_migrations VALUES ('d14a585d-a1c0-41c1-9d68-3aae6e1f058f', 'f8a4a93547d4e82aa1ecd11e7167b92ee4e53b1fd5015f7f0b4fe776bb4fb4e9', '2026-07-01 23:01:28.98957+07', '20260701154223_changed_enum_status_ticket', NULL, NULL, '2026-07-01 23:01:28.923764+07', 1);
INSERT INTO public._prisma_migrations VALUES ('1bbd9b1e-e91d-40f6-979f-389fbe671cf6', 'e8d57d4283bbd95beccac9978da84b8146b7702e29ae6d9cc38ab227b3726092', '2026-07-01 23:01:29.856273+07', '20260701160129_changed_enum_status_ticket', NULL, NULL, '2026-07-01 23:01:29.852079+07', 1);


--
-- TOC entry 5099 (class 0 OID 72736)
-- Dependencies: 224
-- Data for Name: attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.attachments VALUES ('b20f6866-2752-4f24-ac1f-0f67c2aa8fb7', 'eb2e7702-b435-4af5-9604-830b7f3a34e6', 'screenshot_error_wifi.png', 'https://storage.example.com/attachments/screenshot_error_wifi.png', 204800, 'image/png', 'CAMERA', '2026-06-27 01:56:54.301');
INSERT INTO public.attachments VALUES ('7849eda4-429e-48d3-a7c4-7af21975a42f', '4c680a17-bd4b-4091-ad85-565089906561', 'foto_printer_error.jpg', 'https://storage.example.com/attachments/foto_printer_error.jpg', 512000, 'image/jpeg', 'CAMERA', '2026-06-27 01:56:54.301');
INSERT INTO public.attachments VALUES ('b3cf4cc5-5025-492c-a990-8c7b0586deac', '4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'log_erp_crash.txt', 'https://storage.example.com/attachments/log_erp_crash.txt', 8192, 'text/plain', 'UPLOAD', '2026-06-27 01:56:54.301');
INSERT INTO public.attachments VALUES ('4de9c3b3-b968-495f-852a-491b564afaa4', '4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'screenshot_erp_error.png', 'https://storage.example.com/attachments/screenshot_erp_error.png', 307200, 'image/png', 'CAMERA', '2026-06-27 01:56:54.301');
INSERT INTO public.attachments VALUES ('a4cceec5-b639-4ba3-87dc-07ecaf051f38', '4c6a8469-c166-4178-8e45-d6af2aa9fee3', 'Screenshot_20260630_161936.jpg', '0831bbf3-2d4e-4e68-bdae-1f26268310d4/4c6a8469-c166-4178-8e45-d6af2aa9fee3/90d38664-cfd3-414b-a0fd-239ac7335fe0.jpg', 33592, 'image/jpeg', 'UPLOAD', '2026-06-30 11:01:37.773');
INSERT INTO public.attachments VALUES ('1b04ef24-d65e-4381-833f-96a18d5106c8', '9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', 'Screenshot_20260706_191830.jpg', '47dd9580-ce80-4415-a814-5ffede186bd8/9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236/53fe9add-930c-498b-8c1f-71244f320389.jpg', 374723, 'image/jpeg', 'UPLOAD', '2026-07-06 12:19:35.223');
INSERT INTO public.attachments VALUES ('32c49a62-41e2-492d-bfac-3efb2bd8eea7', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', 'Screenshot_20260706_192554.jpg', '47dd9580-ce80-4415-a814-5ffede186bd8/4e86f0d7-9103-4fcf-b459-b5213956d4ee/bee9231d-afaa-498f-83b4-4921d7b39ee6.jpg', 382489, 'image/jpeg', 'UPLOAD', '2026-07-06 12:36:33.366');


--
-- TOC entry 5096 (class 0 OID 72694)
-- Dependencies: 221
-- Data for Name: password_reset_tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 5101 (class 0 OID 72869)
-- Dependencies: 226
-- Data for Name: tech_support; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tech_support VALUES ('c35985c8-75ff-449b-a8ec-d2bce52a15a4', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', '2026-06-27 01:56:52.845', '2026-06-27 01:56:52.845', 'INFRASTRUCTURE');
INSERT INTO public.tech_support VALUES ('2b96b789-040d-43f4-a708-04b4cc5e1992', '4c961f74-d2da-4590-9dd6-8445e61446b7', '2026-06-27 01:56:52.923', '2026-06-27 01:56:52.923', 'NETWORK');
INSERT INTO public.tech_support VALUES ('da3a2ddb-54c7-4669-8f15-f66effe6bcea', 'da111089-14d1-4a06-b61e-27f53fb69c4e', '2026-06-27 01:56:53.004', '2026-06-27 01:56:53.004', 'HARDWARE');
INSERT INTO public.tech_support VALUES ('3f6b7349-b2c6-45e7-a7d5-13648dc0e953', '575a2c41-781f-4518-bc1c-5e1c24fea36f', '2026-06-27 01:56:53.085', '2026-06-27 01:56:53.085', 'SOFTWARE');
INSERT INTO public.tech_support VALUES ('0573bcba-6ae9-4884-bb1b-41c54acd5bdd', 'd640caf9-9535-467c-a474-df2aef888c19', '2026-06-27 01:56:53.16', '2026-06-27 01:56:53.16', 'ACCOUNT_AUTH');


--
-- TOC entry 5097 (class 0 OID 72707)
-- Dependencies: 222
-- Data for Name: ticket_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ticket_categories VALUES ('6b286993-b334-4568-8044-e8d65db0b9e7', 'Jaringan & Konektivitas', 'Masalah internet, WiFi, VPN, dan koneksi jaringan', '2026-06-27 01:56:54.131');
INSERT INTO public.ticket_categories VALUES ('43f7e194-9f9f-44dc-9150-10dd8b255b27', 'Perangkat Lunak', 'Bug aplikasi, instalasi software, dan lisensi', '2026-06-27 01:56:54.197');
INSERT INTO public.ticket_categories VALUES ('8ec9eb8f-d473-48ef-9ffc-7cc4bce57727', 'Perangkat Keras', 'Kerusakan komputer, printer, dan perangkat fisik lainnya', '2026-06-27 01:56:54.213');
INSERT INTO public.ticket_categories VALUES ('762df220-a4e3-4a40-bdc8-56c349917c25', 'Akun & Akses', 'Reset password, hak akses, dan manajemen akun', '2026-06-27 01:56:54.236');
INSERT INTO public.ticket_categories VALUES ('46ed6cd0-a98f-4fe1-9581-b7423366f430', 'Lainnya', 'Keluhan atau permintaan yang tidak termasuk kategori di atas', '2026-06-27 01:56:54.259');


--
-- TOC entry 5100 (class 0 OID 72767)
-- Dependencies: 225
-- Data for Name: ticket_histories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.ticket_histories VALUES ('f8fb9603-4670-4b21-bb7e-2635d5071321', '4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Budi Santoso', 'Tiket di-assign ke helpdesk untuk triage awal', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('e9f4686e-3c72-4fa7-a812-4ab0a4179fa8', '4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'eaac78b5-8140-40f3-836e-571e95504644', 'techSupport', NULL, 'Hardware Specialist', 'Kendala fisik printer diteruskan ke tim Tech Support Hardware', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('4acbe567-241e-4f1f-b8b1-098248697f80', '4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'eaac78b5-8140-40f3-836e-571e95504644', 'status', 'OPEN', 'IN_PROGRESS', 'Tim lapangan mulai mengecek unit printer di ruang administrasi', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('dd2e03c9-56ef-44fb-add6-3fc8cd20eea4', 'caf26aa4-acdc-4d2d-b1a4-f693b1656116', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Sari Dewi', 'Tiket di-assign ke helpdesk', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('0c5a23fc-f830-4cf6-b94c-9d63ec9c1732', 'caf26aa4-acdc-4d2d-b1a4-f693b1656116', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'techSupport', NULL, 'Software Support', 'Masalah crash aplikasi ERP dialihkan ke spesialis software', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('092d98a5-8d4e-4b64-aa39-5601d0aaaa32', 'caf26aa4-acdc-4d2d-b1a4-f693b1656116', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'status', 'OPEN', 'PENDING', 'Status ditangguhkan sementara, menunggu log file dari tim developer pusat', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('3aa5c090-4916-4261-8008-f23e001c223c', '9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Budi Santoso', 'Tiket di-assign ke helpdesk', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('65f50a7a-4966-4336-b5fd-91b5392624eb', '9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', 'eaac78b5-8140-40f3-836e-571e95504644', 'techSupport', NULL, 'Network Admin', 'Laporan RTO jaringan lantai 3 dialihkan ke tim network', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('a9c3b90d-a144-456a-9923-0fcec7589813', '9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', 'eaac78b5-8140-40f3-836e-571e95504644', 'status', 'OPEN', 'PENDING', 'Pending: Sedang menunggu proses penggantian access point cadangan dari gudang', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('d242a07d-bab5-4f56-bc95-6de1157f4bcd', '2a719546-7a3c-48a2-96c0-8c5c02c325c3', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Sari Dewi', 'Tiket di-assign ke helpdesk', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('0569693d-8cdb-45ea-9975-1bbd617effb1', '2a719546-7a3c-48a2-96c0-8c5c02c325c3', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'techSupport', NULL, 'Account Security', 'Diteruskan ke tim Auth & Security untuk keperluan reset email', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('fe558ebb-70ef-46a5-ba86-53b319e47d7f', '2a719546-7a3c-48a2-96c0-8c5c02c325c3', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'status', 'OPEN', 'CLOSED', 'Password baru berhasil di-generate, dikonfirmasi oleh user, dan tiket resmi ditutup', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('2c572fff-2df2-43af-8e40-c2ff23829550', '11fe55e5-bc90-437e-a36d-d1148e2e41ef', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Budi Santoso', 'Tiket di-assign ke helpdesk', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('7c1939de-8275-4f77-831a-fb5fbfe80d10', '11fe55e5-bc90-437e-a36d-d1148e2e41ef', 'eaac78b5-8140-40f3-836e-571e95504644', 'techSupport', NULL, 'Infrastructure', 'Akses shared drive dikerjakan oleh tim infra', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('b3d35900-432d-418b-877a-26accddf1dc4', '11fe55e5-bc90-437e-a36d-d1148e2e41ef', 'eaac78b5-8140-40f3-836e-571e95504644', 'status', 'OPEN', 'CLOSED', 'Hak akses folder proyek dirubah dan tiket ditutup otomatis oleh sistem', '2026-06-27 01:56:54.79');
INSERT INTO public.ticket_histories VALUES ('7f122bcb-59db-4179-94ca-d52030cff195', '4c6a8469-c166-4178-8e45-d6af2aa9fee3', '0831bbf3-2d4e-4e68-bdae-1f26268310d4', 'status', NULL, 'OPEN', 'Tiket dibuat', '2026-06-30 11:01:37.782');
INSERT INTO public.ticket_histories VALUES ('13f80115-86b8-48ae-bfd6-94172e4d2804', '4c6a8469-c166-4178-8e45-d6af2aa9fee3', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'status', 'OPEN', 'IN_PROGRESS', NULL, '2026-06-30 11:02:59.6');
INSERT INTO public.ticket_histories VALUES ('76f03d85-659d-496d-8ffe-8d9096aa0f22', '4c6a8469-c166-4178-8e45-d6af2aa9fee3', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'assignee', NULL, 'Sari Dewi', 'Tiket di-assign', '2026-06-30 11:03:31.817');
INSERT INTO public.ticket_histories VALUES ('426b64fd-c263-43c2-997f-37091c91c933', '4c680a17-bd4b-4091-ad85-565089906561', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'assignee', NULL, 'Sari Dewi', 'Tiket di-assign', '2026-07-01 16:34:32.064');
INSERT INTO public.ticket_histories VALUES ('091f66b0-9fae-43ad-9995-59ae8709636f', '4c680a17-bd4b-4091-ad85-565089906561', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'ASSIGNED', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-02 11:35:23.317');
INSERT INTO public.ticket_histories VALUES ('a6cf0df4-6abe-409d-b4a1-d6181b7ee51f', '4c680a17-bd4b-4091-ad85-565089906561', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'IN_PROGRESS', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-02 11:35:24.931');
INSERT INTO public.ticket_histories VALUES ('f8fde0c4-2f41-4991-84ec-c1e2ef384d09', '4c6a8469-c166-4178-8e45-d6af2aa9fee3', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'IN_PROGRESS', 'RESOLVED', 'Tiket ditandai SELESAI oleh Teknisi', '2026-07-02 11:39:33.216');
INSERT INTO public.ticket_histories VALUES ('dafaf92d-b10f-4ff1-ab99-aa0cecc8d4e8', '9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', '47dd9580-ce80-4415-a814-5ffede186bd8', 'add_attachment', '0', '1', 'Menambah Attachments', '2026-07-06 12:19:35.24');
INSERT INTO public.ticket_histories VALUES ('b27e9ccb-6781-429e-bd53-a975ec94544c', '32ff5976-1782-42ff-8a57-7256befab13a', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'assignee', NULL, 'Administrator', 'Tiket di-assign', '2026-07-06 12:25:09.806');
INSERT INTO public.ticket_histories VALUES ('6ba4c0ab-a72d-48bd-8b1a-46cd1c69ee13', '32ff5976-1782-42ff-8a57-7256befab13a', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'ASSIGNED', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-06 12:25:48.782');
INSERT INTO public.ticket_histories VALUES ('12ae6060-e369-4f99-8d55-d7a4dab38e9c', '32ff5976-1782-42ff-8a57-7256befab13a', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'IN_PROGRESS', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-06 12:25:50.024');
INSERT INTO public.ticket_histories VALUES ('38a7b587-30e9-4094-95f9-2a820d58ad23', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', '47dd9580-ce80-4415-a814-5ffede186bd8', 'status', NULL, 'OPEN', 'Tiket dibuat', '2026-07-06 12:36:33.37');
INSERT INTO public.ticket_histories VALUES ('40bfdb73-968c-46d5-a8e2-6bcf5122c51b', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'assignee', NULL, 'Sari Dewi', 'Tiket di-assign', '2026-07-06 12:38:42.19');
INSERT INTO public.ticket_histories VALUES ('d43f0f84-3ce5-4789-8410-8b6df91c40f7', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'ASSIGNED', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-06 12:39:56.598');
INSERT INTO public.ticket_histories VALUES ('17f84cd2-7050-4043-b71e-c1ea25eb9fcc', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'IN_PROGRESS', 'IN_PROGRESS', 'Otomatis diubah ke In Progress oleh Teknisi', '2026-07-06 12:39:58.64');
INSERT INTO public.ticket_histories VALUES ('da94614d-d0ce-4e02-aa31-547295ac1f80', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', 'e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'status', 'IN_PROGRESS', 'RESOLVED', 'Tiket ditandai SELESAI oleh Teknisi', '2026-07-06 12:40:42.496');
INSERT INTO public.ticket_histories VALUES ('ea473726-bce7-45ce-bb94-3b1fa2bff157', '4e86f0d7-9103-4fcf-b459-b5213956d4ee', '47dd9580-ce80-4415-a814-5ffede186bd8', 'status', 'RESOLVED', 'CLOSED', 'Konfirmasi penyelesaian oleh User', '2026-07-06 12:41:43.024');


--
-- TOC entry 5098 (class 0 OID 72718)
-- Dependencies: 223
-- Data for Name: tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tickets VALUES ('eb2e7702-b435-4af5-9604-830b7f3a34e6', 'Tidak bisa terhubung ke WiFi kantor', 'Sejak pagi tadi laptop saya tidak bisa terhubung ke jaringan WiFi kantor. Sudah dicoba restart tapi tetap tidak bisa. Perangkat lain sepertinya bisa terhubung normal.', 'OPEN', 'HIGH', '2026-06-27 01:56:54.265', '2026-06-27 01:56:54.265', NULL, NULL, '2f4cf8b2-46ea-44f3-8c36-af6ef68670d0', NULL, '6b286993-b334-4568-8044-e8d65db0b9e7', NULL);
INSERT INTO public.tickets VALUES ('4ab9b799-acd1-461a-a356-9dd715d6d9a5', 'Printer tidak bisa mencetak dokumen', 'Printer di ruang administrasi menampilkan error "Paper Jam" padahal tidak ada kertas yang tersangkut. Sudah dibersihkan tapi tetap muncul pesan yang sama.', 'IN_PROGRESS', 'MEDIUM', '2026-06-27 01:56:54.279', '2026-06-27 01:56:54.279', NULL, NULL, '0831bbf3-2d4e-4e68-bdae-1f26268310d4', 'eaac78b5-8140-40f3-836e-571e95504644', '8ec9eb8f-d473-48ef-9ffc-7cc4bce57727', 'da3a2ddb-54c7-4669-8f15-f66effe6bcea');
INSERT INTO public.tickets VALUES ('2a719546-7a3c-48a2-96c0-8c5c02c325c3', 'Lupa password akun email kantor', 'Saya tidak bisa login ke email kantor karena lupa password. Mohon bantuan untuk reset password.', 'CLOSED', 'LOW', '2026-06-27 01:56:54.291', '2026-06-27 01:56:54.291', '2026-06-26 23:56:54.29', '2026-06-27 00:56:54.29', '47dd9580-ce80-4415-a814-5ffede186bd8', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', '762df220-a4e3-4a40-bdc8-56c349917c25', '0573bcba-6ae9-4884-bb1b-41c54acd5bdd');
INSERT INTO public.tickets VALUES ('11fe55e5-bc90-437e-a36d-d1148e2e41ef', 'Permintaan penambahan akses folder shared drive', 'Saya membutuhkan akses ke folder "Dokumen Proyek 2026" di shared drive untuk keperluan pekerjaan tim.', 'CLOSED', 'LOW', '2026-06-27 01:56:54.293', '2026-06-27 01:56:54.293', '2026-06-26 01:56:54.293', '2026-06-26 05:56:54.293', '0831bbf3-2d4e-4e68-bdae-1f26268310d4', 'eaac78b5-8140-40f3-836e-571e95504644', '762df220-a4e3-4a40-bdc8-56c349917c25', 'c35985c8-75ff-449b-a8ec-d2bce52a15a4');
INSERT INTO public.tickets VALUES ('caf26aa4-acdc-4d2d-b1a4-f693b1656116', 'Aplikasi ERP crash saat buka laporan bulanan', 'Setiap kali membuka menu laporan bulanan di aplikasi ERP, aplikasi langsung tertutup sendiri. Sudah terjadi sejak update versi terbaru kemarin.', 'RESOLVED', 'CRITICAL', '2026-06-27 01:56:54.284', '2026-06-27 01:56:54.284', NULL, NULL, '2f4cf8b2-46ea-44f3-8c36-af6ef68670d0', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', '43f7e194-9f9f-44dc-9150-10dd8b255b27', '3f6b7349-b2c6-45e7-a7d5-13648dc0e953');
INSERT INTO public.tickets VALUES ('9d3a9ae7-7c93-42fd-8e8d-f3d4b8864236', 'Internet lantai 3 sangat lambat dan sering RTO', 'Koneksi internet via kabel LAN maupun WiFi di area kerja lantai 3 drop parah sejak siang ini. Sering Request Time Out (RTO) saat meeting online.', 'RESOLVED', 'HIGH', '2026-06-27 01:56:54.287', '2026-06-27 01:56:54.287', NULL, NULL, '47dd9580-ce80-4415-a814-5ffede186bd8', 'eaac78b5-8140-40f3-836e-571e95504644', '6b286993-b334-4568-8044-e8d65db0b9e7', '2b96b789-040d-43f4-a708-04b4cc5e1992');
INSERT INTO public.tickets VALUES ('4c680a17-bd4b-4091-ad85-565089906561', 'Keyboard Macbook macet beberapa tombol', 'Tombol spacebar dan huruf ''E'' di laptop dinas saya keras sekali saat ditekan dan sering tidak merespons. Mohon bantuan pengecekan atau penggantian unit.', 'IN_PROGRESS', 'MEDIUM', '2026-06-27 01:56:54.272', '2026-07-02 11:35:24.927', NULL, NULL, '0831bbf3-2d4e-4e68-bdae-1f26268310d4', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', '8ec9eb8f-d473-48ef-9ffc-7cc4bce57727', 'c35985c8-75ff-449b-a8ec-d2bce52a15a4');
INSERT INTO public.tickets VALUES ('4c6a8469-c166-4178-8e45-d6af2aa9fee3', 'Komputer sering mati sendiri', 'di ruangan RC-001 kokputernya mati sendiri dan mengeluarkan suara aneh serta kedipan layar beberapa kali', 'RESOLVED', 'HIGH', '2026-06-30 11:01:37.05', '2026-07-02 11:39:33.195', '2026-07-02 11:39:33.185', NULL, '0831bbf3-2d4e-4e68-bdae-1f26268310d4', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', '8ec9eb8f-d473-48ef-9ffc-7cc4bce57727', 'c35985c8-75ff-449b-a8ec-d2bce52a15a4');
INSERT INTO public.tickets VALUES ('4e86f0d7-9103-4fcf-b459-b5213956d4ee', 'Kendala Installasi', 'Saya terkendala dalam menginstal software yang diperlukan untuk pekerjaan saya', 'CLOSED', 'MEDIUM', '2026-07-06 12:36:32.163', '2026-07-06 12:41:43.021', '2026-07-06 12:40:42.49', '2026-07-06 12:41:43.019', '47dd9580-ce80-4415-a814-5ffede186bd8', '7333dcdd-cbfa-4244-b9c4-f01fe563dc08', '43f7e194-9f9f-44dc-9150-10dd8b255b27', 'c35985c8-75ff-449b-a8ec-d2bce52a15a4');
INSERT INTO public.tickets VALUES ('32ff5976-1782-42ff-8a57-7256befab13a', 'Request instalasi Adobe Photoshop terbaru', 'Saya membutuhkan aplikasi Adobe Photoshop berlisensi resmi untuk kebutuhan editing materi campaign media sosial divisi marketing.', 'IN_PROGRESS', 'LOW', '2026-06-27 01:56:54.275', '2026-07-06 12:25:50.02', NULL, NULL, '47dd9580-ce80-4415-a814-5ffede186bd8', 'ddbdaf8a-029d-4f8e-ac98-ff97429acce5', '43f7e194-9f9f-44dc-9150-10dd8b255b27', 'c35985c8-75ff-449b-a8ec-d2bce52a15a4');


--
-- TOC entry 5095 (class 0 OID 72675)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES ('ddbdaf8a-029d-4f8e-ac98-ff97429acce5', 'admin', 'admin@helpdesk.com', '$2b$10$.u0M3bIqILv1UcnEzi1BPefGgkyYGZUIHTkAPpijKcJjXeX7esLrm', 'ADMIN', 'Administrator', NULL, '081200000001', true, '2026-06-27 01:56:51.886', '2026-06-27 01:56:51.886', NULL, '361446b5-f290-4a94-afeb-c9889f91c17f');
INSERT INTO public.users VALUES ('eaac78b5-8140-40f3-836e-571e95504644', 'helpdesk_budi', 'alanperdana08@gmail.com', '$2b$10$zCR1y4JPAdMhXNU6BIpudejiSfSEbA90Zm7pYZkx5zKYwxAVfEKjq', 'HELPDESK', 'Budi Santoso', NULL, '081200000002', true, '2026-06-27 01:56:52.408', '2026-06-27 01:56:52.408', NULL, 'cd826c6c-86d3-4ca9-bf63-daff5ecefc51');
INSERT INTO public.users VALUES ('2f4cf8b2-46ea-44f3-8c36-af6ef68670d0', 'andi_pratama', 'alanreceh28@gmail.com', '$2b$10$VrPULGt40ev/afuZQEGimOw/BY9HsQ5g8lNgtTtvPTkKxLvc9Qo1i', 'USER', 'Andi Pratama', NULL, '081300000001', true, '2026-06-27 01:56:53.473', '2026-06-27 01:56:53.473', NULL, '3d29e5a6-2db9-4494-b88e-14ba0e8d7eff');
INSERT INTO public.users VALUES ('0831bbf3-2d4e-4e68-bdae-1f26268310d4', 'rina_kusuma', 'user2@example.com', '$2b$10$eq5dE7qlvHQfL/DZdGkjZOA/pqU4.ZrBL5uSrF.7V2a9p.aVr3H9e', 'USER', 'Rina Kusuma', NULL, '081300000002', true, '2026-06-27 01:56:53.798', '2026-06-27 01:56:53.798', NULL, 'dec44c6c-6de6-4b07-a3df-84c67a6787d0');
INSERT INTO public.users VALUES ('7333dcdd-cbfa-4244-b9c4-f01fe563dc08', 'helpdesk_sari', 'helpdesk2@heldpesk.com', '$2b$10$m4lCrP8QfAlPZQIAaSFzGOLBlCY0KCI5aAxej2GdU61OpatPsSBlW', 'HELPDESK', 'Sari Dewi', NULL, '081200000003', true, '2026-06-27 01:56:52.752', '2026-06-30 05:12:52.373', NULL, '17325e9f-b470-437c-a1c3-4af22d7127c0');
INSERT INTO public.users VALUES ('e6e00a26-49f6-4fca-8c8a-6d9207d475e4', 'BudiBD', 'budiberdikari@local.co.id', '', 'HELPDESK', 'Budi Berdikari', NULL, '08574446132', true, '2026-06-30 06:25:07.655', '2026-06-30 06:25:07.655', NULL, '12119a32-53c2-43f2-b3b7-5907249c9788');
INSERT INTO public.users VALUES ('575a2c41-781f-4518-bc1c-5e1c24fea36f', 'techsupport_software', 'techsupport4@techsupport.com', '$2b$10$GGQoKJpO9THYZ0Y1MVlXn.TtGiLt6WmM34WexJgchF8UZtpD4qzxm', 'TECHSUPPORT', 'Siti Software Support', NULL, '081234567893', true, '2026-06-27 01:56:53.08', '2026-06-27 01:56:53.08', NULL, '912b4147-754e-4081-9fe3-4b4dd85988b2');
INSERT INTO public.users VALUES ('d640caf9-9535-467c-a474-df2aef888c19', 'techsupport_auth', 'techsupport5@techsupport.com', '$2b$10$PsbHNC3HdPeZmBxuOhe3TezRvtoUraQBnt5s6AamCnFMS2UlSY.Bq', 'TECHSUPPORT', 'Andi Account Security', NULL, '081234567894', true, '2026-06-27 01:56:53.157', '2026-06-27 01:56:53.157', NULL, 'b494467c-a736-4b98-8a78-e9f0d0ddf4c7');
INSERT INTO public.users VALUES ('4c961f74-d2da-4590-9dd6-8445e61446b7', 'techsupport_network', 'techsupport2@techsupport.com', '$2b$10$RnLKrT7jJO4zUQFUH4mtY./T18Jh7NqflHtF7VSGQFPowtosnmEw2', 'TECHSUPPORT', 'Ferry Network Admin', NULL, '081234567891', false, '2026-06-27 01:56:52.919', '2026-06-27 01:56:52.919', NULL, 'e5f73627-e6aa-49b7-bbe2-1fb88d131f72');
INSERT INTO public.users VALUES ('da111089-14d1-4a06-b61e-27f53fb69c4e', 'techsupport_hardware', 'techsupport3@techsupport.com', '$2b$10$XVcmgwt7BBtF8XlZI8rHou4aAHLg7ekH9yI11pMqqhaVdvQUkP.mi', 'TECHSUPPORT', 'Budi Hardware Specialist', NULL, '081234567892', false, '2026-06-27 01:56:52.999', '2026-06-27 01:56:52.999', NULL, '4ec53195-b213-415a-94be-109c4f8fc9a2');
INSERT INTO public.users VALUES ('e3f322aa-ccca-44ff-aa44-a2c63cc6c5fa', 'techsuport1', 'techsupport1@techsuport.com', '$2b$10$27GQiHVLILB0rky37t8rHeavXy4fS93CrKa8p3ZyUiZZpeSyjOwSm', 'TECHSUPPORT', 'Alex', NULL, '0857480232323', true, '2026-06-27 01:56:52.827', '2026-07-02 11:41:46.804', NULL, '9b149056-1c9f-48b6-aed8-410021a0bb3b');
INSERT INTO public.users VALUES ('47dd9580-ce80-4415-a814-5ffede186bd8', 'doni_wijaya', 'user3@example.com', '$2b$10$CGsBKPhbki4Ws3iHmfioEOr1N4H/P51gxkdN9FAARkL0JxtAyo/0K', 'USER', 'Doni Wijaya Kusuma', NULL, '081300000003', true, '2026-06-27 01:56:54.117', '2026-07-06 12:37:29.66', NULL, '83d5e7c7-74e4-4a99-ab22-f7b91399a99a');


--
-- TOC entry 4917 (class 2606 OID 72625)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4932 (class 2606 OID 72752)
-- Name: attachments attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT attachments_pkey PRIMARY KEY (id);


--
-- TOC entry 4924 (class 2606 OID 72706)
-- Name: password_reset_tokens password_reset_tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT password_reset_tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 4936 (class 2606 OID 72882)
-- Name: tech_support tech_support_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tech_support
    ADD CONSTRAINT tech_support_pkey PRIMARY KEY (id);


--
-- TOC entry 4928 (class 2606 OID 72717)
-- Name: ticket_categories ticket_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket_categories
    ADD CONSTRAINT ticket_categories_pkey PRIMARY KEY (id);


--
-- TOC entry 4934 (class 2606 OID 72779)
-- Name: ticket_histories ticket_histories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket_histories
    ADD CONSTRAINT ticket_histories_pkey PRIMARY KEY (id);


--
-- TOC entry 4930 (class 2606 OID 72735)
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- TOC entry 4920 (class 2606 OID 72693)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4925 (class 1259 OID 72798)
-- Name: password_reset_tokens_token_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX password_reset_tokens_token_key ON public.password_reset_tokens USING btree (token);


--
-- TOC entry 4937 (class 1259 OID 72883)
-- Name: tech_support_userId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "tech_support_userId_key" ON public.tech_support USING btree ("userId");


--
-- TOC entry 4926 (class 1259 OID 72799)
-- Name: ticket_categories_name_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX ticket_categories_name_key ON public.ticket_categories USING btree (name);


--
-- TOC entry 4918 (class 1259 OID 72797)
-- Name: users_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);


--
-- TOC entry 4921 (class 1259 OID 72855)
-- Name: users_supabaseUid_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "users_supabaseUid_key" ON public.users USING btree ("supabaseUid");


--
-- TOC entry 4922 (class 1259 OID 72796)
-- Name: users_username_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX users_username_key ON public.users USING btree (username);


--
-- TOC entry 4943 (class 2606 OID 72820)
-- Name: attachments attachments_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attachments
    ADD CONSTRAINT "attachments_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public.tickets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4938 (class 2606 OID 72800)
-- Name: password_reset_tokens password_reset_tokens_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.password_reset_tokens
    ADD CONSTRAINT "password_reset_tokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4946 (class 2606 OID 72884)
-- Name: tech_support tech_support_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tech_support
    ADD CONSTRAINT "tech_support_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4944 (class 2606 OID 72840)
-- Name: ticket_histories ticket_histories_changedById_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket_histories
    ADD CONSTRAINT "ticket_histories_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4945 (class 2606 OID 72835)
-- Name: ticket_histories ticket_histories_ticketId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ticket_histories
    ADD CONSTRAINT "ticket_histories_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES public.tickets(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4939 (class 2606 OID 72810)
-- Name: tickets tickets_assigneeId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_assigneeId_fkey" FOREIGN KEY ("assigneeId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4940 (class 2606 OID 72815)
-- Name: tickets tickets_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.ticket_categories(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 4941 (class 2606 OID 72805)
-- Name: tickets tickets_creatorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- TOC entry 4942 (class 2606 OID 72889)
-- Name: tickets tickets_techSupportId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT "tickets_techSupportId_fkey" FOREIGN KEY ("techSupportId") REFERENCES public.tech_support(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 5109 (class 0 OID 0)
-- Dependencies: 5
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


-- Completed on 2026-07-06 20:48:43

--
-- PostgreSQL database dump complete
--

\unrestrict lT6sbqocHZsMUWXSk7PqHShijyCL7WhQFJ6nG7QHwrRFEu19m1wxO1kssvuicsy

