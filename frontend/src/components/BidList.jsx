import React from 'react';
import BidCard from './BidCard';

const BidList = ({ bids, users, onAcceptBid, acceptedBidId }) => {
  return (
    <>
      {bids.map((bid) => (
        <BidCard
          key={bid.id}
          bid={bid}
          users={users}
          onAccept={onAcceptBid}
          isAccepted={bid.id === acceptedBidId}
        />
      ))}
    </>
  );
};

export default BidList;
