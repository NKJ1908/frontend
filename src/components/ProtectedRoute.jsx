import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthentificated = localStorage.getItem('token')
    if (!isAuthentificated) {
        return <Navigate to="/" replace />
    }
    return <Outlet />
};

export default ProtectedRoute;