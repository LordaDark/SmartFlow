import React, { useEffect, useState } from 'react';
import { auth, db } from '../../login/firebaseConfig/firebaseConfig'; 
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // Importa updateDoc per aggiornare i dati
import './ProfileHome.css';

const ProfileHome = () => {
  const [userData, setUserData] = useState(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false); // Stato per la modifica dell'email
  const [isEditingName, setIsEditingName] = useState(false); // Stato per la modifica del nome
  const [isEditingPhone, setIsEditingPhone] = useState(false); // Stato per la modifica del telefono

  const [updatedData, setUpdatedData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data());
          setUpdatedData(userSnapshot.data()); // Pre-carica i dati nel form di modifica
        }
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({
      ...updatedData,
      [name]: value,
    });
  };

  const handleSave = async (field) => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, updatedData); // Aggiorna i dati su Firestore
      setUserData(updatedData); // Aggiorna i dati visualizzati
      if (field === 'email') {
        setIsEditingEmail(false);
      } else if (field === 'name') {
        setIsEditingName(false);
      } else if (field === 'phone') {
        setIsEditingPhone(false);
      }
    }
  };

  if (!userData) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-info">
        <h2>Profilo Utente</h2>
        
        {/* Sezione Email */}
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
                <button onClick={() => handleSave('email')} className="edit-button">Salva</button>
              </div>
            ) : (
              <div className="data-display-container">
                <p>{userData.email}</p>
                <button onClick={() => setIsEditingEmail(true)} className="edit-button">Modifica</button>
              </div>
            )}
          </div>
        </div>

        {/* Sezione Nome */}
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
                  placeholder="Nome"
                />
                <input 
                  type="text" 
                  name="lastName" 
                  value={updatedData.lastName} 
                  onChange={handleChange} 
                  placeholder="Cognome"
                />
                <button onClick={() => handleSave('name')} className="edit-button">Salva</button>
              </div>
            ) : (
              <div className="data-display-container">
                <p>{userData.firstName} {userData.lastName}</p>
                <button onClick={() => setIsEditingName(true)} className="edit-button">Modifica</button>
              </div>
            )}
          </div>
        </div>

        {/* Sezione Numero di telefono */}
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
                />
                <button onClick={() => handleSave('phone')} className="edit-button">Salva</button>
              </div>
            ) : (
              <div className="data-display-container">
                <p>{userData.phoneNumber}</p>
                <button onClick={() => setIsEditingPhone(true)} className="edit-button">Modifica</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHome;
