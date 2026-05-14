# Render Deployment

This project is configured for:

- Render PostgreSQL
- Render Web Service for the Spring Boot backend
- Render Static Site for the React + Vite frontend

## Backend Environment Variables

Set these on the backend Web Service:

```env
PORT=8080
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE
DB_USERNAME=USER
DB_PASSWORD=PASSWORD
JWT_SECRET=change-this-to-a-long-random-production-secret
JWT_EXPIRATION_MS=3600000
ADMIN_USERNAME=admin@example.com
ADMIN_PASSWORD=change-this-admin-password
DOCTOR_USERNAME=doctor@example.com
DOCTOR_PASSWORD=change-this-doctor-password
FRONTEND_URL=https://your-frontend.onrender.com
```

`DATABASE_URL` can use Render's internal PostgreSQL connection string. The backend converts the Render PostgreSQL URL to the JDBC URL Spring Boot needs at startup.

## Frontend Environment Variables

Set this on the frontend Static Site:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

The frontend API client reads only `VITE_API_URL` for backend requests.

## Render Services

Backend Web Service:

```text
Root Directory: backend
Runtime: Docker
Health Check Path: /api
```

Frontend Static Site:

```text
Root Directory: frontend
Build Command: npm ci && npm run build
Publish Directory: dist
Rewrite Rule: /* -> /index.html
```

PostgreSQL:

```text
Use the internal connection string for DATABASE_URL when the database and backend are in the same Render region.
```

## Blueprint

The root `render.yaml` defines:

- `patient-health-db`
- `patient-health-backend`
- `patient-health-frontend`

After creating the services, confirm the generated service URLs. If Render assigns a different subdomain, update only these environment variables:

- Backend `FRONTEND_URL`
- Frontend `VITE_API_URL`
