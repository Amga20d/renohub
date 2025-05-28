import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const containerStyle = {
    maxWidth: "400px",
    margin: "60px auto",
    padding: "30px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ccc",
    borderRadius: "4px"
  };

  const labelStyle = {
    fontWeight: "bold"
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px"
  };

  const backStyle = {
    display: "block",
    textAlign: "center",
    marginTop: "15px",
    textDecoration: "none",
    color: "#2c3e50"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>Sign In</button>
      </form>
      <Link to="/" style={backStyle}>← Back to Home</Link>
    </div>
  );
};

export default LoginPage;
