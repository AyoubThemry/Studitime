import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';
import Logging from './components/Logging';
import AcademicProfile from './components/AcademicProfile';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studyLogs, setStudyLogs] = useState([]);

  const handleAddStudyLog = (log) => {
    setStudyLogs(prev => [...prev, log]);
  };

  return (
    <Router>
      <div className="app">
        {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
        <Routes>
          <Route 
            path="/login" 
            element={
              !isLoggedIn ? (
                <Login setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          <Route 
            path="/signup" 
            element={
              !isLoggedIn ? (
                <SignUp setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <Navigate to="/dashboard" />
              )
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isLoggedIn ? (
                <Dashboard studyLogs={studyLogs} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/logging" 
            element={
              isLoggedIn ? (
                <Logging onAddStudyLog={handleAddStudyLog} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/profile" 
            element={
              isLoggedIn ? (
                <AcademicProfile />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
          <Route 
            path="/" 
            element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 