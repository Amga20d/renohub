import React, { Profiler } from "react";
import Navbar from "../components/Navbar";
import "../styles/ProfilePage.scss";
import { getDaysAgo } from "../helpers/utils";

// Mock Data - Remove once connected
const profile = {
  name: "John Doe",
  email: "JohnD@email.com",
  phone_number: "555 777 855",
  role: "Homeowner",
  status: true,
  created_at: "2025-03-15 10:30:30",
};

const ProfilePage = (props) => {
  // const {
  //   name,
  //   email,
  //   phone_number,
  //   role,
  //  status,
  //   created_at
  // } = props; Uncomment when connected

  return (
    <div className="page">
      <Navbar />
      <h1>My Profile</h1>
      <div className="card-container">
        <h1><strong>Account Details</strong></h1>
        <div className="card-info">
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

{/* <table>
            <tr>
              <th>Name</th>
              <td>{profile.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{profile.email}</td>
            </tr>
            <tr>
              <th>Phone Number </th>
              <td>{profile.phone_number}</td>
            </tr>
            <tr>
              <th>Account Type</th>
              <th>{profile.role}</th>
            </tr>
            <tr>
              <th>Account Staus</th>
              <th>{profile.status === true ? 'Active' : 'Disabled'}</th>
            </tr>
            <tr>
              <th>Created</th>
              <th>{getDaysAgo(profile.created_at)}</th>
            </tr>
          </table> */}