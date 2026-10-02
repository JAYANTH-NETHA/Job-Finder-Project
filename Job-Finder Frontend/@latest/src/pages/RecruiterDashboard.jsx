import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/RecruiterDashboard.css";

function RecruiterDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (String(user.user_role).trim().toUpperCase() !== "RECRUITER") {
      navigate("/home");
      return;
    }

    fetch("http://localhost:8080/jobs")
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      <h1 className="dashboard-title">Recruiter Dashboard</h1>
      <p className="dashboard-welcome">Welcome, {user?.user_name}</p>

      <h2 className="dashboard-section-title">Available Jobs</h2>

      {loading ? (
        <p className="dashboard-status">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="dashboard-status">No jobs found.</p>
      ) : (
        jobs.map((job) => (
          <div key={job.job_id} className="job-card">
            <h3>{job.job_title}</h3>
            <p>{job.job_location}</p>
            <p>{job.job_type}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RecruiterDashboard;