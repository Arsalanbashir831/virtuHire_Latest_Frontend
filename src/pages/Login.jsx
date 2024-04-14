import React, { useState } from 'react';
import { Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/loginAnime.json';
import companyLogo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { BASE_URL } from '../utils';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Loading from '../components/Loading';


const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const auth = await axios.post(`${BASE_URL}/login`, {
        username,
        password
      });
      if (auth.status === 200 || auth.status === 201) {
        message.success('Login successful!');
        localStorage.setItem("token", auth.data.token.toString());
        localStorage.setItem("userId", auth.data.user.id.toString());
        navigate('/');
      } else {
        message.error('Login failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e6e7ee]">
      <Loading isLoading={loading} /> {/* Use the Loading component */}
      <div className="grid grid-cols-2 gap-4 p-8 bg-white rounded-xl shadow-lg w-full max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <img src={companyLogo} alt="Company Logo" className="w-32 mb-4" />
          <Lottie animationData={animationData} className="w-full" loop autoplay />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-8">Login</h2>
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
