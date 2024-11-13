// SignupApp.js
import React from 'react';
import SignupHome from './home/SignupHome';

function SignupApp({ toggleLogin }) {
  return (
    <div className="signup-app">
      <SignupHome toggleLogin={toggleLogin} />
    </div>
  );
}

export default SignupApp;
