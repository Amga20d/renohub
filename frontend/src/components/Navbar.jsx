import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
    padding: '10px 20px',
    color: '#ecf0f1',
  };

  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    margin: '0 10px',
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ ...linkStyle, fontWeight: 'bold' }}>
          RenoHub
        </Link>
      </div>
      <div>
        <Link to="/dashboard" style={linkStyle}>
          Dashboard
        </Link>
        <Link to="/projects" style={linkStyle}>
          Projects
        </Link>
        <Link to="/messages" style={linkStyle}>
          Messages
        </Link>
        <Link to="/profile" style={linkStyle}>
          Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
