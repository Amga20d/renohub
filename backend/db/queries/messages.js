const db = require('../connection');

const createMessage = (newMessage) => {
  const {
    sender_id,
    recipient_id,
    content,
    created_at
  } = newMessage;

  return db
  .query('INSERT INTO Messages (sender_id, recipient_id, content, created_at) VALUES ($1, $2, $3, $4) RETURNING *;',
    [sender_id, recipient_id, content, created_at]
  )
  .then((data) => data.rows[0]);
};

const getChatLogMessages = (sender_id, recipient_id) => {
  return db.query('SELECT * FROM Messages WHERE (sender_id = $1 AND recipient_id = $2) OR (sender_id = $2 AND recipient_id = $1) ORDER BY created_at DESC;',
    [sender_id, recipient_id])
  .then((data) => data.rows); 
}

const getMessageById = (id) => {
  return db.query('SELECT * FROM messages Where id = $1;', [id])
  .then((data) => data.rows[0]);
}

const updateMessage = (id, updatedMessage) => {
  const {content} = updatedMessage
  return db.query ('UPDATE messages SET content = $2 WHERE id = $1 RETURNING *;',
    [id, content])
    .then((data) => data.rows[0]);
}

module.exports = {createMessage, getChatLogMessages, getMessageById, updateMessage};