# Accountability Partners Hub 🤝

A comprehensive platform designed for personal growth and social accountability. Connect with friends, track your journey, and maintain mindful habits together.

## 🚀 Key Features

- **Social Connections**: Find and connect with accountability partners through a robust friend system.
- **Project Journey**: Visualize your progress and stay on track with your goals.
- **Personal Reflections**: Log daily journals and reflect on your growth.
- **Modern User Profiles**: Customizable profiles showing focus areas, mottos, and activity.
- **Interactive UI**: A sleek, modern design with animated backgrounds and smooth transitions.

## 🛠️ Tech Stack

### Frontend
- **React 18** + **TypeScript**
- **Vite** for lightning-fast builds
- **Tailwind CSS** for styling
- **shadcn/ui** & **Radix UI** for accessible, high-quality components
- **Framer Motion** for fluid animations
- **React Router Dom** for client-side navigation

### Backend
- **Node.js** & **Express**
- **MongoDB** + **Mongoose** for data persistence
- **JWT (JSON Web Tokens)** for secure authentication
- **Bcrypt** for password hashing

## ⚙️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd accountability-partners-hub
npm install
```

### 2. Backend Setup
Navigate to the `backend` directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder and add your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/accountability-partners
JWT_SECRET=your_jwt_secret_here
```

### 3. Running the App

#### Start the Backend (API Server)
```bash
cd backend
node server.js
```
The server will run on `http://localhost:5000`.

#### Start the Frontend (Vite Dev Server)
In a new terminal:
```bash
npm run dev
```
The frontend will be available at `http://localhost:8080`.

## 📂 Project Structure

- `/src`: Frontend React application.
- `/backend`: Express API server and database models.
- `/public`: Static assets.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---
*Built with love for builders.*
