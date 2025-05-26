import React, { useState } from "react";
import "../styles/ProjectPage.scss";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Navbar from "../components/Navbar";

function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const pageStyles = {
    maxWidth: "90%",
    margin: "0 auto",
    marginTop:'4%',
    padding: "10px",
  };
  const headingStyle = {
    textAlign: "center",
    marginBottom: "20px",
  };
  const filterContainerStyle = {
    marginBottom: "20px",
    textAlign: "center",
  };
  const filterButtonStyle = {
    margin: "0 5px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    backgroundColor: "#007BFF",
    color: "#fff",
  };
  const projectCardStyle = {
    width: "30%",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#f9f9f9",
  };
  const titleStyle = {
    margin: "0 0 8px 0",
  };
  const descriptionStyle = {
    margin: "8px 0",
  };
  const budgetStyle = {
    fontWeight: "bold",
  };
  const createdAtStyle = {
    fontStyle: "italic",
    color: "#555",
    marginBottom: "8px",
  };
  const buttonStyle = {
    marginRight: "8px",
    padding: "8px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };
  const viewButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#007BFF",
    color: "#fff",
  };
  const editButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#FFC107",
    color: "#fff",
  };
  const bidButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#28A745",
    color: "#fff",
  };

  const getDaysAgo = (dateString) => {
    const createdDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - createdDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  };

  const projects = [
    {
      id: 1,
      title: "Kitchen Remodel",
      description: "Update kitchen cabinets and countertops.",
      budget: "$5,000",
      type: "Drywall",
      created_at: "2025-05-20T10:00:00Z",
    },
    {
      id: 2,
      title: "Bathroom Upgrade",
      description: "Install new shower and fixtures.",
      budget: "$3,000",
      type: "Siding",
      created_at: "2025-05-15T14:30:00Z",
    },
    {
      id: 3,
      title: "Basement Finishing",
      description: "Finish the basement to add a recreation room.",
      budget: "$10,000",
      type: "Roofing",
      created_at: "2025-05-10T09:15:00Z",
    },
    {
      id: 4,
      title: "Attic Insulation",
      description: "Improve energy efficiency with new insulation.",
      budget: "$2,500",
      type: "Drywall",
      created_at: "2025-05-22T08:45:00Z",
    },
    {
      id: 5,
      title: "Garage Siding Replacement",
      description: "Replace old siding with modern materials.",
      budget: "$4,000",
      type: "Siding",
      created_at: "2025-05-18T11:20:00Z",
    },
    {
      id: 6,
      title: "Roof Leak Repair",
      description: "Fix leaks and replace damaged shingles.",
      budget: "$1,800",
      type: "Roofing",
      created_at: "2025-05-12T16:00:00Z",
    },
    {
      id: 7,
      title: "Kitchen Remodel",
      description: "Update kitchen cabinets and countertops.",
      budget: "$5,000",
      type: "Drywall",
      created_at: "2025-05-20T10:00:00Z",
    },
    {
      id: 8,
      title: "Kitchen Remodel",
      description: "Update kitchen cabinets and countertops.",
      budget: "$5,000",
      type: "Drywall",
      created_at: "2025-05-20T10:00:00Z",
    },
    {
      id: 9,
      title: "Kitchen Remodel",
      description: "Update kitchen cabinets and countertops.",
      budget: "$5,000",
      type: "Drywall",
      created_at: "2025-05-20T10:00:00Z",
    },
  ];

  const projectTypes = ["All", "Roofing", "Siding", "Drywall"];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  return (
    <div style={pageStyles}>
      <Navbar />
      <h1 style={headingStyle}>Browse Projects</h1>

      <div style={filterContainerStyle}>
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              ...filterButtonStyle,
              backgroundColor: filter === type ? "rgb(179, 41, 17)" : "rgb(226, 91, 28)",
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="container">
        {filteredProjects.map((project) => (
          <Card style={projectCardStyle} key={project.id}>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVg0ALmeHYkiOh8LiA1oJrJM9B6mXhtPBIeg&s"
            />
            <Card.Body className="card-body">
              <Card.Title>{project.title}</Card.Title>
              <Card.Text className="card-text">
                <p>{project.description}</p>
              </Card.Text>
            </Card.Body>
            <div className="card-info">
              <span>
                  <strong>Budget: </strong> 
                  {project.budget}
                </span>
                <span>
                  <strong>Posted: </strong>
                  {getDaysAgo(project.created_at)}
                </span>
            </div>
            <div className="card-btn-group">
                <button className='card-btn'>View</button>
                <button className='card-btn'>Edit</button>
                <button className='card-btn'>Bid</button>
              </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
