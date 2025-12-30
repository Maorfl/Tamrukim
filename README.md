# Cosmetic License Management System

A full-stack MERN application for managing cosmetic licenses with search functionality and PDF downloads.

## 🚀 Features

- **Search Licenses**: Search by 8-digit license number or product name
- **RTL Hebrew Interface**: Fully localized Hebrew interface with right-to-left support
- **PDF Downloads**: Download license PDFs directly from the search results
- **Smart Formatting**: Automatic formatting of license IDs based on business rules
- **Responsive Design**: Beautiful, modern UI with Tailwind CSS and glassmorphism effects
- **TypeScript**: Full type safety across frontend and backend

## 📋 Tech Stack

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- CORS enabled
- Static file serving for PDFs

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Axios for API calls
- RTL support with Hebrew fonts (Rubik)

## 🛠️ Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cosmetic-licenses
```

5. Build the TypeScript code:
```bash
npm run build
```

6. Seed the database with sample data:
```bash
npm run seed
```

7. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
Tamrukim/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── License.ts          # Mongoose schema
│   │   ├── routes/
│   │   │   └── licenseRoutes.ts    # API routes
│   │   ├── server.ts               # Express server
│   │   └── seed.ts                 # Database seeding script
│   ├── uploads/                    # PDF storage directory
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.tsx       # Search input component
│   │   │   ├── LicenseCard.tsx     # License display card
│   │   │   └── SearchResults.tsx   # Results container
│   │   ├── services/
│   │   │   └── api.ts              # API service layer
│   │   ├── types/
│   │   │   └── License.ts          # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── formatters.ts       # Formatting utilities
│   │   ├── App.tsx                 # Main application
│   │   ├── index.tsx               # Entry point
│   │   └── index.css               # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   └── .env
└── README.md
```

## 🔍 API Endpoints

### Search Licenses
```
GET /api/licenses/search?query={searchTerm}
```
Search by license number or product name.

### Get All Licenses
```
GET /api/licenses
```
Retrieve all licenses.

### Get Single License
```
GET /api/licenses/:id
```
Get a specific license by MongoDB ID.

### Create License
```
POST /api/licenses
```
Create a new license entry.

### Download PDF
```
GET /uploads/{licenseNumber}.pdf
```
Download the PDF file for a specific license.

## 📝 License Formatting Rules

The system implements smart formatting for license display:

1. **Long Notification Numbers** (>10 digits): Display only the last 4 digits
   - Example: `0622025102818` → `2818`

2. **Slashed Numbers**: Remove slashes
   - Example: `2/182319/24` → `218231924`

3. **Standard Numbers**: Display as-is

## 🎨 Design Features

- **Glassmorphism**: Modern frosted glass effect on cards
- **Gradient Backgrounds**: Beautiful purple-blue gradient
- **Smooth Animations**: Fade-in effects and hover transitions
- **Custom Scrollbar**: Styled scrollbar matching the theme
- **Loading States**: Shimmer effect for loading cards
- **Error Handling**: User-friendly error messages in Hebrew

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cosmetic-licenses
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Sample Data

The seed script includes 8 sample licenses with Hebrew product names:
- קרם לחות מועשר בויטמין E
- שמפו טיפולי לשיער יבש
- סרום פנים אנטי אייג'ינג
- And more...

Each license has a corresponding dummy PDF file in the `uploads` folder.

## 🚀 Production Deployment

### Backend
```bash
npm run build
npm start
```

### Frontend
```bash
npm run build
```
Deploy the `build` folder to your hosting service.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Created for cosmetic license management.
