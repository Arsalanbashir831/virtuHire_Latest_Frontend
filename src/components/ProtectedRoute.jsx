import React from 'react';
import { Navigate } from 'react-router-dom';

// Placeholder authentication function, replace with your actual logic
const isAuthenticated = () => {
  // Example check; implement your actual check here
  return !!localStorage.getItem('userToken');
};

const ProtectedRoute = ({ path, element: Component, ...rest }) => {
  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export default ProtectedRoute;
