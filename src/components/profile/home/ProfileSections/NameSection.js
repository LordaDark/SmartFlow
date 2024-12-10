import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig/firebaseConfig.js'; // Importa auth e db

const NameSection = ({ userData, updatedData, setUpdatedData, setNotification }) => {
  const [isEditingName, setIsEditingName] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSave = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { firstName: updatedData.firstName, lastName: updatedData.lastName });
    setNotification({ message: 'Nome aggiornato con successo.', type: 'success' });
    setIsEditingName(false);
  };

  return (
    <div className="info-section">
      <p><strong>Nome:</strong></p>
      <div className="data-container">
        {isEditingName ? (
          <div className="data-input-container">
            <input
              type="text"
              name="firstName"
              value={updatedData.firstName}
              onChange={handleChange}
            />
            <input
              type="text"
              name="lastName"
              value={updatedData.lastName}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="edit-button">Salva</button>
          </div>
        ) : (
          <div className="data-display-container">
            <p>{userData?.firstName} {userData?.lastName}</p>
            <button onClick={() => setIsEditingName(true)} className="edit-button">Modifica</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NameSection;
