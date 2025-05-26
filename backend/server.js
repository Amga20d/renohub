// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersApiRoutes = require('./routes/users-api');
const messagesApiRoutes = require ('./routes/messages-api');
const projectApiRoutes = require('./routes/projects-api');
const projectImagesApiRoutes = require('./routes/project_images-api');
const bidsApiRoutes = require('./routes/bids-api');
const paymentsApiRoutes = require('./routes/payments-api');
const reviewsApiRoutes = require('./routes/reviews-api');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`

app.use('/api/users', usersApiRoutes);
app.use('/api/messages', messagesApiRoutes);
app.use('/api/projects', projectApiRoutes);
app.use('/api/project_images', projectImagesApiRoutes);
app.use('/api/bids', bidsApiRoutes);
app.use('/api/payments', paymentsApiRoutes);
app.use('/api/reviews', reviewsApiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get('/', (req, res) => {
  res.send('Hello RenoHub!')
});


// Catch all route
app.use((req, res) => {
  res.status(404).send({ message: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});