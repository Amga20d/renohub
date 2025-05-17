/* eslint-disable camelcase */
/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Create New user
router.post('/register', (req, res) => {

  const newUser = {
    name: 'Sally Mally',
    email: 'salmal@email.com',
    password_hash :'pass123',
    phone_number : '123456789',
    role : 'HomeOwner',
    verification_status: true,
    created_at :'2025-07-29 07:35:40'
  };

  for (const field in newUser){
    if (!newUser[field]){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a account' });
    }
  }
  userQueries.register(newUser)
  .then((user) => {
    res.status(201).json({message: 'User Created!', user})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating User', error: err.message});
  });
});

// Read All users
router.get('/index', (req, res) => {
  userQueries
  .getAllUsers()
  .then((users) => {
    if (!users) {
      return res.status(400).json({ message: 'users not found!' });
    }
    res.status(201).json({ message: 'Heres all the users!', users })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading users', error: err.message });
    });
})

// read/get one user by user_id
router.get('/:user_id', (req, res) => {
  userQueries
  .getUserById(req.params.user_id)
  .then((user) => {
    if (!user) {
      return res.status(400).json({ message: 'User not found!' });
    }
    res.status(201).json({ message: 'Heres the user!', user })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading user', error: err.message });
    });
})

// Update a User
router.post('/:user_id/update', (req, res) => {
  const updatedUser = {
    name: 'Jude Dude',
    email: 'Jdude@email.com',
    password_hash :'pass123',
    phone_number : '123456789',
    role : 'Contractor',
    verification_status: true,
  };

  for (const field in updatedUser){
    if (!updatedUser[field]){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a account' });
    }
  }
userQueries
.getUserById(req.params.user_id)
.then((user) => {
  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  return userQueries.updateUser(req.params.user_id, updatedUser)
})
 .then((updatedUser) => {
      res.status(201).json({ message: 'User updated!', note: updatedUser });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating user', error: err.message });
    });
}); 

 // Remove a user
 router.post('/:user_id/delete', (req, res) => {
 userQueries
 .getUserById(req.params.user_id)
 .then((user) => {
   if (!user) {
     return res.status(404).json({ message: 'User not found!' });
   } 
   console.log(user)
   return userQueries.removeUser(req.params.user_id)
 })
  .then(() => {
       res.status(204).json();
     })
     .catch((err) => {
       res
         .status(500)
         .json({ message: 'Error deleting user', error: err.message });
     });
 });

module.exports = router;
