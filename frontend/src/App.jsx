import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy-loaded page components
const HomePage = lazy(() => import("./pages/HomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
// const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
// const ProjectDetailsPage = lazy(() => import("./pages/ProjectDetailsPage"));
// const NewProjectPage = lazy(() => import("./pages/NewProjectPage"));
// const BidPlacementPage = lazy(() => import("./pages/BidPlacementPage"));
// const MyBidsPage = lazy(() => import("./pages/MyBidsPage"));
// const SubmitReviewPage = lazy(() => import("./pages/SubmitReviewPage"));
const MessagesPage = lazy(() => import("./pages/MessagesPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
// const PaymentsPage = lazy(() => import("./pages/PaymentsPage"));
// const InspectionsPage = lazy(() => import("./pages/InspectionsPage"));
// const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
// const AdminLogsPage = lazy(() => import("./pages/AdminLogsPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/projects/:id/bids" element={<BidPlacementPage />} />
          <Route path="/projects/:id/review" element={<SubmitReviewPage />} />
          <Route path="/bids" element={<MyBidsPage />} /> */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:id" element={<ChatPage />} />
          {/* <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/inspections" element={<InspectionsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
