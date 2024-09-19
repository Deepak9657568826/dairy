import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css'; // Importing the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { logoutfunction } from '../redux/actioncreator';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); 

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const state = useSelector((state) => state);
  // console.log(state.user);
  let role;
  if (state.user) {
    role = state.user.user.role
  }
  // console.log(role);



  const toggleMenu = () => {
    setMenuOpen(!menuOpen); 
  };

  function handlellogout() {
    dispatch(logoutfunction(navigate))
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoCpSQNy6r7d8v_jfAihJ2qmSEgBCE1cEew&s" alt="Logo" />
        </Link>
      </div>

      {/* Hamburger icon for mobile */}
      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navbar links */}
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>


        <Link to="/">मुख्यपृष्ठ</Link>
        {role == "admin" ? (<Link to="/order">प्राप्त ऑर्डर</Link>) : ("")}
        
        {!state.isLoggedIn ? (<Link to="/signup">नोंदणी</Link>) : ("")}
        {!state.isLoggedIn ? (<Link to="/login">प्रवेश</Link>) : ("")}

        {state.isLoggedIn ? (<Link to="/login" onClick={handlellogout}>बाहेर पडा</Link>) : ("")}

      </div>
    </nav>
  );
}

export default Navbar;
