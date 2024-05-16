import React from 'react';
import UsersList from '../components/UsersList';
import Chatbox from '../components/Chatbox';

const ChatRoom = () => {
  return (
    <div className="flex  ">
      <div className="w-1/4 border-r  bg-gray-200 p-4 overflow-y-scroll">
        <UsersList />
      </div>
      <div className="flex-1 bg-gray-100">
        <Chatbox />
      </div>
    </div>
  );
};

export default ChatRoom;
