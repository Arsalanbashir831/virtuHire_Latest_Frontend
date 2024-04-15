// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import useUserData from '../customhooks/useUserData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const userData = useUserData();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated , setAuthenticated] = useState(true)

//   const isAuthenticated = userData !== null && localStorage.getItem('token') !== null;
  useEffect(() => {
    if (userData===null && localStorage.getItem('token') === null ) {
        setAuthenticated(false)
    }
    if (userData !== undefined) { // Ensure userData is not undefined
      setLoading(false);
    }
  }, [userData , isAuthenticated]);


  return (
    <AuthContext.Provider value={{ isAuthenticated, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
