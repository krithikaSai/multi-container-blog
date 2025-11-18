Multi-Container Blog Platform

This project implements a complete blog application using a multi-container Docker architecture. It demonstrates how separate services (frontend, backend, and database) can communicate within a shared Docker network while maintaining persistent storage and clean API boundaries.

🚀 Technologies Used

Docker & Docker Compose

Node.js + Express (backend API)

MySQL 8 (database)

Nginx (frontend static hosting)

JWT Authentication

Multer (image uploads)

bcrypt (password hashing)

⚙️ Architecture Overview

The application is composed of three containers:

1. Frontend (Nginx)

Serves static HTML/CSS/JS

Interacts with backend via REST API

Allows viewing posts, creating posts, editing, deleting

Optional image upload during post creation

2. Backend (Node.js + Express)

Exposes REST API:

User registration & login

JWT-based authentication

Blog CRUD operations

Image upload handling

Serves uploaded images statically

Connects to MySQL using internal Docker hostname db

3. MySQL Database

Stores users, posts, and image paths

Uses Docker volume db_data for persistence

🐳 Docker Compose Setup

To start all services:

docker-compose up --build


This launches:

blog-frontend (Nginx, port 3000)

blog-backend (Node API, port 8080)

blog-db (MySQL, port 3306 with persistent volume)

Visit:

Frontend: http://localhost:3000

Backend: http://localhost:8080

📝 Features
✅ Authentication

Register new users

Login with username/password

Passwords hashed with bcrypt

JWT tokens issued on login

Protected routes for create/edit/delete

✅ Blog Management

View all posts (public)

Create new post (protected)

Edit & delete posts (protected)

Optional image upload

Images stored in backend/uploads and served via /uploads/...

✅ Database Schema

users

id, username (unique), password (hashed)

posts

id, title, content, image path, timestamp

📦 Project Structure
multi-container-blog/
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── uploads/
│   ├── Dockerfile
│   └── server.js
│
├── frontend/
│   ├── index.html
│   └── styles.css
│
└── docker-compose.yml

📌 Future Improvements

Hosting backend to a cloud provider supporting Docker-based deployment.

Adding support for image updates and multiple attachments.

Improving frontend responsiveness.

Adding admin-only features.

Enhanced request validation and rate limiting.

🧪 Running the Project Locally

Install Docker Desktop

Clone this repo

Run:

docker-compose up --build


Open your browser:

Frontend: http://localhost:3000

API health check: http://localhost:8080/

🎉 Conclusion

This project demonstrates a complete, containerized full-stack web application using Docker. It showcases cross-container networking, persistent storage with Docker volumes, secure authentication using JWT, and a fully modular multi-service architecture.
