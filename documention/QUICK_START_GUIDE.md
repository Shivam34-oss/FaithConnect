# FaithConnect - Quick Start Guide (Hindi/English)

## 🚀 जल्दी शुरू करें (Quick Start)

### Step 1: Dependencies Install करें

```bash
# Root folder में
npm install

# Client folder में
cd client
npm install

# Server folder में
cd ../server
npm install
```

या एक command में:
```bash
npm run install:all
```

---

### Step 2: Environment Variables Setup

#### Server के लिए (`server/.env` file बनाएं):

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/faithconnect
JWT_SECRET=your_super_secret_jwt_key_change_this
JWT_EXPIRE=30d
```

#### Client के लिए (`client/.env` file बनाएं):

```env
VITE_API_URL=http://localhost:5000/api
```

---

### Step 3: MongoDB Start करें

**Option 1: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
sudo mongod
```

**Option 2: MongoDB Atlas (Cloud - Free)**
- https://www.mongodb.com/cloud/atlas पर account बनाएं
- Free cluster create करें
- Connection string copy करें
- `MONGODB_URI` में paste करें

---

### Step 4: Application Run करें

**Option 1: दोनों एक साथ (Recommended)**
```bash
# Root folder में
npm run dev
```

**Option 2: अलग-अलग**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

### Step 5: Browser में खोलें

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

---

## ✅ Check करें कि सब ठीक है

1. **Backend running?**
   - http://localhost:5000/health खोलें
   - `{"status":"OK"}` दिखना चाहिए

2. **Frontend running?**
   - http://localhost:3000 खोलें
   - Login page दिखना चाहिए

3. **MongoDB connected?**
   - Server terminal में "Connected to MongoDB" दिखना चाहिए

---

## 🐛 Common Problems & Solutions

### Problem 1: Port already in use
**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill
```

### Problem 2: MongoDB connection error
**Solution:**
- MongoDB service start करें
- या MongoDB Atlas का connection string check करें

### Problem 3: Module not found
**Solution:**
```bash
# Dependencies फिर से install करें
npm install
```

### Problem 4: CORS error
**Solution:**
- Backend `.env` में `CORS_ORIGIN=http://localhost:3000` add करें
- Server restart करें

---

## 📱 First User बनाएं

1. http://localhost:3000/register खोलें
2. Form भरें:
   - Name: Your Name
   - Username: yourusername
   - Email: your@email.com
   - Password: password123
   - Faith: Christianity (या कोई भी)
3. Register button click करें
4. Automatically login हो जाएगा

---

## 🎯 Next Steps

1. ✅ Application run हो रहा है
2. ✅ User register/login कर सकता है
3. ✅ Post create कर सकता है
4. ✅ Feed में posts दिख रहे हैं
5. ✅ Like/Comment कर सकता है

**अब आप development शुरू कर सकते हैं!**

---

## 📚 और जानकारी

- **Complete Documentation:** [PROJECT_DOCUMENTATION.md](./PROJECT_DOCUMENTATION.md)
- **Tech Stack:** [TECH_STACK_DETAILS.md](./TECH_STACK_DETAILS.md)
- **Video Script:** [VIDEO_SCRIPT.md](./VIDEO_SCRIPT.md)
- **Interview Prep:** [INTERVIEW_PREPARATION.md](./INTERVIEW_PREPARATION.md)

---

## 🆘 Help चाहिए?

- GitHub Issues में पूछें
- Documentation files check करें
- Code comments पढ़ें

**Happy Coding! 🎉**
