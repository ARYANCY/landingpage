# 🎉 Fest-Coding MERN App

A full-stack MERN web app built for college fests.  
Includes:
- 🌐 Google OAuth authentication  
- 🌓 Dark/Light mode toggle  
- 📧 Email sending with Nodemailer  
- 🎨 React + Vite frontend (Landing Page design)  
- ⚡ Express + MongoDB backend  

Live Links:  
- Frontend (Vercel): [https://landingpage-henna-nine.vercel.app](https://landingpage-henna-nine.vercel.app)  
- Backend (Render): [https://landingpage-m00b.onrender.com](https://landingpage-m00b.onrender.com)  

---

## 🚀 Tech Stack
- **Frontend** → React (Vite), React Router, CSS  
- **Backend** → Node.js, Express.js, Passport.js (Google OAuth)  
- **Database** → MongoDB Atlas  
- **Auth** → Google OAuth 2.0  
- **Email** → Nodemailer + Gmail App Password  
- **Deployment** → Vercel (Frontend), Render (Backend)  

---


---

## ⚙️ Installation

### 1. Clone repo
```bash
    git clone https://github.com/ARYANCY/landingpage.git
    cd fest-coding
```
### 2. Backend Setup
```bash
    cd backend
    npm install
```
### Create .env file:( for backend/development)
```bash
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    
    CLIENT_URL=http://localhost:3000
    SERVER_URL=http://localhost:5000
    
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    
    EMAIL_USER=youremail@gmail.com
    EMAIL_PASS=your_gmail_app_password
```
### 3. Start backend
```bash
   npm run dev
```
### 4.Frontend Setup
```bash
    cd frontend
    npm install
```
### Create .env file:(for frontend/development)
```
  VITE_API_URL=http://localhost:5000
```
### 5.Start frontend:
```
 npm start
```
---
## Google OAuth Setup

This project uses Google OAuth for user authentication. To configure:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Navigate to **APIs & Services > Credentials**.
4. Create **OAuth 2.0 Client IDs**.
   - **Authorized JavaScript origins:** `http://localhost:5173` (for local development)
   - **Authorized redirect URIs:** `http://localhost:5000/auth/google/callback`
5. Copy the **Client ID** and **Client Secret** into your backend `.env` file.

---

## Future Improvements

- Implement fully functional **Nodemailer integration** for email notifications (currently implemented but requires refinement).
- Add support for additional authentication providers such as **Facebook** and **GitHub**.
- Enhance security with token-based authentication (JWT) for the frontend.
- Improve UI/UX with more interactive components and animations.
---



