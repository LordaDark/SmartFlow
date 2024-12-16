import React, { useState, useEffect } from 'react';
import ProfileCircle from '../../ProfileCircle.js';
import Notification from '../../../notification/Notification.js';
import cloudinaryUpload from '../../../services/cloudinaryService.js';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig/firebaseConfig.js';

const ImageSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(true); // Stato per il toggle

  // Recupera i dati dell'utente corrente
  useEffect(() => {
    const user = getAuth().currentUser;
    if (user) {
      setCurrentUser(user);
      fetchUserProfileImage(user.uid);
      fetchUserImageChoice(user.uid); // Recupera la scelta dell'immagine
    }
  }, []);

  // Funzione per recuperare l'immagine del profilo dell'utente
  const fetchUserProfileImage = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      setImageUrl(userDoc.data().profileImage || null);
    }
  };

  // Funzione per recuperare la scelta immagine/codice
  const fetchUserImageChoice = async (uid) => {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const hasImageChoice = userDoc.data().hasImageChoice;
      setIsImageSelected(hasImageChoice !== undefined ? hasImageChoice : true); // Imposta il valore iniziale
    }
  };

  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const handleUploading = () => {
    setIsUploading(true);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setSelectedFile(file);
        setIsUploading(false);
        setIsImageUploaded(true);
        setUploadComplete(true);
        setNotification({ message: 'Immagine caricata con successo!', type: 'success' });
      };
      reader.onerror = () => {
        setIsUploading(false);
        setIsImageUploaded(false);
        setUploadComplete(false);
        setNotification({ message: 'Errore durante il caricamento. Riprova.', type: 'error' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveImage = async () => {
    if (!selectedFile || !currentUser) return;

    try {
      setNotification(null);
      setIsUploading(true);

      // Carica l'immagine su Cloudinary
      const uploadedImageUrl = await cloudinaryUpload(selectedFile, currentUser.uid);

      // Salva il link dell'immagine su Firestore
      await updateDoc(doc(db, 'users', currentUser.uid), {
        profileImage: uploadedImageUrl,
      });

      setIsUploading(false);
      setNotification({ message: 'Immagine caricata su Cloudinary con successo!', type: 'success' });

      // Aggiorna lo stato con la nuova immagine
      setImageUrl(uploadedImageUrl);

      // Chiude la modifica dopo il salvataggio riuscito
      handleCancel();
    } catch (error) {
      setIsUploading(false);
      setNotification({ message: 'Errore durante il caricamento su Cloudinary.', type: 'error' });
      console.error(error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setIsUploading(false);
    setIsImageUploaded(false);
    setUploadComplete(false);
    setImagePreview(null);
    setSelectedFile(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect({ target: { files: [file] } });
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };

  const handleChoiceToggle = () => {
    const newChoice = !isImageSelected;
    setIsImageSelected(newChoice);

    // Invia la scelta (true per immagine, false per codice) a Firebase
    if (currentUser) {
      const userRef = doc(db, 'users', currentUser.uid);
      updateDoc(userRef, { hasImageChoice: newChoice });
    }
  };

  return (
    <div className="info-section">
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={closeNotification}
        />
      )}
      {uploadComplete ? (
        <div className="image-preview-section">
          <img src={imagePreview} alt="Anteprima immagine" className="image-preview" />
          <div className="preview-button">
            <button className="save-button" onClick={handleSaveImage}>Salva immagine</button>
            <button className="cancel-button" onClick={handleCancel}>Annulla</button>
          </div>
        </div>
      ) : (
        <>
          {isUploading || isDragActive ? (
            <div
              className={`upload-bar ${isDragActive ? 'drag-active' : ''}`}
              onClick={handleUploadClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <p>{isDragActive ? 'Rilascia l’immagine qui' : 'Clicca o trascina un’immagine per caricarla'}</p>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          ) : (
            <>
              <p><strong>Immagine profilo:</strong></p>
              <div className="data-container">
                <div className="data-display-container">
                  <ProfileCircle imageUrl={imageUrl} />
                  {isEditing ? (
                    <div className="edit-options">

                      <div className='edit-image'>
                        {/* Interruttore per scegliere tra immagine e codice */}
                        <span>{isImageSelected ? 'Immagine' : 'Codice'}</span>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={isImageSelected}
                            onChange={handleChoiceToggle}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>

                      <button className="upload-button" onClick={handleUploading}>Carica immagine</button>
                      <button className="cancel-button" onClick={handleCancel}>Annulla</button>
                    </div>
                  ) : (
                    <button className="edit-button" onClick={() => setIsEditing(true)}>Modifica</button>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ImageSection;
