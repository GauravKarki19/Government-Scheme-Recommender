import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { FaInfoCircle } from 'react-icons/fa';

function SchemeEligibilityForm({ userDetails, setUserDetails, onSubmit, isSubmitting }) {
  const { locations } = useAppContext();
  const { t } = useTranslation();
  const [districts, setDistricts] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const occupations = ['farmer', 'student', 'business', 'government employee', 'private employee', 'unemployed', 'other'];
  const casteCategories = ['General', 'OBC', 'SC', 'ST'];
  const genderOptions = ['male', 'female', 'other'];

  useEffect(() => {
    if (userDetails.state && locations) {
      const selectedState = locations.states.find(s => s.name === userDetails.state);
      if (selectedState) {
        setDistricts(selectedState.districts);
      } else {
        setDistricts([]);
      }
    } else {
      setDistricts([]);
    }
  }, [userDetails.state, locations]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Clear district if state changes
    if (name === 'state') {
      setUserDetails({
        ...userDetails,
        [name]: value,
        district: ''
      });
    } else {
      setUserDetails({
        ...userDetails,
        [name]: value
      });
    }

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!userDetails.age) errors.age = t('ageRequired', 'Age is required');
    if (!userDetails.income) errors.income = t('incomeRequired', 'Income is required');
    if (!userDetails.occupation) errors.occupation = t('occupationRequired', 'Occupation is required');
    if (!userDetails.caste) errors.caste = t('casteRequired', 'Caste category is required');
    if (!userDetails.gender) errors.gender = t('genderRequired', 'Gender is required');
    if (!userDetails.state) errors.state = t('stateRequired', 'State is required');
    if (!userDetails.district) errors.district = t('districtRequired', 'District is required');

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit();
    }
  };

  if (!locations) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="alert alert-info mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FaInfoCircle className="h-5 w-5 text-gov-blue" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-gov-blue">
              {t('formInstructions', "Fill in your details to find government schemes you're eligible for.")}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="form-label">
            {t('age', 'Age')} <span className="text-gov-red">*</span>
          </label>
          <input
            type="number"
            name="age"
            value={userDetails.age}
            onChange={handleInputChange}
            className={`form-input ${
              formErrors.age ? 'border-gov-red ring-1 ring-gov-red' : ''
            }`}
            min="0"
            max="120"
            placeholder={t('agePlaceholder', 'Enter your age')}
          />
          {formErrors.age && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.age}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('annualIncome', 'Annual Income (₹)')} <span className="text-gov-red">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-neutral-500">₹</span>
            </div>
            <input
              type="number"
              name="income"
              value={userDetails.income}
              onChange={handleInputChange}
              className={`form-input pl-7 ${
                formErrors.income ? 'border-gov-red ring-1 ring-gov-red' : ''
              }`}
              min="0"
              placeholder={t('annualIncomePlaceholder', 'Annual income')}
            />
          </div>
          {formErrors.income && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.income}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('occupation', 'Occupation')} <span className="text-gov-red">*</span>
          </label>
          <select
            name="occupation"
            value={userDetails.occupation}
            onChange={handleInputChange}
            className={`form-select ${
              formErrors.occupation ? 'border-gov-red ring-1 ring-gov-red' : ''
            }`}
          >
            <option value="">{t('select', 'Select')}</option>
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>
                {occupation.charAt(0).toUpperCase() + occupation.slice(1)}
              </option>
            ))}
          </select>
          {formErrors.occupation && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.occupation}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('category', 'Category')} <span className="text-gov-red">*</span>
          </label>
          <select
            name="caste"
            value={userDetails.caste}
            onChange={handleInputChange}
            className={`form-select ${
              formErrors.caste ? 'border-gov-red ring-1 ring-gov-red' : ''
            }`}
          >
            <option value="">{t('select', 'Select')}</option>
            {casteCategories.map(caste => (
              <option key={caste} value={caste}>{caste}</option>
            ))}
          </select>
          {formErrors.caste && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.caste}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('gender', 'Gender')} <span className="text-gov-red">*</span>
          </label>
          <select
            name="gender"
            value={userDetails.gender}
            onChange={handleInputChange}
            className={`form-select ${
              formErrors.gender ? 'border-gov-red ring-1 ring-gov-red' : ''
            }`}
          >
            <option value="">{t('select', 'Select')}</option>
            {genderOptions.map(gender => (
              <option key={gender} value={gender}>
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </option>
            ))}
          </select>
          {formErrors.gender && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.gender}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('state', 'State')} <span className="text-gov-red">*</span>
          </label>
          <select
            name="state"
            value={userDetails.state}
            onChange={handleInputChange}
            className={`form-select ${
              formErrors.state ? 'border-gov-red ring-1 ring-gov-red' : ''
            }`}
          >
            <option value="">{t('select', 'Select')}</option>
            {locations.states.map(state => (
              <option key={state.name} value={state.name}>{state.name}</option>
            ))}
          </select>
          {formErrors.state && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.state}</p>
          )}
        </div>

        <div>
          <label className="form-label">
            {t('district', 'District')} <span className="text-gov-red">*</span>
          </label>
          <select
            name="district"
            value={userDetails.district}
            onChange={handleInputChange}
            className={`form-select ${
              formErrors.district ? 'border-gov-red ring-1 ring-gov-red' : ''
            } ${!userDetails.state ? 'bg-neutral-100 cursor-not-allowed' : ''}`}
            disabled={!userDetails.state}
          >
            <option value="">{t('select', 'Select')}</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
          {formErrors.district && (
            <p className="mt-1 text-sm text-gov-red">{formErrors.district}</p>
          )}
          {!userDetails.state && (
            <p className="mt-1 text-xs text-neutral-500">{t('pleaseSelectStateFirst', 'Please select a state first')}</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full py-3 text-base"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('checking', 'Checking...')}
            </span>
          ) : (
            t('checkEligibility', 'Check Eligibility')
          )}
        </button>
      </div>
    </form>
  );
}

export default SchemeEligibilityForm;
