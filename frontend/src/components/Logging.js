import React, { useState } from 'react';
import './Logging.css';

function Logging() {
  const [studySession, setStudySession] = useState({
    courseId: '',
    duration: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const [isTracking, setIsTracking] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // Mock courses - in real app this would come from your backend
  const courses = [
    { id: 1, name: 'Mathematics I' },
    { id: 2, name: 'Physics' },
    { id: 3, name: 'Computer Science' },
    { id: 4, name: 'Statistics' },
    { id: 5, name: 'Programming' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudySession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startSession = () => {
    if (!studySession.courseId) {
      alert('Please select a course first');
      return;
    }
    setIsTracking(true);
    const id = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopSession = () => {
    clearInterval(intervalId);
    setIsTracking(false);
    setStudySession(prev => ({
      ...prev,
      duration: Math.round(timer / 60) // Convert seconds to minutes
    }));
    setTimer(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically save the study session to your backend
    console.log('Study session logged:', studySession);
    setStudySession({
      courseId: '',
      duration: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="logging-container">
      <h2>Add Study Session</h2>
      <form onSubmit={handleSubmit} className="logging-form">
        <div className="form-group">
          <label htmlFor="courseId">Course</label>
          <select
            id="courseId"
            name="courseId"
            value={studySession.courseId}
            onChange={handleInputChange}
            required
            className="input-field"
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={studySession.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration</label>
          {isTracking ? (
            <div className="timer-display">{formatTime(timer)}</div>
          ) : (
            <input
              type="number"
              id="duration"
              name="duration"
              value={studySession.duration}
              onChange={handleInputChange}
              placeholder="Enter duration in minutes"
              required
            />
          )}
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={studySession.notes}
            onChange={handleInputChange}
            placeholder="Add any notes about your study session"
          />
        </div>

        <div className="button-group">
          {!isTracking ? (
            <button type="button" onClick={startSession} className="start-button">
              Add Session
            </button>
          ) : (
            <button type="button" onClick={stopSession} className="stop-button">
              Stop Session
            </button>
          )}
          <button type="submit" className="submit-button" disabled={isTracking}>
            Save Session
          </button>
        </div>
      </form>
    </div>
  );
}

export default Logging; 