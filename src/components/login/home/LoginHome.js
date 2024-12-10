import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebaseConfig/firebaseConfig.js'; // Importa il tuo auth configurato
import './LoginHome.css';

function LoginHome({ toggleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Funzione per il login con email e password
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login riuscito:", user);
        navigate('/dashboard'); // Redirigi alla dashboard dopo login
      })
      .catch((error) => {
        setError(error.message); // Mostra l'errore in caso di fallimento
        console.error("Errore login:", error);
      });
  };

  // Funzione per il login con Google
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log("Login Google riuscito:", user);
        navigate('/dashboard'); // Redirigi alla dashboard dopo login
      })
      .catch((error) => {
        setError(error.message); // Mostra l'errore in caso di fallimento
        console.error("Errore login Google:", error);
      });
  };

  return (
    <div className="login-container">
      <div className="login-bubble">
        <h1>Accedi a SmartFlow</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Accedi</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        
        <button className="google-login-button" onClick={handleGoogleLogin}>
          Accedi con Google
        </button>

        <button className="toggle-button" onClick={toggleLogin}>
          Non hai un account? Registrati
        </button>
        <button className="home-button" onClick={() => navigate('/')}>
          Torna alla Home
        </button>
      </div>
    </div>
  );
}

export default LoginHome;
