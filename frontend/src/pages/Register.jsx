import React, { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (value) => {
    const minLength = value.length >= 8;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (!minLength) return "Password must be at least 8 characters.";
    if (!hasUpper) return "Include at least one uppercase letter.";
    if (!hasLower) return "Include at least one lowercase letter.";
    if (!hasNumber) return "Include at least one number.";
    if (!hasSpecial) return "Include at least one special character.";
    return "";
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));

    if (confirmPassword && value !== confirmPassword) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmError("Passwords do not match.");
    } else {
      setConfirmError("");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwordError || confirmError || !password || !confirmPassword) {
      toast.error("Please fix password errors before registering.", {
        position: "top-center",
      });
      return;
    }

    try {
      await registerUser({ username, password });
      toast.success("🎉 Account created successfully!", {
        position: "top-center",
        autoClose: 1000,
        onClose: () => navigate("/login"),
      });
    } catch (err) {
      toast.error("Username already exists!", { position: "top-center" });
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister} className="register-form">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="register-input"
            required
          />

          {/* Password input */}
          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              className="register-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {password && (
            <p
              className={`password-hint ${passwordError ? "error" : "success"
                }`}
            >
              {passwordError || "✅ Strong password"}
            </p>
          )}

          {/* Confirm Password input */}
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="register-input"
              required
            />
            <span
              className="toggle-password"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {confirmPassword && (
            <p
              className={`password-hint ${confirmError ? "error" : "success"
                }`}
            >
              {confirmError || "✅ Passwords match"}
            </p>
          )}

          <button
            type="submit"
            className="register-button"
            disabled={
              !!passwordError ||
              !!confirmError ||
              password === "" ||
              confirmPassword === ""
            }
          >
            Register
          </button>
        </form>
        <p className="register-login-text">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

      {/* 👇 Toast container (must be inside component tree) */}
      <ToastContainer />
    </div>
  );
}

export default Register;
