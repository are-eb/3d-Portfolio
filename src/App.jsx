import { useEffect, useRef, useState } from 'react';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Footer from './sections/Footer.jsx';
import Navbar from './sections/Navbar.jsx';
import Contact from './sections/Contact.jsx';
import Clients from './sections/Clients.jsx';
import Projects from './sections/Projects.jsx';
import Skills from './sections/Skills.jsx';
import WorkExperience from './sections/Experience.jsx';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0, visible: false });
  const [cursorTrail, setCursorTrail] = useState(() => Array.from({ length: 16 }, () => ({ x: 0, y: 0, opacity: 0, scale: 0.3 })));
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const pointerRef = useRef({ x: 0, y: 0, visible: false });
  const trailRef = useRef([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const introTimer = window.setTimeout(() => setIsIntroVisible(false), 1400);
    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.body.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const revealItems = document.querySelectorAll('[data-reveal]');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 },
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    sections.forEach((section) => sectionObserver.observe(section));
    revealItems.forEach((item) => revealObserver.observe(item));

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;

      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 600);
    };

    const handlePointerMove = (event) => {
      pointerRef.current = { x: event.clientX, y: event.clientY, visible: true };
      setCursorGlow({ x: event.clientX, y: event.clientY, visible: true });
    };

    const handlePointerLeave = () => {
      pointerRef.current.visible = false;
      setCursorGlow((prev) => ({ ...prev, visible: false }));
    };

    const animateTrail = () => {
      const { x, y, visible } = pointerRef.current;
      const nextTrail = trailRef.current.map((particle, index) => {
        const target = index === 0 ? { x, y } : trailRef.current[index - 1];
        const nextX = particle.x + (target.x - particle.x) * (0.18 + index * 0.015);
        const nextY = particle.y + (target.y - particle.y) * (0.18 + index * 0.015);
        const opacity = visible ? Math.max(0.05, 1 - index / trailRef.current.length) : 0;
        const scale = visible ? 0.35 + (1 - index / trailRef.current.length) * 0.55 : 0.2;

        return {
          x: nextX,
          y: nextY,
          opacity,
          scale,
        };
      });

      trailRef.current = nextTrail;
      setCursorTrail(nextTrail);
      window.requestAnimationFrame(animateTrail);
    };

    trailRef.current = Array.from({ length: 16 }, (_, index) => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      opacity: 0,
      scale: 0.3 + index * 0.01,
    }));

    const animationFrame = window.requestAnimationFrame(animateTrail);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.cancelAnimationFrame(animationFrame);
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="max-w-7xl mx-auto relative">
      <div
        className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/95 transition-all duration-700 ${isIntroVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-[0_0_70px_rgba(255,255,255,0.14)] backdrop-blur-xl">
          <div className="h-16 w-16 rounded-full border border-white/20 animate-pulse" />
          <span className="absolute text-sm font-semibold uppercase tracking-[0.35em] text-white/80">Areeb</span>
        </div>
      </div>

      <div
        className="fixed top-0 left-0 h-1 z-[60] bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500 transition-all duration-300"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="pointer-events-none fixed inset-0 z-[35] overflow-hidden">
        {cursorTrail.map((particle, index) => (
          <span
            key={`${particle.x}-${particle.y}-${index}`}
            className="cursor-particle"
            style={{
              left: particle.x,
              top: particle.y,
              opacity: particle.opacity,
              transform: `translate(-50%, -50%) scale(${particle.scale})`,
              width: `${6 + index * 0.3}px`,
              height: `${6 + index * 0.3}px`,
            }}
          />
        ))}
      </div>

      <div
        className={`pointer-events-none fixed z-[40] h-4 w-4 rounded-full border border-white/70 bg-white/90 shadow-[0_0_26px_rgba(255,255,255,0.45)] transition-all duration-150 ${cursorGlow.visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
        style={{ left: cursorGlow.x - 8, top: cursorGlow.y - 8 }}
      />

      <Navbar activeSection={activeSection} theme={theme} toggleTheme={toggleTheme} />

      <div data-reveal className="reveal-element">
        <Hero />
      </div>
      <div data-reveal className="reveal-element">
        <About />
      </div>
      <div data-reveal className="reveal-element">
        <Projects />
      </div>
      <div data-reveal className="reveal-element">
        <Skills />
      </div>
      <div data-reveal className="reveal-element">
        <Clients />
      </div>
      <div data-reveal className="reveal-element">
        <WorkExperience />
      </div>
      <div data-reveal className="reveal-element">
        <Contact />
      </div>
      <Footer />

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full border border-cyan-400/40 bg-black/70 px-4 py-3 text-sm text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,0.2)] backdrop-blur transition-all hover:-translate-y-1 hover:bg-black">
          ↑ Top
        </button>
      )}
    </main>
  );
};

export default App;
