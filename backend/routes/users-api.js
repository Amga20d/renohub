// routes/users.js

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';

// ✅ Register new user
router.post('/', (req, res) => {
  const { name, email, password, phone_number, role } = req.body;

  if (!name || !email || !password || !phone_number || !role) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const hash = bcrypt.hashSync(password, salt);

  const newUser = {
    name,
    email,
    password_hash: hash,
    phone_number,
    role,
    verification_status: true,
    created_at: new Date()
  };

  userQueries.register(newUser)
    .then(user => {
      res.status(201).json({ message: 'User created successfully', user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error creating user', error: err.message });
    });
});

// ✅ Login with email + password
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  userQueries.getUserByEmail(email)
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: '2h'
      });

      res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
        token
      });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error logging in', error: err.message });
    });
});

// ✅ Get all users
router.get('/', (req, res) => {
  userQueries.getAllUsers()
    .then(users => res.status(200).json({ users }))
    .catch(err => res.status(500).json({ message: 'Error fetching users', error: err.message }));
});

// ✅ Get user by ID
router.get('/:id', (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching user', error: err.message });
    });
});

// ✅ Update user
router.put('/:id', (req, res) => {
  const { name, email, phone_number, role } = req.body;

  const updatedUser = {
    name,
    email,
    phone_number,
    role,
    password_hash: 'unchanged',
    verification_status: true
  };

  for (const field in updatedUser) {
    if (!updatedUser[field]) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  }

  userQueries.getUserById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return userQueries.updateUser(req.params.id, updatedUser);
    })
    .then(updated => {
      res.status(200).json({ message: 'User updated', user: updated });
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating user', error: err.message });
    });
});

// ✅ Delete user
router.delete('/:id', (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return userQueries.removeUser(req.params.id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch(err => {
      res.status(500).json({ message: 'Error deleting user', error: err.message });
    });
});

module.exports = router;
