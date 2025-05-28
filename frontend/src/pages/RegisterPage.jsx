import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "Homeowner"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", formData);
      alert("Registration successful!");
      console.log(res.data);
      navigate("/"); // ✅ Redirect to homepage
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{ ...inputStyle, cursor: "pointer" }}
        >
          <option value="Homeowner">Homeowner</option>
          <option value="Contractor">Contractor</option>
        </select>

        <button type="submit" style={buttonStyle}>Register</button>
        <button type="button" onClick={() => navigate("/")} style={{ ...buttonStyle, backgroundColor: "#888", marginTop: "10px" }}>
          Back to Homepage
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  backgroundColor: "#f2f2f2"
};

const formStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "5px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  width: "300px"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
  borderRadius: "3px",
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "3px",
  cursor: "pointer"
};

export default RegisterPage;
