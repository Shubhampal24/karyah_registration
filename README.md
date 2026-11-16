# Karyah – 3D Civil & Construction Professional Registration Platform

## What this app does
- Shows a beautiful **3D profession-selection grid** with 20 construction/interior trades
- User clicks a profession → enters mobile number → registered instantly
- All data saved to **local storage** + downloadable as **Excel**
- **Google Sheets** auto-sync (optional — see setup guide)
- Password-protected **Admin Dashboard** with search, stats, Excel download

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Opens at http://localhost:3000
```

---

## Project Structure

```
karyah_proffesion/
├── src/
│   ├── components/        # Header, ProfessionCard, Grid, Modals, Footer
│   ├── sections/          # ProfessionSelection, HowItWorks, About
│   ├── pages/             # Home, AdminLogin, AdminDashboard
│   ├── three/             # 3D lights, 20 unique diorama models, Canvas
│   ├── hooks/             # useProfessions, useRegistration
│   ├── services/          # store.js (localStorage + Excel export)
│   ├── data/              # professions.js (20 professions, configurable)
│   └── styles/            # index.css (Tailwind base)
├── google-apps-script/
│   └── Code.gs            # Google Apps Script for Sheets integration
├── GOOGLE_SHEETS_SETUP.md # Step-by-step guide to connect Google Sheets
├── .env                   # VITE_GOOGLE_SCRIPT_URL goes here
└── package.json
```

---

## Admin Dashboard

- URL: Click **Admin** in the navigation bar
- Password: `karyah2026`
- Features: Total stats, searchable table, Excel download

---

## Connect to Google Sheets (optional)

See **GOOGLE_SHEETS_SETUP.md** for step-by-step instructions.

---

## Tech Stack

- **React 18** + **Vite** (frontend)
- **Tailwind CSS** (styling)
- **Three.js** + **React Three Fiber** + **Drei** (3D visuals)
- **Framer Motion** (animations)
- **SheetJS (xlsx)** (Excel export)
- **LocalStorage** (data persistence)
- **Google Apps Script** (optional Google Sheets sync)

---

## Build for Production

```bash
npm run build
# Output in /dist — deploy to Vercel, Netlify, or any static host
```
