# Palawi — CSR & Donor Management Platform

CSR partner discovery, donor relationship management, audited registers
(gate, menstrual hygiene, albendazole) and WhatsApp outreach for Palawi.

| Part | Stack | Folder |
| --- | --- | --- |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 | [frontend/](frontend/) |
| Backend | Python 3.11+, FastAPI, MongoDB (PyMongo async) | [backend/](backend/) |

```text
frontend/
  src/
    pages/       one file per screen the sidebar switches between
    components/  Navbar, Sidebar and panels embedded in pages
    services/    api.ts: every call to the FastAPI backend
    context/     language (English / Marathi) provider
    types/       shared TypeScript types
    data/        static register data rendered directly by GateRegisterLog
backend/
  main.py        FastAPI app: CORS, MongoDB lifespan, routers
  app/api/       route handlers, mounted at /api/v1
  app/core/      settings from environment / backend/.env
  app/db/        MongoDB client, collection names, seed data
  app/models/    Pydantic request schemas
  app/services/  business logic and queries
```

## Prerequisites

- Node.js 20+
- Python 3.11+
- MongoDB 7+ running locally, or a MongoDB Atlas connection string

## Setup

```bash
# Backend
cd backend
python -m venv .venv            # Windows: py -3.11 -m venv .venv
.venv\Scripts\activate          # macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env          # macOS/Linux: cp .env.example .env  — then set MONGODB_URI

# Frontend
cd ../frontend
npm install
```

## Run locally

Use two terminals.

```bash
# Terminal 1: API on http://localhost:8000 (docs at /docs)
cd backend
.venv\Scripts\activate
uvicorn main:app --reload

# Terminal 2: UI on http://localhost:5173
cd frontend
npm run dev
```

The Vite dev server forwards `/api/*` to `http://localhost:8000`, so the
browser never makes a cross-origin call in development.

On first start the backend fills any empty collection with the sample data
in `backend/app/db/seed_data/`. Set `SEED_ON_STARTUP=false` to turn this off.

## Configuration

`backend/.env` (see [backend/.env.example](backend/.env.example)):

| Variable | Default | Purpose |
| --- | --- | --- |
| `MONGODB_URI` | `mongodb://localhost:27017` | MongoDB connection string |
| `MONGODB_DB_NAME` | `palawi_csr` | Database name |
| `SEED_ON_STARTUP` | `true` | Seed empty collections at startup |
| `CORS_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | Comma-separated origins allowed to call the API |

`frontend/.env.local` (see [frontend/.env.example](frontend/.env.example)):

| Variable | Purpose |
| --- | --- |
| `VITE_DEV_API_PROXY` | Where `npm run dev` forwards `/api` (default `http://localhost:8000`) |
| `VITE_API_BASE_URL` | Production only: the API origin, when it is not the frontend's own domain |

## Production build

```bash
cd frontend && npm run build        # static files in frontend/dist
cd backend && uvicorn main:app --host 0.0.0.0 --port 8000
```

If the frontend and API are on different domains, build with
`VITE_API_BASE_URL=https://your-api.example.org` and add the frontend's origin
to `CORS_ORIGINS`.

## Gate register entries

Employees (volunteers) sign in to the Register Log only. Its *Add entry* form
records name, date of birth, mobile, date, state and city (dropdowns), address,
category, donation/remarks and an optional photo. Each new entry gets a unique
registration ID (`PLW-000001`, `PLW-000002`, ...) from an atomic counter in the
`counters` collection; entries copied from the paper register have none. Photos
are saved to `backend/storage/gate-photos/` (not in git; back this folder up
with the database) and served at `/files/gate-photos/`.

## Known gaps

- **Auth is a placeholder.** `/api/v1/auth/login` accepts any email and returns
  a demo admin; no endpoint checks who is calling. Add real authentication
  before exposing the API publicly.
- **WhatsApp sending is simulated.** Messages are stored in MongoDB, not sent
  through the Meta Cloud API. The `WHATSAPP_*` settings are not read yet.
- **Gemini is not wired up.** `GEMINI_API_KEY` has a settings slot but no caller.
- Several dashboard figures (funds raised, pipeline by stage, monthly
  fundraising) are fixed values in `app/services/dashboard.py`.
