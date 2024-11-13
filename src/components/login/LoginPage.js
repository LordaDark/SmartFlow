// LoginApp.js
import React, { useState } from 'react';
import LoginHome from './home/LoginHome';
import SignupApp from './signup/SignupApp';

function LoginApp() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-app">
      {isLogin ? <LoginHome toggleLogin={() => setIsLogin(false)} /> : <SignupApp toggleLogin={() => setIsLogin(true)} />}
    </div>
  );
}

export default LoginApp;
