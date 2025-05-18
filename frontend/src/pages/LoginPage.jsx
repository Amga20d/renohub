import React from "react";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Password" />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
