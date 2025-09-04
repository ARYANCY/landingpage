import React, { useMemo, useState, useEffect } from "react";
import "../css/Login.css";

const Login = () => {
  const handleGoogleRegister = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
  };

  const images = useMemo(
    () => ({
      highlight: {
        light: "/hi.jpg",
        dark: "/d.jpg",
      },
      about: {
        light: "/a.jpg",
        dark: "/ab.jpg",
      },
    }),
    []
  );

  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme")?.toLowerCase() || "light"
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newTheme =
        document.documentElement.getAttribute("data-theme")?.toLowerCase() ||
        "light";
      setTheme(newTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="login-page">
      <section className="highlight-section">
        <img
          src={images.highlight[theme]}
          alt="Highlight"
          className="section-image"
          loading="lazy"
        />
         <div class="section-content">
            <h2>Don't Miss the Chance!</h2>
            <p>
              CodeFest 2025 happens once a year. Compete, learn, and network with the
              brightest minds in tech. Waiting 365 days might be too late—register
              now and secure your spot.
            </p>
         </div>
        
      </section>

      <section className="cta-section">
        <h1>Register for CodeFest 2025</h1>
        <p>Sign up with Google and join the ultimate coding celebration.</p>
        <button
          onClick={handleGoogleRegister}
          className="google-register-btn"
        >
          Register with Google
        </button>
      </section>

      <section className="about-fest">
        <img
          src={images.about[theme]}
          alt="About CodeFest"
          className="section-image"
          loading="lazy"
        />
        <div class="section-content">
          <h2>About CodeFest</h2>
          <p>
            CodeFest is a 3-day coding festival that brings together developers,
            students, and tech enthusiasts to learn, compete, and innovate. Expect
            hackathons, workshops, tech talks, and fun networking activities.
          </p>
        </div>
        
      </section>

      <section className="facts-section">
        <h2>Interesting Facts</h2>
        <ul>
          <li>500+ participants from 20+ colleges in the last edition.</li>
          <li>30+ coding challenges and workshops daily.</li>
          <li>
            Mentorship from industry experts in AI, Web Dev, and Blockchain.
          </li>
          <li>Exciting prizes and certificates for winners.</li>
        </ul>
      </section>
    </div>
  );
};

export default Login;
