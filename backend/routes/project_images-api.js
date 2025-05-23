const express = require('express');
const router = express.Router();
const projectImagesQueries = require('../db/queries/project_images');
const projectQueries = require('../db/queries/projects')

// Create New project image
router.post('/:project_id', (req, res) => {

  const {image_url, alt_text} = req.body
  const newProjectImage = {
    project_id: req.params.project_id,
    image_url: image_url,
    alt_text: alt_text,
    created_at : new Date()
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
router.get('/project/:id', (req, res) => {
  projectImagesQueries
  .getAllImagesByProjectId(req.params.id)
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
router.get('/:id', (req, res) => {
  projectImagesQueries
  .getImageById(req.params.id)
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

router.put('/:id', (req, res) => {
  const {image_url, alt_text} = req.body;
  const user_id = 1;
  const updatedProjectImage = {
    project_id: 1,
    image_url: image_url,
    alt_text: alt_text,
  };

projectImagesQueries
.getImageById(req.params.id)
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

  return projectImagesQueries.updateImage(req.params.id, updatedProjectImage)
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
router.delete('/:id', (req, res) => {
const user_id = 1;
projectImagesQueries
.getImageById(req.params.id)
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

  return projectImagesQueries.removeImage(req.params.id)
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