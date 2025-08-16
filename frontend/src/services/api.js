import axios from 'axios';

// Use same-origin in production; in dev use VITE_API_URL or fallback to /api
const API_URL = import.meta.env.PROD
  ? '/api'
  : (import.meta.env.VITE_API_URL?.replace(/\/$/, '')) || '/api';

export const fetchSchemes = async () => {
  try {
    const response = await axios.get(`${API_URL}/schemes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching schemes:', error);
    throw error;
  }
};

export const checkEligibility = async (userDetails) => {
  console.log('checkEligibility called with:', userDetails);
  
  // Return mock data for testing based on user details
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Generating schemes based on user details');
      
      // Define all possible schemes
      const allSchemes = [
        {
          id: 1,
          name: {
            english: 'PM Kisan Samman Nidhi',
            hindi: 'पीएम किसान सम्मान निधि'
          },
          description: {
            english: 'Income support of ₹6000 per year for farmer families',
            hindi: 'किसान परिवारों के लिए ₹6000 प्रति वर्ष की आय सहायता'
          },
          benefits: {
            english: [
              'Direct income support of ₹6000 per year',
              'Paid in three equal installments of ₹2000 each',
              'Transferred directly to bank accounts'
            ],
            hindi: [
              'किसान परिवारों को ₹6000 प्रति वर्ष की सीधी आय सहायता',
              '₹2000 की तीन समान किस्तों में भुगतान',
              'सीधे बैंक खातों में स्थानांतरित'
            ]
          },
          eligibility: {
            english: [
              'All landholding farmer families',
              'Subject to exclusion criteria',
              'Valid bank account required'
            ],
            hindi: [
              'सभी भूमिधारक किसान परिवार',
              'बहिष्करण मानदंड के अधीन',
              'वैध बैंक खाता आवश्यक'
            ]
          },
          link: 'https://pmkisan.gov.in/',
          forOccupation: 'farmer'
        },
        {
          id: 2,
          name: {
            english: 'Ayushman Bharat Yojana',
            hindi: 'आयुष्मान भारत योजना'
          },
          description: {
            english: 'Health insurance coverage of ₹5 lakhs per family per year',
            hindi: 'प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवरेज'
          },
          benefits: {
            english: [
              'Health insurance coverage up to ₹5 lakhs per family per year',
              'Cashless treatment at empaneled hospitals',
              'Coverage for pre and post hospitalization expenses'
            ],
            hindi: [
              'प्रति परिवार प्रति वर्ष ₹5 लाख तक का स्वास्थ्य बीमा कवरेज',
              'पैनल में शामिल अस्पतालों में कैशलेस उपचार',
              'अस्पताल में भर्ती होने से पहले और बाद के खर्चों का कवरेज'
            ]
          },
          eligibility: {
            english: [
              'Families identified based on SECC database',
              'No restriction on family size, age or gender',
              'Covers pre-existing conditions from day one'
            ],
            hindi: [
              'SECC डेटाबेस के आधार पर पहचाने गए परिवार',
              'परिवार के आकार, उम्र या लिंग पर कोई प्रतिबंध नहीं',
              'पहले दिन से पहले से मौजूद स्थितियों को कवर करता है'
            ]
          },
          link: 'https://pmjay.gov.in/',
          forIncome: 'low'
        },
        {
          id: 3,
          name: {
            english: 'PM Awas Yojana (PMAY)',
            hindi: 'पीएम आवास योजना'
          },
          description: {
            english: 'Housing for all by 2022 - affordable housing scheme',
            hindi: '2022 तक सभी के लिए आवास - किफायती आवास योजना'
          },
          benefits: {
            english: [
              'Financial assistance for house construction',
              'Interest subsidy on home loans',
              'Preference to women, SC/ST, and disabled'
            ],
            hindi: [
              'घर निर्माण के लिए वित्तीय सहायता',
              'होम लोन पर ब्याज सब्सिडी',
              'महिलाओं, अनुसूचित जाति/अनुसूचित जनजाति और विकलांगों को प्राथमिकता'
            ]
          },
          eligibility: {
            english: [
              'Economically Weaker Section (EWS)',
              'Low Income Group (LIG)',
              'No house ownership in family'
            ],
            hindi: [
              'आर्थिक रूप से कमजोर वर्ग (EWS)',
              'निम्न आय वर्ग (LIG)',
              'परिवार में कोई घर स्वामित्व नहीं'
            ]
          },
          link: 'https://pmaymis.gov.in/',
          forIncome: 'low'
        },
        {
          id: 4,
          name: {
            english: 'National Pension Scheme',
            hindi: 'राष्ट्रीय पेंशन योजना'
          },
          description: {
            english: 'Voluntary pension scheme for retirement planning',
            hindi: 'सेवानिवृत्ति योजना के लिए स्वैच्छिक पेंशन योजना'
          },
          benefits: {
            english: [
              'Tax benefits under Section 80C and 80CCD',
              'Flexible investment options',
              'Partial withdrawal allowed for specific needs'
            ],
            hindi: [
              'धारा 80C और 80CCD के तहत कर लाभ',
              'लचीले निवेश विकल्प',
              'विशिष्ट जरूरतों के लिए आंशिक निकासी की अनुमति'
            ]
          },
          eligibility: {
            english: [
              'Indian citizens between 18-65 years',
              'Compliant with KYC norms',
              'Regular contribution required'
            ],
            hindi: [
              '18-65 वर्ष के बीच के भारतीय नागरिक',
              'KYC मानदंडों के अनुपालन',
              'नियमित योगदान आवश्यक'
            ]
          },
          link: 'https://www.npscra.nsdl.co.in/',
          forAge: 'adult'
        },
        {
          id: 5,
          name: {
            english: 'PM Ujjwala Yojana',
            hindi: 'पीएम उज्ज्वला योजना'
          },
          description: {
            english: 'Free LPG connections to women from BPL households',
            hindi: 'बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन'
          },
          benefits: {
            english: [
              'Free LPG connection with security deposit',
              'Financial assistance for first refill',
              'Improved health and reduced indoor pollution'
            ],
            hindi: [
              'सुरक्षा जमा के साथ मुफ्त एलपीजी कनेक्शन',
              'पहले रिफिल के लिए वित्तीय सहायता',
              'बेहतर स्वास्थ्य और कम इनडोर प्रदूषण'
            ]
          },
          eligibility: {
            english: [
              'Women from BPL households',
              'No existing LPG connection',
              'Aadhaar linked bank account'
            ],
            hindi: [
              'बीपीएल परिवारों की महिलाएं',
              'कोई मौजूदा एलपीजी कनेक्शन नहीं',
              'आधार से जुड़ा बैंक खाता'
            ]
          },
          link: 'https://pmuy.gov.in/',
          forGender: 'female',
          forIncome: 'low'
        },
        {
          id: 6,
          name: {
            english: 'Sukanya Samriddhi Yojana',
            hindi: 'सुकन्या समृद्धि योजना'
          },
          description: {
            english: 'Small savings scheme for girl child education and marriage expenses',
            hindi: 'बालिका शिक्षा और विवाह खर्च के लिए छोटी बचत योजना'
          },
          benefits: {
            english: [
              'High interest rate (currently 7.6%)',
              'Tax benefits under Section 80C',
              'Partial withdrawal allowed for education'
            ],
            hindi: [
              'उच्च ब्याज दर (वर्तमान में 7.6%)',
              'धारा 80C के तहत कर लाभ',
              'शिक्षा के लिए आंशिक निकासी की अनुमति'
            ]
          },
          eligibility: {
            english: [
              'Parents of girl child below 10 years',
              'Only for Indian residents',
              'Maximum two accounts per family'
            ],
            hindi: [
              '10 वर्ष से कम उम्र की बालिका के माता-पिता',
              'केवल भारतीय निवासियों के लिए',
              'प्रति परिवार अधिकतम दो खाते'
            ]
          },
          link: 'https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx',
          forGender: 'female',
          forAge: 'child'
        }
      ];
      
      // Filter schemes based on user details
      let eligibleSchemes = [];
      
      // Filter by occupation
      if (userDetails.occupation === 'farmer') {
        eligibleSchemes.push(...allSchemes.filter(scheme => scheme.forOccupation === 'farmer'));
      }
      
      // Filter by income
      if (userDetails.income === 'below_1lakh' || userDetails.income === '1_3lakh') {
        eligibleSchemes.push(...allSchemes.filter(scheme => scheme.forIncome === 'low' && !eligibleSchemes.some(s => s.id === scheme.id)));
      }
      
      // Filter by gender
      if (userDetails.gender === 'female') {
        eligibleSchemes.push(...allSchemes.filter(scheme => scheme.forGender === 'female' && !eligibleSchemes.some(s => s.id === scheme.id)));
      }
      
      // Filter by age
      const age = parseInt(userDetails.age, 10);
      if (age < 18) {
        eligibleSchemes.push(...allSchemes.filter(scheme => scheme.forAge === 'child' && !eligibleSchemes.some(s => s.id === scheme.id)));
      } else if (age >= 18) {
        eligibleSchemes.push(...allSchemes.filter(scheme => scheme.forAge === 'adult' && !eligibleSchemes.some(s => s.id === scheme.id)));
      }
      
      // If no schemes match, return at least one scheme
      if (eligibleSchemes.length === 0) {
        eligibleSchemes.push(allSchemes[Math.floor(Math.random() * allSchemes.length)]);
      }
      
      console.log('Returning eligible schemes:', eligibleSchemes);
      resolve(eligibleSchemes);
    }, 1500);
  });
};

export const fetchLocations = async () => {
  console.log('fetchLocations called');
  
  // Return mock data for testing
  return {
    states: [
      { name: 'Andhra Pradesh', districts: ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna'] },
      { name: 'Bihar', districts: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai'] },
      { name: 'Delhi', districts: ['Central Delhi', 'East Delhi', 'New Delhi', 'North Delhi', 'South Delhi'] },
      { name: 'Gujarat', districts: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha'] },
      { name: 'Haryana', districts: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad'] },
      { name: 'Karnataka', districts: ['Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban'] },
      { name: 'Maharashtra', districts: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed'] },
      { name: 'Uttar Pradesh', districts: ['Agra', 'Aligarh', 'Allahabad', 'Ambedkar Nagar', 'Amethi'] }
    ]
  };
};

export const fetchTranslations = async () => {
  try {
    // First try to get from API
    try {
      console.log('Attempting to fetch translations from API...');
      const response = await axios.get(`${API_URL}/translations`);
      console.log('API translations received:', response.data);
      return response.data;
    } catch (apiError) {
      // If API fails, use local translations
      console.log('API fetch failed, using local translations file as fallback');
      const localTranslations = await import('../data/translations.json');
      console.log('Local translations loaded:', localTranslations.default);
      return localTranslations.default;
    }
  } catch (error) {
    console.error('Error fetching translations:', error);
    throw error;
  }
};