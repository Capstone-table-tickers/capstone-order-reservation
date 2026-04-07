# Table Tickers – Order & Reservation System

## Project Overview

Table Tickers is a full-stack web application designed to support farm-based product browsing and reservation management. The platform allows customers to explore available farm products and submit reservation requests for pickup or delivery.

The system is built with a modern web stack and follows a structured, milestone-driven development approach.

Current implementation focuses on Milestone 2 (Public UI + Core Structure).

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PostgreSQL (Docker)
- Prisma ORM
- NextAuth (credentials-based authentication)

---

## Features (Milestone 2)

### Public Pages
- Home page with structured sections
- About page
- Contact page
- Policy pages:
  - Privacy Policy
  - Booking / Terms
  - Delivery / Pickup Policy

### Products
- Public product listing page
- Server-side data fetching using Prisma
- Responsive product grid
- Loading state
- Empty state handling

### Reservation
- Reservation form UI (frontend only)
- Fields:
  - name, phone, email
  - reservation date and time
  - pickup or delivery selection
  - conditional address field
  - notes
- Inline validation (client-side only)
- Kokkola-based context and messaging

### Admin (Placeholder)
- Admin dashboard page
- Metric cards (placeholder data)
- Responsive dashboard layout
- Reusable MetricCard component

---

## Architecture Overview

The project follows a clean separation of concerns:

- UI Layer
  - Pages under src/app/(public)/
  - Reusable components under src/components/ui/

- Feature Modules
  - Feature-based structure under src/features/
  - Example:
    - products/queries/
    - admin/components/

- Data Layer
  - Prisma ORM
  - Centralized query helpers (no direct DB calls in UI)

---

## Route Structure

### Public Routes

- / – Home
- /about – About page
- /products – Product listing
- /reservation – Reservation form
- /contact – Contact page
- /policies/privacy
- /policies/booking
- /policies/delivery-pickup

### Admin Routes

- /admin/dashboard – Admin dashboard (protected)

---

## Development Workflow

- Branching strategy:
  - main → stable
  - dev → integration
  - feature/* → feature development

- All changes go through:
  - Pull Request
  - CI checks (lint, typecheck, build)

---

## Local Development

### 1. Install dependencies
npm install

### 2. Start database (Docker)
docker compose up -d

### 3. Run migrations
npx prisma migrate dev

### 4. Seed database
npx prisma db seed

### 5. Start development server
npm run dev

---

## Admin Access

Use seeded credentials:

Email: admin@tabletickers.com  
Password: admin123

---

## Current Limitations

- No reservation persistence yet
- No backend API for reservation submission
- No product selection within reservation flow
- No admin CRUD functionality yet
- Dashboard uses placeholder data only

---

## Next Steps (Upcoming Milestones)

- Reservation backend integration
- Product management (admin CRUD)
- Reservation management system
- Admin layout and navigation
- Delivery logic (distance-based pricing)
- Payment integration

---

## Team Members

- **Chinche Afungchwi** – Lead Developer (Backend, Architecture, Integration)
- **Onyeisi** – Frontend Developer
- **Chinemerem** – Documentation & UI Components
- **Chikadibia** – Testing, QA & Dashboard Components
---

## Notes

- The application is currently scoped to Kokkola, Finland
- Design emphasizes simplicity, clarity, and reservation-first workflow

---

## License

This project is developed as part of an academic capstone and is intended for educational use.
