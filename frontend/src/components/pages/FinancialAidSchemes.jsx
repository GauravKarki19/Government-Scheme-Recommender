import React from 'react';
import { FaRupeeSign, FaHandHoldingUsd, FaHome, FaIndustry, FaLeaf } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const FinancialAidSchemes = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';
  const isHindi = lang === 'hi';

  const schemes = [
    {
      id: 'fin1',
      icon: <FaLeaf className="text-green-600" size={24} />,
      title: isHindi ? 'पीएम किसान सम्मान निधि' : 'PM Kisan Samman Nidhi',
      description: isHindi
        ? 'देश के सभी भू-धारक किसान परिवारों को आय सहायता प्रदान करने के लिए केंद्रीय क्षेत्र की योजना।'
        : "A central sector scheme to provide income support to all landholding farmers' families in the country.",
      eligibility: isHindi
        ? 'कुछ अपवर्जनों के अधीन, खेती योग्य भूमि वाले सभी भू-धारक किसान परिवार।'
        : "All landholding farmers' families with cultivable land, subject to certain exclusions.",
      benefits: isHindi
        ? '₹6,000 प्रति वर्ष की प्रत्यक्ष आय सहायता, प्रत्येक ₹2,000 की तीन बराबर किस्तों में।'
        : 'Direct income support of ₹6,000 per year in three equal installments of ₹2,000 each.',
      link: 'https://pmkisan.gov.in/'
    },
    {
      id: 'fin2',
      icon: <FaIndustry className="text-green-600" size={24} />,
      title: isHindi ? 'प्रधानमंत्री मुद्रा योजना' : 'Pradhan Mantri Mudra Yojana',
      description: isHindi
        ? 'गैर-कॉरपोरेट, गैर-कृषि छोटे/सूक्ष्म उद्यमों को ₹10 लाख तक के ऋण प्रदान करने की योजना।'
        : 'A scheme to provide loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.',
      eligibility: isHindi
        ? 'छोटे व्यवसाय मालिक, उद्यमी, और स्वरोज़गार व्यक्ति।'
        : 'Small business owners, entrepreneurs, and self-employed individuals.',
      benefits: isHindi
        ? 'तीन श्रेणियों में ऋण: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख), तरुण (₹5 लाख से ₹10 लाख)।'
        : 'Loans under three categories: Shishu (up to ₹50,000), Kishore (₹50,000 to ₹5 lakh), and Tarun (₹5 lakh to ₹10 lakh).',
      link: 'https://www.mudra.org.in/'
    },
    {
      id: 'fin3',
      icon: <FaHandHoldingUsd className="text-green-600" size={24} />,
      title: isHindi ? 'स्टैंड-अप इंडिया योजना' : 'Stand-Up India Scheme',
      description: isHindi
        ? 'प्रत्येक बैंक शाखा में कम से कम एक अनुसूचित जाति/जनजाति उधारकर्ता और एक महिला उधारकर्ता को ₹10 लाख से ₹1 करोड़ तक बैंक ऋण उपलब्ध कराने की योजना।'
        : 'A scheme to facilitate bank loans between ₹10 lakh and ₹1 crore to at least one Scheduled Caste or Scheduled Tribe borrower and one woman borrower per bank branch.',
      eligibility: isHindi ? '18 वर्ष से अधिक आयु के एससी/एसटी और महिला उद्यमी।' : 'SC/ST and women entrepreneurs above 18 years of age.',
      benefits: isHindi ? 'उत्पादन, सेवाओं या व्यापार क्षेत्र में ग्रीनफील्ड उद्यमों के लिए ऋण।' : 'Loans for greenfield enterprises in manufacturing, services, or trading sector.',
      link: 'https://www.standupmitra.in/'
    },
    {
      id: 'fin4',
      icon: <FaHome className="text-green-600" size={24} />,
      title: isHindi ? 'क्रेडिट लिंक्ड सब्सिडी योजना' : 'Credit Linked Subsidy Scheme',
      description: isHindi
        ? 'प्रधानमंत्री आवास योजना (शहरी) का एक घटक जो गृह ऋण पर ब्याज सब्सिडी प्रदान करता है।'
        : 'A component of Pradhan Mantri Awas Yojana (Urban) that provides interest subsidy on home loans.',
      eligibility: isHindi
        ? 'आर्थिक रूप से कमजोर वर्ग (EWS), निम्न आय वर्ग (LIG), और मध्यम आय वर्ग (MIG)।'
        : 'Economically Weaker Section (EWS), Low Income Group (LIG), and Middle Income Group (MIG).',
      benefits: isHindi
        ? 'EWS/LIG के लिए 6.5% और MIG-I के लिए 4% तथा MIG-II के लिए 3% ब्याज सब्सिडी।'
        : 'Interest subsidy of 6.5% for EWS/LIG and 4% for MIG-I and 3% for MIG-II on housing loans.',
      link: 'https://pmaymis.gov.in/'
    },
    {
      id: 'fin5',
      icon: <FaRupeeSign className="text-green-600" size={24} />,
      title: isHindi ? 'अटल पेंशन योजना' : 'Atal Pension Yojana',
      description: isHindi
        ? 'असंगठित क्षेत्र के श्रमिकों के लिए सुनिश्चित न्यूनतम पेंशन वाली योजना।'
        : 'A pension scheme for workers in the unorganized sector with guaranteed minimum pension.',
      eligibility: isHindi
        ? '18-40 वर्ष आयु के भारतीय नागरिक जिनका बैंक खाता हो।'
        : 'Citizens of India between 18-40 years of age with a bank account.',
      benefits: isHindi
        ? '60 वर्ष की आयु के बाद ₹1,000 से ₹5,000 प्रति माह की निश्चित पेंशन (अंशदान के अनुसार)।'
        : 'Fixed pension of ₹1,000 to ₹5,000 per month after the age of 60 based on contribution.',
      link: 'https://www.npscra.nsdl.co.in/scheme-details.php'
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <FaRupeeSign size={64} className="opacity-90" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-4">{t('financialCategoryTitle', 'Financial Aid Schemes')}</h1>
              <p className="text-lg opacity-90 max-w-3xl">
                {t('financialCategoryDesc', 'Discover government schemes providing financial assistance, loans, subsidies, and economic support. These programs aim to promote financial inclusion and economic empowerment.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="space-y-8">
          {schemes.map((scheme) => (
            <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start">
                  <div className="bg-green-50 p-3 rounded-lg mr-4">
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
                      
                      <div className="bg-green-50 rounded-lg p-4">
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
                        className="inline-flex items-center text-green-600 hover:text-green-800 font-medium"
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

export default FinancialAidSchemes;
