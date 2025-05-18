const express = require('express');
const router = express.Router();
const projectQueries = require('../db/queries/projects');

// Create New project
router.post('/create', (req, res) => {

  const newProject = {
    user_id: 1,
    title: 'Window Repair',
    description: 'Please fix me window',
    budget:2000,
    address:'Somewhere 123 street',
    status: true,
    created_at :'2025-07-29 07:35:40'
  };

   const validateValues = Object.values(newProject);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  projectQueries.createProject(newProject)
  .then((project) => {
    res.status(201).json({message: 'Project Created!', project})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating project', error: err.message});
  });
});

// Read All projects
router.get('/index', (req, res) => {
  projectQueries
  .getAllProjects()
  .then((projects) => {
    if (!projects) {
      return res.status(400).json({ message: 'Projects not found!' });
    }
    res.status(201).json({ message: 'Heres all the projects!', projects })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading projects', error: err.message });
    });
})

// Read one by id
router.get('/:project_id', (req, res) => {
  projectQueries
  .getProjectById(req.params.project_id)
  .then((project) => {
    if (!project) {
      return res.status(400).json({ message: 'project not found!' });
    }
    res.status(201).json({ message: 'Heres the project!', project })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading project', error: err.message });
    });
})

// Read All projects from user
router.get('/user/:user_id', (req, res) => {
  projectQueries
  .getProjectsByUserId(req.params.user_id)
  .then((project) => {
    if (!project) {
      return res.status(400).json({ message: 'project not found!' });
    }
    res.status(201).json({ message: 'Heres all the projects!', project })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading project', error: err.message });
    });
})

// Update a Project
router.post('/:project_id/update', (req, res) => {
  
  const user_id = 1;
  const updatedProject = {
    title: 'Floor repairs',
    description: 'Need my floor fixed now',
    budget: 4000,
    address:'Somewhere 123 street',
  };
projectQueries
.getProjectById(req.params.project_id)
.then((project) => {
  if (!project) {
    return res.status(404).json({ message: 'Project not found!' });
  }

  console.log(project)
  const projectBelongsToUser = project.user_id === user_id;
  if (!projectBelongsToUser) {
     return res
          .status(401)
          .json({ message: 'This project does not belongs to you!' });
  }
  return projectQueries.updateProject(req.params.project_id, updatedProject)
})
 .then((updatedProject) => {
      res.status(201).json({ message: 'Project updated!', note: updatedProject });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating project', error: err.message });
    });
}); 

// Remove a project
router.post('/:project_id/delete', (req, res) => {
const user_id = 1;
projectQueries
.getProjectById(req.params.project_id)
.then((project) => {
  if (!project) {
    return res.status(404).json({ message: 'Project not found!' });
  }
  console.log(project)
 const projectBelongsToUser = project.user_id === user_id;
  if (!projectBelongsToUser) {
     return res
          .status(401)
          .json({ message: 'This project does not belongs to you!' });
  }
  return projectQueries.removeProject(req.params.project_id)
})
 .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting project', error: err.message });
    });
});

module.exports = router;
