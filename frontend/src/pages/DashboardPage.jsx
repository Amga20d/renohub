import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ProgressBar';
import BidList from '../components/BidList';
import {
  getAcceptedBid,
  getProgressPercentage,
  filterBidsForTab
} from '../helpers/utils';

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState('Bidding');
  const [bids, setBids] = useState([
    { id: 1, user_id: 6, project_id: 1, amount: 5000, status: 'Sent', notes: 'Ready to start' },
    { id: 2, user_id: 7, project_id: 1, amount: 4800, status: 'Sent', notes: 'Warranty included' },
    { id: 3, user_id: 6, project_id: 2, amount: 3000, status: 'Sent', notes: 'Cleanup included' },
    { id: 4, user_id: 8, project_id: 2, amount: 3200, status: 'Sent', notes: 'Expert in drywall' },
    { id: 5, user_id: 9, project_id: 3, amount: 4500, status: 'First Scope', notes: 'Starting soon' },
    { id: 6, user_id: 10, project_id: 3, amount: 4700, status: 'Rejected', notes: 'N/A' },
    { id: 7, user_id: 9, project_id: 4, amount: 3800, status: 'Final Scope', notes: 'Experienced' },
    { id: 8, user_id: 10, project_id: 4, amount: 4000, status: 'Rejected', notes: 'N/A' },
    { id: 9, user_id: 10, project_id: 5, amount: 5200, status: 'Completed', notes: 'Success' },
    { id: 10, user_id: 6, project_id: 5, amount: 5300, status: 'Rejected', notes: 'N/A' }
  ]);

  const users = [
    { id: 1, name: 'Alice Johnson', role: 'Homeowner' },
    { id: 2, name: 'Bob Smith', role: 'Homeowner' },
    { id: 3, name: 'Carol White', role: 'Homeowner' },
    { id: 4, name: 'David Green', role: 'Homeowner' },
    { id: 5, name: 'Eve Black', role: 'Homeowner' },
    { id: 6, name: 'Contractor Joe', role: 'Contractor' },
    { id: 7, name: 'Contractor Anne', role: 'Contractor' },
    { id: 8, name: 'Contractor Mike', role: 'Contractor' },
    { id: 9, name: 'Contractor Lisa', role: 'Contractor' },
    { id: 10, name: 'Contractor Sam', role: 'Contractor' }
  ];

  const projects = [
    { id: 1, user_id: 1, title: 'Central Park House Renovation', type: 'roofing', address: '123 Maple Street', status: 'Bidding' },
    { id: 2, user_id: 2, title: 'Downtown Apartment Remodel', type: 'drywall', address: '456 Oak Ave', status: 'Bidding' },
    { id: 3, user_id: 3, title: 'Suburban Siding Replacement', type: 'siding', address: '789 Pine Rd', status: 'Ongoing' },
    { id: 4, user_id: 4, title: 'Loft Roof Repair', type: 'roofing', address: '321 Elm St', status: 'Ongoing' },
    { id: 5, user_id: 5, title: 'Home Siding Upgrade', type: 'siding', address: '654 Spruce Dr', status: 'Completed' }
  ];

  const handleAcceptBid = (bidId, projectId) => {
    setBids(prev =>
      prev.map(b =>
        b.project_id === projectId
          ? { ...b, status: b.id === bidId ? 'Accepted' : 'Rejected' }
          : b
      )
    );
  };

  const filteredProjects = projects.filter(p => p.status === selectedTab);
  const filteredBids = filterBidsForTab(bids, selectedTab);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Navbar />
      <h1 style={{ textAlign: 'center' }}>Dashboard</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {['Bidding', 'Ongoing', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            style={{
              padding: '10px 20px',
              backgroundColor: selectedTab === tab ? '#007bff' : '#e0e0e0',
              color: selectedTab === tab ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {filteredProjects.map((project) => {
        const projectBids = filteredBids.filter(b => b.project_id === project.id);
        const acceptedBid = getAcceptedBid(bids, project.id);

        if (selectedTab === 'Ongoing') {
          const progress = acceptedBid ? getProgressPercentage(acceptedBid.status) : 0;
          return (
            <div key={project.id} style={{ marginBottom: '20px' }}>
              <ProjectCard project={project} bids={projectBids} users={users} />
              <p><strong>Progress:</strong></p>
              <ProgressBar percent={progress} />
            </div>
          );
        }

        return (
          <div key={project.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <ProjectCard project={project} bids={[]} users={users} />
            <h4>Bids:</h4>
            <BidList
              bids={projectBids}
              users={users}
              onAcceptBid={(bidId) => handleAcceptBid(bidId, project.id)}
              acceptedBidId={acceptedBid?.id}
              projectStatus={project.status}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DashboardPage;
