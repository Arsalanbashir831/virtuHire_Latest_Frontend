import React, { useState } from 'react';
import { Form, Input, Button, Upload, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/applyAnime.json'; // Your Lottie animation JSON file

const EasyApply = () => {
  const [resume, setResume] = useState(null);

  const onFinish = async (values) => {
    try {
      // Simulate sending resume file to a backend endpoint
      console.log('Submitted values:', values);
      console.log('Uploaded resume:', resume);

      // Handle further processing or API calls here
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const onFileChange = (file) => {
    setResume(file.file);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full shadow-md rounded-lg">
        <div className="flex justify-center items-center p-6">
          <div className="mr-6">
            <Lottie animationData={animationData} style={{ width: 500, height: 500 }} />
          </div>
          <div className="flex-grow">
            <h1 className="text-xl font-bold mb-4 text-center">Easy Apply</h1>
            <Form name="easyApplyForm" onFinish={onFinish} layout="vertical">
              <Form.Item
                label="Upload Resume"
                name="resume"
                valuePropName="fileList"
                getValueFromEvent={onFileChange}
                rules={[{ required: true, message: 'Please upload your resume' }]}
              >
                <Upload name="resume" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please enter your name' }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: 'Please enter your experience' }]}
              >
                <Input placeholder="Enter your experience" />
              </Form.Item>

              <Form.Item
                label="Skills"
                name="skills"
                rules={[{ required: true, message: 'Please enter your skills' }]}
              >
                <Input.TextArea rows={3} placeholder="Enter your skills" />
              </Form.Item>

              <Form.Item
                label="Certificates"
                name="certificates"
                rules={[{ required: true, message: 'Please enter your certificates' }]}
              >
                <Input.TextArea rows={3} placeholder="Enter your certificates" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Submit Application
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EasyApply;
