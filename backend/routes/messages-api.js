const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');

// Create Message
router.post('/:id', (req, res) => {

  const user_id = 1;

  const {content} = req.body
  const newMessage = {
    sender_id: user_id,
    recipient_id: req.params.id,
    content: content,
    created_at: new Date()
  };

  const validateValues = Object.values(newMessage);
  for (const value of validateValues) {
    if (!value) {
      return res
        .status(400)
        .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  messageQueries.createMessage(newMessage)
    .then((newMessage) => {
      res.status(201).json({ message: 'New Message Created!', newMessage })
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error creating message', error: err.message });
    });
});

// Read messages between users
router.get('/:id/chat', (req, res) => {

  const user_id = 2;
  messageQueries.getChatLogMessages(user_id, req.params. vid)
    .then((chat) => {
      if (!chat) {
        return res.status(400).json({ message: 'Chat log not found!' });
      }
      res.status(201).json({ message: 'Heres the chat log!', chat })
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading chat logs', error: err.message });
    });
})

// Read message by id
router.get('/:id', (req, res) => {
  messageQueries
    .getMessageById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(400).json({ message: 'Message not found!' });
      }
      res.status(201).json({ message: 'Heres the Message!', message })
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading message', error: err.message });
    });
})

// Update a Message
router.put('/:id', (req, res) => {
  const {content} = req.body;
  const user_id = 1;
  const updatedMessage = { content: content };
  messageQueries
    .getMessageById(req.params.id)
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: 'Message not found!' });
      }
      console.log(message)
      const messageBelongsToUser = message.sender_id === user_id;
      if (!messageBelongsToUser) {
        return res
          .status(401)
          .json({ message: 'This message does not belongs to you!' });
      }
      return messageQueries.updateMessage(req.params.id, updatedMessage)
    })
    .then((updatedMessage) => {
      res.status(201).json({ message: 'Message updated!', note: updatedMessage });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating message', error: err.message });
    });
});
module.exports = router;
