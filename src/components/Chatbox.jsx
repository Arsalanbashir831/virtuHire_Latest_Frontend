import React, { useEffect, useState, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChatState } from '../atoms/ChatState';
import { WEB_SOCKET_URL } from '../utils';

const Chatbox = () => {
  const receiverId = useRecoilValue(selectedChatState);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!receiverId) return;
  
    const wsClient = new WebSocket(`${WEB_SOCKET_URL}/ws/socket-server/?token=${localStorage.getItem('token')}`);
    ws.current = wsClient;
  
    wsClient.onopen = () => {
      console.log('WebSocket Connected');
      wsClient.send(JSON.stringify({
        command: "fetch_messages",
        receiver_id: receiverId,
      }));
    };
  
    wsClient.onmessage = (e) => {
      console.log('WebSocket Message Received:', e.data);
      const data = JSON.parse(e.data);
      if (data.status === 'success' && data.messages) {
        setMessages(data.messages);
      }
    };
  
    wsClient.onerror = (error) => {
      console.error('WebSocket Error: ', error);
    };
  
    wsClient.onclose = () => {
      console.log('WebSocket Disconnected');
    };
  
    return () => {
      wsClient.close();
    };
  }, [receiverId]);
  

  const handleSendMessage = () => {
    if (ws.current && input.trim()) {
      const newMessage = {
        id: Date.now(),
        sender_id: parseInt(userId),
        receiver_id: receiverId,
        content: input,
        timestamp: new Date().toISOString(),
      };

      setMessages(prevMessages => [...prevMessages, newMessage]);

      ws.current.send(JSON.stringify({
        command: 'send_message',
        receiver_id: receiverId,
        message: input,
      }));

      setInput('');
    }
  };

  return (
    <div className="p-4 h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender_id === parseInt(userId) ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-2 text-white max-w-xs mx-2 my-1 rounded-lg ${msg.sender_id === parseInt(userId) ? 'bg-blue-500' : 'bg-gray-500'}`}>
              {msg.content}
              <div className="text-xs text-gray-200 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          </div>
        ))}
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
