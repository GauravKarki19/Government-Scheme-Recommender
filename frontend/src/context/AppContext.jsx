import { createContext, useState, useEffect, useContext } from 'react';
import { fetchTranslations, fetchLocations } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  // Initialize language from localStorage or default to English
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'english';
  });
  const [translations, setTranslations] = useState(null);
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [translationsData, locationsData] = await Promise.all([
          fetchTranslations(),
          fetchLocations()
        ]);
        
        setTranslations(translationsData);
        setLocations(locationsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load application data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Save language preference to localStorage and log changes
  useEffect(() => {
    console.log('AppContext - Language changed to:', language);
    localStorage.setItem('language', language);
    
    // Update HTML lang attribute for accessibility
    document.documentElement.lang = language === 'hindi' ? 'hi' : 'en';
    
    // You could also update the document title based on language
    if (translations && translations[language] && translations[language].siteTitle) {
      document.title = translations[language].siteTitle;
    }
  }, [language, translations]);
  
  // Function to change language
  const changeLanguage = (newLanguage) => {
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
  };
  
  const value = {
    language,
    setLanguage,
    changeLanguage,
    translations,
    locations,
    loading,
    error
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};