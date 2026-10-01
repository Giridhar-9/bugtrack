# 🐞 BugTrack

A full-stack **Bug Tracking and Issue Management System** built using React, Node.js, Express.js, and MySQL.

BugTrack allows users to create, view, search, filter, update, and delete software bugs through a responsive web-based dashboard.

The project is being developed incrementally, with the current version focusing on core bug management and future versions planned to introduce authentication, user roles, bug assignment, authorization, and production deployment.

---

## 📌 Project Overview

Software projects often involve multiple bugs and issues that need to be tracked throughout the development lifecycle.

BugTrack provides a centralized platform for managing these issues.

The current system supports:

- Creating bugs
- Viewing bugs
- Updating bugs
- Deleting bugs
- Searching bugs
- Filtering bugs
- Tracking bug status
- Tracking priority and severity
- Dashboard statistics
- Basic form validation
- Loading and error states
- Delete confirmation
- RESTful API communication
- MySQL database persistence

Future versions will extend the application into a multi-user issue management platform with authentication, authorization, user roles, and bug assignment.

---

# ✨ Features

## Current Features — Version 1

### 🐛 Bug Management

Users can:

- Create a new bug
- View all bugs
- Edit existing bugs
- Delete bugs
- View bug creation time

Each bug contains information such as:

- Title
- Description
- Status
- Priority
- Severity
- Creation date
- Assigned user field for future development

---

### 🔎 Search

Bugs can be searched using:

- Bug title
- Bug description

Search results update dynamically as the user types.

---

### 🎯 Filtering

Bugs can be filtered based on:

#### Status

- OPEN
- IN PROGRESS
- RESOLVED
- CLOSED

#### Priority

- LOW
- MEDIUM
- HIGH

#### Severity

- MINOR
- MAJOR
- CRITICAL

Multiple filters can be combined with the search functionality.

---

### 📊 Dashboard Statistics

The dashboard provides an overview of the current bug database.

It displays:

- Total Bugs
- Open Bugs
- Bugs In Progress
- Resolved Bugs

---

### ✅ Form Validation

The bug creation form includes basic validation to ensure that required information such as:

- Bug title
- Bug description

is provided before submitting the bug.

---

### ⚠️ Error & Loading Handling

The frontend provides feedback for:

- Loading bugs
- Failed API requests
- Failed bug creation
- Empty search results

---

### 🗑️ Delete Confirmation

Before deleting a bug, the application asks the user for confirmation.

This helps prevent accidental deletion of issues.

---

### 🔄 Manual Refresh

The dashboard provides a refresh button that allows users to manually retrieve the latest bug data from the backend.

---

# 🛠️ Tech Stack

## Frontend

- React
- Vite
- Bootstrap
- JavaScript
- HTML
- CSS

## Backend

- Node.js
- Express.js

## Database

- MySQL

## API Testing

- Postman

## Development Tools

- VS Code
- Git
- GitHub
- MySQL Workbench

---

# 🏗️ System Architecture

```text
                ┌─────────────────────┐
                │      React UI       │
                │      + Vite         │
                └──────────┬──────────┘
                           │
                           │ HTTP Requests
                           │ REST API
                           ▼
                ┌─────────────────────┐
                │    Express.js       │
                │      Backend        │
                └──────────┬──────────┘
                           │
                           │ SQL Queries
                           ▼
                ┌─────────────────────┐
                │       MySQL         │
                │      Database       │
                └─────────────────────┘
