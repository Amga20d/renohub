import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { projects } from '../data/projects';
import { getDaysAgo } from '../helpers/utils';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <div style={{ padding: '20px' }}>
        <Navbar />
        <h2>Project not found</h2>
        <Link to="/projects">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      <h2>{project.title}</h2>
      <p><strong>Description:</strong> {project.description}</p>
      <p><strong>Type:</strong> {project.type}</p>
      <p><strong>Budget:</strong> {project.budget}</p>
      <p><strong>Posted:</strong> {getDaysAgo(project.created_at)}</p>
      <p><strong>Project ID:</strong> #{project.id}</p>

      <div style={{ marginTop: '20px' }}>
        <Link to={`/messages/${project.user_id}`}>
          <button style={{ marginRight: '10px', padding: '10px', backgroundColor: '#ffc107', border: 'none', color: '#fff', borderRadius: '4px' }}>
            Message Homeowner
          </button>
        </Link>
        <Link to={`/projects/${project.id}/bids`}>
          <button style={{ marginRight: '10px', padding: '10px', backgroundColor: '#28a745', border: 'none', color: '#fff', borderRadius: '4px' }}>
            Bid on Project
          </button>
        </Link>
        <Link to="/projects">
          <button style={{ padding: '10px', backgroundColor: '#6c757d', border: 'none', color: '#fff', borderRadius: '4px' }}>
            ← Back to Projects
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
