@echo off
echo ========================================
echo Building Docker Image...
echo ========================================
docker build -t workersmgmt .

echo.
echo ========================================
echo Starting Docker Container...
echo ========================================
echo Access the app at: http://localhost:8000
echo Press CTRL+C to stop
echo.

docker run -p 8000:8000 workersmgmt
