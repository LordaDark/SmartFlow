// DataCompletionPrompt.js
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../login/firebaseConfig/firebaseConfig.js';
import { doc, setDoc } from 'firebase/firestore';
import './DataCompletionPrompt.css';

const DataCompletionPrompt = ({ onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Se l'utente ha già un nome e un telefono, carica questi dati nel modulo
    if (auth.currentUser) {
      const { displayName, phoneNumber } = auth.currentUser;
      if (displayName) {
        const nameParts = displayName.split(' ');
        setFirstName(nameParts[0] || '');
        setLastName(nameParts[1] || '');
      }
      setPhoneNumber(phoneNumber || '');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const userRef = doc(db, "users", auth.currentUser.uid);
    await setDoc(userRef, {
      firstName,
      lastName,
      phoneNumber,
    }, { merge: true });

    setIsSubmitting(false);
    onClose(); // Chiude il prompt dopo l'aggiornamento dei dati
  };

  return (
    <div className="data-completion-prompt">
      <div className="prompt-content">
        <h2>Compila il tuo profilo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="firstName">Nome:</label>
            <input 
              type="text" 
              id="firstName" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="lastName">Cognome:</label>
            <input 
              type="text" 
              id="lastName" 
              value={lastName} 
              onChange={(e) => setLastName(e.target.value)} 
              required 
            />
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">Numero di telefono:</label>
            <input 
              type="text" 
              id="phoneNumber" 
              value={phoneNumber} 
              onChange={(e) => setPhoneNumber(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" disabled={isSubmitting} className="submit-button">
            {isSubmitting ? 'Salvataggio...' : 'Salva'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DataCompletionPrompt;
