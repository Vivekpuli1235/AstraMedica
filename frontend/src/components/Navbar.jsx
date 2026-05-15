import React, { useState, useEffect } from 'react';
import { Search, Droplet, Menu, X, LogOut, Sun, Moon } from 'lucide-react';

const Navbar = ({ activePage, setActivePage, isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim()) {
      alert(`Search feature functionality placeholder: ${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => setActivePage('landing')}>
          <Droplet size={28} className="logo-icon" />
          <span className="logo-text">AstraMedica</span>
        </div>

        <form className="navbar-search" onSubmit={handleSearch}>
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search analysis, guidelines..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </form>

        <div className="navbar-links desktop-only">
          <button 
            className={`nav-btn ${activePage === 'landing' ? 'active' : ''}`}
            onClick={() => setActivePage('landing')}
          >
            Home
          </button>
          <button 
            className={`nav-btn btn-primary-sm ${activePage.startsWith('predict') ? 'active' : ''}`}
            onClick={() => setActivePage('landing')}
          >
            Modules
          </button>
          <button 
            className={`nav-btn ${activePage === 'medication-alarm' ? 'active' : ''}`}
            onClick={() => setActivePage('medication-alarm')}
          >
            Medications
          </button>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="nav-btn" 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem', borderRadius: '50%', background: 'var(--card-border)', border: 'none', cursor: 'pointer' }}
          >
            {theme === 'dark' ? <Sun size={18} color="#eab308" /> : <Moon size={18} color="#2563eb" />}
          </button>

          {isAuthenticated ? (
            <button className="nav-btn logout-btn" onClick={onLogout} title="Sign Out" style={{ marginLeft: '0.5rem', color: '#ff6b6b' }}>
              <LogOut size={20} />
            </button>
          ) : (
            <button 
              className="btn-primary-sm" 
              onClick={() => setActivePage('login')}
              style={{ marginLeft: '0.5rem', padding: '0.4rem 1.2rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer' }}
            >
              Sign In
            </button>
          )}
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu glass-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '0.5rem', borderBottom: '1px solid var(--card-border)' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Appearance</span>
            <button 
              onClick={toggleTheme} 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--card-border)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '20px', color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.85rem' }}
            >
              {theme === 'dark' ? <Sun size={16} color="#eab308" /> : <Moon size={16} color="#2563eb" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          <button 
            className={`nav-btn ${activePage === 'landing' ? 'active' : ''}`}
            onClick={() => { setActivePage('landing'); setIsMenuOpen(false); }}
            style={{ textAlign: 'left' }}
          >
            Home
          </button>
          <button 
            className={`nav-btn btn-primary-sm ${activePage.startsWith('predict') ? 'active' : ''}`}
            onClick={() => { setActivePage('landing'); setIsMenuOpen(false); }}
            style={{ textAlign: 'left' }}
          >
            Modules
          </button>
          <button 
            className={`nav-btn ${activePage === 'medication-alarm' ? 'active' : ''}`}
            onClick={() => { setActivePage('medication-alarm'); setIsMenuOpen(false); }}
            style={{ textAlign: 'left' }}
          >
            Medications
          </button>
          {isAuthenticated ? (
            <button 
              className="nav-btn logout-btn"
              onClick={() => { onLogout(); setIsMenuOpen(false); }}
              style={{color: '#ff6b6b', marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            >
              <LogOut size={18} style={{marginRight: '0.5rem'}}/> Sign Out
            </button>
          ) : (
            <button 
              className="btn-primary w-100"
              onClick={() => { setActivePage('login'); setIsMenuOpen(false); }}
              style={{marginTop: '0.5rem', padding: '0.6rem', borderRadius: '20px', fontWeight: '600', textAlign: 'center'}}
            >
              Sign In
            </button>
          )}
          <form className="mobile-search" onSubmit={handleSearch} style={{marginTop: '0.5rem'}}>
            <Search size={18} className="search-icon" style={{position: 'absolute', marginLeft: '1rem', marginTop: '0.6rem', color: 'var(--text-muted)'}}/>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{width: '100%', padding: '0.5rem 1rem 0.5rem 2.8rem', borderRadius: '20px', background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text-main)'}}
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
