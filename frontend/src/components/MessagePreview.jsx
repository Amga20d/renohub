import React from 'react';
import { Link } from 'react-router-dom';

const MessagePreview = ({ recipient, lastMessage }) => {
  return (
    <Link to={`/messages/${recipient.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
        color: '#000'
      }}>
        <div style={{ fontWeight: 'bold' }}>{recipient.name}</div>
        <div style={{ color: '#555' }}>{lastMessage.content}</div>
        <div style={{ fontSize: '12px', color: '#888', textAlign: 'right' }}>{lastMessage.created_at}</div>
      </div>
    </Link>
  );
};

export default MessagePreview;
