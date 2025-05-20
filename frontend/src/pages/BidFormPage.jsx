import React from "react";
import Button from 'react-bootstrap/Button';

const  BidFormPage = () => {
  return (
    <div>
      <h1>Bid Submission</h1>
      <form>
        <span>Please fill out the form below</span>
        <div>
          <label>Bid Amount</label>
          <input type="number" placeholder="Bid Amount" />
        </div>
        <div>
          <label>Notes</label>
          <input type="text" placeholder="Password" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BidFormPage;