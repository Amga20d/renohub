import React from 'react';
import Navbar from '../components/Navbar';


const DashboardPage = () => {
  const projects = [
    {
      id: 1,
      title: "Renovate Kitchen",
      contractor: "John Doe",
      status: "In Progress",
      timeline: [
        "2024-05-01: Initial assessment",
        "2024-05-10: Demolition started",
        "2024-05-15: Electrical work underway"
      ]
    },
    {
      id: 2,
      title: "Bathroom Remodel",
      contractor: "Jane Smith",
      status: "Planning",
      timeline: [
        "2024-06-01: Site inspection",
        "2024-06-03: Permit applied"
      ]
    },
    {
      id: 3,
      title: "Deck Addition",
      contractor: "Bob Builder",
      status: "Awaiting Approval",
      timeline: [
        "2024-05-20: Design finalized",
        "2024-05-22: Material order placed"
      ]
    },
    {
      id: 4,
      title: "Roof Repair",
      contractor: "Alice Carpenter",
      status: "Completed",
      timeline: [
        "2024-04-15: Repair started",
        "2024-04-20: Repair completed"
      ]
    }
  ];

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '100vh'
  };
  const cardStyle = {
    backgroundColor: '#ffffff',
    padding: '15px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <h1 style={{ marginBottom: '20px' }}>Ongoing Projects</h1>
      {projects.map((project) => (
        <div key={project.id} style={cardStyle}>
          <h2 style={{ marginBottom: '10px' }}>{project.title}</h2>
          <p><strong>Contractor:</strong> {project.contractor}</p>
          <p><strong>Status:</strong> {project.status}</p>
          <div>
            <strong>Timeline:</strong>
            <ul style={{ paddingLeft: '20px', marginTop: '5px' }}>
              {project.timeline.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardPage;
