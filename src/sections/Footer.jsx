const Footer = () => {
  return (
    <footer className="c-space pt-7 pb-3" data-reveal>
      <div className="flex flex-wrap items-center justify-between gap-5 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface)]/70 px-5 py-4 shadow-[0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-xl">
        <div className="flex gap-2 text-sm text-[color:var(--muted)]">
          <p>Built with React, Vite, and Tailwind</p>
        </div>

        <div className="flex gap-3">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
            <img src="/assets/github.svg" alt="github" className="h-1/2 w-1/2" />
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="social-icon">
            <img src="/assets/twitter.svg" alt="twitter" className="h-1/2 w-1/2" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon">
            <img src="/assets/instagram.svg" alt="instagram" className="h-1/2 w-1/2" />
          </a>
        </div>

        <p className="text-sm text-[color:var(--muted)]">© 2026 Mohd Areeb. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
