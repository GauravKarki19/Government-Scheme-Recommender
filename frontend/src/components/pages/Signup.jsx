import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export default function Signup() {
  const { t } = useTranslation();
  const { signup } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', state: '', district: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(form);
      showToast('success', t('signupSuccess'));
      navigate('/my-schemes');
    } catch (err) {
      const msg = err?.response?.data?.message || t('signupFailed');
      setError(msg);
      showToast('error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 relative overflow-hidden">
      {/* Ultra Rich Background Design Layer */}
      <div className="pointer-events-none absolute inset-0">
        {/* Massive Curved Blade Sweeps */}
        <div className="absolute -top-60 -left-60 w-[1000px] h-[1000px] opacity-35">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <path d="M0,250 Q200,150 400,250 Q600,350 800,250 Q900,300 1000,250 L1000,0 L0,0 Z" fill="url(#megaBlade1)" />
            <path d="M0,350 Q250,200 500,350 Q750,500 1000,350 L1000,0 L0,0 Z" fill="url(#megaBlade2)" />
            <path d="M0,450 Q300,300 600,450 Q800,550 1000,450 L1000,0 L0,0 Z" fill="url(#megaBlade3)" />
            <path d="M0,550 Q350,400 700,550 Q850,650 1000,550 L1000,0 L0,0 Z" fill="url(#megaBlade4)" />
            <defs>
              <linearGradient id="megaBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#1e40af" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="megaBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.4" />
                <stop offset="40%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="80%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="megaBlade3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="megaBlade4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Bottom Right Mega Blade Sweep */}
        <div className="absolute -bottom-60 -right-60 w-[1000px] h-[1000px] opacity-35 rotate-180">
          <svg viewBox="0 0 1000 1000" className="w-full h-full">
            <path d="M0,250 Q200,150 400,250 Q600,350 800,250 Q900,300 1000,250 L1000,0 L0,0 Z" fill="url(#megaBlade5)" />
            <path d="M0,350 Q250,200 500,350 Q750,500 1000,350 L1000,0 L0,0 Z" fill="url(#megaBlade6)" />
            <path d="M0,450 Q300,300 600,450 Q800,550 1000,450 L1000,0 L0,0 Z" fill="url(#megaBlade7)" />
            <path d="M0,550 Q350,400 700,550 Q850,650 1000,550 L1000,0 L0,0 Z" fill="url(#megaBlade8)" />
            <defs>
              <linearGradient id="megaBlade5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="megaBlade6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="megaBlade7" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="megaBlade8" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Sharp Multi-Directional Blade Cuts */}
        <div className="absolute top-0 left-0 w-full h-full opacity-25">
          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            <polygon points="0,0 60,0 0,60" fill="url(#sharpBlade1)" />
            <polygon points="40,100 100,100 100,40" fill="url(#sharpBlade2)" />
            <polygon points="100,0 100,35 65,0" fill="url(#sharpBlade3)" />
            <polygon points="0,65 35,100 0,100" fill="url(#sharpBlade4)" />
            <polygon points="20,0 40,0 20,20" fill="url(#sharpBlade5)" />
            <polygon points="80,100 100,100 100,80" fill="url(#sharpBlade6)" />
            <defs>
              <linearGradient id="sharpBlade1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="sharpBlade2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="sharpBlade3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="sharpBlade4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="sharpBlade5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="sharpBlade6" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Multiple Curved Blade Elements */}
        <div className="absolute top-1/4 right-1/4 w-48 h-48 opacity-30 animate-pulse">
          <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-12">
            <path d="M10,50 Q30,10 50,30 Q70,50 50,70 Q30,90 10,50 Z" fill="url(#curvedBlade1)" />
            <defs>
              <radialGradient id="curvedBlade1">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#60a5fa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 opacity-30 animate-pulse" style={{animationDelay: '1.5s'}}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-45">
            <path d="M20,50 Q40,20 60,40 Q80,60 60,80 Q40,100 20,50 Z" fill="url(#curvedBlade2)" />
            <defs>
              <radialGradient id="curvedBlade2">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.9" />
                <stop offset="40%" stopColor="#60a5fa" stopOpacity="0.5" />
                <stop offset="80%" stopColor="#93c5fd" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-1/6 left-1/5 w-36 h-36 opacity-25 animate-pulse" style={{animationDelay: '0.5s'}}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform rotate-75">
            <path d="M25,50 Q45,25 65,45 Q85,65 65,85 Q45,105 25,50 Z" fill="url(#curvedBlade3)" />
            <defs>
              <radialGradient id="curvedBlade3">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-1/6 right-1/5 w-44 h-44 opacity-25 animate-pulse" style={{animationDelay: '2.5s'}}>
          <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-30">
            <path d="M15,50 Q35,15 55,35 Q75,55 55,75 Q35,95 15,50 Z" fill="url(#curvedBlade4)" />
            <defs>
              <radialGradient id="curvedBlade4">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Multiple Flowing Wave Blades */}
        <div className="absolute top-1/2 left-0 w-full h-32 opacity-15">
          <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,10 Q25,5 50,10 T100,10 L100,20 L0,20 Z" fill="url(#flowBlade1)" />
            <defs>
              <linearGradient id="flowBlade1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e40af" stopOpacity="0.7" />
                <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="70%" stopColor="#60a5fa" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-1/3 left-0 w-full h-24 opacity-12">
          <svg viewBox="0 0 100 15" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,7 Q20,3 40,7 Q60,11 80,7 Q90,5 100,7 L100,15 L0,15 Z" fill="url(#flowBlade2)" />
            <defs>
              <linearGradient id="flowBlade2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-2/3 left-0 w-full h-28 opacity-13">
          <svg viewBox="0 0 100 18" className="w-full h-full" preserveAspectRatio="none">
            <path d="M0,9 Q30,4 60,9 T120,9 L120,18 L0,18 Z" fill="url(#flowBlade3)" />
            <defs>
              <linearGradient id="flowBlade3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0.5" />
                <stop offset="40%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="80%" stopColor="#93c5fd" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#dbeafe" stopOpacity="0.05" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Multiple Enhanced Background Blur Orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-300/35 to-blue-500/25 blur-3xl animate-pulse"></div>
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-blue-400/25 to-blue-600/35 blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
      <div className="pointer-events-none absolute top-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-gradient-to-br from-blue-200/20 to-blue-400/15 blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="pointer-events-none absolute bottom-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-blue-500/20 to-blue-300/25 blur-3xl animate-pulse" style={{animationDelay: '0.5s'}}></div>

      {/* Main card with enhanced glass effect */}
      <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 relative">
        {/* Card inner glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
        
        <div className="text-center mb-6 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">{t('createAccount')}</h1>
          <p className="text-sm text-neutral-600 mt-2">{t('createAccountDesc')}</p>
        </div>
        
        {error && <div className="alert alert-warning text-sm mb-4 relative z-10">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="form-label text-neutral-700 font-medium">{t('fullName')}</label>
            <input 
              className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
              name="name" 
              placeholder={t('fullName')} 
              value={form.name} 
              onChange={onChange} 
              required 
            />
          </div>
          <div>
            <label className="form-label text-neutral-700 font-medium">{t('email')}</label>
            <input 
              className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
              name="email" 
              type="email" 
              placeholder={t('email')} 
              value={form.email} 
              onChange={onChange} 
              required 
            />
          </div>
          <div>
            <label className="form-label text-neutral-700 font-medium">{t('password')}</label>
            <input 
              className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
              name="password" 
              type="password" 
              placeholder={t('password')} 
              value={form.password} 
              onChange={onChange} 
              required 
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label text-neutral-700 font-medium">{t('state')}</label>
              <input 
                className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                name="state" 
                placeholder={t('state')} 
                value={form.state} 
                onChange={onChange} 
                required 
              />
            </div>
            <div>
              <label className="form-label text-neutral-700 font-medium">{t('district')}</label>
              <input 
                className="form-input bg-white/70 border-neutral-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200" 
                name="district" 
                placeholder={t('district')} 
                value={form.district} 
                onChange={onChange} 
                required 
              />
            </div>
          </div>
          
          {/* Transparent sign up button as requested */}
          <button 
            disabled={loading} 
            className="w-full border-2 border-blue-400 text-blue-600 hover:bg-blue-50 hover:border-blue-500 rounded-xl py-3.5 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-white/50"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('signingUp')}
              </div>
            ) : t('signUp')}
          </button>
        </form>
        
        <div className="mt-8 text-center relative z-10">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/90 text-neutral-500">{t('alreadyHaveAccount')}</span>
            </div>
          </div>
          <p className="text-sm text-neutral-600 mt-4">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">{t('loginHere')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}