import React, { useState, useEffect, useMemo } from 'react';
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
  const [statusUpdate, setStatusUpdate] = useState({});

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

  const handleStatusChange = (bidId, value) => {
    setStatusUpdate(prev => ({ ...prev, [bidId]: value }));
  };

  const confirmStatusChange = async (bid, projectId) => {
    try {
      const newStatus = statusUpdate[bid.id];
      if (!newStatus) return;

      console.log('Confirming status change for bid:', bid.id);
      console.log('New status value:', newStatus);

      await axios.put(`/api/bids/${bid.id}`, {
        user_id: bid.user_id,
        amount: bid.amount,
        notes: bid.notes,
        status: newStatus
      });

      if (newStatus.toLowerCase() === 'completed') {
        console.log('Project marked as completed due to bid completion');
        await axios.put(`/api/projects/${projectId}`, { status: 'Completed' })
          .catch(err => console.error('Project status update failed:', err));
      }

      const [projectsRes, bidsRes] = await Promise.all([
        axios.get('/api/projects'),
        axios.get('/api/bids'),
      ]);
      setProjects(projectsRes.data.projects);
      setBids(bidsRes.data.bids);

      if (newStatus.toLowerCase() === 'completed') {
        setSelectedTab('Completed');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const filteredProjects = useMemo(() => (
    projects.filter(p => p.status === selectedTab)
  ), [projects, selectedTab]);

  const filteredBids = filterBidsForTab(bids, selectedTab);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0' }}>
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <button onClick={() => navigate('/projects/new')} style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+ Create New Project</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
        {['Bidding', 'Ongoing', 'Completed'].map(tab => (
          <button key={tab} onClick={() => setSelectedTab(tab)} style={{ padding: '10px 20px', backgroundColor: selectedTab === tab ? '#007bff' : '#e0e0e0', color: selectedTab === tab ? '#fff' : '#000', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{tab}</button>
        ))}
      </div>

      {filteredProjects.map(project => {
        const projectBids = filteredBids.filter(b => b.project_id === project.id);
        const acceptedBid = getAcceptedBid(bids, project.id);

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
            {project.status === 'Ongoing' && acceptedBid && (
              <div style={{ marginTop: '10px' }}>
                <label>
                  Update Status:
                  <select
                    value={statusUpdate[acceptedBid.id] || acceptedBid.status}
                    onChange={(e) => handleStatusChange(acceptedBid.id, e.target.value)}
                    style={{ marginLeft: '10px' }}
                  >
                    <option>Not Started</option>
                    <option>First Scope</option>
                    <option>Final Scope</option>
                    <option>Awaiting Approval</option>
                    <option>Completed</option>
                  </select>
                </label>
                <button
                  onClick={() => confirmStatusChange(acceptedBid, project.id)}
                  style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}
                >
                  Confirm
                </button>
              </div>
            )}
            {project.status === 'Ongoing' && acceptedBid && (
              <>
                <p><strong>Progress:</strong></p>
                <ProgressBar percent={getProgressPercentage(acceptedBid.status)} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardPage;
