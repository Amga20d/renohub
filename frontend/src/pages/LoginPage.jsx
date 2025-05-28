import React from "react";
import '../styles/LoginPage.scss'
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
  <div className="login-body">
      <div>
        <Link to="/" className="btn-back">Back</Link>
      </div>
      <form className="form">
        <h1>Login</h1>
        <div className="form-inputs">
          <div className="form-input-fields">
            <label>email: </label>
            <input type="email" />
          </div>
          <div className="form-input-fields">
            <label>Password: </label>
            <input type="password" />
          </div>
          <button type="submit" className="form-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;


//     <div>
//       <h1>Login</h1>
//       <form>
//         <div>
//           <label>Email:</label>
//           <input type="email" placeholder="Email" />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input type="password" placeholder="Password" />
//         </div>
//         <button type="submit">Sign In</button>
//       </form>
//     </div>
//   );
// };
