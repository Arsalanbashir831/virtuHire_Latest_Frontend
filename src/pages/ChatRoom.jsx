import React from 'react';
import UsersList from '../components/UsersList';
import Chatbox from '../components/Chatbox';

const ChatRoom = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-white border-r">
        <UsersList />
      </div>
      <div className="flex-1 bg-gray-100">
        <Chatbox />
      </div>
    </div>
  );
};

export default ChatRoom;
