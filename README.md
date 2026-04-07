# WMS Platform

Modern Warehouse Management System with Modular Monolith Architecture

## 🏗️ Architecture

```
wms-platform/
├── backend/           # Go Modular Monolith
│   ├── cmd/
│   │   ├── api/      # HTTP API Server
│   │   └── worker/   # Background Worker
│   └── internal/
│       ├── product/  # Product Module
│       ├── order/    # Order Module
│       ├── inventory/# Inventory Module
│       ├── customer/ # Customer Module
│       └── shared/   # Shared components
├── frontend/         # Next.js 14
└── infra/           # Docker & K8s configs
```

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Go 1.21+
- Node.js 18+

### Run with Docker Compose

```bash
# Clone and start
$ git clone https://github.com/ikurniawann/wms-platform.git
$ cd wms-platform
$ docker-compose up -d

# Services:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8080
# - Health: http://localhost:8080/health
```

### Development

```bash
# Backend
cd backend
cp .env.example .env
go mod tidy
go run cmd/api/main.go

# Frontend
cd frontend
npm install
npm run dev
```

## 📚 API Documentation

- Health: `GET /health`
- Products: `GET /api/v1/products`
- Orders: `GET /api/v1/orders`
- Inventory: `GET /api/v1/inventory/stocks`

## 🔐 Authentication

JWT-based authentication. Include token in header:
```
Authorization: Bearer <token>
```

## 📦 Modules

| Module | Endpoints | Description |
|--------|-----------|-------------|
| Product | `/api/v1/products` | Products, variants, categories |
| Order | `/api/v1/orders` | Sales & purchase orders |
| Inventory | `/api/v1/inventory` | Stock, movements, adjustments |
| Customer | `/api/v1/customers` | Customers, suppliers, groups |

## 🛠️ Tech Stack

**Backend:**
- Go 1.21
- Gin Framework
- GORM
- PostgreSQL
- JWT Authentication

**Frontend:**
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query
- Zustand

**Infrastructure:**
- Docker
- Docker Compose
- Redis (caching)

## 📄 License

MIT
