# 🍖 Ribshack Customer App

A mobile-first customer ordering app for Ribshack Filipino BBQ.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

**Demo login:** `juan.delacruz@email.com` / `Password123`

---

## 📁 Folder Structure

```
ribshack-customer-app/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx              ← App entry point
    ├── App.jsx               ← Router + Providers
    │
    ├── context/
    │   ├── AuthContext.jsx   ← Login / register / logout
    │   ├── CartContext.jsx   ← Cart state & totals
    │   └── BranchContext.jsx ← Selected branch state
    │
    ├── data/
    │   ├── menuData.js       ← Menu items
    │   ├── categoriesData.js ← Food categories
    │   ├── branchesData.js   ← Branch locations + cities
    │   ├── promosData.js     ← Promo banners
    │   └── userData.js       ← Mock users, addresses, orders
    │
    ├── layout/
    │   ├── BottomNav.jsx     ← Mobile bottom navigation bar
    │   └── TopBar.jsx        ← Inner-page top header with back button
    │
    ├── pages/
    │   ├── LoginPage.jsx         ← Sign in & create account
    │   ├── HomePage.jsx          ← Dashboard, promos, bestsellers
    │   ├── MenuPage.jsx          ← Full menu, search, filters
    │   ├── CartPage.jsx          ← Cart with quantity controls
    │   ├── BranchSelectorPage.jsx ← Branch picker by city
    │   ├── CheckoutPage.jsx      ← Address, payment, summary
    │   ├── OrderTrackingPage.jsx ← Live order status stepper
    │   └── ProfilePage.jsx       ← User profile & order history
    │
    ├── styles/
    │   └── global.css        ← CSS variables, fonts, animations
    │
    └── utils/
        ├── formatters.js     ← formatPrice, formatDate, etc.
        └── validators.js     ← validateEmail, validatePassword, etc.
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary (Ember) | `#E8390E` |
| Accent (Gold) | `#F59E0B` |
| Background | `#1A1007` (dark) |
| Font Display | Syne 700/800 |
| Font Body | DM Sans 300–700 |

---

## 🔗 Routes

| Path | Page |
|------|------|
| `/login` | Login / Register |
| `/branches` | Branch Selector |
| `/home` | Home Dashboard |
| `/menu` | Menu Listing |
| `/cart` | Cart |
| `/checkout` | Checkout |
| `/order-tracking/:id` | Order Tracking |
| `/profile` | Profile & Orders |
