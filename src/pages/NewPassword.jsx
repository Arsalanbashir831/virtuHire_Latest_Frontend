import React from 'react';
import { Form, Input, Button } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { BASE_URL } from '../utils';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const NewPassword = () => {
const location = useLocation()
const navigation = useNavigate()
const {email} = location.state
    const onFinish = async (values) => {
    try {
     await axios.post(`${BASE_URL}/update_password`,{
        email:email,
        new_password:values.password
        
     })        
     navigation('/login')
    } catch (error) {
        console.log(error);
    }
    console.log('Received values of form: ', values);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-xl font-semibold text-gray-900 text-center">Set New Password</h1>
        <p className="text-sm text-gray-600 text-center mt-2 mb-6">
          Enter your new password below. Make sure it's strong and secure.
        </p>
        <Form
          name="new_password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="w-full"
        >
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your new password!' },
              { min: 6, message: 'Password must be at least 6 characters long.' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="New Password"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Set Password
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default NewPassword;
