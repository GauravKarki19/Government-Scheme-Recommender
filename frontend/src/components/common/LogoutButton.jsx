import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function LogoutButton({ className = '' }) {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    showToast('success', t('loggedOutSuccessfully'));
    navigate('/');
  };

  return (
    <button onClick={onLogout} className={className}>{t('logout')}</button>
  );
}