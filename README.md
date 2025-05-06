# 🛒 GeoMart - Frontend

Welcome to the **GeoMart** frontend — a modern, responsive e-commerce platform built with **Next.js**, **React**, and **Tailwind CSS**. This app allows users to browse products, manage a cart, update profiles, and securely checkout using PayPal.

## 🔗 Live Demo
[GeoMart](https://geomart.co.uk)  
[Backend Repo](https://github.com/Nitinnannapaneni20/GeoMart-Backend)

---

## ⚙️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0)
![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal)

---

## 📁 Project Structure

```
GeoMart-Frontend/
├── components/ # Reusable UI components (Navbar, ProductCard, etc.)
├── pages/ # Next.js pages (Home, Profile, Checkout)
├── services/APIs.tsx # Centralized API calls
├── styles/ # Global styles (Tailwind config)
└── utils/ # LocalStorage and helper functions
```

---

## 🚀 Features

- 🔐 **Auth0 Integration** for secure login
- 🧾 **User Profile**: Fetch and update user details (email, phone, address)
- 🛒 **Shared Cart System**: Add/update/remove items, persist using `localStorage`
- 💳 **Checkout with PayPal**: Integrated payment flow on separate `/checkout` page
- 📦 **Order History**: Retrieve from backend
- 📡 **Central API Service**: Handles all fetch/POST requests to backend
- ⚡ **Fast UI** using Tailwind and responsive components

---

## 🧠 User Flow

1. **Login** via Auth0 → user is redirected to home
2. Auth0 `sub`, `email`, and name details are sent to backend to **create/check** the user
3. On visiting **/profile**, frontend fetches user details from backend using `sub`
4. Profile updates are sent via a PUT request
5. Cart is managed locally and shared across pages
6. Checkout button redirects to `/checkout` and initiates **PayPal** payment
7. Order details are stored via backend upon successful payment

---

## 🛠️ Installation & Development

### 🔧 Prerequisites

- Node.js >= 18.x
- NPM or Yarn
- Auth0 account and domain setup
- PayPal developer credentials

### 📦 Setup

```bash
git clone https://github.com/Nitinnannapaneni20/GeoMart-Frontend.git
cd GeoMart-Frontend
npm install
```

### 🔐 Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_BACKEND_URL=http://localhost:8080
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id
```

Replace values with your actual credentials.

### ▶️ Run the App

```bash
npm run dev
```

App runs locally on http://localhost:3000

---

## 🔄 API Integration

The frontend interacts with a Go backend via endpoints like:

- POST `/api/user/add` → create/check user
- POST `/api/profile/get` → fetch user profile
- PUT `/api/profile/update` → update profile
- POST `/api/orders/save` → store order info

All API calls are managed via `services/APIs.tsx`.

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a pull request 🚀

---

By [@Nitinnannapaneni20](https://github.com/Nitinnannapaneni20)