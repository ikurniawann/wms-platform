# Vercel Deployment Guide

## 🚀 Deploy Frontend ke Vercel

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login
```bash
vercel login
```

### Step 3: Deploy dari `frontend/` directory
```bash
cd frontend
vercel
```

---

## ⚠️ Environment Variables

Set di Vercel Dashboard atau via CLI:

```bash
vercel env add NEXT_PUBLIC_API_URL
# Value: https://your-backend-domain.com/api/v1
```

**Untuk local development:**
- Backend: `http://localhost:8080`
- Frontend: `http://localhost:3000`

**Untuk production:**
- Backend: `https://api.yourdomain.com` (VPS/Railway/Fly.io)
- Frontend: `https://yourdomain.vercel.app`

---

## 🔧 Backend Deployment Options

### Option A: Keep Docker (Recommended)
- Deploy VPS (DigitalOcean, AWS, GCP)
- Use `docker-compose up -d`
- Domain: `api.wms-platform.com`

### Option B: Serverless
- **Railway.app** (Easiest for Go)
- **Fly.io** (Docker native)
- **AWS Lambda** (Needs adapter)

---

## 📁 Deploy Structure

```
Vercel (Frontend)
    ↓ API calls
Railway/Fly/VPS (Backend + PostgreSQL)
```

---

## 🌐 CORS Setup

Backend sudah support CORS (`middleware/cors.go`).

Tambahkan allowed origins di production:
```go
// cmd/api/main.go
config.AllowOrigins = []string{
    "http://localhost:3000",
    "https://yourdomain.vercel.app",
}
```

---

## ✅ Pre-Deploy Checklist

- [ ] Backend deployed & accessible
- [ ] `NEXT_PUBLIC_API_URL` set correctly
- [ ] CORS configured for production domain
- [ ] Database migrations run
- [ ] Test API endpoints

---

## 🚀 Quick Commands

```bash
# Deploy frontend
cd frontend
vercel --prod

# Check deployment
vercel --version
vercel ls

# View logs
vercel logs --tail
```
