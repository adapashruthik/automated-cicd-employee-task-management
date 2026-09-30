# 🚀 Employee Task Management System — Automated CI/CD

A full-stack Employee Task Management System deployed using a complete DevOps workflow with Docker, GitHub Actions, Docker Hub, Render, and Aiven MySQL.

The project demonstrates how a web application can be containerized, continuously built, pushed to a container registry, and deployed to the cloud using CI/CD automation.

---

## 🌐 Live Application

**Live Demo:**  
https://employee-task-app-yvt3.onrender.com

**GitHub Repository:**  
https://github.com/adapashruthik/automated-cicd-employee-task-management

**Docker Hub:**  
https://hub.docker.com/r/shruthik12/employee-task-app

---

## 📌 Project Overview

The Employee Task Management System allows an organization to manage employees and their assigned tasks through a web-based dashboard.

The application provides functionality for:

- Employee management
- Task management
- Employee-task assignment
- Task status tracking
- Dashboard statistics
- Production database integration

The application is containerized using Docker and deployed through an automated CI/CD pipeline.

---

## ✨ Features

### 👥 Employee Management

- Add employees
- View employees
- Store employee information
- Manage employee records

### 📋 Task Management

- Create tasks
- Assign tasks to employees
- Track task status
- Manage pending and completed tasks

### 📊 Dashboard

Displays:

- Total employees
- Total tasks
- Pending tasks
- Completed tasks

### 🔐 Production Configuration

- Environment variables for sensitive configuration
- Database credentials excluded from Git
- Production MySQL database hosted on Aiven
- Secure Docker Hub authentication through GitHub Secrets

---

# 🛠️ Tech Stack

## Application

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL

## DevOps & Cloud

- Git
- GitHub
- GitHub Actions
- Docker
- Docker Compose
- Docker Hub
- Render
- Aiven MySQL

---

# 🏗️ Architecture

