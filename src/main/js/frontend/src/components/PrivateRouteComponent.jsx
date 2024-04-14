import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAdmin, children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) {
        return null;
    }

    return children || <Outlet />;
};

export default ProtectedRoute;