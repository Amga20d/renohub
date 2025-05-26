import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from 'axios';

const BidFormPage = () => {
  const { id } = useParams(); // from /projects/:id/bids

  const [formData, setFormData] = useState({
    project_id: id,
    amount: 0,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/bids', {
      ...formData,
      project_id: parseInt(id),
      user_id: 6 // mock contractor user
    })
    .then(res => console.log('Bid submitted:', res.data))
    .catch(err => console.error('Submission error:', err));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Submit a Bid</h1>
      <form onSubmit={handleSubmit}>
        <h3>Bid for Project #{id}</h3>
        <div>
          <label>Budget Proposal</label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
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
            />
          </FloatingLabel>
        </div>
        <Button type="submit" className="mt-3">Submit</Button>
      </form>
    </div>
  );
};

export default BidFormPage;
