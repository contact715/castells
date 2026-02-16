import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { SERVICE_CATEGORIES } from '../../data/services';
import { Zap, Target, Sparkles } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════
 *  COLORS
 * ═══════════════════════════════════════════════════════════════════════ */
const CORAL = '#E08576';
const SOL_BLUE = '#7C9CFF';

/* ═══════════════════════════════════════════════════════════════════════
 *  LAYOUT — carefully spaced positions (SVG viewBox 0 0 1000 800)
 * ═══════════════════════════════════════════════════════════════════════ */
const CENTER = { x: 520, y: 420 };

const SVC_POS: Record<string, { x: number; y: number }> = {
  branding:    { x: 600, y: 230 },
  development: { x: 740, y: 420 },
  automation:  { x: 520, y: 640 },
  advertising: { x: 310, y: 420 },
};

const SVC_SUBS: Record<string, { x: number; y: number }[]> = {
  branding: [
    { x: 510, y: 110 }, { x: 630, y: 95 }, { x: 740, y: 120 },
    { x: 470, y: 170 }, { x: 730, y: 195 },
  ],
  development: [
    { x: 870, y: 310 }, { x: 895, y: 420 }, { x: 870, y: 530 },
    { x: 780, y: 570 }, { x: 775, y: 300 },
  ],
  automation: [
    { x: 660, y: 700 }, { x: 530, y: 740 }, { x: 380, y: 730 },
    { x: 350, y: 650 }, { x: 660, y: 600 },
  ],
  advertising: [
    { x: 170, y: 345 }, { x: 150, y: 440 }, { x: 170, y: 540 },
    { x: 310, y: 560 }, { x: 180, y: 295 },
  ],
};

const SOL_POS = { x: 340, y: 285 };
const MOSCO_POS = { x: 270, y: 130 };
const MODULES = [
  { x: 380, y: 50, name: 'AI Lead Profiler', slug: 'ai-lead-profiler' },
  { x: 195, y: 45, name: 'Smart Forms', slug: 'smart-forms' },
  { x: 155, y: 150, name: 'AI Chat', slug: 'ai-chat' },
  { x: 175, y: 235, name: 'Speed-Dialer', slug: 'speed-dialer' },
];

/* ═══════════════════════════════════════════════════════════════════════
 *  CURVATURES
 * ═══════════════════════════════════════════════════════════════════════ */
const MAIN_CURVE: Record<string, number> = {
  branding: 0.10, development: -0.08, automation: 0.12, advertising: -0.10,
};
const SUB_CURVE: Record<string, number[]> = {
  branding:    [0.10, -0.08, 0.14, -0.06, 0.12],
  development: [-0.10, 0.12, -0.06, 0.18, -0.14],
  automation:  [0.08, -0.12, 0.10, -0.16, 0.06],
  advertising: [-0.14, 0.10, -0.08, 0.12, -0.10],
};
const SOL_CURVE = {
  toSol: -0.12,
  toMosco: 0.10,
  modules: [0.12, -0.10, 0.08, -0.14],
};

/* ═══════════════════════════════════════════════════════════════════════
 *  TEXT BLOCKS (left column)
 * ═══════════════════════════════════════════════════════════════════════ */
const TEXT_BLOCKS = [
  { icon: Zap, title: 'Full-stack growth engine', description: 'From brand identity to lead conversion — we build every layer of your digital infrastructure so nothing falls through the cracks.' },
  { icon: Target, title: 'Dominate your local market', description: 'We combine advertising precision with automation systems, so you capture demand and convert it — on autopilot.' },
  { icon: Sparkles, title: 'Built to scale', description: 'Every website, campaign, and pipeline we build is designed to grow with your business — from first lead to market leader.' },
];

/* ═══════════════════════════════════════════════════════════════════════
 *  HELPERS
 * ═══════════════════════════════════════════════════════════════════════ */
function qCurve(x1: number, y1: number, x2: number, y2: number, c: number): string {
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len, ny = dx / len;
  const off = len * c;
  return `M ${x1} ${y1} Q ${mx + nx * off} ${my + ny * off} ${x2} ${y2}`;
}

