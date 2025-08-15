import React from 'react';
import SchemesList from '../SchemesList';
import { useTranslation } from 'react-i18next';

const HousingSchemes = () => {
  const { t } = useTranslation();
  return (
    <div className="pt-8 pb-16">
      <div className="container-custom">
        <div className="bg-orange-600 text-white rounded-xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('housingCategoryTitle', 'Housing Schemes')}</h1>
          <p className="text-lg opacity-90">
            {t('housingCategoryDesc', 'Find government schemes for affordable housing, home loans, and housing subsidies.')}
          </p>
        </div>
        
        <SchemesList category="housing" />
      </div>
    </div>
  );
};

export default HousingSchemes;
