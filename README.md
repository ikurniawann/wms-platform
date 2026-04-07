# 🏭 WMS Platform - Warehouse Management System

> **✅ ACTIVE REPOSITORY** - Modular Monolith Architecture

[![Go](https://img.shields.io/badge/Go-1.21-blue)](https://golang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://docker.com/)

A modern Warehouse Management System with clean architecture, ready for scale.

---

## 🚀 Quick Start

```bash
# Clone
git clone https://github.com/ikurniawann/wms-platform.git
cd wms-platform

# Run everything
docker-compose up -d

# Access
Frontend: http://localhost:3000
Backend:  http://localhost:8080
Health:   http://localhost:8080/health
```

---

## 🏗️ Architecture

```
wms-platform/
├── 📁 backend/           # Go Backend
│   ├── 📁 cmd/
│   │   ├── 📄 api/       # HTTP Server entry point
│   │   └── 📄 worker/    # Background worker
│   └── 📁 internal/
│       ├── 📁 product/   ✅ Full module
│       ├── 📁 order/     ⏳ Stub
│       ├── 📁 inventory/ ⏳ Stub
│       └── 📁 customer/  ⏳ Stub
├── 📁 frontend/          # Next.js 14
└── 📄 docker-compose.yml # Full stack
```

---

## 📊 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 + TypeScript + Tailwind |
| Backend | Go 1.21 + Gin + GORM |
| Database | PostgreSQL 15 |
| Cache | Redis 7 |
| Container | Docker + Docker Compose |

---

## 🔄 Module Status

| Module | Status | Description |
|--------|--------|-------------|
| Product | ✅ Full | CRUD + Search + Pagination |
| Order | ⏳ Stub | Routes ready, needs implementation |
| Inventory | ⏳ Stub | Routes ready, needs implementation |
| Customer | ⏳ Stub | Routes ready, needs implementation |

---

## 📁 Previous Version

**Old Repository (Archived):** [wms-backend](https://github.com/ikurniawann/wms-backend)

- Phase 1-3: Monolithic architecture
- Phase 4: **This repo** - Modular Monolith

---

## 🎯 Roadmap

- [ ] Complete Order module
- [ ] Complete Inventory module
- [ ] Complete Customer module
- [ ] Add authentication (JWT)
- [ ] Frontend API integration
- [ ] Background jobs (worker)

---

## 📜 License

MIT
