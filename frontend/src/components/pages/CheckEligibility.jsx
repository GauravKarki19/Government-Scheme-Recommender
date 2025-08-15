import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from 'react-i18next';
import { checkEligibility } from '../../services/api';
import Loading from '../common/Loading';
import Error from '../common/Error';
import SimpleSchemeResults from '../SimpleSchemeResults';
import { FaSearch, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CheckEligibility = () => {
  const { loading, error, locations } = useAppContext();
  const { t } = useTranslation();
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

  if (loading) return <Loading />;
  if (error) return <Error message={String(error)} />;
  if (apiError) return <Error message={apiError} />;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      setApiError(null);
      const schemes = await checkEligibility(userDetails);
      setEligibleSchemes(schemes || []);
      setShowResults(true);
    } catch (err) {
      setApiError(t('failedCheckEligibility', 'Failed to check eligibility. Please try again later.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setShowResults(false);
    setEligibleSchemes([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-12 sm:py-16">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-6">
              <Link to="/" className="text-white hover:text-blue-200 transition-colors text-sm sm:text-base">
                <FaArrowLeft className="inline mr-2" />
                {t('backToHome', 'Back to Home')}
              </Link>
            </div>
            <div className="text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                {t('checkYourEligibility', 'Check Your Eligibility')}
              </h1>
              <p className="text-base sm:text-lg text-blue-100 max-w-3xl mx-auto px-4">
                {t('findOutSchemes', 'Find out which government schemes you qualify for based on your profile.')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-8 sm:py-12">
          {showResults ? (
            <SimpleSchemeResults 
              schemes={eligibleSchemes} 
              onBack={resetForm} 
            />
          ) : (
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                {t('enterYourDetails', 'Enter Your Details')}
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('age', 'Age')}
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={userDetails.age}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('annualIncome', 'Annual Income (₹)')}
                    </label>
                    <select
                      id="income"
                      name="income"
                      value={userDetails.income}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('selectIncome', 'Select Income Range')}</option>
                      <option value="below_1lakh">{t('below1Lakh', 'Below ₹1 Lakh')}</option>
                      <option value="1_3lakh">{t('between1And3Lakh', '₹1 Lakh - ₹3 Lakh')}</option>
                      <option value="3_5lakh">{t('between3And5Lakh', '₹3 Lakh - ₹5 Lakh')}</option>
                      <option value="5_10lakh">{t('between5And10Lakh', '₹5 Lakh - ₹10 Lakh')}</option>
                      <option value="above_10lakh">{t('above10Lakh', 'Above ₹10 Lakh')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('occupation', 'Occupation')}
                    </label>
                    <select
                      id="occupation"
                      name="occupation"
                      value={userDetails.occupation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('selectOccupation', 'Select Occupation')}</option>
                      <option value="student">{t('student', 'Student')}</option>
                      <option value="farmer">{t('farmer', 'Farmer')}</option>
                      <option value="business">{t('business', 'Business')}</option>
                      <option value="government">{t('government', 'Government Employee')}</option>
                      <option value="private">{t('private', 'Private Sector')}</option>
                      <option value="unemployed">{t('unemployed', 'Unemployed')}</option>
                      <option value="retired">{t('retired', 'Retired')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="caste" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('category', 'Category')}
                    </label>
                    <select
                      id="caste"
                      name="caste"
                      value={userDetails.caste}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('selectCategory', 'Select Category')}</option>
                      <option value="general">{t('general', 'General')}</option>
                      <option value="obc">{t('obc', 'OBC')}</option>
                      <option value="sc">{t('sc', 'SC')}</option>
                      <option value="st">{t('st', 'ST')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('gender', 'Gender')}
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={userDetails.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('selectGender', 'Select Gender')}</option>
                      <option value="male">{t('male', 'Male')}</option>
                      <option value="female">{t('female', 'Female')}</option>
                      <option value="other">{t('other', 'Other')}</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('state', 'State')}
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={userDetails.state}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">{t('selectState', 'Select State')}</option>
                      {locations && locations.states && locations.states.map(state => (
                        <option key={state.name} value={state.name}>{state.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('district', 'District')}
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={userDetails.district}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                      disabled={!userDetails.state}
                    >
                      <option value="">{t('selectDistrict', 'Select District')}</option>
                      {userDetails.state && locations && locations.states && 
                        locations.states.find(s => s.name === userDetails.state)?.districts.map(district => (
                          <option key={district} value={district}>{district}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>{t('checking', 'Checking...')}</span>
                    ) : (
                      <>
                        <FaSearch className="mr-2" size={16} />
                        {t('checkEligibility', 'Check Eligibility')}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CheckEligibility;
