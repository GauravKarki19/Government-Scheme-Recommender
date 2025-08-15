import { FaPhone, FaEnvelope, FaTwitter, FaLinkedin, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  const quickLinks = [
    { key: 'about', path: '/about' },
    { key: 'contact', path: '/contact' },
    { key: 'faq', path: '/faq' },
    { key: 'feedback', path: '/feedback' }
  ];

  const legalLinks = [
    { key: 'termsOfUse', path: '/terms' },
    { key: 'privacyPolicy', path: '/privacy' },
    { key: 'disclaimer', path: '/disclaimer' },
    { key: 'sitemap', path: '/sitemap' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 z-10">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-xl font-bold">SchemeCheck</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footerAbout', 'The Government Scheme Eligibility Assistant helps citizens find and access government welfare schemes they are eligible for.')}
            </p>
            <p className="flex items-center text-gray-400">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <span>{t('footerLocation', 'New Delhi, India')}</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('quickLinks', 'Quick Links')}</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('legal', 'Legal')}</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.key}>
                  <Link to={link.path} className="text-gray-400 hover:text-white transition-colors">
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">{t('contactUs', 'Contact Us')}</h3>
            <div className="space-y-4">
              <p className="flex items-center text-gray-400">
                <FaPhone className="mr-3 text-gray-500" />
                <span>{t('tollFreeNumber', 'Toll-Free: 1800-11-1111')}</span>
              </p>
              <p className="flex items-center text-gray-400">
                <FaEnvelope className="mr-3 text-gray-500" />
                <span>help@schemecheck.gov.in</span>
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors" aria-label="Twitter">
                  <FaTwitter size={18} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors" aria-label="LinkedIn">
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} {t('copyright', 'Government of India. All Rights Reserved.')}
            </p>
            <p className="text-gray-500 text-sm mt-4 md:mt-0 flex items-center">
              {t('madeWith', 'Made with')} <FaHeart className="mx-1 text-red-500" size={14} /> {t('forCitizens', 'for citizens of India')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
