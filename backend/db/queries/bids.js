/* eslint-disable camelcase */
const db = require('../connection');

// Create a new bid
const createBid = (user_id, newBid) => {
  const {
    project_id,
    amount,
    status,
    notes,
    created_at
  } = newBid;

  return db.query(
    'INSERT INTO Bids (project_id, user_id, amount, status, notes, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
    [project_id, user_id, amount, status, notes, created_at]
  ).then((data) => data.rows[0]);
};

// Get all bids
const getAllBids = () => {
  return db.query('SELECT * FROM Bids;').then((data) => data.rows);
};

// Get bid by ID
const getBidById = (id) => {
  return db.query('SELECT * FROM Bids WHERE id = $1;', [id])
    .then((data) => data.rows[0]);
};

// Get all bids for a user
const getBidsByUserId = (user_id) => {
  return db.query('SELECT * FROM Bids WHERE user_id = $1;', [user_id])
    .then((data) => data.rows);
};

// Update a bid
const updateBid = (id, updatedBid) => {
  const {
    amount,
    notes,
    status
  } = updatedBid;

  return db.query(
    'UPDATE Bids SET amount = $2, notes = $3, status = $4 WHERE id = $1 RETURNING *;',
    [id, amount, notes, status]
  ).then((data) => data.rows[0]);
};

// Delete a bid
const removeBid = (id) => {
  return db.query('DELETE FROM Bids WHERE id = $1;', [id])
    .then((data) => data.rows);
};

// ✅ New: Update bid statuses for a project - accept one, reject the rest
const updateStatusByProject = async (project_id, acceptedBidId) => {
  // 1. Reject all bids for this project
  await db.query(
    'UPDATE Bids SET status = $1 WHERE project_id = $2;',
    ['Rejected', project_id]
  );

  // 2. Set selected bid to Not Started
  await db.query(
    'UPDATE Bids SET status = $1 WHERE id = $2;',
    ['Not Started', acceptedBidId]
  );
};

module.exports = {
  createBid,
  getAllBids,
  getBidById,
  getBidsByUserId,
  updateBid,
  removeBid,
  updateStatusByProject // ✅ export the new helper
};
