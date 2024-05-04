import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL } from '../utils';
import { useRecoilState } from 'recoil';
import { selectedChatState } from '../atoms/ChatState';

const UsersList = () => {
  const authToken = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [selectUser , setSelectUser]= useRecoilState(selectedChatState)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chat_users`, {
          headers: {
            Authorization: `Token ${authToken}`
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
  }, []);
  const handleUserClick = (userId) => {
    setSelectUser(userId)
  };
  return (
    <div className="container mx-auto mt-5">
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={user => (
          <List.Item   onClick={() => handleUserClick(user.id)}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <List.Item.Meta 
              avatar={<Avatar src={user.avatar || null} icon={!user.avatar ? <UserOutlined /> : null} />}
              title={user.username}
              description={`Last active: ${user.last_active || 'unknown'}`}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UsersList;
