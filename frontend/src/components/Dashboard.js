import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ studyLogs }) {
  const [metrics, setMetrics] = useState({
    totalHours: 0,
    weeklyAverage: 0,
    mostProductiveDay: 'N/A',
    longestSession: 0
  });

  useEffect(() => {
    calculateMetrics();
  }, [studyLogs]);

  const calculateMetrics = () => {
    if (studyLogs.length === 0) {
      return;
    }

    // Calculate total hours
    const totalHours = studyLogs.reduce((acc, log) => acc + log.duration, 0);

    // Calculate weekly average
    const weeklyLogs = studyLogs.filter(log => {
      const logDate = new Date(log.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return logDate >= weekAgo;
    });
    const weeklyAverage = weeklyLogs.reduce((acc, log) => acc + log.duration, 0) / 7;

    // Find longest session
    const longestSession = Math.max(...studyLogs.map(log => log.duration));

    // Calculate most productive day
    const dayCount = studyLogs.reduce((acc, log) => {
      const day = new Date(log.date).toLocaleDateString('en-US', { weekday: 'long' });
      acc[day] = (acc[day] || 0) + log.duration;
      return acc;
    }, {});
    const mostProductiveDay = Object.entries(dayCount).reduce((a, b) => 
      b[1] > a[1] ? b : a
    )[0];

    setMetrics({
      totalHours,
      weeklyAverage,
      mostProductiveDay,
      longestSession
    });
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Study Hours</h3>
          <p>{metrics.totalHours.toFixed(1)}h</p>
        </div>
        <div className="metric-card">
          <h3>Weekly Average</h3>
          <p>{metrics.weeklyAverage.toFixed(1)}h</p>
        </div>
        <div className="metric-card">
          <h3>Most Productive Day</h3>
          <p>{metrics.mostProductiveDay}</p>
        </div>
        <div className="metric-card">
          <h3>Longest Session</h3>
          <p>{metrics.longestSession.toFixed(1)}h</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 