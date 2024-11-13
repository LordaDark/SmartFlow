// ProfileImage.js
import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../login/firebaseConfig/firebaseConfig'; // Importa Firestore e Auth

const ProfileImage = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          setProfilePicture(userSnapshot.data().profilePicture);
        }
      }
    };

    fetchProfilePicture();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSaveProfilePicture = async () => {
    const user = getAuth().currentUser;
    if (user && newProfilePic) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { profilePicture: newProfilePic });
      setProfilePicture(newProfilePic); // Aggiorna la foto del profilo nella UI
    }
  };

  return (
    <div className="profile-image-container">
      <img src={profilePicture || "https://ui-avatars.com/api/?name=U&background=random&color=fff&size=128"} alt="Profile" className="profile-image" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {newProfilePic && <button onClick={handleSaveProfilePicture}>Salva Immagine</button>}
    </div>
  );
};

export default ProfileImage;
