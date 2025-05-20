import React from 'react';

function ProjectsPage() {
  // Inline style objects for various elements:
  const pageStyles = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
  };
  const headingStyle = {
    textAlign: 'center',
    marginBottom: '20px'
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
  const buttonStyle = {
    marginRight: '8px',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
  // Define specific styles for each button (different colors for variety):
  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#007BFF',  // blue
    color: '#fff'
  };
  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#FFC107',  // amber
    color: '#fff'
  };
  const bidButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#28A745',  // green
    color: '#fff'
  };

  // Mock data: list of project objects
  const projects = [
    {
      id: 1,
      title: 'Kitchen Remodel',
      description: 'Update kitchen cabinets and countertops.',
      budget: '$5,000'
    },
    {
      id: 2,
      title: 'Bathroom Upgrade',
      description: 'Install new shower and fixtures.',
      budget: '$3,000'
    },
    {
      id: 3,
      title: 'Basement Finishing',
      description: 'Finish the basement to add a recreation room.',
      budget: '$10,000'
    }
    // You can add more project objects here if needed
  ];

  return (
    <div style={pageStyles}>
      {/* Page Heading */}
      <h1 style={headingStyle}>Browse Projects</h1>

      {/* Render a card for each project */}
      {projects.map(project => (
        <div key={project.id} style={projectCardStyle}>
          <h3 style={titleStyle}>{project.title}</h3>
          <p style={descriptionStyle}>{project.description}</p>
          <p style={budgetStyle}>Budget: {project.budget}</p>
          {/* Action buttons (static for now) */}
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
