import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// Placeholder authentication function, replace with your actual logic
const isAuthenticated = () => {
  // Example check; implement your actual check here
  return !!localStorage.getItem('userToken');
};

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
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