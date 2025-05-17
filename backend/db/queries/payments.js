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

const getPaymentByBidId = (bid_id) => {
  return db.query('SELECT * FROM Payments WHERE bid_id = $1;', [bid_id])
  .then((data) => data.rows);
};

const updatePayment = (updatedPayment) => {
  return db.query('UPDATE Payments SET status = $1;',[updatedPayment])
  .then((data) => data.rows[0]);
};


module.exports = {createPayment, getPaymentByBidId, updatePayment};