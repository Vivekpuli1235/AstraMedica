import React from 'react';
import { Activity, ShieldCheck, Zap, ArrowRight, FileText, Droplet, FileImage, Heart } from 'lucide-react';

const LandingPage = ({ setActivePage }) => {
  return (
    <div className="landing-page animate-fade-in">
      <div className="hero-section">
        <div className="hero-content">
          <div className="badge">AI-Powered Diagnostics</div>
          <h1 className="hero-title">
            Next-Generation <br />
            <span className="text-gradient">Health Analysis</span>
          </h1>
          <p className="hero-subtitle">
            Leverage advanced machine learning to predict potential health risks from medical data and imagery with remarkable accuracy.
          </p>

        </div>


      </div>

      <div style={{ width: '100%', margin: '2rem 0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 600, textAlign: 'center', marginBottom: '3rem' }}>Select Analysis Module</h2>
        <div className="features-section">

          <div
            className="feature-card glass-panel hover-lift"
            style={{ cursor: 'pointer', border: '1px solid rgba(59, 130, 246, 0.3)' }}
            onClick={() => setActivePage('predict-blood')}
          >
            <div className="feature-icon bg-blue">
              <Droplet size={28} />
            </div>
            <h3>Blood Report Analysis</h3>
            <p>Comprehensive risk assessment based on 19 standard blood test parameters.</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Start Analysis <ArrowRight size={18} />
            </div>
          </div>

          <div
            className="feature-card glass-panel hover-lift"
            style={{ cursor: 'pointer', border: '1px solid rgba(56, 189, 248, 0.3)' }}
            onClick={() => setActivePage('predict-lung')}
          >
            <div className="feature-icon" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
              <FileImage size={28} />
            </div>


            <h3>Lung Disease X-Ray</h3>
            <p>Upload chest X-ray images for automated detection of pneumonia and other lung anomalies.</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Start Analysis <ArrowRight size={18} />
            </div>
          </div>

          <div
            className="feature-card glass-panel hover-lift"
            style={{ cursor: 'pointer', border: '1px solid rgba(239, 68, 68, 0.3)' }}
            onClick={() => setActivePage('predict-heart')}
          >
            <div className="feature-icon" style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308' }}>
              <Activity size={28} />
            </div>
            <h3>Bone Breakage Analysis</h3>
            <p>Upload a bone X-ray image for instant AI-powered fracture detection and reporting.</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', color: '#eab308', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Start Analysis <ArrowRight size={18} />
            </div>
          </div>

          <div
            className="feature-card glass-panel hover-lift"
            style={{ cursor: 'pointer', border: '1px solid rgba(16, 185, 129, 0.3)' }}
            onClick={() => setActivePage('medication-alarm')}
          >
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
              <FileText size={28} />
            </div>
            <h3>Medication Alarm</h3>
            <p>Set custom reminders for your medications and automatically maintain a digital schedule.</p>
            <div style={{ marginTop: 'auto', paddingTop: '1rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
              Manage Alarms <ArrowRight size={18} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
