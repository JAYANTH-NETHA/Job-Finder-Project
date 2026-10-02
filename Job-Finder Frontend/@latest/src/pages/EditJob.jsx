import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../components/EditJob.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    company_id: "",
    job_title: "",
    job_description: "",
    job_location: "",
    job_salary: "",
    job_experience: "",
    job_type: "",
    job_posted_on: ""
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setForm({
          company_id: data.company_id || "",
          job_title: data.job_title || "",
          job_description:
            data.job_description || "",
          job_location: data.job_location || "",
          job_salary: data.job_salary || "",
          job_experience:
            data.job_experience || "",
          job_type: data.job_type || "",
          job_posted_on:
            data.job_posted_on || ""
        });

        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const response = await fetch(
        `http://localhost:8080/jobs/${id}`,
        {
          method: "PUT",
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
            job_posted_on: form.job_posted_on
          })
        }
      );

      const data = await response.json();

      console.log("Update job response:", data);

      if (response.ok) {
        alert("Job updated successfully");
        navigate("/manage-jobs");
      } else {
        alert(
          data.message ||
          "Failed to update job"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job-loading">
        <div className="edit-job-spinner"></div>
        <h2>Loading job...</h2>
      </div>
    );
  }

  return (
    <div className="edit-job-page">
      <main className="edit-job-container">
        <div className="edit-job-header">
          <span>JOB MANAGEMENT</span>
          <h1>Edit Job</h1>
          <p>
            Update the information for this job posting.
          </p>
        </div>

        <form
          className="edit-job-form"
          onSubmit={handleSubmit}
        >
          <div className="edit-job-grid">
            <div className="edit-job-field">
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

            <div className="edit-job-field">
              <label>Job Title</label>
              <input
                name="job_title"
                type="text"
                placeholder="Job Title"
                value={form.job_title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-job-field full">
              <label>Job Description</label>
              <textarea
                name="job_description"
                placeholder="Job Description"
                value={form.job_description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-job-field">
              <label>Job Location</label>
              <input
                name="job_location"
                type="text"
                placeholder="Job Location"
                value={form.job_location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-job-field">
              <label>Salary</label>
              <input
                name="job_salary"
                type="text"
                placeholder="Salary"
                value={form.job_salary}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-job-field">
              <label>Experience</label>
              <input
                name="job_experience"
                type="text"
                placeholder="Experience"
                value={form.job_experience}
                onChange={handleChange}
                required
              />
            </div>

            <div className="edit-job-field">
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

            <div className="edit-job-field full">
              <label>Posted Date</label>
              <input
                name="job_posted_on"
                type="date"
                value={form.job_posted_on}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="edit-job-actions">
            <button
              type="submit"
              className="update-job-btn"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Job"}
            </button>

            <button
              type="button"
              className="back-job-btn"
              onClick={() =>
                navigate("/manage-jobs")
              }
            >
              Back to Manage Jobs
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditJob;