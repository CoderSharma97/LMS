import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Utils/Layout';
import axios from 'axios';
import { server } from '../../../main';
import './dashboard.css';

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== 'admin') return navigate('/');

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="dashboard-container">
      <Layout>
        <div className="stats-container">
          <div className="stat-card">
            <i className="fas fa-book stat-icon"></i>
            <h3 className="stat-title">Total Courses</h3>
            <p className="stat-value">{stats.totalCourses}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-chalkboard-teacher stat-icon"></i>
            <h3 className="stat-title">Total Lectures</h3>
            <p className="stat-value">{stats.totalLectures}</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-users stat-icon"></i>
            <h3 className="stat-title">Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashboard;
