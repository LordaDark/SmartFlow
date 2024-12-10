import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication
import { Link } from 'react-router-dom'; // Importa Link per la navigazione
import ProfileCircle from '../../../profile/ProfileCircle.js'; // Import ProfileCircle component
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isShrinking, setIsShrinking] = useState(false);
  const [isMovedRight, setIsMovedRight] = useState(false);
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [areButtonsVisible, setAreButtonsVisible] = useState(true);
  const lastScrollY = useRef(0); // Usa useRef per evitare il re-rendering

  // Check if user is logged in
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set to true if user is logged in, false otherwise
    });
    return unsubscribe;
  }, []);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (window.innerWidth <= 768) return; // Exit if on mobile

    if (currentScrollY > lastScrollY.current) {
      activateAnimation();
    } else {
      deactivateAnimation();
    }

    lastScrollY.current = currentScrollY; // Aggiorna il valore
  };

  const activateAnimation = () => {
    setIsShrinking(true);
    setIsLogoVisible(false);
    setAreButtonsVisible(false);
    setTimeout(() => {
      setIsMovedRight(true);
    }, 500);
  };

  const deactivateAnimation = () => {
    setIsMovedRight(false);
    setIsShrinking(false);
    setIsLogoVisible(true);
    setAreButtonsVisible(true);
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

      {/* Bottone verde per andare alla dashboard */}
      {isLoggedIn && areButtonsVisible && (
        <Link to="/dashboard" className="dashboard-button">
          Vai alla Dashboard
        </Link>
      )}

      {isLoggedIn && <ProfileCircle />} {/* Show profile circle when logged in */}
    </header>
  );
}

export default Header;
