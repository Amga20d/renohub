import React from 'react';
import { getUserName, getBidsByProject } from '../helpers/utils';
import BidList from './BidList';

const ProjectCard = ({ project, bids, users }) => {
  const clientName = getUserName(project.user_id, users);
  const projectBids = getBidsByProject(bids, project.id);

  return (
    <div style={styles.card}>
      <h2>{project.title}</h2>
      <p><strong>Client:</strong> {clientName}</p>
      <p><strong>Type:</strong> {project.type}</p>
      <p><strong>Address:</strong> {project.address}</p>
      {projectBids.length > 0 && (
        <>
          <h4>Bids:</h4>
          <BidList bids={projectBids} users={users} />
        </>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '20px'
  }
};

export default ProjectCard;
