import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  // Inline CSS styles for centering the content
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',       // Full viewport height to center vertically
    textAlign: 'center'    // Center text horizontally within each element
  };

  const headingStyle = {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  };

  const descriptionStyle = {
    fontSize: '1.2rem',
    marginBottom: '1.5rem'
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>404 - Page Not Found</h1>
      <p style={descriptionStyle}>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
