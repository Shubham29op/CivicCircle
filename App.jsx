"use client"

import { useState, createContext } from "react"
import "./styles.css"
import { LandingPage } from "./landing-page"
import { LoginPage } from "./login-page"
import { ProfilePage } from "./profile-page"
import { NGODashboard } from "./ngo-dashboard"
import { VolunteerDashboard } from "./volunteer-dashboard"
import { EventsPage } from "./events-page"

// Create a context for app state
export const AppContext = createContext()

// Main App component
export default function App() {
  // State for current view/page
  const [currentView, setCurrentView] = useState("landing")
  // State for user data
  const [userData, setUserData] = useState({
    type: null, // 'ngo' or 'volunteer'
    isLoggedIn: false,
    hasCompletedProfile: false,
    profile: {},
    events: [],
  })

  // Function to handle navigation
  const navigate = (view) => {
    setCurrentView(view)
  }

  // Function to handle login
  const handleLogin = (userType) => {
    setUserData({
      ...userData,
      type: userType,
      isLoggedIn: true,
    })
    navigate("profile")
  }

  // Function to handle profile completion
  const handleProfileComplete = (profileData) => {
    setUserData({
      ...userData,
      hasCompletedProfile: true,
      profile: profileData,
    })
    navigate(userData.type === "ngo" ? "ngoDashboard" : "volunteerDashboard")
  }

  // Function to handle logout
  const handleLogout = () => {
    setUserData({
      type: null,
      isLoggedIn: false,
      hasCompletedProfile: false,
      profile: {},
      events: [],
    })
    navigate("landing")
  }

  // Render the appropriate view based on currentView state
  const renderView = () => {
    switch (currentView) {
      case "landing":
        return <LandingPage navigate={navigate} />
      case "login":
        return <LoginPage handleLogin={handleLogin} />
      case "profile":
        return <ProfilePage userType={userData.type} handleProfileComplete={handleProfileComplete} />
      case "ngoDashboard":
        return <NGODashboard userData={userData} navigate={navigate} />
      case "volunteerDashboard":
        return <VolunteerDashboard userData={userData} navigate={navigate} />
      case "events":
        return <EventsPage userType={userData.type} userData={userData} setUserData={setUserData} />
      default:
        return <LandingPage navigate={navigate} />
    }
  }

  return (
    <AppContext.Provider value={{ userData, setUserData, navigate, handleLogout }}>
      <div className="app-container">{renderView()}</div>
    </AppContext.Provider>
  )
}

