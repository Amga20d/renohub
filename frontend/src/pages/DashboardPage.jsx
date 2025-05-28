import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ProgressBar';
import BidList from '../components/BidList';
import '../styles/DashboardPage.scss'
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

  const handleAcceptBid = async (bidId, projectId) => {
    try {
      await axios.put(`/api/bids/${bidId}/accept`, {
        bidId,
        projectId
      });

      const [projectsRes, bidsRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/bids'),
      ]);
      setProjects(projectsRes.data.projects);
      setBids(bidsRes.data.bids);
    } catch (err) {
      console.error('Error accepting bid:', err);
      alert('Failed to accept bid.');
    }
  };

  const filteredProjects = projects.filter(p => p.status === selectedTab);
  const filteredBids = filterBidsForTab(bids, selectedTab);

  return (
    <div className='page'>
      <Navbar />
      <h1>Dashboard</h1>
      <div className='tab-btn-group'>
        {['Bidding', 'Ongoing', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className='tab-btn'
            style={{
              backgroundColor: selectedTab === tab ? "rgb(179, 41, 17)" : "rgb(226, 91, 28)"
            }}
          >
            {tab}
          </button>
        ))}
        <button className='tab-btn' onClick={() => navigate('/projects/new')}> + Create New Project</button>
      </div>

      {filteredProjects.map(project => {
        const projectBids = filteredBids.filter(b => b.project_id === project.id);
        const acceptedBid = getAcceptedBid(bids, project.id);

        if (selectedTab === 'Ongoing') {
          const progress = acceptedBid ? getProgressPercentage(acceptedBid.status) : 0;
          return (
            <div key={project.id} style={{ marginBottom: '20px' }}>
              <ProjectCard project={project} bids={projectBids} users={users}/>
              <p><strong>Progress:</strong></p>
              <ProgressBar percent={progress} />
            </div>
          );
        }

        return (
          <div className='main-container'>
            <div key={project.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
            <ProjectCard project={project} bids={[]} users={users} />
            <BidList
              bids={projectBids}
              users={users}
              onAcceptBid={(bidId) => handleAcceptBid(bidId, project.id)}
              acceptedBidId={acceptedBid?.id}
              projectStatus={project.status}
            />
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardPage;
