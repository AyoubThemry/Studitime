# StudiTime Application Documentation

## Overview
StudiTime is a React-based study time tracking application that helps students manage and analyze their study sessions, with specific support for the German academic system.

## Component Structure

### 1. App.js (Main Component)
- Manages routing and authentication
- Routes: /login, /signup, /dashboard, /logging, /profile
- Protected route system

### 2. Login & SignUp Components
- Standard authentication forms
- Form validation and error handling
- Secure password management

### 3. Dashboard Component
Key metrics display:
- Total study hours
- Weekly average
- Most productive day
- Longest session

### 4. Logging Component
Study time tracking:
- Real-time tracker
- Manual entry system
- Subject categorization

### 5. AcademicProfile Component
Academic management using German grading system:
```javascript
const germanGradePoints = {
  '1.0': 4.0,  // Sehr gut
  '1.3': 3.7,
  '1.7': 3.3,
  '2.0': 3.0,  // Gut
  '2.3': 2.7,
  '2.7': 2.3,
  '3.0': 2.0,  // Befriedigend
  '3.3': 1.7,
  '3.7': 1.3,
  '4.0': 1.0,  // Ausreichend
  '5.0': 0.0   // Nicht ausreichend
};

// GPA Calculation for German system
const calculateGermanGPA = () => {
  const totalPoints = courses.reduce((sum, course) => {
    return sum + (germanGradePoints[course.grade] * course.credits);
  }, 0);
  
  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  return totalCredits ? (totalPoints / totalCredits).toFixed(2) : 'N/A';
};
```

Features:
- Personal information management
- Course tracking with German grades
- Automatic GPA calculation
- Credit point (ECTS) tracking

### 6. Navbar Component
- Navigation system
- Session management
- Route protection

## Core Functions

### Study Tracking
```javascript
const logStudySession = (duration, subject) => {
  const log = {
    duration,
    subject,
    date: new Date().toISOString(),
    type: 'manual'
  };
  addToStudyLogs(log);
};
```

### Grade Management
```javascript
const addCourse = (course) => {
  validateGermanGrade(course.grade);
  calculateECTS(course.credits);
  updateGPA();
};

const validateGermanGrade = (grade) => {
  const validGrades = ['1.0', '1.3', '1.7', '2.0', '2.3', '2.7', 
                      '3.0', '3.3', '3.7', '4.0', '5.0'];
  return validGrades.includes(grade);
};
```

## Data Structure

### Course Object
```javascript
{
  id: number,
  name: string,
  credits: number,    // ECTS points
  grade: string,      // German grade (1.0 - 5.0)
  semester: number
}
```

### Study Log Object
```javascript
{
  duration: number,   // Hours
  subject: string,
  date: string,      // ISO date
  type: 'manual' | 'recorded'
}
```

## Error Handling
- Grade validation for German system
- ECTS credit validation
- Study time constraints
- Form input validation

## Future Improvements
1. Integration with German university systems
2. ECTS credit tracking visualization
3. Semester planning tools
4. Export for German academic formats
5. Multi-language support (German/English) 