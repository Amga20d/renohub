import React from 'react';
import { getUserName } from '../helpers/utils';
import { Link } from 'react-router-dom';

const BidCard = ({ bid, users, onAccept, isAccepted, projectStatus }) => {
  const contractor = getUserName(bid.user_id, users);

  return (
    <div style={{ marginLeft: '15px', marginBottom: '10px' }}>
      <p>
        <strong>Contractor:</strong> {contractor} |
        <strong> Cost:</strong> ${bid.amount} |
        <strong> Notes:</strong> {bid.notes}
        {projectStatus !== 'Bidding' && (
          <>
            | <strong> Status:</strong> {bid.status}
          </>
        )}
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to={`/messages/${bid.user_id}`}>
          <button>Message Contractor</button>
        </Link>

        {bid.status === 'Sent' && projectStatus === 'Bidding' && (
          <button onClick={() => onAccept(bid.id)}>Accept Bid</button>
        )}

        {isAccepted && (
          <span style={{ color: 'green', marginLeft: '10px' }}>✓ Accepted</span>
        )}

        {bid.status === 'Completed' && projectStatus === 'Completed' && (
          <Link to={`/pay/${bid.id}`} target="_blank" rel="noopener noreferrer">
            <button style={{ backgroundColor: '#28a745', color: '#fff' }}>
              Pay Now
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default BidCard;
