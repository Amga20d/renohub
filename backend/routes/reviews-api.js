const express = require('express');
const router = express.Router();
const reviewsQueries = require('../db/queries/reviews');
const projectQueries = require('../db/queries/projects')

router.post('/', (req, res) => { 
  const {
    rating,
    message, 
    project_id
  } = req.body;

  const user_id = 1;
  const newReview = {
    rating: rating,
    message: message ,
    project_id: project_id,
    created_at: new Date()
  };
    
   const validateValues = Object.values(newReview);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  reviewsQueries.createReview(user_id, newReview)
  .then((review) => {
    res.status(201).json({message: 'Review Created!', review})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating Review', error: err.message});
  });
});

// Read All reviews 
router.get('/', (req, res) => {
  reviewsQueries
  .getAllReviews()
  .then((reviews) => {
    if (!reviews) {
      return res.status(400).json({ message: 'Reviews not found!' });
    }
    res.status(201).json({ message: 'Heres all the reviews!', reviews })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading reviews', error: err.message });
    });
})

// Read all reviews
router.get('/:id', (req, res) => {
  reviewsQueries
  .getAllReviews(req.params.id)
  .then((review) => {
    if (!review) {
      return res.status(400).json({ message: 'Review not found!' });
    }
    res.status(201).json({ message: 'Heres the review!', review })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading review', error: err.message });
    });
})

// Read one by id
router.get('/:id', (req, res) => {
  reviewsQueries
  .getReviewById(req.params.id)
  .then((review) => {
    if (!review) {
      return res.status(400).json({ message: 'Review not found!' });
    }
    res.status(201).json({ message: 'Heres all the review!', review })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading review', error: err.message });
    });
})

// Update a bid
router.put('/:id', (req, res) => {
  const {
    rating,
    message
  } = req.body;

  const user_id = 1;
  const updatedReview = {
    rating: rating,
    message: message,
  };

reviewsQueries
.getReviewById(req.params.id)
.then((review) => {
  if (!review) {
    return res.status(404).json({ message: 'Review not found!' });
  }
projectQueries
.getProjectById(req.params.id)
.then((project) => {
  if (project.user_id !== user_id) {
     return res
      .status(401)
      .json({ message: 'Review does not belongs to you!' });
  }
})
  return reviewsQueries.updateReview(req.params.id, updatedReview)
})
 .then((updatedReview) => {
      res.status(201).json({ message: ' updated!', note: updatedReview });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating Review', error: err.message });
    });
}); 


// Remove a Review
router.delete('/:id', (req, res) => {
const user_id = 1;
reviewsQueries
.removeReview(req.params.id)
.then((review) => {
  if (!review) {
    return res.status(404).json({ message: 'Review not found!' });
  }

  const reviewBelongsToUser = review.user_id === user_id; // EDIT USER_ID
  if (!reviewBelongsToUser) {
     return res
          .status(401)
          .json({ message: 'Review does not belongs to you!' });
  }
  return reviewsQueries.removeReview(req.params.id)
})
 .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting review', error: err.message });
    });
});

module.exports = router;