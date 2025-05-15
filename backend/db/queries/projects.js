/* eslint-disable camelcase */
const db = require('../connection');

// CRUD - Create, Read, Update, Delete
const createProject = (newProject) => {
  const {
    user_id,
    title,
    description,
    budget,
    address,
    status,
    created_at
  } = newProject;
  
  return db
    .query(
      'INSERT INTO notes (user_id, title, description, budget, address, status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [user_id, title, description, budget, address, status, created_at]
    )
    .then((data) => data.rows[0]);
};

const getAllProjects = () => {
  return db.query('SELECT * FROM Projects;').then((data) => data.rows);
};

const getProjectsById = (id) => {
  return db
    .query('SELECT * FROM Projects WHERE id = $1;', [id])
    .then((data) => data.rows[0]);
};

const getProjectByUserId = (user_id) => {
  return db
    .query('SELECT * FROM Project WHERE user_id = $1;', [user_id])
    .then((data) => data.rows);
};

const updateProject = (updatedProject) => {
  const {
    id,
    title,
    description,
    budget,
    address,
    status
  } = updatedProject;

  return db
    .query('UPDATE notes SET title = $2, description = $3, budget = $4, address = $5, status = $6  WHERE id = $1 RETURNING *;', [
       id, title, description, budget, address, status
    ])
    .then((data) => data.rows[0]);
};

const removeProject = (id) => {
  return db
    .query('DELETE FROM Projects WHERE id = $1;', [id])
    .then((data) => data.rows);
};

module.exports = { createProject, getAllProjects, getProjectsById, getProjectByUserId, updateProject, removeProject };
