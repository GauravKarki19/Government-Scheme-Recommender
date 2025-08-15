import React from 'react';
import { FaGraduationCap, FaHeartbeat, FaUsers, FaRupeeSign, FaChild, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SchemeCategories = () => {
  const { t } = useTranslation();

  const categories = [
    {
      id: 'education-schemes',
      icon: <FaGraduationCap size={32} className="text-blue-600" />,
      title: t('categoryEducation', 'Education & Students'),
      description: t('categoryEducationDesc', 'Scholarships, loans, and skill development programs'),
      link: '/categories/education'
    },
    {
      id: 'health-schemes',
      icon: <FaHeartbeat size={32} className="text-blue-600" />,
      title: t('categoryHealth', 'Health & Insurance'),
      description: t('categoryHealthDesc', 'Medical coverage, insurance, and healthcare schemes'),
      link: '/categories/health'
    },
    {
      id: 'senior-schemes',
      icon: <FaUsers size={32} className="text-blue-600" />,
      title: t('categorySenior', 'Senior Citizen'),
      description: t('categorySeniorDesc', 'Pension, healthcare, and welfare for elderly'),
      link: '/categories/senior'
    },
    {
      id: 'financial-schemes',
      icon: <FaRupeeSign size={32} className="text-blue-600" />,
      title: t('categoryFinancial', 'Financial Aid'),
      description: t('categoryFinancialDesc', 'Subsidies, loans, and financial assistance'),
      link: '/categories/financial'
    },
    {
      id: 'women-children-schemes',
      icon: <FaChild size={32} className="text-blue-600" />,
      title: t('categoryWomen', 'Women & Children'),
      description: t('categoryWomenDesc', 'Empowerment, protection, and development schemes'),
      link: '/categories/women-children'
    },
    {
      id: 'housing-schemes',
      icon: <FaHome size={32} className="text-blue-600" />,
      title: t('categoryHousing', 'Housing'),
      description: t('categoryHousingDesc', 'Affordable housing and home loan subsidies'),
      link: '/categories/housing'
    }
  ];

  return (
    <section id="schemes-section" className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('exploreSchemeCategories', 'Explore Scheme Categories')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('browseCategories', 'Browse through different categories of government schemes to find the ones that match your needs.')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              to={category.link} 
              key={index}
              id={category.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mr-4 group-hover:bg-blue-100 transition-colors">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="text-blue-600 font-medium flex items-center">
                {t('exploreSchemes', 'Explore schemes')}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SchemeCategories;
