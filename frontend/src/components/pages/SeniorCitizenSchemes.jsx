import React from 'react';
import { FaUsers, FaHeartbeat, FaHospital, FaMoneyBillWave, FaHome } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SeniorCitizenSchemes = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';
  const isHindi = lang === 'hi';

  const schemes = [
    {
      id: 'senior1',
      icon: <FaMoneyBillWave className="text-blue-600" size={24} />,
      title: isHindi ? 'राष्ट्रीय पेंशन योजना' : 'National Pension Scheme',
      description: isHindi
        ? 'एक स्वैच्छिक, दीर्घकालिक सेवानिवृत्ति बचत योजना जो कार्यकाल के दौरान व्यवस्थित बचत को सक्षम बनाती है।'
        : 'A voluntary, long-term retirement savings scheme designed to enable systematic savings during the working career.',
      eligibility: isHindi
        ? '18-65 वर्ष की आयु के सभी भारतीय नागरिक।'
        : 'All Indian citizens between 18-65 years of age.',
      benefits: isHindi
        ? 'कर लाभ, सेवानिवृत्ति के बाद नियमित पेंशन, विशेष आवश्यकताओं के लिए आंशिक निकासी।'
        : 'Tax benefits, regular pension post-retirement, partial withdrawals for specific needs.',
      link: 'https://www.npscra.nsdl.co.in/'
    },
    {
      id: 'senior2',
      icon: <FaHeartbeat className="text-blue-600" size={24} />,
      title: isHindi ? 'प्रधानमंत्री वय वंदना योजना' : 'Pradhan Mantri Vaya Vandana Yojana',
      description: isHindi
        ? 'वरिष्ठ नागरिकों के लिए एक पेंशन योजना जो 10 वर्षों के लिए प्रति वर्ष 8% का सुनिश्चित रिटर्न प्रदान करती है।'
        : 'A pension scheme for senior citizens that provides an assured return of 8% per annum for 10 years.',
      eligibility: isHindi ? '60 वर्ष और उससे अधिक आयु के वरिष्ठ नागरिक।' : 'Senior citizens aged 60 years and above.',
      benefits: isHindi
        ? '8% प्रति वर्ष सुनिश्चित पेंशन, ऋण सुविधा, विशेष मामलों में समयपूर्व निकासी।'
        : 'Assured pension of 8% per annum, loan facility, premature exit option in exceptional cases.',
      link: 'https://www.licindia.in/Products/Pension-Plans/Pradhan-Mantri-Vaya-Vandana-Yojana'
    },
    {
      id: 'senior3',
      icon: <FaHospital className="text-blue-600" size={24} />,
      title: isHindi ? 'राष्ट्रीय वयोश्री योजना' : 'Rashtriya Vayoshri Yojana',
      description: isHindi
        ? 'बीपीएल वर्ग के वरिष्ठ नागरिकों के लिए भौतिक सहायक उपकरण और सहायक-जीवन उपकरण प्रदान करने की योजना।'
        : 'A scheme for providing physical aids and assisted-living devices for senior citizens belonging to BPL category.',
      eligibility: isHindi
        ? 'बीपीएल वर्ग से संबंधित 60+ वर्ष के वरिष्ठ नागरिक जिनमें आयु-संबंधी विकलांगताएँ हैं।'
        : 'Senior citizens (60+ years) belonging to BPL category and suffering from age-related disabilities.',
      benefits: isHindi
        ? 'मुफ़्त सहायक उपकरण जैसे वॉकिंग स्टिक, एल्बो क्रच, वॉकर, ट्राइपॉड, श्रवण यंत्र आदि।'
        : 'Free of cost assisted-living devices such as walking sticks, elbow crutches, walkers, tripods, hearing aids, etc.',
      link: 'https://www.india.gov.in/spotlight/rashtriya-vayoshri-yojana'
    },
    {
      id: 'senior4',
      icon: <FaHome className="text-blue-600" size={24} />,
      title: isHindi ? 'वरिष्ठ पेंशन बीमा योजना' : 'Varishtha Pension Bima Yojana',
      description: isHindi
        ? 'वरिष्ठ नागरिकों के लिए एक पेंशन योजना जो गारंटीड रिटर्न के आधार पर सुनिश्चित पेंशन प्रदान करती है।'
        : 'A pension scheme for senior citizens that provides an assured pension based on a guaranteed rate of return.',
      eligibility: isHindi ? '60 वर्ष और उससे अधिक आयु के वरिष्ठ नागरिक।' : 'Senior citizens aged 60 years and above.',
      benefits: isHindi
        ? '10 वर्षों के लिए 8% प्रति वर्ष गारंटीड रिटर्न; मासिक/त्रैमासिक/अर्द्धवार्षिक/वार्षिक पेंशन।'
        : 'Guaranteed return of 8% per annum for 10 years, pension payable monthly/quarterly/half-yearly/yearly.',
      link: 'https://www.licindia.in/'
    },
    {
      id: 'senior5',
      icon: <FaUsers className="text-blue-600" size={24} />,
      title: isHindi ? 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना' : 'Indira Gandhi National Old Age Pension Scheme',
      description: isHindi
        ? 'गरीबी रेखा से नीचे रहने वाले वृद्ध व्यक्तियों के लिए एक अंशदान-रहित पेंशन योजना।'
        : 'A non-contributory pension scheme for elderly persons living below the poverty line.',
      eligibility: isHindi
        ? 'गरीबी रेखा से नीचे रहने वाले परिवार से 60 वर्ष और उससे अधिक आयु के व्यक्ति।'
        : 'Persons aged 60 years and above belonging to a household below poverty line.',
      benefits: isHindi
        ? 'आयु के अनुसार ₹200 से ₹500 तक मासिक पेंशन।'
        : 'Monthly pension ranging from ₹200 to ₹500 depending on age.',
      link: 'https://nsap.nic.in/'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <FaUsers size={64} className="opacity-90" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{t('seniorCategoryTitle', 'Senior Citizen Schemes')}</h1>
              <p className="text-lg opacity-90 max-w-3xl">
                {t('seniorCategoryDesc', 'Discover government schemes designed to support the elderly with pensions, healthcare, and welfare benefits. These programs aim to ensure dignity and financial security for senior citizens.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-purple-50 p-3 rounded-lg mr-4">
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
                      
                      <div className="bg-purple-50 rounded-lg p-4">
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
                        className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium"
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

export default SeniorCitizenSchemes;
