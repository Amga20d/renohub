import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";  // context providing auth state

const ProtectedRoute = ({ roles = [], children }) => {
  const { user } = useContext(AuthContext);  // Assume auth.user contains current user info

  // 1. Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Redirect if user's role is not in the allowed roles (if roles are specified)
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // 3. If authorized, render children or outlet (for nested routes)
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
