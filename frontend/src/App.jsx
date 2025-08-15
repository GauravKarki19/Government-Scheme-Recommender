import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/layout/Layout'
import ModernHome from './components/pages/ModernHome'
import About from './components/pages/About'
import FAQ from './components/pages/FAQ'
import Contact from './components/pages/Contact'
import EducationSchemes from './components/pages/EducationSchemes'
import HealthSchemes from './components/pages/HealthSchemes'
import HousingSchemes from './components/pages/HousingSchemes'
import SeniorCitizenSchemes from './components/pages/SeniorCitizenSchemes'
import WomenChildrenSchemes from './components/pages/WomenChildrenSchemes'
import FinancialAidSchemes from './components/pages/FinancialAidSchemes'
import CheckEligibility from './components/pages/CheckEligibility'
import StatusCheck from './components/pages/StatusCheck'
import Login from './components/pages/Login'
import Signup from './components/pages/Signup'
import MySchemes from './components/pages/MySchemes'
import BrowseSchemes from './components/pages/BrowseSchemes'
import { useAuth } from './context/AuthContext'

function Protected({ children }) {
  const { token, loading } = useAuth();
  if (loading) return null;
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Routes>
      {/* Public routes (auth pages render without Layout for full-screen centered forms) */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Eligibility & Status Routes - Rendered outside Layout */}
      <Route path="/check-eligibility" element={<CheckEligibility />} />
      <Route path="/check-status" element={<StatusCheck />} />
      
      {/* Protected */}
      <Route path="/my-schemes" element={<Layout><Protected><MySchemes /></Protected></Layout>} />
      <Route path="/browse-schemes" element={<Layout><Protected><BrowseSchemes /></Protected></Layout>} />

      {/* All other routes wrapped in Layout */}
      <Route path="/" element={<Layout><ModernHome /></Layout>} />
      <Route path="/about" element={<Layout><About /></Layout>} />
      <Route path="/faq" element={<Layout><FAQ /></Layout>} />
      <Route path="/contact" element={<Layout><Contact /></Layout>} />
      
      {/* Scheme Routes */}
      <Route path="/schemes" element={<Layout><ModernHome /></Layout>} />
      <Route path="/categories/education" element={<Layout><EducationSchemes /></Layout>} />
      <Route path="/categories/health" element={<Layout><HealthSchemes /></Layout>} />
      <Route path="/categories/housing" element={<Layout><HousingSchemes /></Layout>} />
      <Route path="/categories/senior" element={<Layout><SeniorCitizenSchemes /></Layout>} />
      <Route path="/categories/women-children" element={<Layout><WomenChildrenSchemes /></Layout>} />
      <Route path="/categories/financial" element={<Layout><FinancialAidSchemes /></Layout>} />
    </Routes>
  );
}

export default App
