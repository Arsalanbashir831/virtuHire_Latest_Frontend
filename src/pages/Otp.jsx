import React from 'react';
import { Input, Button } from 'antd';


const EmailVerification = () => {
  const inputStyle = "border rounded-lg border-gray-300 m-2 text-center shadow-sm";

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
        <p className="text-sm text-gray-500 text-center mb-8">We've sent a code to contact@curfcode.com</p>
        <div className="flex justify-between">
          <Input className={inputStyle} maxLength={1} />
          <Input className={inputStyle} maxLength={1} />
          <Input className={inputStyle} maxLength={1} />
          <Input className={inputStyle} maxLength={1} />
        </div>
        <div className="flex justify-center mt-6">
         
          <Button type="primary" className="rounded-lg">Verify</Button>
        </div>
       
      </div>
    </div>
  );
};

export default EmailVerification;
