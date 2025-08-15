import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useAppContext } from '../../context/AppContext';
import {
  FaBookmark as FaBookmarkSolid,
  FaRegBookmark,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaIdCard,
  FaCheck,
  FaTimes,
  FaSearch,
  FaFilter,
  FaSpinner
} from 'react-icons/fa';

export default function BrowseSchemes() {
  const { t } = useTranslation();
  const { user, saveScheme, removeSavedScheme, applyScheme } = useAuth();
  const { showToast } = useToast();
  const { language, translations } = useAppContext();
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [savingSchemes, setSavingSchemes] = useState(new Set());
  const [applyingSchemes, setApplyingSchemes] = useState(new Set());

  useEffect(() => {
    fetchSchemes();
  }, []);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchTerm, selectedCategory, language]);

  const fetchSchemes = async () => {
    try {
      // Try to import the schemes data directly first
      const { schemes: schemesData } = await import('../../data/schemes.js');
      setSchemes(schemesData || []);
    } catch (error) {
      console.error('Error importing schemes:', error);
      // Fallback: try to load from public folder
      try {
        const response = await fetch('/schemes.json');
        const data = await response.json();
        setSchemes(data.schemes || []);
      } catch (fallbackError) {
        console.error('Fallback error:', fallbackError);
        showToast('error', 'Failed to load schemes');
      }
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(scheme => 
        scheme.name[language]?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description[language]?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category (you can extend this based on your scheme categories)
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(scheme => {
        // Add category logic based on your scheme structure
        // For now, we'll use a simple approach
        const schemeName = scheme.name[language]?.toLowerCase() || '';
        switch (selectedCategory) {
          case 'education':
            return schemeName.includes('education') || schemeName.includes('scholarship') || schemeName.includes('skill');
          case 'health':
            return schemeName.includes('health') || schemeName.includes('medical') || schemeName.includes('insurance');
          case 'agriculture':
            return schemeName.includes('farmer') || schemeName.includes('agriculture') || schemeName.includes('kisan');
          case 'women':
            return schemeName.includes('women') || schemeName.includes('mahila') || schemeName.includes('girl');
          case 'senior':
            return schemeName.includes('senior') || schemeName.includes('pension') || schemeName.includes('elderly');
          default:
            return true;
        }
      });
    }

    setFilteredSchemes(filtered);
  };

  const isSchemeBookmarked = (schemeId) => {
    return user?.savedSchemes?.some(s => s.schemeId === schemeId.toString()) || false;
  };

  const isSchemeApplied = (schemeId) => {
    return user?.appliedSchemes?.some(s => s.schemeId === schemeId.toString()) || false;
  };

  const handleSaveScheme = async (scheme) => {
    const schemeId = scheme.id.toString();
    setSavingSchemes(prev => new Set([...prev, schemeId]));
    
    try {
      if (isSchemeBookmarked(scheme.id)) {
        await removeSavedScheme(schemeId);
        showToast('success', t('removedFromSaved'));
      } else {
        await saveScheme({
          schemeId,
          name: scheme.name[language] || scheme.name.english,
          link: scheme.link
        });
        showToast('success', t('schemeSaved'));
      }
    } catch (error) {
      console.error('Error saving scheme:', error);
      showToast('error', t('failedToSave'));
    } finally {
      setSavingSchemes(prev => {
        const newSet = new Set(prev);
        newSet.delete(schemeId);
        return newSet;
      });
    }
  };

  const handleApplyScheme = async (scheme) => {
    const schemeId = scheme.id.toString();
    setApplyingSchemes(prev => new Set([...prev, schemeId]));
    
    try {
      await applyScheme({
        schemeId,
        name: scheme.name[language] || scheme.name.english,
        link: scheme.link,
        status: 'applied'
      });
      showToast('success', t('applicationSubmitted'));
    } catch (error) {
      console.error('Error applying to scheme:', error);
      showToast('error', t('failedToApply'));
    } finally {
      setApplyingSchemes(prev => {
        const newSet = new Set(prev);
        newSet.delete(schemeId);
        return newSet;
      });
    }
  };

  const toggleSchemeDetails = (schemeId) => {
    setExpandedScheme(expandedScheme === schemeId ? null : schemeId);
  };

  if (!translations) return null;

  if (loading) {
    return (
      <div className="py-10">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <FaSpinner className="animate-spin text-4xl text-gov-blue" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t('browseAllSchemes')}
          </h1>
          <p className="text-gray-600">
            {t('discoverSchemes')}
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder={t('searchSchemes')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="form-select pl-10"
              >
                <option value="all">
                  {t('allCategories')}
                </option>
                <option value="education">
                  {t('education')}
                </option>
                <option value="health">
                  {t('health')}
                </option>
                <option value="agriculture">
                  {t('agriculture')}
                </option>
                <option value="women">
                  {t('womenChildren')}
                </option>
                <option value="senior">
                  {t('seniorCitizens')}
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {t('showingSchemes', { count: filteredSchemes.length })}
          </p>
        </div>

        {/* Schemes List */}
        <div className="space-y-6">
          {filteredSchemes.map(scheme => (
            <div
              key={scheme.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                <div className="flex-1">
                  <h3 
                    className="text-xl font-semibold text-gray-900 cursor-pointer hover:text-gov-blue transition-colors"
                    onClick={() => toggleSchemeDetails(scheme.id)}
                  >
                    {scheme.name[language] || scheme.name.english}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    {scheme.description[language] || scheme.description.english}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  {/* Save Button */}
                  <button
                    onClick={() => handleSaveScheme(scheme)}
                    disabled={savingSchemes.has(scheme.id.toString())}
                    className={`inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      isSchemeBookmarked(scheme.id)
                        ? 'bg-gov-blue text-white hover:bg-blue-700'
                        : 'bg-white text-gov-blue border border-gov-blue hover:bg-blue-50'
                    }`}
                  >
                    {savingSchemes.has(scheme.id.toString()) ? (
                      <FaSpinner className="animate-spin mr-2" size={14} />
                    ) : isSchemeBookmarked(scheme.id) ? (
                      <FaBookmarkSolid className="mr-2" size={14} />
                    ) : (
                      <FaRegBookmark className="mr-2" size={14} />
                    )}
                    {isSchemeBookmarked(scheme.id) 
                      ? t('saved')
                      : t('save')
                    }
                  </button>

                  {/* Apply Button */}
                  <button
                    onClick={() => handleApplyScheme(scheme)}
                    disabled={applyingSchemes.has(scheme.id.toString()) || isSchemeApplied(scheme.id)}
                    className={`inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 ${
                      isSchemeApplied(scheme.id)
                        ? 'bg-green-100 text-green-800 cursor-not-allowed'
                        : 'bg-gov-green text-white hover:bg-green-700'
                    }`}
                  >
                    {applyingSchemes.has(scheme.id.toString()) ? (
                      <FaSpinner className="animate-spin mr-2" size={14} />
                    ) : isSchemeApplied(scheme.id) ? (
                      <FaCheck className="mr-2" size={14} />
                    ) : null}
                    {isSchemeApplied(scheme.id)
                      ? t('applied')
                      : t('apply')
                    }
                  </button>

                  {/* Expand/Collapse Button */}
                  <button
                    onClick={() => toggleSchemeDetails(scheme.id)}
                    className="text-gray-400 hover:text-gov-blue transition-colors"
                  >
                    {expandedScheme === scheme.id ? (
                      <FaChevronUp size={18} />
                    ) : (
                      <FaChevronDown size={18} />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedScheme === scheme.id && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Application Process */}
                    {scheme.applicationProcess && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                          <FaFileAlt className="text-gov-blue mr-2" />
                          {t('applicationProcess')}
                        </h4>
                        <div className="text-gray-600 text-sm">
                          {scheme.applicationProcess[language] || scheme.applicationProcess.english}
                        </div>
                      </div>
                    )}

                    {/* Required Documents */}
                    {scheme.documents && scheme.documents.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                          <FaIdCard className="text-gov-blue mr-2" />
                          {t('requiredDocuments')}
                        </h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          {scheme.documents.map((doc, index) => (
                            <li key={index} className="flex items-center">
                              <FaCheck className="text-gov-green mr-2 flex-shrink-0" size={12} />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Official Link */}
                  {scheme.link && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <a
                        href={scheme.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gov-blue hover:text-blue-700 transition-colors"
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        {t('visitOfficialWebsite')}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">
              {language === 'english' 
                ? 'No schemes found matching your criteria'
                : 'आपके मानदंडों से मेल खाने वाली कोई योजना नहीं मिली'
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}