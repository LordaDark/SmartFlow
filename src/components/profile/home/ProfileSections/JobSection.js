import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig/firebaseConfig.js"; // Importa auth e db

const JobSection = ({ userData, updatedData, setUpdatedData, setNotification }) => {
  const [isEditingJob, setIsEditingJob] = useState(false);

  useEffect(() => {
    if (userData && userData.job) {
      setUpdatedData(prevData => ({ ...prevData, job: userData.job }));
    }
  }, [userData, setUpdatedData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleSave = async () => {
    const userRef = doc(db, "users", auth.currentUser.uid);
    await updateDoc(userRef, { job: updatedData.job });
    setNotification({ message: 'Professione aggiornata con successo.', type: 'success' });
    setIsEditingJob(false);
  };

  return (
    <div className="info-section">
      <p><strong>Professione:</strong></p>
      <div className="data-container">
        {isEditingJob ? (
          <div className="data-input-container">
            <input
              type="text"
              name="job"
              value={updatedData.job}
              onChange={handleChange}
            />
            <button onClick={handleSave} className="edit-button">Salva</button>
          </div>
        ) : (
          <div className="data-display-container">
            <p>{updatedData.job || "Non specificato"}</p>
            <button onClick={() => setIsEditingJob(true)} className="edit-button">Modifica</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSection;
