import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';

/* ===================== CONFETTI SYSTEM ===================== */
const COLORS = ['#FF6B6B', '#FFE66D', '#4ECDC4', '#45B7D1', '#96E6A1', '#DDA0DD', '#FF9F43', '#EE5A24', '#0ABDE3', '#F368E0', '#FF4757', '#2ED573'];
const EMOJIS = ['🎉', '🔥', '🎊', '✨', '🥳', '💥', '🎆', '🎇', '⭐', '💫', '🌟', '🎵', '🎶', '📱'];

interface ConfettiPiece { id: number; x: number; color: string; delay: number; duration: number; size: number; rotation: number; type: 'rect' | 'circle' | 'emoji'; emoji?: string; drift: number; }
const generateConfetti = (count: number): ConfettiPiece[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, color: COLORS[Math.floor(Math.random() * COLORS.length)],
    delay: Math.random() * 3, duration: 2.5 + Math.random() * 3, size: 6 + Math.random() * 10,
    rotation: Math.random() * 360, type: Math.random() > 0.75 ? 'emoji' : Math.random() > 0.5 ? 'circle' : 'rect',
    emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)], drift: -30 + Math.random() * 60,
  }));

interface Firework { id: number; x: number; y: number; delay: number; color: string; }
const generateFireworks = (count: number): Firework[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, x: 10 + Math.random() * 80, y: 10 + Math.random() * 50, delay: Math.random() * 4, color: COLORS[Math.floor(Math.random() * COLORS.length)] }));

interface Sparkle { id: number; angle: number; distance: number; size: number; delay: number; duration: number; }
const generateSparkles = (count: number): Sparkle[] =>
  Array.from({ length: count }, (_, i) => ({ id: i, angle: (360 / count) * i, distance: 160 + Math.random() * 30, size: 4 + Math.random() * 8, delay: Math.random() * 2, duration: 1 + Math.random() * 1.5 }));

const EQ_COLORS = ['#FF6B6B','#FF4757','#FF9F43','#F58529','#FFE66D','#2ED573','#4ECDC4','#45B7D1','#515BD4','#8134AF','#DD2A7B','#F368E0'];

