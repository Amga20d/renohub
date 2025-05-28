import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/PaymentsPage.scss";

const generateTransactionId = () => {
  return Math.random().toString(36).substring(2, 12).toUpperCase();
};

const PaymentPage = () => {
  const { bidId } = useParams();
  const [amount, setAmount] = useState(0);
  const [form, setForm] = useState({ name: "", card: "", expiry: "", cvv: "" });
  const [paid, setPaid] = useState(false);
  const [txnId, setTxnId] = useState("");

  useEffect(() => {
    const fetchBid = async () => {
      try {
        const res = await axios.get(`/api/bids/${bidId}`);
        setAmount(res.data.bid.amount);
      } catch (err) {
        console.error("Failed to load bid data:", err);
      }
    };

    fetchBid();
  }, [bidId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTxnId(generateTransactionId());
    setPaid(true);
  };

  return (
    <div className="pay-body">
      <h1>Secure Payment</h1>
      <p>Paying for Bid #{bidId}</p>
      <p>
        <strong>Amount:</strong> ${amount}
      </p>

      {!paid ? (
        <form className="pay-form" onSubmit={handleSubmit}>
          <div className="pay-inputs">
            <label>Name on Card:</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="pay-input-field"
              required
            />
            <br />

            <label>Card Number:</label>
            <input
              type="text"
              name="card"
              value={form.card}
              onChange={handleChange}
               className="pay-input-field"
              required
            />


            <label>Expiry:</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              className="pay-input-field"
              required
            />


            <label>CVV:</label>
            <input
              type="text"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              className="pay-input-field"
              required
            />

            <button className="pay-btn" type="submit">Submit Payment</button>
          </div>
        </form>
      ) : (
        <div>
          <h3>Payment Successful!</h3>
          <p>
            Transaction ID: <strong>{txnId}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
