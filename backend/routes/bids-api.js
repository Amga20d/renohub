const express = require('express');
const router = express.Router();
const bidsQueries = require('../db/queries/bids');
const projectQueries = require('../db/queries/projects');

// ✅ Create New Bid
router.post('/', async (req, res) => {
  const { user_id, project_id, amount, status, notes, created_at } = req.body;

  if (!user_id || !project_id || !amount || !status || !notes || !created_at) {
    return res.status(400).json({ message: 'All fields are required to create a bid' });
  }

  try {
    const newBid = { project_id, amount, status, notes, created_at };
    const bid = await bidsQueries.createBid(user_id, newBid);
    res.status(201).json({ message: 'Bid Created!', bid });
  } catch (err) {
    res.status(500).json({ message: 'Error creating bid', error: err.message });
  }
});

// Accept a Bid and update others as Rejected
router.put('/:id/accept', async (req, res) => {
  const { bidId, projectId } = req.body;

  if (!bidId || !projectId) {
    return res.status(400).json({ message: 'bidId and projectId are required' });
  }

  try {
    // 1. Reject all bids and accept the selected one
    await bidsQueries.updateStatusByProject(projectId, bidId);

    // 2. Update the project status
    const updatedProject = await projectQueries.updateStatus(projectId, 'Ongoing');

    // 3. Send safe response
    return res.status(200).json({
      message: 'Bid accepted and project updated',
      project: updatedProject
    });
  } catch (err) {
    console.error('Error accepting bid:', err);
    return res.status(500).json({ message: 'Error accepting bid', error: err.message });
  }
});

// ✅ Read All Bids
router.get('/', (req, res) => {
  bidsQueries.getAllBids()
    .then(bids => {
      if (!bids || bids.length === 0) {
        return res.status(404).json({ message: 'No bids found' });
      }
      res.status(200).json({ message: 'Here are all the bids', bids });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error reading bids', error: err.message });
    });
});

// ✅ Read One Bid by ID
router.get('/:id', (req, res) => {
  bidsQueries.getBidById(req.params.id)
    .then(bid => {
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }
      res.status(200).json({ message: 'Here is the bid', bid });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error reading bid', error: err.message });
    });
});

// ✅ Read All Bids from a User
router.get('/user/:id', (req, res) => {
  bidsQueries.getBidsByUserId(req.params.id)
    .then(bids => {
      if (!bids || bids.length === 0) {
        return res.status(404).json({ message: 'No bids found for this user' });
      }
      res.status(200).json({ message: 'Here are the user\'s bids', bids });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error reading user bids', error: err.message });
    });
});

// ✅ Update a Bid
router.put('/:id', (req, res) => {
  const { user_id, amount, notes, status } = req.body;

  if (!user_id || !amount || !notes || !status) {
    return res.status(400).json({ message: 'All fields are required to update a bid' });
  }

  const updatedBid = {
    amount,
    notes,
    status
  };

  bidsQueries.getBidById(req.params.id)
    .then(bid => {
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }

      if (bid.user_id !== user_id) {
        return res.status(401).json({ message: 'Unauthorized to update this bid' });
      }

      return bidsQueries.updateBid(req.params.id, updatedBid);
    })
    .then(updated => {
      res.status(200).json({ message: 'Bid updated', bid: updated });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating bid', error: err.message });
    });
});

// ✅ Delete a Bid
router.delete('/:id', (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID required to delete bid' });
  }

  bidsQueries.getBidById(req.params.id)
    .then(bid => {
      if (!bid) {
        return res.status(404).json({ message: 'Bid not found' });
      }

      if (bid.user_id !== user_id) {
        return res.status(401).json({ message: 'Unauthorized to delete this bid' });
      }

      return bidsQueries.removeBid(req.params.id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting bid', error: err.message });
    });
});

module.exports = router;
