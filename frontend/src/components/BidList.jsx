import React from 'react';
import BidCard from './BidCard';

const BidList = ({ bids, users }) => {
  return (
    <>
      {bids.map((bid) => (
        <BidCard key={bid.id} bid={bid} users={users} />
      ))}
    </>
  );
};

export default BidList;
