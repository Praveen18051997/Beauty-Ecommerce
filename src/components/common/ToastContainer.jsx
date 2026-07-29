import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full px-4 pointer-events-none">
      {toasts.map((toast) => {
        let icon = <Info className="w-5 h-5 text-rose-500" />;
        let borderColor = 'border-rose-300 dark:border-rose-800';

        if (toast.type === 'success') {
          icon = <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
          borderColor = 'border-emerald-300 dark:border-emerald-800';
        } else if (toast.type === 'error' || toast.type === 'warning') {
          icon = <AlertCircle className="w-5 h-5 text-amber-500" />;
          borderColor = 'border-amber-300 dark:border-amber-800';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 bg-white/95 dark:bg-[#16221F]/95 backdrop-blur-md rounded-2xl shadow-xl border ${borderColor} animate-slide-up transition-all duration-300`}
          >
            <div className="shrink-0 mt-0.5">{icon}</div>
            <div className="flex-1">
              {toast.title && (
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-0.5">
                  {toast.title}
                </h4>
              )}
              <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
