import React, { useState, useRef, useEffect } from 'react';
import { Input, Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, origin } = location.state;
  const [verificationCode, setVerificationCode] = useState(new Array(4).fill(''));

  // Create refs for input fields
  const inputRefs = useRef([]);
  inputRefs.current = verificationCode.map(
    (_, i) => inputRefs.current[i] ?? React.createRef()
  );

  // Function to focus next input
  const focusNextInput = (index) => {
    const nextInput = inputRefs.current[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  };

  // Function to handle input change
  const handleInputChange = (index, value) => {
    const newVerificationCode = [...verificationCode];
    newVerificationCode[index] = value.slice(0, 1);  // Ensure only first character is taken
    setVerificationCode(newVerificationCode);

    // Move to next input
    if (value) {
      focusNextInput(index);
    }
  };

  // Function to handle verification
  const handleVerify = async () => {
    const code = verificationCode.join('');
    console.log('Verifying code:', code);

    try {
      const response = await axios.post(`${BASE_URL}/verify_otp`, {
        email: email,
        otp: code
      });
      if (origin === 'signup') {
        navigate('/login');
      } else {
        navigate('/newPassword', { state: { email: email } });
      }
    } catch (e) {
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
          {verificationCode.map((_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className="border rounded-lg border-gray-300 m-2 text-center shadow-sm"
              maxLength={1}
              value={verificationCode[index]}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Button type="primary" className="rounded-lg" onClick={handleVerify}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
