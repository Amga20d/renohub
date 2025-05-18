const express = require('express');
const router = express.Router();
const bidsQueries = require('../db/queries/bids');

// Create New Bid
router.post('/:user_id/create', (req, res) => {

  // const newBid = req.body;
  const user_id = 1;
  const newBid = {
    project_id: 1,
    amount: 100,
    status: true,
    notes:'testing note',
    created_at :'2025-07-29 07:35:40'
  };

  for (const field in newBid){
    if (!newBid[field]){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a bid' });
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
router.get('/index', (req, res) => {
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
router.get('/:bid_id', (req, res) => {
  bidsQueries
  .getBidById(req.params.bid_id)
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
router.get('/user/:user_id', (req, res) => {
  bidsQueries
  .getBidsByUserId(req.params.user_id)
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
router.post('/:bid_id/update', (req, res) => {

  const user_id = 2;
  const updatedBid = {
    project_id: 1,
    amount: 100,
    notes:'fixing that roof for cheap now',
    created_at :'2025-07-29 07:35:40'
  };
bidsQueries
.getBidById(req.params.bid_id)
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
  return bidsQueries.updateBid(req.params.bid_id, updatedBid)
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
router.post('/:bid_id/delete', (req, res) => {
const user_id = 2;
bidsQueries
.getBidById(req.params.bid_id)
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
  return bidsQueries.removeBid(req.params.bid_id)
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