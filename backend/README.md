# Backend (Express boilerplate)

Foundational REST API that will serve the repository's datasets
(`QURAN data/quran.db` SQLite, `Hadith data` JSON) over HTTP.

## Run

```bash
cd backend
npm install
cp .env.example .env      # adjust MONGO_URI if needed
npm run dev               # http://localhost:3000
```

Without MongoDB running, the API starts degraded (`/api/health` still works).

## Layout

```
backend/
├── config/db.js        # Mongoose connection
├── controllers/        # request handlers (to come with the first resources)
├── models/             # Mongoose models
├── routes/index.js     # /api router (health for now)
└── server.js           # express app: cors, json, error handler
```
