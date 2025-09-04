import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ToggleSwitch from "./ToggleSwitch";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2>CodeFest 2025</h2>
      </div>
      <div className="nav-right">
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About Us
        </NavLink>
        <ToggleSwitch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
      </div>
    </nav>
  );
};

export default Navbar;
