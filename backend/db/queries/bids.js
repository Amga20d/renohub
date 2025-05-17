/* eslint-disable camelcase */
const db = require('../connection');

// CRUD - Create, Read, Update, Delete

const createBid = (user_id, newBid) => {
  const {
    project_id,
    amount,
    status,
    notes,
    created_at
  } = newBid

  return db
  .query('INSERT INTO Bids (project_id, user_id, amount, status, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
    [project_id, user_id, amount, status, notes , created_at]
  ).then((data => data.rows[0]));
};

const getAllBids = () => {
  return db.query('SELECT * FROM Bids;').then((data) => data.rows);
}

const getBidById = (id) => {
  return db
  .query('SELECT * FROM Bids WHERE id = $1;', [id])
  .then((data) => data.rows[0]);
};

const getBidsByUserId = (user_id) => {
  return db
  .query('SELECT * FROM Bids WHERE user_id = $1;', [user_id])
  .then((data) => data.rows);
};

const updateBid = (id, updatedBid) => {
  const {
    amount,
    notes
  } = updatedBid;

  return db
  .query('UPDATE Bids SET amount = $2, notes = $3 WHERE id = $1 RETURNING *;',
    [id, amount, notes]
  ).then((data) => data.rows[0]);
}

const removeBid = (id) => {
  return db
  .query('DELETE FROM Bids WHERE id = $1;', [id])
  .then((data) => data.rows);
};

module.exports = { createBid, getAllBids, getBidById, getBidsByUserId, updateBid, removeBid};
