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
        <span><Link to="/profile" className="nav-link-item">Profile</Link></span>
        {user ? (
          <>
            <span className='nav-link-item'>Welcome, {user.name}</span>
            <span><button onClick={handleLogout}>Sign Out</button></span>
            {/* { background: "transparent", color: "#ecf0f1", border: "none", cursor: "pointer" } */}
          </>
        ) : (
          <span><Link to="/login" className='nav-link-item'>Login</Link></span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;