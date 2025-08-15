import React from 'react';
import { FaIdCard, FaClipboardCheck, FaFileAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <FaIdCard size={32} className="text-white" />,
      title: t('step1Title', 'Create Your Account'),
      description: t('step1Desc', 'Sign up with your name, email, state and district to personalize your experience.')
    },
    {
      icon: <FaClipboardCheck size={32} className="text-white" />,
      title: t('step2Title', 'Get Matched with Schemes'),
      description: t('step2Desc', 'Our system analyzes your profile and matches you with eligible government schemes.')
    },
    {
      icon: <FaFileAlt size={32} className="text-white" />,
      title: t('step3Title', 'Apply Directly or Save for Later'),
      description: t('step3Desc', 'Apply for schemes directly through our platform or save them to your profile for later.')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('howItWorks', 'How It Works')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('howItWorksDesc', 'Finding and applying for government schemes has never been easier. Follow these simple steps:')}
          </p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-blue-100 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-blue-600 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-lg">
                  {step.icon}
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 shadow-md w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {t('step', 'Step')} {index + 1}: {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center">
            {t('getStartedNow', 'Get Started Now')}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
