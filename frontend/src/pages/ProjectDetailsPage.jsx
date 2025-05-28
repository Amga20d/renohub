import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { getDaysAgo } from "../helpers/utils";
import "../styles/ProjectDetailsPage.scss";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/projects/${id}`)
      .then((res) => setProject(res.data.project))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  if (!project) {
    return (
      <div className="not-found">
        <Navbar />
        <h2>Project not found</h2>
        <Link to="/projects">← Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="details-body">
      <Navbar />
      <div className="details-card">
        <h1>{project.title}</h1>
        <div className="details-info">
          <ol>
            <li>
              <strong>Description: </strong>
              {project.description}
            </li>
            <li>
              <strong>Type: </strong>
              {project.type}
            </li>
            <li>
              <strong>Budget: </strong>
              {project.budget}
            </li>
            <li>
              <strong>Posted: </strong>
              {getDaysAgo(project.created_at)}
            </li>
            <li>
              <strong>Project ID: </strong>#{project.id}
            </li>
          </ol>
        </div>
        <div className="details-btns-group">
          <Link to={`/messages/${project.user_id}`}>
            <button className="details-btn">Message Homeowner</button>
          </Link>
          <Link to={`/projects/${project.id}/bids`}>
            <button className="details-btn">Bid on Project</button>
          </Link>
          <Link to="/projects">
            <button className="details-btn">← Back to Projects</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
