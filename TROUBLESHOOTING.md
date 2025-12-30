# Troubleshooting Guide - Cosmetic License System

## Common Issues and Solutions

### 🔴 MongoDB Connection Issues

#### Error: "MongooseServerSelectionError: connect ECONNREFUSED"

**Problem:** MongoDB is not running or not accessible.

**Solutions:**

1. **Check if MongoDB is running:**
   ```bash
   # Windows - Check if MongoDB service is running
   sc query MongoDB
   
   # Or check Task Manager for "mongod.exe"
   ```

2. **Start MongoDB:**
   ```bash
   # If installed as Windows Service
   net start MongoDB
   
   # Or run manually
   mongod
   ```

3. **Verify connection string in `backend/.env`:**
   ```
   MONGODB_URI=mongodb://localhost:27017/cosmetic-licenses
   ```

4. **Test MongoDB connection:**
   ```bash
   # Using MongoDB Shell
   mongosh
   # Or older versions
   mongo
   ```

---

### 🔴 Port Already in Use

#### Error: "EADDRINUSE: address already in use :::5000"

**Problem:** Port 5000 is already occupied by another process.

**Solutions:**

1. **Find and kill the process:**
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

2. **Change the port in `backend/.env`:**
   ```
   PORT=5001
   ```

3. **Update frontend API URL in `frontend/.env`:**
   ```
   REACT_APP_API_URL=http://localhost:5001/api
   ```

---

### 🔴 PowerShell Execution Policy Error

#### Error: "cannot be loaded because running scripts is disabled"

**Problem:** PowerShell script execution is restricted.

**Solutions:**

1. **Use the batch files instead:**
   - Double-click `start.bat`
   - Double-click `seed-database.bat`

2. **Or use cmd prefix:**
   ```bash
   cmd /c npm install
   cmd /c npm run dev
   ```

3. **Or change PowerShell policy (Admin required):**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

---

### 🔴 CORS Errors in Browser

#### Error: "Access to XMLHttpRequest has been blocked by CORS policy"

**Problem:** Frontend and backend are not properly configured for CORS.

**Solutions:**

1. **Verify backend CORS is enabled in `backend/src/server.ts`:**
   ```typescript
   app.use(cors());
   ```

2. **Check frontend API URL in `frontend/.env`:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Restart both servers after changes**

4. **Clear browser cache and hard reload:**
   - Chrome/Edge: `Ctrl + Shift + R`
   - Firefox: `Ctrl + F5`

---

### 🔴 PDF Download Not Working

#### Error: "404 Not Found" when downloading PDF

**Problem:** PDF file doesn't exist or path is incorrect.

**Solutions:**

1. **Run the seed script to create dummy PDFs:**
   ```bash
   cd backend
   npm run seed
   ```

2. **Verify uploads directory exists:**
   ```
   backend/uploads/
   ```

3. **Check file naming convention:**
   - Files must be named: `{licenseNumber}.pdf`
   - Example: `64300861.pdf`

4. **Verify static file serving in `backend/src/server.ts`:**
   ```typescript
   app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
   ```

5. **Test direct URL in browser:**
   ```
   http://localhost:5000/uploads/64300861.pdf
   ```

---

### 🔴 Search Returns No Results

#### Problem: Search query returns empty array

**Solutions:**

1. **Verify database has data:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Use database
   use cosmetic-licenses
   
   # Count documents
   db.licenses.countDocuments()
   
   # View all licenses
   db.licenses.find().pretty()
   ```

2. **Run seed script if database is empty:**
   ```bash
   cd backend
   npm run seed
   ```

3. **Check search query format:**
   - License number: Exact 8 digits (e.g., `64300861`)
   - Product name: Partial match works (e.g., `קרם`)

4. **Verify API endpoint is working:**
   ```
   http://localhost:5000/api/licenses/search?query=64300861
   ```

---

### 🔴 TypeScript Compilation Errors

#### Error: "Cannot find module" or type errors

**Solutions:**

1. **Reinstall dependencies:**
   ```bash
   # Backend
   cd backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Rebuild TypeScript:**
   ```bash
   # Backend
   cd backend
   npm run build
   ```

3. **Check TypeScript version:**
   ```bash
   npx tsc --version
   ```

---

### 🔴 Frontend Not Loading / Blank Page

#### Problem: React app shows blank page

**Solutions:**

1. **Check browser console for errors:**
   - Press `F12` to open DevTools
   - Look at Console tab

2. **Verify React is running:**
   ```
   http://localhost:3000
   ```

3. **Check if API is accessible:**
   ```
   http://localhost:5000/api/health
   ```

4. **Clear browser cache:**
   - Chrome/Edge: `Ctrl + Shift + Delete`
   - Select "Cached images and files"

5. **Restart frontend server:**
   ```bash
   cd frontend
   # Press Ctrl+C to stop
   npm start
   ```

---

