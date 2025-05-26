import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { messages as initialMessages, users } from '../data/mockMessages';
import ChatBubble from '../components/ChatBubble';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipientId = parseInt(id, 10);
  const senderId = 1;

  const contact = users.find(u => u.id === recipientId);

  // Copy initial messages into state so we can add new ones
  const [chatMessages, setChatMessages] = useState(
    initialMessages.filter(
      m =>
        (m.sender_id === senderId && m.recipient_id === recipientId) ||
        (m.sender_id === recipientId && m.recipient_id === senderId)
    )
  );

  const [newMessage, setNewMessage] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageObj = {
      id: chatMessages.length + 100, // mock ID
      sender_id: senderId,
      recipient_id: recipientId,
      content: newMessage,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, messageObj]);
    setNewMessage('');
  };

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

      <button
        onClick={() => navigate('/messages')}
        style={{
          alignSelf: 'flex-start',
          marginBottom: '15px',
          padding: '6px 12px',
          border: 'none',
          backgroundColor: '#007bff',
          color: 'white',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        ← Back to Messages
      </button>

      {/* Chat messages */}
      <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '15px' }}>
        {chatMessages.map(msg => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isUser={msg.sender_id === senderId}
          />
        ))}
      </div>

      {/* Input form */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{
            flexGrow: 1,
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button type="submit" style={{
          padding: '10px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
