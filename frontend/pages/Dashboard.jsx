import React, { useEffect, useState } from 'react';
import API from '../utils/axiosClient.js';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    API.get('/api/user')
      .then(res => res.data.ok && setUser(res.data.user))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme || 'light');
  }, []);

  const logout = () =>
    (window.location.href = `${import.meta.env.VITE_API_URL}/auth/logout`);

  if (loading) return <div className="cardF">Loading...</div>;
  if (!user) return <div className="cardF">User not found.</div>;

  const heroImage = theme === 'dark' ? '/landing image.jpg' : '/light-mode-hero.jpg';

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <img src={heroImage} alt="Hero Banner" className="hero-image" />
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome, {user.name}</h1>
          <p className="hero-subtext">
            Step into CodeFest 2025 – a celebration of coding, creativity, and
            collaboration.
          </p>
        </div>
      </section>

      <section className="motivation">
        <h2>Keep Coding. Keep Creating.</h2>
        <p>
          “The best way to predict the future is to create it with code.” – at
          CodeFest, your ideas can turn into reality.
        </p>
      </section>

      <div className="user-card">
        <img src={user.avatar} alt="avatar" className="avatar" />
        <h2>{user.name}</h2>
        <p className="user-email">{user.email}</p>
        <p className="user-desc">
          You are officially part of <strong>CodeFest 2025</strong>. Get ready
          to build, innovate, and compete with some of the brightest minds.
        </p>
        <button className="btn-logout" onClick={logout}>
          Logout
        </button>
      </div>

      <section className="dashboard-section">
        <h2>What Our Fest Offers</h2>
        <p>
          Participate in coding competitions, hackathons, and workshops guided by industry experts.
          Connect with like-minded enthusiasts, explore emerging technologies, and sharpen your skills.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Competitions</h3>
            <p>Showcase your coding talent in challenging contests and win exciting prizes.</p>
          </div>
          <div className="feature-card">
            <h3>Workshops</h3>
            <p>Hands-on learning sessions led by professionals to enhance your practical skills.</p>
          </div>
          <div className="feature-card">
            <h3>Networking</h3>
            <p>Meet peers, mentors, and industry leaders to expand your professional network.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <h2>What You May Achieve</h2>
        <p>
          By joining CodeFest, you not only learn new technologies but also gain recognition, 
          boost your resume, and open doors to future opportunities.
        </p>
        <ul className="achievements-list">
          <li>Enhance problem-solving and coding skills</li>
          <li>Earn certificates and recognition</li>
          <li>Collaborate on real-world projects</li>
          <li>Connect with industry professionals</li>
        </ul>
      </section>

    </div>
  );
};

export default Dashboard;
