import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChatState } from '../atoms/ChatState';
import { WEB_SOCKET_URL } from '../utils';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import useUserData from '../customhooks/useUserData';

const Chatbox = () => {
  const reciever = useRecoilValue(selectedChatState);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const userId = localStorage.getItem('userId');
  const sender = useUserData();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!reciever?.id) return;

    const wsClient = new WebSocket(`${WEB_SOCKET_URL}/?token=${localStorage.getItem('token')}`);
    ws.current = wsClient;

    wsClient.onopen = () => {
      console.log('WebSocket Connected');
      wsClient.send(JSON.stringify({
        command: "fetch_messages",
        receiver_id: reciever.id,
      }));
    };

    wsClient.onmessage = (e) => {
      console.log('WebSocket Message Received:', e.data);
      const data = JSON.parse(e.data);
      if (data.status === 'success' && data.messages) {
        setMessages(data.messages);
        scrollToBottom(); // Scroll to bottom after fetching messages
      }

      if (data.message) {
        data['content'] = data['message'];
        setMessages(prev => [...prev, data]);
        scrollToBottom(); // Scroll to bottom after receiving new message
      }
    };

    wsClient.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };

    wsClient.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    // Clean up WebSocket connection
    return () => {
      wsClient.close();
    };
  }, [reciever?.id]);

  const handleSendMessage = () => {
    if (ws.current && input.trim()) {
     
      ws.current.send(JSON.stringify({
        command: 'send_message',
        receiver_id: reciever?.id,
        sender_id: userId,
        message: input,
      }));

      
      setInput('');
      scrollToBottom(); // Scroll to bottom after sending message
    }
  };

  // Scroll to bottom when component first renders or when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="p-4 h-[90vh] flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${parseInt(msg.sender_id) === parseInt(userId) ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex my-2 ${parseInt(msg.sender_id) === parseInt(userId) ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className='flex flex-col-reverse gap-2'>
                <Avatar className='w-10 h-10' src={`${parseInt(msg.sender_id) === parseInt(userId) ? `${sender?.profile}` : `${reciever?.profile}`}`} icon={<UserOutlined />} />
                <p>{`${parseInt(msg.sender_id) === parseInt(userId) ? `${sender.username}` : `${reciever.username}`}`}</p>
              </div>
              <div className={`p-2 text-white max-w-xs mx-2 my-1 rounded-lg ${parseInt(msg.sender_id) === parseInt(userId) ? 'bg-green-600' : 'bg-blue-600'}`}>
                {msg.content}
                <div className="text-xs text-gray-200 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Empty div for scrolling to bottom */}
      </div>
      <div className="mb-2 flex">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-grow p-2 border rounded focus:outline-none focus:border-blue-500"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
