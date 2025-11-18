# Multi-Container Blog Platform

This project implements a complete blog application using a multi-container Docker architecture. It demonstrates how separate services (frontend, backend, and database) communicate within a shared Docker network while maintaining persistent storage and clean API boundaries.

## Technologies Used

- Docker & Docker Compose  
- Node.js + Express (backend API)  
- MySQL 8 (database)  
- Nginx (frontend static hosting)  
- JWT Authentication  
- Multer (image uploads)  
- bcrypt (password hashing)

## Architecture Overview

The application is composed of three containers.

### 1. Frontend (Nginx)
- Serves static HTML/CSS/JS  
- Interacts with backend via REST API  
- Allows viewing, creating, editing, and deleting posts  
- Supports optional image upload during post creation

### 2. Backend (Node.js + Express)
- Exposes REST API:
  - User registration and login  
  - JWT-based authentication  
  - Blog CRUD operations  
  - Image upload handling  
- Serves uploaded images statically  
- Connects to MySQL using the internal Docker hostname `db`

### 3. MySQL Database
- Stores users, posts, and image paths  
- Uses Docker volume `db_data` for persistence

## Docker Compose Setup

Start all services:
```bash
docker-compose up --build
```


This launches:
- `blog-frontend` (Nginx, port 3000)  
- `blog-backend` (Node API, port 8080)  
- `blog-db` (MySQL, port 3306 with persistent volume)

Access points:
- Frontend: http://localhost:3000  
- Backend: http://localhost:8080

## Features

### Authentication
- User registration  
- Login with username/password  
- Passwords hashed with bcrypt  
- JWT issued on login  
- Protected routes for create, edit, and delete operations

### Blog Management
- Public viewing of posts  
- Create new post (protected)  
- Edit and delete posts (protected)  
- Optional image upload  
- Images stored in `backend/uploads` and served via `/uploads/...`

### Database Schema

**users**  
- id  
- username (unique)  
- password (hashed)

**posts**  
- id  
- title  
- content  
- image path  
- timestamp  

## Project Structure

multi-container-blog/
│
├── backend/
│ ├── routes/
│ ├── models/
│ ├── uploads/
│ ├── Dockerfile
│ └── server.js
│
├── frontend/
│ ├── index.html
│ └── styles.css
│
└── docker-compose.yml


## Future Improvements

- Deploy backend to a cloud provider supporting Docker  
- Allow updating images and adding multiple attachments  
- Improve frontend responsiveness  
- Add admin-only features  
- Improve validation and add rate limiting  

## Running the Project Locally

1. Install Docker Desktop  
2. Clone this repository  
3. Run:

```bash
docker-compose up --build
```

4. Open your browser:
   - Frontend: http://localhost:3000  
   - Backend health check: http://localhost:8080/

## Conclusion

This project demonstrates a complete containerized full-stack web application using Docker. It showcases cross-container networking, persistent storage using Docker volumes, secure authentication with JWT, and a modular multi-service architecture.

