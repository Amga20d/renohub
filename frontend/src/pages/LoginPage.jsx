import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password:''
  })

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData(prevState => ({...prevState, [name]: value}));
  }
   
  const handleSubmit = (e) => {
    console.log(formData.email);
    e.preventDefault();
    axios.post('/api/users/login', formData)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange}/>
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name='password' placeholder="Password" value={formData.password} onChange={handleChange}/>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
