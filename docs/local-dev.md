# Local Development Setup

This document describes how to set up and run the **Table Tickers Order & Reservation System** locally.

Repository: https://github.com/Capstone-table-tickers/capstone-order-reservation

---

## 1. Prerequisites

Ensure the following tools are installed:

- Node.js v20 LTS or later
- npm (bundled with Node.js)
- Git
- Docker Desktop (must be running before starting the database)

Verify installation:

```bash
node -v
npm -v
git --version
docker --version
```

---

## 2. Clone the Repository

```bash
git clone https://github.com/Capstone-table-tickers/capstone-order-reservation.git
cd capstone-order-reservation
```

---

## 3. Install Project Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Copy the example file:

```bash
cp .env.example .env        # macOS / Linux
copy .env.example .env      # Windows PowerShell
```

Your `.env` file must contain the following variables:

```env
DATABASE_URL="postgresql://app:app@localhost:5433/table_tickers"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

The Docker container in this project maps host port **5433** to the PostgreSQL default port (5432) inside the container. Use `5433` in `DATABASE_URL` for local development.

Do not commit `.env`. Only `.env.example` should be committed.

---

## 5. Start the PostgreSQL Database

Start the database container:

```bash
docker compose up -d
```

This will:

- Start a PostgreSQL 16 container named `table_tickers_db`
- Expose PostgreSQL on host port `5433`
- Create a persistent Docker volume for data

Verify the container is running:

```bash
docker ps
```

---

## 6. Apply Database Migrations

This project uses Prisma ORM. Apply all migrations to create the database schema:

```bash
npx prisma migrate deploy
```

This applies all SQL migrations found in `prisma/migrations/`, including the initial schema and subsequent changes such as the `isPrimary` field on product images.

To create a new migration during development (when modifying `schema.prisma`):

```bash
npx prisma migrate dev --name describe_your_change
```

---

## 7. Seed the Database

Populate the database with demo data:

```bash
npx prisma db seed
```

This creates:

- One admin user: `admin@tabletickers.com` / `admin123`
- 12 farm products with names, descriptions, prices, stock quantities, and image URLs
  - The first image per product is marked as the primary image (`isPrimary: true`)
- 7 demo reservations in varied statuses (Pending, Confirmed, Completed, Cancelled)

The seed script is idempotent for the admin user but will skip products and reservations if they already exist.

---

## 8. Start the Development Server

```bash
npm run dev
```

Open in browser: http://localhost:3000

---

## 9. Access the Admin Panel

The admin panel is protected by NextAuth middleware. Unauthenticated users are redirected to `/login`.

1. Open http://localhost:3000/login
2. Enter the seeded credentials:
   - **Email:** `admin@tabletickers.com`
   - **Password:** `admin123`
3. After login, you are redirected to the dashboard at `/admin/dashboard`

Admin routes:

- `/admin/dashboard` — KPI summary, recent reservations, low-stock alerts
- `/admin/products` — Product list with thumbnails, stock status, and edit/deactivate actions
- `/admin/products/new` — Create a new product
- `/admin/products/[id]/edit` — Edit product details and manage images
- `/admin/reservations` — Reservation list with status and type filters

---

## 10. Test the Reservation Flow

### Basic pickup reservation

1. Open http://localhost:3000/products
2. Confirm products are displayed with names, prices, and stock status
3. Click **View** on any product to open its detail page
4. Confirm the primary image displays and gallery thumbnails appear if multiple images exist
5. Click **Reserve this product** — the reservation form opens with that product pre-selected
6. Fill in the required fields: full name, phone, email, date, time
7. Leave fulfillment method as **Pickup** — confirm no address field is shown
8. Submit the form
9. Confirm redirect to `/reservation/success` with a reference ID and itemised summary

### Delivery reservation

1. Open http://localhost:3000/reservation
2. Select **Delivery** as the fulfillment method
3. Confirm a delivery address field appears
4. Attempt to submit without an address — expect a validation error
5. Enter an address and submit — confirm redirect to the success page

### Reservation status lookup

1. Note the reservation ID from a success page or the admin panel
2. Open http://localhost:3000/reservation/status
3. Enter the reservation ID and the customer email used during booking
4. Confirm the reservation details and current status are displayed

---

## 11. Test Product Management (Admin)

1. Open http://localhost:3000/admin/products
2. Confirm products are listed with thumbnail image, name, price, stock count, and status badge

### Create a product

1. Click **New product**
2. Fill in: name, price, stock quantity (description is optional)
3. Under **Primary image**: click the upload button and select an image file (JPEG, PNG, WebP, or GIF, max 5 MB)
4. Under **Gallery images**: upload additional images if desired
5. Click **Create Product**
6. Confirm the product appears in the admin list and at `/products`

### Edit a product

1. Click **Edit** next to any product
2. Modify fields as needed
3. To replace the primary image: click **Replace primary** and upload a new file — the previous primary is unset
4. To add gallery images: click **Add gallery image** and upload a file
5. To remove an existing image: hover over the thumbnail and click **Remove**
6. Click **Update Product**
7. Confirm changes are reflected in both the admin list and the public product detail page

### Deactivate a product

1. On the product list, click **Deactivate** next to a product
2. Confirm the product is removed from the public catalog (`/products`) but remains in the admin list

---

## 12. Test Reservation Management (Admin)

1. Open http://localhost:3000/admin/reservations
2. Confirm reservations are listed with customer name, date, type, and status badge
3. Use the **Status** and **Type** filter dropdowns to narrow the list
4. Click the status dropdown on a reservation card to update its status
5. Confirm the status change is reflected immediately

---

## 13. View Database with Prisma Studio (Optional)

```bash
npx prisma studio
```

Opens a browser-based GUI at http://localhost:5555 for inspecting and editing database records directly.

---

## 14. View Database Logs (Optional)

```bash
docker logs table_tickers_db
```

---

## 15. Stop the Database

```bash
docker compose down
```

To also remove the persistent volume (full reset):

```bash
docker compose down -v
```

---

## Expected Outcome

The setup is complete when:

- `npm install` completes without errors
- `docker compose up -d` starts the `table_tickers_db` container on port `5433`
- `npx prisma migrate deploy` applies all migrations without errors
- `npx prisma db seed` creates the admin user, products, and demo reservations
- `npm run dev` starts the server and http://localhost:3000 loads
- Navigating to `/admin` without logging in redirects to `/login`
- Logging in with `admin@tabletickers.com` / `admin123` grants access to the admin panel

---

## Notes

- Always pull the latest branch before starting new work
- Never commit `.env`
- Always create feature branches from the main development branch
- All changes should go through pull requests
