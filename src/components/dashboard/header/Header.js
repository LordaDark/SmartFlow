import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Usa useNavigate invece di useHistory
import ProfileCircle from '../../profile/ProfileCircle'; // Importa il componente del profilo
import { auth } from '../../login/firebaseConfig/firebaseConfig'; // Assicurati di importare Firebase se lo stai usando
import './Header.css';
import './HeaderMobile.css';

function Header() {
  const navigate = useNavigate(); // Usa il nuovo hook useNavigate

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Effettua il logout da Firebase
      console.log('Logout effettuato');
      navigate('/'); // Redirect alla home dopo il logout
    } catch (error) {
      console.error('Errore durante il logout:', error);
    }
  };

  return (
    <header className="header">
      <div className='left'>
        {/* Il logo è un link alla home */}
        <Link to="/" className="logo-link">
          <div className="logo">SmartFlow</div>
        </Link>
      </div>
      <div className='right'>
        {/* Pulsante di logout */}
        <button className="logout-button" onClick={handleLogout}>Logout</button>

        {/* Il cerchio del profilo */}
        <ProfileCircle /> 
      </div>
    </header>
  );
}

export default Header;
