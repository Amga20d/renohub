const express = require('express');
const router = express.Router();
const paymentQueries = require('../db/queries/payments');

// Create New Payment
router.post('/:bid_id/', (req, res) => {

  const newPayment = {
    bid_id: req.params.bid_id,
    status: true,
    created_at : new Date()
  };

  const validateValues = Object.values(newPayment);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  paymentQueries.createPayment(newPayment)
  .then((payment) => {
    res.status(201).json({message: 'Payment Created!', payment})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating Payment', error: err.message});
  });
});

// Read one by id
router.get('/:id', (req, res) => {
  paymentQueries
  .getPaymentById(req.params.id)
  .then((payment) => {
    if (!payment) {
      return res.status(400).json({ message: 'Payment not found!' });
    }
    res.status(201).json({ message: 'Heres the payment!', payment })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading payment', error: err.message });
    });
})

// Read all payments for bid
router.get('/:bid_id/', (req, res) => {
  paymentQueries
  .getAllPaymentByBidId(req.params.bid_id)
  .then((payments) => {
    if (!payments) {
      return res.status(400).json({ message: 'Payments not found!' });
    }
    res.status(201).json({ message: 'Heres all the payments!', payments })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading payments', error: err.message });
    });
})

// Validate a payment
router.put('/:id/validate', (req, res) => {
  
  const role = 'Admin';
paymentQueries
.getPaymentById(req.params.id)
.then((payment) => {
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found!' });
  }

  console.log(payment)
  const authorizedToChange = role === 'Admin';
  if (!authorizedToChange) {
     return res
          .status(401)
          .json({ message: 'You are not authorized to edit this' });
  }
  return paymentQueries.validatePayment(req.params.payment_id)
})
 .then((updatedPayment) => {
      res.status(201).json({ message: 'Paymenty updated!', note: updatedPayment });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating payment', error: err.message });
    });
}); 

// Invalidate a payment
router.put('/:id/invalidate', (req, res) => {
  const role = 'Admin';
paymentQueries
.getPaymentById(req.params.id)
.then((payment) => {
  if (!payment) {
    return res.status(404).json({ message: 'Payment not found!' });
  }

  console.log(payment)
  const authorizedToChange = role === 'Admin';
  if (!authorizedToChange) {
     return res
          .status(401)
          .json({ message: 'You are not authorized to edit this' });
  }
  return paymentQueries.invalidatePayment(req.params.payment_id)
})
 .then((updatedPayment) => {
      res.status(201).json({ message: 'Paymenty updated!', note: updatedPayment });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating payment', error: err.message });
    });
}); 
module.exports = router;