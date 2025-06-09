// components/RequireVerification.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireVerification = ({ children }) => {
  const location = useLocation();
  const isVerified = localStorage.getItem('verified') === '1';

  if (!isVerified) {
    // Redirect to the not-verified page
    return <Navigate to="/not-verified" state={{ from: location }} replace />;
  }

  // If verified, render the child components
  return children;
};

export default RequireVerification;
