import { useState } from 'react';

import { navLinks } from '../constants/index.js';

const NavItems = ({ onClick = () => {}, activeSection, theme, toggleTheme }) => (
  <ul className="nav-ul">
    {navLinks.map((item) => {
      const sectionId = item.href.replace('#', '');
      const isActive = activeSection === sectionId;

      return (
        <li key={item.id} className="nav-li">
          <a href={item.href} className={`nav-li_a ${isActive ? 'text-white after:w-full' : ''}`} onClick={onClick}>
            {item.name}
          </a>
        </li>
      );
    })}

    <li className="nav-li">
      <button
        type="button"
        onClick={toggleTheme}
        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 transition-all hover:border-cyan-400/40 hover:text-white"
        aria-label="Toggle theme">
        {theme === 'dark' ? '☀' : '☾'}
      </button>
    </li>
  </ul>
);

const Navbar = ({ activeSection, theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--surface-2)]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto flex items-center justify-between py-4 c-space sm:py-5">
          <a href="/" className="text-lg font-semibold tracking-[0.25em] text-neutral-400 transition-colors hover:text-white">
            AREEB
          </a>

          <button
            onClick={toggleMenu}
            className="flex rounded-full border border-white/10 bg-white/5 p-2 text-neutral-400 transition-all hover:text-white focus:outline-none sm:hidden"
            aria-label="Toggle menu">
            <img src={isOpen ? 'assets/close.svg' : 'assets/menu.svg'} alt="toggle" className="h-5 w-5" />
          </button>

          <nav className="sm:flex hidden">
            <NavItems activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
          </nav>
        </div>
      </div>

      <div className={`nav-sidebar ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
        <nav className="p-5">
          <NavItems onClick={closeMenu} activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
