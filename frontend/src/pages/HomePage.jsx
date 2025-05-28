import React from "react";
import { Link } from "react-router-dom";
import "../styles/HomePage.scss";

function HomePage() {
  return (
    <div className="home">
      <h1>
        Welcome to RenoHub <i class="fa-solid fa-house-chimney"></i>
      </h1>
      <h2>Connecting Dreams to Builders, and Builders to Projects</h2>
      {/* <p>Smart Connections. Competitive Bids. Better Renovations</p> */}
      <div className="home-intro">
        <p>
          At <strong>Renohub</strong>, we make renovating your home easier and
          more <strong>affordable </strong> by connecting you with the right
          contractors—<strong>quickly</strong> and <strong>seamlessly</strong>.
          Whether you're looking to transform a single room or renovate your
          entire home, we’re here to help you find the best professional for the
          job. Create an account to start today!
        </p>
      </div>

      <div>
        <Link to="/login" className="home-links-btn">
          Login
        </Link>
        <Link to="/register" className="home-links-btn">
          Register
        </Link>
      </div>
      <br />

      <h1>How It Works</h1>
      <div className="home-main">
        <div className="home-lists" id="list-left">
          <h3>Homeowners</h3>
          <ul >
            <li>
              <strong>Post Your Projects:</strong>
              <p>
                Create and post listings of your home renovation projects for
                contractors to view.
              </p>
            </li>
            <li>
              <strong>Receive Bids:</strong>
              <p>
                Get bids from contractors who are interested in your project.
              </p>
            </li>
            <li>
              <strong>Choose the Best Fit:</strong>
              <p>
                Review  the contractors bids and select the
                one that offers the best value for your needs.
              </p>
            </li>
          </ul>
        </div>
        <div>
          <h3>Contractors</h3>
          <ul>
            <li>
              <strong>Browse Projects:</strong>
              <p>
                Browse or filter new renovation projects to find ones match your
                expertise and place a bid.
              </p>
            </li>
            <li>
              <strong>Win the Job:</strong>
              <p>
                Once you're selected, you’ll work directly with the homeowner to
                bring their vision to life.
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="home-close">
          <p>
            Whether you’re a homeowner looking to hire or a contractor looking
            for your next job,
          </p>
          <p><strong>RenoHub</strong> is the place where
            quality work meets great opportunities.
          </p>
        </div>
    </div>
  );
}

export default HomePage;
