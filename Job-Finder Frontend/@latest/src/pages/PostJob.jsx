import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    job_type: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/jobs",
        {
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
            job_posted_on: new Date()
              .toISOString()
              .split("T")[0]
          })
        }
      );

      const data = await response.json();

      console.log("Post job response:", data);

      if (response.ok) {
        alert("Job posted successfully");
        navigate("/recruiter");
      } else {
        alert(
          data.message ||
          "Failed to post job"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-job-page">
      <main className="post-job-container">
        <div className="post-job-header">
          <span>RECRUITER PANEL</span>
          <h1>Post New Job</h1>
          <p>
            Create a new opportunity and attract qualified
            candidates.
          </p>
        </div>

        <form
          className="post-job-form"
          onSubmit={handleSubmit}
        >
          <div className="post-job-grid">
            <div className="post-field">
              <label>Company ID</label>
              <input
                name="company_id"
                type="number"
                placeholder="Company ID"
                value={form.company_id}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field">
              <label>Job Title</label>
              <input
                name="job_title"
                type="text"
                placeholder="e.g. Java Developer"
                value={form.job_title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field full">
              <label>Job Description</label>
              <textarea
                name="job_description"
                placeholder="Describe the role and responsibilities..."
                value={form.job_description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field">
              <label>Job Location</label>
              <input
                name="job_location"
                type="text"
                placeholder="e.g. Hyderabad"
                value={form.job_location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field">
              <label>Salary</label>
              <input
                name="job_salary"
                type="text"
                placeholder="₹50000 - ₹70000"
                value={form.job_salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field">
              <label>Experience</label>
              <input
                name="job_experience"
                type="text"
                placeholder="0-2 Years"
                value={form.job_experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="post-field">
              <label>Job Type</label>
              <select
                name="job_type"
                value={form.job_type}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Job Type
                </option>
                <option value="FULL_TIME">
                  Full Time
                </option>
                <option value="PART_TIME">
                  Part Time
                </option>
                <option value="INTERNSHIP">
                  Internship
                </option>
                <option value="CONTRACT">
                  Contract
                </option>
              </select>
            </div>
          </div>

          <div className="post-job-actions">
            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Posting..."
                : "Post Job"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/recruiter")
              }
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default PostJob;