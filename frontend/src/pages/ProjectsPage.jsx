import React, { useState } from 'react';
import Navbar from '../components/Navbar';

function ProjectsPage() {
  const [filter, setFilter] = useState('All');

  const pageStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
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
  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FFC107',
    color: '#fff'
  };
  const bidButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28A745',
    color: '#fff'
  };

  const getDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  };

  const projects = [
    {
      id: 1,
      title: 'Kitchen Remodel',
      description: 'Update kitchen cabinets and countertops.',
      budget: '$5,000',
      type: 'Drywall',
      created_at: '2025-05-20T10:00:00Z'
    },
    {
      id: 2,
      title: 'Bathroom Upgrade',
      description: 'Install new shower and fixtures.',
      budget: '$3,000',
      type: 'Siding',
      created_at: '2025-05-15T14:30:00Z'
    },
    {
      id: 3,
      title: 'Basement Finishing',
      description: 'Finish the basement to add a recreation room.',
      budget: '$10,000',
      type: 'Roofing',
      created_at: '2025-05-10T09:15:00Z'
    },
    {
      id: 4,
      title: 'Attic Insulation',
      description: 'Improve energy efficiency with new insulation.',
      budget: '$2,500',
      type: 'Drywall',
      created_at: '2025-05-22T08:45:00Z'
    },
    {
      id: 5,
      title: 'Garage Siding Replacement',
      description: 'Replace old siding with modern materials.',
      budget: '$4,000',
      type: 'Siding',
      created_at: '2025-05-18T11:20:00Z'
    },
    {
      id: 6,
      title: 'Roof Leak Repair',
      description: 'Fix leaks and replace damaged shingles.',
      budget: '$1,800',
      type: 'Roofing',
      created_at: '2025-05-12T16:00:00Z'
    }
  ];

  const projectTypes = ['All', 'Roofing', 'Siding', 'Drywall'];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter);

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
            <button style={editButtonStyle}>Edit</button>
            <button style={bidButtonStyle}>Bid</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
