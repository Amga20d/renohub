import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import { getDaysAgo } from '../helpers/utils';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const projectTypes = [
    'All',
    'Roofing',
    'Siding',
    'Framing',
    'Painting',
    'Flooring',
    'HVAC',
    'Plumbing',
    'Electrical'
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter);

    const pageStyles = {
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    };
    

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px'
  };

  const filterContainerStyle = {
    marginBottom: '20px',
    textAlign: 'center'
  };

  const filterButtonStyle = {
    margin: '0 5px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff'
  };

  const projectCardStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    backgroundColor: '#f9f9f9'
  };

  const titleStyle = {
    margin: '0 0 8px 0'
  };

  const descriptionStyle = {
    margin: '8px 0'
  };

  const budgetStyle = {
    fontWeight: 'bold'
  };

  const createdAtStyle = {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: '8px'
  };

  const buttonStyle = {
    marginRight: '8px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',
    color: '#fff'
  };

  const messageButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FFC107',
    color: '#fff'
  };

  const bidButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28A745',
    color: '#fff'
  };

  return (
    <div style={pageStyles}>
      <Navbar />
      <h1 style={headingStyle}>Browse Projects</h1>

      <div style={filterContainerStyle}>
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              ...filterButtonStyle,
              backgroundColor: filter === type ? '#0056b3' : '#007BFF'
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {filteredProjects.map(project => (
        <div key={project.id} style={projectCardStyle}>
          <h3 style={titleStyle}>{project.title}</h3>
          <p style={descriptionStyle}>{project.description}</p>
          <p style={budgetStyle}>Budget: {project.budget}</p>
          <p style={createdAtStyle}>Posted: {getDaysAgo(project.created_at)}</p>
          <div>
            <button style={viewButtonStyle}>View</button>
            <Link to={`/messages/${project.user_id}`}>
              <button style={messageButtonStyle}>Message Homeowner</button>
            </Link>
            <button style={bidButtonStyle}>Bid</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
