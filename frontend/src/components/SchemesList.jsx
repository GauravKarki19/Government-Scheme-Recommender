import React from 'react';
import { FaCheckCircle, FaExternalLinkAlt, FaBookmark } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SchemesList = ({ category }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language || 'en';
  const isHindi = lang === 'hi';

  // Sample schemes data with bilingual content
  const schemesData = {
    education: [
      {
        id: 'edu1',
        title: {
          english: 'National Scholarship Portal',
          hindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल'
        },
        description: {
          english: 'Single-window platform for applying to various scholarship schemes offered by the Government of India.',
          hindi: 'भारत सरकार द्वारा प्रदान की जाने वाली विभिन्न छात्रवृत्ति योजनाओं के लिए आवेदन करने का एकल-विंडो प्लेटफ़ॉर्म।'
        },
        eligibility: {
          english: 'Students from economically weaker sections, minorities, and other specified categories.',
          hindi: 'आर्थिक रूप से कमजोर वर्गों, अल्पसंख्यकों और अन्य निर्दिष्ट श्रेणियों के छात्र।'
        },
        link: 'https://scholarships.gov.in/'
      },
      {
        id: 'edu2',
        title: {
          english: 'PM Vidya Lakshmi Scheme',
          hindi: 'पीएम विद्या लक्ष्मी योजना'
        },
        description: {
          english: 'Education loan portal for students seeking financial assistance for higher education in India and abroad.',
          hindi: 'भारत और विदेश में उच्च शिक्षा के लिए वित्तीय सहायता चाहने वाले छात्रों के लिए शिक्षा ऋण पोर्टल।'
        },
        eligibility: {
          english: 'Students seeking education loans for higher studies.',
          hindi: 'उच्च अध्ययन के लिए शिक्षा ऋण चाहने वाले छात्र।'
        },
        link: 'https://www.vidyalakshmi.co.in/'
      },
      {
        id: 'edu3',
        title: {
          english: 'PM Kaushal Vikas Yojana',
          hindi: 'पीएम कौशल विकास योजना'
        },
        description: {
          english: 'Skill development initiative scheme for providing industry-relevant skill training to youth.',
          hindi: 'युवाओं को उद्योग-संबंधित कौशल प्रशिक्षण प्रदान करने के लिए कौशल विकास पहल योजना।'
        },
        eligibility: {
          english: 'Youth seeking skill development training.',
          hindi: 'कौशल विकास प्रशिक्षण चाहने वाले युवा।'
        },
        link: 'https://www.pmkvyofficial.org/'
      }
    ],
    health: [
      {
        id: 'health1',
        title: {
          english: 'Ayushman Bharat Yojana',
          hindi: 'आयुष्मान भारत योजना'
        },
        description: {
          english: 'Health insurance scheme providing coverage up to ₹5 lakhs per family per year for secondary and tertiary care hospitalization.',
          hindi: 'स्वास्थ्य बीमा योजना जो प्रति परिवार प्रति वर्ष ₹5 लाख तक का कवरेज प्रदान करती है।'
        },
        eligibility: {
          english: 'Poor and vulnerable families as per SECC database.',
          hindi: 'SECC डेटाबेस के अनुसार गरीब और कमजोर परिवार।'
        },
        link: 'https://pmjay.gov.in/'
      },
      {
        id: 'health2',
        title: {
          english: 'PM Jan Arogya Yojana',
          hindi: 'पीएम जन आरोग्य योजना'
        },
        description: {
          english: 'Flagship scheme that provides health coverage for poor and vulnerable families.',
          hindi: 'गरीब और कमजोर परिवारों के लिए स्वास्थ्य कवरेज प्रदान करने वाली प्रमुख योजना।'
        },
        eligibility: {
          english: 'Economically disadvantaged families as identified in the SECC database.',
          hindi: 'SECC डेटाबेस में पहचाने गए आर्थिक रूप से कमजोर परिवार।'
        },
        link: 'https://pmjay.gov.in/'
      },
      {
        id: 'health3',
        title: {
          english: 'Rashtriya Swasthya Bima Yojana',
          hindi: 'राष्ट्रीय स्वास्थ्य बीमा योजना'
        },
        description: {
          english: 'Health insurance scheme for BPL families providing coverage for hospitalization expenses.',
          hindi: 'बीपीएल परिवारों के लिए अस्पताल में भर्ती खर्चों का कवरेज प्रदान करने वाली स्वास्थ्य बीमा योजना।'
        },
        eligibility: {
          english: 'BPL families and unorganized sector workers.',
          hindi: 'बीपीएल परिवार और असंगठित क्षेत्र के कामगार।'
        },
        link: 'https://www.india.gov.in/spotlight/rashtriya-swasthya-bima-yojana'
      }
    ],
    housing: [
      {
        id: 'housing1',
        title: {
          english: 'Pradhan Mantri Awas Yojana (Urban)',
          hindi: 'प्रधानमंत्री आवास योजना (शहरी)'
        },
        description: {
          english: 'Housing for All scheme aimed at urban areas to provide housing for the urban poor.',
          hindi: 'शहरी गरीबों को आवास प्रदान करने के लिए शहरी क्षेत्रों पर केंद्रित सभी के लिए आवास योजना।'
        },
        eligibility: {
          english: 'Urban poor including slum dwellers with annual income up to ₹3 lakhs.',
          hindi: 'झुग्गी-झोपड़ी निवासियों सहित शहरी गरीब जिनकी वार्षिक आय ₹3 लाख तक है।'
        },
        link: 'https://pmaymis.gov.in/'
      },
      {
        id: 'housing2',
        title: {
          english: 'Pradhan Mantri Awas Yojana (Gramin)',
          hindi: 'प्रधानमंत्री आवास योजना (ग्रामीण)'
        },
        description: {
          english: 'Housing scheme for rural areas providing financial assistance for house construction.',
          hindi: 'ग्रामीण क्षेत्रों के लिए घर निर्माण हेतु वित्तीय सहायता प्रदान करने वाली आवास योजना।'
        },
        eligibility: {
          english: 'Rural households living in kutcha/dilapidated houses.',
          hindi: 'कच्चे/जर्जर घरों में रहने वाले ग्रामीण परिवार।'
        },
        link: 'https://pmayg.nic.in/'
      },
      {
        id: 'housing3',
        title: {
          english: 'Credit Linked Subsidy Scheme',
          hindi: 'क्रेडिट लिंक्ड सब्सिडी योजना'
        },
        description: {
          english: 'Interest subsidy on home loans for EWS, LIG, and MIG categories.',
          hindi: 'ईडब्ल्यूएस, एलआईजी और एमआईजी श्रेणियों के लिए गृह ऋण पर ब्याज सब्सिडी।'
        },
        eligibility: {
          english: 'Economically Weaker Section, Low and Middle Income Groups.',
          hindi: 'आर्थिक रूप से कमजोर वर्ग, निम्न और मध्यम आय समूह।'
        },
        link: 'https://pmaymis.gov.in/clss_guideline.aspx'
      }
    ]
  };

  const schemes = schemesData[category] || [];

  const categoryTitles = {
    education: t('educationCategoryTitle', 'Education & Students Schemes'),
    health: t('healthCategoryTitle', 'Health & Insurance Schemes'),
    housing: t('housingCategoryTitle', 'Housing Schemes')
  };

  const categoryTitle = categoryTitles[category] || t('govSchemes', 'Government Schemes');

  return (
    <div className="py-12">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{categoryTitle}</h2>
        
        {schemes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">{t('noSchemesForCategory', 'No schemes available for this category at the moment.')}</p>
          </div>
        ) : (
          <div className="space-y-6">
            {schemes.map((scheme) => {
              const title = isHindi ? scheme.title.hindi : scheme.title.english;
              const description = isHindi ? scheme.description.hindi : scheme.description.english;
              const eligibility = isHindi ? scheme.eligibility.hindi : scheme.eligibility.english;
              return (
                <div key={scheme.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                      <button className="text-gray-400 hover:text-blue-500 transition-colors" title={t('bookmarkThis', 'Bookmark this scheme')}>
                        <FaBookmark />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{description}</p>
                    
                    <div className="bg-blue-50 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <FaCheckCircle className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{t('eligibilityLabel', 'Eligibility:')}</h4>
                          <p className="text-gray-700">{eligibility}</p>
                        </div>
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
                        <FaExternalLinkAlt className="ml-2 text-sm" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesList;
