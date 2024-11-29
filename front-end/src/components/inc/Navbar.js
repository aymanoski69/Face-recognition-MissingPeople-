/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
function Navbar() {
  return (
    <nav className="navbar  fixed-top navbar-expand-lg navbar-dark bg-drak ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">BASSA AND LAMBARKI</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span> 
        </button>

          
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-link">About Us</Link>
            </li>
            <li className="nav-item">
              <Link to="/Contact" className="nav-link">Contact Us</Link>
            </li>

            {/* Styled Log In and Sign Up links */}
            <li className="nav-item">
              <Link to="/Login" className="nav-link special-link">Log In</Link>
            </li>
            <li className="nav-item">
              <Link to="/SignUp" className="nav-link special-link">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
