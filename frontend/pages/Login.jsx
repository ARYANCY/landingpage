import React from 'react';
import '../css/Login.css';

const Login = () => {
  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const images = {
    cta: {
      light: '/Now-or-Never.svg',
      dark: '/download.svg',
    },
    highlight: {
      light: '/hi.jpg',
      dark: '/d.jpg'
    },
    about: {
      light: '/a.jpg',
      dark: '/ab.jpg'
    },
    facts: {
      light: '/w.jpg',
      dark: '/fa.jpg'
    }
  };

  const theme = document.documentElement.getAttribute('data-theme') || 'light';

  return (
    <div className="login-page">



      <section className="highlight-section">
        <img src={images.highlight[theme]} className="section-image" />
        <h2>Don't Miss the Chance!</h2>
        <p>
          CodeFest 2025 happens once a year. Compete, learn, and network with the brightest minds
          in tech. Waiting 365 days might be too late—register now and secure your spot.
        </p>
      </section>

      <section className="cta-section">
        <img src={images.cta[theme]}className="section-image" />
        <h1>Register for CodeFest 2025</h1>
        <p>Sign up with Google and join the ultimate coding celebration</p>
        <button onClick={handleGoogleRegister}>Register with Google</button>
      </section>

      <section className="about-fest">
        <img src={images.about[theme]} className="section-image" />
        <h2>About CodeFest</h2>
        <p>
          CodeFest is a 3-day coding festival that brings together developers, students, and
          tech enthusiasts to learn, compete, and innovate. Expect hackathons, workshops,
          tech talks, and fun networking activities.
        </p>
      </section>

      <section className="facts-section">
        <img src={images.facts[theme]}  className="section-image" />
        <h2>Interesting Facts</h2>
        <ul>
          <li>Our previous edition hosted 500+ participants from 20+ colleges.</li>
          <li>Over 30 coding challenges and workshops every day.</li>
          <li>Mentorship from industry experts in AI, Web Dev, and Blockchain.</li>
          <li>Exciting prizes and certificates for winners.</li>
        </ul>
      </section>

    </div>
  );
};

export default Login;
