# Docker Quick Start Guide

## Prerequisites

- Install Docker Desktop: https://www.docker.com/products/docker-desktop

## Development Setup (Simple)

### 1. Build and Run

```bash
docker build -t workersmgmt .
docker run -p 8000:8000 workersmgmt
```

Access at: http://localhost:8000

## Production Setup (with PostgreSQL + Nginx)

### 1. Create .env file

```bash
cp .env.example .env
```

Edit `.env` and update:

```
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://postgres:postgres@db:5432/workersmgmt
```

### 2. Build and Start All Services

```bash
docker-compose up --build
```

Access at: http://localhost

### 3. Run Migrations (First Time)

```bash
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser
```

## Useful Commands

### Stop Services

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f
```

### Access Django Shell

```bash
docker-compose exec web python manage.py shell
```

### Rebuild After Changes

```bash
docker-compose up --build
```

### Clean Up Everything

```bash
docker-compose down -v
```

## For Windows Users

Make sure Docker Desktop is running before executing commands.
Use PowerShell or Command Prompt.
