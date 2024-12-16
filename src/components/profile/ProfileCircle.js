import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../login/firebaseConfig/firebaseConfig.js'; 

const db = getFirestore();

function ProfileCircle() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  // Effettua il fetch dei dati dell'utente all'avvio
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const fetchUserData = async () => {
        console.log('User found:', user.uid);
        setLoading(true);
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log('User data:', userData);
  
          setUserName(userData.firstName || 'Utente');
  
          // Verifica se hasImageChoice è true e se profileImage è disponibile
          let profilePic;
          if (userData.hasImageChoice && userData.profileImage) {
            profilePic = userData.profileImage; // Mostra l'immagine se è disponibile e hasImageChoice è true
          } else {
            profilePic = generateDefaultProfilePic(userData.firstName); // Usa l'avatar di default
          }
  
          console.log('Profile picture URL:', profilePic);
          setProfilePicture(profilePic);
          
          console.log('ProfileImage:', profilePic);
        } else {
          console.log('No user data found');
        }
        setLoading(false);
      };
      fetchUserData();
    } else {
      console.log('No user is logged in');
    }
  }, []);    

  // Funzione per generare un'immagine del profilo di default
  const generateDefaultProfilePic = (name) => {
    const letter = name ? name.charAt(0).toUpperCase() : 'U';
    return `https://ui-avatars.com/api/?name=${letter}&background=random&color=fff&size=128`;
  };

  // Funzione per gestire il click sull'avatar
  const handleClick = () => {
    if (location.pathname === '/') {
      navigate('/dashboard');
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="profile-circle" title={userName} onClick={handleClick} style={{ cursor: 'pointer' }}>
      {/* Se i dati sono in fase di caricamento, mostriamo un placeholder */}
      {loading ? (
        <div className="profile-image-placeholder">...</div>
      ) : (
        // Altrimenti mostriamo l'immagine del profilo
        <img src={profilePicture} alt="Profile" className="profile-image" />
      )}
    </div>
  );
}

export default ProfileCircle;
