import React, { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react"; // 👈 install: npm install lucide-react
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 state for toggle
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      toast.success("Logged in successfully", {
        onClose: () => navigate("/notes"),
        autoClose: 800,
      });
    } catch (err) {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="login-input"
          />

          {/* 👇 Password input with toggle icon */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="login-register-text">
          No account? <a href="/register">Register</a>
        </p>
        {/* Toast container for login toasts */}
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
