import React from 'react';
import Navbar from '../components/Navbar';

const MessagesPage = () => {
  // Mock chat preview data
  const chats = [
    { id: 1, name: 'Alice',   lastMessage: 'Hi there! How are you?', time: '10:30 AM' },
    { id: 2, name: 'Bob',     lastMessage: 'Don\'t forget the meeting tomorrow.', time: '9:45 AM' },
    { id: 3, name: 'Charlie', lastMessage: 'Got it, thanks!', time: 'Yesterday' },
    { id: 4, name: 'Diana',   lastMessage: 'Can we reschedule?', time: 'Yesterday' },
    { id: 5, name: 'Eve',     lastMessage: 'Happy birthday!', time: '2 days ago' }
  ];

  // Inline style objects
  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px'
  };
  const chatPreviewStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
    cursor: 'pointer',
    backgroundColor: '#f9f9f9'
  };
  const nameStyle = { fontWeight: 'bold', fontSize: '16px' };
  const snippetStyle = { color: '#555', marginTop: '4px' };
  const timeStyle = { fontSize: '12px', color: '#888', textAlign: 'right' };

  return (
    <div style={containerStyle}>
      <Navbar />
      {chats.map(chat => (
        <div key={chat.id} style={chatPreviewStyle}>
          <div style={nameStyle}>{chat.name}</div>
          <div style={snippetStyle}>{chat.lastMessage}</div>
          <div style={timeStyle}>{chat.time}</div>
        </div>
      ))}
    </div>
  );
};

export default MessagesPage;
