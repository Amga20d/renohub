import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { contractors } from '../data/contractors';
import '../styles/ContractorPage.scss'

const ContractorPage = () => {
  const [filter, setFilter] = useState('All');

  const roles = ['All', 'Roofing', 'Siding', 'Framing', 'Painting', 'Flooring', 'HVAC', 'Plumbing', 'Electrical'];

  const filteredContractors =
    filter === 'All'
      ? contractors
      : contractors.filter((contractor) => contractor.role === filter);

    const containerStyle = {
      padding: '20px',
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
      <Navbar />
      <h1>Contractors</h1>
      <div className='btn-tab'>
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            style={{
              ...buttonStyle,
              backgroundColor: filter === role ?  "rgb(179, 41, 17)" : "rgb(226, 91, 28)",
            }}
          >
            {role}
          </button>
        ))}
      </div>
      <div className='cards-container'>
        {filteredContractors.map((contractor) => (
        <div key={contractor.id} style={cardStyle}>
          <h3>{contractor.name}</h3>
          <p>Specialization: {contractor.role}</p>
          <Link to={`/messages/${contractor.id}`}>
            <button className='btn'>
              Message Contractor
            </button>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ContractorPage;
