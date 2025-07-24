# BroChat: Real Time Chat App

## Overview

BroChat is a full-stack real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to sign up, log in, chat in real time, manage their profile, and more. The app is designed for a seamless and modern chat experience.

---

## Features

### Authentication

- **Sign Up**: Create a new account with email, username, and password.
- **Log In**: Access your account securely.
- **JWT Auth**: Secure authentication using JSON Web Tokens.

### Real-Time Chat

- **Send & Receive Messages**: Chat with other users in real time using WebSockets (Socket.io).
- **Message History**: View previous messages in each chat.
- **Typing Indicator**: See when someone is typing (if implemented).

### User Management

- **Profile Page**: View and update your profile information and avatar.
- **Settings Page**: Change your account settings.
- **Avatar Upload**: Upload and update your profile picture (Cloudinary integration).

### UI/UX

- **Modern UI**: Built with React and Tailwind CSS for a responsive, clean interface.
- **Sidebar**: See a list of users or chats.
- **Chat Container**: Main area for conversations.
- **Skeleton Loaders**: Smooth loading experience with skeleton components.
- **Dark/Light Theme**: Toggle between themes (if implemented).

### Backend

- **REST API**: Express.js server with routes for authentication, messages, and user management.
- **MongoDB**: Stores users and messages.
- **Seeding**: Seed users for testing/demo purposes.
- **Cloudinary**: Handles image uploads for avatars.

### Frontend

- **React Components**: Modular components for chat, sidebar, navbar, etc.
- **State Management**: Zustand store for auth, chat, and theme state.
- **Axios**: For API requests.
- **Vite**: Fast development and build tool.

---

## Project Structure

```
realtime-chat-app/
├── backend/
│   ├── src/
│   │   ├── controllers/        # Auth & message controllers
│   │   ├── lib/                # Cloudinary, DB, socket, utils
│   │   ├── middlewares/        # Auth middleware
│   │   ├── models/             # User & message models
│   │   ├── routes/             # Auth & message routes
│   │   └── seeds/              # User seeder
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/         # UI components
│   │   ├── constants/          # App constants
│   │   ├── lib/                # Axios, utils
│   │   ├── pages/              # Main pages (Home, Login, etc.)
│   │   └── store/              # Zustand stores
│   ├── public/                 # Static assets
│   ├── index.html
│   └── package.json
├── package.json                # Root scripts
└── ...
```

---

## How to Run

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Build frontend**
   ```bash
   npm run build
   ```
3. **Start backend**
   ```bash
   npm start
   ```
   Or run both frontend and backend separately from their folders.

---

## Environment Variables

- Create a `.env` file in the backend for MongoDB URI, JWT secret, Cloudinary keys, etc.
- Example:
  ```env
  MONGODB_URI=your_mongodb_uri
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_CLOUD_NAME=your_cloud_name
  CLOUDINARY_API_KEY=your_api_key
  CLOUDINARY_API_SECRET=your_api_secret
  ```

---

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Zustand, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Socket.io, Cloudinary
- **Dev Tools**: ESLint, PostCSS, concurrently

---

## Additional Notes

- All code is organized for clarity and scalability.
- The app is ready for further extension (group chats, notifications, etc.).
- For any issues, check the code comments and structure for guidance.

---

## Author

- Shubham Kumar Sahu
