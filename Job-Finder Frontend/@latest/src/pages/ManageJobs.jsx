import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/ManageJobs.css";

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/jobs/${jobId}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        setJobs((currentJobs) =>
          currentJobs.filter(
            (job) => job.job_id !== jobId
          )
        );

        alert("Job deleted successfully");
      } else {
        alert("Failed to delete job");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="manage-jobs-page">
      <Navbar />

      <main className="manage-jobs-container">

        <header className="manage-jobs-header">
          <div>
            <span className="manage-jobs-eyebrow">
              Recruiter Portal
            </span>

            <h1>Manage Jobs</h1>

            <p>
              View, update and manage the jobs you have posted.
            </p>
          </div>

          <button
            className="post-new-job-btn"
            onClick={() => navigate("/post-job")}
          >
            + Post New Job
          </button>
        </header>

        <div className="manage-jobs-toolbar">
          <span>
            {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Posted
          </span>

          <button
            className="dashboard-btn"
            onClick={() => navigate("/recruiter")}
          >
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="manage-jobs-list">
            {[1, 2, 3].map((item) => (
              <div
                className="manage-job-card skeleton-job"
                key={item}
              >
                <div className="skeleton-title"></div>
                <div className="skeleton-line"></div>
                <div className="skeleton-line short"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="manage-empty-state">
            <div className="empty-icon">+</div>

            <h2>No Jobs Posted Yet</h2>

            <p>
              Create your first job posting to start receiving
              applications from candidates.
            </p>

            <button
              className="post-new-job-btn"
              onClick={() => navigate("/post-job")}
            >
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="manage-jobs-list">
            {jobs.map((job) => (
              <article
                className="manage-job-card"
                key={job.job_id}
              >
                <div className="manage-job-info">

                  <div className="manage-job-title-row">
                    <div>
                      <span className="job-id">
                        JOB #{job.job_id}
                      </span>

                      <h2>{job.job_title}</h2>
                    </div>

                    <span className="job-type-badge">
                      {job.job_type}
                    </span>
                  </div>

                  <div className="manage-job-details">
                    <div>
                      <span className="detail-label">
                        Location
                      </span>
                      <strong>{job.job_location}</strong>
                    </div>

                    <div>
                      <span className="detail-label">
                        Salary
                      </span>
                      <strong>{job.job_salary}</strong>
                    </div>

                    <div>
                      <span className="detail-label">
                        Experience
                      </span>
                      <strong>{job.job_experience}</strong>
                    </div>
                  </div>

                </div>

                <div className="manage-job-actions">
                  <button
                    className="view-applicants-btn"
                    onClick={() =>
                      navigate(
                        `/job-applicants/${job.job_id}`
                      )
                    }
                  >
                    View Applicants
                  </button>

                  <button
                    className="edit-job-btn"
                    onClick={() =>
                      navigate(
                        `/edit-job/${job.job_id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-job-btn"
                    onClick={() =>
                      handleDelete(job.job_id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}

export default ManageJobs;