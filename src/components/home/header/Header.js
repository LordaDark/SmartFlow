import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication
import ProfileCircle from '../../profile/ProfileCircle.js'; // Import ProfileCircle component
import './Header.css';
import './HeaderMobile.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [isMovedRight, setIsMovedRight] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [isCentered, setIsCentered] = useState(false);
  let lastScrollY = window.scrollY;

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if user is logged in, false otherwise
    });
    return unsubscribe;
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (window.innerWidth <= 768) return; // Exit if on mobile

    const sections = ['home', 'about', 'service'];
    sections.forEach((section) => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const { offsetTop, clientHeight } = sectionElement;
        if (currentScrollY >= offsetTop && currentScrollY < offsetTop + clientHeight) {
          setActiveSection(section);
        }
      }
    });

    if (currentScrollY > lastScrollY) {
      activateAnimation();
    } else {
      deactivateAnimation();
    }
    lastScrollY = currentScrollY;
  };

  const activateAnimation = () => {
    setIsShrinking(true);
    setIsLogoVisible(false);
    setAreButtonsVisible(false);
    setTimeout(() => {
      setIsMovedRight(true);
      setIsCentered(true);
    }, 500);
  };

  const deactivateAnimation = () => {
    setIsMovedRight(false);
    setIsShrinking(false);
    setIsLogoVisible(true);
    setAreButtonsVisible(true);
    setIsCentered(false);
  };

  const toggleMenu = () => {
    if (isShrinking) {
      deactivateAnimation();
    } else {
      activateAnimation();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isShrinking ? 'shrinking' : ''} ${isMovedRight ? 'move-right' : ''}`}>
      {isLogoVisible && <div className="logo">SmartFlow</div>}
      {areButtonsVisible && (
        <nav className={`nav-buttons ${isCentered ? 'centered' : ''}`}>
          <button
            className={`nav-button ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => scrollToSection('home')}
          >
            Home
          </button>
          <button
            className={`nav-button ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => scrollToSection('about')}
          >
            Chi Siamo
          </button>
          <button
            className={`nav-button ${activeSection === 'service' ? 'active' : ''}`}
            onClick={() => scrollToSection('service')}
          >
            Servizi
          </button>
          {isLoggedIn ? (
            <ProfileCircle /> // Display profile circle when logged in
          ) : (
            <Link to="/login">
              <button
                className={`nav-button login ${activeSection === 'login' ? 'active' : ''}`}
              >
                Login
              </button>
            </Link>
          )}
        </nav>
      )}
      <button className="menu-button" onClick={toggleMenu}>☰</button>
    </header>
  );
}

export default Header;
