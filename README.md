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
- Docker secrets/configuration handled through environment variables
- Production MySQL database hosted on Aiven

---

# 🛠️ Tech Stack

## Application

- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- MySQL

## DevOps

- Git
- GitHub
- Docker
- Docker Compose
- Docker Hub
- GitHub Actions
- Render
- Aiven

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
              ┌─────────┴─────────┐
              │                   │
         Docker Build       Automated Tests
              │
              ▼
          Docker Hub
              │
              ▼
            Render
              │
      ┌───────┴────────┐
      │                │
 Frontend          Node.js
 HTML/CSS/JS       Express API
                       │
                       ▼
                  Aiven MySQL
                       │
              ┌────────┴────────┐
              │                 │
          Employees          Tasks