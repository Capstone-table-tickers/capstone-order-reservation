# Local Development Setup

This document describes how to set up the local development environment
for the Table Tickers Order & Reservation System.

------------------------------------------------------------------------

## 1. Prerequisites

Ensure the following are installed:

-   Node.js (v20 LTS recommended)
-   npm (comes with Node.js)
-   Docker Desktop (running)

Verify installation:

``` bash
node -v
npm -v
docker --version
```

------------------------------------------------------------------------

## 2. Install Project Dependencies

After cloning the repository, install dependencies:

``` bash
npm install
```

------------------------------------------------------------------------

## 3. Start PostgreSQL Database (Docker)

The project uses PostgreSQL running inside a Docker container.

Start the database:

``` bash
docker compose up -d
```

This will:

-   Pull the PostgreSQL 16 image (first time only)
-   Create a container named `table_tickers_db`
-   Expose PostgreSQL on port `5432`

------------------------------------------------------------------------

## 4. Stop the Database

To stop the database container:

``` bash
docker compose down
```

------------------------------------------------------------------------

## 5. View Database Logs

If you need to inspect logs:

``` bash
docker logs table_tickers_db
```

------------------------------------------------------------------------

## 6. Run the Application

Start the development server:

``` bash
npm run dev
```

Open in browser:

http://localhost:3000

------------------------------------------------------------------------

## 7. Environment Variables

A `.env` file will be required for database connection and
authentication configuration.

This file is not committed to the repository.

An example configuration will be provided in `.env.example`.

------------------------------------------------------------------------

More setup instructions (Prisma, migrations, seeding) will be added as
development progresses.
