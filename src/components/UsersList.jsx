import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { BASE_URL } from '../utils';
import { useRecoilState } from 'recoil';
import { selectedChatState } from '../atoms/ChatState';
import { useNavigate } from 'react-router-dom';

const UsersList = () => {
  const authToken = localStorage.getItem('token');
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user ID
  const [selectUser, setSelectUser] = useRecoilState(selectedChatState);
const navigate = useNavigate('/login')
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
        navigate('/login')
        
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
  // console.log(user);
    setSelectUser(user);
    setSelectedUserId(user.id); // Set the selected user ID in state
  };

  return (
    <div className="container mx-auto mt-5">
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={user => (
          <List.Item
            onClick={() => handleUserClick(user)}
            className={` cursor-pointer p-2 rounded-md my-5  hover:bg-gray-100 ${selectedUserId === user.id ? 'bg-gray-100 shadow-md' : 'bg-white'}`}
          >
            <List.Item.Meta 
              avatar={<Avatar src={user.profile || null} icon={!user.profile ? <UserOutlined /> : null} />}
              title={user.username}
              description={`${user.first_name}${' '}${user.last_name}`}
              className='px-2'
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default UsersList;
