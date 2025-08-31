🛒 E-Commerce App
📌 Overview

A full-stack E-Commerce Web Application built with Node.js, Express.js, MongoDB (Mongoose), and EJS templates.
It provides features like product listing, cart management, authentication, and a payment gateway using PayU Money.


🚀 Features

🔑 User Authentication (Login / Signup with JWT / Passport)
🛍️ Product Listings with categories
🛒 Shopping Cart (add, update, remove items)
💳 Payment Gateway (PayU Money Sandbox for testing)
👩‍💻 Admin Dashboard (add/edit/delete products)
🎨 EJS Templates for dynamic views


🛠️ Tech Stack

Backend: Node.js, Express.js
Frontend: EJS, CSS, Bootstrap
Database: MongoDB (Mongoose)
Authentication: Passport.js / JWT
Payment Gateway: PayU Money


⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app

2.Install dependencies
npm install

3.Set up environment variables (.env)
PORT=8080
MONGO_URI=your_mongo_connection
MERCHANT_KEY=your_payu_key
MERCHANT_SALT=your_payu_salt
SESSION_SECRET=your_secret

4.Seed the database (optional)
node seed.js

5.Run the server
npm start

6.Open in browser:
http://localhost:8080


🌍 Deployment
Deployed on Render 
👉 Live Demo: [https://ecommerce-geyh.onrender.com]
