# Table Tickers – Order & Reservation System

## Project Overview

Table Tickers is a full-stack web application designed to support farm-based product browsing, product management, and reservation handling. The platform enables customers to explore farm products, reserve them for pickup or delivery, and allows administrators to manage products and review reservations.

The system is built with a modern web stack and follows a structured, milestone-driven development approach.

Current implementation includes Milestone 3 (Reservation System + Admin Product & Reservation Management).

---

## Tech Stack

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, NextAuth (credentials-based), Zod validation
- **Database**: PostgreSQL (v16 in Docker), Prisma ORM (v6)
- **Architecture**: Feature-based modules, server/client component boundaries, transaction-based persistence

---

## Features

### Public Pages
- Home page with structured sections
- About page
- Contact page
- Policy pages (Privacy, Booking, Delivery/Pickup)

### Product Browsing
- Public product listing with server-side data fetching
- Responsive product grid with images
- Product availability status
- Loading and empty states

### Reservation System
- Complete reservation creation flow (frontend to database)
- Reservation form with:
  - Customer information (name, phone, email)
  - Reservation date and time selection
  - Fulfillment method (Pickup or Delivery)
  - Conditional delivery address (required for delivery only)
  - Optional notes
  - Product selection with quantities
- Real-time validation feedback
- Server-side validation (schema + business rules)
- Pickup vs Delivery enforcement:
  - Delivery reservations require address (enforced at service layer)
  - Pickup reservations do not require address

### Product Selection in Reservations
- Multiple products per reservation
- Quantity selection per product
- Product validation:
  - Must exist in system
  - Must be marked as active
  - Quantity must be ≥ 1
- ReservationItem join model for product associations

### Admin Panel
- Protected admin dashboard with role-based access control
- **Product Management**:
  - View all products
  - Create new products
  - Edit existing products
  - Delete products
  - Manage product status (active/inactive)
- **Reservation Management**:
  - View all reservations
  - View reserved products per reservation
  - View product quantities
  - View calculated total reservation price
  - Update reservation status (Pending, Confirmed, Completed, Cancelled)
  - Product links to product detail pages

---

## Route Structure

### Public Routes
- `/` – Home page
- `/about` – About page
- `/contact` – Contact page
- `/products` – Product listing
- `/reservation` – Reservation form
- `/policies/privacy` – Privacy Policy
- `/policies/booking` – Booking Terms
- `/policies/delivery-pickup` – Delivery/Pickup Policy

### Admin Routes (Protected)
- `/admin/dashboard` – Reservation overview and status management
- `/admin/products` – Product listing
- `/admin/products/new` – Create new product
- `/admin/products/[id]/edit` – Edit product

---

## Reservation Flow

### Frontend
1. User selects products from `/products` or navigates to `/reservation`
2. User fills reservation form:
   - Customer information
   - Reservation date/time
   - Fulfillment method selection
   - Conditional address (shown only for Delivery)
   - Product selection with quantities
3. Client-side validation provides immediate feedback
4. Form submission to API with validation

### Backend
1. **Schema Validation** (Zod): Validates fulfillment method and address requirement
2. **Service-Layer Validation** (createReservation):
   - Enforces delivery address requirement
   - Validates product existence and active status
   - Prevents duplicate product selections
   - Validates quantities
3. **Database Transaction** (Prisma):
   - Creates Reservation record
   - Creates ReservationItem records linking products
   - Atomic all-or-nothing operation
4. **Response**: Returns reservation confirmation with ID

### Database
- Reservation table: stores customer info, dates, times, delivery address, notes
- ReservationItem table: join model linking reservations to products with quantities
- Enforces data integrity via unique constraint on (reservationId, productId)

---

## Admin Capabilities

### Product Management
- **Create**: Add new products with name, description, price, stock quantity, images
- **Edit**: Update product details and status
- **View**: Product listing with active status indicators
- **Images**: Support for product images via ProductImage model

### Reservation Management
- **View**: Complete list of all reservations sorted by date
- **Details**: Customer information, reservation type, date/time, delivery address
- **Products**: View reserved products with quantities
- **Pricing**: View calculated total reservation price (sum of product price × quantity)
- **Status**: Update reservation status through integrated status control
- **Notes**: View and manage reservation notes

---

## Data Model

### Core Models
- **User**: System users with role-based access control (Admin/Customer)
- **Product**: Farm products with pricing, stock, active status, images
- **Reservation**: Reservation requests with customer info, fulfillment method, address
- **ReservationItem**: Join model linking Reservation to Product with quantity
- **ProductImage**: Product image associations

### Key Relationships
- User → (orders, reservations)
- Product → (OrderItem, ReservationItem)
- Reservation → ReservationItem → Product
- Unique constraint on (reservationId, productId) prevents duplicate selections

---

## Validation Architecture

### Frontend Validation (Client-Side)
- Inline form validation using custom validation function
- Immediate feedback on field requirements
- Conditional field display based on fulfillment method

### Schema Validation (Zod)
- Type-safe validation using Zod schemas
- Delivery address requirement enforced via superRefine
- Product array validation with quantity constraints
- Error messages for end-user display

### Business Logic Validation (Service Layer)
- Delivery address requirement re-checked at service layer (defense-in-depth)
- Product existence and active status verification
- Duplicate product selection prevention
- Quantity validation (≥ 1)

---

## Development Workflow

- **Branching Strategy**: main (stable) → dev (integration) → feature/* (feature development)
- **Pull Requests**: All changes through PR with CI checks
- **Quality Gates**: Lint, TypeScript, build validation required before merge

---

## Local Development

### Quick Start
```bash
# Install dependencies
npm install

# Start database (Docker)
docker compose up -d

# Run migrations
npx prisma migrate dev

# Seed database
npx prisma db seed

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

### Admin Access
Use seeded credentials:
- **Email**: admin@tabletickers.com
- **Password**: admin123

### Additional Commands
```bash
# Open Prisma Studio (database GUI)
npx prisma studio

# View database logs
docker logs table_tickers_db

# Stop database
docker compose down
```

---

## API Endpoints

### Reservations
- `POST /api/reservations` – Create new reservation
  - Request: Reservation form data with products array
  - Response: Created reservation with ID
  - Validation: Server-side schema and business logic

### Admin (Protected)
- `PATCH /api/admin/reservations/{id}/status` – Update reservation status
  - Request: New status value
  - Response: Updated reservation

---

## Next Steps (Upcoming Milestones)

- Delivery logic with distance-based pricing
- Payment integration
- Email notifications for reservations
- Advanced analytics and reporting
- Order management system (separate from reservations)

---

## Notes

- The application is currently scoped to Kokkola, Finland
- Design emphasizes simplicity, clarity, and reservation-first workflow
- ReservationItem join model enables flexible product association without modification to core Reservation model
- All validation is enforced both client-side and server-side for maximum reliability
- Reservation implementation follows transactional patterns to ensure data consistency

---

## Team Members

- **Chinche Afungchwi** – Lead Developer (Backend, Architecture, Integration)
- **Onyeisi** – Frontend Developer
- **Chinemerem** – Documentation & UI Components
- **Chikadibia** – Testing, QA & Dashboard Components

---

## License

This project is developed as part of an academic capstone and is intended for educational use.
