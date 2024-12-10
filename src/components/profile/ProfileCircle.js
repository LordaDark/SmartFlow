import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../login/firebaseConfig/firebaseConfig.js'; // Assicurati che il path sia corretto

const db = getFirestore(); // Inizializziamo il Firestore

function ProfileCircle() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userName, setUserName] = useState(''); // Impostiamo un nome predefinito
  const [loading, setLoading] = useState(true); // Stato per gestire il caricamento
  const navigate = useNavigate(); // Per la navigazione tra le pagine
  const location = useLocation(); // Per conoscere la pagina corrente

  // Effettua il fetch dei dati dell'utente all'avvio
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      const fetchUserData = async () => {
        setLoading(true); // Indichiamo che i dati sono in fase di caricamento
        const docRef = doc(db, "users", user.uid); // Otteniamo il documento dell'utente da Firestore
        const docSnap = await getDoc(docRef); // Recuperiamo il documento
        if (docSnap.exists()) {
          const userData = docSnap.data(); // I dati dell'utente
          setUserName(userData.firstName || 'Utente'); // Impostiamo il nome dell'utente (default se non presente)
          // Impostiamo l'immagine del profilo, o una predefinita se non disponibile
          setProfilePicture(
            userData.profilePicture || generateDefaultProfilePic(userData.firstName)
          );
        }
        setLoading(false); // Terminato il caricamento dei dati
      };
      fetchUserData(); // Chiamiamo la funzione per fare il fetch
    }
  }, []);

  // Funzione per generare un'immagine del profilo di default
  const generateDefaultProfilePic = (name) => {
    const letter = name ? name.charAt(0).toUpperCase() : 'U'; // Prendiamo la prima lettera del nome
    return `https://ui-avatars.com/api/?name=${letter}&background=random&color=fff&size=128`; // URL per generare un avatar
  };

  // Funzione per gestire il click sull'avatar
  const handleClick = () => {
    if (location.pathname === '/') {
      navigate('/dashboard'); // Se siamo nella home, andiamo alla dashboard
    } else {
      navigate('/profile'); // Altrimenti, andiamo alla pagina del profilo
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
