# FaithConnect

A religious social app built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- User authentication and authorization
- Social feed with posts, likes, and comments
- Faith communities (Create, Join, Delete)
- User profiles and following system
- Real-time updates

## 🛡️ Security Features

- **JWT Authentication:** Secure stateless authentication using JSON Web Tokens.
- **Rate Limiting:** Protection against brute-force and DDoS attacks using `express-rate-limit`.
- **Helmet:** Secure HTTP headers configuration.
- **Environment Variables:** Sensitive configuration separated from code.

## 📁 Project Structure

```
faithconnect/
├── client/                 # React frontend
│   ├── src/
│   │   ├── core/          # Core utilities, store, constants
│   │   ├── data/          # API services
│   │   ├── models/        # Data models
│   │   ├── views/         # Page components
│   │   └── widgets/       # Reusable UI components
│   └── package.json
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── server.js      # Entry point
│   └── package.json
└── package.json           # Root package.json
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**

   Create `server/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/faithconnect
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRE=30d
   ```

   Create `client/.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

3. **Start MongoDB:**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Run the application:**
   ```bash
   # Run both client and server
   npm run dev

   # Or run separately:
   npm run dev:client  # Frontend on http://localhost:3000
   npm run dev:server  # Backend on http://localhost:5000
   ```

## 🎨 Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Zustand (State Management)
- React Query
- React Hook Form + Zod
- Axios
- Lucide React (Icons)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Express Validator




