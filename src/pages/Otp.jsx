import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'
import { BASE_URL } from '../utils';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  // State to manage the verification code inputs
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const inputStyle = "border rounded-lg border-gray-300 m-2 text-center shadow-sm";
//verify_otp
  // Function to handle input change
  const handleInputChange = (index, value) => {
    if (value.match(/^\d{0,1}$/)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);
    }
  };

  // Function to handle verification
  const handleVerify = async () => {
    try{
      const code = verificationCode.join('');
      console.log('Verifying code:', code);
      const response = axios.post(`${BASE_URL}/verify_otp`,{
        email:email,
        otp:code
      })
      navigate('/login')
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="m-auto bg-white p-10 rounded-lg shadow-lg max-w-sm w-full">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-green-500 rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h1 className="text-xl font-semibold text-gray-700 text-center mb-4">Please check your email</h1>
        <p className="text-sm text-gray-500 text-center mb-8">We've sent a code to {email}</p>
        <div className="flex justify-between">
          {/* Render input fields for verification code */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Input
              key={index}
              className={inputStyle}
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          {/* Button to trigger verification */}
          <Button type="primary" className="rounded-lg" onClick={handleVerify}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
