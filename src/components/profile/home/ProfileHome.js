import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConfig/firebaseConfig.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { sendEmailVerification } from 'firebase/auth';
import Notification from '../../notification/Notification.js';
import EmailSection from './ProfileSections/EmailSection.js';
import PhoneSection from './ProfileSections/PhoneSection.js';
import NameSection from './ProfileSections/NameSection.js';
import JobSection from './ProfileSections/JobSection.js';
import ImageSection from './ProfileSections/ImageSection.js';
import ProfileCircle from '../ProfileCircle.js'; // Importiamo ProfileCircle
import './ProfileHome.css';

const ProfileHome = () => {
  const [userData, setUserData] = useState(null);
  const [emailVerified, setEmailVerified] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    job: '',
  });
  const [notification, setNotification] = useState(null);
  const [showImageOptions, setShowImageOptions] = useState(false);

  // Funzione per caricare i dati utente
  const fetchUserData = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const data = userSnapshot.data();
        setUserData(data);
        setUpdatedData(data);
        setEmailVerified(auth.currentUser.emailVerified);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleImageChange = async (action) => {
    if (action === 'remove') {
      // Rimuovi l'immagine dal profilo
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        profilePicture: null,
      });
      setUserData((prevData) => ({ ...prevData, profilePicture: null }));
    } else if (action === 'upload') {
      // Mostra la sezione per caricare una nuova immagine
      setShowImageOptions(true);
    }
  };

  const handleCancelImageEdit = () => {
    setShowImageOptions(false);
  };

  return (
    <div className="profile-container">
      {notification && (
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification(null)} />
      )}

      <div className="profile-info">
        <h2>Profilo Utente</h2>

        {userData && (
          <>
            {/* Sezioni per Email, Telefono, Nome, Professione */}
            <EmailSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              emailVerified={emailVerified}
              setEmailVerified={setEmailVerified}
              setNotification={setNotification}
            />
            <PhoneSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />
            <NameSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />
            <JobSection
              userData={userData}
              updatedData={updatedData}
              setUpdatedData={setUpdatedData}
              setNotification={setNotification}
            />
            <ImageSection
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
