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
        const data = { email: auth.currentUser.email, firstName: auth.currentUser.displayName || '', lastName: '' };
        setUserData(data);
        setUpdatedData(data);
        setEmailVerified(auth.currentUser.emailVerified);
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Carica i dati appena il componente è montato
  }, []);

  const handleUpdate = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, updatedData);
      setNotification({ message: 'Dati aggiornati con successo', type: 'success' });
    }
  };

  const handleEmailVerification = async () => {
    if (auth.currentUser && !emailVerified) {
      await sendEmailVerification(auth.currentUser);
      setNotification({ message: 'Email inviata per la verifica', type: 'info' });
    }
  };

  return (
    <div className="profile-home">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <EmailSection email={updatedData.email} onEmailChange={(e) => setUpdatedData({ ...updatedData, email: e.target.value })} />
      <PhoneSection phoneNumber={updatedData.phoneNumber} onPhoneChange={(e) => setUpdatedData({ ...updatedData, phoneNumber: e.target.value })} />
      <NameSection firstName={updatedData.firstName} lastName={updatedData.lastName} onNameChange={(e) => setUpdatedData({ ...updatedData, [e.target.name]: e.target.value })} />
      <JobSection job={updatedData.job} onJobChange={(e) => setUpdatedData({ ...updatedData, job: e.target.value })} />
      
      <button className="update-button" onClick={handleUpdate}>Modifica</button>
      <button className="verify-email-button" onClick={handleEmailVerification}>
        {emailVerified ? 'Email Verificata' : 'Verifica Email'}
      </button>
    </div>
  );
};

export default ProfileHome;
