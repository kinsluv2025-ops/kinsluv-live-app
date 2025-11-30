# Deployment Notes

## Vercel (Frontend)
1. Connect repo to Vercel.
2. Set env var `REACT_APP_BACKEND_URL` to your backend URL.
3. Use `npm run build` as build command (Vercel auto-detects).

## Render (Backend)
1. Create a Web Service on Render.
2. Use the `backend` directory as the root.
3. Set environment variables (MONGO_URI, ZEGO_APP_ID, ZEGO_SERVER_SECRET, FRONTEND_URL).
4. Deploy.

## Docker (Local)
- Copy `.env.example` to `.env` and fill required vars, then:
  docker-compose up --build

