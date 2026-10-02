import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ApplicationStatus from "./ApplicationStatus";
import "../components/ViewApplicants.css";

function ViewApplicants() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `http://localhost:8080/applications/job/${id}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("Applicants:", data);
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleStatusUpdated = (
    updatedApplication
  ) => {
    setApplications(
      applications.map((application) =>
        application.application_id ===
        updatedApplication.application_id
          ? updatedApplication
          : application
      )
    );
  };

  if (loading) {
    return (
      <div className="applicants-loading">
        <div className="applicants-spinner"></div>
        <h2>Loading applicants...</h2>
      </div>
    );
  }

  return (
    <div className="applicants-page">
      <main className="applicants-container">
        <div className="applicants-header">
          <div>
            <span>RECRUITER PANEL</span>
            <h1>Job Applicants</h1>
            <p>
              Review candidates and update their
              application status.
            </p>
          </div>

          <div className="applicants-job-id">
            JOB #{id}
          </div>
        </div>

        <button
          className="applicants-back-btn"
          onClick={() =>
            navigate("/manage-jobs")
          }
        >
          ← Back to Manage Jobs
        </button>

        {applications.length === 0 ? (
          <div className="applicants-empty">
            <div>👥</div>
            <h2>No applicants found</h2>
            <p>
              No candidates have applied for this job yet.
            </p>
          </div>
        ) : (
          <div className="applicants-list">
            {applications.map((application) => (
              <article
                className="applicant-card"
                key={application.application_id}
              >
                <div className="applicant-card-header">
                  <div className="applicant-avatar">
                    {String(
                      application.user_id
                    ).charAt(0)}
                  </div>

                  <div>
                    <span>
                      APPLICATION #
                      {application.application_id}
                    </span>

                    <h2>
                      Candidate #{application.user_id}
                    </h2>
                  </div>
                </div>

                <div className="applicant-details">
                  <div>
                    <span>User ID</span>
                    <strong>
                      {application.user_id}
                    </strong>
                  </div>

                  <div>
                    <span>Applied On</span>
                    <strong>
                      {application.application_applied_on}
                    </strong>
                  </div>

                  <div>
                    <span>Current Status</span>
                    <strong>
                      {application.application_status}
                    </strong>
                  </div>
                </div>

                <div className="resume-box">
                  <span>Resume</span>

                  <a
                    href={application.application_resume}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Candidate Resume ↗
                  </a>
                </div>

                <ApplicationStatus
                  application={application}
                  onStatusUpdated={
                    handleStatusUpdated
                  }
                />
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default ViewApplicants;