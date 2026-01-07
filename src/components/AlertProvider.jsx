import React, { createContext, useContext } from 'react';
import AlertModal, { useAlert } from './AlertModal';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const alert = useAlert();

  return (
    <AlertContext.Provider value={alert}>
      {children}
      <AlertModal
        isOpen={alert.alert.isOpen}
        onClose={alert.hideAlert}
        title={alert.alert.title}
        message={alert.alert.message}
        type={alert.alert.type}
        confirmText={alert.alert.confirmText}
        cancelText={alert.alert.cancelText}
        showCancel={alert.alert.showCancel}
        onConfirm={alert.alert.onConfirm}
        customIcon={alert.alert.customIcon}
      />
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlertContext must be used within an AlertProvider');
  }
  return context;
};

export default AlertProvider;
