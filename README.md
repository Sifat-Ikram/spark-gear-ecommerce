# 🚀 Spark Gear – Full‑Stack MERN + Next.js

A fully functional **full‑stack gadgets e-commerce website** built with **Next.js, Tailwind CSS, React Query, Express.js, MongoDB, JWT, Cookies**, and modern UI animations using **Framer Motion**. This project includes both frontend and backend, offering a smooth shopping experience with authentication, cart management, and secure API layers.

---

## ✨ Features

### 🛍️ **Frontend (Next.js)**

* Modern, responsive UI using **Tailwind CSS**
* **Product Listing** with filtering, searching & sorting
* **Product Details** with image, price, rating, description
* **Cart Sidebar** with quantity update, remove item, total calculation
* **Checkout Page** with form validation
* **Protected Routes** (checkout, orders)
* Smooth animations using **Framer Motion**
* Icons integrated via **React Icons**
* Optimized API fetching using **React Query**

### 🔐 **Backend (Express.js + MongoDB)**

* Full REST API for products, users, orders
* Secure **JWT authentication**
* Login/Register via cookies-based auth (HTTP‑Only)
* **MongoDB** with Mongoose models
* Password hashing with **bcrypt**
* Order placement & storage
* Error handling & middleware

---

## 🧰 Tech Stack

### **Frontend**

* Next.js (JavaScript)
* Tailwind CSS
* React Query
* Framer Motion
* React Icons
* Cookies for client‑side auth

### **Backend**

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Cookie‑Parser
* bcrypt

---

## 🎯 Project Scope

This is a **personal full‑stack project** built to showcase strong frontend + backend skills in a resume or portfolio. It demonstrates:

* Real-world authentication with JWT + cookies
* Full CRUD operations
* Frontend + Backend integration
* State management with React Query
* Modern UI with Tailwind + Framer Motion animations
* Secure order handling via Express.js & MongoDB

### 🔑 Admin Login (for testing)

**Email:** [sparkgear@gmail.com](sparkgear@gmail.com)
**Password:** 123456

### 🌐 Live Website

**Frontend URL:** [https://spark-gear-six.vercel.app](https://spark-gear-six.vercel.app)
**Backend URL:** [https://spark-gear-server.vercel.app](https://spark-gear-server.vercel.app)

---

## ⚙️ Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/Sifat-Ikram/spark-gear-ecommerce.git
cd gadgets-ecommerce
```

### **2. Setup Backend**

```bash
cd backend
npm install

# Add .env file
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

Start backend:

```bash
npm run dev
```

Backend runs at: **[http://localhost:5000](http://localhost:5000)**

### **3. Setup Frontend**

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🛒 How the Website Works (Flow)

### **🔎 1. Browse Gadgets**

Users can explore gadgets with filters:

* Category
* Price range
* Rating
* Search by title

### **🛍️ 2. Add to Cart**

* Items added to a right‑side cart drawer
* Update quantity
* See live total calculation

### **🔐 3. Login / Register**

* JWT stored in **HTTP‑Only cookies**
* Secure auth-protected routes

### **🧾 4. Checkout**

* Form validation with React Hook Form
* Order stored in MongoDB
* User can view placed orders

---

## 📦 Build for Production

### Backend

```bash
npm run build
npm start
```

### Frontend

```bash
npm run build
npm start
```

---

## 🔮 Future Improvements

* Admin dashboard (CRUD products)
* Payment gateway (Stripe)
* Real-time inventory
* Product reviews system
* Wishlist

---

## 👤 Author

**Md. Sifat Ikram**
Portfolio: https://sifat-ikram-portfolio.vercel.app/
GitHub: https://github.com/sifat-Ikram/
Email: sifatikram@gmail.com

Feel free to fork, contribute, and customize!
