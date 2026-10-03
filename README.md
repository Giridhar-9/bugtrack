# Bug / Issue Tracking System

A full-stack web application for managing software bugs and tracking their lifecycle from creation to resolution.

## Features

- Create, view, update, and delete bugs
- Track bug lifecycle: OPEN, IN PROGRESS, RESOLVED
- Set bug priority and severity
- Assign bugs to developers
- Search bugs by title and description
- Filter bugs by status, priority, and severity
- Dashboard statistics
- RESTful API architecture
- MySQL database persistence
- Parameterized SQL queries
- API error handling
- Loading and error states
- Delete confirmation
- Manual refresh of bug data

## Tech Stack

### Frontend
- React.js
- Vite
- Bootstrap
- JavaScript

### Backend
- Node.js
- Express.js
- REST API

### Database
- MySQL
- mysql2

### Tools
- Postman
- MySQL Workbench
- Git
- GitHub

## System Architecture

```text
React + Vite Frontend
        |
        | HTTP / REST API
        v
Node.js + Express Backend
        |
        | SQL Queries
        v
      MySQL
```

## Bug Lifecycle

```text
OPEN
  |
  v
IN PROGRESS
  |
  v
RESOLVED
```

Each bug can contain:
- Title
- Description
- Status
- Priority
- Severity
- Assigned Developer
- Created At
- Updated At

## REST API

Base URL: `http://localhost:5000/api/bugs`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bugs` | Retrieve all bugs |
| GET | `/api/bugs/:id` | Retrieve a specific bug |
| POST | `/api/bugs` | Create a new bug |
| PUT | `/api/bugs/:id` | Update a bug |
| DELETE | `/api/bugs/:id` | Delete a bug |

## Database

The application uses a MySQL `bugs` table containing:

```text
id
title
description
status
priority
severity
assigned_to
created_at
updated_at
```

Parameterized SQL queries are used for database operations to reduce the risk of SQL injection.

## Project Structure

```text
BugTrack/
|
├── client/
│   └── src/
│       ├── components/
│       │   ├── BugCard.jsx
│       │   ├── BugForm.jsx
│       │   ├── BugStats.jsx
│       │   └── Navbar.jsx
│       ├── api.js
│       └── App.jsx
|
├── server/
│   ├── routes/
│   │   └── bugRoutes.js
│   ├── db.js
│   └── index.js
|
├── package.json
└── README.md
```

## Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd bugtrack-main
```

### 2. Install dependencies

```bash
cd client
npm install
cd ../server
npm install
```

### 3. Configure MySQL

Create a MySQL database and `bugs` table.

Create a `.env` file inside the `server` directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=bugtracker
```

### 4. Start the backend

```bash
cd server
node index.js
```

The backend runs on `http://localhost:5000`.

### 5. Start the frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the Vite URL shown in the terminal.

## Example Bug

```text
Title: Password reset email not received
Description: Users do not receive the password reset email after requesting a password reset.
Status: OPEN
Priority: HIGH
Severity: CRITICAL
Assigned Developer: 101
```

The bug can subsequently be moved through `OPEN -> IN PROGRESS -> RESOLVED`.

## Security

The backend uses parameterized SQL queries when interacting with the MySQL database, preventing user-provided values from being directly concatenated into SQL statements.

The API also performs basic input validation and returns appropriate HTTP status codes for invalid requests and missing resources.

## Future Improvements

- User authentication and authorization
- Developer/user management
- Role-based access control
- Comments and discussion on bugs
- File and screenshot attachments
- Email notifications
- Pagination for large numbers of bugs
- Deployment to a cloud platform

## Author

Giridhar Sai Varma
