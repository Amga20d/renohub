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
  return db.query('SELECT * FROM Messages WHERE sender_id = $1 AND recipient_id = $2 ORDER BY created_at DESC;', [sender_id, recipient_id])
  .then((data) => data.rows[0]); 
}



module.exports = {createMessage, getChatLogMessages};