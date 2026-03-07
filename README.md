Accountability Partners 

Accountability Partners is a platform built to help people stay consistent with their goals by connecting with others who want to grow and improve together. When someone else knows what you're working on, you're far more likely to stay committed.

Users can connect with accountability partners, track their progress, and reflect on their journey over time.

Live Demo

Frontend:
https://accountabilitypartners.netlify.app/

Backend API:
https://accountability-partners-1.onrender.com

Features

Partner Connections
Connect with people who want to stay accountable and work toward their goals together.

Progress Tracking
Track personal goals and monitor progress over time.

Daily Reflections
Write journal entries to reflect on your progress, thoughts, and challenges.

User Profiles
Personal profiles where users can display focus areas, mottos, and activity.

Modern Interface
Clean UI with smooth transitions and responsive design.

Tech Stack
Frontend

React 18

TypeScript

Vite

Tailwind CSS

shadcn/ui + Radix UI

Framer Motion

React Router DOM

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Bcrypt for password hashing

Getting Started
Prerequisites

Node.js (v16 or higher)

MongoDB (local or MongoDB Atlas)

Clone the Repository
git clone <your-repo-url>
cd accountability-partners
npm install
Backend Setup

Navigate to the backend folder:

cd backend
npm install

Create a .env file inside the backend directory:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Running the Application

Start the backend server:

node server.js

Backend will run at:

http://localhost:5000

Start the frontend in another terminal:

npm run dev

Frontend will run at:

http://localhost:8080
Project Structure
/src        -> React frontend
/backend    -> Express API and database models
/public     -> Static assets

Built as a simple platform for people who want to stay accountable and keep moving forward.
