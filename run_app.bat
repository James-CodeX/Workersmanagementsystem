@echo off
echo ========================================
echo Workers Management System - Startup
echo ========================================
echo.

REM Activate virtual environment if it exists
if exist venv\Scripts\activate.bat (
    echo Activating virtual environment...
    call venv\Scripts\activate.bat
) else if exist venv\bin\activate (
    echo Activating virtual environment...
    call venv\bin\Activate.ps1
)

echo.
echo Installing/Updating dependencies...
pip install -r requirements.txt

echo.
echo Running database migrations...
python manage.py migrate

echo.
echo Collecting static files...
python manage.py collectstatic --noinput

echo.
echo ========================================
echo Starting Django Development Server...
echo ========================================
echo Access the app at: http://127.0.0.1:8000
echo Press CTRL+C to stop the server
echo.

python manage.py runserver
