# Vercel Deployment Guide for Django

## Quick Setup:

### 1. In Vercel Dashboard:

- **Framework Preset:** Other
- **Build Command:** `bash build.sh`
- **Output Directory:** `.`
- **Install Command:** `pip install -r requirements.txt`

### 2. Environment Variables (Add in Vercel):

Go to Settings → Environment Variables and add:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=.vercel.app
DATABASE_URL=postgresql://neondb_owner:npg_3XBz5RGFxmPh@ep-dry-resonance-adhyqx5v-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
CSRF_TRUSTED_ORIGINS=https://your-app.vercel.app
```

### 3. Deploy:

```bash
git add .
git commit -m "Configure for Vercel"
git push
```

## Important Notes:

- Vercel uses serverless functions (not ideal for Django but works)
- Static files are served from `/staticfiles`
- Database must be external (Neon PostgreSQL ✓)
- Media files should use cloud storage (S3, Cloudinary)

## Alternative: Better Hosting for Django

- **Railway.app** - Better Django support
- **Render.com** - Free tier, better for Django
- **PythonAnywhere** - Django-specific hosting
