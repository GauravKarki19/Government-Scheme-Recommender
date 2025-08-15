# Government SchemeChecker

A full‑stack application that helps citizens discover government welfare schemes and check eligibility using a simple interface, secure auth, and curated scheme data with multilingual support.

## Features
- **Eligibility checking**: Filter schemes by age, income, occupation, caste, gender, and state.
- **Auth & profiles**: JWT-based signup/login, profile retrieval.
- **Save & apply tracking**: Save schemes and track applied statuses.
- **Static data + DB**: Schemes/locations/translations from JSON; users in MongoDB.
- **Production-ready**: Serves built React app from Express in production.

## Tech Stack
- **Frontend**: React 18, Vite, TailwindCSS, i18next
- **Backend**: Node.js, Express, Mongoose, JWT, bcrypt
- **Database**: MongoDB (Atlas or local)

## Monorepo Structure
```
.
├─ frontend/           # React app (Vite)
├─ server/             # Express API + MongoDB models
│  ├─ routes/          # auth, user endpoints
│  ├─ models/          # User model
│  ├─ middleware/      # auth middleware
│  └─ data/            # schemes.json, translations, locations
├─ package.json        # Root scripts (dev, build, start)
└─ render.yaml         # Example deployment config
```

## Quick Start
1. Install Node.js 16+ and MongoDB (or MongoDB Atlas URI).
2. Create `server/.env`:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/schemechecker   # or your Atlas URI
   MONGO_DB=schemechecker                              # optional (defaults used)
   JWT_SECRET=your_strong_secret
   PORT=5000
   ```
3. Install dependencies:
   ```bash
   npm run install-deps
   ```
4. Run in development (concurrently starts backend and frontend):
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173 (default Vite)
   - Backend API: http://localhost:5000

## Build & Run (Production)
1. Build frontend:
   ```bash
   npm run build
   ```
2. Start server (serves `frontend/dist` when `NODE_ENV=production`):
   ```bash
   set NODE_ENV=production && npm start
   ```

## API Overview
Base URL: `http://localhost:5000`

- **Auth**
  - `POST /api/auth/signup` — name, email, password, state, district → JWT + user
  - `POST /api/auth/login` — email, password → JWT + user
- **User** (requires `Authorization: Bearer <token>`)
  - `GET /api/user/me` — current user
  - `POST /api/user/schemes/save` — { schemeId, name, link? } → savedSchemes
  - `DELETE /api/user/schemes/save/:schemeId` — remove saved
  - `POST /api/user/schemes/apply` — { schemeId, name, link?, status? } → appliedSchemes
- **Schemes & Data**
  - `GET /api/schemes` — all schemes (from JSON)
  - `POST /api/check-eligibility` — { age, income, occupation, caste, gender, state, district } → eligibleSchemes
  - `GET /api/locations` — states + districts
  - `GET /api/translations` — i18n strings

## Scripts (Root)
- `npm run install-deps` — install server and frontend deps
- `npm run dev` — run server (nodemon) and frontend (vite) concurrently
- `npm run build` — build frontend
- `npm start` — start backend only

## Security
- Do not commit real secrets. Use `.env` (already in `server/.env`).
- Rotate `JWT_SECRET` and MongoDB credentials for production.

## License
ISC

---
Tip: Render/Heroku style deployments can use the existing scripts; ensure `frontend` is built and `NODE_ENV=production` so Express serves `frontend/dist`.