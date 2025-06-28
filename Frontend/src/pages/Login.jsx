import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!data.username || !data.password) {
      setError("Username and Password are required!");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ UserName: data.username, UserPassword: data.password }),
      });

      const result = await response.json();

      if (response.ok) {
        remember
          ? localStorage.setItem("token", result.token)
          : sessionStorage.setItem("token", result.token);
        navigate("/");
      } else {
        setError(result.message || "Something went wrong");
      }
    } catch (err) {
      setError("Error while communicating with the server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`d-flex justify-content-center align-items-center min-vh-100 ${
        darkMode ? "bg-dark text-white" : "bg-light text-dark"
      }`}
    >
     
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 col-10">
            <div className="card p-4 shadow-lg rounded-4">
              {/* Dark Mode Toggle */}
              <div className="d-flex justify-content-end">
              <button 
  className={`btn btn-sm ${darkMode ? "btn-light" : "btn-dark"}`} 
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
</button>

              </div>
              <br />
              {/* Title */}
              <h2 className="text-center fw-bold mb-3">Welcome to SkylineShopper</h2>

              {/* Login Form */}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control form-control-lg rounded-3 shadow-sm" id="username" name="username" value={data.username} onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control form-control-lg rounded-3 shadow-sm" id="password" name="password" value={data.password} onChange={handleChange} required />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="rememberMe" checked={remember} onChange={() => setRemember(!remember)} />
                  <label className="form-check-label" htmlFor="rememberMe">Remember Me</label>
                </div>

                <button type="submit" className="btn btn-success w-100 rounded-3 shadow-sm py-2" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </button>

                <div className="mt-3 text-center">
                  <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
