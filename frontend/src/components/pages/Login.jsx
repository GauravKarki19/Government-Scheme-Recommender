import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      showToast('success', t('loginSuccess'));
      navigate('/my-schemes');
    } catch (err) {
      const msg = err?.response?.data?.message || t('loginFailed');
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
      {/* Rich Background Design Layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large Blade Waves - Top */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] opacity-30">
          <svg viewBox="0 0 800 800" className="w-full h-full">
            <path d="M0,200 Q200,100 400,200 Q600,300 800,200 L800,0 L0,0 Z" fill="url(#topBlade1)" />
            <path d="M0,300 Q250,150 500,300 Q650,400 800,300 L800,0 L0,0 Z" fill="url(#topBlade2)" />
            <path d="M0,400 Q300,250 600,400 Q700,500 800,400 L800,0 L0,0 Z" fill="url(#topBlade3)" />
            <defs>
              <linearGradient id="topBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="topBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="topBlade3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Large Blade Waves - Bottom */}
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] opacity-30 rotate-180">
          <svg viewBox="0 0 800 800" className="w-full h-full">
            <path d="M0,200 Q200,100 400,200 Q600,300 800,200 L800,0 L0,0 Z" fill="url(#bottomBlade1)" />
            <path d="M0,300 Q250,150 500,300 Q650,400 800,300 L800,0 L0,0 Z" fill="url(#bottomBlade2)" />
            <path d="M0,400 Q300,250 600,400 Q700,500 800,400 L800,0 L0,0 Z" fill="url(#bottomBlade3)" />
            <defs>
              <linearGradient id="bottomBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#1e40af" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="bottomBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="bottomBlade3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Diagonal Corner Blades */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="0,0 50,0 0,50" fill="url(#cornerBlade1)" />
            <polygon points="50,100 100,100 100,50" fill="url(#cornerBlade2)" />
            <polygon points="100,0 100,25 75,0" fill="url(#cornerBlade3)" />
            <polygon points="0,75 25,100 0,100" fill="url(#cornerBlade4)" />
            <defs>
              <linearGradient id="cornerBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="cornerBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="cornerBlade3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="cornerBlade4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Floating Animated Blade Elements */}
        <div className="absolute top-1/4 left-1/4 w-40 h-40 opacity-25 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-45">
            <path d="M15,50 Q35,15 55,35 Q75,55 55,75 Q35,95 15,50 Z" fill="url(#floatBlade1)" />
            <defs>
              <radialGradient id="floatBlade1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 opacity-25 animate-pulse" style={{animationDelay: '1s'}}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-12">
            <path d="M25,50 Q45,25 65,45 Q85,65 65,85 Q45,105 25,50 Z" fill="url(#floatBlade2)" />
            <defs>
              <radialGradient id="floatBlade2">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-2/3 left-1/6 w-28 h-28 opacity-20 animate-pulse" style={{animationDelay: '2s'}}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-90">
            <path d="M30,50 Q50,30 70,50 Q50,70 30,50 Z" fill="url(#floatBlade3)" />
            <defs>
              <radialGradient id="floatBlade3">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Horizontal Wave Blades */}
        <div className="absolute top-1/2 left-0 w-full h-24 opacity-15">
          <svg viewBox="0 0 100 15" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,7 Q25,3 50,7 T100,7 L100,15 L0,15 Z" fill="url(#waveBlade1)" />
            <defs>
              <linearGradient id="waveBlade1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Vertical Wave Blades */}
        <div className="absolute top-0 left-1/3 w-24 h-full opacity-10">
          <svg viewBox="0 0 15 100" className="w-full h-full" preserveAspectRatio="none">
            <path d="M7,0 Q3,25 7,50 T7,100 L15,100 L15,0 Z" fill="url(#verticalBlade1)" />
            <defs>
              <linearGradient id="verticalBlade1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.5" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Enhanced background blur orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-300/30 to-blue-500/20 blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-400/20 to-blue-600/30 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="pointer-events-none absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-blue-200/15 to-blue-400/10 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>

      {/* Main card with enhanced glass effect */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 relative">
        {/* Card inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        <div className="text-center mb-6 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm-8 5a6 6 0 1112 0H8z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{t('loginToAccount')}</h1>
          <p className="text-sm text-neutral-600 mt-2">{t('loginToAccountDesc')}</p>
        </div>
        
        {error && <div className="alert alert-warning text-sm mb-4 relative z-10">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="form-label text-neutral-700 font-medium">{t('email')}</label>
            <input 
              className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
              type="email" 
              placeholder={t('email')} 
              value={email} 
              onChange={(e)=>setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label className="form-label text-neutral-700 font-medium">{t('password')}</label>
            <input 
              className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
              type="password" 
              placeholder={t('password')} 
              value={password} 
              onChange={(e)=>setPassword(e.target.value)} 
              required 
            />
          </div>
          <button 
            disabled={loading} 
            className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white rounded-xl py-3.5 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('loggingIn')}
              </div>
            ) : t('login')}
          </button>
        </form>
        
        <div className="mt-8 text-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/90 text-neutral-500">{t('dontHaveAccount')}</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-4">
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">{t('signUpHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}