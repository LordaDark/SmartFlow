import React, { useState } from 'react';
import { sendEmailVerification } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig/firebaseConfig.js'; // Assicurati che il percorso sia corretto

const EmailSection = ({
  userData,
  updatedData,
  setUpdatedData,
  emailVerified,
  setEmailVerified,
  setNotification,
}) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSave = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedData.email)) {
      setNotification({ message: "L'email inserita non è valida.", type: 'error' });
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { email: updatedData.email });
    setNotification({ message: 'Email aggiornata con successo.', type: 'success' });
    setIsEditingEmail(false);
  };

  const handleEmailVerification = async () => {
    if (auth.currentUser && !emailVerified) {
      await sendEmailVerification(auth.currentUser);
      setNotification({ message: "Email di verifica inviata. Controlla la tua casella di posta.", type: 'success' });
    }
  };

  return (
    <div className="info-section">
      <p><strong>Email:</strong></p>
      <div className="data-container">
        {isEditingEmail ? (
          <div className="data-input-container">
            <input
              type="email"
              name="email"
              value={updatedData.email}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="edit-button">Salva</button>
          </div>
        ) : (
          <div className="data-display-container">
            <p>{userData?.email}</p>
            <p className="verification-status" style={{ color: emailVerified ? 'green' : 'red' }}>
              {emailVerified ? 'Verificata' : 'Non verificata'}
            </p>
            {!emailVerified && (
              <button onClick={handleEmailVerification} className="verify-button">Verifica</button>
            )}
            <button onClick={() => setIsEditingEmail(true)} className="edit-button">Modifica</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailSection;
