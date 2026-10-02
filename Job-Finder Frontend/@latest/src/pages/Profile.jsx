import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/Profile.css";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone: ""
  });

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    if (
      String(user.user_role).trim().toUpperCase() !==
      "CANDIDATE"
    ) {
      navigate("/recruiter");
      return;
    }

    fetch(`http://localhost:8080/users/${user.user_id}`)
      .then((response) => response.json())
      .then((data) => {
        setForm({
          user_name: data.user_name || "",
          user_email: data.user_email || "",
          user_password: "",
          user_phone: data.user_phone || ""
        });

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
    setUpdating(true);

    try {
      const response = await fetch(
        `http://localhost:8080/users/${user.user_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user_name: form.user_name,
            user_email: form.user_email,
            user_password: form.user_password,
            user_phone: form.user_phone,
            user_role: "CANDIDATE"
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        const updatedUser = {
          ...user,
          user_name: form.user_name,
          user_email: form.user_email
        };

        localStorage.setItem(
          "user",
          JSON.stringify(updatedUser)
        );

        alert("Profile updated successfully");
      } else {
        alert(
          data.message ||
          "Failed to update profile"
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
      <div className="profile-loading">
        <div className="profile-spinner"></div>
        <h2>Loading profile...</h2>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {form.user_name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <span>ACCOUNT SETTINGS</span>
            <h1>Candidate Profile</h1>
            <p>
              Manage your personal account information.
            </p>
          </div>
        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >
          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              name="user_name"
              value={form.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              name="user_email"
              value={form.user_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-field">
            <label>New Password</label>
            <input
              type="password"
              name="user_password"
              placeholder="Enter password"
              value={form.user_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-field">
            <label>Phone</label>
            <input
              type="text"
              name="user_phone"
              value={form.user_phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="profile-role">
            <span>Account Role</span>
            <strong>CANDIDATE</strong>
          </div>

          <button
            type="submit"
            disabled={updating}
          >
            {updating
              ? "Updating..."
              : "Update Profile"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Profile;