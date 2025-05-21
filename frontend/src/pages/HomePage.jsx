import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  // Inline styles for various elements
  const containerStyle = {
    textAlign: 'center',
    padding: '2rem'
  };
  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  };
  const taglineStyle = {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '1.5rem'
  };
  const buttonContainerStyle = {
    marginBottom: '2rem'
  };
  const linkButtonStyle = {
    display: 'inline-block',
    margin: '0 0.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    textDecoration: 'none',
    border: 'none',
    borderRadius: '4px'
  };
  const howItWorksListStyle = {
    listStyleType: 'disc',
    textAlign: 'left',
    maxWidth: '300px',
    margin: '0 auto',
    padding: '0'
  };
  const howItWorksItemStyle = {
    marginBottom: '0.5rem'
  };

  return (
    <div style={containerStyle}>
      {/* Welcome Heading */}
      <h1 style={headingStyle}>Welcome to RenoHub</h1>
      {/* Tagline */}
      <p style={taglineStyle}>Connecting homeowners and contractors for efficient renovations</p>

      {/* Navigation Buttons */}
      <div style={buttonContainerStyle}>
        <Link to="/login" style={linkButtonStyle}>Login</Link>
        <Link to="/register" style={linkButtonStyle}>Register</Link>
      </div>

      {/* How It Works Section */}
      <h2 style={{ marginBottom: '1rem' }}>How It Works</h2>
      <ul style={howItWorksListStyle}>
        <li style={howItWorksItemStyle}><strong>Post a Project:</strong> Homeowners post their renovation project details.</li>
        <li style={howItWorksItemStyle}><strong>Receive Bids:</strong> Contractors submit bids and offers for the project.</li>
        <li style={howItWorksItemStyle}><strong>Hire a Contractor:</strong> Choose the best bid and get your project started.</li>
      </ul>
    </div>
  );
}

export default HomePage;
