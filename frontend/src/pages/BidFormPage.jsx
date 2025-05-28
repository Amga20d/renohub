import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/BidFormPage.scss";

const BidFormPage = () => {
  const { id } = useParams(); // project ID from URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("You must be logged in to submit a bid.");
      return;
    }

    const bidData = {
      project_id: parseInt(id),
      user_id: user.id,
      amount: parseFloat(formData.amount),
      notes: formData.notes,
      status: "Sent", // ✅ use a valid string status
      created_at: new Date(),
    };

    try {
      const res = await axios.post("/api/bids", bidData);
      alert("Bid submitted!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Bid submission error:", err.response?.data || err);
      alert("Error submitting bid");
    }
  };

  return (
    <div className="bid-body">
      <Navbar />
      <form className="bid-form" onSubmit={handleSubmit}>
        <h1>Submit a Bid</h1>
        <h2>Project ID: {id}</h2>
        <div className="bid-form-inputs">
          <div className="bid-form-input-fields">
            <label>Budget Proposal: </label>
            <input
              type="number"
              name="amount"
              placeholder="Bid Amount"
              value={formData.amount}
              onChange={handleChange}
              className="input-area"
              required
            />
          </div>
          <div className="bid-form-input-fields bid-text">
            <label>Addtional Notes: </label>
            <textarea
              as="textarea"
              name="notes"
              placeholder="Extra details for Homeowner"
              value={formData.notes}
              onChange={handleChange}
              className="input-area bid text"
              required
            />
          </div>
          <div className="bid-btn-group">
            <button type="submit" className="bid-form-btn">
              Submit
            </button>
            <button onClick={() => navigate("/projects")} className="bid-form-btn">
              ←Back
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BidFormPage;
{
  /* <div>
          <label>Budget Proposal</label>
          <InputGroup >
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
        <Button type="submit" className="mt-3">Submit Bid</Button> */
}
