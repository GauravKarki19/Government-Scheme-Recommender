import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaGlobeAsia, FaBars, FaTimes, FaSearch, FaChevronDown, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import LogoutButton from '../common/LogoutButton';

const Header = ({ transparent = false }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage || i18n.language || 'en';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [schemesDropdownOpen, setSchemesDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSchemesDropdown = () => {
    setSchemesDropdownOpen(!schemesDropdownOpen);
  };

  // Function to scroll to schemes section
  const scrollToSchemes = () => {
    const schemesSection = document.getElementById('schemes-section');
    if (schemesSection) {
      schemesSection.scrollIntoView({ behavior: 'smooth' });
    }
    setSchemesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const { user, logout } = useAuth();

  return (
    <header className="relative z-50">
      {/* Background image only for non-transparent header */}
      {!transparent && (
        <div className="absolute inset-0 bg-cover bg-center" style={{ 
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url("https://img.freepik.com/free-photo/view-woman-working-agricultural-sector-celebrate-labour-day-women_23-2151252039.jpg?t=st=1747853623~exp=1747857223~hmac=fa6be5142aef643285de9afb6eeddfe0a47754ed239ea330b8f30580d160ed3c&w=1380")',
          backgroundPosition: 'center 60%'
        }}></div>
      )}
      
      {/* Main header with title and navigation */}
      <div className="relative text-white backdrop-blur-sm bg-black/5 border-b border-white/10">
        <div className="container-custom py-4 sm:py-7">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="flex items-center group">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-2 sm:mr-3 shadow-md group-hover:bg-blue-700 transition-all duration-300 transform group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="hidden sm:block">
                <span className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors">{t('brandTitle')}</span>
                <div className="text-xs text-gray-200">{t('brandSubtitle')}</div>
              </div>
              <div className="sm:hidden">
                <span className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">Gov Schemes</span>
              </div>
            </NavLink>
            
            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
            
            <nav className="hidden md:flex items-center space-x-6">
              {/* Schemes dropdown */}
              <div className="relative">
                <button 
                  onClick={toggleSchemesDropdown}
                  className="flex items-center px-3 py-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <span className="font-medium">{t('schemes')}</span>
                  <FaChevronDown className={`ml-1 text-xs transition-transform duration-200 ${schemesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {schemesDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">
                    <button 
                      onClick={scrollToSchemes}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {t('allSchemes')}
                    </button>
                    <Link 
                      to="/categories/education" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categoryEducation')}
                    </Link>
                    <Link 
                      to="/categories/health" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categoryHealth')}
                    </Link>
                    <Link 
                      to="/categories/housing" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categoryHousing')}
                    </Link>
                    <Link 
                      to="/categories/senior" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categorySenior')}
                    </Link>
                    <Link 
                      to="/categories/women-children" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categoryWomen')}
                    </Link>
                    <Link 
                      to="/categories/financial" 
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setSchemesDropdownOpen(false)}
                    >
                      {t('categoryFinancial')}
                    </Link>
                  </div>
                )}
              </div>
              
              <NavLink
                to="/about"
                className={({ isActive }) => 
                  isActive 
                    ? 'px-3 py-2 bg-white/20 text-white font-medium rounded-lg' 
                    : 'px-3 py-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-200'
                }
              >
                {t('about')}
              </NavLink>
              
              <NavLink
                to="/faq"
                className={({ isActive }) => 
                  isActive 
                    ? 'px-3 py-2 bg-white/20 text-white font-medium rounded-lg' 
                    : 'px-3 py-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-200'
                }
              >
                {t('faq')}
              </NavLink>
              
              <NavLink
                to="/contact"
                className={({ isActive }) => 
                  isActive 
                    ? 'px-3 py-2 bg-white/20 text-white font-medium rounded-lg' 
                    : 'px-3 py-2 text-white hover:text-blue-200 hover:bg-white/10 rounded-lg transition-all duration-200'
                }
              >
                {t('contact')}
              </NavLink>
              
              <div className="flex items-center ml-4 px-3 py-1.5 bg-white/10 rounded-lg border border-white/20">
                <FaGlobeAsia className="text-white mr-2 text-sm" />
                <select
                  value={language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="text-sm border-none bg-transparent focus:ring-0 text-white cursor-pointer"
                >
                  <option value="en" className="text-gray-800">{t('english')}</option>
                  <option value="hi" className="text-gray-800">{t('hindi')}</option>
                </select>
              </div>
              
              {!user ? (
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Link to="/login" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-3 lg:px-4 py-2 rounded-md shadow-button text-sm lg:text-base h-10 flex items-center justify-center whitespace-nowrap">{t('login')}</Link>
                  <Link to="/signup" className="px-3 lg:px-4 py-2 rounded-md border border-white/30 text-white/90 hover:text-white hover:bg-white/10 text-sm lg:text-base h-10 flex items-center justify-center whitespace-nowrap">{t('signUp')}</Link>
                </div>
              ) : (
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Link to="/browse-schemes" className="px-3 lg:px-4 py-2 rounded-md border border-white/30 text-white/90 hover:text-white hover:bg-white/10 text-sm lg:text-base h-10 flex items-center justify-center whitespace-nowrap">{t('browseSchemes')}</Link>
                  <Link to="/my-schemes" className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium px-3 lg:px-4 py-2 rounded-md text-sm lg:text-base h-10 flex items-center justify-center whitespace-nowrap">{t('mySchemes')}</Link>
                  <LogoutButton className="px-3 lg:px-4 py-2 rounded-md border border-white/30 text-white/90 hover:text-white hover:bg-white/10 text-sm lg:text-base h-10 flex items-center justify-center whitespace-nowrap" />
                </div>
              )}

            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu - simple slide down */}
      {mobileMenuOpen && (
        <div className="md:hidden relative bg-black/30 backdrop-blur-md border-b border-white/10 shadow-lg">
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-3">
              {/* Mobile Schemes dropdown */}
              <div>
                <button 
                  onClick={toggleSchemesDropdown}
                  className="w-full flex justify-between items-center py-2 text-white font-medium"
                >
                  <span>{t('schemes')}</span>
                  <FaChevronDown className={`text-xs transition-transform duration-200 ${schemesDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {schemesDropdownOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-white/20">
                    <button 
                      onClick={scrollToSchemes}
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                    >
                      {t('allSchemes')}
                    </button>
                    <Link 
                      to="/categories/education" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categoryEducation')}
                    </Link>
                    <Link 
                      to="/categories/health" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categoryHealth')}
                    </Link>
                    <Link 
                      to="/categories/housing" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categoryHousing')}
                    </Link>
                    <Link 
                      to="/categories/senior" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categorySenior')}
                    </Link>
                    <Link 
                      to="/categories/women-children" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categoryWomen')}
                    </Link>
                    <Link 
                      to="/categories/financial" 
                      className="block py-2 text-gray-300 hover:text-blue-300 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('categoryFinancial')}
                    </Link>
                  </div>
                )}
              </div>
              
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300 transition-colors'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('about')}
              </NavLink>
              
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300 transition-colors'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('faq')}
              </NavLink>
              
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-blue-300 font-medium' : 'text-white hover:text-blue-300 transition-colors'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </NavLink>
              
              <div className="flex items-center justify-between py-2 mt-2 border-t border-white/10 pt-4">
                <div className="flex items-center">
                  <FaGlobeAsia className="text-white mr-2 text-sm" />
                  <span className="text-white text-sm mr-2">{t('language')}:</span>
                </div>
                <select
                  value={language}
                  onChange={(e) => {
                    console.log('Mobile menu - Language changed to:', e.target.value);
                    i18n.changeLanguage(e.target.value);
                    // Close mobile menu after changing language
                    setTimeout(() => setMobileMenuOpen(false), 300);
                  }}
                  className="text-sm border border-white/20 bg-white/10 rounded px-2 py-1 focus:ring-0 text-white cursor-pointer"
                >
                  <option value="en" className="text-gray-800">{t('english')}</option>
                  <option value="hi" className="text-gray-800">{t('hindi')}</option>
                </select>
              </div>
              
              {!user ? (
                <div className="mt-4 space-y-3">
                  <Link 
                    to="/login"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center shadow-md h-12 whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('login')}
                  </Link>
                  <Link 
                    to="/signup"
                    className="border border-white/30 text-white/90 hover:text-white hover:bg-white/10 font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center h-12 whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('signUp')}
                  </Link>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <Link 
                    to="/browse-schemes"
                    className="border border-white/30 text-white/90 hover:text-white hover:bg-white/10 font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center h-12 whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('browseSchemes')}
                  </Link>
                  <Link 
                    to="/my-schemes"
                    className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center shadow-md h-12 whitespace-nowrap"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t('mySchemes')}
                  </Link>
                  <LogoutButton className="border border-white/30 text-white/90 hover:text-white hover:bg-white/10 font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center h-12 whitespace-nowrap" />
                </div>
              )}
              
              <Link 
                to="/check-eligibility"
                className="mt-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors w-full flex justify-center items-center shadow-md border border-white/20"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FaSearch className="mr-2" size={14} />
                {t?.checkEligibility || "Check Eligibility"}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;