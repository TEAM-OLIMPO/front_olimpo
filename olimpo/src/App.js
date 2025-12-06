import React, { useState } from 'react';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Register from './Register';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // 'landing', 'register', 'dashboard'
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('landing');
  };

  const handleGoToRegister = () => {
    setCurrentScreen('register');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  return (
    <div>
      {currentScreen === 'landing' && (
        <LandingPage 
          onLogin={handleLogin}
          onRegister={handleGoToRegister}
        />
      )}
      
      {currentScreen === 'register' && (
        <Register 
          onBack={handleBackToLanding}
          onRegisterSuccess={handleRegisterSuccess}
        />
      )}
      
      {currentScreen === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
