import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import Navbar from '../components/Navbar';

const BidFormPage = () => {
  const { id } = useParams(); // project ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      alert('You must be logged in to submit a bid.');
      return;
    }

    const bidData = {
      project_id: parseInt(id),
      user_id: user.id,
      amount: parseFloat(formData.amount),
      notes: formData.notes,
      status: 'Sent', // ✅ use a valid string status
      created_at: new Date()
    };

    try {
      const res = await axios.post('/api/bids', bidData);
      alert('Bid submitted!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Bid submission error:', err.response?.data || err);
      alert('Error submitting bid');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <Navbar />
      <h1>Submit a Bid</h1>
      <form onSubmit={handleSubmit}>
        <h3>Project ID: {id}</h3>
        <div>
          <label>Budget Proposal</label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </div>
        <div>
          <label>Notes</label>
          <FloatingLabel controlId="floatingTextarea2" label="Additional Notes">
            <Form.Control
              as="textarea"
              name="notes"
              style={{ height: "100px" }}
              value={formData.notes}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
        </div>
        <Button type="submit" className="mt-3">Submit Bid</Button>
      </form>
    </div>
  );
};

export default BidFormPage;
