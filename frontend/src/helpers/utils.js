export const getUserName = (userId, users) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : 'Unknown User';
  };
  
  export const getUserRole = (userId, users) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.role : null;
  };
  
  export const getBidsByProject = (bids, projectId) =>
    bids.filter((bid) => bid.project_id === projectId);
  
  export const getAcceptedBid = (bids, projectId) =>
    bids.find((bid) =>
      bid.project_id === projectId &&
      ['Accepted', 'Not Started', 'First Scope', 'Final Scope', 'Pending Approval'].includes(bid.status)
    );
  
  export const getProgressPercentage = (status) => {
    switch (status) {
      case 'Not Started': return 0;
      case 'First Scope': return 25;
      case 'Final Scope': return 50;
      case 'Pending Approval': return 75;
      case 'Completed': return 100;
      default: return 0;
    }
  };
  
  export const filterBidsForTab = (bids, tab) => {
    if (tab === 'Bidding') {
      return bids.filter(bid => bid.status === 'Sent');
    }
    if (tab === 'Ongoing' || tab === 'Completed') {
      return bids.filter(bid => bid.status !== 'Rejected');
    }
    return bids;
  };
  