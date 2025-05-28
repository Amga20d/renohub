import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/RegisterPage.scss";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_number: "",
    role: "Homeowner",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users", formData);
      alert("Registration successful!");
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Failed to register. Please try again.");
    }
  };

  return (
    <div className="register-body">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div className="form-inputs">
          <div className="form-input-fields">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input-fields">
            <label>Email: </label>
            <input
              type="email"
              name="email"
              placeholder="Email@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input-fields">
            <label>Password: </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input-fields">
            <label>Phone: </label>
            <input
              name="phone_number"
              placeholder="(888) 888-8888"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-drop">
            <p>Account Type:</p>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="form-drop-list"
            >
              <option value="Homeowner">Homeowner</option>
              <option value="Contractor">Contractor</option>
            </select>
          </div>

          <div className="login-btn-group">
            <button type="submit" className="form-btn">
              Register
            </button>
            <button onClick={() => navigate("/")} className="form-btn">
              ←Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
