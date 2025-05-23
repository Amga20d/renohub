import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BidFormPage = () => {
  const [formData, setFormData] = useState({
    amount:0,
    notes: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData(prevState => ({...prevState, [name]:value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/bids', formData)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
  }
  return (
    <div>
      <h1>Bid Submission</h1>
      <form onSubmit={handleSubmit}>
        <h3>Bid form</h3>
        <div>
          <label>Budget Proposal for Client</label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control 
            aria-label="Amount (to the nearest dollar)"
            placeholder=""
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            />
            <InputGroup.Text>.00</InputGroup.Text>
          </InputGroup>
        </div>
        <div>
          <label>Notes</label>
          <FloatingLabel controlId="floatingTextarea2" label="Extra notes for client">
            <Form.Control
              as="textarea"
              placeholder=""
              name="notes"
              type="text"
              value={formData.notes}
              onChange={handleChange}
              style={{ height: "100px" }}
            />
          </FloatingLabel>
        </div>
        <Button as="input" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default BidFormPage;
