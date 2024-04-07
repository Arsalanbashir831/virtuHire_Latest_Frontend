import React, { useState } from 'react';
import { Card, Typography, Avatar, Button, Modal, Form, Input } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, EditOutlined } from '@ant-design/icons';
import defaultProfilePicture from '../assets/user_avatar.jpg';

const { Title, Text } = Typography;

const Profile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editedUser, setEditedUser] = useState(null);

  const user = {
    username: 'john_doe',
    email: 'johndoe@example.com',
    password: 'securepassword', // Please handle password securely (not displayed here)
    isVerified: true,
    profilePicture: defaultProfilePicture,
  };

  const handleEditProfile = () => {
    setEditedUser({ ...user });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    // Perform save logic here (e.g., update user data)
    console.log('Saving changes:', editedUser);
    setIsModalVisible(false);
  };

  const handleInputChange = (fieldName, value) => {
    setEditedUser({ ...editedUser, [fieldName]: value });
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <Card
        title={<Title level={2}>User Profile</Title>}
        extra={
          <Button type="primary" icon={<EditOutlined />} onClick={handleEditProfile}>
            Edit Profile
          </Button>
        }
      >
        <div className="flex justify-center mb-6">
          <Avatar size={150} src={user.profilePicture} />
        </div>
        <div className="mb-4">
          <Text strong>Username:</Text> <Text>{user.username}</Text>
        </div>
        <div className="mb-4">
          <Text strong>Email:</Text> <Text>{user.email}</Text>
        </div>
        <div className="mb-4">
          <Text strong>Password:</Text> <Text>********</Text> {/* Display masked password */}
        </div>
        <div className="mb-4">
          <Text strong>Account Verified:</Text>{' '}
          {user.isVerified ? (
            <Text type="success">
              <CheckCircleOutlined /> Yes
            </Text>
          ) : (
            <Text type="danger">
              <CloseCircleOutlined /> No
            </Text>
          )}
        </div>
      </Card>

      <Modal
        title="Edit Profile"
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={handleSave}
        destroyOnClose
      >
        <Form
          initialValues={{ username: editedUser?.username, email: editedUser?.email }}
          onFinish={handleSave}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please enter username' }]}>
            <Input onChange={(e) => handleInputChange('username', e.target.value)} />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please enter email' }]}>
            <Input onChange={(e) => handleInputChange('email', e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
