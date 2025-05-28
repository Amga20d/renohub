const express = require('express');
const router = express.Router();
const projectQueries = require('../db/queries/projects');

// ✅ Create New Project
router.post('/', (req, res) => {
  const {
    user_id,
    title,
    description,
    budget,
    address,
    type
  } = req.body;

  const newProject = {
    user_id,
    title,
    description,
    budget,
    address,
    status: "Bidding",
    type,
    created_at: new Date()
  };

  const validateValues = Object.values(newProject);
  for (const value of validateValues) {
    if (!value) {
      return res
        .status(400)
        .json({ message: 'All fields must be provided to create a project' });
    }
  }

  projectQueries.createProject(newProject)
    .then((project) => {
      res.status(201).json({ message: 'Project Created!', project });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error creating project', error: err.message });
    });
});

// ✅ Read All Projects
router.get('/', (req, res) => {
  projectQueries
    .getAllProjects()
    .then((projects) => {
      res.status(200).json({ message: 'All projects fetched', projects });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading projects', error: err.message });
    });
});

// ✅ Read One Project by ID
router.get('/:id', (req, res) => {
  projectQueries
    .getProjectById(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: 'Project not found!' });
      }
      res.status(200).json({ message: 'Project fetched', project });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading project', error: err.message });
    });
});

// ✅ Read All Projects from a User
router.get('/user/:id', (req, res) => {
  projectQueries
    .getProjectsByUserId(req.params.id)
    .then((projects) => {
      res.status(200).json({ message: 'User projects fetched', projects });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading user projects', error: err.message });
    });
});

// ✅ Update a Project
router.put('/:id', (req, res) => {
  const {
    title,
    description,
    budget,
    address,
    status,
    type
  } = req.body;

  const user_id = req.body.user_id || 1;

  const updatedProject = {
    title,
    description,
    budget,
    address,
    status,
    type
  };

  projectQueries
    .getProjectById(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: 'Project not found!' });
      }

      if (project.user_id !== user_id) {
        return res
          .status(401)
          .json({ message: 'This project does not belong to you!' });
      }

      return projectQueries.updateProject(req.params.id, updatedProject);
    })
    .then((updatedProject) => {
      if (updatedProject) {
        return res
          .status(200)
          .json({ message: 'Project updated!', project: updatedProject });
      }
    })
    .catch((err) => {
      console.error(err);
      if (!res.headersSent) {
        res
          .status(500)
          .json({ message: 'Error updating project', error: err.message });
      }
    });
});

// ✅ Delete a Project
router.delete('/:id', (req, res) => {
  const user_id = req.body.user_id || 1;

  projectQueries
    .getProjectById(req.params.id)
    .then((project) => {
      if (!project) {
        return res.status(404).json({ message: 'Project not found!' });
      }

      if (project.user_id !== user_id) {
        return res
          .status(401)
          .json({ message: 'This project does not belong to you!' });
      }

      return projectQueries.removeProject(req.params.id);
    })
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting project', error: err.message });
    });
});

module.exports = router;
