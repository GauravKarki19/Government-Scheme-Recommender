import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: '' });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = t('nameRequired', 'Name is required');
    if (!formData.email.trim()) {
      errors.email = t('emailRequired', 'Email is required');
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = t('invalidEmail', 'Invalid email address');
    }
    if (!formData.subject.trim()) errors.subject = t('subjectRequired', 'Subject is required');
    if (!formData.message.trim()) errors.message = t('messageRequired', 'Message is required');
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('contactTitle', 'Contact Us')}</h1>
        <p className="text-gray-600">{t('contactDescription', 'Have questions or feedback? Reach out to us through any of the channels below.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('contactInformation', 'Contact Information')}</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white"><FaMapMarkerAlt /></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t('address', 'Address')}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {t('addressLines', 'Ministry of Electronics & IT\nElectronics Niketan, 6, CGO Complex\nNew Delhi - 110003').split('\n').map((l, i) => (<span key={i}>{l}<br /></span>))}
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white"><FaPhone /></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t('phoneNumber', 'Phone Number')}</h3>
                  <p className="mt-1 text-sm text-gray-600">{t('phoneLines', 'Toll-Free: 1800-11-1111\nHelpdesk: +91-11-2436-3101').split('\n').map((l, i) => (<span key={i}>{l}<br /></span>))}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="bg-[#13518e] p-2 rounded-full text-white"><FaEnvelope /></div>
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-800">{t('emailAddress', 'Email Address')}</h3>
                  <p className="mt-1 text-sm text-gray-600">help@schemes.gov.in<br />support@digitalindia.gov.in</p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 font-medium">{t('officeHours', 'Office Hours: Monday to Friday, 9:00 AM to 5:30 PM')}</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">{t('sendMessage', 'Send Message')}</h2>
            {submitSuccess && (
              <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4">
                <div className="flex"><div className="ml-3"><p className="text-sm text-green-700">{t('messageSent', 'Your message has been sent successfully. We will get back to you soon.')}</p></div></div>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('yourName', 'Your Name')} <span className="text-red-500">*</span></label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`mt-1 block w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                  {formErrors.name && <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('yourEmail', 'Your Email')} <span className="text-red-500">*</span></label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`mt-1 block w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                  {formErrors.email && <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>}
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">{t('subject', 'Subject')} <span className="text-red-500">*</span></label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className={`mt-1 block w-full border ${formErrors.subject ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`} />
                {formErrors.subject && <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('message', 'Message')} <span className="text-red-500">*</span></label>
                <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleChange} className={`mt-1 block w-full border ${formErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}></textarea>
                {formErrors.message && <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>}
              </div>
              <div>
                <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#13518e] hover:bg-[#0e3b66] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                  {isSubmitting ? <span>{t('sending', 'Sending...')}</span> : (<><FaPaperPlane className="mr-2" /><span>{t('submit', 'Submit')}</span></>)}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
