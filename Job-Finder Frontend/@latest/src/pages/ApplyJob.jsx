import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "../components/ApplyJob.css";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resume, setResume] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      navigate("/");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: Number(user.user_id),
            job_id: Number(id),
            application_resume: resume,
            application_applied_on: new Date()
              .toISOString()
              .split("T")[0],
            application_status: "APPLIED"
          })
        }
      );

      const data = await response.json();

      console.log("Application response:", data);

      if (response.ok) {
        alert("Application submitted successfully");
        navigate("/my-applications");
      } else {
        alert(data.message || "Application failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-job-page">
      <div className="apply-job-card">
        <div className="apply-job-header">
          <span className="apply-job-label">
            JOB APPLICATION
          </span>

          <h1>Apply for Job</h1>

          <p>
            Submit your application for Job ID{" "}
            <strong>{id}</strong>
          </p>
        </div>

        <form
          className="apply-job-form"
          onSubmit={handleSubmit}
        >
          <div className="apply-form-group">
            <label htmlFor="resume">
              Resume URL
            </label>

            <input
              id="resume"
              type="text"
              placeholder="Enter resume URL"
              value={resume}
              onChange={(e) =>
                setResume(e.target.value)
              }
              required
            />

            <span className="input-hint">
              Paste a link to your resume.
            </span>
          </div>

          <button
            type="submit"
            className="submit-application-btn"
            disabled={loading}
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>
        </form>

        <button
          className="back-job-btn"
          onClick={() => navigate(`/jobs/${id}`)}
        >
          ← Back to Job
        </button>
      </div>
    </div>
  );
}

export default ApplyJob;