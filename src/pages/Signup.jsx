import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/loginAnime.json'; 
import companyLogo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignup = () => {
    // Implement your signup logic here
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e6e7ee]">
      <div className="grid grid-cols-2 gap-4 p-8 bg-white rounded-xl shadow-lg w-full max-w-4xl">
      <div className="flex flex-col items-center justify-center space-y-4">
          <img src={companyLogo} alt="Company Logo" className="w-32 mb-4" /> {/* Company Logo */}
          <Lottie animationData={animationData} className="w-full" loop autoplay />
        </div>
        <div className="flex flex-col justify-center">
        
          <h2 className="text-2xl font-bold mb-8">Create Your Account</h2>
          <div className="space-y-4">
            <Input
              size="large"
              placeholder="First Name"
              prefix={<UserOutlined />}
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <Input
              size="large"
              placeholder="Last Name"
              prefix={<UserOutlined />}
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            <Input
              size="large"
              placeholder="Email"
              prefix={<MailOutlined />}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              size="large"
              placeholder="Username"
              prefix={<UserOutlined />}
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Input.Password
              size="large"
              placeholder="Password"
              prefix={<LockOutlined />}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Input.Password
              size="large"
              placeholder="Confirm Password"
              prefix={<LockOutlined />}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            <Button type="primary" size="large" block onClick={handleSignup}>
              Sign Up
            </Button>
          </div>
          <div className="flex justify-center mt-4 text-sm">
           <span>Already have an account?</span> <Link to={'/login'} className="text-blue-600"> Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
