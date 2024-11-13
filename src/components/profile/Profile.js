// Profile.js
import React from 'react';
import Header from './header/Header'; // Importa Header
import ProfileHome from './home/ProfileHome'; // Importa ProfileHome

const Profile = () => {
  return (
    <div className="profile-page">
      <Header />
      <ProfileHome />
    </div>
  );
}

export default Profile;
