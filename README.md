# Expense Tracker

A single-page dynamic web application that helps users record, edit, view, and delete personal expenses in a simple dashboard.

## Project Summary

This project was developed as an individual assignment to demonstrate the use of HTML, CSS, JavaScript, and MongoDB in a real-case web application. The website allows users to manage their expenses with full CRUD operations connected to a database.

## Tech Stack

- Frontend: React + Vite
- Styling: CSS
- Backend: Node.js + Express
- Database: MongoDB Atlas + Mongoose
- HTTP Requests: Axios

## Features

- Single-page application interface
- Add a new expense
- View all saved expenses
- Edit an existing expense
- Delete an expense
- Real-time summary cards:
  - Total Expenses
  - This Month
  - Top Category
- Data stored in MongoDB database
- Soft pastel UI design

## Folder Structure

expense-tracker/
- client/
  - src/
    - App.jsx
    - index.css
    - main.jsx
  - package.json
- server/
  - models/
    - Expense.js
  - server.js
  - .env
  - package.json
- README.md

## How to Run the Project

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```