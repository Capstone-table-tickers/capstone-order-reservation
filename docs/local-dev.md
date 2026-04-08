# Local Development Setup

This document describes how to set up the local development environment for the **Table Tickers Order & Reservation System**.

Repository:
https://github.com/Capstone-table-tickers/capstone-order-reservation

---

## 1. Prerequisites

Ensure the following tools are installed:

- Node.js (v20 LTS recommended)
- npm (comes with Node.js)
- Git
- Docker Desktop (must be running)

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

Ensure there are no installation errors.

---

## 4. Configure Environment Variables

This project requires environment variables for:

- Database connection
- Authentication (NextAuth)

An example file is provided:

.env.example

Create your local environment file by copying:

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
copy .env.example .env
```

### Required Variables (example)

Your `.env` file should contain:

```env
DATABASE_URL="postgresql://app:app@localhost:5432/table_tickers"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

Important:
- Never commit `.env`
- Only commit `.env.example`

---

## 5. Start PostgreSQL Database (Docker)

The project uses PostgreSQL (v16) running inside Docker.

Start the database:

```bash
docker compose up -d
```

This will:

- Pull the PostgreSQL 16 image (first time only)
- Create container `table_tickers_db`
- Expose PostgreSQL on port `5432`
- Create a persistent volume

Verify it is running:

```bash
docker ps
```

---

## 6. Run Database Migration (Prisma)

This project uses **Prisma ORM (v6)**.

After starting Docker, run:

```bash
npx prisma migrate dev
```

This will:

- Create database tables
- Apply migrations
- Sync schema

If migration succeeds without errors, the database is correctly configured.

---

## 7. Seed the Database

Seed demo data (including admin user):

```bash
npx prisma db seed
```

Ensure seeding completes successfully.

---

## 8. Run the Application

Start the development server:

```bash
npm run dev
```

Open in browser:

http://localhost:3000

---

## 9. Verify Authentication

Visit:

http://localhost:3000/api/auth/signin

Confirm the login page loads.

---

## 10. Verify Admin Route Protection

Visit:

http://localhost:3000/admin

If not authenticated, you should be redirected to the sign-in page.

This confirms middleware protection is working.

---

## 12. View Database Logs (Optional)

If troubleshooting is needed:

```bash
docker logs table_tickers_db
```

---

## 13. Access Prisma Studio (Optional)

To view and manage database records with a GUI:

```bash
npx prisma studio
```

This opens an interactive database browser at http://localhost:5555

---

## 14. Test the Reservation System

To verify the reservation system is working:

1. Open http://localhost:3000/products
   - Confirm products are displayed
   - Verify product details (name, price, stock)

2. Open http://localhost:3000/reservation
   - Fill in customer information:
     - Full name
     - Phone
     - Email
   - Select a reservation date and time
   - Select **Pickup** as fulfillment method
     - Confirm address field is hidden
   - Select 1-2 products with quantities
   - Submit the form
   - Confirm success message displays

3. Test Delivery mode:
   - Go back to reservation form
   - Select **Delivery** as fulfillment method
   - Confirm address field appears
   - Try submitting without address
     - Should show "Please enter a delivery address"
   - Enter a delivery address
   - Select products and submit
   - Confirm success message displays

---

## 15. Access Admin Panel

To access the admin panel:

1. Open http://localhost:3000/api/auth/signin
2. Login with seeded credentials:
   - **Email**: admin@tabletickers.com
   - **Password**: admin123
   - Click Sign In

3. Once logged in, access admin pages:
   - **Dashboard**: http://localhost:3000/admin/dashboard
     - View all reservations
     - See reserved products per reservation
     - See calculated total price
     - Update reservation status (Pending, Confirmed, Completed, Cancelled)
   - **Products**: http://localhost:3000/admin/products
     - View all products
     - Click Create Product to add new product
     - Click Edit on any product to modify it
     - Toggle product active status

---

## 16. Test Reservation Viewing in Admin

After creating test reservations:

1. Open http://localhost:3000/admin/dashboard
2. Find your test reservations in the list
3. Each reservation card shows:
   - Customer name and contact info
   - Reservation type (Pickup/Delivery)
   - Delivery address (if applicable)
   - Reserved products with quantities:
     - Product names (clickable links to product pages - future feature)
     - Quantities (e.g., "Fresh Strawberry × 2")
   - Total price (calculated from product prices × quantities)
   - Status control to update reservation status
   - Notes (if any)

---

## 17. Test Product Management

To verify product management:

1. Open http://localhost:3000/admin/products
2. Click "Create Product"
   - Fill in product details:
     - Name (must be unique)
     - Description
     - Price
     - Stock Quantity
   - Click Submit
   - Confirm product appears in list

3. Click Edit on a product
   - Modify details
   - Click Save
   - Confirm changes are reflected in list

4. Return to /products
   - Confirm new product appears in public listing
   - Verify product details match admin input

---

## Expected Outcome

Local setup is successful when:

- Dependencies install without errors
- Docker container runs correctly
- Prisma migration succeeds
- Seed script executes
- Application loads
- Authentication route works
- Admin route is protected

---

## Notes

- Always pull the latest `dev` branch before starting new work.
- Never commit `.env`.
- Always create feature branches from `dev`.
- All changes must go through Pull Requests.
