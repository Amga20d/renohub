 const db = require('../connection');

const register = (newUser) => {
  const {
    name,
    email,
    password_hash,
    phone_number,
    role,
    verifaction_status,
    created_at
  } = newUser;

  return db
    .query('INSERT INTO Users (name, email, password_hash, phone_number, role, verifaction_status, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;',
       [name, email, password_hash, phone_number, role, verifaction_status, created_at])
    .then((data) => data.rows[0]);
};

const login = (name,) => {
  return db
    .query('SELECT * FROM Users WHERE name = $1;', [name])
    .then((data) => data.rows[0]);
};

const getAllUsers = () => {
  return db.query('SELECT * FROM Users;').then((data) => data.rows);
};

const updateUser = (updatedUser) => {
  const {
    id,
    name,
    email,
    phone_number,
    role,
    verifaction_status
  } = updatedUser;

  return db
    .query('UPDATE Users SET name = $2, email = $3, phone_number = $4, role = $5, verifaction_status = $6  WHERE id = $1 RETURNING *;',
    [ id, name, email, phone_number, role, verifaction_status])
    .then((data) => data.rows[0]);
};

const removeUser = (id) => {
  return db
    .query('DELETE FROM Users WHERE id = $1;', [id])
    .then((data) => data.rows);
};

module.exports = { register, login, getAllUsers, updateUser, removeUser };


