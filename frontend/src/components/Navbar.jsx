import React, { useState } from 'react';
import { Search, Droplet, Menu, X } from 'lucide-react';

const Navbar = ({ activePage, setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu glass-panel">
          <button 
            className={`nav-btn ${activePage === 'landing' ? 'active' : ''}`}
            onClick={() => { setActivePage('landing'); setIsMenuOpen(false); }}
          >
            Home
          </button>
          <button 
            className={`nav-btn btn-primary-sm ${activePage.startsWith('predict') ? 'active' : ''}`}
            onClick={() => { setActivePage('landing'); setIsMenuOpen(false); }}
          >
            Modules
          </button>
          <button 
            className={`nav-btn ${activePage === 'medication-alarm' ? 'active' : ''}`}
            onClick={() => { setActivePage('medication-alarm'); setIsMenuOpen(false); }}
          >
            Medications
          </button>
          <form className="mobile-search" onSubmit={handleSearch}>
            <Search size={18} className="search-icon" style={{position: 'absolute', marginLeft: '1rem', marginTop: '0.6rem', color: 'var(--text-muted)'}}/>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              style={{width: '100%', padding: '0.5rem 1rem 0.5rem 2.8rem', borderRadius: '20px', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', color: 'white'}}
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
