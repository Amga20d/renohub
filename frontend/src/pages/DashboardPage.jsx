import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ProgressBar';
import BidList from '../components/BidList';
import {
  getAcceptedBid,
  getProgressPercentage,
  filterBidsForTab
} from '../helpers/utils';
import axios from 'axios';

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState('Bidding');
  const [projects, setProjects] = useState([]);
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, bidsRes, usersRes] = await Promise.all([
          axios.get('/api/projects'),
          axios.get('/api/bids'),
          axios.get('/api/users'),
        ]);
        setProjects(projectsRes.data.projects);
        setBids(bidsRes.data.bids);
        setUsers(usersRes.data.users);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      }
    };

    fetchData();
  }, []);

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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <button
          onClick={() => navigate('/projects/new')}
          style={{
            padding: '10px 15px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          + Create New Project
        </button>
      </div>

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
