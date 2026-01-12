#!/bin/bash

# M.O.S. Engine Startup Script
# Usage: ./start.sh

echo "🚀 Starting M.O.S. Engine Infrastructure..."

# 1. Stop any running containers to ensure fresh start
echo "🛑 Stopping old containers..."
docker compose down

# 2. Build and Start Backend & DB
echo "🏗️  Building and Starting Backend..."
docker compose up -d --build

# 3. Wait for DB to be healthy (Simple sleep for MVP)
echo "⏳ Waiting 10s for Database to initialize..."
sleep 10

# 4. Run Database Migrations (Creates 'users' table etc)
echo "🔄 Applying Database Migrations..."
docker compose exec backend alembic upgrade head

echo "=================================================="
echo "✅ System Online!"
echo "--------------------------------------------------"
echo "👉 Backend API:   http://localhost:8000/docs"
echo "👉 Frontend App:  http://localhost:3000"
echo "=================================================="
echo "You can now go to http://localhost:3000/login and Sign Up."
