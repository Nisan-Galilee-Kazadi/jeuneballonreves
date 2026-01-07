import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

const AlertModal = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'info', 
  confirmText = 'OK', 
  cancelText = 'Annuler',
  onConfirm,
  showCancel = false,
  customIcon = null
}) => {
  const getIcon = () => {
    if (customIcon) return customIcon;
    
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-500" size={48} />;
      case 'error':
        return <XCircle className="text-red-500" size={48} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-500" size={48} />;
      case 'info':
      default:
        return <Info className="text-blue-500" size={48} />;
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          buttonBg: 'bg-green-600 hover:bg-green-700',
          buttonSecondary: 'bg-green-100 hover:bg-green-200 text-green-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          buttonBg: 'bg-red-600 hover:bg-red-700',
          buttonSecondary: 'bg-red-100 hover:bg-red-200 text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          buttonBg: 'bg-yellow-600 hover:bg-yellow-700',
          buttonSecondary: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          buttonBg: 'bg-blue-600 hover:bg-blue-700',
          buttonSecondary: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
        };
    }
  };

  const colors = getColors();

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md ${colors.bg} ${colors.border} border-2 rounded-3xl shadow-2xl overflow-hidden`}
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {/* Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getIcon()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-primary uppercase italic tracking-tighter mb-1">
                      {title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="flex-shrink-0 p-2 text-slate-400 hover:text-slate-600 transition-colors rounded-lg hover:bg-slate-100/50"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pb-6">
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {message}
              </p>
            </div>

            {/* Footer */}
            <div className={`px-6 py-4 bg-slate-50/50 border-t ${colors.border} flex gap-3 justify-end`}>
              {showCancel && (
                <button
                  onClick={onClose}
                  className={`px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${colors.buttonSecondary}`}
                >
                  {cancelText}
                </button>
              )}
              <button
                onClick={handleConfirm}
                className={`px-6 py-3 rounded-xl font-black italic uppercase text-xs tracking-widest text-white shadow-lg transition-all ${colors.buttonBg}`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook pour utiliser facilement les alertes
export const useAlert = () => {
  const [alert, setAlert] = React.useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    confirmText: 'OK',
    cancelText: 'Annuler',
    showCancel: false,
    onConfirm: null
  });

  const showAlert = (config) => {
    setAlert({
      isOpen: true,
      title: config.title || 'Information',
      message: config.message || '',
      type: config.type || 'info',
      confirmText: config.confirmText || 'OK',
      cancelText: config.cancelText || 'Annuler',
      showCancel: config.showCancel || false,
      onConfirm: config.onConfirm || null,
      customIcon: config.customIcon || null
    });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isOpen: false }));
  };

  // Méthodes rapides
  const success = (message, title = 'Succès') => showAlert({ title, message, type: 'success' });
  const error = (message, title = 'Erreur') => showAlert({ title, message, type: 'error' });
  const warning = (message, title = 'Attention') => showAlert({ title, message, type: 'warning' });
  const info = (message, title = 'Information') => showAlert({ title, message, type: 'info' });
  const confirm = (message, onConfirm, title = 'Confirmation') => 
    showAlert({ title, message, type: 'warning', showCancel: true, onConfirm });

  return {
    alert,
    showAlert,
    hideAlert,
    success,
    error,
    warning,
    info,
    confirm
  };
};

export default AlertModal;
