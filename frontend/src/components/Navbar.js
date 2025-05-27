import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ setIsLoggedIn }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">StudiTime</div>
      <div className="nav-links">
        <Link 
          to="/dashboard" 
          className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
        >
          📊 Dashboard
        </Link>
        <Link 
          to="/logging" 
          className={`nav-link ${location.pathname === '/logging' ? 'active' : ''}`}
        >
          📝 Logging
        </Link>
        <Link 
          to="/profile" 
          className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`}
        >
          🎓 Academic Profile
        </Link>
        <button onClick={handleLogout} className="logout-button">
          🚪 Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar; 