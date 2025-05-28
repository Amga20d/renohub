import React, { Profiler } from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "../styles/ProfilePage.scss";
import { getDaysAgo } from "../helpers/utils";
import { useParams} from "react-router-dom";

// Mock Data - Remove once connected


const ProfilePage = (props) => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/users/${id}`)
      .then((res) => setProfile(res.data.user))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  return (
    <div className="page-profile">
      <Navbar />
      <h1>My Profile</h1>
      <div className="card-container-profile">
        <h1><strong>Account Details</strong></h1>
        <div className="card-info-profile">
          <ol>
            <li><strong>Name: </strong>{profile.name}</li>
            <li><strong>Email: </strong>{profile.email}</li>
            <li><strong>Phone number: </strong>{profile.phone_number}</li>
            <li><strong>Account Type: </strong>{profile.role}</li>
            <li><strong>Account Status: </strong>{profile.status === true ? 'Active' : 'Disabled'}</li>
            <li><strong>Created: </strong>{getDaysAgo(profile.created_at)}</li>
          </ol>
          
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
