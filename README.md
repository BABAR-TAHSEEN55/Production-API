# **Production API**

A **TypeScript-based REST API** built using **Express** and **Mongoose**, designed with modular architecture and production-ready tooling.
This API focuses on **user authentication**, **session management**, and a **Product CRUD workflow**, along with validation, metrics, Docker support, and testing.

---

## ⭐ **Key Features**

1. **JWT Authentication** using access & refresh tokens
2. **Persistent session management** stored in MongoDB
3. **Product CRUD operations** with ownership & authorization checks
4. **Request validation** via **Zod schemas**
5. **Prometheus-style metrics endpoint** (separate metrics server)
6. **Docker-ready build output** in `dist/` directory
7. **Modular service-layer architecture**

---

## 🛠 **Tech Stack**

- **Node.js + TypeScript**
- **Express** (Routing)
- **Mongoose** (MongoDB ODM)
- **Zod** (Schema validation)
- **Pino** (Structured logging)
- **Jest + Supertest** (Testing)
- **pnpm** (Package manager)
- **Docker** (Containerization)

---

## 📦 **Requirements**

Before running the project:

1. Node.js (compatible version)
2. `pnpm` globally installed (optional, you can use npm/yarn)
3. A running **MongoDB instance**
4. Required **environment variables** configured (see below)

---

## 🚀 **Quick Start**

### **1. Clone the repository**

```bash
git clone <repo-url>
cd <project-folder>
```

### **2. Create an environment file**

Create a `.env` file or provide variables via your environment.

### **3. Install dependencies**

```bash
pnpm install
```

### **4. Run the development server**

```bash
pnpm run dev
```

### **5. Build for production**

```bash
pnpm run build
```

### **6. Run tests**

```bash
pnpm test
```

---

## 🔐 **Environment Variables**

The following variables must be provided:

| Variable         | Description                          |
| ---------------- | ------------------------------------ |
| `MONGODB_USER`   | MongoDB username                     |
| `MONGODB_PASSWD` | MongoDB password                     |
| `PUBLIC_KEY`     | RSA public key (token verification)  |
| `PRIVATE_KEY`    | RSA private key (token signing)      |
| `PORT`           | (Optional) Application port override |

Defaults are defined inside:
`config/default.ts`

---

## 🐳 **Docker Instructions**

The repository includes a production-ready `Dockerfile`.

### **Build the Docker image**

```bash
docker build -t production-api .
```

### **Run the container**

```bash
docker run -p 3000:3000 --env-file .env production-api
```

The Docker workflow:

- Installs dependencies
- Compiles TypeScript → `dist/`
- Starts server from `dist/src/index.js`

---

## 📁 **Project Structure**

```
.
├── package.json
├── Dockerfile
├── config/
│   └── default.ts
├── src/
│   ├── index.ts
│   ├── routes.ts
│   ├── controllers/
│   ├── services/
│   ├── models/
│   ├── schema/
│   ├── middlewares/
│   ├── utils/
│   └── __tests__/
└── dist/ (after build)
```

### **Important Folders**

| Folder         | Purpose                                            |
| -------------- | -------------------------------------------------- |
| `controllers/` | Endpoint controllers for users, sessions, products |
| `services/`    | Business logic & DB operations                     |
| `models/`      | Mongoose schemas & models                          |
| `middlewares/` | Auth & validation middleware                       |
| `schema/`      | Zod request validation                             |
| `utils/`       | Logging, JWT helpers, server utilities             |

---

## 🔥 **API Endpoints**

### **Health Check**

```
GET /healthcheck
```

---

### **User Endpoints**

| Method | Route        | Description       |
| ------ | ------------ | ----------------- |
| POST   | `/api/users` | Create a new user |

---

### **Session Endpoints**

| Method | Route           | Description                            |
| ------ | --------------- | -------------------------------------- |
| POST   | `/api/sessions` | Login → returns access + refresh token |
| GET    | `/api/sessions` | List active sessions                   |
| DELETE | `/api/sessions` | Logout (invalidate session)            |

A valid session populates:
`res.locals.user`

---

### **Product Endpoints**

| Method | Route                     | Description                        |
| ------ | ------------------------- | ---------------------------------- |
| POST   | `/api/product`            | Create new product (requires auth) |
| GET    | `/api/product/:productId` | Fetch product by ID                |
| PUT    | `/api/product/:productId` | Update product (owner only)        |
| DELETE | `/api/product/:productId` | Delete product (owner only)        |

Ownership checks implemented at the service layer.

---

## 🧪 **Testing Notes**

- **Jest + Supertest** used for unit & integration tests
- Test configuration: `jest.config.js`
- Test files located in:
  `src/__tests__/`

---

## 📊 **Logging & Metrics**

- **Pino logger** (`src/utils/logger.ts`)
- **Prometheus-compatible metrics server** started from the application entry point

---

## 📘 **Common Commands**

| Command          | Description                         |
| ---------------- | ----------------------------------- |
| `pnpm install`   | Install dependencies                |
| `pnpm run dev`   | Start dev server with file watching |
| `pnpm run build` | Compile TS → JS                     |
| `pnpm test`      | Run test suite                      |

---
