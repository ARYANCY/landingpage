const EventForm = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");
    try {
      const res = await axios.post("http://localhost:5000/api/events", formData, {
        withCredentials: true
      });
      if (res.data.success) {
        setStatus("✅ Event submitted successfully!");
        setFormData(prev => ({ ...prev, phone: "" })); // keep name/email
      } else {
        setStatus("❌ Failed to submit event.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Error: " + (error.response?.data?.message || "Something went wrong"));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <div>
        <label>Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-lg"
      >
        Submit
      </button>
      {status && <p className="mt-4 text-center">{status}</p>}
    </form>
  );
};
