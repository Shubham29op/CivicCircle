"use client"

import { useState } from "react"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export function ProfilePage({ userType, handleProfileComplete }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(
    userType === "ngo"
      ? {
          name: "",
          description: "",
          address: "",
          phone: "",
          website: "",
          logo: null,
          causes: [],
        }
      : {
          firstName: "",
          lastName: "",
          bio: "",
          phone: "",
          address: "",
          skills: [],
          interests: [],
          avatar: null,
        },
  )

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleMultiSelect = (e, field) => {
    const value = e.target.value
    if (!formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      })
    }
  }

  const removeItem = (field, item) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((i) => i !== item),
    })
  }

  const validateStep = () => {
    const newErrors = {}

    if (userType === "ngo") {
      if (step === 1) {
        if (!formData.name) newErrors.name = "Organization name is required"
        if (!formData.description) newErrors.description = "Description is required"
      } else if (step === 2) {
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
      }
    } else {
      if (step === 1) {
        if (!formData.firstName) newErrors.firstName = "First name is required"
        if (!formData.lastName) newErrors.lastName = "Last name is required"
      } else if (step === 2) {
        if (!formData.address) newErrors.address = "Address is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateStep()) {
      handleProfileComplete(formData)
    }
  }

  // Render NGO profile form steps
  const renderNGOForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3>Basic Information</h3>
            <div className="form-group">
              <label htmlFor="name">Organization Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? "error" : ""}
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="logo">Logo (Optional)</label>
              <input type="file" id="logo" name="logo" accept="image/*" />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h3>Contact Information</h3>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="website">Website (Optional)</label>
              <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
            </div>
          </>
        )
      case 3:
        return (
          <>
            <h3>Causes & Focus Areas</h3>
            <div className="form-group">
              <label htmlFor="causes">Select Causes</label>
              <select id="causes" onChange={(e) => handleMultiSelect(e, "causes")}>
                <option value="">Select a cause</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Health">Health</option>
                <option value="Poverty">Poverty</option>
                <option value="Human Rights">Human Rights</option>
                <option value="Animal Welfare">Animal Welfare</option>
              </select>

              <div className="selected-items">
                {formData.causes.map((cause) => (
                  <div key={cause} className="selected-item">
                    {cause}
                    <button type="button" onClick={() => removeItem("causes", cause)} className="remove-item">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  // Render Volunteer profile form steps
  const renderVolunteerForm = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3>Personal Information</h3>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "error" : ""}
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "error" : ""}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio (Optional)</label>
              <textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label htmlFor="avatar">Profile Picture (Optional)</label>
              <input type="file" id="avatar" name="avatar" accept="image/*" />
            </div>
          </>
        )
      case 2:
        return (
          <>
            <h3>Contact Information</h3>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? "error" : ""}
              />
              {errors.address && <span className="error-message">{errors.address}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </>
        )
      case 3:
        return (
          <>
            <h3>Skills & Interests</h3>
            <div className="form-group">
              <label htmlFor="skills">Select Skills</label>
              <select id="skills" onChange={(e) => handleMultiSelect(e, "skills")}>
                <option value="">Select a skill</option>
                <option value="Teaching">Teaching</option>
                <option value="Organizing">Organizing</option>
                <option value="Marketing">Marketing</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Web Development">Web Development</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>

              <div className="selected-items">
                {formData.skills.map((skill) => (
                  <div key={skill} className="selected-item">
                    {skill}
                    <button type="button" onClick={() => removeItem("skills", skill)} className="remove-item">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="interests">Select Interests</label>
              <select id="interests" onChange={(e) => handleMultiSelect(e, "interests")}>
                <option value="">Select an interest</option>
                <option value="Education">Education</option>
                <option value="Environment">Environment</option>
                <option value="Health">Health</option>
                <option value="Poverty">Poverty</option>
                <option value="Human Rights">Human Rights</option>
                <option value="Animal Welfare">Animal Welfare</option>
              </select>

              <div className="selected-items">
                {formData.interests.map((interest) => (
                  <div key={interest} className="selected-item">
                    {interest}
                    <button type="button" onClick={() => removeItem("interests", interest)} className="remove-item">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="profile-page">
      <Header />

      <div className="profile-container">
        <h2>Complete Your {userType === "ngo" ? "NGO" : "Volunteer"} Profile</h2>

        <div className="progress-bar">
          <div className={`progress-step ${step >= 1 ? "active" : ""}`}>1</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 2 ? "active" : ""}`}>2</div>
          <div className="progress-line"></div>
          <div className={`progress-step ${step >= 3 ? "active" : ""}`}>3</div>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {userType === "ngo" ? renderNGOForm() : renderVolunteerForm()}

          <div className="form-buttons">
            {step > 1 && (
              <button type="button" className="secondary-button" onClick={prevStep}>
                Back
              </button>
            )}

            {step < 3 ? (
              <button type="button" className="primary-button" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button type="submit" className="primary-button">
                Complete Profile
              </button>
            )}
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}

