import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import EasyApply from './pages/EasyApply';
import ResponsiveNavBar from './components/Navbar';
import AppliedJobs from './pages/AppliedJobs';
import Hire from './pages/Hire';
import JobPost from './pages/JobPost';
import Profile from './pages/Profile';
import EmailVerification from './pages/Otp';
import CandidateRecommender from './pages/CandidateRecommender';
import ProtectedRoute from './components/ProtectedRoute'; // Importing ProtectedRoute

const App = () => {
  const location = useLocation();

  const hideNavBarPaths = ['/login', '/signup','/otp'];

  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <ResponsiveNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/EasyApply" element={<EasyApply />} />
        <ProtectedRoute path="/applied" element={<AppliedJobs />} />
        <Route path="/hire" element={<Hire />} />
        <ProtectedRoute path="/jobpost" element={<JobPost />} />
        <ProtectedRoute path="/profile" element={<Profile />} />
        <Route path="/otp" element={<EmailVerification />} />
        <Route path="/candidateRecommendation" element={<CandidateRecommender />} />
      </Routes>
    </>
  );
};

export default App;