/* ===================== LEAD THANK YOU PAGE ===================== */
const LeadThankYouPage: React.FC = () => {
  // videoA = instagram_video_2 = lead-thank-you-2.mp4 (plays FIRST — "возьми телефон детка")
  // videoB = instagram_video_1 = lead-thank-you-1.mp4 (plays second)
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState<'A' | 'B'>('A');
  const [showContent, setShowContent] = useState(false);

  const confetti = useMemo(() => generateConfetti(80), []);
  const fireworks = useMemo(() => generateFireworks(8), []);
  const sparkles = useMemo(() => generateSparkles(16), []);

  const soundRef = useRef(false);
  const eqCanvasRef = useRef<HTMLCanvasElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  // Store video center position (relative to viewport) for bg canvas centering
  const videoCenterRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Calculate video center position
  const updateVideoCenter = useCallback(() => {
    const el = videoWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    videoCenterRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  }, []);

  useEffect(() => {
    updateVideoCenter();
    window.addEventListener('resize', updateVideoCenter);
    return () => window.removeEventListener('resize', updateVideoCenter);
  }, [updateVideoCenter]);

  /* ---------- CONNECT AUDIO (only with RUNNING AudioContext) ---------- */
  const connectAudio = useCallback((ctx: AudioContext) => {
    if (ctxRef.current) return;
    // CRITICAL: never connect to suspended context — it kills video audio
    if (ctx.state !== 'running') return;

    ctxRef.current = ctx;
    const analyser = ctx.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    analyserRef.current = analyser;

    let ok = false;
    [videoARef, videoBRef].forEach(ref => {
      if (!ref.current) return;
      try { ctx.createMediaElementSource(ref.current).connect(analyser); ok = true; } catch {}
    });

    if (ok) {
      try { analyser.connect(ctx.destination); } catch {}
      startVisualization();
    } else {
      ctxRef.current = null;
      analyserRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- WARMUP + AUDIO SETUP ---------- */
  useEffect(() => {
    if (videoBRef.current) videoBRef.current.load();

    // 1) Grab pre-created AudioContext from form submit
    const preCtx: AudioContext | null = (window as any).__leadAudioCtx ?? null;
    delete (window as any).__leadAudioCtx;

    // 2) ALWAYS register tap/click fallback — works regardless of preCtx state
    const enableOnTap = () => {
      if (ctxRef.current) return; // EQ already connected
      try {
        const c = new (window.AudioContext || (window as any).webkitAudioContext)();
        if (c.state === 'running') {
          connectAudio(c);
        } else {
          c.resume().then(() => connectAudio(c)).catch(() => {});
        }
      } catch {}
      // Also unmute video if warmup failed
      const v = videoARef.current;
      if (v && v.muted) {
        v.muted = false;
        v.play().then(() => { soundRef.current = true; }).catch(() => {
          v.muted = true; v.play().catch(() => {});
        });
      }
    };
    document.addEventListener('touchstart', enableOnTap, { once: true });
    document.addEventListener('click', enableOnTap, { once: true });

    // 3) Warmup: 1s muted, then unmute
    const warmup = setTimeout(() => {
      const vA = videoARef.current;
      if (!vA) return;

      vA.pause();
      vA.currentTime = 0;
      vA.muted = false;

      vA.play().then(() => {
        soundRef.current = true;
        // Try connecting EQ with pre-created context
        if (preCtx) {
          if (preCtx.state === 'running') {
            connectAudio(preCtx);
          } else {
            preCtx.resume().then(() => connectAudio(preCtx)).catch(() => {});
          }
        }
      }).catch(() => {
        vA.muted = true;
        vA.play().catch(() => {});
      });
    }, 1000);

    return () => {
      clearTimeout(warmup);
      document.removeEventListener('touchstart', enableOnTap);
      document.removeEventListener('click', enableOnTap);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- FULL-SCREEN + EQ VISUALIZATION ---------- */
  const startVisualization = useCallback(() => {
    const analyser = analyserRef.current;
    if (!analyser) return;

    const data = new Uint8Array(analyser.frequencyBinCount);

    // Setup small EQ canvas (around circle)
    const eqCanvas = eqCanvasRef.current;
    let eqCtx: CanvasRenderingContext2D | null = null;
    if (eqCanvas) {
      const SIZE = 360;
      const DPR = Math.min(window.devicePixelRatio || 1, 2);
      eqCanvas.width = SIZE * DPR;
      eqCanvas.height = SIZE * DPR;
      eqCtx = eqCanvas.getContext('2d');
      if (eqCtx) eqCtx.scale(DPR, DPR);
    }

    // Setup full-screen canvas
    const bgCanvas = bgCanvasRef.current;
    let bgCtx: CanvasRenderingContext2D | null = null;
    let bgDPR = 1;
    const resizeBg = () => {
      if (!bgCanvas) return;
      bgDPR = Math.min(window.devicePixelRatio || 1, 2);
      bgCanvas.width = window.innerWidth * bgDPR;
      bgCanvas.height = window.innerHeight * bgDPR;
      bgCtx = bgCanvas.getContext('2d');
      if (bgCtx) bgCtx.scale(bgDPR, bgDPR);
      updateVideoCenter();
    };
    resizeBg();
    window.addEventListener('resize', resizeBg);

    const glow = glowRef.current;

    // Smoothed bass for video pulse (avoid jitter)
    let smoothBass = 0;

    const loop = () => {
      const ctx = ctxRef.current;
      if (ctx?.state === 'suspended') ctx.resume();
      analyser.getByteFrequencyData(data);

      const binCount = data.length;
      let bass = 0, mid = 0, high = 0, overall = 0;
      for (let i = 0; i < binCount; i++) {
        const v = data[i];
        overall += v;
        if (i < binCount * 0.15) bass += v;
        else if (i < binCount * 0.5) mid += v;
        else high += v;
      }
      bass /= (binCount * 0.15 * 255);
      mid /= (binCount * 0.35 * 255);
      high /= (binCount * 0.5 * 255);
      overall /= (binCount * 255);

      // Smooth bass for pulse (lerp)
      smoothBass += (bass - smoothBass) * 0.3;

      /* ---- VIDEO PULSE (bass-driven scale) ---- */
      if (glow) {
        const scale = 1 + smoothBass * 0.15;
        const s1 = 20 + bass * 60, s2 = 40 + bass * 100, s3 = 70 + bass * 140;
        const r = Math.round(255 * bass + 78 * (1 - bass));
        const g = Math.round(107 * bass + 205 * (1 - bass));
        const b = Math.round(107 * (1 - bass) + 196 * bass);
        glow.style.transform = `scale(${scale})`;
        glow.style.boxShadow = `0 0 ${s1}px rgba(${r},${g},${b},${0.4 + bass * 0.5}), 0 0 ${s2}px rgba(${r},${g},${b},${0.2 + bass * 0.3}), 0 0 ${s3}px rgba(${r},${g},${b},${0.1 + bass * 0.25})`;
        glow.style.borderColor = `rgba(255,255,255,${0.15 + bass * 0.7})`;
      }

      /* ---- FULL-SCREEN WAVES (centered on video) ---- */
      if (bgCtx && bgCanvas) {
        const W = window.innerWidth, H = window.innerHeight;
        // Center on the video circle, not viewport center
        const cx = videoCenterRef.current.x || W / 2;
        const cy = videoCenterRef.current.y || H / 2;
        bgCtx.setTransform(bgDPR, 0, 0, bgDPR, 0, 0);
        bgCtx.clearRect(0, 0, W, H);

        // 1) Large pulsing radial rings — expand outward from video center
        for (let r = 7; r >= 0; r--) {
          const fi = Math.floor((r / 8) * binCount);
          const v = data[fi] / 255;
          const baseR = 180 + r * 90;
          const radius = baseR + v * 200;
          const ci = r % EQ_COLORS.length;

          bgCtx.beginPath();
          bgCtx.arc(cx, cy, radius, 0, Math.PI * 2);
          bgCtx.strokeStyle = EQ_COLORS[ci];
          bgCtx.globalAlpha = v * 0.25;
          bgCtx.lineWidth = 3 + v * 15;
          bgCtx.stroke();

          // Soft glow fill
          const grad = bgCtx.createRadialGradient(cx, cy, radius * 0.85, cx, cy, radius);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(1, EQ_COLORS[ci]);
          bgCtx.fillStyle = grad;
          bgCtx.globalAlpha = v * 0.08;
          bgCtx.beginPath();
          bgCtx.arc(cx, cy, radius, 0, Math.PI * 2);
          bgCtx.fill();
        }

        // 2) Expanding wave arcs — bass/mid/high driven
        for (let w = 0; w < 6; w++) {
          const band = w < 2 ? bass : w < 4 ? mid : high;
          const waveR = 160 + w * 110 + band * 250;
          const startAngle = (w * Math.PI) / 3 + performance.now() * 0.0003 * (w % 2 === 0 ? 1 : -1);
          bgCtx.beginPath();
          bgCtx.arc(cx, cy, waveR, startAngle, startAngle + Math.PI * (0.8 + band * 0.6));
          bgCtx.strokeStyle = EQ_COLORS[(w * 2) % EQ_COLORS.length];
          bgCtx.globalAlpha = band * 0.35;
          bgCtx.lineWidth = 4 + band * 20;
          bgCtx.lineCap = 'round';
          bgCtx.stroke();
        }

        // 3) Color wash — whole background shifts hue
        const bgGrad = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.7);
        bgGrad.addColorStop(0, `rgba(${Math.round(200 * bass)}, ${Math.round(80 * mid)}, ${Math.round(180 * high)}, ${0.08 + bass * 0.2})`);
        bgGrad.addColorStop(0.4, `rgba(${Math.round(60 * high)}, ${Math.round(40 * bass)}, ${Math.round(180 * mid)}, ${0.04 + overall * 0.1})`);
        bgGrad.addColorStop(1, 'transparent');
        bgCtx.globalAlpha = 1;
        bgCtx.fillStyle = bgGrad;
        bgCtx.fillRect(0, 0, W, H);

        bgCtx.globalAlpha = 1;
        bgCtx.lineCap = 'butt';
      }

      /* ---- EQ BARS AROUND CIRCLE ---- */
      if (eqCtx) {
        const SIZE = 360;
        eqCtx.clearRect(0, 0, SIZE, SIZE);
        const BARS = 64, CENTER = SIZE / 2, R_INNER = 146, BAR_MAX = 40;

        for (let i = 0; i < BARS; i++) {
          const angle = (i / BARS) * Math.PI * 2 - Math.PI / 2;
          const fi = Math.floor((i / BARS) * binCount);
          const v = data[fi] / 255;
          const h = v * BAR_MAX + 2;
          const cos = Math.cos(angle), sin = Math.sin(angle);
          const x1 = CENTER + cos * R_INNER, y1 = CENTER + sin * R_INNER;
          const x2 = CENTER + cos * (R_INNER + h), y2 = CENTER + sin * (R_INNER + h);
          const ci = Math.floor((i / BARS) * EQ_COLORS.length) % EQ_COLORS.length;

          eqCtx.strokeStyle = EQ_COLORS[ci];
          eqCtx.lineCap = 'round';
          eqCtx.lineWidth = 8;
          eqCtx.globalAlpha = v * 0.2;
          eqCtx.beginPath(); eqCtx.moveTo(x1, y1); eqCtx.lineTo(x2, y2); eqCtx.stroke();
          eqCtx.lineWidth = 3;
          eqCtx.globalAlpha = 0.4 + v * 0.6;
          eqCtx.beginPath(); eqCtx.moveTo(x1, y1); eqCtx.lineTo(x2, y2); eqCtx.stroke();
        }
        eqCtx.globalAlpha = 1;
      }

      frameRef.current = requestAnimationFrame(loop);
    };
    loop();

    return () => window.removeEventListener('resize', resizeBg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      cancelAnimationFrame(frameRef.current);
      ctxRef.current?.close().catch(() => {});
    };
  }, []);

  /* ---------- VIDEO SWITCHING ---------- */
  const switchTo = useCallback((next: 'A' | 'B') => {
    setCurrentVideo(next);
    const v = (next === 'A' ? videoARef : videoBRef).current;
    if (!v) return;
    v.currentTime = 0;
    v.muted = !soundRef.current;
    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
  }, []);

  const handleVideoAEnd = useCallback(() => switchTo('B'), [switchTo]);
  const handleVideoBEnd = useCallback(() => switchTo('A'), [switchTo]);

  return (
    <>
      <style>{`
        @keyframes ty-confetti-fall { 0% { transform: translateY(-20px) rotate(0deg); opacity:1; } 80% { opacity:1; } 100% { transform: translateY(100vh) rotate(720deg); opacity:0; } }
        @keyframes ty-firework-burst { 0% { transform: scale(0); opacity:1; } 50% { transform: scale(1); opacity:0.9; } 100% { transform: scale(1.5); opacity:0; } }
        @keyframes ty-firework-ring { 0% { box-shadow: 0 0 0 0px currentColor; opacity:1; } 100% { box-shadow: 0 0 0 30px currentColor; opacity:0; } }
        @keyframes ty-sparkle { 0%,100% { transform: scale(0) rotate(0deg); opacity:0; } 50% { transform: scale(1) rotate(180deg); opacity:1; } }
        @keyframes ty-float-emoji { 0% { transform: translateY(0) scale(1); opacity:0.9; } 50% { transform: translateY(-30px) scale(1.2); opacity:1; } 100% { transform: translateY(-60px) scale(0.8); opacity:0; } }
        @keyframes ty-slide-up { 0% { transform: translateY(30px); opacity:0; } 100% { transform: translateY(0); opacity:1; } }
        @keyframes ty-bounce-in { 0% { transform: scale(0.3); opacity:0; } 50% { transform: scale(1.05); } 70% { transform: scale(0.95); } 100% { transform: scale(1); opacity:1; } }
        @keyframes ty-shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes ty-ring-rotate { 0% { transform: translate(-50%,-50%) rotate(0deg); } 100% { transform: translate(-50%,-50%) rotate(360deg); } }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, background: '#0a0a0f',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px', overflow: 'hidden', zIndex: 50,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}>

        {/* Full-screen audio-reactive canvas — centered on video */}
        <canvas ref={bgCanvasRef} style={{
          position: 'fixed', inset: 0, width: '100%', height: '100%',
          pointerEvents: 'none', zIndex: 2,
        }} />

        {/* Confetti */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {confetti.map((p) => (
            <div key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: -20,
              width: p.type === 'emoji' ? 'auto' : p.size,
              height: p.type === 'emoji' ? 'auto' : p.type === 'rect' ? p.size * 0.6 : p.size,
              backgroundColor: p.type !== 'emoji' ? p.color : undefined,
              borderRadius: p.type === 'circle' ? '50%' : p.type === 'rect' ? 2 : 0,
              fontSize: p.type === 'emoji' ? p.size * 1.5 : undefined,
              animation: `ty-confetti-fall ${p.duration}s ${p.delay}s ease-in infinite`,
              transform: `rotate(${p.rotation}deg) translateX(${p.drift}px)`,
            }}>{p.type === 'emoji' ? p.emoji : null}</div>
          ))}
        </div>

        {/* Fireworks */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 5 }}>
          {fireworks.map((fw) => (
            <div key={fw.id} style={{
              position: 'absolute', left: `${fw.x}%`, top: `${fw.y}%`,
              width: 8, height: 8, borderRadius: '50%', backgroundColor: fw.color, color: fw.color,
              animation: `ty-firework-burst 2s ${fw.delay}s ease-out infinite, ty-firework-ring 2s ${fw.delay}s ease-out infinite`,
            }} />
          ))}
        </div>

        {/* Card */}
        <div style={{
          position: 'relative', zIndex: 20, maxWidth: 440, width: '100%', textAlign: 'center',
          padding: '48px 24px 36px',
          animation: showContent ? 'ty-bounce-in 0.8s ease-out forwards' : undefined,
          opacity: showContent ? 1 : 0,
        }}>

          {/* Floating emojis */}
          {['🎉', '🔥', '📱', '🥳', '🎊', '💥'].map((emoji, i) => (
            <div key={i} style={{
              position: 'absolute', fontSize: 24 + Math.random() * 12,
              left: i % 2 === 0 ? `${-10 + i * 5}%` : undefined,
              right: i % 2 !== 0 ? `${-10 + (i - 1) * 5}%` : undefined,
              top: `${10 + i * 14}%`,
              animation: `ty-float-emoji ${2 + i * 0.3}s ${i * 0.5}s ease-in-out infinite`,
              pointerEvents: 'none',
            }}>{emoji}</div>
          ))}

          {/* Video wrapper — ref for position tracking */}
          <div ref={videoWrapRef} style={{ position: 'relative', width: 280, height: 280, margin: '0 auto 28px' }}>
            {/* Sparkle ring */}
            <div style={{
              position: 'absolute', width: 360, height: 360, top: '50%', left: '50%',
              animation: 'ty-ring-rotate 10s linear infinite', pointerEvents: 'none', zIndex: 1,
            }}>
              {sparkles.map((s) => {
                const rad = (s.angle * Math.PI) / 180;
                return (
                  <div key={s.id} style={{
                    position: 'absolute', left: '50%', top: '50%',
                    width: s.size, height: s.size,
                    marginLeft: Math.cos(rad) * s.distance - s.size / 2,
                    marginTop: Math.sin(rad) * s.distance - s.size / 2,
                    borderRadius: '50%',
                    backgroundColor: COLORS[s.id % COLORS.length],
                    animation: `ty-sparkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
                    boxShadow: `0 0 ${s.size}px ${COLORS[s.id % COLORS.length]}`,
                  }} />
                );
              })}
            </div>
            {/* Audio-reactive EQ canvas (around circle) */}
            <canvas ref={eqCanvasRef} style={{
              position: 'absolute', top: '50%', left: '50%', width: 360, height: 360,
              transform: 'translate(-50%, -50%)', pointerEvents: 'none', zIndex: 3,
            }} />
            {/* Video circle — scale + glow driven by bass */}
            <div
              ref={glowRef}
              style={{
                width: 280, height: 280, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                border: '4px solid rgba(255,255,255,0.3)',
                boxShadow: '0 0 20px rgba(255,107,107,0.4),0 0 40px rgba(255,107,107,0.2),0 0 60px rgba(255,107,107,0.1)',
                zIndex: 4, transition: 'transform 0.05s ease-out',
              }}
            >
              <video ref={videoARef} src="/lead-thank-you-2.mp4" autoPlay muted playsInline preload="auto"
                onEnded={handleVideoAEnd}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: currentVideo === 'A' ? 'block' : 'none' }} />
              <video ref={videoBRef} src="/lead-thank-you-1.mp4" playsInline preload="auto"
                onEnded={handleVideoBEnd}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: currentVideo === 'B' ? 'block' : 'none' }} />
            </div>
          </div>

          {/* Text */}
          <h2 style={{
            fontSize: 26, fontWeight: 800,
            background: 'linear-gradient(90deg, #FFE66D, #FF6B6B, #4ECDC4, #45B7D1, #FFE66D)',
            backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            animation: 'ty-shimmer 3s linear infinite, ty-slide-up 0.8s 0.3s ease-out both',
            marginBottom: 12, lineHeight: 1.3,
          }}>
            Thanks for your submission! 🎉
          </h2>

          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: '0 0 8px', animation: 'ty-slide-up 0.8s 0.5s ease-out both' }}>
            We'll reach out to you from
          </p>

          <a href="tel:+19166196006" style={{
            display: 'inline-block', fontSize: 20, fontWeight: 700, color: '#FFE66D',
            textDecoration: 'none', letterSpacing: 1, marginBottom: 20,
            animation: 'ty-slide-up 0.8s 0.6s ease-out both',
          }}>
            +1 (916) 619-6006
          </a>

          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', animation: 'ty-slide-up 0.8s 0.7s ease-out both', margin: 0 }}>
            Enjoy the vibes in the meantime 🎶
          </p>
        </div>
      </div>
    </>
  );
};

export default LeadThankYouPage;
