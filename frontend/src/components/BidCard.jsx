import React from 'react';
import { getUserName } from '../helpers/utils';

const BidCard = ({ bid, users }) => {
  const contractor = getUserName(bid.user_id, users);

  return (
    <div style={{ marginLeft: '15px', marginBottom: '5px' }}>
      <p>
        <strong>Contractor:</strong> {contractor} | 
        <strong> Cost:</strong> ${bid.amount} | 
        <strong> Notes:</strong> {bid.notes}
      </p>
    </div>
  );
};

export default BidCard;
