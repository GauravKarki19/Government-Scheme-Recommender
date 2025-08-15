import React from 'react';
import { FaCheckCircle, FaIdCard, FaHeart, FaBell } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <FaCheckCircle className="text-blue-600" size={24} />,
      title: t('featureTitle1', 'Scheme Matching by Profile'),
      description: t('featureDesc1', "Our intelligent system matches your profile with eligible government schemes across various categories.")
    },
    {
      icon: <FaIdCard className="text-blue-600" size={24} />,
      title: t('featureTitle2', 'Secure Account Login'),
      description: t('featureDesc2', 'Create an account to save and track schemes. Your data is protected and private.')
    },
    {
      icon: <FaHeart className="text-blue-600" size={24} />,
      title: t('featureTitle3', 'Central + State Coverage'),
      description: t('featureDesc3', 'Access schemes from both central government and your state government in one place.')
    },
    {
      icon: <FaBell className="text-blue-600" size={24} />,
      title: t('featureTitle4', 'Auto Notification for Updates'),
      description: t('featureDesc4', 'Receive timely notifications about new schemes you qualify for or updates to existing ones.')
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('whyUseSmartGovRec', 'Why Use SmartGovRec?')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('platformDescription', "Our platform simplifies the process of finding and applying for government schemes that you're eligible for.")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="bg-white w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
