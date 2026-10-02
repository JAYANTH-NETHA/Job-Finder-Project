import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/Company.css";

function Company() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    company_name: "",
    company_location: "",
    company_description: "",
    company_website: ""
  });

  const [creating, setCreating] = useState(false);

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

    fetch("http://localhost:8080/companies")
      .then((response) => response.json())
      .then((data) => {
        setCompanies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const response = await fetch(
        "http://localhost:8080/companies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Company created successfully");

        setCompanies([
          ...companies,
          data
        ]);

        setForm({
          company_name: "",
          company_location: "",
          company_description: "",
          company_website: ""
        });
      } else {
        alert(
          data.message ||
          "Failed to create company"
        );
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (companyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this company?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/companies/${companyId}`,
        {
          method: "DELETE"
        }
      );

      if (response.ok) {
        alert("Company deleted successfully");

        setCompanies(
          companies.filter(
            (company) =>
              company.company_id !== companyId
          )
        );
      } else {
        alert("Failed to delete company");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  if (loading) {
    return (
      <div className="company-loading">
        <div className="loading-spinner"></div>
        <h2>Loading companies...</h2>
      </div>
    );
  }

  return (
    <div className="company-page">
      <Navbar />

      <main className="company-container">
        <div className="company-header">
          <span>RECRUITER PANEL</span>
          <h1>Company Management</h1>
          <p>
            Create and manage the companies associated
            with your job postings.
          </p>
        </div>

        <section className="company-create-card">
          <div className="section-heading">
            <div>
              <span>CREATE</span>
              <h2>Create Company</h2>
            </div>
          </div>

          <form
            className="company-form"
            onSubmit={handleSubmit}
          >
            <div className="input-row">
              <input
                type="text"
                name="company_name"
                placeholder="Company Name"
                value={form.company_name}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="company_location"
                placeholder="Company Location"
                value={form.company_location}
                onChange={handleChange}
                required
              />
            </div>

            <textarea
              name="company_description"
              placeholder="Company Description"
              value={form.company_description}
              onChange={handleChange}
              required
            />

            <input
              type="url"
              name="company_website"
              placeholder="Company Website"
              value={form.company_website}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              disabled={creating}
            >
              {creating
                ? "Creating..."
                : "Create Company"}
            </button>
          </form>
        </section>

        <section className="companies-section">
          <div className="section-heading">
            <div>
              <span>DIRECTORY</span>
              <h2>Companies</h2>
            </div>

            <strong>
              {companies.length}
            </strong>
          </div>

          {companies.length === 0 ? (
            <div className="empty-company">
              <h3>No companies found</h3>
              <p>
                Create your first company to get started.
              </p>
            </div>
          ) : (
            <div className="companies-grid">
              {companies.map((company) => (
                <article
                  className="company-card"
                  key={company.company_id}
                >
                  <div className="company-card-top">
                    <div className="company-icon">
                      {company.company_name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {company.company_name}
                      </h3>

                      <span>
                        ID #{company.company_id}
                      </span>
                    </div>
                  </div>

                  <div className="company-location">
                    📍 {company.company_location}
                  </div>

                  <p className="company-description">
                    {company.company_description}
                  </p>

                  <a
                    href={company.company_website}
                    target="_blank"
                    rel="noreferrer"
                    className="company-website"
                  >
                    Visit Website ↗
                  </a>

                  <div className="company-actions">
                    <button
                      className="edit-company-btn"
                      onClick={() =>
                        navigate(
                          `/edit-company/${company.company_id}`
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-company-btn"
                      onClick={() =>
                        handleDelete(
                          company.company_id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Company;