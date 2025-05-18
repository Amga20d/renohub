const express = require('express');
const router = express.Router();
const projectImagesQueries = require('../db/queries/project_images');
const projectQueries = require('../db/queries/projects')

// Create New project image
router.post('/create', (req, res) => {

  const newProjectImage = {
    project_id: 1,
    image_url: 'url link',
    alt_text: 'test text',
    created_at :'2025-07-29 07:35:40'
  };

   const validateValues = Object.values(newProjectImage);
  for (const value of validateValues){
    if (!value){
      return res
      .status(400)
      .json({ message: 'All properties must be provided to create a payment' });
    }
  }
  projectImagesQueries.createImage(newProjectImage)
  .then((projectImage) => {
    res.status(201).json({message: 'Project image Created!', projectImage})
  })
  .catch((err) => {
    res
    .status(500)
    .json({message:'Error creating project image', error: err.message});
  });
});

// Read All projects images by project id
router.get('/project/:project_id', (req, res) => {
  projectImagesQueries
  .getAllImagesByProjectId(req.params.project_id)
  .then((project_images) => {
    if (!project_images) {
      return res.status(400).json({ message: 'project images not found!' });
    }
    res.status(201).json({ message: 'Heres all the project images!', project_images })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading project images', error: err.message });
    });
})


// Read one by id
router.get('/:project_image_id', (req, res) => {
  projectImagesQueries
  .getImageById(req.params.project_image_id)
  .then((project_image) => {
    if (!project_image) {
      return res.status(400).json({ message: 'project image not found!' });
    }
    res.status(201).json({ message: 'Heres the project image!', project_image })
  })
  .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error reading project image', error: err.message });
    });
})

// Update project image

router.post('/:project_image_id/update', (req, res) => {
  
  const user_id = 1;
  const updatedProjectImage = {
    project_id: 1,
    image_url: 'url link',
    alt_text: 'test text',
  };

projectImagesQueries
.getImageById(req.params.project_image_id)
.then((project_image) => {
  if (!project_image) {
    return res.status(404).json({ message: 'Project image not found!' });
  }

  console.log(project_image)
  projectQueries.getProjectById(project_image.id)
  .then((project) => {
    if (!project.user_id === user_id){
      return res
      .status(401)
      .json({ message: 'This project does not belongs to you!' });
    } 
  });

  return projectImagesQueries.updateImage(req.params.project_image_id, updatedProjectImage)
})
 .then((updatedProject) => {
      res.status(201).json({ message: 'Project image updated!', note: updatedProject });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error updating project image', error: err.message });
    });
}); 

// Remove a project image
router.post('/:project_image_id/delete', (req, res) => {

const user_id = 1;
projectImagesQueries
.getImageById(req.params.project_image_id)
.then((project_image) => {
  if (!project_image) {
    return res.status(404).json({ message: 'Project image not found!' });
  }
  console.log(project_image)
  projectQueries.getProjectById(project_image.id)
  .then((project) => {
    if (!project.user_id === user_id){
      return res
      .status(401)
      .json({ message: 'This project does not belongs to you!' });
    } 
  });

  return projectImagesQueries.removeImage(req.params.project_image_id)
})
 .then(() => {
      res.status(204).json();
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'Error deleting project image', error: err.message });
    });
});
module.exports = router;