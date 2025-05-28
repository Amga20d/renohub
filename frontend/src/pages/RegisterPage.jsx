import React from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import'../styles/RegisterPage.scss'

const RegisterPage = () => {
  return (
    // <Link to="/" className="nav-link-item">RenoHub <i class="fa-solid fa-house-chimney"></i></Link>
    <div className="register-body">
      <div>
        <Link to="/" className="btn-back">Back</Link>
      </div>
      <form className="form">
        <h1>Register</h1>
        <div className="form-inputs">
          <div className="form-input-fields">
            <label>Name: </label>
            <input type="text" />
          </div>
          <div className="form-input-fields">
            <label>Email: </label>
            <input type="email" />
          </div>
          <div className="form-input-fields">
            <label>Password: </label>
            <input type="password" />
          </div>
          <div className="form-input-fields">
            <label>Phone: </label>
            <input type="text" />
          </div>
          <div className="form-input-fields">
            <label>Postal/Zip</label>
            <input type="text" />
          </div>
          <div className="input-role">
          </div>
          <button type="submit" className="form-btn">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
