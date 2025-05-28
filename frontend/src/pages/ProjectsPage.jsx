import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { getDaysAgo } from '../helpers/utils';
import { Link } from 'react-router-dom';
import "../styles/ProjectPage.scss";
import Card from "react-bootstrap/Card";

function ProjectsPage() {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('/api/projects')
      .then(res => setProjects(res.data.projects))
      .catch(err => console.error('Error loading projects:', err));
  }, []);

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

  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(project => project.type === filter);

  return (
    <div className="page-project">
      <Navbar />
      <h1>Browse Projects</h1>

      <div className="filter-container">
        {projectTypes.map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className="filter-btn"
            style={{
              backgroundColor:
                filter === type ? "rgb(179, 41, 17)" : "rgb(226, 91, 28)"
            }}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="cards-container-project">
        {filteredProjects.map((project) => (
          <Card className="card-project" key={project.id}>

            <Card.Body className="card-body-project">
              <Card.Title><h3>{project.title}</h3></Card.Title>
              <Card.Text className="card-text-project">
                <span>{project.description}</span>
              </Card.Text>
            </Card.Body>
            <div className="card-info-project">
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
                  <button className="btn">View</button>
                </Link>
                <Link to={`/projects/${project.id}/bids`}>
                  <button className="btn">Bid</button>
                </Link>
              </div>
              <Link to={`/messages/${project.user_id}`}>
                <button className="btn">Message</button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
