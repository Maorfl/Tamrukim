# System Architecture - Cosmetic License Management

## 🏗️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
│                     http://localhost:3000                    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ HTTP Requests
                            │ (Axios)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    REACT FRONTEND (TSX)                      │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────┐     │
│  │ SearchBar  │  │ LicenseCard │  │ SearchResults    │     │
│  └────────────┘  └─────────────┘  └──────────────────┘     │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ API Service (api.ts)                                 │   │
│  │ - search(query)                                      │   │
│  │ - getAll()                                           │   │
│  │ - downloadPDF(licenseNumber)                         │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Formatters (formatters.ts)                           │   │
│  │ - formatLicenseId()                                  │   │
│  │ - createDescription()                                │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ REST API Calls
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              EXPRESS BACKEND (TypeScript)                    │
│                  http://localhost:5000                       │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Routes (licenseRoutes.ts)                            │   │
│  │ GET  /api/licenses/search?query={term}              │   │
│  │ GET  /api/licenses                                   │   │
│  │ GET  /api/licenses/:id                               │   │
│  │ POST /api/licenses                                   │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Models (License.ts)                                  │   │
│  │ - licenseNumber: String (8 digits)                   │   │
│  │ - notificationNumber: String                         │   │
│  │ - productName: String                                │   │
│  │ - country: String                                    │   │
│  │ - manufacturer: String                               │   │
│  └──────────────────────────────────────────────────────┘   │
│                            │                                  │
│                            ▼                                  │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Static Files (express.static)                        │   │
│  │ /uploads/{licenseNumber}.pdf                         │   │
│  └──────────────────────────────────────────────────────┘   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            │ Mongoose ODM
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      MONGODB DATABASE                        │
│              mongodb://localhost:27017                       │
│                                                               │
│  Database: cosmetic-licenses                                 │
│  Collection: licenses                                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Document Example:                                    │   │
│  │ {                                                    │   │
│  │   _id: ObjectId("..."),                              │   │
│  │   licenseNumber: "64300861",                         │   │
│  │   notificationNumber: "0622025102818",               │   │
│  │   productName: "קרם לחות מועשר בויטמין E",          │   │
│  │   country: "ישראל",                                  │   │
│  │   manufacturer: "קוסמטיקה בע\"מ",                   │   │
│  │   createdAt: ISODate("..."),                         │   │
│  │   updatedAt: ISODate("...")                          │   │
│  │ }                                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Search Flow
```
1. User enters search query in SearchBar
   ↓
2. SearchBar calls onSearch() callback
   ↓
3. App.tsx calls licenseAPI.search(query)
   ↓
4. Axios sends GET request to /api/licenses/search?query={term}
   ↓
5. Express routes to licenseRoutes.ts
   ↓
6. Route handler queries MongoDB via Mongoose
   ↓
7. MongoDB returns matching documents
   ↓
8. Backend sends JSON response
   ↓
9. Frontend receives data and updates state
   ↓
10. SearchResults renders LicenseCard components
```

### Download Flow
```
1. User clicks "הורד PDF" button on LicenseCard
   ↓
2. LicenseCard calls licenseAPI.downloadPDF(licenseNumber)
   ↓
3. Function generates URL: /uploads/{licenseNumber}.pdf
   ↓
4. window.open() opens URL in new tab
   ↓
5. Express serves static file from uploads folder
   ↓
6. Browser downloads {licenseNumber}.pdf
```

## 📊 Component Hierarchy

```
App.tsx (Main Container)
│
├── Header (Title & Description)
│
├── SearchBar
│   ├── Input Field (RTL)
│   ├── Clear Button
│   └── Search Button
│
├── Error Message (Conditional)
│
├── SearchResults
│   ├── Loading State (Shimmer Skeletons)
│   ├── Empty State (No Search)
│   ├── No Results State
│   └── Results Grid
│       └── LicenseCard (Multiple)
│           ├── Description Header
│           ├── License Details
│           │   ├── License Number
│           │   ├── Notification Number
│           │   ├── Product Name
│           │   ├── Country
│           │   └── Manufacturer
│           └── Download Button
│
└── Footer
```

## 🗂️ File Relationships

### Backend Dependencies
```
server.ts
├── imports: express, mongoose, cors, dotenv
├── imports: licenseRoutes.ts
└── serves: uploads/ (static)

licenseRoutes.ts
├── imports: express
├── imports: License.ts (model)
└── exports: router

License.ts
├── imports: mongoose
└── exports: License model

seed.ts
├── imports: mongoose, dotenv
├── imports: License.ts (model)
└── creates: uploads/*.pdf files
```

### Frontend Dependencies
```
index.tsx
└── renders: App.tsx

App.tsx
├── imports: SearchBar, SearchResults
├── imports: api.ts
├── imports: License types
└── manages: state (licenses, loading, error)

SearchBar.tsx
├── receives: onSearch callback
└── emits: search query

SearchResults.tsx
├── receives: licenses[], isLoading, hasSearched
└── renders: LicenseCard[]

LicenseCard.tsx
├── receives: license object
├── imports: formatters.ts
├── imports: api.ts
└── renders: license details + download button

api.ts
├── imports: axios
├── imports: License types
└── exports: licenseAPI service

formatters.ts
└── exports: formatting functions
```

## 🔐 Environment Configuration

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cosmetic-licenses
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Key Design Patterns

### Backend
- **MVC Pattern**: Models, Routes (Controllers), Views (JSON)
- **Middleware**: CORS, express.json(), express.static()
- **ODM**: Mongoose for MongoDB abstraction
- **Error Handling**: Try-catch blocks with proper status codes

### Frontend
- **Component-Based**: Reusable React components
- **Service Layer**: Centralized API calls in api.ts
- **Utility Functions**: Formatting logic separated in formatters.ts
- **Type Safety**: TypeScript interfaces for data models
- **State Management**: React hooks (useState)
- **Conditional Rendering**: Loading, empty, error states

## 🚀 Deployment Considerations

### Backend
- Build TypeScript: `npm run build` → `dist/`
- Environment variables: Use production MongoDB URI
- Static files: Ensure uploads/ directory exists
- CORS: Update allowed origins for production

### Frontend
- Build React: `npm run build` → `build/`
- Environment variables: Update REACT_APP_API_URL
- Serve: Use nginx, Apache, or hosting service
- RTL: Ensure proper font loading

## 📈 Scalability Options

### Backend
- Add authentication (JWT, OAuth)
- Implement pagination for large datasets
- Add file upload endpoint for PDFs
- Use cloud storage (AWS S3) for PDFs
- Add caching (Redis)
- Implement rate limiting

### Frontend
- Add infinite scroll
- Implement advanced filters
- Add PDF preview modal
- Multi-language support
- Progressive Web App (PWA)
- Offline support

## 🧪 Testing Strategy

### Backend
- Unit tests: Models, routes
- Integration tests: API endpoints
- Database tests: Mongoose operations
- Tools: Jest, Supertest

### Frontend
- Component tests: React Testing Library
- Integration tests: User flows
- E2E tests: Cypress, Playwright
- Tools: Jest, React Testing Library

---

This architecture provides a solid foundation for a scalable, maintainable cosmetic license management system.
