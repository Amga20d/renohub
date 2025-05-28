import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import '../styles/NewProject.scss'

const NewProjectPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const projectTypes = [
    "Roofing",
    "Siding",
    "Framing",
    "Painting",
    "Flooring",
    "HVAC",
    "Plumbing",
    "Electrical",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("You must be logged in.");
      return;
    }

    const project = {
      user_id: user.id,
      title,
      description,
      budget,
      address,
      type,
      status: "Bidding",
      created_at: new Date(),
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (res.ok) {
        navigate("/dashboard");
      } else {
        const data = await res.json();
        alert(data.message || "Error creating project");
      }
    } catch (err) {
      console.error("Create project error:", err);
    }
  };

  return (
    <div className="project-body">
      <Navbar />
      <form onSubmit={handleSubmit} className="project-form">
        <h1>Create New Project</h1>
        <div className="project-form-inputs">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="project-form-input-fields"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="project-form-input-fields input-text"
            required
          />
          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="project-form-input-fields"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="project-form-input-fields"
            required
          />
            <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="project-form-drop-list"
            required
          >
            <option value="" disabled>
              Select Project Type
            </option>
            {projectTypes.map((pt) => (
              <option key={pt} value={pt}>
                {pt}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="project-form-btn"> Submit Project</button>
      </form>
    </div>
  );
};

export default NewProjectPage;
