import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message, Upload, Avatar, Card, Descriptions } from 'antd';
import { UploadOutlined, CloseCircleOutlined, CheckCircleOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { BASE_URL } from '../utils';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const authToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const url = `${BASE_URL}/user/${userId}/`;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async (values) => {
    const formData = new FormData();

    if (values.profile) {
      formData.append('profile', values.profile.fileList[0].originFileObj);
    }
    formData.append('username', values.username);
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('email', values.email);
    formData.append('is_verified', userData?.is_verified);

    try {
      await axios.put(url, formData, {
        headers: {
          'Authorization': `Token ${authToken}`,
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      message.success('Profile updated successfully');
      setIsModalVisible(false);
      // Optionally, fetch the updated user data here to refresh the profile info
      fetchUserData();
    } catch (error) {
      message.error('An error occurred while updating the profile');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      });
      setUserData(response.data);
    } catch (error) {
      navigate('/login');
      // message.error('Failed to fetch user data');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="p-4">
      <Card className="max-w-lg mx-auto">
        <div className="text-center mb-4">
          {userData?.profile ? (
            <Avatar size={120} src={userData?.profile} />
          ) : (
            <Avatar size={120} icon={<UserOutlined />} />
          )}
        </div>
        <Descriptions title="User Info" bordered column={1}>
          <Descriptions.Item label="Username">{userData?.username}</Descriptions.Item>
          <Descriptions.Item label="First Name">{userData?.first_name}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{userData?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{userData?.email}</Descriptions.Item>
          <Descriptions.Item label="Email Verified">
            {userData?.is_verified ? (
              <CheckCircleOutlined className="text-green-600" />
            ) : (
              <CloseCircleOutlined className="text-red-600" />
            )}
          </Descriptions.Item>
        </Descriptions>
        <div className="text-center mt-4">
          <Button type="primary" onClick={showModal}>Edit Profile</Button>
        </div>
      </Card>
      <Modal title="Edit Profile" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          name="editProfile"
          initialValues={{
            username: userData?.username,
            first_name: userData?.first_name,
            last_name: userData?.last_name,
            email: userData?.email,
          }}
          onFinish={handleOk}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profile"
            valuePropName="file"
          >
            <Upload name="profile" listType="picture" beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to upload profile picture</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserProfile;
