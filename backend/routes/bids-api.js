const express = require('express');
const router = express.Router();
const bidsQueries = require('../db/queries/bids');

// Create New Bid
router.post('/', (req, res) => {
  const {amount, notes} = req.body;

  const user_id = 1;
  const newBid = {
    project_id: 1,
    amount: amount,
    status: true,
    notes: notes,
    created_at: new Date()
  };
    
   const validateValues = Object.values(newBid);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  bidsQueries.createBid(user_id, newBid)
  .then((bid) => {
    res.status(201).json({message: 'Bid Created!', bid})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating Bid', error: err.message});
  });
});

// Read All bids
router.get('/', (req, res) => {
  bidsQueries
  .getAllBids()
  .then((bids) => {
    if (!bids) {
      return res.status(400).json({ message: 'bid not found!' });
    }
    res.status(201).json({ message: 'Heres all the bids!', bids })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading bid', error: err.message });
    });
})

// Read one by id
router.get('/:id', (req, res) => {
  bidsQueries
  .getBidById(req.params.id)
  .then((bid) => {
    if (!bid) {
      return res.status(400).json({ message: 'bid not found!' });
    }
    res.status(201).json({ message: 'Heres the bid!', bid })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading bid', error: err.message });
    });
})

// Read All bids from user
router.get('/user/id', (req, res) => {
  bidsQueries
  .getBidsByUserId(req.params.id)
  .then((bids) => {
    if (!bids) {
      return res.status(400).json({ message: 'bid not found!' });
    }
    res.status(201).json({ message: 'Heres all the bids!', bids })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading bid', error: err.message });
    });
})

// Update a bid
router.put('/:id', (req, res) => {
  const {amount, notes} = req.body;
  const user_id = 2;
  const updatedBid = {
    project_id: 1,
    amount: amount,
    notes: notes,
    created_at :'2025-07-29 07:35:40'
  };
bidsQueries
.getBidById(req.params.id)
.then((bid) => {
  if (!bid) {
    return res.status(404).json({ message: 'Bid not found!' });
  }

  console.log(bid)
  const bidBelongsToUser = bid.user_id === user_id;
  if (!bidBelongsToUser) {
     return res
          .status(401)
          .json({ message: 'Bid does not belongs to you!' });
  }
  return bidsQueries.updateBid(req.params.id, updatedBid)
})
 .then((updatedBid) => {
      res.status(201).json({ message: 'Bid updated!', note: updatedBid });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating Bid', error: err.message });
    });
}); 

// Remove a Bid
router.delete('/:id', (req, res) => {
const user_id = 2;
bidsQueries
.getBidById(req.params.id)
.then((bid) => {
  if (!bid) {
    return res.status(404).json({ message: 'Bid not found!' });
  }

  console.log(bid)
  const bidBelongsToUser = bid.user_id === user_id;
  if (!bidBelongsToUser) {
     return res
          .status(401)
          .json({ message: 'Bid does not belongs to you!' });
  }
  return bidsQueries.removeBid(req.params.id)
})
 .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting bid', error: err.message });
    });
});

module.exports = router;