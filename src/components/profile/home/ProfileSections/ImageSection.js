import React, { useState } from 'react';
import ProfileCircle from '../../ProfileCircle.js';

const ImageSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState(false); // Stato per tracciare se l'immagine è stata caricata
  const [uploadComplete, setUploadComplete] = useState(false); // Nuovo stato per gestire il colore del div

  // Funzione per attivare la selezione del file tramite clic
  const handleUploadClick = () => {
    document.getElementById('file-input').click();
  };

  const handleUploading = () => {
    setIsUploading(true);
  };

  // Gestisce il caricamento dell'immagine tramite input file
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('File selezionato:', file);
      setIsUploading(false);
      setIsImageUploaded(true); // Cambia stato dopo il caricamento
      setUploadComplete(true); // Segna il completamento del caricamento
    }
  };

  // Gestisce la cancellazione del caricamento
  const handleCancel = () => {
    setIsEditing(false);
    setIsUploading(false);
    setIsImageUploaded(false); // Resetta lo stato quando si annulla
    setUploadComplete(false); // Resetta lo stato di completamento
  };

  // Gestisce gli eventi di drag
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
      console.log('File trascinato:', file);
      setIsUploading(false);
      setIsImageUploaded(true); // Cambia stato dopo il caricamento
      setUploadComplete(true); // Segna il completamento del caricamento
    }
  };

  return (
    <div className="info-section">
      {isUploading || uploadComplete ? (
        // Barra di caricamento immagine
        <div
          className={`upload-bar ${isDragActive ? 'drag-active' : ''} ${uploadComplete ? 'uploaded' : ''}`}
          onClick={handleUploadClick} // Usa il click per attivare il file input
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
            style={{ display: 'none' }} // Nasconde l'input file
          />
        </div>
      ) : (
        // Schermata normale
        <>
          <p><strong>Immagine profilo:</strong></p>
          <div className="data-container">
            <div className="data-display-container">
              <ProfileCircle />
              {isEditing ? (
                <div className="edit-options">
                  <button className="upload-button" onClick={handleUploading}>Carica immagine</button>
                  <button className="delete-button">Elimina immagine profilo</button>
                  <button className="cancel-button" onClick={handleCancel}>Annulla</button>
                </div>
              ) : (
                <button className="edit-button" onClick={() => setIsEditing(true)}>Modifica</button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageSection;
