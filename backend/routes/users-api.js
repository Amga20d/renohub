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
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

// Create New user
router.post('/', (req, res) => {
  const {
    name,
    email,
    password
    // phone_number, // uncomment when fields added
    // role
  } = req.body;
  const hash = bcrypt.hashSync(password, salt);


  const newUser = {
    name: name,
    email: email,
    password_hash :hash,
    phone_number : '1234567890',
    role : 'Homeowner',
    verification_status: true,
    created_at: new Date()
  };
  console.log(newUser);
    const validateValues = Object.values(newUser);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
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
router.get('/', (req, res) => {
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

// get user by email (Login)
router.post('/login', (req, res) => {
  const {email, password} = req.body;
  userQueries
  .getUserByEmail(email)
  .then((user) => {
    if (!user) {
      return res.status(400).json({ message: 'users not found!' });
    }
    if(!bcrypt.compareSync(password,user.password_hash)) {
      return res.status(401).json({message: 'Incorrect Password. Please Try Again'})
    }
    console.log(email);
    res.status(201).json({message: 'heres the user!', user});
  })
  .catch((err) => {
    res
    .status(500)
    .json({message: 'Error reading the user', error: err.message});
  })
})

// Read one user by user_id
router.get('/:id', (req, res) => {
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
router.put('/:id', (req, res) => {
  const {
    name,
    email,
    phone_number,
    role
  } = req.body
  const updatedUser = {
    name: name,
    email: email,
    password_hash :'pass123',
    phone_number : phone_number,
    role : role,
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
.getUserById(req.params.id)
.then((user) => {
  if (!user) {
    return res.status(404).json({ message: 'User not found!' });
  }

  return userQueries.updateUser(req.params.id, updatedUser)
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
 router.delete('/:id', (req, res) => {
 userQueries
 .getUserById(req.params.id)
 .then((user) => {
   if (!user) {
     return res.status(404).json({ message: 'User not found!' });
   } 
   console.log(user)
   return userQueries.removeUser(req.params.id)
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
