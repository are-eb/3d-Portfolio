import { skillGroups } from '../constants/index.js';

const SkillRing = ({ label, value, accent }) => {
  const circumference = 2 * Math.PI * 48;
  const progressLength = (circumference * value) / 100;
  const glowLength = Math.max(18, progressLength * 0.16);
  const glowGap = Math.max(26, circumference - glowLength);
  const glowId = `ring-glow-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <svg viewBox="0 0 120 120" className="h-24 w-24 -rotate-90">
          <defs>
            <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="glow"
              />
              <feDropShadow dx="0" dy="0" stdDeviation="2.4" floodColor={accent} floodOpacity="0.95" />
            </filter>
          </defs>

          <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="none" />
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progressLength}
            className="transition-all duration-700"
          />
          <circle
            cx="60"
            cy="60"
            r="48"
            stroke={accent}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${glowLength} ${glowGap}`}
            className="skill-ring"
            opacity="0.95"
            filter={`url(#${glowId})`}
            style={{ '--ring-length': `${progressLength}px` }}
          />
        </svg>
        <span className="absolute text-lg font-semibold text-[color:var(--text)]">{value}%</span>
      </div>
      <p className="text-sm font-medium text-[color:var(--text)]">{label}</p>
    </div>
  );
};

const Skills = () => {
  return (
    <section className="c-space my-20" id="skills">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-400">Skills</p>
        <h3 className="head-text">Modern stack, thoughtful execution</h3>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="grid-container section-card" data-reveal>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { label: 'Frontend', value: 95, accent: '#22d3ee' },
              { label: 'Backend', value: 88, accent: '#a78bfa' },
              { label: 'Product', value: 90, accent: '#f59e0b' },
            ].map((skill) => (
              <SkillRing key={skill.label} {...skill} />
            ))}
          </div>

          <div className="mt-2 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4">
            <p className="text-sm text-[color:var(--muted)]">
              I combine strong UI craft with reliable engineering so each experience feels polished, fast, and scalable.
            </p>
          </div>
        </div>

        <div className="grid-container section-card" data-reveal>
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div key={group.label} className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]/70 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-semibold text-[color:var(--text)]">{group.label}</p>
                  <span className="text-sm text-cyan-300">{group.level}%</span>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="skill-bar h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-fuchsia-500"
                    style={{ width: `${group.level}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-[color:var(--muted)]">{group.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
