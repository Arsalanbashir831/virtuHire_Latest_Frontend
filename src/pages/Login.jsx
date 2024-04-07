import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/loginAnime.json'; // Ensure this path is correct
import companyLogo from '../assets/logo.png'
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log(username, password);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e6e7ee]"> {/* Background color adjusted to match your design */}
      <div className="grid grid-cols-2 gap-4 p-8 bg-white rounded-xl shadow-lg w-full max-w-4xl">
        {/* Lottie Animation */}
        <div className="flex flex-col items-center justify-center space-y-4">
          <img src={companyLogo} alt="Company Logo" className="w-32 mb-4" /> {/* Company Logo */}
          <Lottie animationData={animationData} className="w-full" loop autoplay />
        </div>

        {/* Login Form */}
        <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-8">Login </h2>
          <Input
            size="large"
            placeholder="username@mail.com"
            prefix={<UserOutlined />}
            className="mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            size="large"
            placeholder="Enter Password"
            prefix={<LockOutlined />}
            className="mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="primary"
            size="large"
            block
            className="mb-3"
            onClick={handleLogin}
          >
            Login
          </Button>
          <div className="flex justify-between text-sm">
            <a href="#" className="text-blue-600">Forgot password?</a>
            <div> <span>Create New Account</span><Link to={'/signup'} className="text-blue-600"> Sign Up</Link></div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
