import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/ManageJobs.css";

function ManageJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
        alert("Job deleted successfully");

        setJobs(
          jobs.filter(
            (job) => job.job_id !== jobId
          )
        );
      } else {
        const data = await response.json();

        alert(
          data.message ||
          "Failed to delete job"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  if (loading) {
    return (
      <div className="manage-loading">
        <div className="manage-spinner"></div>
        <h2>Loading jobs...</h2>
      </div>
    );
  }

  return (
    <div className="manage-page">
      <main className="manage-container">
        <div className="manage-header">
          <div>
            <span>RECRUITER PANEL</span>
            <h1>Manage Jobs</h1>
            <p>
              Review, edit and manage your job postings.
            </p>
          </div>

          <button
            className="manage-back-btn"
            onClick={() =>
              navigate("/recruiter")
            }
          >
            ← Dashboard
          </button>
        </div>

        {jobs.length === 0 ? (
          <div className="manage-empty">
            <h2>No jobs found</h2>
            <p>
              You haven't posted any jobs yet.
            </p>

            <button
              onClick={() =>
                navigate("/post-job")
              }
            >
              Post New Job
            </button>
          </div>
        ) : (
          <div className="manage-jobs-grid">
            {jobs.map((job) => (
              <article
                className="manage-job-card"
                key={job.job_id}
              >
                <div className="manage-job-header">
                  <div>
                    <span className="manage-job-id">
                      JOB #{job.job_id}
                    </span>

                    <h2>{job.job_title}</h2>
                  </div>

                  <span className="manage-job-type">
                    {job.job_type}
                  </span>
                </div>

                <div className="manage-job-info">
                  <p>
                    <strong>Location</strong>
                    {job.job_location}
                  </p>

                  <p>
                    <strong>Salary</strong>
                    {job.job_salary}
                  </p>

                  <p>
                    <strong>Experience</strong>
                    {job.job_experience}
                  </p>
                </div>

                <div className="manage-job-actions">
                  <button
                    className="manage-edit-btn"
                    onClick={() =>
                      navigate(
                        `/edit-job/${job.job_id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="manage-delete-btn"
                    onClick={() =>
                      handleDelete(job.job_id)
                    }
                  >
                    Delete
                  </button>

                  <button
                    className="manage-applicants-btn"
                    onClick={() =>
                      navigate(
                        `/job-applicants/${job.job_id}`
                      )
                    }
                  >
                    Applicants
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