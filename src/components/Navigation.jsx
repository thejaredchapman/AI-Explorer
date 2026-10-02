import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SECTIONS } from '../data/sections';

export default function Navigation({ currentSection, onNavigate, theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const sections = SECTIONS;

  const handleNav = (id) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      className="nav-bar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
    >
      <span className="nav-logo" onClick={() => handleNav('hero')}>AI-<em>Explorer</em></span>

      {/* Desktop Nav */}
      <div className="nav-links nav-desktop">
        {sections.slice(1).map(s => (
          <button
            key={s.id}
            className={`nav-link ${currentSection === s.id ? 'active' : ''}`}
            onClick={() => handleNav(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Theme Toggle */}
      <button
        className="theme-toggle"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? '\u2600\uFE0F' : '\uD83C\uDF19'}
      </button>

      {/* Mobile Hamburger */}
      <button
        className={`nav-hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {sections.map(s => (
              <button
                key={s.id}
                className={`nav-mobile-link ${currentSection === s.id ? 'active' : ''}`}
                onClick={() => handleNav(s.id)}
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
