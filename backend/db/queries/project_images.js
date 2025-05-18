const db = require('../connection');

const createImage = (newImage) => {
  const {
    project_id,
    image_url,
    alt_text,
    created_at
  } = newImage;

  return db
  .query('INSERT INTO Project_images (project_id, image_url, alt_text, created_at) VALUES ($1, $2, $3, $4) RETURNING *;',
    [project_id, image_url, alt_text, created_at]
  )
  .then((data) => data.rows[0]);
};

const getImageById = (id) => {
  return db.query('SELECT * FROM Project_images WHERE id = $1;', [id])
  .then((data) => data.rows[0]);
}
const getAllImagesByProjectId = (project_id) => {
  return db.query('SELECT * FROM Project_images WHERE project_id = $1;',[project_id])
  .then((data) => data.rows);
};

const updateImage = (id, updatedImage) => {
  const {
    project_id,
    image_url,
    alt_text
  } = updatedImage;
  
  return db
  .query('UPDATE Project_images SET project_id = $2, image_url = $3, alt_text = $4 WHERE id = $1 RETURNING *;',
    [id, project_id, image_url, alt_text]
  )
  .then((data) => data.rows[0]);
};

const removeImage = (id) => {
  return db.query('DELETE FROM Project_images WHERE id = $1;', [id])
  .then((data) => data.rows[0]);
};


module.exports = {createImage, getImageById, getAllImagesByProjectId, updateImage, removeImage};   