// src/App.js
import React from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import ResponsiveNavBar from './components/Navbar';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import EasyApply from './pages/EasyApply';
import AppliedJobs from './pages/AppliedJobs';
import Hire from './pages/Hire';
import JobPost from './pages/JobPost';
import Profile from './pages/Profile';
import EmailVerification from './pages/Otp';
import CandidateRecommender from './pages/CandidateRecommender';
import AIQA from './pages/AIQA';
import Feedback from './pages/Feedback';
import { useAuth } from './context/AuthContext';

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/signup', '/otp'];
  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  console.log(isAuthenticated);
  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner
  }

  return (
    <>
      {!shouldHideNavBar && <ResponsiveNavBar />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/EasyApply" element={isAuthenticated ? <EasyApply /> : <Navigate to="/login" replace />} />
        <Route path="/applied" element={isAuthenticated ? <AppliedJobs /> : <Navigate to="/login" replace />} />
        <Route path="/hire" element={isAuthenticated ? <Hire /> : <Navigate to="/login" replace />} />
        <Route path="/jobpost" element={isAuthenticated ? <JobPost /> : <Navigate to="/login" replace />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/AIQA" element={isAuthenticated ? <AIQA /> : <Navigate to="/login" replace />} />
        <Route path="/feedback" element={isAuthenticated ? <Feedback /> : <Navigate to="/login" replace />} />
        <Route path="/otp" element={<EmailVerification />} />
        <Route path="/candidateRecommendation" element={isAuthenticated ? <CandidateRecommender /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;
