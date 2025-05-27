import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { getDaysAgo } from '../helpers/utils';
import { Link } from 'react-router-dom';

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data.projects))
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  const projectTypes = [
    'All', 'Roofing', 'Siding', 'Framing', 'Painting',
    'Flooring', 'HVAC', 'Plumbing', 'Electrical'
  ];

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Browse Projects</h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        {projectTypes.map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              marginRight: '8px',
              padding: '8px 12px',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: filter === type ? '#0056b3' : '#007BFF',
              color: '#fff',
              cursor: 'pointer'
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
              <button style={{ backgroundColor: '#007BFF', color: '#fff', marginRight: '8px' }}>View</button>
            </Link>
            <Link to={`/messages/${project.user_id}`}>
              <button style={{ backgroundColor: '#FFC107', color: '#fff', marginRight: '8px' }}>Message Homeowner</button>
            </Link>
            <Link to={`/projects/${project.id}/bids`}>
              <button style={{ backgroundColor: '#28A745', color: '#fff' }}>Bid</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProjectsPage;
