import React from "react";
import AboutCard from "../components/AboutCard.jsx";
import "../css/AboutUs.css";

const teamMembers = [
  {
    title: "Fest Coordinator",
    subtitle: "Leads the entire event",
    highlight: "Aryan Choudhury",
  },
  {
    title: "Event Manager",
    subtitle: "Manages schedules & flow",
    highlight: "Priya Sharma",
  },
  {
    title: "Tech Head",
    subtitle: "Oversees coding competitions",
    highlight: "Rohan Verma",
  },
  {
    title: "Design Lead",
    subtitle: "UI/UX + Branding",
    highlight: "Ananya Gupta",
  },

];

const AboutUs = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <h1>About <span>CodeFest 2025</span></h1>
        <p>
          CodeFest 2025 is the annual flagship tech festival of our institute, 
          celebrating innovation, creativity, and problem-solving. 
          From intense coding hackathons to fun-filled gaming tournaments, 
          we bring together students, developers, and tech enthusiasts 
          from across the nation.
        </p>
      </section>

      {/* What We Do */}
      <section className="about-section">
        <h2>🚀 What We Do</h2>
        <p>
          We host coding competitions, design challenges, robotics contests, 
          and tech talks that ignite innovation. CodeFest is not just about winning — 
          it’s about learning, networking, and having fun with technology.
        </p>
      </section>

      {/* How We Do It */}
      <section className="about-section">
        <h2>⚡ How We Do It</h2>
        <p>
          With the perfect mix of creativity, teamwork, and passion for tech. 
          Our organizing committee works round the clock to design 
          events that challenge participants and push them to think outside the box. 
          Collaboration is our biggest strength.
        </p>
      </section>

      {/* Our Vision */}
      <section className="about-section">
        <h2>🌟 Our Vision</h2>
        <p>
          To build a platform where budding engineers, developers, and innovators 
          can showcase their talent, collaborate on projects, and get inspired 
          by leaders in the tech industry. CodeFest is the launchpad 
          for tomorrow’s changemakers.
        </p>
      </section>

      {/* Team Section */}
      <section className="about-team">
        <h2>👨‍👩‍👧 Meet Our Team</h2>
        <p>The passionate organizers behind CodeFest 2025</p>
        <div className="about-container">
          {teamMembers.map((member, index) => (
            <AboutCard
              key={index}
              title={member.title}
              subtitle={member.subtitle}
              highlight={member.highlight}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
