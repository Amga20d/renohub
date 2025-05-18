const express = require('express');
const router = express.Router();
const messageQueries = require('../db/queries/messages');

// router.post('/create', (req, res) => {

// //   const newMessage = {
// //     sender_id: 1,
// //     recipient_id: 2,
// //     content: 'Howdy there!',
// //     created_at: '2025-07-29 07:35:40'
// //   };

// //   for (const field in newMessage) {
// //     if (!newMessage[field]) {
// //       return res
// //         .status(400)
// //         .json({ message: 'All properties must be provided to create a project image' });
// //     }
// //   }
// //   messageQueries.createMessage(newMessage)
// //     .then((newMessage) => {
// //       res.status(201).json({ message: 'New Message Created!', newMessage })
// //     })
// //     .catch((err) => {
// //       res
// //         .status(500)
// //         .json({ message: 'Error creating message', error: err.message });
// //     });
// // });

module.exports = router;
