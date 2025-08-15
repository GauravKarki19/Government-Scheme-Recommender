import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const lang = i18n.resolvedLanguage || i18n.language || 'en';

  // FAQ data (bilingual)
  const faqs = [
    {
      question: {
        english: 'What is the Government Scheme Eligibility Assistant?',
        hindi: 'सरकारी योजना पात्रता सहायक क्या है?'
      },
      answer: {
        english: 'The Government Scheme Eligibility Assistant is a digital platform that helps citizens discover welfare schemes they are eligible for based on their personal details such as age, income, occupation, caste, gender, and location.',
        hindi: 'सरकारी योजना पात्रता सहायक एक डिजिटल प्लेटफॉर्म है जो नागरिकों को उनके व्यक्तिगत विवरण जैसे आयु, आय, व्यवसाय, जाति, लिंग और स्थान के आधार पर उन कल्याणकारी योजनाओं की खोज में मदद करता है जिनके लिए वे पात्र हैं।'
      }
    },
    {
      question: {
        english: 'How does the eligibility check work?',
        hindi: 'पात्रता जांच कैसे काम करती है?'
      },
      answer: {
        english: 'The system compares your provided information with the eligibility criteria of various government schemes. It then displays a list of schemes for which you are likely eligible based on the information you provided.',
        hindi: 'सिस्टम आपके द्वारा प्रदान की गई जानकारी की तुलना विभिन्न सरकारी योजनाओं के पात्रता मानदंडों से करता है। फिर यह आपके द्वारा प्रदान की गई जानकारी के आधार पर उन योजनाओं की एक सूची प्रदर्शित करता है जिनके लिए आप संभावित रूप से पात्र हैं।'
      }
    },
    {
      question: {
        english: 'Is my data secure when I use this platform?',
        hindi: 'क्या इस प्लेटफॉर्म का उपयोग करते समय मेरा डेटा सुरक्षित है?'
      },
      answer: {
        english: 'Yes, we take data privacy very seriously. Your personal information is only used to check eligibility and is not stored on our servers. We do not share your data with any third parties without your explicit consent.',
        hindi: 'हां, हम डेटा गोपनीयता को बहुत गंभीरता से लेते हैं। आपकी व्यक्तिगत जानकारी का उपयोग केवल पात्रता की जांच के लिए किया जाता है और इसे हमारे सर्वर पर संग्रहीत नहीं किया जाता है। हम आपकी स्पष्ट सहमति के बिना आपका डेटा किसी भी तीसरे पक्ष के साथ साझा नहीं करते हैं।'
      }
    },
    {
      question: {
        english: 'How accurate are the eligibility results?',
        hindi: 'पात्रता परिणाम कितने सटीक हैं?'
      },
      answer: {
        english: 'While we strive to provide accurate results, the final eligibility determination is made by the respective government departments. We recommend visiting the official website of each scheme or contacting the relevant department for the most up-to-date and accurate information.',
        hindi: 'हालांकि हम सटीक परिणाम प्रदान करने का प्रयास करते हैं, अंतिम पात्रता निर्धारण संबंधित सरकारी विभागों द्वारा किया जाता है। हम सबसे अद्यतित और सटीक जानकारी के लिए प्रत्येक योजना की आधिकारिक वेबसाइट पर जाने या संबंधित विभाग से संपर्क करने की सलाह देते हैं।'
      }
    },
    {
      question: {
        english: "What should I do after finding schemes I am eligible for?",
        hindi: 'मैं जिन योजनाओं के लिए पात्र हूं, उन्हें खोजने के बाद मुझे क्या करना चाहिए?'
      },
      answer: {
        english: 'Once you identify schemes you are eligible for, click on "Apply Now" to visit the official website of the scheme. There, you can find detailed information about the application process, required documents, and submission guidelines.',
        hindi: 'एक बार जब आप उन योजनाओं की पहचान कर लेते हैं जिनके लिए आप पात्र हैं, तो योजना की आधिकारिक वेबसाइट पर जाने के लिए "अभी आवेदन करें" पर क्लिक करें। वहां, आप आवेदन प्रक्रिया, आवश्यक दस्तावेजों और प्रस्तुत करने के दिशानिर्देशों के बारे में विस्तृत जानकारी पा सकते हैं।'
      }
    },
    {
      question: {
        english: 'Can I save or share my eligibility results?',
        hindi: 'क्या मैं अपने पात्रता परिणामों को सहेज या साझा कर सकता हूं?'
      },
      answer: {
        english: 'Yes, you can export your results as a text file, bookmark them for future reference, or share them. This helps track schemes and share with family members who might benefit.',
        hindi: 'हां, आप अपने परिणामों को टेक्स्ट फ़ाइल के रूप में निर्यात कर सकते हैं, भविष्य के लिए बुकमार्क कर सकते हैं, या साझा कर सकते हैं। इससे योजनाओं पर नज़र रखना और लाभान्वित हो सकने वाले परिवार के सदस्यों के साथ साझा करना आसान हो जाता है।'
      }
    },
    {
      question: {
        english: 'Is this platform available in languages other than English and Hindi?',
        hindi: 'क्या यह प्लेटफॉर्म अंग्रेजी और हिंदी के अलावा अन्य भाषाओं में उपलब्ध है?'
      },
      answer: {
        english: 'Currently, the platform is available in English and Hindi. We will add more Indian languages over time.',
        hindi: 'वर्तमान में, प्लेटफॉर्म अंग्रेजी और हिंदी में उपलब्ध है। समय के साथ हम अधिक भारतीय भाषाएँ जोड़ेंगे।'
      }
    },
    {
      question: {
        english: 'How often is the scheme information updated?',
        hindi: 'योजना की जानकारी कितनी बार अपडेट होती है?'
      },
      answer: {
        english: 'We regularly update our database, but official criteria can change without notice. Always refer to official sources for the latest information.',
        hindi: 'हम अपने डेटाबेस को नियमित रूप से अपडेट करते हैं, लेकिन आधिकारिक मानदंड बिना सूचना के बदल सकते हैं। नवीनतम जानकारी के लिए हमेशा आधिकारिक स्रोतों का संदर्भ लें।'
      }
    }
  ];

  const toggleFAQ = (index) => setActiveIndex(activeIndex === index ? null : index);

  const filteredFAQs = faqs.filter((faq) =>
    faq.question[lang === 'hi' ? 'hindi' : 'english']
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    faq.answer[lang === 'hi' ? 'hindi' : 'english']
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getText = (obj) => obj[lang === 'hi' ? 'hindi' : 'english'];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          {t('faqTitle', 'Frequently Asked Questions')}
        </h1>
        <p className="text-gray-600">
          {t('faqDescription', 'Find answers to common questions about using the platform and checking your eligibility for schemes.')}
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder={t('searchFaqs', 'Search FAQs...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className="w-full text-left p-4 focus:outline-none bg-white flex justify-between items-center"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-gray-800">{getText(faq.question)}</span>
                {activeIndex === index ? (
                  <FaChevronUp className="text-[#13518e]" />
                ) : (
                  <FaChevronDown className="text-[#13518e]" />
                )}
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-50 border-top border-gray-200">
                  <p className="text-gray-600">{getText(faq.answer)}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">{t('noFaqsFound', 'No FAQs match your search. Try different keywords.')}</p>
          </div>
        )}
      </div>

      {/* Additional Help */}
      <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              {t('needMoreHelp', 'Need more help?')}
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>
                {t('needMoreHelpDesc', "If you couldn't find the answer to your question, please contact our support team.")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
