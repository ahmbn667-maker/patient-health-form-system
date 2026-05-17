# Ahmed Al-Saadi

Patient health form system with a React + Vite frontend, a Spring Boot backend, and PostgreSQL persistence.

## Live Demo

https://clinic-health-form-system.onrender.com
## Deployment

This repository is configured for Render only:

- Frontend: Render Static Site
- Backend: Render Web Service
- Database: Render PostgreSQL

The root `render.yaml` defines the Render services used by the application. No other deployment platform is required for this project.

## Demo Accounts

```text
Admin: admin@example.com / 12345678
Doctor: doctor@example.com / 12345678
```

## Project Structure

```text
ahmed-al-saadi/
|-- backend/      Spring Boot API
|-- frontend/     React + Vite app
|-- render.yaml   Render Blueprint configuration
`-- RENDER_DEPLOYMENT.md
```

## Local Development

### Backend

```bash
cd backend
mvn spring-boot:run
```

The backend runs on `http://localhost:8080` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Set the frontend API URL with:

```env
VITE_API_URL=http://localhost:8080/api
```

## Production Environment

Backend environment variables are documented in `RENDER_DEPLOYMENT.md`.

Frontend production builds use:

```env
VITE_API_URL=https://clinic-health-backend.onrender.com/api
```
