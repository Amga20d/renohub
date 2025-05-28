import React from "react";
import '../styles/LoginPage.scss'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
  <div className="login-body">
   
      <form className="login-form">
        <h1>Login</h1>
        <div className="login-form-inputs">
          <div className="login-form-input-fields">
            <label>Email: </label>
            <input type="email" />
          </div>
          <div className="login-form-input-fields">
            <label>Password: </label>
            <input type="password" />
          </div>
          <div className="login-btn-group">
            <button type="submit" className="login-form-btn">Login</button>
          <Link to="/" >←Back</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;