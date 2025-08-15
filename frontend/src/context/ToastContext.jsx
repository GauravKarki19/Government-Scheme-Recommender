import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const ToastContext = createContext(null);

export const useToast = () => useContext(ToastContext);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((type, message, options = {}) => {
    const id = ++idCounter;
    const duration = options.duration ?? 3000;
    setToasts((prev) => [...prev, { id, type, message }]);
    if (duration > 0) {
      setTimeout(() => removeToast(id), duration);
    }
  }, [removeToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {/* Toast container - top center */}
      <div className="fixed inset-x-0 top-4 z-[10000] pointer-events-none">
        <div className="mx-auto max-w-xs px-4 space-y-3">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`pointer-events-auto flex justify-center items-center px-4 py-3 rounded-lg shadow-card text-sm border transition-all duration-200 bg-white animate-[fadeIn_0.2s_ease-out] ${
                t.type === 'success' ? 'border-green-200' : t.type === 'error' ? 'border-red-200' : 'border-blue-200'
              }`}
            >
              <div className="mr-3 mt-0.5">
                {t.type === 'success' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {t.type === 'error' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 112 0 1 1 0 01-2 0zm1-8a1 1 0 00-1 1v5a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                )}
                {t.type === 'info' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zM9 9a1 1 0 112 0v5a1 1 0 11-2 0V9zm1-4a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="text-neutral-800">{t.message}</div>
              <button onClick={() => removeToast(t.id)} className="ml-4 text-neutral-400 hover:text-neutral-600">✕</button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}