# 🥩 Tuliho Meat — Enterprise Marketplace

> **Farm-fresh premium cuts, delivered to your doorstep.**  
> A full-stack marketplace for Tuliho Meat — showcasing products, services, and company heritage with an admin dashboard and WhatsApp integration.

![cover](enterprise_marketplace/frontend/src/assets/coverpage.jpg)

curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

---

## ✨ Features

| Area | Capabilities |
|------|-------------|
| **🌐 Public Site** | Product catalog, service listings, about/heritage, contact with WhatsApp click-to-chat |
| **🛒 Products** | Category filtering, pricing, offer badges, dynamic image gallery with smooth animations |
| **📝 Comments** | Public feedback on products with admin moderation |
| **🔐 Admin Dashboard** | JWT-authenticated CRUD for products, comment moderation, interaction analytics |
| **📊 Analytics** | Page visit tracking, site interaction logging |
| **📱 Responsive** | Mobile-first design optimized for WhatsApp-driven customer engagement |
| **🎨 Animations** | Framer Motion page transitions, hover states, auto-rotating image gallery |

---

## 🏗 Tech Stack

```
Frontend          React 19 + Vite 8 + Tailwind CSS 4 + Framer Motion
Backend           FastAPI (Python) + SQLAlchemy + Pydantic
Database          SQLite (dev) → PostgreSQL (prod)
Auth              JWT (python-jose + passlib/bcrypt)
Infrastructure    Docker + docker-compose, Linux VPS, Let's Encrypt SSL
Testing           pytest (backend) + Vitest / React Testing Library (frontend)
```

---

## 📁 Project Structure

```
enterprise_marketplace/
├── backend/                     # FastAPI Python engine
│   ├── app/
│   │   ├── api/v1/endpoints/    # Auth, products, services, comments, interactions
│   │   ├── core/                # Config, security, JWT
│   │   ├── db/                  # SQLAlchemy session & Alembic migrations
│   │   ├── models/              # Database table definitions
│   │   └── schemas/             # Pydantic request/response validation
│   ├── tests/                   # pytest suite (API, auth, models, schemas)
│   ├── main.py                  # FastAPI app entry point
│   ├── Dockerfile               # Backend container
│   └── requirements.txt         # Pinned Python dependencies
│
├── frontend/                    # React + Vite customer interface
│   ├── src/
│   │   ├── assets/              # Optimized product & meat imagery
│   │   ├── components/          # Navbar, Footer, Layout, WhatsApp button
│   │   ├── pages/               # Home, Products, Services, About, Contact, Admin
│   │   └── services/            # Axios API client with JWT interceptor
│   ├── package.json
│   └── vite.config.js
│
├── deployments/
│   └── docker-compose.yml       # Multi-container orchestration
└── docs/
    ├── development.md           # Phase-by-phase build plan
    └── setup.yaml               # Full project specification
```

---

## 🚀 Quick Start

### Backend

```bash
cd enterprise_marketplace/backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn main:app --reload          # → http://localhost:8000
```

### Frontend

```bash
cd enterprise_marketplace/frontend
npm install
npm run dev                        # → http://localhost:5173
```

### Docker (full stack)

```bash
cd enterprise_marketplace
docker compose -f deployments/docker-compose.yml up --build
```

---

## 📜 Available Scripts

### Frontend

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | ESLint check |
| `npm test` | Run Vitest test suite |

### Backend

| Command | Description |
|---------|-------------|
| `uvicorn main:app --reload` | Dev server with hot reload |
| `pytest` | Run all backend tests |
| `alembic upgrade head` | Apply database migrations |
| `alembic revision --autogenerate -m "msg"` | Create new migration |

---

## 🧪 Testing

```bash
# Backend (pytest)
cd enterprise_marketplace/backend && pytest -v

# Frontend (Vitest)
cd enterprise_marketplace/frontend && npm test
```

- **Backend**: API endpoint tests, auth flows, model validation, schema serialization
- **Frontend**: Component rendering, page smoke tests, API client mocking

---

## 🧭 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/v1/auth/login` | Admin login (returns JWT) |
| GET | `/api/v1/products` | List all products |
| POST | `/api/v1/products` | Create product *(admin)* |
| PUT | `/api/v1/products/{id}` | Update product *(admin)* |
| DELETE | `/api/v1/products/{id}` | Delete product *(admin)* |
| GET | `/api/v1/services` | List all services |
| POST | `/api/v1/services` | Create service *(admin)* |
| GET | `/api/v1/comments` | List approved comments |
| POST | `/api/v1/comments` | Submit a comment (public) |
| PUT | `/api/v1/comments/{id}/approve` | Approve comment *(admin)* |
| POST | `/api/v1/interactions` | Log page visit |

Interactive docs at `http://localhost:8000/docs` (Swagger UI).

---

## 🖼 Image Optimization

All site images are optimized via **sharp**:
- **coverpage.jpg**: 7952px → 1920px, 11 MB → 534 KB
- **Product images**: Recompressed at JPEG quality 80 with progressive encoding  
- **Lazy loading** with skeleton placeholders during fetch

---

## 📞 Contact

- **WhatsApp**: [+255 672 203 073](https://wa.me/255672203073)
- **Phone**: +255 672 203 073 · +255 754 245 863
- **Location**: Mafinga, Mkabala na Stand Kuu
- **Hours**: Mon–Sat, 8:00 AM – 6:00 PM

---

## 📄 License

Proprietary — Tuliho Meat © 2026. All rights reserved.
