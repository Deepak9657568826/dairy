import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style/Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutfunction } from '../redux/actioncreator';
import { useToast } from '@chakra-ui/react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const toast = useToast();

  let role;
  if (state.user) {
    role = state.user.user.role;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  function handleLogout() {
    dispatch(logoutfunction(navigate, toast));
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGoCpSQNy6r7d8v_jfAihJ2qmSEgBCE1cEew&s" alt="Logo" />
        </Link>
      </div>

      <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={closeMenu}>मुख्यपृष्ठ</Link>
        
        {role === "admin" && <Link to="/addproduct" onClick={closeMenu}>उत्पादन जोडा</Link>}
        {role === "admin" && <Link to="/order" onClick={closeMenu}>प्राप्त ऑर्डर</Link>}
        
        {!state.isLoggedIn && <Link to="/signup" onClick={closeMenu}>नोंदणी</Link>}
        {!state.isLoggedIn && <Link to="/login" onClick={closeMenu}>प्रवेश</Link>}

        {state.isLoggedIn && <Link to="/particularOrder" onClick={closeMenu}>तुमची ऑर्डर</Link>}
        {state.isLoggedIn && <Link to="/profile" onClick={closeMenu}>युजर प्रोफाइल</Link>}

        {state.isLoggedIn && <Link to="/login" onClick={() => { handleLogout(); closeMenu(); }}>बाहेर पडा</Link>}
      </div>
    </nav>
  );
}

export default Navbar;
