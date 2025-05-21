import React from "react";

const RegisterPage = () => {
  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      height: "100vh", 
      backgroundColor: "#f2f2f2" 
    }}>
      <form style={{ 
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
