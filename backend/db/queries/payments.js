const db = require('../connection');

const createPayment = (newPayment) => {
  const {
    bid_id,
    status,
    created_at
  } = newPayment;

  return db
  .query('INSERT INTO Payments (bid_id, status, created_at) VALUES ($1, $2, $3) RETURNING*;',
    [bid_id, status, created_at]
  )
  .then((data) => data.rows[0]);
};

const getPaymentById = (id) => {
  return db.query('SELECT * FROM Payments WHERE id = $1;', [id])
  .then((data) => data.rows[0]);
};

const getAllPaymentByBidId = (bid_id) => {
  return db.query('SELECT * FROM Payments WHERE bid_id = $1;', [bid_id])
  .then((data) => data.rows);
};

const invalidatePayment = (id) => {
  return db.query('UPDATE Payments SET status = FALSE WHERE id =$1;',[id])
  .then((data) => data.rows[0]);
};

const validatePayment = (id) => {
  return db.query('UPDATE Payments SET status = TRUE WHERE id =$1;',[id])
  .then((data) => data.rows[0]);
};


module.exports = {createPayment, getAllPaymentByBidId, validatePayment, invalidatePayment, getPaymentById};