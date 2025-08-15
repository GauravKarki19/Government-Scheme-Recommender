# Repository Overview

- Name: Government-SchemeChecker--master
- Root: c:\Users\Megha Karki\Downloads\Government-SchemeChecker--master
- Apps:
  - frontend (Vite + React 18, TailwindCSS)
  - server (Express)

## Frontend
- Entry: frontend/src/main.jsx
- Router: react-router-dom v6
- State/Context: custom AppContext (loads translations and locations), plus react-i18next added
- i18n: i18next + react-i18next + browser language detector
  - Initialization file: frontend/src/i18n/index.js
  - Strategy: bundled resources (no HTTP loading)
  - Supported languages: en, hi

### Key Components
- Layout: frontend/src/components/layout/Layout.jsx
- Header: frontend/src/components/layout/Header.jsx (migrated to react-i18next)
- Pages: frontend/src/components/pages/*

### Commands (run from frontend directory)
- npm run dev — start Vite dev server
- npm run build — build production bundle
- npm run preview — preview build
- npm run start — concurrently starts frontend dev and backend dev (uses concurrently)

## Backend
- Entry: server/index.js
- Scripts: npm run dev (nodemon), npm start (node)

## Notes
- AppContext still fetches translations and locations; Header now uses i18next. You can migrate other components incrementally to use useTranslation().
- Language persistence for i18next uses localStorage key `i18nextLng` via i18next-browser-languagedetector.