import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

// Lazy-load all page components
const HomePage         = lazy(() => import("../pages/HomePage"));
const RegisterPage     = lazy(() => import("../pages/RegisterPage"));
const LoginPage        = lazy(() => import("../pages/LoginPage"));
const DashboardPage    = lazy(() => import("../pages/DashboardPage"));
const ProfilePage      = lazy(() => import("../pages/ProfilePage"));
const ProjectsPage     = lazy(() => import("../pages/ProjectsPage"));
const ProjectDetailsPage = lazy(() => import("../pages/ProjectDetailsPage"));
const NewProjectPage   = lazy(() => import("../pages/NewProjectPage"));
const BidPlacementPage = lazy(() => import("../pages/BidPlacementPage"));
const MyBidsPage       = lazy(() => import("../pages/MyBidsPage"));
const SubmitReviewPage = lazy(() => import("../pages/SubmitReviewPage"));
const MessagesPage     = lazy(() => import("../pages/MessagesPage"));
const ChatPage         = lazy(() => import("../pages/ChatPage"));
const PaymentsPage     = lazy(() => import("../pages/PaymentsPage"));
const InspectionsPage  = lazy(() => import("../pages/InspectionsPage"));
const AdminUsersPage   = lazy(() => import("../pages/AdminUsersPage"));
const AdminLogsPage    = lazy(() => import("../pages/AdminLogsPage"));
const NotFoundPage     = lazy(() => import("../pages/NotFoundPage"));

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* Suspense wraps lazy-loaded routes to show fallback while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes (no authentication required) */}
          <Route path="/"          element={<HomePage />} />
          <Route path="/register"  element={<RegisterPage />} />
          <Route path="/login"     element={<LoginPage />} />

          {/* Protected Routes for all authenticated users (All roles) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard"     element={<DashboardPage />} />
            <Route path="/projects"      element={<ProjectsPage />} />
            <Route path="/projects/:id"  element={<ProjectDetailsPage />} />
            <Route path="/messages"      element={<MessagesPage />} />
            <Route path="/messages/:id"  element={<ChatPage />} />
          </Route>

          {/* Protected Route - Profile (Normal users only, e.g. Homeowner or Contractor) */}
          <Route 
            path="/profile"
            element={
              <ProtectedRoute roles={["Homeowner", "Contractor"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes - Homeowner Only */}
          <Route element={<ProtectedRoute roles={["Homeowner"]} />}>
            <Route path="/projects/new"      element={<NewProjectPage />} />
            <Route path="/projects/:id/review" element={<SubmitReviewPage />} />
          </Route>

          {/* Protected Routes - Contractor Only */}
          <Route element={<ProtectedRoute roles={["Contractor"]} />}>
            <Route path="/projects/:id/bids" element={<BidPlacementPage />} />
            <Route path="/bids"              element={<MyBidsPage />} />
          </Route>

          {/* Protected Routes - Homeowner and Admin */}
          <Route element={<ProtectedRoute roles={["Homeowner", "Admin"]} />}>
            <Route path="/payments"    element={<PaymentsPage />} />
            <Route path="/inspections" element={<InspectionsPage />} />
          </Route>

          {/* Protected Routes - Admin Only */}
          <Route element={<ProtectedRoute roles={["Admin"]} />}>
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/logs"  element={<AdminLogsPage />} />
          </Route>

          {/* Fallback Route for undefined paths (404 Not Found) */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default AppRoutes;
