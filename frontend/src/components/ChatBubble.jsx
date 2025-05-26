import React from 'react';

const ChatBubble = ({ message, isUser }) => {
  const bubbleStyle = {
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? '#dcf8c6' : '#f1f1f1',
    borderRadius: '10px',
    padding: '8px',
    maxWidth: '75%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
    marginBottom: '10px'
  };

  const infoStyle = { fontSize: '12px', color: '#666', marginBottom: '4px' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={infoStyle}>
        {isUser ? 'You' : 'Them'} • {message.created_at}
      </div>
      <div style={bubbleStyle}>
        {message.content}
      </div>
    </div>
  );
};

export default ChatBubble;
