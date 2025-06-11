# 🔐 Next.js JWT Authentication App

This project is a **JWT-based Authentication App built using Next.js**. I built it as a **revision project** to sharpen my full-stack development skills using Next.js. Through this, I learned how to manage both the frontend and backend entirely within Next.js, including API routes, server-side logic, and secure email features.

## 📚 Key Things I Learned

- 📁 How to organize a clean and scalable **file structure** in a Next.js full-stack app.
- 🔐 Implementing **JWT authentication** with access and refresh tokens.
- 📦 Writing full-stack logic including **backend APIs** inside the Next.js project itself.
- 📧 Sending emails using **Nodemailer**.
- 🧪 Using **Mailtrap** to test email delivery safely in development.
- 🛡️ Creating secure flows for **sign-up verification**, **login**, **forgot password**, and **reset password**.

## ✨ Features

- ✅ User Signup
- ✅ Email Verification
- ✅ User Login
- ✅ Forgot Password (via email)
- ✅ Reset Password (via email)

## 🛠️ Tech Stack

- **Next.js (App Router)**
- **MongoDB with Mongoose**
- **JWT (jsonwebtoken)**
- **Nodemailer**
- **Mailtrap**
- **Tailwind CSS** 

## 🚀 Getting Started Locally

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Ankit-Gope007/Next-Auth.git
   cd next-auth
   ```
2.	**Install dependencies:**
     ```bash
     npm install
     ```
3. **Create a .env.local file and add the following variables:**
    ```bash
    MONGODB_URI=your_mongo_db_connection_string
    TOKEN_SECRET=your_jwt_secret
    DOMAIN=http://localhost:3000
    MAIL_USER=your_mailtrap_username
    MAIL_PASS=your_mailtrap_password
    MAIL_FROM=YourApp <noreply@yourapp.com>
    ```
4.	**Run the development server:**
    ```bash
    npm run dev
    ```
## 📝 Final Notes
**This project was built from scratch as a hands-on way to revise key concepts in full-stack development using Next.js. It covers everything from secure API routes and email integration to user authentication flows. It’s a solid base for any production-ready auth system and helped me deeply understand how to build one inside the Next.js framework.**
