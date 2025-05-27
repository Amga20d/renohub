import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/MessagePreview.scss'

const MessagePreview = ({ recipient, lastMessage }) => {
  return (
    
      <Link to={`/messages/${recipient.id}`} className='card'>   
        <div className='card-info name'>{recipient.name}</div>
        <div className='card-info text'>{lastMessage.content}</div>
        <div className='card-info created'><em>{lastMessage.created_at}</em></div>
    </Link>
  );
};

export default MessagePreview;
