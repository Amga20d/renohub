import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import { getDaysAgo } from '../helpers/utils';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const projectTypes = [
    'All', 'Roofing', 'Siding', 'Framing', 'Painting',
    'Flooring', 'HVAC', 'Plumbing', 'Electrical'
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter);

  const pageStyles = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  };

  const buttonStyle = {
    marginRight: '8px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const viewButtonStyle = { ...buttonStyle, backgroundColor: '#007BFF', color: '#fff' };
  const messageButtonStyle = { ...buttonStyle, backgroundColor: '#FFC107', color: '#fff' };
  const bidButtonStyle = { ...buttonStyle, backgroundColor: '#28A745', color: '#fff' };

  return (
    <div style={pageStyles}>
      <Navbar />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Browse Projects</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              ...buttonStyle,
              backgroundColor: filter === type ? '#0056b3' : '#007BFF',
              color: '#fff'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredProjects.map(project => (
        <div key={project.id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '16px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <p><strong>Budget:</strong> {project.budget}</p>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            Posted: {getDaysAgo(project.created_at)}
          </p>
          <div>
            <Link to={`/projects/${project.id}`}>
              <button style={viewButtonStyle}>View</button>
            </Link>
            <Link to={`/messages/${project.user_id}`}>
              <button style={messageButtonStyle}>Message Homeowner</button>
            </Link>
            <Link to={`/projects/${project.id}/bids`}>
              <button style={bidButtonStyle}>Bid</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
