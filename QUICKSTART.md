# Quick Start Guide - Cosmetic License System

## Prerequisites
Before you begin, make sure you have:
- ✅ Node.js installed (v16 or higher)
- ✅ MongoDB installed and running
- ✅ npm or yarn package manager

## Installation (Already Done! ✅)

The dependencies have been installed for both frontend and backend.

## Getting Started

### Step 1: Start MongoDB
Make sure MongoDB is running on your system:
```bash
# If MongoDB is installed as a service, it should already be running
# Otherwise, start it manually:
mongod
```

### Step 2: Seed the Database
Double-click `seed-database.bat` or run:
```bash
cd backend
npm run seed
```

This will:
- Create 8 sample cosmetic licenses with Hebrew names
- Generate dummy PDF files in the `backend/uploads` folder

### Step 3: Start the Application
Double-click `start.bat` or manually start both servers:

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```
Server will run on: http://localhost:5000

**Frontend (Terminal 2):**
```bash
cd frontend
npm start
```
App will open on: http://localhost:3000

## Using the Application

### Search for Licenses
1. Enter an 8-digit license number (e.g., `64300861`) OR
2. Enter a product name in Hebrew (e.g., `קרם`)
3. Click "חיפוש" (Search)

### Download PDFs
Click the "הורד PDF" (Download PDF) button on any license card to download the PDF file.

## Sample License Numbers
Try searching for these:
- `64300861` - קרם לחות מועשר בויטמין E
- `12345678` - שמפו טיפולי לשיער יבש
- `87654321` - סרום פנים אנטי אייג'ינג
- `11223344` - מסכת פנים מרגיעה

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check the connection string in `backend/.env`
- Default: `mongodb://localhost:27017/cosmetic-licenses`

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (3000): React will automatically suggest port 3001

### PowerShell Script Execution Error
Use the batch files provided or run commands with `cmd /c` prefix:
```bash
cmd /c npm run dev
```

## API Endpoints

### Search
```
GET http://localhost:5000/api/licenses/search?query=64300861
```

### Get All Licenses
```
GET http://localhost:5000/api/licenses
```

### Download PDF
```
GET http://localhost:5000/uploads/64300861.pdf
```

## Project Structure
```
Tamrukim/
├── backend/          # Express + TypeScript API
├── frontend/         # React + TypeScript UI
├── setup.bat         # Install dependencies
├── start.bat         # Start both servers
└── seed-database.bat # Populate database
```

## Features Implemented

✅ **Search Functionality**
- Search by 8-digit license number
- Search by product name (Hebrew)
- Real-time results

✅ **License Formatting**
- Long numbers (>10 digits) → Last 4 digits
- Slashed numbers → Remove slashes
- Smart display formatting

✅ **PDF Download**
- Direct download from search results
- Files named by license number
- Static file serving

✅ **RTL Hebrew Interface**
- Full Hebrew localization
- Right-to-left layout
- Hebrew fonts (Rubik)

✅ **Modern UI**
- Glassmorphism design
- Gradient backgrounds
- Smooth animations
- Responsive layout

## Next Steps

### Add More Licenses
Use the API to add new licenses:
```bash
POST http://localhost:5000/api/licenses
Content-Type: application/json

{
  "licenseNumber": "99999999",
  "notificationNumber": "1/234567/25",
  "productName": "מוצר חדש",
  "country": "ישראל",
  "manufacturer": "חברה בע\"מ"
}
```

### Upload Real PDFs
Place PDF files in `backend/uploads/` with the naming convention:
```
[licenseNumber].pdf
```
Example: `64300861.pdf`

## Support
For issues or questions, refer to the main README.md file.

---
**Enjoy using the Cosmetic License Management System! 🎉**
