"use client"

import { useState } from "react"
import { Sidebar } from "./components/sidebar"
import { Calendar } from "./components/calendar"

export function EventsPage({ userType, userData, setUserData }) {
  const [activeTab, setActiveTab] = useState(userType === "ngo" ? "myEvents" : "findEvents")
  const [showCalendar, setShowCalendar] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [eventFormData, setEventFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    maxVolunteers: "",
    skills: [],
  })

  // Mock data for events
  const allEvents = [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2023-06-15",
      time: "09:00 AM",
      location: "Main Beach",
      organization: "Green Earth",
      description: "Help us clean up the beach and protect marine life.",
      volunteers: 8,
      maxVolunteers: 20,
    },
    {
      id: 2,
      title: "Food Drive",
      date: "2023-06-22",
      time: "10:00 AM",
      location: "Community Center",
      organization: "Food for All",
      description: "Collect and distribute food to those in need.",
      volunteers: 12,
      maxVolunteers: 15,
    },
    {
      id: 3,
      title: "Tree Planting",
      date: "2023-07-01",
      time: "08:00 AM",
      location: "City Park",
      organization: "Green Earth",
      description: "Help us plant trees to improve our city's green cover.",
      volunteers: 5,
      maxVolunteers: 25,
    },
    {
      id: 4,
      title: "Elderly Care Visit",
      date: "2023-07-10",
      time: "02:00 PM",
      location: "Sunshine Retirement Home",
      organization: "Care Connect",
      description: "Spend time with elderly residents and brighten their day.",
      volunteers: 3,
      maxVolunteers: 10,
    },
  ]

  const myEvents = allEvents.filter((event) =>
    userType === "ngo" ? event.organization === "Green Earth" : [1, 2].includes(event.id),
  )

  const handleCreateEvent = (e) => {
    e.preventDefault()
    // In a real app, you would send this data to a backend
    console.log("Creating event:", eventFormData)
    setShowCreateForm(false)
    // Reset form
    setEventFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      maxVolunteers: "",
      skills: [],
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventFormData({
      ...eventFormData,
      [name]: value,
    })
  }

  const handleJoinEvent = (eventId) => {
    // In a real app, you would send this to a backend
    console.log("Joining event:", eventId)
    // Update local state to reflect the join
    const updatedEvents = [...userData.events, eventId]
    setUserData({
      ...userData,
      events: updatedEvents,
    })
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "myEvents":
        return (
          <div className="events-grid">
            {myEvents.length > 0 ? (
              myEvents.map((event) => (
                <div key={event.id} className="event-card-large">
                  <div className="event-card-header">
                    <h3>{event.title}</h3>
                    <span className="event-date">
                      {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <div className="event-card-body">
                    <p>{event.description}</p>
                    <div className="event-details">
                      <div className="detail-item">
                        <span className="detail-label">Time:</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span>{event.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Volunteers:</span>
                        <span>
                          {event.volunteers} / {event.maxVolunteers}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="event-card-footer">
                    {userType === "ngo" ? (
                      <button className="secondary-button">Edit Event</button>
                    ) : (
                      <button className="secondary-button">Leave Event</button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>You don't have any events yet.</p>
                {userType === "ngo" ? (
                  <button className="primary-button" onClick={() => setShowCreateForm(true)}>
                    Create Your First Event
                  </button>
                ) : (
                  <button className="primary-button" onClick={() => setActiveTab("findEvents")}>
                    Find Events to Join
                  </button>
                )}
              </div>
            )}
          </div>
        )
      case "findEvents":
        return (
          <div className="events-grid">
            {allEvents.map((event) => (
              <div key={event.id} className="event-card-large">
                <div className="event-card-header">
                  <h3>{event.title}</h3>
                  <span className="event-date">
                    {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="event-card-body">
                  <p>{event.description}</p>
                  <div className="event-details">
                    <div className="detail-item">
                      <span className="detail-label">Organization:</span>
                      <span>{event.organization}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Time:</span>
                      <span>{event.time}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Location:</span>
                      <span>{event.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Volunteers:</span>
                      <span>
                        {event.volunteers} / {event.maxVolunteers}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="event-card-footer">
                  {userData.events?.includes(event.id) ? (
                    <button className="secondary-button" disabled>
                      Already Joined
                    </button>
                  ) : (
                    <button className="primary-button" onClick={() => handleJoinEvent(event.id)}>
                      Join Event
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="events-page">
      <Sidebar userType={userType} navigate={(view) => window.navigate(view)} setShowCalendar={setShowCalendar} />

      <div className="events-content">
        <div className="events-header">
          <h2>Events</h2>
          <div className="header-actions">
            {userType === "ngo" && (
              <button className="primary-button" onClick={() => setShowCreateForm(true)}>
                Create Event
              </button>
            )}
          </div>
        </div>

        <div className="events-tabs">
          {userType === "ngo" ? (
            <button
              className={`events-tab ${activeTab === "myEvents" ? "active" : ""}`}
              onClick={() => setActiveTab("myEvents")}
            >
              My Events
            </button>
          ) : (
            <>
              <button
                className={`events-tab ${activeTab === "myEvents" ? "active" : ""}`}
                onClick={() => setActiveTab("myEvents")}
              >
                My Events
              </button>
              <button
                className={`events-tab ${activeTab === "findEvents" ? "active" : ""}`}
                onClick={() => setActiveTab("findEvents")}
              >
                Find Events
              </button>
            </>
          )}
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
            <Calendar events={allEvents} />
          </div>
        </div>
      )}

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Create New Event</h3>
              <button className="close-button" onClick={() => setShowCreateForm(false)}>
                ×
              </button>
            </div>
            <form onSubmit={handleCreateEvent} className="event-form">
              <div className="form-group">
                <label htmlFor="title">Event Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventFormData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={eventFormData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={eventFormData.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={eventFormData.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={eventFormData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxVolunteers">Maximum Volunteers</label>
                <input
                  type="number"
                  id="maxVolunteers"
                  name="maxVolunteers"
                  value={eventFormData.maxVolunteers}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="form-buttons">
                <button type="button" className="secondary-button" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  Create Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

