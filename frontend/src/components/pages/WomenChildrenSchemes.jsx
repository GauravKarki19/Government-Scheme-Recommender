import React from 'react';
import { FaChild, FaFemale, FaGraduationCap, FaHandHoldingUsd, FaHospital } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const WomenChildrenSchemes = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';
  const isHindi = lang === 'hi';

  const schemes = [
    {
      id: 'wc1',
      icon: <FaFemale className="text-pink-600" size={24} />,
      title: isHindi ? 'बेटी बचाओ बेटी पढ़ाओ' : 'Beti Bachao Beti Padhao',
      description: isHindi
        ? 'भारत में बालिकाओं के लिए जागरूकता बढ़ाने और कल्याण सेवाओं की कार्यक्षमता में सुधार करने के लिए अभियान।'
        : 'A campaign to generate awareness and improve the efficiency of welfare services intended for girls in India.',
      eligibility: isHindi ? 'सभी बालिकाएँ और उनके परिवार।' : 'All girl children and their families.',
      benefits: isHindi
        ? 'जागरूकता अभियान, शिक्षा तक बेहतर पहुंच, बालिका शिक्षा के लिए वित्तीय प्रोत्साहन।'
        : 'Awareness campaigns, improved access to education, financial incentives for girl child education.',
      link: 'https://wcd.nic.in/bbbp-schemes'
    },
    {
      id: 'wc2',
      icon: <FaGraduationCap className="text-pink-600" size={24} />,
      title: isHindi ? 'सुकन्या समृद्धि योजना' : 'Sukanya Samriddhi Yojana',
      description: isHindi
        ? 'बालिका के भविष्य की शिक्षा और विवाह खर्च के लिए माता-पिता को बचत के लिए प्रोत्साहित करने हेतु लघु जमा योजना।'
        : "A small deposit scheme for the girl child to encourage parents to build a fund for the future education and marriage expenses for their female child.",
      eligibility: isHindi ? '10 वर्ष से कम आयु की बालिकाओं के माता-पिता/अभिभावक।' : 'Parents/guardians of girl children below 10 years of age.',
      benefits: isHindi
        ? 'उच्च ब्याज दर, धारा 80C के तहत कर लाभ, 18 वर्ष के बाद शिक्षा के लिए आंशिक निकासी।'
        : 'High interest rate, tax benefits under Section 80C, partial withdrawal for education after girl turns 18.',
      link: 'https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana'
    },
    {
      id: 'wc3',
      icon: <FaHandHoldingUsd className="text-pink-600" size={24} />,
      title: isHindi ? 'प्रधानमंत्री मातृ वंदना योजना' : 'Pradhan Mantri Matru Vandana Yojana',
      description: isHindi
        ? 'गर्भवती महिलाओं और स्तनपान कराने वाली माताओं को वित्तीय सहायता प्रदान करने वाला मातृत्व लाभ कार्यक्रम।'
        : 'A maternity benefit program that provides financial assistance to pregnant women and lactating mothers.',
      eligibility: isHindi ? 'पहले जीवित जन्म के लिए गर्भवती महिलाएं और स्तनपान कराने वाली माताएँ।' : 'Pregnant women and lactating mothers for first live birth.',
      benefits: isHindi
        ? '₹5,000 की नकद प्रोत्साहन राशि तीन किश्तों में; जननी सुरक्षा योजना के तहत अतिरिक्त ₹1,000।'
        : 'Cash incentive of ₹5,000 in three installments, additional ₹1,000 under Janani Suraksha Yojana.',
      link: 'https://wcd.nic.in/schemes/pradhan-mantri-matru-vandana-yojana'
    },
    {
      id: 'wc4',
      icon: <FaHospital className="text-pink-600" size={24} />,
      title: isHindi ? 'जननी सुरक्षा योजना' : 'Janani Suraksha Yojana',
      description: isHindi
        ? 'राष्ट्रीय स्वास्थ्य मिशन के तहत सुरक्षित मातृत्व हस्तक्षेप, जो मातृ और नवजात मृत्यु दर को कम करने के लिए है।'
        : 'A safe motherhood intervention under the National Health Mission to reduce maternal and neonatal mortality.',
      eligibility: isHindi ? 'बीपीएल परिवारों से संबंधित 19 वर्ष और उससे अधिक आयु की गर्भवती महिलाएं।' : 'Pregnant women belonging to BPL families, aged 19 years and above.',
      benefits: isHindi
        ? 'संस्थागत प्रसव के लिए ₹600 से ₹1,400 तक नकद सहायता (क्षेत्र के अनुसार)।'
        : 'Cash assistance for institutional delivery, ranging from ₹600 to ₹1,400 depending on the area.',
      link: 'https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841&lid=309'
    },
    {
      id: 'wc5',
      icon: <FaChild className="text-pink-600" size={24} />,
      title: isHindi ? 'एकीकृत बाल विकास सेवा (ICDS)' : 'Integrated Child Development Services',
      description: isHindi
        ? '6 वर्ष से कम आयु के बच्चों और उनकी माताओं के लिए भोजन, प्रीस्कूल शिक्षा, प्राथमिक स्वास्थ्य देखभाल, टीकाकरण, स्वास्थ्य जांच और रेफरल सेवाएँ प्रदान करने वाला कल्याण कार्यक्रम।'
        : 'A welfare program that provides food, preschool education, primary healthcare, immunization, health check-up and referral services to children under 6 years of age and their mothers.',
      eligibility: isHindi ? '6 वर्ष से कम आयु के बच्चे, गर्भवती महिलाएं और स्तनपान कराने वाली माताएं।' : 'Children below 6 years of age, pregnant women, and lactating mothers.',
      benefits: isHindi
        ? 'पूरक पोषण, टीकाकरण, स्वास्थ्य जांच, रेफरल सेवाएँ, प्री-स्कूल नॉन-फॉर्मल शिक्षा।'
        : 'Supplementary nutrition, immunization, health check-up, referral services, pre-school non-formal education.',
      link: 'https://icds-wcd.nic.in/icds.aspx'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <FaChild size={64} className="opacity-90" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{t('womenChildrenCategoryTitle', 'Women & Children Schemes')}</h1>
              <p className="text-lg opacity-90 max-w-3xl">
                {t('womenChildrenCategoryDesc', 'Discover government schemes designed to support women and children with education, healthcare, and financial assistance. These programs aim to empower women and ensure the well-being of children.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-pink-50 p-3 rounded-lg mr-4">
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
                      
                      <div className="bg-pink-50 rounded-lg p-4">
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
                        className="inline-flex items-center text-pink-600 hover:text-pink-800 font-medium"
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

export default WomenChildrenSchemes;
