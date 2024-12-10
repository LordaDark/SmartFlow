// ProfileCircle.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../login/firebaseConfig/firebaseConfig.js';

const db = getFirestore();

function ProfileCircle() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Ottieni l'URL corrente

  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setUserName(userData.firstName || 'Utente');
          setProfilePicture(
            userData.profilePicture || generateDefaultProfilePic(userData.firstName)
          );
        }
      };
      fetchUserData();
    }
  }, []);

  const generateDefaultProfilePic = (name) => {
    const letter = name ? name.charAt(0).toUpperCase() : 'U';
    return `https://ui-avatars.com/api/?name=${letter}&background=random&color=fff&size=128`;
  };

  const handleClick = () => {
    // Controlla la pagina corrente e naviga di conseguenza
    if (location.pathname === '/') {
      navigate('/dashboard'); // Reindirizza alla dashboard se si è nella home
    } else {
      navigate('/profile'); // Altrimenti, reindirizza alla pagina del profilo
    }
  };

  return (
    <div className="profile-circle" title={userName} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {profilePicture ? (
        <img src={profilePicture} alt="Profile" className="profile-image" />
      ) : (
        <div className="profile-image-placeholder">{userName.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
}

export default ProfileCircle;
