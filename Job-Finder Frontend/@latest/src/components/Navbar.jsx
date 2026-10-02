import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return null;
  }

  const role = String(user.user_role).trim().toUpperCase();

  const isRecruiter = role === "RECRUITER";
  const isCandidate = role === "CANDIDATE";

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-brand">
        <h2
          onClick={() =>
            isRecruiter
              ? navigate("/recruiter")
              : navigate("/home")
          }
        >
          Job Finder
        </h2>
      </div>

      {/* Navigation */}
      <div className="navbar-links">

        {isCandidate && (
          <>
            <button onClick={() => navigate("/home")}>
              Jobs
            </button>

            <button onClick={() => navigate("/my-applications")}>
              My Applications
            </button>

            <button onClick={() => navigate("/profile")}>
              Profile
            </button>
          </>
        )}

        {isRecruiter && (
          <>
            <button onClick={() => navigate("/recruiter")}>
              Dashboard
            </button>

            <button onClick={() => navigate("/company")}>
              Company
            </button>

            <button onClick={() => navigate("/post-job")}>
              Post Job
            </button>

            <button onClick={() => navigate("/manage-jobs")}>
              Manage Jobs
            </button>
          </>
        )}

      </div>

      {/* User */}
      <div className="navbar-user">

        <div className="user-info">
          <span className="user-name">
            {user.user_name}
          </span>

          <span className="user-role">
            {role}
          </span>
        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;