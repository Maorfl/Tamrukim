@echo off
echo ========================================
echo Starting Cosmetic License System
echo ========================================
echo.

echo Starting MongoDB (if not already running)...
echo Make sure MongoDB is running on mongodb://localhost:27017
echo.

echo Starting Backend Server...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo Both servers are starting...
echo ========================================
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window (servers will keep running)
pause > nul