### 🔴 Hebrew Text Not Displaying Correctly

#### Problem: Hebrew characters appear as boxes or gibberish

**Solutions:**

1. **Verify font loading in browser:**
   - Open DevTools → Network tab
   - Look for Google Fonts requests
   - Should load: Rubik font

2. **Check `frontend/src/index.css`:**
   ```css
   @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700&display=swap');
   ```

3. **Verify HTML has RTL attribute:**
   ```html
   <html lang="he" dir="rtl">
   ```

4. **Check browser encoding:**
   - Should be UTF-8

---

### 🔴 Seed Script Fails

#### Error: "Validation failed" or "Duplicate key error"

**Solutions:**

1. **Clear existing data first:**
   ```bash
   # Connect to MongoDB
   mongosh
   
   # Use database
   use cosmetic-licenses
   
   # Drop collection
   db.licenses.drop()
   
   # Exit
   exit
   ```

2. **Run seed script again:**
   ```bash
   cd backend
   npm run seed
   ```

3. **Check for duplicate license numbers:**
   - Each license number must be unique
   - Must be exactly 8 digits

---

### 🔴 Environment Variables Not Loading

#### Problem: App uses default values instead of .env values

**Solutions:**

1. **Verify .env file exists:**
   ```
   backend/.env
   frontend/.env
   ```

2. **Check file naming:**
   - Must be exactly `.env` (not `.env.txt`)
   - No spaces in filename

3. **Restart servers after changing .env:**
   - Stop with `Ctrl+C`
   - Start again

4. **Frontend env vars must start with `REACT_APP_`:**
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

### 🔴 npm install Fails

#### Error: Various npm installation errors

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Delete lock files and node_modules:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Update npm:**
   ```bash
   npm install -g npm@latest
   ```

4. **Check Node.js version:**
   ```bash
   node --version
   # Should be v16 or higher
   ```

5. **Use legacy peer deps if needed:**
   ```bash
   npm install --legacy-peer-deps
   ```

---

### 🔴 Tailwind Styles Not Applying

#### Problem: UI looks unstyled or basic

**Solutions:**

1. **Verify Tailwind is configured:**
   - Check `frontend/tailwind.config.js` exists
   - Check `frontend/postcss.config.js` exists

2. **Verify CSS imports in `frontend/src/index.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Rebuild frontend:**
   ```bash
   cd frontend
   # Stop server (Ctrl+C)
   rm -rf build
   npm start
   ```

4. **Check content paths in `tailwind.config.js`:**
   ```javascript
   content: ["./src/**/*.{js,jsx,ts,tsx}"]
   ```

---

## 🛠️ Debugging Tools

### Backend Debugging

1. **Check server logs:**
   - Look at terminal where backend is running
   - Errors will be printed in red

2. **Test API with curl:**
   ```bash
   curl http://localhost:5000/api/health
   curl "http://localhost:5000/api/licenses/search?query=64300861"
   ```

3. **Test API with Postman:**
   - Download Postman
   - Create GET request to endpoints

4. **Check MongoDB data:**
   ```bash
   mongosh
   use cosmetic-licenses
   db.licenses.find().pretty()
   ```

### Frontend Debugging

1. **React DevTools:**
   - Install React DevTools browser extension
   - Inspect component state and props

2. **Network Tab:**
   - Open DevTools (F12)
   - Go to Network tab
   - Watch API requests

3. **Console Logs:**
   - Check browser console for errors
   - Look for failed API calls

---

## 📞 Getting Help

If you're still experiencing issues:

1. **Check the logs:**
   - Backend terminal output
   - Browser console (F12)
   - MongoDB logs

2. **Verify versions:**
   ```bash
   node --version
   npm --version
   mongod --version
   ```

3. **Review documentation:**
   - README.md
   - QUICKSTART.md
   - ARCHITECTURE.md

4. **Common checklist:**
   - [ ] MongoDB is running
   - [ ] Backend server is running (port 5000)
   - [ ] Frontend server is running (port 3000)
   - [ ] Database has been seeded
   - [ ] .env files are configured correctly
   - [ ] No port conflicts
   - [ ] CORS is enabled

---

## 🔄 Fresh Start (Nuclear Option)

If nothing works, start completely fresh:

```bash
# 1. Stop all servers (Ctrl+C in all terminals)

# 2. Delete all node_modules and lock files
cd backend
rm -rf node_modules package-lock.json dist
cd ../frontend
rm -rf node_modules package-lock.json build

# 3. Reinstall everything
cd ../backend
npm install
cd ../frontend
npm install

# 4. Clear MongoDB database
mongosh
use cosmetic-licenses
db.dropDatabase()
exit

# 5. Seed database
cd ../backend
npm run seed

# 6. Start servers
# Terminal 1:
cd backend
npm run dev

# Terminal 2:
cd frontend
npm start
```

---

**Most issues can be resolved by ensuring MongoDB is running and both servers are started correctly!**
