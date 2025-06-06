# Vue CRUD App with Laravel API

This project is a full-stack web application built with **Vue.js** for the frontend and **Laravel** for the backend API. It provides a simple and clean implementation of CRUD (Create, Read, Update, Delete) functionality — perfect for learning or starting your own project.

## 🌟 Features

- 🔄 Full CRUD operations on items
- 🚀 Vue 3 with Composition API
- 🎯 Laravel RESTful API backend
- 🗂️ Axios for HTTP requests
- 🧱 Responsive UI with clean structure
- 🔐 CSRF protection & proper API routing
- 📦 Component-based architecture

## 🛠️ Technologies Used

### Frontend
- Vue 3
- Axios
- Vue Router

### Backend
- Laravel 10+
- API Routes & Controllers
- Eloquent ORM

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/esmail36/Vue-crud-app-with-Laravel-api.git
cd Vue-crud-app-with-Laravel-api

2- **Set Up the Laravel Backend**
  cd backend
  composer install
  cp .env.example .env
  php artisan key:generate
  
  # Set your database credentials in .env
  
  php artisan migrate
  php artisan serve
**📌 Make sure you have MySQL (or other DB) and Laravel installed.**

3- **Set Up the Vue Frontend**
  cd frontend
  npm install
  npm run dev

**📁 Folder Structure Overview**
  ```bash
  ├── backend/
  │   ├── app/Http/Controllers/
  │   ├── database/migrations/
  │   └── routes/api.php
  ├── frontend/
  │   ├── src/components/
  │   ├── src/views/
  │   └── src/App.vue

**🧪 Usage**
    Once both servers are running:
    
    Visit the Vue frontend (usually http://localhost:5173)
    
    The backend API should be running at http://127.0.0.1:8000/api/
    
    Add, update, or delete items from the frontend and see changes reflected in your database

**🤝 Contribution**
      Contributions are welcome! If you'd like to:
      
      Improve the UI
      
      Add pagination or filtering
      
      Handle errors more gracefully
      
      Add authentication
      
      Feel free to fork this repo, make your changes, and submit a pull request.

**🙌 Author**

  ```bash
  Made with 💻 by Esmail Nbaheen
  Let’s connect on www.linkedin.com/in/esmail-nbaheen-322849365


