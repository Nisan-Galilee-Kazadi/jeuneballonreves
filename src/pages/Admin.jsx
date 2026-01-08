import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    // Rediriger automatiquement vers le dashboard admin
    return <Navigate to="/admin/dashboard" replace />;
};

export default Admin;

