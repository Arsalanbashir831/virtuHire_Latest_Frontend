import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, message,Upload } from 'antd';
import {UploadOutlined,CloseCircleOutlined,CheckCircleOutlined } from '@ant-design/icons'
import axios from 'axios';
import { BASE_URL } from '../utils';

const UserProfile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const authToken = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const url = `${BASE_URL}/user/${userId}/`;
  const showModal = () => {
    setIsModalVisible(true);
  };

const handleOk = async (values) => {
    
    const formData = new FormData();
    console.log(values.profile)
    // Append the file to the formData if it exists
    if (values.profile) {
      formData.append('profile', values.profile.fileList[0].originFileObj);
    }
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
    } catch (error) {
      message.error('An error occurred while updating the profile');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
    
  
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Token ${authToken}`
          }
        });
        setUserData(response.data);
      } catch (error) {
        message.error('Failed to fetch user data');
      }
    };
  
    fetchUserData();
  }, []);
  
console.log(userData);
  return (
    <div className="p-4">
      <div className="bg-white shadow rounded-lg p-4 max-w-sm mx-auto">
      <div onClick={showModal} className='cursor-pointer'>
        <img className="rounded-full mx-auto mb-4 w-[120px] h-[120px]" src={userData?.profile} alt="Profile" width="100" />
        </div>
        <h2 className="text-center text-2xl font-semibold">{userData?.first_name} {userData?.last_name}</h2>
        <p className="text-center text-sm text-gray-600">{userData?.email}</p>
        <p className="text-center text-sm text-gray-600">Email Verified : {userData?.is_verified===false?<><CloseCircleOutlined className='text-red-600' /></>:<><CheckCircleOutlined className='text-green-600' /></>}</p>
        <div className="text-center mt-4">   
        </div>
      </div>
      <Modal title="Edit Profile" visible={isModalVisible} onCancel={handleCancel} footer={null}>
  <Form
    name="editProfile"
    initialValues={{ remember: true }}
    onFinish={handleOk}
  >
    {/* Other Form.Item components remain unchanged */}
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
