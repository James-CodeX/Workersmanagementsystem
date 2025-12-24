#!/bin/bash

echo "========================================"
echo "Workers Management System - Startup"
echo "========================================"
echo ""

# Activate virtual environment if it exists
if [ -f "venv/bin/activate" ]; then
    echo "Activating virtual environment..."
    source venv/bin/activate
fi

echo ""
echo "Installing/Updating dependencies..."
pip install -r requirements.txt

echo ""
echo "Running database migrations..."
python manage.py migrate

echo ""
echo "Collecting static files..."
python manage.py collectstatic --noinput

echo ""
echo "========================================"
echo "Starting Django Development Server..."
echo "========================================"
echo "Access the app at: http://127.0.0.1:8000"
echo "Press CTRL+C to stop the server"
echo ""

python manage.py runserver
