import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import {
  FaFileDownload,
  FaBookmark as FaBookmarkSolid,
  FaRegBookmark,
  FaShare,
  FaArrowLeft,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
  FaFileAlt,
  FaIdCard,
  FaCheck,
  FaChrome,
  FaSpinner
} from 'react-icons/fa';
import { isSchemeBookmarked, toggleSchemeBookmark } from '../utils/storage';
import { addBrowserBookmark, createShareableUrl, createBookmarkTitle } from '../utils/browserBookmark';

function SchemeResults({
  eligibleSchemes,
  exportResults,
  shareResults,
  goBack
}) {
  const { language, translations } = useAppContext();
  const { user, saveScheme, removeSavedScheme, applyScheme } = useAuth();
  const { showToast } = useToast();
  const [expandedScheme, setExpandedScheme] = useState(null);
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState({});
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);
  const [bookmarkToastMessage, setBookmarkToastMessage] = useState('');
  const [isBookmarkingBrowser, setIsBookmarkingBrowser] = useState(false);
  const [savingSchemes, setSavingSchemes] = useState(new Set());
  const [applyingSchemes, setApplyingSchemes] = useState(new Set());

  useEffect(() => {
    // Initialize bookmarked state for each scheme
    const bookmarkedState = {};
    eligibleSchemes.forEach(scheme => {
      bookmarkedState[scheme.id] = isSchemeBookmarked(scheme.id);
    });
    setBookmarkedSchemes(bookmarkedState);
  }, [eligibleSchemes]);

  if (!translations) return null;

  const t = translations[language];

  const isSchemeBookmarked = (schemeId) => {
    return user?.savedSchemes?.some(s => s.schemeId === schemeId.toString()) || false;
  };

  const isSchemeApplied = (schemeId) => {
    return user?.appliedSchemes?.some(s => s.schemeId === schemeId.toString()) || false;
  };

  const handleSaveScheme = async (scheme) => {
    if (!user) {
      showToast('error', t('pleaseLoginToSave'));
      return;
    }

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
    if (!user) {
      showToast('error', t('pleaseLoginToApply'));
      return;
    }

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
    if (expandedScheme === schemeId) {
      setExpandedScheme(null);
    } else {
      setExpandedScheme(schemeId);
    }
  };

  const handleBookmarkToggle = async (scheme) => {
    // If the scheme has a link and we're bookmarking (not unbookmarking)
    if (scheme.link && !bookmarkedSchemes[scheme.id]) {
      try {
        // Extract domain for the toast message
        let domain = '';
        try {
          const url = new URL(scheme.link);
          domain = url.hostname;
        } catch (e) {
          domain = 'reference site';
        }

        // Create a title for the bookmark
        const title = language === 'english'
          ? `${scheme.name.english} - Government Scheme`
          : `${scheme.name.hindi} - सरकारी योजना`;

        // Add the bookmark to the browser
        const success = await addBrowserBookmark(title, scheme.link);

        if (success) {
          // Show toast message
          setBookmarkToastMessage(
            language === 'english'
              ? `Official site for ${scheme.name.english} bookmarked (${domain})!`
              : `${scheme.name.hindi} की आधिकारिक साइट बुकमार्क की गई (${domain})!`
          );
          setShowBookmarkToast(true);

          // Hide toast after 3 seconds
          setTimeout(() => {
            setShowBookmarkToast(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Error bookmarking scheme link:', error);
      }
    }

    // Also handle the internal app bookmarking as before
    const isCurrentlyBookmarked = bookmarkedSchemes[scheme.id];
    const success = toggleSchemeBookmark(scheme);

    if (success) {
      setBookmarkedSchemes({
        ...bookmarkedSchemes,
        [scheme.id]: !isCurrentlyBookmarked
      });

      // Only show toast for internal bookmarking if we didn't already show one for browser bookmarking
      if (!scheme.link || isCurrentlyBookmarked) {
        // Show toast message
        setBookmarkToastMessage(
          !isCurrentlyBookmarked
            ? (language === 'english' ? 'Scheme bookmarked in app successfully!' : 'योजना ऐप में सफलतापूर्वक बुकमार्क की गई!')
            : (language === 'english' ? 'Scheme removed from app bookmarks!' : 'योजना ऐप बुकमार्क से हटा दी गई!')
        );
        setShowBookmarkToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowBookmarkToast(false);
        }, 3000);
      }
    }
  };

  const bookmarkInBrowser = async () => {
    setIsBookmarkingBrowser(true);

    try {
      // Create a shareable URL with the scheme IDs
      const shareableUrl = createShareableUrl(eligibleSchemes);

      // Create a title for the bookmark
      const title = createBookmarkTitle(eligibleSchemes, language);

      // Add the bookmark to the browser
      const success = await addBrowserBookmark(title, shareableUrl);

      // Show toast message
      if (success) {
        // Create a more informative message that includes the reference site
        let message = '';
        if (eligibleSchemes.length === 1 && eligibleSchemes[0].link) {
          try {
            const url = new URL(eligibleSchemes[0].link);
            const domain = url.hostname;
            message = language === 'english'
              ? `Scheme bookmarked with reference to ${domain}!`
              : `${domain} के संदर्भ के साथ योजना बुकमार्क की गई!`;
          } catch (e) {
            message = language === 'english'
              ? 'Scheme bookmarked with reference site!'
              : 'संदर्भ साइट के साथ योजना बुकमार्क की गई!';
          }
        } else if (eligibleSchemes.length > 1) {
          // Count how many schemes have reference links
          const schemesWithRefs = eligibleSchemes.filter(scheme => scheme.link).length;

          if (schemesWithRefs > 0) {
            message = language === 'english'
              ? `${eligibleSchemes.length} schemes bookmarked with ${schemesWithRefs} reference sites!`
              : `${schemesWithRefs} संदर्भ साइटों के साथ ${eligibleSchemes.length} योजनाएं बुकमार्क की गईं!`;
          } else {
            message = language === 'english'
              ? `${eligibleSchemes.length} schemes bookmarked in your browser!`
              : `${eligibleSchemes.length} योजनाएं आपके ब्राउज़र में बुकमार्क की गईं!`;
          }
        } else {
          message = language === 'english'
            ? 'Page bookmarked in your browser!'
            : 'पेज आपके ब्राउज़र में बुकमार्क किया गया!';
        }

        setBookmarkToastMessage(message);
      } else {
        setBookmarkToastMessage(
          language === 'english'
            ? 'Bookmark cancelled or not supported in this browser.'
            : 'बुकमार्क रद्द किया गया या इस ब्राउज़र में समर्थित नहीं है।'
        );
      }
    } catch (error) {
      console.error('Error bookmarking in browser:', error);
      setBookmarkToastMessage(
        language === 'english'
          ? 'Could not bookmark in browser. Try pressing Ctrl+D manually.'
          : 'ब्राउज़र में बुकमार्क नहीं कर सका। मैन्युअल रूप से Ctrl+D दबाने का प्रयास करें।'
      );
    } finally {
      setIsBookmarkingBrowser(false);
      setShowBookmarkToast(true);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowBookmarkToast(false);
      }, 3000);
    }
  };

  const bookmarkAllSchemes = async () => {
    let allBookmarked = true;
    let bookmarkedCount = 0;
    let officialSitesCount = 0;

    // First, bookmark all official sites in the browser
    for (const scheme of eligibleSchemes) {
      if (scheme.link) {
        officialSitesCount++;
        try {
          // Create a title for the bookmark
          const title = language === 'english'
            ? `${scheme.name.english} - Government Scheme`
            : `${scheme.name.hindi} - सरकारी योजना`;

          // Add the bookmark to the browser
          await addBrowserBookmark(title, scheme.link);
          bookmarkedCount++;
        } catch (error) {
          console.error(`Error bookmarking scheme ${scheme.id}:`, error);
        }
      }
    }

    // Then handle the internal app bookmarking
    eligibleSchemes.forEach(scheme => {
      if (!bookmarkedSchemes[scheme.id]) {
        toggleSchemeBookmark(scheme);
        allBookmarked = false;
      }
    });

    // Update state
    const updatedBookmarks = {};
    eligibleSchemes.forEach(scheme => {
      updatedBookmarks[scheme.id] = true;
    });
    setBookmarkedSchemes(updatedBookmarks);

    // Show toast message
    let message = '';
    if (officialSitesCount > 0) {
      message = language === 'english'
        ? `${bookmarkedCount} official sites bookmarked and all schemes saved in app!`
        : `${bookmarkedCount} आधिकारिक साइटें बुकमार्क की गईं और सभी योजनाएं ऐप में सहेजी गईं!`;
    } else {
      message = language === 'english'
        ? 'All schemes saved in app bookmarks!'
        : 'सभी योजनाएं ऐप बुकमार्क में सहेजी गईं!';
    }

    setBookmarkToastMessage(message);
    setShowBookmarkToast(true);

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowBookmarkToast(false);
    }, 3000);
  };

  return (
    <div className="relative">
      {/* Bookmark Toast Notification */}
      {showBookmarkToast && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto bg-green-100 border-l-4 border-gov-green text-gov-green p-3 sm:p-4 rounded-lg shadow-md z-50 animate-fade-in-out max-w-sm">
          <div className="flex items-center">
            <FaCheck className="mr-2 flex-shrink-0" />
            <span className="text-sm sm:text-base">{bookmarkToastMessage}</span>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{t.results}</h2>
        <button
          onClick={goBack}
          className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          {t.back}
        </button>
      </div>

      {eligibleSchemes.length > 0 ? (
        <div>
          <div className="space-y-4 mb-10">
            {eligibleSchemes.map(scheme => (
              <div
                key={scheme.id}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-sm transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                  <h3
                    className="text-lg sm:text-xl font-medium text-gray-900 cursor-pointer flex-1"
                    onClick={() => toggleSchemeDetails(scheme.id)}
                  >
                    {scheme.name[language]}
                  </h3>
                  <div className="flex items-center justify-end space-x-2 sm:space-x-3">
                    {/* Save Button - only show if user is logged in */}
                    {user && (
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
                    )}

                    {/* Apply Button - only show if user is logged in */}
                    {user && (
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
                    )}

                    <button
                      onClick={() => handleBookmarkToggle(scheme)}
                      className="text-gray-400 hover:text-gov-blue focus:outline-none transition-colors duration-200"
                      aria-label={bookmarkedSchemes[scheme.id] ? "Remove from bookmarks" : "Add to bookmarks"}
                      title={scheme.link
                        ? (language === 'english'
                            ? `Bookmark official site: ${scheme.link}`
                            : `आधिकारिक साइट बुकमार्क करें: ${scheme.link}`)
                        : (language === 'english'
                            ? "Save scheme in app bookmarks"
                            : "योजना को ऐप बुकमार्क में सहेजें")}
                    >
                      {bookmarkedSchemes[scheme.id] ? (
                        <FaBookmarkSolid size={18} className="text-gov-blue" />
                      ) : (
                        <FaRegBookmark size={18} />
                      )}
                    </button>
                    <button
                      onClick={() => toggleSchemeDetails(scheme.id)}
                      className="text-gray-400 hover:text-gov-blue focus:outline-none transition-colors duration-200"
                      aria-label={expandedScheme === scheme.id ? "Collapse details" : "Expand details"}
                    >
                      {expandedScheme === scheme.id ? (
                        <FaChevronUp size={18} />
                      ) : (
                        <FaChevronDown size={18} />
                      )}
                    </button>
                  </div>
                </div>

                <div className={expandedScheme === scheme.id ? 'mt-4' : 'hidden'}>
                  <p className="text-gray-600 mb-6 text-sm border-t border-gray-100 pt-4 mt-2">
                    {scheme.description[language]}
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6">
                    {scheme.applicationProcess && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                          <FaFileAlt className="text-gov-blue mr-2" />
                          {t.applicationProcess}
                        </h4>
                        
                        <div className="text-gray-600 text-sm">
                          {scheme.applicationProcess[language]}
                        </div>
                      </div>
                    )}

                    {scheme.documents && scheme.documents.length > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="text-base font-medium text-gray-900 mb-3 flex items-center">
                          <FaIdCard className="text-gov-blue mr-2" />
                          {t.requiredDocuments}
                        </h4>
                        
                        <ul className="space-y-2 text-gray-600 text-sm">
                          {scheme.documents.map((doc, index) => (
                            <li key={index} className="flex items-start">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gov-blue mt-1.5 mr-2 flex-shrink-0"></span>
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500 flex items-center mb-4 md:mb-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {language === 'english' 
                        ? 'Last updated: June 2023' 
                        : 'अंतिम अपडेट: जून 2023'}
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                      {scheme.link && (
                        <a
                          href={scheme.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gov-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          {language === 'english' ? 'Visit Official Site' : 'आधिकारिक साइट पर जाएं'}
                          <FaExternalLinkAlt className="ml-2 text-xs" />
                        </a>
                      )}
                      
                      <button
                        onClick={() => handleBookmarkToggle(scheme)}
                        className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {bookmarkedSchemes[scheme.id] ? (
                          <FaBookmarkSolid className="mr-2 text-gov-blue" />
                        ) : (
                          <FaRegBookmark className="mr-2" />
                        )}
                        {language === 'english' ? 'Bookmark' : 'बुकमार्क करें'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-8 mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {language === 'english' ? 'Actions' : 'कार्रवाई'}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={exportResults}
                className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaFileDownload className="mr-2" />
                {t.export}
              </button>
              
              <button
                onClick={bookmarkAllSchemes}
                className="inline-flex items-center justify-center px-4 py-2 bg-gov-blue text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                <FaBookmarkSolid className="mr-2" />
                {language === 'english' ? 'Bookmark All' : 'सभी बुकमार्क करें'}
              </button>
              
              <button
                onClick={shareResults}
                className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FaShare className="mr-2" />
                {t.share}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                {t.noSchemes}
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  {t.tryDifferentCriteria || "Try different criteria to find schemes you may be eligible for."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
        <p className="text-sm text-neutral-600">
          <strong className="font-medium">{language === 'english' ? 'Disclaimer:' : 'अस्वीकरण:'}</strong> {t.disclaimer}
        </p>
      </div>
    </div>
  );
}

export default SchemeResults;