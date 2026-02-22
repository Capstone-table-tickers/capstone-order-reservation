# System Architecture
## Table Tickers Order & Reservation System

---

## 1. Project Overview

The Table Tickers Order & Reservation System is a full-stack web application designed to manage product orders and reservations in a structured and scalable manner. 

The system supports:

- Product management (Admin)
- Order processing
- Reservation handling
- Role-based authentication
- Admin dashboard access control

The architecture is designed to be:

- Modular
- Scalable
- Maintainable
- Suitable for production-grade workflows
- Aligned with professional software engineering practices

---

## 2. Technology Stack

### Frontend
- Next.js (App Router)
- React with TypeScript
- Tailwind CSS
- Poppins (Google Font)

### Backend
- Next.js API Routes
- NextAuth (Credentials Provider)
- JWT-based session strategy

### Database
- PostgreSQL (v16)
- Dockerized local environment
- Prisma ORM (v6)

### DevOps & Workflow
- GitHub Organization
- Branch protection rules
- GitHub Actions CI
- Issue-based workflow
- Milestone tracking
- Pull Request review system

---

## 3. High-Level Architecture

The system follows a layered architecture:

Client Layer (UI)
↓
API Layer (Next.js Route Handlers)
↓
Business Logic Layer
↓
Data Access Layer (Prisma)
↓
PostgreSQL Database

### Flow Example (Authentication)

1. User submits login credentials.
2. NextAuth Credentials Provider validates user.
3. Prisma queries PostgreSQL.
4. Password is validated using bcrypt.
5. JWT token is issued.
6. Middleware enforces role-based access.

---

## 4. Folder Structure Overview

```
src/
 ├── app/
 │   ├── api/
 │   │   └── auth/
 │   │       └── [...nextauth]/
 │   ├── admin/
 │   └── layout.tsx
 │
 ├── components/
 │   └── providers/
 │       └── AuthProvider.tsx
 │
 ├── types/
 │   └── next-auth.d.ts
 │
 prisma/
 │   ├── schema.prisma
 │   └── seed.ts
 │
 docs/
 │   ├── architecture.md
 │   └── local-dev.md
```

This structure separates:

- API logic
- UI components
- Type definitions
- Database schema
- Documentation

---

## 5. Authentication Architecture

The system uses:

- NextAuth with Credentials Provider
- JWT session strategy
- Role-based authorization

### Roles

- ADMIN
- CUSTOMER

Role information is:

- Stored in the database
- Added to JWT token
- Attached to session
- Validated in middleware

### Route Protection

Middleware protects:

/admin/*

Only users with role = ADMIN can access these routes.

---

## 6. Database Architecture

The database is managed using Prisma ORM.

### Core Models (MVP)

- User
- Product
- Order
- OrderItem
- Reservation (planned)
- Role enum

Relationships:

- A User can have many Orders
- An Order has many OrderItems
- An OrderItem references a Product

The database runs locally via Docker to ensure consistency across all development machines.

---

## 7. Environment Configuration

Environment variables are managed using:

- .env (local, not committed)
- .env.example (committed template)

Required variables:

- DATABASE_URL
- NEXTAUTH_SECRET
- NEXTAUTH_URL

This ensures secure configuration without exposing sensitive data.

---

## 8. CI/CD Pipeline

GitHub Actions is configured to:

- Install dependencies
- Run ESLint
- Run TypeScript type checks
- Generate Prisma client
- Build the application

Branch protection requires:

- Successful CI run
- Pull request approval
- Up-to-date branch before merge

This prevents unstable code from entering dev or main.

---

## 9. Branching Strategy

Branches used:

- main → Stable release branch
- dev → Integration branch
- feature/* → Feature development
- chore/* → Maintenance tasks
- fix/* → Bug fixes

Workflow:

1. Create Issue
2. Create feature branch from dev
3. Open Pull Request to dev
4. CI must pass
5. Lead developer merges
6. Periodically merge dev → main

---

## 10. Development Workflow

All development follows:

- Issue-based task assignment
- Pull request reviews
- CI validation
- Definition of Done enforcement

Definition of Done:

- Code pushed to feature branch
- PR opened to dev
- CI passes
- Reviewed and approved
- Linked issue closed

---

## 11. Security Considerations

- Passwords hashed using bcrypt
- JWT session strategy
- Role-based middleware enforcement
- No secrets committed to repository
- Branch protection prevents direct pushes

---

## 12. Scalability Considerations

The architecture supports future enhancements:

- Payment gateway integration (Stripe)
- Advanced analytics dashboard
- Reservation capacity management
- Email notifications
- Deployment to cloud platforms

The modular structure ensures minimal refactoring when expanding functionality.

---

## 13. Architectural Decisions Summary

Key decisions:

- Use Next.js App Router for full-stack capability
- Use Prisma for type-safe database access
- Use Docker for environment consistency
- Use JWT sessions for scalable authentication
- Enforce CI before merge
- Centralize workflow through issues and milestones

These decisions align with professional full-stack development standards and support maintainability, scalability, and clean collaboration.

---

End of Architecture Document
