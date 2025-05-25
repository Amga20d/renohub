const express = require('express');
const router = express.Router();
const projectQueries = require('../db/queries/projects');

// Create New project
router.post('/', (req, res) => {
  const {
    title,
    description,
    budget,
    address
  } = req.body;   
  const user_id = 1;
  const newProject = {
    user_id: user_id,
    title: title,
    description: description,
    budget:budget,
    address: address,
    status: true,
    created_at : new Date()
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
router.get('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  projectQueries
  .getProjectById(req.params.id)
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
router.get('/user/:id', (req, res) => {
  projectQueries
  .getProjectsByUserId(req.params.id)
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
router.put('/:id', (req, res) => {
  const {
    title,
    description,
    budget,
    address
  } = req.body;
  const user_id = 1;
  const updatedProject = {
    title: title,
    description: description,
    budget: budget,
    address: address,
  };
projectQueries
.getProjectById(req.params.id)
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
  return projectQueries.updateProject(req.params.id, updatedProject)
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
router.delete('/:id', (req, res) => {
const user_id = 1;
projectQueries
.getProjectById(req.params.id)
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
  return projectQueries.removeProject(req.params.id)
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
