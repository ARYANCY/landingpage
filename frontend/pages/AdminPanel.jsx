import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Admin.css'

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  // Create axios instance with auth header
  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('admin-token')}`
    }
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/api/admin/users');
      setUsers(res.data.users);
      setError('');
    } catch (err) {
      if (err.response?.status === 401) {
        // Token expired or invalid
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        navigate('/admin-login');
      } else {
        setError('Failed to fetch users: ' + (err.response?.data?.message || err.message));
      }
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = async () => {
    try {
      const token = localStorage.getItem('admin-token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users/csv`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'users.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        throw new Error('Failed to download CSV');
      }
    } catch (err) {
      setError('Failed to download CSV: ' + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-user');
    navigate('/admin-login');
  };

  const verifyAdminToken = async () => {
    try {
      const res = await apiClient.get('/api/admin/verify');
      setAdminInfo(res.data.admin);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('admin-token');
        localStorage.removeItem('admin-user');
        navigate('/admin-login');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('admin-token');
    if (!token) {
      navigate('/admin-login');
      return;
    }
    
    verifyAdminToken();
    fetchUsers();
  }, [navigate]);

  return (
    <div className="admin-page">
      <nav className="admin-navbar">
        <h2>Admin Panel</h2>
        <div className="admin-info">
          {adminInfo && <span>Welcome, {adminInfo.username}</span>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <section className="admin-section">
        {error && <div className="error-message">{error}</div>}
        
        <div className="admin-stats">
          <h3>Total Registrations: {users.length}</h3>
          <button onClick={downloadCSV} disabled={loading}>
            {loading ? 'Loading...' : 'Download CSV'}
          </button>
        </div>

        {loading ? (
          <div className="loading">Loading users...</div>
        ) : (
          <div className="users-table">
            <h4>Registered Users</h4>
            {users.length === 0 ? (
              <p>No users registered yet.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Google ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id || index}>
                      <td>{user.name || 'N/A'}</td>
                      <td>{user.email || 'N/A'}</td>
                      <td>{user.googleId || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
