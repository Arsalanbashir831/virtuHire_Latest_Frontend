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
import ChatRoom from './pages/ChatRoom';
import ForgetPassword from './pages/ForgetPassword';
import NewPassword from './pages/NewPassword';

const App = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/signup', '/otp','/forget','/newPassword'];
  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  

  return (
    <>
      {!shouldHideNavBar && <ResponsiveNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forget" element={<ForgetPassword />} />
        <Route path="/newPassword" element={<NewPassword />} />
        <Route path="/EasyApply" element={ <EasyApply />} />
        <Route path="/applied" element={ <AppliedJobs /> } />
        <Route path="/hire" element={ <Hire /> } />
        <Route path="/jobpost" element={ <JobPost /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/AIQA" element={ <AIQA /> } />
        <Route path="/feedback" element={ <Feedback /> } />
        <Route path="/otp" element={<EmailVerification />} />
        <Route path="/candidateRecommendation" element={ <CandidateRecommender /> } />
        <Route path="/chats" element={ <ChatRoom /> } />
      </Routes>
    </>
  );
};

export default App;
