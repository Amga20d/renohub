/* eslint-disable camelcase */
const db = require('../connection');

// Create a new project
const createProject = (newProject) => {
  const {
    user_id,
    title,
    description,
    budget,
    address,
    status,
    type,
    created_at
  } = newProject;

  return db.query(
    'INSERT INTO Projects (user_id, title, description, budget, address, status, type, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
    [user_id, title, description, budget, address, status, type, created_at]
  ).then((data) => data.rows[0]);
};

// Get all projects
const getAllProjects = () => {
  return db.query('SELECT * FROM Projects;').then((data) => data.rows);
};

// Get a project by ID
const getProjectById = (id) => {
  return db.query('SELECT * FROM Projects WHERE id = $1;', [id])
    .then((data) => data.rows[0]);
};

// Get all projects for a user
const getProjectsByUserId = (user_id) => {
  return db.query('SELECT * FROM Projects WHERE user_id = $1;', [user_id])
    .then((data) => data.rows);
};

// Update a project
const updateProject = (id, updatedProject) => {
  const { title, description, budget, address, status, type } = updatedProject;

  return db
    .query(
      'UPDATE Projects SET title = $2, description = $3, budget = $4, address = $5, status = $6, type = $7 WHERE id = $1 RETURNING *;',
      [id, title, description, budget, address, status, type]
    )
    .then((data) => data.rows[0]); // ✅ return only the plain row object
};


// Delete a project
const removeProject = (id) => {
  return db.query('DELETE FROM Projects WHERE id = $1;', [id])
    .then((data) => data.rows);
};

// ✅ New: Update project status only
const updateStatus = (project_id, newStatus) => {
  return db.query(
    'UPDATE Projects SET status = $2 WHERE id = $1 RETURNING *;',
    [project_id, newStatus]
  ).then((data) => data.rows[0]);
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  getProjectsByUserId,
  updateProject,
  removeProject,
  updateStatus 
};
