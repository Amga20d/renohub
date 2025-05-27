import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MessagePreview.scss'

const MessagePreview = ({ recipient, lastMessage }) => {
  return (
    
      <Link to={`/messages/${recipient.id}`} className='card-message'>   
        <div className='card-info-message name'>{recipient.name}</div>
        <div className='card-info-message text'>{lastMessage.content}</div>
        <div className='card-info-message created'><em>{lastMessage.created_at}</em></div>
    </Link>
  );
};

export default MessagePreview;
