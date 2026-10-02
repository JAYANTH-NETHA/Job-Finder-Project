import { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Register.css";
import "../components/Register.css";

function Register() {
  const [form, setForm] = useState({
    user_name: "",
    user_email: "",
    user_password: "",
    user_phone: "",
    user_role: "CANDIDATE"
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-card">
        <header className="register-header">
          <h1 className="brand-title">Job Finder</h1>
          <h2 className="form-subtitle">Create Account</h2>
          <p className="form-description">Join us to start finding or posting top job opportunities.</p>
        </header>

        <form className="register-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="user_name">Full Name</label>
            <input
              id="user_name"
              name="user_name"
              type="text"
              placeholder="e.g. John Doe"
              value={form.user_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_email">Email Address</label>
            <input
              id="user_email"
              name="user_email"
              type="email"
              placeholder="e.g. john@example.com"
              value={form.user_email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_password">Password</label>
            <input
              id="user_password"
              name="user_password"
              type="password"
              placeholder="••••••••"
              value={form.user_password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_phone">Phone Number</label>
            <input
              id="user_phone"
              name="user_phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.user_phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="user_role">I am a...</label>
            <div className="select-wrapper">
              <select
                id="user_role"
                name="user_role"
                value={form.user_role}
                onChange={handleChange}
              >
                <option value="CANDIDATE">Candidate (Looking for Jobs)</option>
                <option value="RECRUITER">Recruiter (Posting Jobs)</option>
              </select>
            </div>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>
        </form>

        <footer className="register-footer">
          <p>
            Already have an account?{" "}
            <Link to="/" className="login-link">
              Sign in here
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Register;