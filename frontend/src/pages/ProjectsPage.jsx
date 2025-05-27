import React, { useState } from "react";
import "../styles/ProjectPage.scss";
import Card from "react-bootstrap/Card";
import Navbar from "../components/Navbar";
import { projects } from "../data/projects";
import { getDaysAgo } from "../helpers/utils";
import { Link } from "react-router-dom";

function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const projectTypes = [
    "All",
    "Roofing",
    "Siding",
    "Framing",
    "Painting",
    "Flooring",
    "HVAC",
    "Plumbing",
    "Electrical",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.type === filter);

  return (
    <div className="page">
      <Navbar />
      <h1>Browse Projects</h1>

      <div className="filter-container">
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="btn"
            style={{
              backgroundColor:
                filter === type ? "rgb(179, 41, 17)" : "rgb(226, 91, 28)",
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="cards-container">
        {filteredProjects.map((project) => (
          <Card className="card" key={project.id}>
            <Card.Img
              variant="top"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVg0ALmeHYkiOh8LiA1oJrJM9B6mXhtPBIeg&s"
            />
            <Card.Body className="card-body">
              <Card.Title><h3>{project.title}</h3></Card.Title>
              <Card.Text className="card-text">
                <span>{project.description}</span>
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
              <div>
                <Link to={`/projects/${project.id}`}>
                  <button className="card-btn">View</button>
                </Link>
                <Link to={`/projects/${project.id}/bids`}>
                  <button className="card-btn">Bid</button>
                </Link>
              </div>
              <Link to={`/messages/${project.user_id}`}>
                <button className="card-btn">Message</button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
