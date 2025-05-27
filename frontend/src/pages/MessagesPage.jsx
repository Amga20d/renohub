import React from 'react';
import Navbar from '../components/Navbar';
import { messages, users } from '../data/mockMessages';
import MessagePreview from '../components/MessagePreview';
import '../styles/MessagePage.scss';

const MessagesPage = () => {
  const senderId = 1; // current user is sender
  const chats = [...new Set(messages
    .filter(m => m.sender_id === senderId)
    .map(m => m.recipient_id))];

  const previews = chats.map((recipientId) => {
    const recipient = users.find(u => u.id === recipientId);
    const lastMessage = messages
      .filter(m => m.recipient_id === recipientId && m.sender_id === senderId)
      .slice(-1)[0]; // most recent from sender to this recipient

    return { recipient, lastMessage };
  });

  return (
    <div className='page'>
      <h1>Messages</h1>
      <Navbar />
      {previews.map(({ recipient, lastMessage }) => (
        <MessagePreview key={recipient.id} recipient={recipient} lastMessage={lastMessage} className='message' />
      ))}
    </div>
  );
};

export default MessagesPage;
