import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/PostJob.css";

function PostJob() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_id: "",
    job_title: "",
    job_description: "",
    job_location: "",
    job_salary: "",
    job_experience: "",
    job_type: "FULL_TIME"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          company_id: Number(form.company_id),
          job_title: form.job_title,
          job_description: form.job_description,
          job_location: form.job_location,
          job_salary: form.job_salary,
          job_experience: form.job_experience,
          job_type: form.job_type,
          job_posted_on: new Date().toISOString().split("T")[0]
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Job posted successfully");
        navigate("/manage-jobs");
      } else {
        alert(data.message || "Failed to post job");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="post-job-page">
      <Navbar />

      <main className="post-job-container">
        <div className="post-job-card">

          <div className="post-job-header">
            <span className="post-job-eyebrow">
              Recruiter Portal
            </span>

            <h1>Post a New Job</h1>

            <p>
              Create a new opportunity and make it available
              to candidates.
            </p>
          </div>

          <form
            className="post-job-form"
            onSubmit={handleSubmit}
          >
            <div className="job-form-grid">

              <div className="form-field">
                <label>Company ID</label>
                <input
                  type="number"
                  name="company_id"
                  placeholder="Enter company ID"
                  value={form.company_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Job Title</label>
                <input
                  type="text"
                  name="job_title"
                  placeholder="e.g. Java Developer"
                  value={form.job_title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field full-width">
                <label>Job Description</label>
                <textarea
                  name="job_description"
                  placeholder="Describe the role, responsibilities and requirements..."
                  value={form.job_description}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>

              <div className="form-field">
                <label>Location</label>
                <input
                  type="text"
                  name="job_location"
                  placeholder="e.g. Hyderabad"
                  value={form.job_location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Salary</label>
                <input
                  type="text"
                  name="job_salary"
                  placeholder="e.g. ₹5 LPA - ₹8 LPA"
                  value={form.job_salary}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Experience</label>
                <input
                  type="text"
                  name="job_experience"
                  placeholder="e.g. 0-2 Years"
                  value={form.job_experience}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-field">
                <label>Job Type</label>
                <select
                  name="job_type"
                  value={form.job_type}
                  onChange={handleChange}
                  required
                >
                  <option value="FULL_TIME">Full Time</option>
                  <option value="PART_TIME">Part Time</option>
                  <option value="INTERNSHIP">Internship</option>
                  <option value="CONTRACT">Contract</option>
                </select>
              </div>

            </div>

            <div className="post-job-actions">
              <button
                type="button"
                className="secondary-btn"
                onClick={() => navigate("/recruiter")}
              >
                Back to Dashboard
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                Post Job
              </button>
            </div>
          </form>

        </div>
      </main>
    </div>
  );
}

export default PostJob;