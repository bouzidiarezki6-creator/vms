<div align="center">

# 🏍️ QUICK — VMS Industrie Algérie

**Plateforme centralisée de gestion des disponibilités motos & showrooms**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Ready-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

[🚀 Getting Started](#-getting-started) · [📸 Screenshots](#-screenshots) · [🗄️ Database](#️-database-schema) · [🏗️ Architecture](#️-architecture)

</div>

---

## 📌 What is QUICK?

**QUICK** is a production-ready web platform built for **VMS Industrie Algérie**, the Algerian distributor of VMS, Keeway, and Benelli motorcycles.

It connects three distinct actors on a single centralized platform:

| Portal | Who | What |
|---|---|---|
| 🛵 **Customer Portal** | Motorcycle buyers | Browse catalog, submit availability requests, track status, get notified |
| 🏪 **Showroom Dashboard** | Showroom owners & staff | Manage inventory, record sales, handle inter-showroom transfers |
| 🛡️ **Super Admin** | VMS HQ management | Full BI analytics, showroom directory, global inventory, audit logs |

The flagship feature is **Compte Global** — an intelligent engine that detects motorcycles dormant for 90+ days and automatically suggests inter-showroom transfers to satisfy pending customer demand.

---

## ✨ Key Features

### Customer Portal
- 🔐 **Secure authentication** (register / login / password recovery)
- 📋 **Multi-step request form** — model, wilaya, city selection from all 58 Algerian wilayas
- 🚫 **Anti-abuse engine** — max 2 requests / 7-day rolling window, enforced server-side
- 🔔 **Real-time notifications** — instant match when stock arrives in your region
- 📦 **Preorder redirection** → [motobladi.dz](https://motobladi.dz/) if motorcycle unavailable

### Showroom Dashboard
- 📊 **9 real-time KPIs** — stock totals, availability rate, aging stock, transfers
- 🏷️ **Full inventory management** — add, edit, search, filter, VIN uniqueness enforced
- 💰 **Record sales** with payment method and invoice reference generation
- 🚚 **Transfer workflow** — 7-status lifecycle (Pending → Received)
- ⚠️ **90-day aging alerts** — automatic detection and visual highlighting

### Compte Global (Inter-Showroom Intelligence)
- 🧠 **Algorithmic matching** — pairs aging stock with demand in other wilayas
- 📍 **Transfer opportunity cards** with priority scoring (Haute / Moyenne)
- 🔄 **Complete transfer lifecycle** management with history tracking
- 📈 **Network-wide inventory view** across all showrooms

### Super Admin Dashboard
- 📉 **Business Intelligence** — revenue, request fulfillment, aging rate charts (Recharts)
- 🏢 **Showroom CRUD** — create, activate, deactivate showrooms
- 👥 **User management** — assign showroom owners and staff
- 📋 **Global inventory** — multi-filter + CSV export
- 🔍 **Audit logs** — every action tracked with actor, timestamp, details

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + TypeScript, Vite 8 |
| **Styling** | Tailwind CSS 3, shadcn/ui-inspired components |
| **Charts** | Recharts 3 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Database** | Supabase / PostgreSQL |
| **Auth** | Supabase Auth + RLS |
| **Offline/Demo mode** | localStorage-based DatabaseStore (drop-in Supabase replacement) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 — [download](https://nodejs.org)
- **npm** ≥ 9 (bundled with Node.js)
- A **Supabase** project (optional — platform runs in demo mode without it)

### 1. Clone the repository

```bash
git clone https://github.com/bouzidiarezki6/vms.git
cd vms
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment (optional — for real Supabase backend)

```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase project credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Without Supabase credentials** the platform runs fully in **demo mode** using localStorage as a database. All features work including the anti-abuse engine, transfer workflow, and BI analytics — with pre-seeded realistic Algerian showroom data.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

---

## 🎭 Demo Accounts

The platform ships with pre-seeded demo accounts. Use the **role switcher bar** at the top of the page, or log in manually:

| Role | Email | Description |
|---|---|---|
| 🛡️ Super Admin | `admin@vms.dz` | Full access to all portals and BI |
| 🏪 Showroom Alger | `alger@vms.dz` | Manages Alger showroom inventory |
| 🏪 Showroom Oran | `oran@vms.dz` | Manages Oran showroom (holds aging Victoria 200) |
| 👤 Customer | `customer@example.com` | Customer portal with request history |

> **Tip:** The Oran showroom holds a **Victoria 200 dormant for 115 days** while the Alger showroom has a pending customer request for the same model — the perfect Compte Global demo scenario is pre-wired.

---

## 🗄️ Database Schema

The PostgreSQL schema (ready for Supabase) is at [`supabase/schema.sql`](supabase/schema.sql).

Key tables:

```
profiles          → Users (customers, showroom staff, admins)
showrooms         → VMS showroom directory (58 wilayas)
motorcycle_models → Product catalog (VMS, Keeway, Benelli)
motorcycles       → Live inventory with VIN, status, arrival date
customer_requests → Availability requests with anti-abuse tracking
transfers         → Inter-showroom transfer lifecycle
notifications     → In-app + email/SMS notification log
sales             → Sales records with invoice references
audit_logs        → Immutable action trail
```

Row Level Security policies: [`supabase/rls_policies.sql`](supabase/rls_policies.sql)

---

## 🏗️ Architecture

```
src/
├── components/
│   ├── ui/                   # Design system (Button, Card, Badge, Modal, Skeleton…)
│   ├── auth/                 # CustomerAuthModal (login / register / recover)
│   ├── layout/               # Navbar with role-based navigation
│   ├── customer-portal/      # Customer-facing pages + request form
│   ├── showroom-portal/      # Showroom dashboard, stock management
│   ├── compte-global/        # Aging stock detection + transfer workflow
│   └── admin-portal/         # BI dashboard, showroom CRUD, audit logs
├── services/
│   ├── dbStore.ts            # DatabaseStore — full business logic + localStorage engine
│   └── supabase.ts           # Supabase client (swaps in when env vars are set)
├── data/
│   ├── mockData.ts           # Realistic seed data (6 showrooms, 8 models, 16 motos)
│   └── wilayas.ts            # All 58 Algerian wilayas + city lists
├── types/
│   └── index.ts              # TypeScript interfaces for all entities
└── lib/
    └── utils.ts              # cn(), formatDate(), formatPrice()

supabase/
├── schema.sql                # Complete PostgreSQL schema (15 tables, triggers, indexes)
└── rls_policies.sql          # Row Level Security for all roles
```

---

## 📦 Bundle Size

Optimized with code splitting for fast initial load:

| Chunk | Size (gzip) | Loaded |
|---|---|---|
| `index.js` (app shell) | 22 KB | Always |
| `vendor-react` | 65 KB | Always |
| `CustomerPortal` | 6 KB | On navigation |
| `ShowroomDashboard` | 7 KB | On navigation |
| `AdminDashboard` | 7 KB | On navigation |
| `vendor-charts` (Recharts) | 124 KB | On first chart page |

**Initial payload: ~94 KB gzip** (down from 241 KB before optimization).

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

<div align="center">

Made with ❤️ for **VMS Industrie Algérie**

[🔝 Back to top](#️-quick--vms-industrie-algérie)

</div>
