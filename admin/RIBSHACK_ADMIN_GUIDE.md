# 🍖 Ribshack Admin Dashboard - User Guide

## Overview
The Ribshack HQ Admin Dashboard is a comprehensive control center for managing the entire Ribshack restaurant chain across the Visayas region of the Philippines.

## Demo Credentials
- **Username:** `admin`
- **Password:** `ribshack2024`

## Features

### 1. **Global Analytics** (`/admin/analytics`)
Real-time performance metrics across all branches:
- Total Revenue tracking (monthly and YTD)
- Total Orders with growth metrics
- Active Branches count
- Profit Margin analysis
- Revenue trend charts (6-month view)
- Sales by category (Pie chart showing Pork, Chicken, Beef, Korean BBQ, Seafood, Drinks)
- Top performing branches with detailed metrics
- Branch performance comparison tables

**Key Metrics Displayed:**
- ₱398,000 June revenue (+12.5% growth)
- 1,990 total orders
- 12 active branches
- 28.5% profit margin

### 2. **Branch Management** (`/admin/branches`)
Complete CRUD operations for Ribshack locations:
- **Add New Branch:** Create location + store account in one step
- **Edit Branch:** Update details, manager info, and credentials
- **Delete Branch:** Remove branch and associated store account
- **Real-time Stats:** Today's revenue and order count per branch

**Branch Information Includes:**
- Branch name and location
- City selection (Bacolod, Iloilo, Cebu, Dumaguete, Tacloban)
- Branch manager details
- Contact phone number
- Store account credentials (username/password)
- Open/Closed status
- Daily performance metrics

**Current Branches:**
- SM Bacolod (sm_bacolod_user)
- Lacson Street (lacson_user)
- Iloilo City Mall (iloilo_user)
- Ayala Center (ayala_user)

### 3. **Request Center** (`/admin/requests`)
Central inbox for branch inventory requests:
- **Pending Requests:** High-priority restock alerts
- **Approve/Decline:** Two-click action with admin notes
- **Request Details:** 
  - Item quantities (Rice sacks, Pork, Chicken, Seafood, etc.)
  - Priority levels (High/Medium/Low)
  - Branch notes and special instructions
- **History Tracking:** Approved/Declined requests with timestamps
- **Status Dashboard:** Count of pending, approved, and declined requests

**Sample Request:**
```
Branch: Lacson Street
Items: 10 sacks of Rice, 25kg Pork Spare Ribs
Priority: HIGH
Notes: "Running low on rice. Need urgent delivery for lunch rush."
```

### 4. **Product Catalog** (`/admin/products`)
Global menu management across all 8 food categories:

**Categories:**
- 🥓 Pork (Spare Ribs ₱199, BBQ Skewers ₱89, Belly Strips ₱149)
- 🍗 Chicken (Inasal Pecho ₱129, Inasal Paa ₱119, Wings ₱99)
- 🥩 Beef (Brisket ₱249, Short Ribs ₱279)
- 🇰🇷 Korean BBQ (Pork Bulgogi ₱189, Beef Bulgogi ₱229)
- 🦐 Seafood (Blue Marlin ₱259, Squid ₱169, Prawns ₱199)
- 🥤 Drinks (Iced Tea ₱39, Soft Drinks ₱45, Water ₱25)

**Features:**
- Add/Edit/Delete products
- Set pricing in Philippine Pesos (₱)
- Toggle "Unli-Rice" eligibility per item
- Category filtering
- Product descriptions
- Average price calculation

### 5. **Finance & VAT Reports** (`/admin/finance`)
Complete financial analytics and tax compliance:

**Financial Metrics:**
- Monthly Gross Sales tracking
- YTD Revenue (₱1,898,000 for Jan-Jun 2026)
- VAT Collection (12% on all sales)
- Net Profit with margin analysis
- Expense tracking

**Reports Include:**
- Monthly Financial Summary (Gross Sales, VAT, Net Sales, Expenses, Profit)
- Branch Financial Performance (individual P&L per location)
- VAT Compliance Report (filing status and deadlines)
- Revenue & Profit Trend Charts
- Expense Breakdown Visualization

**Export Options:**
- Sales Summary (CSV for Excel)
- VAT Report (PDF for BIR filing)
- Financial Statement (Complete P&L)
- BIR Form Generation

**Tax Compliance:**
- Automatic 12% VAT calculation
- Monthly filing status tracking
- BIR-ready export formats
- Historical compliance records

## Navigation Structure

```
Login Page (/)
  ↓
Admin Dashboard (/admin)
  ├── Global Analytics (/admin/analytics) - Default landing page
  ├── Branch Management (/admin/branches)
  ├── Request Center (/admin/requests)
  ├── Product Catalog (/admin/products)
  └── Finance & VAT (/admin/finance)
```

## Key Workflows

### Creating a New Branch
1. Click "Add New Branch" button
2. Fill in branch details (name, address, city)
3. Enter manager information
4. Create store account credentials
5. Set initial status (Open/Closed)
6. System creates both branch and store account simultaneously

### Processing Inventory Requests
1. View pending requests in Request Center
2. Review items, quantities, and priority
3. Click "Approve" or "Decline"
4. Add admin notes (delivery schedule, supplier info, etc.)
5. System updates branch database automatically

### Managing Product Catalog
1. Navigate to Product Catalog
2. Filter by category if needed
3. Add new product or edit existing
4. Set price and Unli-Rice eligibility
5. Changes apply globally to all branches

### Generating Financial Reports
1. Go to Finance & VAT page
2. Review monthly summaries and charts
3. Check VAT compliance status
4. Export reports (Sales, VAT, P&L)
5. Use for accounting and BIR filing

## Security Features
- Login-only access (no registration)
- Session-based authentication
- Protected routes (auto-redirect to login)
- Secure logout functionality
- Admin-level permissions only

## Technical Stack
- **Frontend:** React (JSX)
- **Routing:** React Router v7 (Data Mode)
- **UI Components:** Radix UI + Custom Components
- **Styling:** Tailwind CSS v4
- **Charts:** Recharts
- **Icons:** Lucide React
- **Notifications:** Sonner Toast

## Data Features
- Mock data for demonstration
- Real-time state management
- Persistent login session (localStorage)
- CRUD operations for all entities
- Responsive design for mobile/desktop

## Future Enhancements (Production Ready)
- Backend API integration
- Real-time database sync
- Multi-user role management
- Push notifications for urgent requests
- Advanced analytics and forecasting
- Inventory management integration
- Customer app data sync
- Store dashboard integration

---

**Note:** This is a frontend demonstration with mock data. In production, this would connect to Supabase or another backend for real-time data synchronization, user authentication, and role-based access control.
