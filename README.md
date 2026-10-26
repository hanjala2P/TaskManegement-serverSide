# 🚀 Enterprise Modular Monolith Task Management API

A robust, secure, and production-ready backend API built with **Node.js, Express, TypeScript, Prisma, and PostgreSQL/MongoDB**. It follows a modular architecture pattern and includes advanced security features, global error handling, Zod validation, and complete deployment readiness for Vercel.

---

## ✨ Features

- **Modular Monolith Architecture:** Clean, scalable, and maintainable folder structure organized by feature modules (`auth`, `user`, `task`, etc.).
- **Type Safety:** Built completely with **TypeScript**.
- **Database Management:** Powered by **Prisma ORM** for seamless database operations and migrations.
- **Robust Validation:** Request body, query, and params validation handled via **Zod**.
- **Security Best Practices:** 
  - **Helmet** for securing HTTP headers.
  - **Rate Limiting** (`express-rate-limit`) to prevent DDoS and Brute-force attacks.
  - **CORS** configuration supporting credentials and multi-origin access.
- **Authentication & Authorization:** Secure JWT-based authentication with role-based access control (RBAC) and HttpOnly cookies.
- **Advanced Task Features:** Pagination, multi-field searching, and filtering by status & priority.
- **Global Error Handling:** Centralized custom `AppError` and Prisma-aware error handler middleware.
- **File Uploads:** Integrated with `multer` for handling file attachments.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js (v5)
- **Language:** TypeScript
- **Database & ORM:** PostgreSQL / MongoDB via Prisma ORM
- **Validation:** Zod
- **Security:** Helmet, Express Rate Limit, bcrypt, JSON Web Token (JWT)
- **Deployment:** Vercel

---

## 📂 Project Structure

```text
src/
├── app.ts                  # Express application setup
├── server.ts               # Server entry point
├── middleware/             # Global middlewares (Auth, ErrorHandler, ValidateRequest, etc.)
├── modules/                # Feature-based modules
│   ├── auth/               # Authentication module (controller, service, routes)
│   ├── task/               # Task management module
│   └── user/               # User management module
├── routes/                 # Central router setup
└── utlis/                  # Utility functions (Prisma client, CatchAsync, SendResponse, etc.)
prisma/
├── schema.prisma           # Prisma database schema
└── prisma.config.ts        # Prisma configuration"# TaskManegement-serverSide" 
