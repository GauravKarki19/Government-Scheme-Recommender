import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import './index.css';
import ModernHome from './components/pages/ModernHome';
import CheckEligibility from './components/pages/CheckEligibility';
import './i18n';
import { I18nextProvider } from 'react-i18next';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ModernHome />} />
          <Route path="/check-eligibility" element={<CheckEligibility />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </AppProvider>
  </React.StrictMode>
);