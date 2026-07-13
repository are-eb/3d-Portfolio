import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import useInView from '../hooks/useInView.js';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

const heroParticles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: `${(index * 7.5) % 100}%`,
  top: `${(index * 13) % 100}%`,
  delay: `${index * 0.7}s`,
  size: `${2 + (index % 3)}px`,
}));

const Hero = () => {
  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });
  const [heroRef, isHeroInView] = useInView();

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  const shouldRender3D = !isMobile && isHeroInView;

  return (
    <section className="hero-shell relative isolate min-h-screen w-full overflow-hidden" id="home">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.04),transparent_60%)]" />

      <div className="relative z-20 flex min-h-screen flex-col justify-center px-0 pb-24 pt-24 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {heroParticles.map((particle) => (
            <span
              key={particle.id}
              className="particle-orb absolute rounded-full bg-white/30"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-3 c-space text-center">
          <p className="text-xl font-medium text-[color:var(--text)] font-generalsans sm:text-3xl">
            Hi, I am Areeb <span className="waving-hand">👋</span>
          </p>
          <p className="hero_tag text-gray_gradient">Developer</p>
          <p className="mx-auto max-w-2xl text-sm text-[color:var(--muted)] sm:text-base">
            I build fast, modern web experiences with a strong focus on performance, design, and clean engineering.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {['React', 'Three.js', 'Node.js', 'Java', 'UI Systems'].map((item) => (
              <span key={item} className="hero-pill">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 grid w-full max-w-3xl gap-3 sm:grid-cols-3">
            {[
              { label: 'Experience', value: '3+ years' },
              { label: 'Focus', value: 'Performance-first' },
              { label: 'Delivery', value: 'Modern UI + API' },
            ].map((stat) => (
              <div key={stat.label} className="hero-metric">
                <p className="text-[10px] uppercase tracking-[0.25em] text-[color:var(--muted)]">{stat.label}</p>
                <p className="mt-1 text-sm font-semibold text-[color:var(--text)]">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={heroRef}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-70"
        >
          {shouldRender3D ? (
            <Canvas
              className="h-full w-full"
              dpr={[1, 1.5]}
              gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
              performance={{ min: 0.5 }}>
              <Suspense fallback={<CanvasLoader />}>
                <Leva hidden />
                <PerspectiveCamera makeDefault position={[0, 0, 32]} />
                <color attach="background" args={['#000000']} />
                <fog attach="fog" args={['#000000', 18, 48]} />
                <ambientLight intensity={0.75} />
                <pointLight position={[0, 7, 10]} intensity={1.8} color="#f8fafc" />
                <pointLight position={[6, 2, 6]} intensity={1.2} color="#ffffff" />
                <directionalLight position={[10, 10, 10]} intensity={1.1} color="#ffffff" />

                <HeroCamera isMobile={isMobile}>
                  <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />
                </HeroCamera>

                <group>
                  <Target position={sizes.targetPosition} />
                  <ReactLogo position={sizes.reactLogoPosition} />
                  <Rings position={sizes.ringPosition} />
                  <Cube position={sizes.cubePosition} />
                </group>
              </Suspense>
            </Canvas>
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(40,40,80,0.25),transparent_60%)]" />
          )}
        </div>

        <div className="relative z-20 mt-8 flex flex-col items-center justify-center gap-3 c-space sm:flex-row">
          <a href="#about" className="w-full sm:w-fit">
            <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
          </a>
          <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)]">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400" />
            Open for freelance & remote work
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
