import React from 'react';

const ChatPage = () => {
  const contactName = 'Alice';  // Mock contact name
  // Mock conversation messages
  const messages = [
    { id: 1, sender: 'You',   text: 'Hey Alice, how are you?', time: '10:00 AM' },
    { id: 2, sender: 'Alice', text: 'Hi! I’m good, thanks. How about you?', time: '10:02 AM' },
    { id: 3, sender: 'You',   text: 'Doing well. Did you see my email?', time: '10:05 AM' },
    { id: 4, sender: 'Alice', text: 'Yes, I will reply by tomorrow.', time: '10:06 AM' },
    { id: 5, sender: 'You',   text: 'Great, thanks!', time: '10:08 AM' }
  ];

  // Inline style objects
  const containerStyle = {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#fff'
  };
  const headerStyle = {
    fontWeight: 'bold',
    fontSize: '18px',
    paddingBottom: '10px',
    borderBottom: '1px solid #ccc',
    marginBottom: '10px'
  };
  const messageStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px'
  };
  const bubbleBaseStyle = {
    borderRadius: '10px',
    padding: '8px',
    maxWidth: '75%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)'
  };
  const infoStyle = { fontSize: '12px', color: '#666', marginBottom: '4px' };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Chat with {contactName}</div>
      {messages.map(msg => {
        const isUser = msg.sender === 'You';
        // Merge base bubble style with conditional styles
        const bubbleStyle = {
          ...bubbleBaseStyle,
          backgroundColor: isUser ? '#dcf8c6' : '#f1f1f1',
          alignSelf: isUser ? 'flex-end' : 'flex-start'
        };
        return (
          <div key={msg.id} style={messageStyle}>
            <div style={infoStyle}>
              {msg.sender} &#8226; {msg.time}
            </div>
            <div style={bubbleStyle}>
              {msg.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatPage;
