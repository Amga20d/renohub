import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MessagePreview from '../components/MessagePreview';
import axios from 'axios';

const MessagesPage = () => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const senderId = 1; // current user

  useEffect(() => {
    const fetchData = async () => {
      const [usersRes, messagesRes] = await Promise.all([
        axios.get('/api/users'),
        axios.get('/api/messages'),
      ]);
      setUsers(usersRes.data.users);
      setMessages(messagesRes.data.messages);
    };
    fetchData();
  }, []);

  const chats = [...new Set(messages.filter(m => m.sender_id === senderId).map(m => m.recipient_id))];

  const previews = chats.map(recipientId => {
    const recipient = users.find(u => u.id === recipientId);
    const lastMessage = messages
      .filter(m => m.sender_id === senderId && m.recipient_id === recipientId)
      .slice(-1)[0];
    return { recipient, lastMessage };
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      {previews.map(({ recipient, lastMessage }) => (
        <MessagePreview key={recipient.id} recipient={recipient} lastMessage={lastMessage} />
      ))}
    </div>
  );
};

export default MessagesPage;
