import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  // Mock data for projects and bids
  const projects = [
    {
      id: 1,
      user_id: 'Alice Johnson', // client name
      title: 'Central Park House Renovation',
      type: 'roofing',
      address: '123 Maple Street, Springfield',
      status: 'Bidding',
      created_at: '2025-05-01',
    },
    {
      id: 2,
      user_id: 'Bob Smith',
      title: 'Downtown Apartment Remodel',
      type: 'drywall',
      address: '456 Oak Avenue, Metropolis',
      status: 'Bidding',
      created_at: '2025-04-28',
    },
    {
      id: 3,
      user_id: 'Carol White',
      title: 'Suburban House Siding Replacement',
      type: 'siding',
      address: '789 Pine Road, Smallville',
      status: 'Ongoing',
      created_at: '2025-03-15',
    },
    {
      id: 4,
      user_id: 'David Green',
      title: 'Urban Loft Roof Repair',
      type: 'roofing',
      address: '321 Elm Street, Gotham',
      status: 'Ongoing',
      created_at: '2025-02-20',
    },
    {
      id: 5,
      user_id: 'Eve Black',
      title: 'Countryside Home Siding Upgrade',
      type: 'siding',
      address: '654 Spruce Drive, Star City',
      status: 'Completed',
      created_at: '2024-11-10',
    },
  ];

  const bids = [
    // Bids for project 1 (Bidding)
    { id: 1, user_id: 'Contractor Joe', project_id: 1, amount: 5000, status: 'Sent', notes: 'Ready to start immediately.' },
    { id: 2, user_id: 'Contractor Anne', project_id: 1, amount: 4800, status: 'Sent', notes: 'Will provide additional warranty.' },
    { id: 3, user_id: 'Contractor Joe', project_id: 2, amount: 3000, status: 'Sent', notes: 'Includes cleanup after finish.' },
    { id: 4, user_id: 'Contractor Mike', project_id: 2, amount: 3200, status: 'Sent', notes: 'Experienced in drywall.' },
    // Bids for project 3 (Ongoing)
    { id: 5, user_id: 'Contractor Lisa', project_id: 3, amount: 4500, status: 'First Scope', notes: 'We will start this week.' },
    { id: 6, user_id: 'Contractor John', project_id: 3, amount: 4700, status: 'Rejected', notes: 'N/A' },
    // Bids for project 4 (Ongoing)
    { id: 7, user_id: 'Contractor Dave', project_id: 4, amount: 3800, status: 'Final Scope', notes: 'Experienced roofer.' },
    { id: 8, user_id: 'Contractor Kate', project_id: 4, amount: 4000, status: 'Rejected', notes: 'N/A' },
    // Bids for project 5 (Completed)
    { id: 9, user_id: 'Contractor Sam', project_id: 5, amount: 5200, status: 'Completed', notes: 'Project done successfully.' },
    { id: 10, user_id: 'Contractor Mark', project_id: 5, amount: 5300, status: 'Rejected', notes: 'N/A' },
  ];

  const [selectedTab, setSelectedTab] = useState('Bidding');

  // Helper function to get accepted bid for a project
  const getAcceptedBid = (projectId) => {
    return bids.find(
      (bid) =>
        bid.project_id === projectId &&
        (bid.status === 'Accepted' || bid.status === 'Not Started' || bid.status === 'First Scope' || bid.status === 'Final Scope' || bid.status === 'Pending Approval')
    );
  };

  // Progress mapping for statuses
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'Not Started':
        return 0;
      case 'First Scope':
        return 25;
      case 'Final Scope':
        return 50;
      case 'Pending Approval':
        return 75;
      case 'Completed':
        return 100;
      default:
        // If status is 'Accepted' or any other, treat as 0%
        return 0;
    }
  };

  // Filter projects by selected tab
  const filteredProjects = projects.filter((project) => project.status === selectedTab);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          onClick={() => setSelectedTab('Bidding')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: selectedTab === 'Bidding' ? '#007bff' : '#e0e0e0',
            color: selectedTab === 'Bidding' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Bidding
        </button>
        <button
          onClick={() => setSelectedTab('Ongoing')}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: selectedTab === 'Ongoing' ? '#007bff' : '#e0e0e0',
            color: selectedTab === 'Ongoing' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Ongoing
        </button>
        <button
          onClick={() => setSelectedTab('Completed')}
          style={{
            padding: '10px 20px',
            backgroundColor: selectedTab === 'Completed' ? '#007bff' : '#e0e0e0',
            color: selectedTab === 'Completed' ? '#fff' : '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Completed
        </button>
      </div>

      {/* Bidding Tab Content */}
      {selectedTab === 'Bidding' && (
        <div>
          {filteredProjects.map((project) => (
            <div key={project.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
              <h2 style={{ margin: '0 0 10px 0' }}>{project.title}</h2>
              <p style={{ margin: '5px 0' }}><strong>Client:</strong> {project.user_id}</p>
              <p style={{ margin: '5px 0' }}><strong>Type:</strong> {project.type}</p>
              <p style={{ margin: '5px 0' }}><strong>Address:</strong> {project.address}</p>
              <h4>Bids:</h4>
              {bids
                .filter((bid) => bid.project_id === project.id)
                .map((bid) => (
                  <div key={bid.id} style={{ marginLeft: '15px', marginBottom: '5px' }}>
                    <p style={{ margin: '2px 0' }}>
                      <strong>Contractor:</strong> {bid.user_id} | <strong>Cost:</strong> ${bid.amount} | <strong>Notes:</strong> {bid.notes}
                    </p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Ongoing Tab Content */}
      {selectedTab === 'Ongoing' && (
        <div>
          {filteredProjects.map((project) => {
            const acceptedBid = getAcceptedBid(project.id);
            const progressPercent = acceptedBid ? getProgressPercentage(acceptedBid.status) : 0;
            return (
              <div key={project.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>{project.title}</h2>
                {acceptedBid && (
                  <p style={{ margin: '5px 0' }}><strong>Contractor:</strong> {acceptedBid.user_id}</p>
                )}
                <p style={{ margin: '5px 0' }}><strong>Type:</strong> {project.type}</p>
                <p style={{ margin: '5px 0' }}><strong>Address:</strong> {project.address}</p>
                <div style={{ marginTop: '10px' }}>
                  <p style={{ margin: '5px 0' }}><strong>Progress:</strong></p>
                  <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: '#76c7c0',
                        height: '100%',
                        textAlign: 'center',
                        color: '#fff',
                        lineHeight: '20px',
                      }}
                    >
                      {progressPercent}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Completed Tab Content */}
      {selectedTab === 'Completed' && (
        <div>
          {filteredProjects.map((project) => {
            const completedBid = bids.find((bid) => bid.project_id === project.id && bid.status === 'Completed');
            return (
              <div key={project.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 10px 0' }}>{project.title}</h2>
                {completedBid && (
                  <p style={{ margin: '5px 0' }}><strong>Contractor:</strong> {completedBid.user_id}</p>
                )}
                <p style={{ margin: '5px 0' }}><strong>Type:</strong> {project.type}</p>
                <p style={{ margin: '5px 0' }}><strong>Address:</strong> {project.address}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
