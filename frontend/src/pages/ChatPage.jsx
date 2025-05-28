import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatBubble from '../components/ChatBubble';
import axios from 'axios';
import '../styles/ChatPage.scss';

const ChatPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipientId = parseInt(id);
  const senderId = 1; // Simulated current user

  const [contact, setContact] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Load user info
    axios.get('/api/users')
      .then(res => {
        const user = res.data.users.find(u => u.id === recipientId);
        setContact(user);
      })
      .catch(err => console.error('Error fetching user:', err));

    // Load chat log
    axios.get(`/api/messages/${recipientId}/chat`)
      .then(res => setChatMessages(res.data.chat))
      .catch(err => console.error('Error fetching chat log:', err));
  }, [recipientId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await axios.post(`/api/messages/${recipientId}`, {
        content: newMessage
      });

      setChatMessages([...chatMessages, res.data.newMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err.response || err.message);
      alert('Failed to send message.');
    }
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
        Chat with {contact?.name || 'Loading...'}
      </div>

      <button
        onClick={() => navigate('/messages')}
        className='btn'
        style={{
          alignSelf: 'flex-start',
          marginBottom: '15px',
        }}
      >
        ← Back to Messages
      </button>

      <div style={{ flexGrow: 1, overflowY: 'auto', marginBottom: '15px' }}>
        {chatMessages.map(msg => (
          <ChatBubble key={msg.id} message={msg} isUser={msg.sender_id === senderId} />
        ))}
      </div>

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
        <button type="submit" className='btn'>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;
