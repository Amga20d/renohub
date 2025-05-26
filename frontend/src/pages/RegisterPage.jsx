import React from "react";
import axios from "axios";
import { useState } from "react";


const RegisterPage = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: ''
    })

     const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({...prevState, [name]:value}));
  };

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/users', formData)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      backgroundColor: "#f2f2f2" 
    }}>
      <form onSubmit={handleSubmit} style={{ 
        backgroundColor: "#fff", 
        padding: "20px", 
        borderRadius: "5px", 
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" 
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              padding: "8px", 
              borderRadius: "3px", 
              border: "1px solid #ccc" 
            }} 
          />
        </div>
        
        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              padding: "8px", 
              borderRadius: "3px", 
              border: "1px solid #ccc" 
            }} 
          />
        </div>
        
        <div style={{ marginBottom: "20px" }}>
          <label>Password: </label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ 
              width: "100%", 
              padding: "8px", 
              borderRadius: "3px", 
              border: "1px solid #ccc" 
            }} 
          />
        </div>
        
        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "10px", 
            backgroundColor: "#4CAF50", 
            color: "#fff", 
            border: "none", 
            borderRadius: "3px", 
            cursor: "pointer" 
          }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
