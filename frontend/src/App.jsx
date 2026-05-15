import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WelcomeSplash from './components/WelcomeSplash';
import LandingPage from './components/LandingPage';
import BloodPrediction from './components/BloodPrediction';
import HeartPrediction from './components/HeartPrediction';
import LungPrediction from './components/LungPrediction';
import BoneBreakage from './components/BoneBreakage';
import MedicationAlarm from './components/MedicationAlarm';
import Login from './components/Login';
import Register from './components/Register';
import './index.css';

function App() {
  const [activePage, setActivePage] = useState('splash');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      setActivePage('landing');
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActivePage('landing');
  };

  const handleRegisterSuccess = () => {
    setActivePage('login');
    alert('Registration successful! Please sign in.');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setActivePage('splash');
  };

  if (activePage === 'splash') {
    return <WelcomeSplash onEnter={() => setActivePage('login')} />;
  }

  if (activePage === 'login' || activePage === 'register') {
    return (
      <div className="auth-layout" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="glow-sphere" style={{ top: '-10%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0) 70%)' }}></div>
        <div className="glow-sphere" style={{ bottom: '-10%', right: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(59, 130, 246, 0) 70%)' }}></div>
        
        {activePage === 'login' ? (
          <Login setAuthView={setActivePage} onLoginSuccess={handleLoginSuccess} />
        ) : (
          <Register setAuthView={setActivePage} onRegisterSuccess={handleRegisterSuccess} />
        )}
      </div>
    );
  }

  return (
    <div className="layout-wrapper">
      <Navbar activePage={activePage} setActivePage={setActivePage} isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="main-content">
        {activePage === 'landing' && <LandingPage setActivePage={setActivePage} />}
        {activePage === 'predict-blood' && <BloodPrediction />}
        {activePage === 'predict-heart' && <HeartPrediction />}
        {activePage === 'predict-lung' && <LungPrediction />}
        {activePage === 'predict-bone' && <BoneBreakage />}
        {activePage === 'medication-alarm' && <MedicationAlarm />}
      </main>
    </div>
  );
}

export default App;
