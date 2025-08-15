import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaExternalLinkAlt, FaBookmark } from 'react-icons/fa';

const SimpleSchemeResults = ({ schemes = [], onBack }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';

  if (schemes.length === 0) {
    return (
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {t('noSchemesFound', 'No Schemes Found')}
        </h3>
        <p className="text-gray-600">
          {t('noSchemesFoundDesc', "Based on your profile, we couldn't find any eligible schemes. Try adjusting your details or check back later.")}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t('results', 'Your Eligible Schemes')}</h2>
        <button
          onClick={onBack}
          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          {t('backToForm', 'Back to Form')}
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {schemes.map((scheme, index) => {
          const name = typeof scheme.name === 'object' ? (lang === 'hi' ? scheme.name.hindi : scheme.name.english) : scheme.name;
          const description = typeof scheme.description === 'object' ? (lang === 'hi' ? scheme.description.hindi : scheme.description.english) : scheme.description;
          return (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4">{description}</p>
                
                <div className="flex justify-between items-center mt-6">
                  {scheme.link ? (
                    <a 
                      href={scheme.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      {t('applyNow', 'Apply Now')}
                      <FaExternalLinkAlt className="ml-1" size={12} />
                    </a>
                  ) : (
                    <span className="text-gray-500">{t('noApplicationLink', 'No application link available')}</span>
                  )}
                  
                  <button className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                    <FaBookmark className="mr-1" size={14} />
                    {t('saveForLater', 'Save for Later')}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimpleSchemeResults;
