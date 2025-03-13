"use client"
import { Header } from "./components/header"
import { Footer } from "./components/footer"

export function LandingPage({ navigate }) {
  return (
    <div className="landing-page">
      <Header navigate={navigate} />

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Civic Circle</h1>
          <p>Connecting NGOs and Volunteers for a better community</p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={() => navigate("login")}>
              Get Started
            </button>
            <button
              className="secondary-button"
              onClick={() => window.scrollTo({ top: document.querySelector(".about").offsetTop, behavior: "smooth" })}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder"></div>
        </div>
      </section>

      <section className="about" id="about">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">1</div>
            <h3>Sign Up</h3>
            <p>Create an account as an NGO or Volunteer</p>
          </div>
          <div className="step">
            <div className="step-icon">2</div>
            <h3>Complete Profile</h3>
            <p>Tell us about yourself or your organization</p>
          </div>
          <div className="step">
            <div className="step-icon">3</div>
            <h3>Connect</h3>
            <p>NGOs create events, Volunteers participate</p>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>For NGOs</h3>
            <ul>
              <li>Create and manage events</li>
              <li>Find dedicated volunteers</li>
              <li>Track participation</li>
              <li>Manage your organization profile</li>
            </ul>
          </div>
          <div className="feature-card">
            <h3>For Volunteers</h3>
            <ul>
              <li>Discover meaningful events</li>
              <li>Track your volunteer hours</li>
              <li>Connect with NGOs</li>
              <li>Build your volunteer profile</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Civic Circle helped our organization find dedicated volunteers for our beach cleanup initiative."</p>
            <div className="testimonial-author">- Green Earth NGO</div>
          </div>
          <div className="testimonial-card">
            <p>"I've been able to contribute to causes I care about and track all my volunteer hours in one place."</p>
            <div className="testimonial-author">- Sarah, Volunteer</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

