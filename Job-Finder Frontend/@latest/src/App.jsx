import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/login";
import Register from "./pages/Register";

import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import ApplyJob from "./pages/ApplyJob";
import MyApplications from "./pages/MyApplications";
import Profile from "./pages/Profile";

import RecruiterDashboard from "./pages/RecruiterDashboard";
import Company from "./pages/Company";
import EditCompany from "./pages/EditCompany";
import PostJob from "./pages/PostJob";
import ManageJobs from "./pages/ManageJobs";
import EditJob from "./pages/EditJob";
import ViewApplicants from "./pages/ViewApplicants";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* Candidate */}

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/apply/:id"
          element={<ApplyJob />}
        />

        <Route
          path="/my-applications"
          element={<MyApplications />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* Recruiter */}

        <Route
          path="/recruiter"
          element={<RecruiterDashboard />}
        />

        <Route
          path="/company"
          element={<Company />}
        />

        <Route
          path="/edit-company/:id"
          element={<EditCompany />}
        />

        <Route
          path="/post-job"
          element={<PostJob />}
        />

        <Route
          path="/manage-jobs"
          element={<ManageJobs />}
        />

        <Route
          path="/edit-job/:id"
          element={<EditJob />}
        />

        <Route
          path="/job-applicants/:id"
          element={<ViewApplicants />}
        />

      </Routes>

    </BrowserRouter>

  );
}

export default App;