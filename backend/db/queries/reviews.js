const db = require('../connection');

const createReview = (user_id, newReview) => {
  const {
    rating,
    message,
    project_id,
    created_at
  } = newReview;
return db
.query('INSERT INTO Reviews (rating, message, project_id, created_at) VALUES ($1, $2, $3, $4) RETURNING *;',
  [rating, message, project_id, created_at]
).then((data) => data.rows[0]);

}

const getAllReviews = () => {
  return db.query('SELECT * FROM Reviews;').then((data) => data.rows);
}

const getReviewById = (id) => {
  return db
  .query('SELECT * FROM Reviews WHERE id = $1;',[id])
  .then((data) => data.rows[0]);
}

const getReviewByProjectId = (project_id) => {
  return db
  .query('SELECT * FROM Reviews WHERE project_id = $1;',[project_id])
  .then((data) => data.rows[0]);
}

const updateReview = (id, updateReview) => {
  return db
  .query('UPDATE Reviews SET rating =$2, message = $3 WHERE id = $1 RETURNING *;',
     [id, rating, message]
    ).then((data) => data.rows[0]);
}

const removeReview = (id) => {
  return db
  .query('DELETE FROM Reviews WHERE id = $1', [id])
  .then((data) => data.rows[0]);
}

module.exports = {createReview, getAllReviews, getReviewById, getReviewByProjectId, updateReview, removeReview };
