import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import BloodPrediction from './components/BloodPrediction';
import HeartPrediction from './components/HeartPrediction';
import LungPrediction from './components/LungPrediction';
import BoneBreakage from './components/BoneBreakage';
import MedicationAlarm from './components/MedicationAlarm';
import './index.css';

function App() {
  const [activePage, setActivePage] = useState('landing');

  return (
    <div className="layout-wrapper">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
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
