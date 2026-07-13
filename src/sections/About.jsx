import { useState } from 'react';
import Globe from 'react-globe.gl';
import { useMediaQuery } from 'react-responsive';

import Button from '../components/Button.jsx';
import useInView from '../hooks/useInView.js';

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [aboutRef, isAboutInView] = useInView();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const shouldRenderGlobe = !isMobile && isAboutInView;

  const handleCopy = () => {
    navigator.clipboard.writeText(' mohdareeb0207@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-cyan-400 text-sm uppercase tracking-[0.3em]">About me</p>
        <p className="head-text">Crafting thoughtful digital experiences</p>
      </div>
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container section-card" data-reveal>
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I’m Mohd Areeb</p>
              <p className="grid-subtext">
                I have honed my skills in both frontend and backend dev, creating dynamic
                and responsive websites.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container section-card" data-reveal>
            <img src="assets/grid2.png" alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                applications.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['React', 'Tailwind', 'Three.js', 'Node.js', 'Java', 'Spring'].map((skill) => (
                  <span key={skill} className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div ref={aboutRef} className="grid-container section-card" data-reveal>
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              {shouldRenderGlobe ? (
                <Globe
                  height={326}
                  width={326}
                  backgroundColor="rgba(0, 0, 0, 0)"
                  backgroundImageOpacity={0.5}
                  showAtmosphere
                  showGraticules
                  globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  labelsData={[{ lat: 40, lng: -100, text: 'Rjieka, Croatia', color: 'white', size: 15 }]}
                />
              ) : (
                <div className="w-[326px] h-[326px] rounded-full border border-black-300 bg-black-300/70" />
              )}
            </div>
            <div>
              <p className="grid-headtext">I’m very flexible with time zone communications & locations</p>
              <p className="grid-subtext">I&apos;m based in Delhi, India and open to work worldwide.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container section-card" data-reveal>
            <img src="assets/grid3.png" alt="grid-3" className="w-full sm:h-[266px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container section-card" data-reveal>
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">mohdareeb0207@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
