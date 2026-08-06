# 🤖 AI Focus Room

AI Focus Room is a full-stack MERN application that helps users organize their goals into AI-generated subtasks, track focus sessions, and manage productivity efficiently.

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes

### Task Management
- Create Task
- View All Tasks
- View Single Task
- Update Task
- Delete Task

### AI Features
- AI-generated subtasks for every goal
- Complete subtasks
- Track task progress

### Focus Mode
- Start Focus Session
- End Focus Session
- Session duration tracking

### Frontend
- Responsive UI
- Dark Theme
- Dashboard
- Task Cards
- Login & Register Pages

---

## 🛠 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- Tailwind CSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt.js

### AI
- Google Gemini API

---

## 📁 Project Structure

```
AI-Focus-Room
│
├── backend
│   ├── controller
│   ├── middleware
│   ├── models
│   ├── router
│   ├── config
│   └── index.js
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/Rishu0122/AI-Focus-Room.git
```

```bash
cd AI-Focus-Room
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder.

```env
PORT=3000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Run Backend

```bash
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Authentication

| Method | Endpoint |
|---------|----------|
| POST | /api/users/register |
| POST | /api/users/login |

### Tasks

| Method | Endpoint |
|---------|----------|
| POST | /api/tasks/createTask |
| GET | /api/tasks |
| GET | /api/tasks/:taskId/findTask |
| PUT | /api/tasks/:taskId/updateTask |
| DELETE | /api/tasks/:taskId/deleteTask |

### Focus

| Method | Endpoint |
|---------|----------|
| POST | /api/tasks/:taskId/start |
| POST | /api/tasks/:taskId/end |

### Subtasks

| Method | Endpoint |
|---------|----------|
| POST | /api/tasks/:taskId/subtasks/:subtaskId |

---

## 📸 Screenshots

Add screenshots of:

- Login Page
- Register Page
- Dashboard
- Task Cards
- Focus Mode

---

## 🌟 Future Improvements

- Pomodoro Timer
- Task Search
- Task Filtering
- Dashboard Analytics
- User Profile
- Notifications
- Deployment on Render & Vercel

---

## 👨‍💻 Author

**Shubham**

GitHub: https://github.com/YOUR_USERNAME

---

## ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.
