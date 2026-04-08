# Table Tickers — Order & Reservation System

A full-stack farm reservation web application built for a local farm in Kokkola, Finland.
Customers browse fresh produce, reserve products for pickup or delivery, and check the status of their reservations.
Admins manage the product catalog, review reservations, and update statuses through a protected panel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL 16 (via Docker) |
| ORM | Prisma 6 |
| Auth | NextAuth v4 (credentials provider) |
| Styling | Tailwind CSS v4 |
| Validation | Zod |

---

## Features

### Customer-facing

- Browse the farm product catalog with images, prices, and stock status
- View individual product detail pages with primary image and image gallery carousel
- Reserve one or more products with a date, time, and fulfillment method
- Pre-fill the reservation form directly from a product card or detail page
- Choose pickup (no address required) or delivery (address field required)
- Receive a reservation confirmation page with reference ID and itemised summary
- Look up the status of an existing reservation by ID and email address

### Admin panel (`/admin`)

- Secure login page at `/login` with middleware-enforced route protection
- Dashboard with live KPIs: total products, reservations by status, low-stock alerts, and recent activity
- Product management: create, edit, and deactivate products
- Image management per product: upload a primary image and separate gallery images via local file upload
- Reservation list with client-side filtering by status and fulfillment type
- Update reservation status (Pending, Confirmed, Completed, Cancelled)

---

## Getting Started

### Prerequisites

- Node.js v20 LTS or later
- npm (bundled with Node.js)
- Docker Desktop (must be running before starting the database)

### 1. Clone the repository

```bash
git clone https://github.com/Capstone-table-tickers/capstone-order-reservation.git
cd capstone-order-reservation
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env        # macOS / Linux
copy .env.example .env      # Windows PowerShell
```

Edit `.env` to verify the values. The defaults match the Docker configuration in this repository:

```env
DATABASE_URL="postgresql://app:app@localhost:5433/table_tickers"
NEXTAUTH_SECRET=supersecretdevkey
NEXTAUTH_URL=http://localhost:3000
```

> Note: the Docker container exposes PostgreSQL on host port **5433** (mapped from container port 5432).
> Ensure `DATABASE_URL` uses port `5433` for local development.

### 4. Start the database

```bash
docker compose up -d
```

This starts the PostgreSQL 16 container (`table_tickers_db`) and exposes it on port `5433`.

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

This applies all pending migrations, including the initial schema and any subsequent changes.

### 6. Seed the database

```bash
npx prisma db seed
```

This creates:

- One admin user account
- 12 farm products with images and varied stock levels
- 7 demo reservations in various statuses

### 7. Start the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## Demo Accounts

| Role | Email | Password |
|---|---|---|
| Admin | `admin@tabletickers.com` | `admin123` |

---

## Key Routes

| Route | Description |
|---|---|
| `/` | Home page |
| `/about` | About the farm |
| `/products` | Product catalog |
| `/products/[id]` | Product detail page with image gallery |
| `/reservation` | Reservation form |
| `/reservation?productId=[id]` | Reservation form pre-filled with a specific product |
| `/reservation/success?id=[id]&email=[email]` | Post-reservation confirmation page |
| `/reservation/status` | Customer reservation status lookup |
| `/contact` | Contact page |
| `/login` | Admin login |
| `/admin/dashboard` | Admin dashboard with KPIs and summaries |
| `/admin/products` | Admin product list |
| `/admin/products/new` | Create a new product |
| `/admin/products/[id]/edit` | Edit a product and manage images |
| `/admin/reservations` | Admin reservation list with filters |

---

## Architecture

See [`docs/architecture.md`](./docs/architecture.md) for the full system architecture overview.

For local development setup details, see [`docs/local-dev.md`](./docs/local-dev.md).

---

## Project Context

Table Tickers was developed as a capstone project at CENTRIA University of Applied Sciences.
The system implements a reservation flow for a local farm, with an emphasis on clean code,
practical user flows, and a production-quality admin experience.

**Team:**

- Chinche Afungchwi — Lead developer, architecture, backend
- Onyeisi — Frontend implementation, UI
- Chikadibia — QA, testing, component cleanup
- Md Walidur — QA, admin flows, bug verification
- Chinemerem — Documentation, content, demo readiness
