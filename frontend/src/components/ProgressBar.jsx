import React from 'react';
import ProgressBarBoot from 'react-bootstrap/ProgressBar';
const ProgressBar = ({ percent }) => (
  <div style={{ backgroundColor: '#e0e0e0', borderRadius: '4px', height: '20px', overflow: 'hidden' }}>
    <div style={{
      width: `${percent}%`,
      backgroundColor: '#76c7c0',
      height: '100%',
      textAlign: 'center',
      color: '#fff',
      lineHeight: '20px'
    }}>
      {percent}%
    </div>
  </div>
);

export default ProgressBar;
