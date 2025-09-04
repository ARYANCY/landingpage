import React, { useState, useEffect } from "react";
import "../css/ToggleSwitch.css";

export default function ToggleSwitch() {
  const [isOn, setIsOn] = useState(
    localStorage.getItem("theme") === "light" ? true : false
  );
  useEffect(() => {
    if (isOn) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, [isOn]);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="toggle-container">
      <div className="toggle-wrap">
        <input
          className="toggle-input"
          id="holo-toggle"
          type="checkbox"
          checked={isOn}
          onChange={handleToggle}
        />
        <label className="toggle-track" htmlFor="holo-toggle">
          <div className="track-lines">
            <div className="track-line"></div>
          </div>

          <div className="toggle-thumb">
            <div className="thumb-core"></div>
            <div className="thumb-inner"></div>
            <div className="thumb-scan"></div>
            <div className="thumb-particles">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="thumb-particle"></div>
              ))}
            </div>
          </div>

          <div className="toggle-data">
            <div className="data-text off">DARK</div>
            <div className="data-text on">LIGHT</div>
            <div className="status-indicator off"></div>
            <div className="status-indicator on"></div>
          </div>

          <div className="energy-rings">
            <div className="energy-ring"></div>
            <div className="energy-ring"></div>
            <div className="energy-ring"></div>
          </div>

          <div className="interface-lines">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="interface-line"></div>
            ))}
          </div>

          <div className="toggle-reflection"></div>
          <div className="holo-glow"></div>
        </label>
      </div>
    </div>
  );
}
