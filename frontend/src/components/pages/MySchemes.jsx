import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useAppContext } from '../../context/AppContext';
import {
  FaBookmark,
  FaFileAlt,
  FaExternalLinkAlt,
  FaTrash,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSpinner
} from 'react-icons/fa';
import { useState } from 'react';

export default function MySchemes() {
  const { t } = useTranslation();
  const { user, removeSavedScheme } = useAuth();
  const { showToast } = useToast();
  const { language } = useAppContext();
  const [removingScheme, setRemovingScheme] = useState(null);

  if (!user) return null;

  const handleRemoveSavedScheme = async (schemeId) => {
    setRemovingScheme(schemeId);
    try {
      await removeSavedScheme(schemeId);
      showToast('success', t('removedFromSaved'));
    } catch (error) {
      console.error('Error removing scheme:', error);
      showToast('error', t('failedToSave'));
    } finally {
      setRemovingScheme(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      saved: { color: 'bg-blue-100 text-blue-800', icon: FaBookmark, text: t('saved') },
      applied: { color: 'bg-yellow-100 text-yellow-800', icon: FaClock, text: t('applied') },
      in_progress: { color: 'bg-blue-100 text-blue-800', icon: FaSpinner, text: t('inProgress') },
      approved: { color: 'bg-green-100 text-green-800', icon: FaCheckCircle, text: t('approved') },
      rejected: { color: 'bg-red-100 text-red-800', icon: FaTimesCircle, text: t('rejected') }
    };

    const config = statusConfig[status] || statusConfig.applied;
    const Icon = config.icon;

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="mr-1" size={12} />
        {config.text}
      </span>
    );
  };

  return (
    <div className="py-10">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('mySchemes')}</h1>
              <p className="text-gray-600 mt-2">{t('manageSchemes')}</p>
            </div>
            <Link
              to="/browse-schemes"
              className="inline-flex items-center px-6 py-3 bg-gov-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
            >
              <FaSearch className="mr-2" size={16} />
              {t('browseMoreSchemes')}
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FaBookmark className="text-gov-blue" size={20} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('savedSchemes')}</p>
                <p className="text-2xl font-bold text-gray-900">{user.savedSchemes?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <FaFileAlt className="text-gov-green" size={20} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('appliedSchemes')}</p>
                <p className="text-2xl font-bold text-gray-900">{user.appliedSchemes?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FaCheckCircle className="text-yellow-600" size={20} />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t('approved')}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user.appliedSchemes?.filter(s => s.status === 'approved').length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Saved Schemes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaBookmark className="text-gov-blue mr-2" />
                {t('savedSchemes')}
              </h2>
            </div>
            <div className="p-6">
              {user.savedSchemes?.length ? (
                <div className="space-y-4">
                  {user.savedSchemes.map((scheme) => (
                    <div key={scheme.schemeId} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{scheme.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">
                            {t('savedOn')} {new Date(scheme.savedAt).toLocaleDateString()}
                          </p>
                          <div className="flex items-center space-x-3">
                            {scheme.link && (
                              <a
                                href={scheme.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-sm text-gov-blue hover:text-blue-700 transition-colors"
                              >
                                <FaExternalLinkAlt className="mr-1" size={12} />
                                {t('officialSite')}
                              </a>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveSavedScheme(scheme.schemeId)}
                          disabled={removingScheme === scheme.schemeId}
                          className="text-red-500 hover:text-red-700 transition-colors p-1"
                          title={t('removeFromSaved')}
                        >
                          {removingScheme === scheme.schemeId ? (
                            <FaSpinner className="animate-spin" size={16} />
                          ) : (
                            <FaTrash size={16} />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaBookmark className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 mb-4">{t('noSavedSchemes')}</p>
                  <Link
                    to="/browse-schemes"
                    className="inline-flex items-center px-6 py-3 bg-gov-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                  >
                    <FaPlus className="mr-2" size={16} />
                    {t('browseSchemes')}
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Applied Schemes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <FaFileAlt className="text-gov-green mr-2" />
                {t('appliedSchemes')}
              </h2>
            </div>
            <div className="p-6">
              {user.appliedSchemes?.length ? (
                <div className="space-y-4">
                  {user.appliedSchemes.map((scheme) => (
                    <div key={scheme.schemeId} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900 mb-1">{scheme.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            {getStatusBadge(scheme.status)}
                          </div>
                          <div className="text-sm text-gray-500 space-y-1">
                            <p>{t('appliedOn')}: {new Date(scheme.appliedAt).toLocaleDateString()}</p>
                            <p>{t('updatedOn')}: {new Date(scheme.lastUpdatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      {scheme.link && (
                        <div className="pt-3 border-t border-gray-100">
                          <a
                            href={scheme.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-gov-blue hover:text-blue-700 transition-colors"
                          >
                            <FaExternalLinkAlt className="mr-1" size={12} />
                            {t('checkApplicationStatus')}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaFileAlt className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 mb-4">{t('noAppliedSchemes')}</p>
                  <Link
                    to="/browse-schemes"
                    className="inline-flex items-center px-6 py-3 bg-gov-green text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg transform hover:scale-105 duration-200"
                  >
                    <FaSearch className="mr-2" size={16} />
                    {t('findSchemesToApply')}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('quickActions')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/browse-schemes"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <FaSearch className="text-gov-blue mr-3" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t('browseSchemes')}</p>
                <p className="text-sm text-gray-500">{t('findNewSchemes')}</p>
              </div>
            </Link>
            
            <Link
              to="/check-eligibility"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <FaCheckCircle className="text-gov-green mr-3" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t('checkEligibility')}</p>
                <p className="text-sm text-gray-500">{t('seeQualifyingSchemes')}</p>
              </div>
            </Link>
            
            <Link
              to="/check-status"
              className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <FaClock className="text-yellow-600 mr-3" size={20} />
              <div>
                <p className="font-medium text-gray-900">{t('checkStatus')}</p>
                <p className="text-sm text-gray-500">{t('trackApplicationStatus')}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}