import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaFileAlt, FaArrowLeft} from 'react-icons/fa';
import { useAppContext } from '../../context/AppContext';

const StatusCheck = () => {
  const { language, translations } = useAppContext();
  const [applicationId, setApplicationId] = useState('');
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get translations for the current language
  const t = translations[language] || {};
  
  useEffect(() => {
    // Extract application ID from URL if present
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setApplicationId(id);
      checkStatus(id);
    }
  }, [location.search]);
  
  const checkStatus = (id) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // For demo purposes, we'll generate a random status
      const statuses = ['approved', 'pending', 'rejected', 'under_review'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      setStatus({
        id: id,
        status: randomStatus,
        scheme: 'PM Kisan Samman Nidhi',
        appliedDate: '2023-10-15',
        lastUpdated: '2023-11-02',
        nextSteps: randomStatus === 'rejected' 
          ? 'Please reapply with correct documentation.' 
          : 'Your application is being processed. No action required at this time.',
        documents: ['Aadhaar Card', 'Income Certificate', 'Bank Statement']
      });
      
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (applicationId) {
      checkStatus(applicationId);
    }
  };
  
  const getStatusIcon = (statusType) => {
    switch(statusType) {
      case 'approved':
        return <FaCheckCircle className="text-green-500 text-4xl" />;
      case 'pending':
      case 'under_review':
        return <FaHourglassHalf className="text-yellow-500 text-4xl" />;
      case 'rejected':
        return t?.statusApproved || <FaTimesCircle className="text-red-500 text-4xl" />;
      default:
        return t?.statusPending || <FaFileAlt className="text-blue-500 text-4xl" />;
    }
  };
  
  const getStatusText = (statusType) => {
    switch(statusType) {
      case 'approved':
        return t?.statusRejected || t?.statusApproved || 'Approved';
      case 'pending':
        return t?.statusPending || 'Pending';
      case 'under_review':
        return t?.statusUnknown || t?.statusUnderReview || 'Under Review';
      case 'rejected':
        return t?.statusRejected || 'Rejected';
      default:
        return t?.statusUnknown || 'Unknown';
    }
  };
  
  const getStatusColor = (statusType) => {
    switch(statusType) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container-custom">
        <button
          onClick={goBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          {t?.backToHome || 'Back to Home'}
        </button>
      
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FaFileAlt className="text-blue-600 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t?.checkApplicationStatus || `Check ${t?.applicationId || 'Application Status'}`}
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t?.enterApplicationIdDesc || 'Enter your application ID to check the current status of your scheme application.'}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="application-id" className="block text-sm font-medium text-gray-700 mb-1">
                {t?.applicationId || 'Application ID'}
              </label>
              <div className="flex">
                <input
                  id="application-id"
                  type="text"
                  value={applicationId}
                  onChange={(e) => setApplicationId(e.target.value)}
                  placeholder={t?.applicationIdPlaceholder || "e.g., APP12345678"}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-r-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (t?.checking || 'Checking...') : (t?.check || 'Check')}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        {error && (
          <div className="max-w-3xl mx-auto bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center">
              <FaTimesCircle className="text-red-500 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {isLoading && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl p-8 text-center">
            <div className="animate-pulse">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        )}
        
        {status && !isLoading && (
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center md:items-start mb-6">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  {getStatusIcon(status.status)}
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t?.appliedOn || `Application ${status.id}`}</h2>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.status)}`}>
                    {getStatusText(status.status)}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.scheme || 'Scheme'}</h3>
                  <p className="text-lg font-medium text-gray-900">{status.scheme}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.appliedOn || 'Applied On'}</h3>
                  <p className="text-lg font-medium text-gray-900">{status.appliedDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">{t?.lastUpdated || 'Last Updated'}</h3>
                  <p className="text-lg font-medium text-gray-900">{status.lastUpdated}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">{t?.documentsSubmitted || 'Documents Submitted'}</h3>
                <ul className="space-y-2">
                  {status.documents.map((doc, index) => (
                    <li key={index} className="flex items-center">
                      <FaCheckCircle className="text-green-500 mr-2" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t?.nextSteps || 'Next Steps'}</h3>
                <p className="text-gray-700">{status.nextSteps}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCheck;