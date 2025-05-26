import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#2c3e50",
    padding: "10px 20px",
    color: "#ecf0f1",
  };

  const linkStyle = {
    color: "#ecf0f1",
    textDecoration: "none",
    margin: "0 10px",
  };

  return (
    <nav className="nav-bar">
      <div className="nav-logo">
        <Link to="/" className="nav-link-item">RenoHub <i class="fa-solid fa-house-chimney"></i></Link>
      </div>
      <div className="nav-link-group">
        <span><Link to="/dashboard" className="nav-link-item">Dashboard</Link></span>
        <span><Link to="/projects" className="nav-link-item">Projects</Link></span>
        <span><Link to="/contractors" className="nav-link-item">Contractors</Link></span>
        <span><Link to="/messages" className="nav-link-item">Messages</Link></span>
        <span><Link to="/profile" className="nav-link-item">Profile</Link></span>
      </div>
    </nav>
  );
};

export default Navbar;
