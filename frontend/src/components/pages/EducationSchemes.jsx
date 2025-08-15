import React from 'react';
import { FaGraduationCap, FaBook, FaLaptop, FaUniversity, FaUserGraduate } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const EducationSchemes = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';
  const isHindi = lang === 'hi';

  const schemes = [
    {
      id: 'edu1',
      icon: <FaGraduationCap className="text-blue-600" size={24} />,
      title: isHindi ? 'राष्ट्रीय छात्रवृत्ति पोर्टल' : 'National Scholarship Portal',
      description: isHindi ? 'भारत सरकार द्वारा प्रदान की जाने वाली विभिन्न छात्रवृत्ति योजनाओं के लिए आवेदन करने का एकल-विंडो प्लेटफ़ॉर्म।' : 'Single-window platform for applying to various scholarship schemes offered by the Government of India.',
      eligibility: isHindi ? 'आर्थिक रूप से कमजोर वर्गों, अल्पसंख्यकों और अन्य निर्दिष्ट श्रेणियों के छात्र।' : 'Students from economically weaker sections, minorities, and other specified categories.',
      benefits: isHindi ? 'विभिन्न स्तरों पर शिक्षा के लिए वित्तीय सहायता।' : 'Financial assistance for education at various levels.',
      link: 'https://scholarships.gov.in/'
    },
    {
      id: 'edu2',
      icon: <FaUniversity className="text-blue-600" size={24} />,
      title: isHindi ? 'पीएम विद्या लक्ष्मी योजना' : 'PM Vidya Lakshmi Scheme',
      description: isHindi ? 'भारत और विदेश में उच्च शिक्षा के लिए वित्तीय सहायता चाहने वाले छात्रों के लिए शिक्षा ऋण पोर्टल।' : 'Education loan portal for students seeking financial assistance for higher education in India and abroad.',
      eligibility: isHindi ? 'उच्च अध्ययन के लिए शिक्षा ऋण चाहने वाले छात्र।' : 'Students seeking education loans for higher studies.',
      benefits: isHindi ? 'कई बैंकों से शिक्षा ऋण के लिए एकल प्लेटफ़ॉर्म, सरल प्रक्रिया।' : 'Single platform for education loans from multiple banks with simplified process.',
      link: 'https://www.vidyalakshmi.co.in/'
    },
    {
      id: 'edu3',
      icon: <FaLaptop className="text-blue-600" size={24} />,
      title: isHindi ? 'पीएम कौशल विकास योजना' : 'PM Kaushal Vikas Yojana',
      description: isHindi ? 'युवाओं को उद्योग-संबंधित कौशल प्रशिक्षण प्रदान करने के लिए कौशल विकास पहल योजना।' : 'Skill development initiative scheme for providing industry-relevant skill training to youth.',
      eligibility: isHindi ? 'कौशल विकास प्रशिक्षण चाहने वाले युवा।' : 'Youth seeking skill development training.',
      benefits: isHindi ? 'निःशुल्क प्रशिक्षण, प्रमाणन और प्लेसमेंट सहायता।' : 'Free training, certification, and placement assistance.',
      link: 'https://www.pmkvyofficial.org/'
    },
    {
      id: 'edu4',
      icon: <FaBook className="text-blue-600" size={24} />,
      title: isHindi ? 'सर्व शिक्षा अभियान' : 'Sarva Shiksha Abhiyan',
      description: isHindi ? 'भारत में सार्वभौमिक प्राथमिक शिक्षा के लिए व्यापक कार्यक्रम।' : 'Comprehensive program for universal elementary education across India.',
      eligibility: isHindi ? '6-14 वर्ष की आयु के सभी बच्चे।' : 'All children between 6-14 years of age.',
      benefits: isHindi ? 'मुफ़्त शिक्षा, पाठ्यपुस्तकें, यूनिफॉर्म और मिड-डे मील।' : 'Free education, textbooks, uniforms, and mid-day meals.',
      link: 'https://www.education.gov.in/en/school-education/sarva-shiksha-abhiyan'
    },
    {
      id: 'edu5',
      icon: <FaUserGraduate className="text-blue-600" size={24} />,
      title: isHindi ? 'स्कॉलरशिप की केंद्रीय क्षेत्र योजना' : 'Central Sector Scheme of Scholarship',
      description: isHindi ? 'मेरिट के आधार पर कॉलेज और विश्वविद्यालय के छात्रों के लिए छात्रवृत्ति।' : 'Scholarships for college and university students based on merit.',
      eligibility: isHindi ? 'कक्षा 12 बोर्ड परीक्षा के शीर्ष 20 पर्सेंटाइल छात्र।' : 'Top 20 percentile students from Class 12 board exams.',
      benefits: isHindi ? 'स्नातक अध्ययन के लिए ₹10,000 प्रति वर्ष की वित्तीय सहायता।' : 'Financial assistance of ₹10,000 per annum for undergraduate studies.',
      link: 'https://scholarships.gov.in/'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <FaGraduationCap size={64} className="opacity-90" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{t('educationCategoryTitle', 'Education & Students Schemes')}</h1>
              <p className="text-lg opacity-90 max-w-3xl">
                {t('educationCategoryDesc', 'Discover government schemes for education, scholarships, skill development, and student welfare. These programs aim to make education accessible and affordable for all citizens.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-blue-50 p-3 rounded-lg mr-4">
                    {scheme.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{scheme.title}</h3>
                    <p className="text-gray-600 mb-4">{scheme.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{t('eligibilityLabel', 'Eligibility:')}</h4>
                        <p className="text-gray-700">{scheme.eligibility}</p>
                      </div>
                      
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{t('benefitsLabel', 'Benefits:')}</h4>
                        <p className="text-gray-700">{scheme.benefits}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{t('idLabel', 'ID')}: {scheme.id}</span>
                      <a 
                        href={scheme.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {t('visitOfficialWebsite', 'Visit Official Website')}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSchemes;
