import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/EditCompany.css";

function EditCompany() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    company_location: "",
    company_description: "",
    company_website: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (
      String(user.user_role).trim().toUpperCase() !==
      "RECRUITER"
    ) {
      navigate("/home");
      return;
    }

    fetch(`http://localhost:8080/companies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setForm({
          company_name: data.company_name || "",
          company_location:
            data.company_location || "",
          company_description:
            data.company_description || "",
          company_website:
            data.company_website || ""
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
        `http://localhost:8080/companies/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Company updated successfully");
        navigate("/company");
      } else {
        alert(
          data.message ||
          "Failed to update company"
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
      <div className="edit-company-loading">
        <div className="edit-loading-spinner"></div>
        <h2>Loading company...</h2>
      </div>
    );
  }

  return (
    <div className="edit-company-page">
      <Navbar />

      <main className="edit-company-container">
        <div className="edit-company-header">
          <span>COMPANY SETTINGS</span>
          <h1>Edit Company</h1>
          <p>
            Update your company information.
          </p>
        </div>

        <form
          className="edit-company-form"
          onSubmit={handleSubmit}
        >
          <div className="edit-field">
            <label>Company Name</label>
            <input
              type="text"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-field">
            <label>Company Location</label>
            <input
              type="text"
              name="company_location"
              value={form.company_location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-field">
            <label>Company Description</label>
            <textarea
              name="company_description"
              value={form.company_description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-field">
            <label>Company Website</label>
            <input
              type="url"
              name="company_website"
              value={form.company_website}
              onChange={handleChange}
              required
            />
          </div>

          <div className="edit-company-actions">
            <button
              type="submit"
              className="update-company-btn"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Company"}
            </button>

            <button
              type="button"
              className="cancel-company-btn"
              onClick={() => navigate("/company")}
            >
              Back to Company
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditCompany;