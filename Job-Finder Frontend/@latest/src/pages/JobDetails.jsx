import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8080/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="job-details-loading">
        <div className="job-details-spinner"></div>
        <h2>Loading job...</h2>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-loading">
        <h2>Job not found</h2>
        <button onClick={() => navigate("/home")}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-details-page">
      <main className="job-details-container">
        <button
          className="back-jobs-btn"
          onClick={() => navigate("/home")}
        >
          ← Back to Jobs
        </button>

        <article className="job-details-card">
          <div className="job-details-top">
            <div>
              <span className="job-details-label">
                JOB OPPORTUNITY
              </span>

              <h1>{job.job_title}</h1>
            </div>

            <span className="job-details-type">
              {job.job_type}
            </span>
          </div>

          <div className="job-details-meta">
            <div>
              <span>Location</span>
              <strong>{job.job_location}</strong>
            </div>

            <div>
              <span>Salary</span>
              <strong>{job.job_salary}</strong>
            </div>

            <div>
              <span>Experience</span>
              <strong>{job.job_experience}</strong>
            </div>
          </div>

          <div className="job-description">
            <h2>Job Description</h2>
            <p>{job.job_description}</p>
          </div>

          <button
            className="apply-now-btn"
            onClick={() =>
              navigate(`/apply/${job.job_id}`)
            }
          >
            Apply Now →
          </button>
        </article>
      </main>
    </div>
  );
}

export default JobDetails;