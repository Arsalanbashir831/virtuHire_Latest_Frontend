import React, { useState } from 'react';
import { Form, Input, Button, Upload, Card, message } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/applyAnime.json';
import loadingAnimationData from '../assets/loadingAnimation.json'; // Make sure to add a loading animation JSON file
import { BASE_URL, NLP_SERVER } from '../utils';
import axios from 'axios'; // Ensure axios is installed or use fetch API

const EasyApply = () => {
  const [resume, setResume] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      console.log('Submitted values:', values);
      console.log('Uploaded resume:', resume);
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const onFileChange = async (file) => {
    const formData = new FormData();
    formData.append('resume_pdf', file.file);
    setIsLoading(true);

    try {
      const response = await axios.post(`${NLP_SERVER}/resumeparser`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Handle the response as needed
      setResume(file.file);
    } catch (error) {
      message.error('Error uploading resume. Please try again.');
      console.error('Error uploading resume:', error);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full shadow-md rounded-lg">
        {/* Loading Animation */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-opacity-50 bg-gray-500 z-50">
            <Lottie animationData={loadingAnimationData} loop style={{ width: 100, height 100 }} />
          </div>
        )}
        {/* Form and other UI elements */}
        ...
      </Card>
    </div>
  );
};

export default EasyApply;

