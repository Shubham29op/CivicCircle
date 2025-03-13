"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Calendar } from "./components/calendar"

export function NGODashboard({ userData, navigate }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCalendar, setShowCalendar] = useState(false)

  // Mock data for dashboard
  const stats = {
    totalEvents: 12,
    upcomingEvents: 3,
    totalVolunteers: 45,
    activeVolunteers: 28,
  }

  const upcomingEvents = [
    { id: 1, title: "Beach Cleanup", date: "2023-06-15", volunteers: 8 },
    { id: 2, title: "Food Drive", date: "2023-06-22", volunteers: 12 },
    { id: 3, title: "Tree Planting", date: "2023-07-01", volunteers: 5 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="dashboard-overview">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Events</h3>
                <div className="stat-value">{stats.totalEvents}</div>
              </div>
              <div className="stat-card">
                <h3>Upcoming Events</h3>
                <div className="stat-value">{stats.upcomingEvents}</div>
              </div>
              <div className="stat-card">
                <h3>Total Volunteers</h3>
                <div className="stat-value">{stats.totalVolunteers}</div>
              </div>
              <div className="stat-card">
                <h3>Active Volunteers</h3>
                <div className="stat-value">{stats.activeVolunteers}</div>
              </div>
            </div>

            <div className="upcoming-events">
              <div className="section-header">
                <h3>Upcoming Events</h3>
                <button className="secondary-button" onClick={() => navigate("events")}>
                  View All
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
                      <p>{event.volunteers} volunteers registered</p>
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
            <h3>Organization Profile</h3>
            <div className="profile-card">
              <div className="profile-header">
                <div className="profile-avatar">
                  {userData.profile.logo ? (
                    <img src={userData.profile.logo || "/placeholder.svg"} alt="Logo" />
                  ) : (
                    <div className="avatar-placeholder">{userData.profile.name?.charAt(0) || "N"}</div>
                  )}
                </div>
                <div className="profile-info">
                  <h4>{userData.profile.name || "Your Organization"}</h4>
                  <p>{userData.profile.description || "No description provided"}</p>
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
                  <span className="detail-label">Website:</span>
                  <span className="detail-value">{userData.profile.website || "Not provided"}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Causes:</span>
                  <div className="detail-tags">
                    {userData.profile.causes?.length > 0 ? (
                      userData.profile.causes.map((cause) => (
                        <span key={cause} className="tag">
                          {cause}
                        </span>
                      ))
                    ) : (
                      <span>No causes specified</span>
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
      <Sidebar userType="ngo" navigate={navigate} setShowCalendar={setShowCalendar} />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>NGO Dashboard</h2>
          <div className="header-actions">
            <button className="primary-button" onClick={() => navigate("events")}>
              Create Event
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

