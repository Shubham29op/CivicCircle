"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export function LoginPage({ handleLogin }) {
  const [activeTab, setActiveTab] = useState("ngo")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      // In a real app, you would authenticate with a backend here
      handleLogin(activeTab)
    }
  }

  const handleGoogleLogin = () => {
    // In a real app, you would integrate with Google OAuth here
    handleLogin(activeTab)
  }

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-tabs">
          <button className={`login-tab ${activeTab === "ngo" ? "active" : ""}`} onClick={() => setActiveTab("ngo")}>
            NGO
          </button>
          <button
            className={`login-tab ${activeTab === "volunteer" ? "active" : ""}`}
            onClick={() => setActiveTab("volunteer")}
          >
            Volunteer
          </button>
        </div>

        <div className="login-form-container">
          <h2>{activeTab === "ngo" ? "NGO Login" : "Volunteer Login"}</h2>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="primary-button">
              Login
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="google-button" onClick={handleGoogleLogin}>
            <span className="google-icon">G</span>
            Login with Google
          </button>

          <p className="signup-link">
            Don't have an account? <a href="#signup">Sign up</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}