```text
                    Developer
                        │
                        ▼
                     GitHub
                        │
                        ▼
              GitHub Actions CI/CD
                        │
                        ▼
              Docker Image Build
                        │
                        ▼
                   Docker Hub
                        │
                        ▼
                     Render
                        │
               ┌────────┴────────┐
               │                 │
           Frontend          Node.js
         HTML/CSS/JS        Express API
                                 │
                                 ▼
                            Aiven MySQL
                                 │
                        ┌────────┴────────┐
                        │                 │
                    Employees          Tasks
🔄 CI/CD Pipeline

The project uses GitHub Actions to automate the Docker image build and publishing process.

Pipeline Flow
Developer pushes code
        ↓
GitHub Repository
        ↓
GitHub Actions triggered
        ↓
Checkout source code
        ↓
Setup Docker Buildx
        ↓
Login to Docker Hub
        ↓
Build Docker image
        ↓
Push image to Docker Hub
        ↓
Deploy latest image to Render
        ↓
Production application
GitHub Actions Workflow

The CI/CD workflow is located at:

.github/workflows/docker.yml

The workflow performs:

Source code checkout
Docker Buildx setup
Docker Hub authentication
Docker image build
Docker image push
latest image tagging
Commit-based image tagging

Docker Hub authentication is handled using GitHub Secrets.

🐳 Docker

The application is containerized using Docker.

Dockerfile

The Dockerfile:

Uses Node.js 20
Installs backend dependencies
Copies backend and frontend source code
Exposes port 5000
Starts the Express server
Dockerfile
Docker Compose

Local development uses Docker Compose to run:

Node.js application container
MySQL database container
Persistent MySQL storage

Configuration:

docker-compose.yml
Production Docker Compose

Production configuration is available in:

docker-compose.prod.yml

The production configuration uses the Docker image published to Docker Hub.

☁️ Cloud Deployment
Render

The application is deployed as a Docker-based web service on Render.

Production URL

https://employee-task-app-yvt3.onrender.com

Render is responsible for running the production application container.

🗄️ Database

The production database uses Aiven MySQL.

Database Configuration
Database: MySQL
Database Name: defaultdb
User: avnadmin
Port: 16588
SSL: Enabled

The database stores:

Employee records
Task records
Employee-task assignments
Task status information

The database schema is available at:

database/schema.sql
🔐 Environment Variables

Sensitive configuration is managed using environment variables.

Example:

DB_HOST=your-aiven-host
DB_PORT=16588
DB_USER=avnadmin
DB_PASSWORD=your-password
DB_NAME=defaultdb
DB_SSL=true
PORT=5000
NODE_ENV=production

Sensitive files are excluded from Git:

.env
backend/.env

Passwords and Docker Hub access tokens are not stored in the repository.

📁 Project Structure
employee-task-management/
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── screenshots/
│   ├── dashboard.png
│   ├── employees.png
│   ├── tasks.png
│   ├── github-actions.png
│   ├── docker-hub.png
│   ├── render-deployment.png
│   └── aiven-mysql.png
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── docker-compose.prod.yml
├── Dockerfile
└── README.md
🔌 API Endpoints
Health Check
GET /api/health

Example response:

{
  "status": "UP",
  "message": "Backend is healthy"
}
Database Test
GET /api/db-test

Example response:

{
  "status": "success",
  "database": "MySQL connected",
  "result": 1
}
Employee API
GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id
Task API
GET    /api/tasks
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id
💻 Run Locally
Prerequisites

Install:

Git
Node.js 20+
Docker Desktop
Docker Compose
1. Clone the Repository
git clone https://github.com/adapashruthik/automated-cicd-employee-task-management.git
cd automated-cicd-employee-task-management
2. Configure Environment Variables

Create a .env file in the project root.

Example:

DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=employee_task_db
DB_SSL=false
PORT=5000
NODE_ENV=development
3. Start the Application
docker compose up --build

Open the application:

http://localhost:5000
4. Stop the Application
docker compose down

Do not use docker compose down -v unless you intentionally want to remove the database volume.

🚀 Deployment Workflow

The complete deployment process is:

Developer modifies code
        ↓
Push code to GitHub
        ↓
GitHub Actions starts
        ↓
Docker image is built
        ↓
Image is pushed to Docker Hub
        ↓
Latest image is deployed to Render
        ↓
Render starts the application
        ↓
Application connects to Aiven MySQL
        ↓
Production application becomes available
🧪 Production Verification

The deployed application was successfully tested for:

Application availability
API health check
Production database connection
Employee creation
Employee listing
Task creation
Task assignment
Task status updates
Data persistence after refresh
Docker image publishing
GitHub Actions CI/CD
Render deployment
Render to Aiven MySQL connectivity
📸 Screenshots
🏠 Production Dashboard

👥 Employee Management

📋 Task Management

🔄 GitHub Actions CI/CD

🐳 Docker Hub

☁️ Render Deployment

🗄️ Aiven MySQL

🔮 Future Improvements

Possible future enhancements include:

Kubernetes deployment
Prometheus monitoring
Grafana dashboards
Centralized logging with ELK
Automated application testing
Terraform infrastructure
Role-based authentication
HTTPS/custom domain
Email notifications
Application performance monitoring
🎯 DevOps Concepts Demonstrated

This project demonstrates practical experience with:

Linux
Git and GitHub
GitHub Actions
CI/CD
Docker
Docker Compose
Docker Hub
Node.js
Express.js
MySQL
Environment variables
Cloud deployment
Production troubleshooting
Health checks
Cloud networking
Containerized applications
👨‍💻 Author

Adapa Shruthik

Computer Science Graduate | Aspiring DevOps & Cloud Engineer

Skills Demonstrated
Linux
Git
GitHub
GitHub Actions
Docker
Docker Compose
CI/CD
AWS
Terraform
Node.js
Express.js
MySQL
Cloud Deployment
⭐ Project

If you found this project useful, consider giving the repository a ⭐ on GitHub.