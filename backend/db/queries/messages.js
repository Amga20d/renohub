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

const getMessagesBySenderId = (sender_id) => {
  return db.query('SELECT * FROM Messages WHERE sender_id = $1;', [sender_id])
  .then((data) => data.rows[0]); 
}



module.exports = {};