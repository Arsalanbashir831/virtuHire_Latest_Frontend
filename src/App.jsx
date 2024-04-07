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

const App = () => {
  const location = useLocation();

  const hideNavBarPaths = ['/login', '/signup'];

  const shouldHideNavBar = hideNavBarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <ResponsiveNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/EasyApply" element={<EasyApply />} />
        <Route path="/applied" element={<AppliedJobs />} />
        <Route path="/hire" element={<Hire />} />
        <Route path="/jobpost" element={<JobPost />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
};

export default App;
