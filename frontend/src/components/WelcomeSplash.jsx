import React from 'react';
import { Droplet, ArrowRight, ShieldCheck, Activity, Brain } from 'lucide-react';

const WelcomeSplash = ({ onEnter }) => {
  return (
    <div className="welcome-splash animate-fade-in" style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
      background: 'radial-gradient(circle at 50% 30%, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 100%)'
    }}>
      {/* Background glowing spheres */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '-5%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0
      }} />

      {/* Main Container */}
      <div style={{
        maxWidth: '800px',
        width: '100%',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Brand Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
          animation: 'float 6s ease-in-out infinite'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            padding: '1rem',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
          }}>
            <Droplet size={40} color="#ffffff" />
          </div>
          <span style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            background: 'linear-gradient(to right, #ffffff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AstraMedica
          </span>
        </div>

        {/* Hero Headline */}
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: 800,
          lineHeight: 1.15,
          marginBottom: '1.5rem',
          color: '#f8fafc'
        }}>
          Intelligent Screening & <br />
          <span style={{
            background: 'linear-gradient(to right, #60a5fa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Predictive Diagnostics
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: '#94a3b8',
          maxWidth: '650px',
          marginBottom: '3rem',
          lineHeight: 1.6
        }}>
          A state-of-the-art clinical inference tool empowering patient assessment through automated multi-parameter blood analysis, chest radiograph parsing, and orthopedic fracture detection.
        </p>

        {/* Feature Pills */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '3.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            color: '#cbd5e1',
            fontSize: '0.95rem',
            backdropFilter: 'blur(10px)'
          }}>
            <Brain size={16} color="#60a5fa" /> Deep Learning Backend
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            color: '#cbd5e1',
            fontSize: '0.95rem',
            backdropFilter: 'blur(10px)'
          }}>
            <Activity size={16} color="#c084fc" /> 19 Feature Hematology
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '2rem',
            color: '#cbd5e1',
            fontSize: '0.95rem',
            backdropFilter: 'blur(10px)'
          }}>
            <ShieldCheck size={16} color="#34d399" /> HIPAA Aligned Privacy
          </div>
        </div>

        {/* Main Enter Action Button */}
        <button
          onClick={onEnter}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            border: 'none',
            borderRadius: '3rem',
            cursor: 'pointer',
            boxShadow: '0 10px 25px -5px rgba(37, 99, 235, 0.6)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s ease',
            outline: 'none'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(37, 99, 235, 0.8)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(37, 99, 235, 0.6)';
          }}
        >
          Enter AstraMedica <ArrowRight size={22} />
        </button>

        {/* Academic Footnote */}
        <div style={{
          marginTop: '4rem',
          fontSize: '0.85rem',
          color: '#64748b',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSplash;
