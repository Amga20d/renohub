import React from "react";

const ProfilePage = () => {
return(
<div class="card">
  <div class="card-body">
    <h5 class="card-title">My Profile</h5>
    <h6 class="card-subtitle mb-2 text-muted">Account Details</h6>
    <table>
    <tr>
    <th>Name</th>
    <td>John Doe</td>
  </tr>
  <tr>
    <th>Email</th>
    <td>JohnD@email.com</td>
  </tr>
  <tr>
    <th>Phone Number</th>
    <td>555 77 855</td>
  </tr>
  <tr>
    <th>Role</th>
    <th>HomeOwner</th>
  </tr>
  <tr>
    <th>Account Staus</th>
    <th>Active</th>
  </tr>
  <tr>
    <th>Created</th>
    <th>2025 May 5</th>
  </tr>
    </table>
  </div>
</div>
)
}

export default ProfilePage;