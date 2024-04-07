import React, { useEffect } from 'react';
import { Route, Routes, useLocation,Navigate } from 'react-router-dom';
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
import useUserData from './customhooks/useUserData';


const App = () => {
 const userData = useUserData()
  const location = useLocation();
  const hideNavBarPaths = ['/login', '/signup','/otp'];
  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  useEffect(()=>{
    if (userData === null) {
      <Navigate to={'/login'}/>
    }
  },[userData])
  
  const isAuthenticated =()=>{
   const token = localStorage.getItem('token')
   if (token === undefined || token === null ) {
    return false
   }else{
    return true
   }
  }
 
  return (
    <>
      {!shouldHideNavBar && <ResponsiveNavBar />}
      <Routes>
        <Route path="/" element={ isAuthenticated()? <Home />:  <Navigate to="/login" replace /> } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/EasyApply" element={ isAuthenticated()? <EasyApply />: <Navigate to="/login" replace /> } />
        <Route path="/applied" element={ isAuthenticated()? <AppliedJobs />: <Navigate to="/login" replace /> } />
        <Route path="/hire" element={isAuthenticated()? <Hire />: <Navigate to="/login" replace />} />
        <Route path="/jobpost" element={isAuthenticated()? <JobPost />: <Navigate to="/login" replace />} />
        <Route path="/profile" element={isAuthenticated()? <Profile />: <Navigate to="/login" replace />} />
        <Route path="/otp" element={<EmailVerification />} />
        <Route path="/candidateRecommendation" element={isAuthenticated()? <CandidateRecommender />: <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
};

export default App;

