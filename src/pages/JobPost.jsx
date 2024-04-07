import React, { useState } from 'react';
import { Form, Input, Button, Upload, Card, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';
import animationData from '../assets/applyAnime.json'; // Your Lottie animation JSON file

const { Option } = Select;

const JobPost = () => {
  const [jobDescription, setjobDescription] = useState(null);

  const onFinish = async (values) => {
    try {
      // Extract skills from values and convert to array
      const { Skills, ...restValues } = values;
      const skillsArray = Skills.split(',').map((skill) => skill.trim());

      console.log('Submitted values:', { ...restValues, Skills: skillsArray });
      console.log('Uploaded jobDescription:', jobDescription);

      // Handle further processing or API calls here
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const onFileChange = (file) => {
    setjobDescription(file.file);
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
                label="Upload jobDescription"
                name="jobDescription"
                valuePropName="fileList"
                getValueFromEvent={onFileChange}
                rules={[{ required: true, message: 'Please upload your jobDescription' }]}
              >
                <Upload name="jobDescription" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Job Title"
                name="title"
                rules={[{ required: true, message: 'Please enter Job Title' }]}
              >
                <Input placeholder="Enter Job Title" />
              </Form.Item>
              <Form.Item
                label="Company Name"
                name="company"
                rules={[{ required: true, message: 'Please enter Company Name' }]}
              >
                <Input placeholder="Enter Company Name" />
              </Form.Item>
              <Form.Item
                label="Responsibilities"
                name="responsibilities"
                rules={[{ required: true, message: 'Please enter Responsibilities' }]}
              >
                <Input placeholder="Enter Responsibilities" />
              </Form.Item>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[{ required: true, message: 'Please enter Experience' }]}
              >
                <Input placeholder="Enter Experience" />
              </Form.Item>
              <Form.Item
                label="Skills"
                name="Skills"
                rules={[{ required: true, message: 'Please enter Skills' }]}
              >
                <Select
                  mode="tags"
                  placeholder="Enter Skills"
                  style={{ width: '100%' }}
                />
              </Form.Item>

              <Form.Item
                label="Job Type"
                name="jobType"
                rules={[{ required: true, message: 'Please select job type' }]}
              >
                <Select placeholder="Select job type">
                  <Option value="full-time">Full Time</Option>
                  <Option value="part-time">Part Time</Option>
                  <Option value="freelance">Freelance</Option>
                  <Option value="contract">Contract</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[{ required: true, message: 'Please select location' }]}
              >
                <Select placeholder="Select location">
                  <Option value="remote">Remote</Option>
                  <Option value="on-site">On Site</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Add Job
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default JobPost;