/* Deterministic pseudo-random — consistent across renders but looks chaotic */
function prand(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/* ═══════════════════════════════════════════════════════════════════════
 *  CSS KEYFRAMES — draw-in animation + text fade-in only.
 *  Labels are STATIC (no floating).
 * ═══════════════════════════════════════════════════════════════════════ */
const CSS = `
@keyframes cst-draw {
  from { stroke-dashoffset: 1; }
  to   { stroke-dashoffset: 0; }
}
@keyframes cst-fadein {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.cst-path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}
.cst-drawn .cst-path {
  animation: cst-draw var(--draw-dur, 1.2s) var(--draw-delay, 0s) ease-out forwards;
}
.cst-text-enter {
  opacity: 0;
  transform: translateY(20px);
}
.cst-drawn .cst-text-enter {
  animation: cst-fadein 0.5s var(--text-delay, 0s) ease-out forwards;
}
`;

/* ═══════════════════════════════════════════════════════════════════════
 *  COMPONENT
 * ═══════════════════════════════════════════════════════════════════════ */
const ServicesConstellationSection: React.FC = React.memo(() => {
  const [hovered, setHovered] = useState<string | null>(null);
  const onHover = useCallback((id: string | null) => setHovered(id), []);

  /* Single IntersectionObserver for draw-in */
  const sectionRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setDrawn(true); obs.disconnect(); }
      },
      { rootMargin: '0px 0px -100px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const prefersReduced = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Pre-compute paths (with endpoint coords for gradients) ────── */
  const svcMainPaths = useMemo(() =>
    SERVICE_CATEGORIES.map((cat) => {
      const p = SVC_POS[cat.id];
      return {
        id: cat.id,
        d: qCurve(CENTER.x, CENTER.y, p.x, p.y, MAIN_CURVE[cat.id] ?? 0.1),
        x1: CENTER.x, y1: CENTER.y, x2: p.x, y2: p.y,
      };
    }), []
  );

  const svcSubPaths = useMemo(() =>
    SERVICE_CATEGORIES.flatMap((cat) => {
      const cp = SVC_POS[cat.id];
      return (SVC_SUBS[cat.id] || []).map((s, i) => ({
        catId: cat.id, idx: i,
        d: qCurve(cp.x, cp.y, s.x, s.y, (SUB_CURVE[cat.id] || [])[i] ?? 0.08),
        x1: cp.x, y1: cp.y, x2: s.x, y2: s.y,
      }));
    }), []
  );

  const solPaths = useMemo(() => ({
    centerToSol: {
      d: qCurve(CENTER.x, CENTER.y, SOL_POS.x, SOL_POS.y, SOL_CURVE.toSol),
      x1: CENTER.x, y1: CENTER.y, x2: SOL_POS.x, y2: SOL_POS.y,
    },
    solToMosco: {
      d: qCurve(SOL_POS.x, SOL_POS.y, MOSCO_POS.x, MOSCO_POS.y, SOL_CURVE.toMosco),
      x1: SOL_POS.x, y1: SOL_POS.y, x2: MOSCO_POS.x, y2: MOSCO_POS.y,
    },
    modules: MODULES.map((m, i) => ({
      d: qCurve(MOSCO_POS.x, MOSCO_POS.y, m.x, m.y, SOL_CURVE.modules[i] ?? 0.1),
      x1: MOSCO_POS.x, y1: MOSCO_POS.y, x2: m.x, y2: m.y,
    })),
  }), []);

  const solActive = hovered === 'solutions';

  /* ─── Gradient helper: 4-stop fade at endpoints ─────────────────── */
  const Grad = ({ id, x1, y1, x2, y2, color, peak }: {
    id: string; x1: number; y1: number; x2: number; y2: number;
    color: string; peak: number;
  }) => (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1={x1} y1={y1} x2={x2} y2={y2}>
      <stop offset="0" stopColor={color} stopOpacity="0" />
      <stop offset="0.25" stopColor={color} stopOpacity={peak} />
      <stop offset="0.75" stopColor={color} stopOpacity={peak} />
      <stop offset="1" stopColor={color} stopOpacity="0" />
    </linearGradient>
  );

  return (
    <section className="pt-12 md:pt-16 pb-24 md:pb-32 bg-[#191919] dark:bg-[#191919] relative">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="container mx-auto px-6 relative z-content">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Our Expertise</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight text-white">
            Full-Stack Solutions For<br /><span className="text-white/40">Modern Growth</span>
          </h2>
          <p className="text-lg text-white/50 leading-relaxed mt-4 max-w-2xl">
            From lead generation to conversion optimization, we build the infrastructure your business needs to dominate.
          </p>
        </div>

        <div ref={sectionRef} className={`grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8 lg:gap-12 items-start${drawn ? ' cst-drawn' : ''}`}>
          {/* LEFT — sticky text blocks */}
          <div className="flex flex-col lg:sticky lg:top-28 h-fit">
            {TEXT_BLOCKS.map((b, i) => (
              <div
                key={b.title}
                className="py-8 border-t border-white/10 first:border-t-0 cst-text-enter"
                style={{ '--text-delay': `${i * 0.1}s` } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-[2rem] bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 md:w-6 md:h-6 text-coral" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white">{b.title}</h3>
                </div>
                <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-[340px]">{b.description}</p>
              </div>
            ))}
          </div>

          {/* RIGHT — constellation */}
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '10 / 8' }}>
            <svg viewBox="0 0 1000 800" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                {/* ═══ FADE GRADIENTS — each line fades at both endpoints ═══ */}

                {/* Main service lines: center → category */}
                {svcMainPaths.map(p => {
                  const active = hovered === p.id;
                  return <Grad key={`g-sm-${p.id}`} id={`g-sm-${p.id}`}
                    x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                    color={active ? CORAL : '#ffffff'} peak={active ? 0.55 : 0.25} />;
                })}

                {/* Sub service lines: category → subs */}
                {svcSubPaths.map(p => {
                  const active = hovered === p.catId;
                  return <Grad key={`g-ss-${p.catId}-${p.idx}`} id={`g-ss-${p.catId}-${p.idx}`}
                    x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                    color={active ? CORAL : '#ffffff'} peak={active ? 0.35 : 0.16} />;
                })}

                {/* Solutions chain: center → Sol → MOSCO → modules */}
                <Grad id="g-sol-0"
                  x1={solPaths.centerToSol.x1} y1={solPaths.centerToSol.y1}
                  x2={solPaths.centerToSol.x2} y2={solPaths.centerToSol.y2}
                  color={SOL_BLUE} peak={solActive ? 0.6 : 0.30} />
                <Grad id="g-sol-1"
                  x1={solPaths.solToMosco.x1} y1={solPaths.solToMosco.y1}
                  x2={solPaths.solToMosco.x2} y2={solPaths.solToMosco.y2}
                  color={SOL_BLUE} peak={solActive ? 0.6 : 0.30} />
                {solPaths.modules.map((m, i) => (
                  <Grad key={`g-mod-${i}`} id={`g-mod-${i}`}
                    x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
                    color={SOL_BLUE} peak={solActive ? 0.45 : 0.20} />
                ))}

                {/* ═══ IMPULSE FADE GRADIENTS — impulses also fade at endpoints ═══ */}
                {svcMainPaths.map(p => (
                  <Grad key={`gi-sm-${p.id}`} id={`gi-sm-${p.id}`}
                    x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                    color={CORAL} peak={1} />
                ))}
                {svcSubPaths.map(p => (
                  <Grad key={`gi-ss-${p.catId}-${p.idx}`} id={`gi-ss-${p.catId}-${p.idx}`}
                    x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2}
                    color={CORAL} peak={1} />
                ))}
                <Grad id="gi-sol-0"
                  x1={solPaths.centerToSol.x1} y1={solPaths.centerToSol.y1}
                  x2={solPaths.centerToSol.x2} y2={solPaths.centerToSol.y2}
                  color={SOL_BLUE} peak={1} />
                <Grad id="gi-sol-1"
                  x1={solPaths.solToMosco.x1} y1={solPaths.solToMosco.y1}
                  x2={solPaths.solToMosco.x2} y2={solPaths.solToMosco.y2}
                  color={SOL_BLUE} peak={1} />
                {solPaths.modules.map((m, i) => (
                  <Grad key={`gi-mod-${i}`} id={`gi-mod-${i}`}
                    x1={m.x1} y1={m.y1} x2={m.x2} y2={m.y2}
                    color={SOL_BLUE} peak={1} />
                ))}
              </defs>

              {/* ═══ SERVICE MAIN LINES (center → category) ═══ */}
              {svcMainPaths.map((p, i) => (
                <path key={`sm-${p.id}`} d={p.d} fill="none"
                  pathLength={1} className="cst-path"
                  stroke={`url(#g-sm-${p.id})`}
                  strokeWidth={hovered === p.id ? 2 : 1.2}
                  style={{
                    '--draw-dur': '1.2s',
                    '--draw-delay': `${i * 0.15}s`,
                    transition: 'stroke-width 0.4s ease',
                  } as React.CSSProperties}
                />
              ))}

              {/* ═══ SERVICE SUB LINES (category → subs) ═══ */}
              {svcSubPaths.map((p, i) => (
                <path key={`ss-${p.catId}-${p.idx}`} d={p.d} fill="none"
                  pathLength={1} className="cst-path"
                  stroke={`url(#g-ss-${p.catId}-${p.idx})`}
                  strokeWidth={0.9}
                  style={{
                    '--draw-dur': '0.8s',
                    '--draw-delay': `${0.6 + i * 0.04}s`,
                  } as React.CSSProperties}
                />
              ))}

              {/* ═══ SOLUTIONS CHAIN LINES (blue) ═══ */}
              <path d={solPaths.centerToSol.d} fill="none" pathLength={1} className="cst-path"
                stroke="url(#g-sol-0)"
                strokeWidth={solActive ? 2 : 1.2}
                style={{ '--draw-dur': '1.2s', '--draw-delay': '0.6s', transition: 'stroke-width 0.4s ease' } as React.CSSProperties}
              />
              <path d={solPaths.solToMosco.d} fill="none" pathLength={1} className="cst-path"
                stroke="url(#g-sol-1)"
                strokeWidth={solActive ? 2 : 1.2}
                style={{ '--draw-dur': '1.0s', '--draw-delay': '0.9s', transition: 'stroke-width 0.4s ease' } as React.CSSProperties}
              />
              {solPaths.modules.map((m, i) => (
                <path key={`mod-${i}`} d={m.d} fill="none" pathLength={1} className="cst-path"
                  stroke={`url(#g-mod-${i})`}
                  strokeWidth={0.9}
                  style={{ '--draw-dur': '0.8s', '--draw-delay': `${1.2 + i * 0.1}s` } as React.CSSProperties}
                />
              ))}

              {/* ═══ IMPULSES — services (coral), chaotic + endpoint-faded ═══ */}
              {!prefersReduced && svcMainPaths.map((p, i) => {
                const seed = i * 31 + 7;
                const dur = 3.5 + prand(seed) * 4;
                const begin = 1 + prand(seed + 1) * 3;
                const active = hovered === p.id;
                const grad = `url(#gi-sm-${p.id})`;
                return (
                  <g key={`imp-${p.id}`} style={{ transition: 'opacity 0.4s ease' }}>
                    <path d={p.d} pathLength={1000} fill="none"
                      stroke={grad} strokeWidth="3.5" strokeLinecap="round"
                      strokeDasharray="70 9930"
                      opacity={active ? 0.18 : 0.07}>
                      <animate attributeName="stroke-dashoffset"
                        from="70" to="-1070"
                        dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                    </path>
                    <path d={p.d} pathLength={1000} fill="none"
                      stroke={grad} strokeWidth="1.5" strokeLinecap="round"
                      strokeDasharray="30 9970"
                      opacity={active ? 0.75 : 0.35}>
                      <animate attributeName="stroke-dashoffset"
                        from="50" to="-1090"
                        dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                    </path>
                  </g>
                );
              })}

              {/* ═══ SUB-SERVICE IMPULSES (coral), independent + endpoint-faded ═══ */}
              {!prefersReduced && svcSubPaths.map((p, i) => {
                const seed = i * 17 + 53;
                const dur = 3 + prand(seed) * 5;
                const begin = 1.5 + prand(seed + 1) * 4;
                const active = hovered === p.catId;
                return (
                  <path key={`sub-imp-${p.catId}-${p.idx}`} d={p.d}
                    pathLength={1000} fill="none"
                    stroke={`url(#gi-ss-${p.catId}-${p.idx})`} strokeWidth="1.2" strokeLinecap="round"
                    strokeDasharray="35 9965"
                    opacity={active ? 0.45 : 0.15}
                    style={{ transition: 'opacity 0.4s ease' }}>
                    <animate attributeName="stroke-dashoffset"
                      from="35" to="-1035"
                      dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                  </path>
                );
              })}

              {/* ═══ IMPULSES — solutions chain (blue), chaotic + endpoint-faded ═══ */}
              {!prefersReduced && (
                <>
                  {(() => {
                    const dur = 3.5 + prand(200) * 3.5;
                    const begin = 1.5 + prand(201) * 2.5;
                    return (
                      <g style={{ transition: 'opacity 0.4s ease' }}>
                        <path d={solPaths.centerToSol.d} pathLength={1000} fill="none"
                          stroke="url(#gi-sol-0)" strokeWidth="3.5" strokeLinecap="round"
                          strokeDasharray="70 9930"
                          opacity={solActive ? 0.18 : 0.07}>
                          <animate attributeName="stroke-dashoffset"
                            from="70" to="-1070"
                            dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                        </path>
                        <path d={solPaths.centerToSol.d} pathLength={1000} fill="none"
                          stroke="url(#gi-sol-0)" strokeWidth="1.5" strokeLinecap="round"
                          strokeDasharray="30 9970"
                          opacity={solActive ? 0.75 : 0.35}>
                          <animate attributeName="stroke-dashoffset"
                            from="50" to="-1090"
                            dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                        </path>
                      </g>
                    );
                  })()}
                  {(() => {
                    const dur = 3 + prand(210) * 4;
                    const begin = 2 + prand(211) * 3;
                    return (
                      <g style={{ transition: 'opacity 0.4s ease' }}>
                        <path d={solPaths.solToMosco.d} pathLength={1000} fill="none"
                          stroke="url(#gi-sol-1)" strokeWidth="3.5" strokeLinecap="round"
                          strokeDasharray="70 9930"
                          opacity={solActive ? 0.18 : 0.07}>
                          <animate attributeName="stroke-dashoffset"
                            from="70" to="-1070"
                            dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                        </path>
                        <path d={solPaths.solToMosco.d} pathLength={1000} fill="none"
                          stroke="url(#gi-sol-1)" strokeWidth="1.5" strokeLinecap="round"
                          strokeDasharray="30 9970"
                          opacity={solActive ? 0.75 : 0.35}>
                          <animate attributeName="stroke-dashoffset"
                            from="50" to="-1090"
                            dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                        </path>
                      </g>
                    );
                  })()}
                  {solPaths.modules.map((m, i) => {
                    const seed = 220 + i * 13;
                    const dur = 3 + prand(seed) * 4.5;
                    const begin = 2 + prand(seed + 1) * 3.5;
                    return (
                      <path key={`mod-imp-${i}`} d={m.d}
                        pathLength={1000} fill="none"
                        stroke={`url(#gi-mod-${i})`} strokeWidth="1.2" strokeLinecap="round"
                        strokeDasharray="35 9965"
                        opacity={solActive ? 0.45 : 0.15}
                        style={{ transition: 'opacity 0.4s ease' }}>
                        <animate attributeName="stroke-dashoffset"
                          from="35" to="-1035"
                          dur={`${dur.toFixed(2)}s`} repeatCount="indefinite" begin={`${begin.toFixed(2)}s`} />
                      </path>
                    );
                  })}
                </>
              )}

              {/* Dots removed — lines fade naturally at endpoints */}
            </svg>

            {/* ═══ HTML LABELS — all static, no floating animation ═══ */}

            {/* Center — Castells */}
            <div className="absolute flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${CENTER.x / 10}%`, top: `${CENTER.y / 8}%` }}>
              <img src="/castells-logo.png" alt="Castells" className="w-7 h-7 md:w-9 md:h-9" data-no-theme-transition />
              <span className="font-display text-lg md:text-xl font-semibold text-white tracking-tight">Castells</span>
            </div>

            {/* Service category labels */}
            {SERVICE_CATEGORIES.map((cat) => {
              const p = SVC_POS[cat.id]; const active = hovered === cat.id;
              return (
                <a key={`lbl-${cat.id}`} href="/services"
                  className="absolute cursor-pointer z-10"
                  style={{ left: `${p.x / 10}%`, top: `${p.y / 8}%`, transform: 'translate(-50%, -130%)' }}
                  onMouseEnter={() => onHover(cat.id)} onMouseLeave={() => onHover(null)}>
                  <span className="font-display font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-300"
                    style={{ color: active ? CORAL : '#fff' }}>
                    {cat.label}
                  </span>
                </a>
              );
            })}

            {/* Service sub labels — static */}
            {SERVICE_CATEGORIES.map((cat) => {
              const subs = SVC_SUBS[cat.id] || [];
              const active = hovered === cat.id;
              return cat.items.slice(0, 5).map((item, i) => {
                const s = subs[i]; if (!s) return null;
                return (
                  <a key={`sl-${cat.id}-${item.slug}`}
                    href={`/services/${item.slug}`}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{ left: `${s.x / 10}%`, top: `${s.y / 8}%` }}>
                    <span className={`text-[10px] md:text-xs whitespace-nowrap cursor-pointer transition-all duration-300 ${
                      active ? 'underline decoration-dotted underline-offset-2' : ''
                    }`} style={{
                      color: active ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.50)',
                      textDecorationColor: 'rgba(224,133,118,0.3)',
                    }}>
                      {item.name}
                    </span>
                  </a>
                );
              });
            })}

            {/* Solutions label */}
            <a href="https://mosco.ai" target="_blank" rel="noopener noreferrer"
              className="absolute cursor-pointer z-10"
              style={{ left: `${SOL_POS.x / 10}%`, top: `${SOL_POS.y / 8}%`, transform: 'translate(-50%, -130%)' }}
              onMouseEnter={() => onHover('solutions')} onMouseLeave={() => onHover(null)}>
              <span className="font-display font-semibold text-sm md:text-base whitespace-nowrap transition-colors duration-300"
                style={{ color: solActive ? SOL_BLUE : '#fff' }}>
                Solutions
              </span>
            </a>

            {/* MOSCO AI label */}
            <a href="https://mosco.ai" target="_blank" rel="noopener noreferrer"
              className="absolute cursor-pointer z-10"
              style={{ left: `${MOSCO_POS.x / 10}%`, top: `${MOSCO_POS.y / 8}%`, transform: 'translate(-50%, -130%)' }}
              onMouseEnter={() => onHover('solutions')} onMouseLeave={() => onHover(null)}>
              <span className="font-display font-bold text-sm md:text-base whitespace-nowrap transition-colors duration-300"
                style={{ color: solActive ? SOL_BLUE : 'rgba(124,156,255,0.75)' }}>
                MOSCO AI
              </span>
            </a>

            {/* Module labels — static */}
            {MODULES.map((m) => (
              <a key={`ml-${m.slug}`}
                href="https://mosco.ai" target="_blank" rel="noopener noreferrer"
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ left: `${m.x / 10}%`, top: `${m.y / 8}%` }}
                onMouseEnter={() => onHover('solutions')} onMouseLeave={() => onHover(null)}>
                <span className={`text-[10px] md:text-xs whitespace-nowrap cursor-pointer transition-all duration-300 ${
                  solActive ? 'underline decoration-dotted underline-offset-2' : ''
                }`} style={{
                  color: solActive ? 'rgba(124,156,255,0.9)' : 'rgba(124,156,255,0.55)',
                  textDecorationColor: 'rgba(124,156,255,0.3)',
                }}>
                  {m.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ServicesConstellationSection.displayName = 'ServicesConstellationSection';

export default ServicesConstellationSection;
