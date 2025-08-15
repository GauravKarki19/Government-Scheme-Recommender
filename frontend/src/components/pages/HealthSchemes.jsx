import React from 'react';
import SchemesList from '../SchemesList';
import { useTranslation } from 'react-i18next';

const HealthSchemes = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-8 pb-16">
      <div className="container-custom">
        <div className="bg-green-600 text-white rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('healthCategoryTitle', 'Health & Insurance Schemes')}</h1>
          <p className="text-lg opacity-90">
            {t('healthCategoryDesc', 'Explore government schemes for healthcare, medical insurance, and wellness programs.')}
          </p>
        </div>
        
        <SchemesList category="health" />
      </div>
    </div>
  );
};

export default HealthSchemes;
