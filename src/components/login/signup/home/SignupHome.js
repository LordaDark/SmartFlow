import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebaseConfig/firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import './SignupHome.css';

function SignupHome({ toggleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(''); // Stato per il nome
  const [lastName, setLastName] = useState(''); // Stato per il cognome
  const [phoneNumber, setPhoneNumber] = useState(''); // Stato per il numero di telefono (facoltativo)
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Registrazione riuscita:", user);

        // Salva le informazioni aggiuntive in Firestore
        setDoc(doc(db, "users", user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber || null, // Se non inserito, salva come null
        })
          .then(() => {
            setSuccessMessage('Registrazione completata con successo!');
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          })
          .catch((error) => {
            setError("Errore nel salvataggio delle informazioni: " + error.message);
            console.error("Errore Firestore:", error);
          });
      })
      .catch((error) => {
        setError(error.message);
        console.error("Errore registrazione:", error);
      });
  };

  return (
    <div className="signup-container">
      {successMessage && <div className="notification success">{successMessage}</div>}
      {error && <div className="notification error">{error}</div>}
      <div className="signup-bubble">
        <h1>Registrati a SmartFlow</h1>
        <form className="signup-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Nome"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Cognome"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Crea una password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Numero di telefono (facoltativo)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="submit">Registrati</button>
        </form>
        <button className="toggle-button" onClick={toggleLogin}>
          Hai già un account? Accedi
        </button>
      </div>
    </div>
  );
}

export default SignupHome;
