import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
import SchemeEligibilityForm from '../SchemeEligibilityForm';
import SchemeResults from '../SchemeResults';
import Loading from '../common/Loading';
import Error from '../common/Error';
import { checkEligibility, fetchSchemes } from '../../services/api';
import { FaSearch, FaUsers, FaFileAlt } from 'react-icons/fa';

const Home = () => {
  const { language, translations, loading, error } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
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
          // Fetch all schemes
          const allSchemes = await fetchSchemes();

          // Filter to only the bookmarked schemes
          const bookmarkedSchemeIds = schemeIds.split(',');
          let bookmarkedSchemes = allSchemes.filter(scheme =>
            bookmarkedSchemeIds.includes(scheme.id.toString())
          );

          // Check if there are reference URLs in the parameters
          const refs = params.get('refs');
          if (refs && bookmarkedSchemes.length > 0) {
            const referenceUrls = refs.split(',').map(ref => decodeURIComponent(ref));

            // Update schemes with reference URLs if available
            bookmarkedSchemes = bookmarkedSchemes.map((scheme, index) => {
              if (index < referenceUrls.length && !scheme.link) {
                return {
                  ...scheme,
                  link: referenceUrls[index]
                };
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
          setApiError(language === 'english'
            ? 'Failed to load bookmarked schemes. Please try again.'
            : 'बुकमार्क की गई योजनाओं को लोड करने में विफल। कृपया पुनः प्रयास करें।');
        } finally {
          setIsLoadingBookmarkedSchemes(false);
        }
      }
    };

    checkForBookmarkedSchemes();
  }, [location.search, language]);

  if (loading || isLoadingBookmarkedSchemes) return <Loading />;
  if (error) return <Error message={error} />;
  if (apiError) return <Error message={apiError} />;

  const t = translations[language];

  const handleCheckEligibility = async () => {
    try {
      setIsSubmitting(true);
      setApiError(null);
      
      const schemes = await checkEligibility(userDetails);
      setEligibleSchemes(schemes);
      setShowResults(true);
    } catch (err) {
      setApiError('Failed to check eligibility. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const exportResults = () => {
    // Create a text representation of the results
    let text = `${t.title}\n\n`;
    text += `${t.results}:\n`;
    
    eligibleSchemes.forEach(scheme => {
      text += `- ${scheme.name[language]}: ${scheme.description[language]}\n`;
      text += `  ${scheme.link}\n\n`;
    });
    
    // Create a blob and download it
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
      let text = `${t.title}\n\n`;
      text += `${t.results}:\n`;
      
      eligibleSchemes.forEach(scheme => {
        text += `- ${scheme.name[language]}: ${scheme.description[language]}\n`;
        text += `  ${scheme.link}\n\n`;
      });
      
      navigator.share({
        title: t.title,
        text: text
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  // Bookmark functionality is now handled directly in the SchemeResults component

  return (
    <div>
      {/* Minimalist Hero Section */}
      <div className="hero mb-16 relative">
        <div className="hero-inner max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="hero-content text-center lg:text-left">
              <div className="inline-block px-3 py-1 bg-gov-blue bg-opacity-10 text-gov-blue text-sm font-medium rounded-full mb-4 sm:mb-6">
                {language === 'english' ? 'Government Initiative' : 'सरकारी पहल'}
              </div>
              
              <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                {t.subtitle || (language === 'english' ? 'Find Government Schemes You Are Eligible For' : 'आप जिन सरकारी योजनाओं के लिए पात्र हैं, उन्हें खोजें')}
              </h1>
              
              <p className="hero-subtitle text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
                {t.homeDescription || (language === 'english' ? "Discover welfare schemes tailored to your profile and needs. Check eligibility in minutes." : "अपने प्रोफ़ाइल और आवश्यकताओं के अनुसार कल्याणकारी योजनाओं का पता लगाएं। मिनटों में पात्रता की जांच करें।")}
              </p>
              
              <div className="hero-actions flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
                <a href="#eligibility-form" className="btn-primary inline-flex items-center justify-center px-6 py-3">
                  <span>{language === 'english' ? 'Check Eligibility' : 'पात्रता जांचें'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#how-it-works" className="btn-secondary inline-flex items-center justify-center px-6 py-3">
                  {language === 'english' ? 'Learn More' : 'अधिक जानें'}
                </a>
              </div>
            </div>
            
            {/* Creative Illustration */}
            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-gov-blue opacity-20"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-gov-orange opacity-20"></div>
                
                <div className="relative bg-white rounded-lg shadow-lg p-8 z-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gov-blue rounded-full mr-3"></div>
                      <div className="text-gray-700 flex-1">
                        {language === 'english' ? '100+ Available Schemes' : '100+ उपलब्ध योजनाएं'}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gov-green rounded-full mr-3"></div>
                      <div className="text-gray-700 flex-1">
                        {language === 'english' ? '30+ Government Departments' : '30+ सरकारी विभाग'}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gov-orange rounded-full mr-3"></div>
                      <div className="text-gray-700 flex-1">
                        {language === 'english' ? 'Simple Eligibility Check' : 'सरल पात्रता जांच'}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-gov-yellow rounded-full mr-3"></div>
                      <div className="text-gray-700 flex-1">
                        {language === 'english' ? 'Instant Results' : 'तत्काल परिणाम'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {apiError && <Error message={apiError} />}

      {!showResults ? (
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            <div className="lg:col-span-2" id="eligibility-form">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="inline-flex items-center text-sm text-gov-blue font-medium mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {language === 'english' ? 'Quick & Easy' : 'त्वरित और आसान'}
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {language === 'english' ? 'Enter Your Details' : 'अपना विवरण दर्ज करें'}
                </h2>
                
                <SchemeEligibilityForm
                  userDetails={userDetails}
                  setUserDetails={setUserDetails}
                  onSubmit={handleCheckEligibility}
                  isSubmitting={isSubmitting}
                />
                
                <div className="mt-6 flex items-center text-sm text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  {language === 'english' 
                    ? "Your data is secure and only used to check eligibility"
                    : "आपका डेटा सुरक्षित है और केवल पात्रता की जांच के लिए उपयोग किया जाता है"}
                </div>
              </div>
            </div>
            
            <div id="how-it-works">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <div className="inline-flex items-center text-sm text-gov-blue font-medium mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {language === 'english' ? 'Process Guide' : 'प्रक्रिया मार्गदर्शिका'}
                </div>
                
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {t.howItWorks || (language === 'english' ? "How It Works" : "यह कैसे काम करता है")}
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gov-blue bg-opacity-10 flex items-center justify-center mr-4">
                      <span className="text-gov-blue font-medium">1</span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {t.step1Title || (language === 'english' ? "Enter Your Details" : "अपना विवरण दर्ज करें")}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.step1Description || (language === 'english' ? "Fill in your personal information in the form." : "फॉर्म में अपनी व्यक्तिगत जानकारी भरें।")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gov-blue bg-opacity-10 flex items-center justify-center mr-4">
                      <span className="text-gov-blue font-medium">2</span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {t.step2Title || (language === 'english' ? "Check Eligibility" : "पात्रता जांचें")}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.step2Description || (language === 'english' ? "Our system matches your profile with available schemes." : "हमारी प्रणाली आपके प्रोफ़ाइल को उपलब्ध योजनाओं से मिलान करती है।")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gov-blue bg-opacity-10 flex items-center justify-center mr-4">
                      <span className="text-gov-blue font-medium">3</span>
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        {t.step3Title || (language === 'english' ? "Get Results" : "परिणाम प्राप्त करें")}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {t.step3Description || (language === 'english' ? "View, export, or share your eligible schemes." : "अपनी पात्र योजनाओं को देखें, निर्यात करें या साझा करें।")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <SchemeResults
              eligibleSchemes={eligibleSchemes}
              exportResults={exportResults}
              shareResults={shareResults}
              goBack={() => {
                setShowResults(false);
                // Clear URL parameters if they exist
                if (location.search) {
                  navigate('/');
                }
              }}
            />
          </div>
        </div>
      )}
      
      {/* Minimal information section */}
      {!showResults && (
        <div className="max-w-5xl mx-auto mb-16">
          <div className="border-t border-gray-100 pt-16 mb-12">
            <h2 className="text-2xl font-semibold text-center text-gray-900 mb-12">
              {language === 'english' ? 'Why Use Our Service?' : 'हमारी सेवा का उपयोग क्यों करें?'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-50">
                <div className="w-12 h-12 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {language === 'english' ? 'Why Check Eligibility?' : 'पात्रता क्यों जांचें?'}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {language === 'english' 
                    ? 'Many citizens miss out on benefits because they don\'t know they qualify. Our tool helps you discover all schemes you are eligible for.'
                    : 'कई नागरिक लाभों से चूक जाते हैं क्योंकि उन्हें नहीं पता कि वे योग्य हैं। हमारा टूल आपको उन सभी योजनाओं की खोज करने में मदद करता है जिनके लिए आप पात्र हैं।'}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-50">
                <div className="w-12 h-12 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {language === 'english' ? 'Accurate Results' : 'सटीक परिणाम'}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {language === 'english' 
                    ? 'Our database is regularly updated with the latest scheme information and eligibility criteria from various government departments.'
                    : 'हमारा डेटाबेस विभिन्न सरकारी विभागों से नवीनतम योजना जानकारी और पात्रता मानदंडों के साथ नियमित रूप से अपडेट किया जाता है।'}
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-50">
                <div className="w-12 h-12 bg-gov-blue bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gov-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  {language === 'english' ? 'Easy Application' : 'आसान आवेदन'}
                </h3>
                
                <p className="text-gray-600 text-sm">
                  {language === 'english' 
                    ? 'Get direct links to official application portals and detailed information about required documents and application processes.'
                    : 'आधिकारिक आवेदन पोर्टल और आवश्यक दस्तावेजों और आवेदन प्रक्रियाओं के बारे में विस्तृत जानकारी के लिए सीधे लिंक प्राप्त करें।'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Minimal Testimonial Section */}
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-xl font-semibold text-center text-gray-900 mb-8">
              {language === 'english' ? 'What Citizens Say About Us' : 'नागरिक हमारे बारे में क्या कहते हैं'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-600 italic mb-4">
                  {language === 'english' 
                    ? '"I discovered three farming schemes I was eligible for but didn\'t know about. The application process was simple with the guidance provided."'
                    : '"मुझे तीन कृषि योजनाओं का पता चला जिनके लिए मैं पात्र था लेकिन मुझे इसके बारे में पता नहीं था। प्रदान किए गए मार्गदर्शन के साथ आवेदन प्रक्रिया सरल थी।"'}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gov-blue bg-opacity-10 flex items-center justify-center text-gov-blue font-medium">
                    R
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{language === 'english' ? 'Rajesh Kumar' : 'राजेश कुमार'}</div>
                    <div className="text-sm text-gray-500">{language === 'english' ? 'Farmer, Bihar' : 'किसान, बिहार'}</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg">
                <p className="text-gray-600 italic mb-4">
                  {language === 'english' 
                    ? '"The eligibility checker helped me find education schemes for my children. The information was clear and the process was very user-friendly."'
                    : '"पात्रता चेकर ने मुझे अपने बच्चों के लिए शिक्षा योजनाएं खोजने में मदद की। जानकारी स्पष्ट थी और प्रक्रिया बहुत उपयोगकर्ता के अनुकूल थी।"'}
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gov-blue bg-opacity-10 flex items-center justify-center text-gov-blue font-medium">
                    S
                  </div>
                  <div className="ml-3">
                    <div className="font-medium text-gray-900">{language === 'english' ? 'Sunita Devi' : 'सुनीता देवी'}</div>
                    <div className="text-sm text-gray-500">{language === 'english' ? 'Homemaker, Rajasthan' : 'गृहिणी, राजस्थान'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;