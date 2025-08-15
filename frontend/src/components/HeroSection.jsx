import React from 'react';
import { FaSearch, FaArrowRight, FaMapMarkerAlt, FaUserShield, FaFileAlt, FaCompass } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoToEligibility = (e) => {
    e.preventDefault();
    navigate('/check-eligibility');
  };

  const handleExploreSchemes = (e) => {
    e.preventDefault();
    const el = document.getElementById('schemes-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-80px)]">
      {/* Content overlay */}
      <div className="relative py-20 md:py-32">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20">
              <div className="inline-flex items-center px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-6">
                <FaUserShield className="mr-2" />
                {t('governmentInitiative', 'Government Initiative')}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {t('findSchemes', 'Find Government Schemes')}{' '}
                <span className="text-blue-600">{t('youQualifyFor', 'You Qualify For')}</span>
              </h1>

              <p className="text-lg text-gray-700 mb-8">
                {t(
                  'heroDescription',
                  'Our mobile service brings welfare, education, health, and financial schemes directly to your community.'
                )}
              </p>

              {/* Call-to-actions (replacing Aadhaar/number form) */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="space-y-4">
                  <button
                    onClick={handleGoToEligibility}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 flex justify-center items-center"
                  >
                    <FaSearch className="mr-2" size={14} />
                    {t('checkEligibility', 'Check Eligibility')}
                  </button>

                  <button
                    onClick={handleExploreSchemes}
                    className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors flex justify-center items-center"
                  >
                    <FaCompass className="mr-2" size={14} />
                    {t('exploreSchemes', 'Explore schemes')}
                    <FaArrowRight className="ml-2" size={14} />
                  </button>
                </div>
              </div>

              <div className="mt-6 flex items-center">
                <span className="text-sm text-gray-700 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t('dataSecure', 'Your data is secure and protected')}
                </span>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:block relative">
              <div className="relative">
                {/* image */}
                <img
                  src="/images/Hero-section.jpg"
                  alt="IMAGE"
                  className="w-full h-auto rounded-2xl shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                />

                {/* Floating info cards */}
                <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-full p-2 mr-3">
                      <FaMapMarkerAlt className="text-blue-600" size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('mobileService', 'Mobile Service')}</p>
                      <p className="text-xs text-gray-500">{t('comingToLocation', 'Coming to your location')}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-lg p-4 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="flex items-center">
                    <div className="bg-green-100 rounded-full p-2 mr-3">
                      <FaFileAlt className="text-green-600" size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t('schemesAvailable', '100+ Schemes Available')}</p>
                      <p className="text-xs text-gray-500">{t('updatedRegularly', 'Updated regularly')}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-t-4 border-l-4 border-blue-200 opacity-70 rounded-tl-3xl"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-b-4 border-r-4 border-blue-200 opacity-70 rounded-br-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
