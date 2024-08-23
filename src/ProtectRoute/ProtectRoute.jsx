import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user,gotoSignin } = UserAuth();

    const shouldGoToSignup = gotoSignin;

    if (!user) {
        if (shouldGoToSignup) {
            return <Navigate to="/signup" />;
        }
        return <Navigate to="/login" />;
    }
    
    return children;
};

export default ProtectedRoute;
