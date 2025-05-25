import React, { useState } from 'react';

const ContractorPage = () => {
  const [filter, setFilter] = useState('All');

  const contractors = [
    { id: 1, name: 'John Roofing Co.', role: 'Roofing' },
    { id: 2, name: 'Skyline Siding Ltd.', role: 'Siding' },
    { id: 3, name: 'Elite Drywall Inc.', role: 'Drywall' },
    { id: 4, name: 'Universal Roofing', role: 'Roofing' },
    { id: 5, name: 'Precision Siding', role: 'Siding' },
    { id: 6, name: 'Pro Drywall Solutions', role: 'Drywall' },
  ];

  const roles = ['All', 'Roofing', 'Siding', 'Drywall'];

  const filteredContractors =
    filter === 'All'
      ? contractors
      : contractors.filter((contractor) => contractor.role === filter);

  const containerStyle = {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const filterStyle = {
    marginBottom: '20px',
  };

  const buttonStyle = {
    marginRight: '10px',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#3498db',
    color: '#fff',
    cursor: 'pointer',
  };

  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '15px',
    marginBottom: '10px',
    backgroundColor: '#f9f9f9',
  };

  return (
    <div style={containerStyle}>
      <h2>Contractors</h2>
      <div style={filterStyle}>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            style={{
              ...buttonStyle,
              backgroundColor: filter === role ? '#2980b9' : '#3498db',
            }}
          >
            {role}
          </button>
        ))}
      </div>
      {filteredContractors.map((contractor) => (
        <div key={contractor.id} style={cardStyle}>
          <h3>{contractor.name}</h3>
          <p>Specialization: {contractor.role}</p>
        </div>
      ))}
    </div>
  );
};

export default ContractorPage;
