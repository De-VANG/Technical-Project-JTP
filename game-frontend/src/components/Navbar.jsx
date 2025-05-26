// src/components/Navbar.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-950 via-gray-900 to-black text-white shadow-lg p-4">
      <div className="w-full px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="text-4xl font-extrabold font- tracking-wide text-yellow-400 hover:text-yellow-300 transition-all duration-300 flex items-center gap-2">
          <span role="img" aria-label="controller">🎮</span> GameMatch
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <Link
            to="/home"
            className="text-gray-300 hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/profile"
            className="text-gray-300 hover:text-yellow-400 transition duration-300"
          >
            Profile
          </Link>
          <button
            onClick={handleLogout}
            onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'black';
            e.target.style.color = '#C989E9';
            e.target.style.borderColor = '#C989E9';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#C989E9';
            e.target.style.color = 'black';
            e.target.style.borderColor = 'black';
          }}
          style={{
            backgroundColor: '#C989E9',
            color: 'black',
            border: '1px solid black',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontWeight: 'bold',
            boxShadow: '0 2px 2px rgba(0,0,0,0.2)',
            width: '40%',
            marginTop: '0.75rem'
          }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
