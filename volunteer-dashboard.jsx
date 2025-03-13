"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Calendar } from "./components/calendar"

export function VolunteerDashboard({ userData, navigate }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCalendar, setShowCalendar] = useState(false)

  // Mock data for dashboard
  const stats = {
    eventsJoined: 8,
    upcomingEvents: 2,
    hoursVolunteered: 24,
    impactPoints: 120,
  }

  const upcomingEvents = [
    { id: 1, title: "Beach Cleanup", date: "2023-06-15", organization: "Green Earth" },
    { id: 2, title: "Food Drive", date: "2023-06-22", organization: "Food for All" },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Events Joined</h3>
                <div className="stat-value">{stats.eventsJoined}</div>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <div className="stat-value">{stats.upcomingEvents}</div>
              </div>
              <div className="stat-card">
                <h3>Hours Volunteered</h3>
                <div className="stat-value">{stats.hoursVolunteered}</div>
              </div>
              <div className="stat-card">
                <h3>Impact Points</h3>
                <div className="stat-value">{stats.impactPoints}</div>
              </div>
            </div>

            <div className="upcoming-events">
              <div className="section-header">
                <h3>Your Upcoming Events</h3>
                <button className="secondary-button" onClick={() => navigate("events")}>
                  Find Events
                </button>
              </div>

              <div className="events-list">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="event-card">
                    <div className="event-date">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </div>
                    <div className="event-details">
                      <h4>{event.title}</h4>
                      <p>Organized by {event.organization}</p>
                    </div>
                    <button className="text-button">View Details</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      case "profile":
        return (
          <div className="dashboard-profile">
            <h3>Volunteer Profile</h3>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {userData.profile.avatar ? (
                    <img src={userData.profile.avatar || "/placeholder.svg"} alt="Avatar" />
                  ) : (
                    <div className="avatar-placeholder">{userData.profile.firstName?.charAt(0) || "V"}</div>
                  )}
                </div>
                <div className="profile-info">
                  <h4>
                    {userData.profile.firstName || ""} {userData.profile.lastName || "Volunteer"}
                  </h4>
                  <p>{userData.profile.bio || "No bio provided"}</p>
                </div>
              </div>

              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{userData.profile.address || "Not provided"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{userData.profile.phone || "Not provided"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Skills:</span>
                  <div className="detail-tags">
                    {userData.profile.skills?.length > 0 ? (
                      userData.profile.skills.map((skill) => (
                        <span key={skill} className="tag">
                          {skill}
                        </span>
                      ))
                    ) : (
                      <span>No skills specified</span>
                    )}
                  </div>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Interests:</span>
                  <div className="detail-tags">
                    {userData.profile.interests?.length > 0 ? (
                      userData.profile.interests.map((interest) => (
                        <span key={interest} className="tag">
                          {interest}
                        </span>
                      ))
                    ) : (
                      <span>No interests specified</span>
                    )}
                  </div>
                </div>
              </div>

              <button className="secondary-button">Edit Profile</button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="dashboard-page">
      <Sidebar userType="volunteer" navigate={navigate} setShowCalendar={setShowCalendar} />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Volunteer Dashboard</h2>
          <div className="header-actions">
            <button className="primary-button" onClick={() => navigate("events")}>
              Find Events
            </button>
          </div>
        </div>

        <div className="dashboard-tabs">
          <button
            className={`dashboard-tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={`dashboard-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </div>

        {renderTabContent()}
      </div>

      {showCalendar && (
        <div className="calendar-overlay">
          <div className="calendar-container">
            <div className="calendar-header">
              <h3>Event Calendar</h3>
              <button className="close-button" onClick={() => setShowCalendar(false)}>
                ×
              </button>
            </div>
            <Calendar events={upcomingEvents} />
          </div>
        </div>
      )}
    </div>
  )
}

