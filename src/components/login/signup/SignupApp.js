// SignupApp.js
import React from 'react';
import SignupHome from './home/SignupHome.js';

function SignupApp({ toggleLogin }) {
  return (
    <div className="signup-app">
      <SignupHome toggleLogin={toggleLogin} />
    </div>
  );
}

export default SignupApp;
