import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig/firebaseConfig.js'; // Importa auth e db

const PhoneSection = ({ userData, updatedData, setUpdatedData, setNotification }) => {
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSave = async () => {
    if (!/^\d*$/.test(updatedData.phoneNumber)) {
      setNotification({ message: "Il numero di telefono non è valido. Inserisci solo cifre.", type: 'error' });
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { phoneNumber: updatedData.phoneNumber });
    setNotification({ message: 'Numero di telefono aggiornato con successo.', type: 'success' });
    setIsEditingPhone(false);
  };

  return (
    <div className="info-section">
      <p><strong>Numero di telefono:</strong></p>
      <div className="data-container">
        {isEditingPhone ? (
          <div className="data-input-container">
            <input
              type="text"
              name="phoneNumber"
              value={updatedData.phoneNumber}
              onChange={handleChange}
              pattern="\d*"
              title="Inserisci solo numeri"
            />
            <button onClick={handleSave} className="edit-button">Salva</button>
          </div>
        ) : (
          <div className="data-display-container">
            <p>{userData?.phoneNumber}</p>
            <button onClick={() => setIsEditingPhone(true)} className="edit-button">Modifica</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneSection;
