
# Validating local environtment setup report: issue#19 

Repo: https://github.com/Capstone-table-tickers/capstone-order-reservation

---

## Environment

- OS: Windows 11
- Shell: PowerShell (inside VS Code)
- Editor: Visual Studio Code
- Node.js: v22.x
- Docker: Docker Desktop
- Database: PostgreSQL (Docker)
- ORM: Prisma
- Auth: NextAuth

Project cloned into: `C:\Projects\capstone-order-reservation`.

---

## Setup Steps

### 1. Clone repo
```bash
git clone https://github.com/Capstone-table-tickers/capstone-order-reservation.git
cd capstone-order-reservation
git checkout dev
git pull origin dev
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment variables
`.env.example` was missing. Created `.env` manually:

```env
DATABASE_URL="postgresql://app:app@localhost:5432/table_tickers"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Start database (Docker)
```bash
docker compose up -d
```

### 5. Prisma migrate
```bash
npx prisma migrate dev
```

### 6. Seed database
```bash
npx prisma db seed
```

### 7. Run dev server
```bash
npm run dev
```

---

## Errors Encountered + Fixes

### PowerShell blocked npm scripts
Error: execution policy prevented npm from running.

Fix:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

---

### Missing `.env.example`
Docs referenced `.env.example` but it wasn’t in repo.

Fix:
- Created `.env` manually with required vars.

---

### PostgreSQL port conflict (5432 in use)
Docker error: `Bind for 0.0.0.0:5432 failed`

Fix:
- Edited `docker-compose.yml`:
```yml
ports:
  - "5433:5432"
```
- Updated `.env`:
```env
DATABASE_URL="postgresql://app:app@localhost:5433/table_tickers"
```

---

### Port 3000 already in use
Next.js auto-switched to port 3001.

No fix required. Used:
```
http://localhost:3001
```

---

## Verification

- `docker ps` shows Postgres container running
- Prisma migrate success → schema synced
- Prisma seed success → demo data created
- Dev server started without crash
- Auth route works:
  - `/api/auth/signin` loads credentials form

Root route shows default Next.js starter page (actual app likely under `/admin` or feature routes).

---

## Outcome

Local setup completed successfully.

Stack verified working:
- Docker DB
- Prisma migrations + seed
- NextAuth login page
- Next.js dev server

Setup is reproducible with these notes:
- Create `.env` manually
- Handle port conflicts (5432 / 3000)
- Ensure Docker Desktop running
