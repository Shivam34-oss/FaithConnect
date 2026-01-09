# FaithConnect - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Architecture](#architecture)
4. [Features](#features)
5. [Folder Structure](#folder-structure)
6. [API Documentation](#api-documentation)
7. [Key Components Explained](#key-components-explained)
8. [Interview Talking Points](#interview-talking-points)

---

## 🎯 Project Overview

**FaithConnect** is a full-stack religious social networking application that allows users to:
- Connect with their faith community
- Share posts, thoughts, and prayers
- Join faith-based communities
- Follow other users
- Like and comment on posts
- Build a spiritual social network

### Problem Statement
In today's digital age, people of faith need a dedicated platform to connect, share, and grow together spiritually without the noise of general social media.

### Solution
FaithConnect provides a clean, focused platform specifically designed for faith communities to interact, share content, and build meaningful connections.

---

## 🛠️ Tech Stack

### Frontend Technologies

#### **React 18.2.0**
- **Why React?** Component-based architecture, virtual DOM for performance, large ecosystem
- **Usage:** Building all UI components, views, and widgets
- **Key Features Used:** Hooks (useState, useEffect), React Router for navigation

#### **Vite 5.0.8**
- **Why Vite?** Lightning-fast development server, instant HMR (Hot Module Replacement)
- **Usage:** Build tool and development server
- **Benefits:** Faster than Create React App, better developer experience

#### **React Router DOM 6.20.1**
- **Purpose:** Client-side routing and navigation
- **Features:** Protected routes, nested routes, dynamic routing
- **Usage:** Navigation between pages (Home, Profile, Community, etc.)

#### **Zustand 4.4.7**
- **Why Zustand?** Lightweight state management (only 1KB), simpler than Redux
- **Usage:** Global state management for authentication
- **Features:** Persist middleware for localStorage, simple API

#### **React Query 3.39.3**
- **Purpose:** Server state management, data fetching, caching
- **Features:** Automatic caching, background refetching, pagination support
- **Usage:** Fetching posts, users, communities from API

#### **Axios 1.6.2**
- **Purpose:** HTTP client for API requests
- **Features:** Request/response interceptors, automatic JSON parsing
- **Usage:** All API calls to backend

#### **React Hook Form 7.49.2 + Zod 3.22.4**
- **Purpose:** Form handling and validation
- **Why?** Performance (uncontrolled components), less re-renders
- **Zod:** TypeScript-first schema validation
- **Usage:** Login, Register forms with validation

#### **React Toastify 9.1.3**
- **Purpose:** Toast notifications for user feedback
- **Usage:** Success/error messages

#### **Lucide React 0.294.0**
- **Purpose:** Icon library
- **Why?** Lightweight, tree-shakeable, consistent design

#### **Date-fns 2.30.0**
- **Purpose:** Date formatting and manipulation
- **Usage:** "2 hours ago" relative time display

### Backend Technologies

#### **Node.js**
- **Why Node.js?** JavaScript on server, non-blocking I/O, large ecosystem
- **Version:** 18+ (ES Modules support)

#### **Express 4.18.2**
- **Purpose:** Web framework for Node.js
- **Features:** Middleware support, routing, error handling
- **Usage:** RESTful API server

#### **MongoDB + Mongoose 8.0.3**
- **Why MongoDB?** NoSQL, flexible schema, good for social media data
- **Mongoose:** ODM (Object Data Modeling) for MongoDB
- **Usage:** User data, posts, comments, communities storage

#### **JWT (jsonwebtoken 9.0.2)**
- **Purpose:** Stateless authentication
- **How it works:** Server generates token, client stores it, sends in headers
- **Benefits:** Scalable, no server-side session storage needed

#### **Bcryptjs 2.4.3**
- **Purpose:** Password hashing
- **Security:** One-way hashing, salt rounds for security
- **Usage:** Hashing passwords before storing in database

#### **Express Validator 7.0.1**
- **Purpose:** Input validation and sanitization
- **Usage:** Validating email, password, username in requests

#### **Helmet 7.1.0**
- **Purpose:** Security middleware
- **Features:** Sets security HTTP headers
- **Protection:** XSS, clickjacking, MIME sniffing

#### **CORS 2.8.5**
- **Purpose:** Cross-Origin Resource Sharing
- **Usage:** Allow frontend (port 3000) to access backend (port 5000)

#### **Express Rate Limit 7.1.5**
- **Purpose:** Prevent brute force attacks
- **Usage:** Limit API requests (100 per 15 minutes per IP)

#### **Morgan 1.10.0**
- **Purpose:** HTTP request logger
- **Usage:** Log all API requests in development

#### **Compression 1.7.4**
- **Purpose:** Gzip compression
- **Benefits:** Smaller response sizes, faster loading

---

## 🏗️ Architecture

### Frontend Architecture

```
┌─────────────────────────────────────┐
│         React Application           │
├─────────────────────────────────────┤
│  Views (Pages)                      │
│  ├── HomeView                       │
│  ├── AuthView (Login/Register)      │
│  ├── ProfileView                    │
│  └── CommunityView                  │
├─────────────────────────────────────┤
│  Widgets (Reusable Components)      │
│  ├── Layout, Navbar, Sidebar        │
│  ├── PostCard, Button, Input        │
├─────────────────────────────────────┤
│  Data Layer (Services)              │
│  ├── authService                    │
│  ├── postService                    │
│  ├── userService                    │
│  └── communityService               │
├─────────────────────────────────────┤
│  Core (Utilities)                   │
│  ├── Store (Zustand)                │
│  ├── API Client (Axios)             │
│  ├── Constants, Helpers             │
├─────────────────────────────────────┤
│  Models (Data Structures)          │
│  ├── User, Post, Comment, Community │
└─────────────────────────────────────┘
```

### Backend Architecture

```
┌─────────────────────────────────────┐
│      Express Server                 │
├─────────────────────────────────────┤
│  Routes Layer                       │
│  ├── /api/auth                      │
│  ├── /api/users                     │
│  ├── /api/posts                     │
│  └── /api/communities               │
├─────────────────────────────────────┤
│  Controllers (Business Logic)       │
│  ├── auth.controller                │
│  ├── user.controller                │
│  ├── post.controller                │
│  └── community.controller           │
├─────────────────────────────────────┤
│  Middleware                         │
│  ├── auth.js (JWT verification)      │
│  ├── errorHandler.js                │
│  └── notFound.js                    │
├─────────────────────────────────────┤
│  Models (Database Schemas)          │
│  ├── User, Post, Comment, Community  │
├─────────────────────────────────────┤
│  MongoDB Database                   │
└─────────────────────────────────────┘
```

### Data Flow

1. **User Action** → React Component
2. **Component** → Service Layer (API call)
3. **Service** → Axios → Backend API
4. **Backend** → Middleware (Auth, Validation)
5. **Controller** → Business Logic
6. **Model** → MongoDB Query
7. **Response** → Back to Frontend
8. **React Query** → Cache & Update UI

---

## ✨ Features

### 1. Authentication System
- **Registration:** Email, username, password validation
- **Login:** JWT token-based authentication
- **Protected Routes:** Only authenticated users can access
- **Token Persistence:** Stored in localStorage via Zustand persist

### 2. User Profile
- View profile with avatar, bio, faith, location
- Follow/Unfollow users
- View followers and following count
- User's posts display

### 3. Social Feed
- Infinite scroll pagination
- Post creation with text and images
- Like/Unlike posts
- Comment on posts
- Real-time like count updates

### 4. Communities
- Create faith-based communities
- Join/Leave communities
- Community-specific posts
- Member management

### 5. Post Management
- Create, read, update, delete posts
- Image support (multiple images)
- Tags for categorization
- Public/Private posts

---

## 📁 Folder Structure Explained

### Frontend (`client/src/`)

```
src/
├── core/                    # Core utilities and configurations
│   ├── store/              # Zustand state management
│   │   └── authStore.js    # Authentication state
│   └── utils/              # Helper functions
│       ├── apiClient.js    # Axios instance with interceptors
│       ├── constants.js    # API endpoints, routes
│       └── helpers.js       # Utility functions
│
├── data/                    # Data layer - API services
│   └── services/
│       ├── authService.js      # Auth API calls
│       ├── postService.js      # Post API calls
│       ├── userService.js      # User API calls
│       └── communityService.js  # Community API calls
│
├── models/                  # Data models (classes)
│   ├── User.js            # User model with methods
│   ├── Post.js            # Post model
│   ├── Comment.js         # Comment model
│   └── Community.js       # Community model
│
├── views/                  # Page components (Routes)
│   ├── HomeView/          # Main feed page
│   ├── AuthView/          # Login/Register pages
│   ├── ProfileView/       # User profile page
│   ├── CommunityView/     # Communities listing
│   ├── PostDetailView/    # Single post view
│   └── NotFoundView/      # 404 page
│
└── widgets/               # Reusable UI components
    ├── Layout/           # Main layout wrapper
    ├── Navbar/           # Top navigation
    ├── Sidebar/          # Side navigation
    ├── PostCard/         # Post display component
    ├── Button/           # Reusable button
    └── Input/            # Form input component
```

### Backend (`server/src/`)

```
src/
├── config/                 # Configuration files
│   └── database.js        # MongoDB connection
│
├── controllers/           # Business logic
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── post.controller.js
│   └── community.controller.js
│
├── middleware/            # Custom middleware
│   ├── auth.js           # JWT authentication
│   ├── errorHandler.js   # Error handling
│   └── notFound.js       # 404 handler
│
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── Post.js
│   ├── Comment.js
│   └── Community.js
│
├── routes/               # API routes
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── post.routes.js
│   └── community.routes.js
│
└── server.js             # Entry point
```

---

## 🔌 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
- **Purpose:** Create new user account
- **Body:** `{ name, email, username, password, faith }`
- **Response:** `{ success, token, user }`
- **Validation:** Email format, password min 6 chars, unique username

#### POST `/api/auth/login`
- **Purpose:** Authenticate user
- **Body:** `{ email, password }`
- **Response:** `{ success, token, user }`
- **Security:** Password hashed with bcrypt

#### GET `/api/auth/profile`
- **Purpose:** Get current user profile
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `{ success, user }`

### Posts Endpoints

#### GET `/api/posts`
- **Purpose:** Get all posts (paginated)
- **Query:** `?page=1&limit=10`
- **Response:** `{ success, posts, pagination }`

#### POST `/api/posts`
- **Purpose:** Create new post
- **Body:** `{ content, images[], tags[], community, isPublic }`
- **Auth:** Required

#### POST `/api/posts/:id/like`
- **Purpose:** Like a post
- **Response:** `{ success, message }`

### User Endpoints

#### GET `/api/users/:id`
- **Purpose:** Get user profile by ID
- **Response:** `{ success, user }`

#### POST `/api/users/:id/follow`
- **Purpose:** Follow a user
- **Response:** `{ success, message }`

---

## 🔑 Key Components Explained

### 1. Authentication Flow

```javascript
// User logs in
LoginView → authService.login() → API POST /api/auth/login
→ Backend validates → Returns JWT token
→ Zustand store saves token & user
→ Protected routes now accessible
```

### 2. Protected Routes

```javascript
// PrivateRoute component checks authentication
if (isAuthenticated) {
  return children  // Show protected content
} else {
  return <Navigate to="/login" />  // Redirect to login
}
```

### 3. API Interceptors

```javascript
// Request Interceptor: Adds JWT token to headers
axios.interceptors.request.use(config => {
  const token = useAuthStore.getState().token
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response Interceptor: Handles 401 errors
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      logout()  // Auto logout on token expiry
    }
  }
)
```

### 4. State Management (Zustand)

```javascript
// Simple, lightweight state management
const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: async (email, password) => { /* ... */ }
    }),
    { name: 'auth-storage' }  // Persists to localStorage
  )
)
```

### 5. Data Fetching (React Query)

```javascript
// Automatic caching, refetching, loading states
const { data, isLoading } = useQuery(
  'posts',
  () => postService.getPosts(),
  { staleTime: 5 * 60 * 1000 }  // Cache for 5 minutes
)
```

### 6. Form Validation (React Hook Form + Zod)

```javascript
// Schema validation
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

// Form handling
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema)
})
```

---

## 💼 Interview Talking Points

### 1. Why This Tech Stack?

**Frontend:**
- **React:** Industry standard, component reusability, large community
- **Vite:** Faster development, better DX than CRA
- **Zustand:** Simpler than Redux, perfect for this scale
- **React Query:** Handles server state, caching, pagination automatically

**Backend:**
- **Node.js + Express:** JavaScript everywhere, fast development
- **MongoDB:** Flexible schema for social media data
- **JWT:** Stateless auth, scalable

### 2. Security Measures Implemented

- **Password Hashing:** Bcrypt with salt rounds
- **JWT Tokens:** Secure, stateless authentication
- **Rate Limiting:** Prevent brute force attacks
- **Helmet:** Security headers (XSS, clickjacking protection)
- **Input Validation:** Express-validator for all inputs
- **CORS:** Controlled cross-origin access

### 3. Performance Optimizations

- **React Query Caching:** Reduces API calls
- **Code Splitting:** Vite automatically splits code
- **Image Optimization:** Lazy loading, multiple image support
- **Pagination:** Infinite scroll, load more button
- **Compression:** Gzip compression on backend

### 4. Scalability Considerations

- **Stateless Backend:** JWT allows horizontal scaling
- **Database Indexing:** MongoDB indexes on frequently queried fields
- **Modular Architecture:** Easy to add new features
- **API Versioning Ready:** Structure supports /api/v1, /api/v2

### 5. Challenges Solved

- **Authentication Flow:** Implemented JWT with refresh token pattern
- **Real-time Updates:** Used React Query for optimistic updates
- **State Management:** Zustand for simple, effective state
- **Form Validation:** Zod schemas for type-safe validation

### 6. Best Practices Followed

- **Separation of Concerns:** Clear folder structure
- **DRY Principle:** Reusable components and utilities
- **Error Handling:** Try-catch blocks, error boundaries
- **Code Organization:** Feature-based structure
- **Environment Variables:** Secure config management

### 7. Future Enhancements

- Real-time messaging (WebSockets)
- Push notifications
- Image upload to cloud storage (AWS S3)
- Advanced search with filters
- Post scheduling
- Analytics dashboard

---

## 🎬 Demo Flow for Interview

1. **Show Project Structure** - Explain folder organization
2. **Authentication** - Register → Login → Protected Route
3. **Create Post** - Show form validation
4. **Feed** - Infinite scroll, like, comment
5. **Profile** - Follow/unfollow, view posts
6. **Communities** - Join, create community
7. **Code Walkthrough** - Show key files (authStore, apiClient, controllers)

---

## 📊 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  avatar: String,
  bio: String,
  faith: String,
  location: String,
  followers: [ObjectId],  // References to User
  following: [ObjectId],  // References to User
  posts: [ObjectId],      // References to Post
  createdAt: Date,
  updatedAt: Date
}
```

### Post Collection
```javascript
{
  _id: ObjectId,
  author: ObjectId (ref: User),
  content: String,
  images: [String],
  likes: [ObjectId],      // References to User
  comments: [ObjectId],   // References to Comment
  community: ObjectId (ref: Community),
  tags: [String],
  isPublic: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment Considerations

### Frontend
- Build: `npm run build` (creates `dist/` folder)
- Host: Vercel, Netlify, or any static hosting
- Environment: Set `VITE_API_URL` to production API

### Backend
- Host: Heroku, AWS, DigitalOcean
- Environment Variables: Set all `.env` variables
- Database: MongoDB Atlas (cloud) or self-hosted
- Process Manager: PM2 for production

---

## 📝 Summary

FaithConnect is a **production-ready, full-stack social networking application** built with modern technologies. It demonstrates:

✅ **Full-stack development** (React + Node.js)  
✅ **RESTful API design**  
✅ **Authentication & Authorization**  
✅ **Database design** (MongoDB)  
✅ **State management** (Zustand)  
✅ **Form handling & validation**  
✅ **Security best practices**  
✅ **Clean code architecture**  
✅ **Responsive UI design**  

This project showcases skills in modern web development, API design, database management, and user experience design.
