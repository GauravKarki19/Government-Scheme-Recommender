import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Use same-origin in production; in dev use VITE_API_URL or fallback to /api
const API_URL = import.meta.env.PROD
  ? '/api'
  : (import.meta.env.VITE_API_URL?.replace(/\/$/, '')) || '/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (token) {
          const res = await axios.get(`${API_URL}/user/me`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(res.data);
        }
      } catch (e) {
        console.error('Auth init error', e);
        setToken(null);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [token]);

  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const signup = async (payload) => {
    const res = await axios.post(`${API_URL}/auth/signup`, payload);
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    return true;
  };

  const saveScheme = async (scheme) => {
    if (!token) throw new Error('Not authenticated');
    const res = await axios.post(`${API_URL}/user/schemes/save`, scheme, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser((u) => ({ ...u, savedSchemes: res.data.savedSchemes }));
  };

  const removeSavedScheme = async (schemeId) => {
    if (!token) throw new Error('Not authenticated');
    const res = await axios.delete(`${API_URL}/user/schemes/save/${schemeId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser((u) => ({ ...u, savedSchemes: res.data.savedSchemes }));
  };

  const applyScheme = async (scheme) => {
    if (!token) throw new Error('Not authenticated');
    const res = await axios.post(`${API_URL}/user/schemes/apply`, scheme, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUser((u) => ({ ...u, appliedSchemes: res.data.appliedSchemes }));
  };

  const value = { user, token, loading, login, signup, logout, saveScheme, removeSavedScheme, applyScheme };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}