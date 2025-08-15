import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HeroSection from '../HeroSection';
import PartnerLogos from '../PartnerLogos';
import FeatureSection from '../FeatureSection';
import SchemeCategories from '../SchemeCategories';
import HowItWorks from '../HowItWorks';
import SchemeResults from '../SchemeResults';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { FaSearch } from 'react-icons/fa';
import { checkEligibility, fetchSchemes } from '../../services/api';

const ModernHome = () => {
  const { loading, error } = useAppContext();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.resolvedLanguage || i18n.language || 'en';
  const location = useLocation();
  const [userDetails, setUserDetails] = useState({
    age: '',
    income: '',
    occupation: '',
    caste: '',
    gender: '',
    state: '',
    district: ''
  });
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [isLoadingBookmarkedSchemes, setIsLoadingBookmarkedSchemes] = useState(false);

  // Check for schemes in URL parameters (for bookmarked pages)
  useEffect(() => {
    const checkForBookmarkedSchemes = async () => {
      const params = new URLSearchParams(location.search);
      const schemeIds = params.get('schemes');

      if (schemeIds) {
        setIsLoadingBookmarkedSchemes(true);
        try {
          const allSchemes = await fetchSchemes();
          const bookmarkedSchemeIds = schemeIds.split(',');
          let bookmarkedSchemes = allSchemes.filter(scheme =>
            bookmarkedSchemeIds.includes(scheme.id.toString())
          );

          const refs = params.get('refs');
          if (refs && bookmarkedSchemes.length > 0) {
            const referenceUrls = refs.split(',').map(ref => decodeURIComponent(ref));
            bookmarkedSchemes = bookmarkedSchemes.map((scheme, index) => {
              if (index < referenceUrls.length && !scheme.link) {
                return { ...scheme, link: referenceUrls[index] };
              }
              return scheme;
            });
          }

          if (bookmarkedSchemes.length > 0) {
            setEligibleSchemes(bookmarkedSchemes);
            setShowResults(true);
          }
        } catch (error) {
          console.error('Error loading bookmarked schemes:', error);
          setApiError(t('failedToLoadBookmarked', 'Failed to load bookmarked schemes. Please try again.'));
        } finally {
          setIsLoadingBookmarkedSchemes(false);
        }
      }
    };

    checkForBookmarkedSchemes();
  }, [location.search, t]);

  if (loading || isLoadingBookmarkedSchemes) return <Loading />;
  if (error) return <Error message={String(error)} />;
  if (apiError) return <Error message={apiError} />;

  const handleCheckEligibility = async () => {
    try {
      setIsSubmitting(true);
      setApiError(null);
      const schemes = await checkEligibility(userDetails);
      setEligibleSchemes(schemes);
      setShowResults(true);
    } catch (err) {
      setApiError(t('failedCheckEligibility', 'Failed to check eligibility. Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportResults = () => {
    let text = `${t('title', 'Government Scheme Eligibility Assistant')}\n\n`;
    text += `${t('results', 'Your Eligible Schemes')}:\n`;
    eligibleSchemes.forEach(scheme => {
      const name = scheme.name?.[currentLang === 'hi' ? 'hindi' : 'english'] || '';
      const desc = scheme.description?.[currentLang === 'hi' ? 'hindi' : 'english'] || '';
      text += `- ${name}: ${desc}\n`;
      text += `  ${scheme.link}\n\n`;
    });
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eligible-schemes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    if (navigator.share) {
      let text = `${t('title', 'Government Scheme Eligibility Assistant')}\n\n`;
      text += `${t('results', 'Your Eligible Schemes')}:\n`;
      eligibleSchemes.forEach(scheme => {
        const name = scheme.name?.[currentLang === 'hi' ? 'hindi' : 'english'] || '';
        const desc = scheme.description?.[currentLang === 'hi' ? 'hindi' : 'english'] || '';
        text += `- ${name}: ${desc}\n`;
        text += `  ${scheme.link}\n\n`;
      });
      navigator.share({ title: t('title', 'Government Scheme Eligibility Assistant'), text }).catch(() => {});
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  const goBack = () => setShowResults(false);

  return (
    <div>
      {showResults ? (
        <div className="container-custom py-8">
          <SchemeResults
            eligibleSchemes={eligibleSchemes}
            exportResults={exportResults}
            shareResults={shareResults}
            goBack={goBack}
          />
        </div>
      ) : (
        <>
          <HeroSection />
          <div className="bg-white">
            <PartnerLogos />
            <FeatureSection />
          
            <div className="bg-gray-50 py-16">
              <div className="container-custom">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('checkYourEligibility', 'Check Your Eligibility')}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {t('findOutSchemes', 'Find out which government schemes you qualify for based on your profile.')}
                  </p>
                </div>
                
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                      <FaSearch className="text-blue-600 text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('personalizedMatching', 'Personalized Scheme Matching')}</h3>
                    <p className="text-gray-600 mb-6">
                      {t('eligibilityCheckerDesc', 'Our eligibility checker matches your profile with hundreds of government schemes to find the ones you qualify for.')}
                    </p>
                  </div>
                  
                  <Link 
                    to="/check-eligibility" 
                    className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                  >
                    {t('goToEligibilityChecker', 'Go to Eligibility Checker')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            <SchemeCategories />
            <HowItWorks />
          </div>
        </>
      )}
    </div>
  );
};

export default ModernHome;
