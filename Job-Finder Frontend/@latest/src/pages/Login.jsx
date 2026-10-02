import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../components/Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await fetch(
        "http://localhost:8080/users/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            user_email: email,
            user_password: password
          })
        }
      );

      const data = await response.json();

      console.log("LOGIN DATA:", data);
      console.log("USER ROLE:", data.user_role);

      if (response.ok) {

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        const role = String(data.user_role)
          .trim()
          .toUpperCase();

        console.log("NORMALIZED ROLE:", role);

        if (role === "RECRUITER") {

          navigate("/recruiter");

        } else {

          navigate("/home");

        }

      } else {

        alert(
          data.message ||
          "Invalid email or password"
        );

      }

    } catch (error) {

      console.error("Login error:", error);

      alert("Unable to connect to server");

    }

  };


  return (

    <div className="login-wrapper">

      <div className="login-card">

        <header className="login-header">

          <h1 className="brand-title">
            Job Finder
          </h1>

          <h2 className="form-subtitle">
            Welcome Back
          </h2>

          <p className="form-description">
            Please enter your details to sign in.
          </p>

        </header>


        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="e.g. name@company.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>


          <button
            type="submit"
            className="login-btn"
          >
            Sign In
          </button>

        </form>


        <footer className="login-footer">

          <p>
            Don't have an account?{" "}

            <Link
              to="/register"
              className="register-link"
            >
              Register here
            </Link>

          </p>

        </footer>

      </div>

    </div>

  );
}

export default Login;