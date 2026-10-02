import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../components/MyApplications.css";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/applications/user/${user.user_id}`
    )
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="applications-loading">
        <div className="applications-spinner"></div>
        <h2>Loading applications...</h2>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <Navbar />

      <main className="applications-container">
        <div className="applications-header">
          <span>YOUR ACTIVITY</span>
          <h1>My Applications</h1>
          <p>
            Track the jobs you have applied for.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="applications-empty">
            <div className="empty-icon">📄</div>
            <h2>No applications found</h2>
            <p>
              You haven't applied for any jobs yet.
            </p>
          </div>
        ) : (
          <div className="applications-grid">
            {applications.map((application) => (
              <article
                className="application-card"
                key={application.application_id}
              >
                <div className="application-card-header">
                  <div>
                    <span>
                      APPLICATION #
                      {application.application_id}
                    </span>

                    <h2>
                      Application #
                      {application.application_id}
                    </h2>
                  </div>

                  <strong
                    className={`application-status ${String(
                      application.application_status
                    ).toLowerCase()}`}
                  >
                    {application.application_status}
                  </strong>
                </div>

                <div className="application-info">
                  <div>
                    <span>Status</span>
                    <strong>
                      {application.application_status}
                    </strong>
                  </div>

                  <div>
                    <span>Resume</span>
                    <a
                      href={application.application_resume}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyApplications;