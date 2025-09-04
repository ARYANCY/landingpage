import React, { useState, useEffect } from "react";
import axios from "axios";

const EventForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [status, setStatus] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  // Fetch logged-in user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user", {
          withCredentials: true
        });

        if (res.data.success) {
          setFormData({
            name: res.data.user.name || "",
            email: res.data.user.email || "",
            phone: ""
          });
        } else {
          setStatus("⚠️ You must be logged in to register.");
        }
      } catch (err) {
        console.error(err);
        setStatus("⚠️ Unable to fetch user info. Please log in.");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setStatus("✅ Event submitted successfully!");
        setFormData((prev) => ({ ...prev, phone: "" })); 
      } else {
        setStatus("❌ Failed to submit event: " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      setStatus(
        "⚠️ Error: " +
          (error.response?.data?.message || error.message || "Something went wrong")
      );
    }
  };

  if (loadingUser) return <p className="text-center mt-4">Loading user info...</p>;

  return (
    <div className="event-register">
      <h2 className="text-2xl font-bold mb-4 text-center">Register for Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange} 
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange} 
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold p-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
};

export default EventForm;
