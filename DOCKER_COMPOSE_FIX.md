# Docker Compose Deployment Fixed

## Changes Made:

- ✅ Removed local PostgreSQL container (using Neon database)
- ✅ Removed port 5432 conflict
- ✅ Using environment variables instead of .env file
- ✅ Simplified volumes (removed code mount for production)

## Environment Variables Needed in Dokploy:

Add these in your Dokploy dashboard:

```
SECRET_KEY=django-insecure-f9bhc0^k)jw&+=7+-iw^(xsn46fwi^fj-0m!1mjr43ef@&al%#
DEBUG=False
ALLOWED_HOSTS=.vercel.app,yourdomain.com
DATABASE_URL=postgresql://neondb_owner:npg_3XBz5RGFxmPh@ep-dry-resonance-adhyqx5v-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
CSRF_TRUSTED_ORIGINS=https://yourdomain.com
```

## Deploy:

```bash
git add .
git commit -m "Fix docker-compose for Dokploy"
git push origin deploy
```

Then redeploy in Dokploy.

## Access Your App:

- Web: Port 8000
- Nginx: Port 80
