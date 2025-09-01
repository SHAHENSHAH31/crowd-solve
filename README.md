# crowd-solve
# CrowdSolve Platform  

CrowdSolve is a **community-driven problem-solving platform** where users can post real-world problems, suggest solutions, and engage with others through comments and upvotes.  
It is built with a **Node.js/Express backend** and **React.js frontend**, using **JWT authentication** for secure access.  

---

## Objective  

Build a real-world community platform to **post and solve problems** collaboratively.  

---

## Core Features  

- **User Authentication**
  - JWT-based login & signup
  - Secure password storage (bcrypt)
  - Refresh token support

- **Problem Posting**
  - Post problems with **location, image (Cloudinary), and description**
  - Problems linked to users

- **Solutions**
  - Other users can suggest solutions for problems
  - Each solution is tied to a problem and a user

- **Community Engagement**
  - Upvote solutions to highlight best ideas
  - Comment on solutions for discussions

---
crowd-solve/
│
├── backend/ # Node.js + Express backend
│ ├── src/
│ ├── package.json
│ ├── .env
│ 
│
├── frontend/ # React.js frontend
│ ├── src/
│ ├── package.json
│ ├── .env
│ 
│
├── .gitignore
└── README.md


---

## Installation & Setup  

### 1. Clone Repository  
```bash
cd backend
npm install
cp .env.example .env   
Run backend:

npm run dev


Backend runs by default at http://localhost:3000

3. Setup Frontend
cd ../frontend
npm install
cp .env.example .env   # create your env file


Run frontend:

npm start




4. Required Environment Variables
Backend .env.example
PORT=3000

# JWT Secrets
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret

# MongoDB
MONGO_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
