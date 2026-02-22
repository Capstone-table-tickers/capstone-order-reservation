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

## 11. Stop the Database

To stop the PostgreSQL container:

```bash
docker compose down
```

---

## 12. View Database Logs (Optional)

If troubleshooting is needed:

```bash
docker logs table_tickers_db
```

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
