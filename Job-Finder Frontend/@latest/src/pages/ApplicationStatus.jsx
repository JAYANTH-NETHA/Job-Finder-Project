import { useState } from "react";
import "../components/ApplicationStatus.css";

function ApplicationStatus({
  application,
  onStatusUpdated
}) {
  const [status, setStatus] = useState(
    application.application_status
  );

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/applications/${application.application_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_id: application.user_id,
            job_id: application.job_id,
            application_resume:
              application.application_resume,
            application_applied_on:
              application.application_applied_on,
            application_status: status
          })
        }
      );

      const data = await response.json();

      console.log(
        "Status update response:",
        data
      );

      if (response.ok) {
        alert("Application status updated");

        if (onStatusUpdated) {
          onStatusUpdated(data);
        }
      } else {
        alert(
          data.message ||
          "Failed to update status"
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
    <div className="application-status-control">
      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option value="APPLIED">
          Applied
        </option>

        <option value="SHORTLISTED">
          Shortlisted
        </option>

        <option value="INTERVIEW">
          Interview
        </option>

        <option value="SELECTED">
          Selected
        </option>

        <option value="REJECTED">
          Rejected
        </option>
      </select>

      <button
        onClick={handleUpdate}
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : "Update Status"}
      </button>
    </div>
  );
}

export default ApplicationStatus;