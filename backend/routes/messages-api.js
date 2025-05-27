const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');
const db = require('../db/connection');

// ✅ Get all messages
router.get('/', (req, res) => {
  db.query('SELECT * FROM messages ORDER BY created_at DESC;')
    .then((data) => res.status(200).json({ messages: data.rows }))
    .catch((err) => res.status(500).json({ message: 'Error fetching messages', error: err.message }));
});

// ✅ Create a new message
router.post('/:id', (req, res) => {
  const user_id = 1; // Simulated logged-in user
  const { content } = req.body;
  const recipient_id = parseInt(req.params.id, 10);

  console.log('Incoming message:', { sender_id: user_id, recipient_id, content });

  if (!content || isNaN(recipient_id)) {
    return res.status(400).json({ message: 'Missing or invalid content or recipient ID' });
  }

  const newMessage = {
    sender_id: user_id,
    recipient_id,
    content,
    created_at: new Date()
  };

  messageQueries.createMessage(newMessage)
    .then((created) => res.status(201).json({ message: 'New message created!', newMessage: created }))
    .catch((err) => {
      console.error('Message creation error:', err);
      res.status(500).json({ message: 'Error creating message', error: err.message });
    });
});

// ✅ Get chat log between sender and recipient
router.get('/:id/chat', (req, res) => {
  const user_id = 1; // Simulated logged-in user
  const recipient_id = parseInt(req.params.id, 10);

  if (isNaN(recipient_id)) {
    return res.status(400).json({ message: 'Invalid recipient ID' });
  }

  messageQueries.getChatLogMessages(user_id, recipient_id)
    .then((chat) => {
      if (!chat) return res.status(404).json({ message: 'Chat log not found' });
      res.status(200).json({ message: 'Here’s the chat log!', chat });
    })
    .catch((err) => {
      console.error('Chat log error:', err);
      res.status(500).json({ message: 'Error reading chat logs', error: err.message });
    });
});

// ✅ Get single message by ID
router.get('/:id', (req, res) => {
  const messageId = parseInt(req.params.id, 10);

  if (isNaN(messageId)) {
    return res.status(400).json({ message: 'Invalid message ID' });
  }

  messageQueries.getMessageById(messageId)
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found!' });
      }
      res.status(200).json({ message: 'Here’s the message!', message });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error reading message', error: err.message });
    });
});

// ✅ Update a message
router.put('/:id', (req, res) => {
  const messageId = parseInt(req.params.id, 10);
  const user_id = 1;
  const { content } = req.body;

  if (!content || isNaN(messageId)) {
    return res.status(400).json({ message: 'Missing content or invalid message ID' });
  }

  const updatedMessage = { content };

  messageQueries.getMessageById(messageId)
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found!' });
      }

      if (message.sender_id !== user_id) {
        return res.status(401).json({ message: 'This message does not belong to you!' });
      }

      return messageQueries.updateMessage(messageId, updatedMessage);
    })
    .then((updated) => {
      res.status(200).json({ message: 'Message updated!', note: updated });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error updating message', error: err.message });
    });
});

module.exports = router;
