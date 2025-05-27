import React, { useState } from 'react';
import './AcademicProfile.css';

function AcademicProfile() {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    university: 'Example University',
    degreeProgram: 'Computer Science',
    semester: '3',
    email: 'john.doe@example.com'
  });

  const [courses, setCourses] = useState([
    { id: 1, name: 'Mathematics I', grade: null, status: 'In Progress' },
    { id: 2, name: 'Physics', grade: null, status: 'In Progress' },
    { id: 3, name: 'Computer Science', grade: null, status: 'In Progress' },
    { id: 4, name: 'Statistics', grade: null, status: 'In Progress' },
    { id: 5, name: 'Programming', grade: null, status: 'In Progress' }
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: '',
    credits: '',
    grade: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.name && newCourse.credits) {
      const grade = newCourse.grade ? Number(newCourse.grade) : null;
      const status = !grade ? 'In Progress' : 
                    (grade >= 1 && grade <= 4) ? 'Passed' : 'Failed';
      
      setCourses(prev => [...prev, {
        id: Date.now(),
        name: newCourse.name,
        credits: newCourse.credits,
        grade: grade,
        status: status
      }]);
      setNewCourse({ name: '', credits: '', grade: '' });
    }
  };

  const handleRemoveCourse = (id) => {
    setCourses(prev => prev.filter(course => course.id !== id));
  };

  const handleGradeChange = (courseId, grade) => {
    const numericGrade = Number(grade);
    if (grade === '' || (numericGrade >= 1 && numericGrade <= 5)) {
      setCourses(prevCourses => prevCourses.map(course => {
        if (course.id === courseId) {
          const status = grade === '' ? 'In Progress' : 
                        numericGrade >= 1 && numericGrade <= 4 ? 'Passed' : 'Failed';
          return {
            ...course,
            grade: grade === '' ? null : numericGrade,
            status
          };
        }
        return course;
      }));
    }
  };

  const getGradeColor = (grade) => {
    if (grade === null) return '';
    if (grade >= 1 && grade <= 2) return 'grade-good';
    if (grade > 2 && grade <= 4) return 'grade-pass';
    return 'grade-fail';
  };

  const calculateGPA = () => {
    const gradePoints = {
      'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    const totalCredits = courses.reduce((sum, course) => sum + Number(course.credits), 0);
    const totalPoints = courses.reduce((sum, course) => {
      return sum + (Number(course.credits) * (gradePoints[course.grade] || 0));
    }, 0);

    return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
  };

  return (
    <div className="academic-profile">
      <h1>Academic Profile</h1>
      
      <div className="profile-sections">
        <section className="personal-info">
          <h2>Personal Information</h2>
          <div className="info-grid">
            {isEditing ? (
              <>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>University:</label>
                  <input
                    type="text"
                    name="university"
                    value={profile.university}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Degree Program:</label>
                  <input
                    type="text"
                    name="degreeProgram"
                    value={profile.degreeProgram}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Semester:</label>
                  <input
                    type="number"
                    name="semester"
                    value={profile.semester}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="info-item">
                  <span className="label">Name:</span>
                  <span>{profile.firstName} {profile.lastName}</span>
                </div>
                <div className="info-item">
                  <span className="label">University:</span>
                  <span>{profile.university}</span>
                </div>
                <div className="info-item">
                  <span className="label">Degree Program:</span>
                  <span>{profile.degreeProgram}</span>
                </div>
                <div className="info-item">
                  <span className="label">Semester:</span>
                  <span>{profile.semester}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span>{profile.email}</span>
                </div>
              </>
            )}
          </div>
          <button 
            className="edit-button"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </section>

        <section className="courses">
          <h2>Courses</h2>
          <div className="courses-list">
            <table>
              <thead>
                <tr>
                  <th>Course</th>
                  <th>Grade (1-5)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(course => (
                  <tr key={course.id}>
                    <td>{course.name}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={course.grade || ''}
                        onChange={(e) => handleGradeChange(course.id, e.target.value)}
                        placeholder="Enter grade"
                        className={`grade-input ${getGradeColor(course.grade)}`}
                      />
                    </td>
                    <td className={`status ${course.status.toLowerCase()}`}>
                      {course.status}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleRemoveCourse(course.id)}
                        className="remove-button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <form onSubmit={handleAddCourse} className="add-course-form">
            <h3>Add New Course</h3>
            <div className="form-group">
              <input
                type="text"
                placeholder="Course Name"
                value={newCourse.name}
                onChange={e => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Credits"
                value={newCourse.credits}
                onChange={e => setNewCourse(prev => ({ ...prev, credits: e.target.value }))}
                className="input-field"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Grade (1-5, optional)"
                value={newCourse.grade}
                onChange={e => setNewCourse(prev => ({ ...prev, grade: e.target.value }))}
                className="input-field"
              />
            </div>
            <button type="submit" className="add-button">
              Add Course
            </button>
          </form>

          <div className="gpa-display">
            <h3>Current GPA</h3>
            <div className="gpa">{calculateGPA()}</div>
          </div>
        </section>
      </div>
      <div className="grade-legend">
        <h3>Grade System</h3>
        <ul>
          <li><span className="grade-good">1.0 - 2.0</span> - Very Good to Good</li>
          <li><span className="grade-pass">2.1 - 4.0</span> - Satisfactory to Sufficient</li>
          <li><span className="grade-fail">&gt; 4.0</span> - Failed</li>
        </ul>
      </div>
    </div>
  );
}

export default AcademicProfile; 