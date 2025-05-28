import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#2c3e50', padding: '10px 20px', color: '#ecf0f1' }}>
      <div>
        <Link to="/" style={{ color: '#ecf0f1', textDecoration: 'none', fontWeight: 'bold' }}>
          RenoHub
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link to="/dashboard" style={{ color: '#ecf0f1' }}>Dashboard</Link>
        <Link to="/projects" style={{ color: '#ecf0f1' }}>Projects</Link>
        <Link to="/contractors" style={{ color: '#ecf0f1' }}>Contractors</Link>
        <Link to="/messages" style={{ color: '#ecf0f1' }}>Messages</Link>
        <Link to="/profile" style={{ color: '#ecf0f1' }}>Profile</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} style={{ background: "transparent", color: "#ecf0f1", border: "none", cursor: "pointer" }}>Sign Out</button>
          </>
        ) : (
          <Link to="/login" style={{ color: '#ecf0f1' }}>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
