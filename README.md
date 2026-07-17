# CodeShelf

> **Your Personal Developer Code Library**

CodeShelf is a production-ready MERN Stack application that allows developers to securely save, organize, search, and share reusable code snippets.

---

# Features

## Authentication

- Register
- Login
- JWT Authentication
- Protected Routes
- Persistent Login
- Logout

---

## Dashboard

- Welcome Card
- Statistics
    - Total Snippets
    - Public Snippets
    - Private Snippets
    - Favorite Snippets
- Recent Snippets

---

## Snippet Management

- Create Snippet
- Edit Snippet
- Delete Snippet
- Duplicate Snippet
- Favorite Snippet
- Download Snippet
- Copy Code
- Public / Private Visibility

---

## Search

- Search by Title
- Search by Tags
- Search by Language

---

## Filters

- Language Filter
- Favorites
- Public
- Private

---

## Public Explore

Browse snippets shared by all users.

---

## Syntax Highlighting

Supports

- C++
- Java
- Python
- JavaScript
- TypeScript
- Go
- Rust
- PHP
- SQL

---

# Tech Stack

## Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- React Syntax Highlighter
- React Icons

## Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

---

# Installation

## Clone

```bash
git clone <repository-url>

cd codeshelf
```

## Install

```bash
npm run install-all
```

---

## Backend

Create

```
backend/.env
```

Example

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret
CLIENT_URL=http://localhost:5173
```

---

## Start

```bash
npm run dev
```

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:5173
```

---

# Project Structure

```
codeshelf

backend/
frontend/
README.md
```

---

# Screenshots

```
screenshots/

dashboard.png

login.png

explore.png

editor.png
```

---

# Future Improvements

- Collections
- Folder Organization
- AI Code Explanation
- AI Refactoring
- Markdown Notes
- GitHub Sync
- Version History
- Team Collaboration

---

# License

MIT