import React from 'react';
import { useParams } from 'react-router-dom';
import { messages, users } from '../data/mockMessages';
import ChatBubble from '../components/ChatBubble';

const ChatPage = () => {
  const { id } = useParams();
  const recipientId = parseInt(id);
  const senderId = 1; // current user

  const contact = users.find(u => u.id === recipientId);

  const chatMessages = messages.filter(
    m => (m.sender_id === senderId && m.recipient_id === recipientId) ||
         (m.sender_id === recipientId && m.recipient_id === senderId)
  );

  return (
    <div style={{
      maxWidth: '600px',
      margin: '20px auto',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      border: '1px solid #ddd',
      borderRadius: '5px',
      backgroundColor: '#fff'
    }}>
      <div style={{
        fontWeight: 'bold',
        fontSize: '18px',
        paddingBottom: '10px',
        borderBottom: '1px solid #ccc',
        marginBottom: '10px'
      }}>
        Chat with {contact?.name}
      </div>
      {chatMessages.map(msg => (
        <ChatBubble key={msg.id} message={msg} isUser={msg.sender_id === senderId} />
      ))}
    </div>
  );
};

export default ChatPage;
