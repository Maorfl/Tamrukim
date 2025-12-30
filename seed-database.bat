@echo off
echo ========================================
echo Seeding Database with Sample Data
echo ========================================
echo.

echo Make sure MongoDB is running!
echo.
echo This will:
echo 1. Clear existing licenses
echo 2. Insert 8 sample licenses
echo 3. Create dummy PDF files
echo.

cd backend
call npm run seed

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Seeding failed!
    echo Make sure MongoDB is running on mongodb://localhost:27017
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database seeded successfully!
echo ========================================
echo.
pause
