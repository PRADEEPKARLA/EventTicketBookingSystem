
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header>
      <h1>Event Booking App</h1>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/events">Events</Link>
            <Link to="/booking-history">Booking History</Link>
            <button
              onClick={handleLogout}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;


 