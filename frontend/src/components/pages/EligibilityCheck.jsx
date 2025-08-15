import React, { useState } from 'react';
import { FaCheckCircle, FaClipboardList } from 'react-icons/fa';
import SchemeEligibilityForm from '../SchemeEligibilityForm';
import SchemeResults from '../SchemeResults';
import { checkEligibility } from '../../services/api';
import Error from '../common/Error';

const EligibilityCheck = () => {
  const [userDetails, setUserDetails] = useState({
    age: '',
    income: '',
    occupation: '',
    caste: '',
    gender: '',
    state: '',
    district: ''
  });
  const [eligibleSchemes, setEligibleSchemes] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleCheckEligibility = async () => {
    try {
      setIsSubmitting(true);
      setApiError(null);
      
      // In a real app, this would call the API
      // For now, we'll simulate a response after a delay
      setTimeout(() => {
        // Sample eligible schemes data
        const sampleSchemes = [
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
            link: 'https://pmkisan.gov.in/'
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
            link: 'https://pmjay.gov.in/'
          },
          {
            id: 3,
            name: {
              english: 'PM Awas Yojana',
              hindi: 'पीएम आवास योजना'
            },
            description: {
              english: 'Housing for all by 2022',
              hindi: '2022 तक सभी के लिए आवास'
            },
            link: 'https://pmaymis.gov.in/'
          }
        ];
        
        setEligibleSchemes(sampleSchemes);
        setShowResults(true);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (err) {
      setApiError('Failed to check eligibility. Please try again later.');
      setIsSubmitting(false);
    }
  };

  const exportResults = () => {
    // Create a text representation of the results
    let text = `Government Scheme Eligibility Results\n\n`;
    text += `Results:\n`;
    
    eligibleSchemes.forEach(scheme => {
      text += `- ${scheme.name.english}: ${scheme.description.english}\n`;
      text += `  ${scheme.link}\n\n`;
    });
    
    // Create a blob and download it
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'eligible-schemes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareResults = () => {
    if (navigator.share) {
      let text = `Government Scheme Eligibility Results\n\n`;
      text += `Results:\n`;
      
      eligibleSchemes.forEach(scheme => {
        text += `- ${scheme.name.english}: ${scheme.description.english}\n`;
        text += `  ${scheme.link}\n\n`;
      });
      
      navigator.share({
        title: 'My Eligible Government Schemes',
        text: text
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      alert('Web Share API not supported in your browser');
    }
  };

  const goBack = () => {
    setShowResults(false);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        {apiError && <Error message={apiError} />}
        
        {!showResults ? (
          <>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FaClipboardList className="text-blue-600 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Check Your Eligibility</h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Fill in your details below to find out which government schemes you qualify for. Your information is secure and only used for eligibility checking.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
              <SchemeEligibilityForm
                userDetails={userDetails}
                setUserDetails={setUserDetails}
                onSubmit={handleCheckEligibility}
                isSubmitting={isSubmitting}
              />
              
              <div className="mt-6 flex items-center text-sm text-gray-500">
                <FaCheckCircle className="text-green-500 mr-2" />
                Your data is secure and only used to check eligibility
              </div>
            </div>
            
            <div className="mt-12 max-w-3xl mx-auto bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Check Application Status</h3>
              <p className="text-gray-600 mb-4">
                If you've already applied for a scheme, you can check your application status here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text" 
                  placeholder="Enter Application ID" 
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center">
                  Check Status
                  <FaArrowRight className="ml-2" size={14} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <SchemeResults
              eligibleSchemes={eligibleSchemes}
              exportResults={exportResults}
              shareResults={shareResults}
              goBack={goBack}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EligibilityCheck;