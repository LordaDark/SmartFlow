import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig/firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import Notification from '../../notification/Notification.js';
import EmailSection from './ProfileSections/EmailSection.js';
import PhoneSection from './ProfileSections/PhoneSection.js';
import NameSection from './ProfileSections/NameSection.js';
import JobSection from './ProfileSections/JobSection.js';
import './ProfileHome.css';

const ProfileHome = () => {
  const [userData, setUserData] = useState(null); // Stato per i dati dell'utente dal DB
  const [emailVerified, setEmailVerified] = useState(false); // Stato per la verifica dell'email
  const [updatedData, setUpdatedData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    job: '',
  }); // Stato per aggiornamenti in tempo reale
  const [notification, setNotification] = useState(null); // Stato per le notifiche

  // Funzione per caricare i dati dell'utente
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const isGoogleLogin = auth.currentUser.providerData.some(
        (provider) => provider.providerId === 'google.com'
      );

      if (!isGoogleLogin) {
        // Carica i dati utente da Firestore se l'utente non è loggato con Google
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setUserData(data); // Imposta i dati utente
          setUpdatedData(data); // Imposta i dati aggiornabili
          setEmailVerified(auth.currentUser.emailVerified); // Verifica email
        }
      } else {
        // Imposta i dati dell'utente se l'accesso è tramite Google
        const { displayName, email, phoneNumber } = auth.currentUser;
        setUpdatedData({
          firstName: displayName?.split(' ')[0] || '',
          lastName: displayName?.split(' ')[1] || '',
          email: email || '',
          phoneNumber: phoneNumber || '',
          job: '', // Aggiungi un valore predefinito per il lavoro
        });
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Chiamata per caricare i dati all'avvio
  }, []);

  return (
    <div className="profile-container">
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} // Funzione per chiudere la notifica
        />
      )}

      <div className="profile-info">
        <h2>Profilo Utente</h2>
        {userData && (
          <>
            {/* Sezione Email */}
            <EmailSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              emailVerified={emailVerified}
              setEmailVerified={setEmailVerified}
              setNotification={setNotification}
            />

            {/* Sezione Numero di Telefono */}
            <PhoneSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />

            {/* Sezione Nome */}
            <NameSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />

            {/* Sezione Professione */}
            <JobSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileHome;
