import { useEffect, useRef, useState, useCallback } from 'react';

/* ─── helpers ──────────────────────────────────────────────────── */
const TRAIL_COUNT = 10;
const GOLD        = '#C9A259';
function lerp(a, b, t)   { return a + (b - a) * t; }
function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

export default function CustomCursor() {
  /* DOM refs */
  const dotRef    = useRef(null);
  const ringRef   = useRef(null);
  const glowRef   = useRef(null);
  const trailRefs = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ ref: null })));
  const jitter    = useRef(Array.from({ length: TRAIL_COUNT }, () => ({ x:0, y:0, vx:0, vy:0 })));

  /* position tracking (all in refs — never re-render from these) */
  const mousePos    = useRef({ x: -300, y: -300 });
  const ringPos     = useRef({ x: -300, y: -300 });
  const prevRingPos = useRef({ x: -300, y: -300 });
  const ringSizeW   = useRef(38);
  const ringSizeH   = useRef(38);
  const history     = useRef(Array(TRAIL_COUNT * 2).fill({ x: -300, y: -300 }));

  /* state machine */
  const stateRef   = useRef('default');   // 'default' | 'hover' | 'click'
  const hoveredEl  = useRef(null);

  /* idle breathing */
  const lastMoveT  = useRef(Date.now());
  const isIdle     = useRef(false);
  const idlePhase  = useRef(0);

  /* click squash */
  const clickPhase = useRef(0);
  const dotScale   = useRef(1);

  const rafId = useRef(null);

  /* React state — only for things that change JSX structure */
  const [cursorState, setCursorState]     = useState('default');
  const [ripples,     setRipples]         = useState([]);
  const [labelText,   setLabelText]       = useState('View');
  const [reducedMotion, setReducedMotion] = useState(false);
  const [enabled, setEnabled] = useState(false);

  /* ── prefers-reduced-motion + touch / coarse pointer ──────── */
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
    const update = () => {
      setReducedMotion(reduce.matches);
      setEnabled(!reduce.matches && !coarse.matches && !touch);
    };
    update();
    reduce.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => {
      reduce.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
    };
  }, []);

  /* ── Hover / click callbacks ──────────────────────────────── */
  const onEnter = useCallback((e) => {
    const el = e.currentTarget;
    hoveredEl.current = el;

    /* Priority: data-cursor-text → aria-label → element's own text → tag fallback */
    let label = el.dataset.cursorText;
    if (!label) label = el.getAttribute('aria-label');
    if (!label) {
      // Get visible text, strip icons/whitespace, cap at 14 chars
      const raw = (el.innerText || el.textContent || '').trim().replace(/\s+/g, ' ');
      label = raw.length > 14 ? raw.slice(0, 12).trimEnd() + '…' : raw;
    }
    if (!label) label = el.tagName === 'INPUT' ? 'Type' : 'Open';

    setLabelText(label);
    stateRef.current = 'hover';
    setCursorState('hover');
  }, []);

  const onLeave = useCallback(() => {
    hoveredEl.current = null;
    stateRef.current  = 'default';
    setCursorState('default');
  }, []);

  const onDown = useCallback((e) => {
    const target   = document.elementFromPoint(e.clientX, e.clientY);
    const isButton = !!target?.closest('button,[role="button"]');
    const color    = isButton
      ? 'rgba(201,162,89,0.95)'
      : 'rgba(201,162,89,0.55)';
    stateRef.current = 'click';
    setCursorState('click');
    clickPhase.current = 0.001;
    setRipples(r => [...r, { id: Date.now(), x: e.clientX, y: e.clientY, color }]);
    setTimeout(() => setRipples(r => r.slice(1)), 780);
  }, []);

  const onUp = useCallback(() => {
    if (stateRef.current === 'click') {
      const next = hoveredEl.current ? 'hover' : 'default';
      stateRef.current = next;
      setCursorState(next);
    }
  }, []);

  /* ── Main effect: listeners + rAF ────────────────────────── */
  useEffect(() => {
    if (!enabled) return;

    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveT.current = Date.now();
      if (isIdle.current) { isIdle.current = false; idlePhase.current = 0; }
    };

    /* Attach hover listeners — re-run via MutationObserver */
    const attach = () => {
      document
        .querySelectorAll('a,button,[role="button"],input,textarea,select,label,[data-cursor]')
        .forEach(el => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
          el.addEventListener('mouseenter', onEnter);
          el.addEventListener('mouseleave', onLeave);
        });
    };
    attach();
    let t = 0;
    const obs = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(attach, 250);
    });
    obs.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup',   onUp);

    /* ── rAF loop ─────────────────────────────────────────── */
    const LERP_RING = 0.10;
    const LERP_MAG  = 0.17;
    const LERP_SIZE = 0.13;

    const tick = () => {
      const state   = stateRef.current;
      const isHover = state === 'hover';
      const isClick = state === 'click';
      const { x: mx, y: my } = mousePos.current;

      /* ── 1. Idle breathing ── */
      if (!isIdle.current && Date.now() - lastMoveT.current > 1500) isIdle.current = true;
      if (isIdle.current) idlePhase.current += 0.022;
      else                idlePhase.current  = lerp(idlePhase.current, 0, 0.04);
      const idleAmt   = isIdle.current ? 1 : Math.min(idlePhase.current / (Math.PI * 0.5), 1);
      const idleScale = 1 + Math.sin(idlePhase.current) * 0.09 * idleAmt;

      /* ── 2. Click squash / spring bounce ── */
      if (clickPhase.current > 0) {
        clickPhase.current = Math.min(clickPhase.current + 0.048, 1);
        const p = clickPhase.current;
        if      (p < 0.25) dotScale.current = 1 - (p / 0.25) * 0.42;        // squash
        else if (p < 0.55) dotScale.current = 0.58 + ((p - 0.25) / 0.3) * 0.82; // overshoot
        else               dotScale.current = 1.40 - ((p - 0.55) / 0.45) * 0.40; // settle
        if (clickPhase.current >= 1) { clickPhase.current = 0; dotScale.current = 1; }
      } else {
        dotScale.current = lerp(dotScale.current, 1, 0.14);
      }

      /* ── 3. Magnetic pull — ring target ── */
      let targetX = mx, targetY = my;
      let targetW = 38, targetH = 38;
      if (isHover && hoveredEl.current) {
        // Guard: if element was removed from DOM (e.g. after route change), reset state
        if (!document.contains(hoveredEl.current)) {
          hoveredEl.current = null;
          stateRef.current  = 'default';
          setCursorState('default');
        } else {
          try {
            const rect = hoveredEl.current.getBoundingClientRect();
            targetX = rect.left + rect.width  / 2;
            targetY = rect.top  + rect.height / 2;
            targetW = 46;
            targetH = 46;
          } catch (_) {
            hoveredEl.current = null;
            stateRef.current  = 'default';
          }
        }
      } else if (isClick) {
        targetW = targetH = 20;
      }

      /* Lerp ring position */
      prevRingPos.current = { ...ringPos.current };
      const lf = isHover ? LERP_MAG : LERP_RING;
      ringPos.current.x += (targetX - ringPos.current.x) * lf;
      ringPos.current.y += (targetY - ringPos.current.y) * lf;

      /* Lerp ring size */
      ringSizeW.current += (targetW - ringSizeW.current) * LERP_SIZE;
      ringSizeH.current += (targetH - ringSizeH.current) * LERP_SIZE;
      const rw = ringSizeW.current * idleScale;
      const rh = ringSizeH.current * idleScale;

      /* ── 4. Velocity stretch ── */
      const vx      = ringPos.current.x - prevRingPos.current.x;
      const vy      = ringPos.current.y - prevRingPos.current.y;
      const speed   = Math.sqrt(vx * vx + vy * vy);
      const angle   = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.062, 0.52);
      const sX      = 1 + stretch;
      const sY      = Math.max(1 / (1 + stretch * 0.6), 0.62);

      /* Apply ring */
      if (ringRef.current) {
        ringRef.current.style.width        = `${rw}px`;
        ringRef.current.style.height       = `${rh}px`;
        ringRef.current.style.marginLeft   = `-${rw / 2}px`;
        ringRef.current.style.marginTop    = `-${rh / 2}px`;
        ringRef.current.style.borderRadius = '50%'; // always circular
        /* stretch: rotate to velocity direction, squash, unrotate */
        ringRef.current.style.transform    =
          `translate(${ringPos.current.x}px,${ringPos.current.y}px)` +
          ` rotate(${angle}deg)` +
          ` scaleX(${sX}) scaleY(${sY})` +
          ` rotate(${-angle}deg)`;
      }

      /* Apply dot */
      if (dotRef.current) {
        const ds = dotScale.current * idleScale;
        dotRef.current.style.transform = `translate(${mx}px,${my}px) scale(${ds})`;
      }

      /* ── 5. Blend glow ── */
      if (glowRef.current) {
        const glowOp = isIdle.current
          ? 0.20 + Math.sin(idlePhase.current) * 0.10
          : 0.14;
        glowRef.current.style.transform = `translate(${ringPos.current.x}px,${ringPos.current.y}px)`;
        glowRef.current.style.opacity   = String(glowOp);
      }

      /* ── 7. Trail with eased opacity + jitter ── */
      history.current = [{ x: mx, y: my }, ...history.current.slice(0, TRAIL_COUNT * 2 - 1)];
      trailRefs.current.forEach((t, i) => {
        if (!t.ref) return;
        const h  = history.current[Math.min(i * 2 + 1, history.current.length - 1)];
        const j  = jitter.current[i];
        j.vx    += (Math.random() - 0.5) * 0.5;
        j.vy    += (Math.random() - 0.5) * 0.5;
        j.vx    *= 0.78;
        j.vy    *= 0.78;
        j.x      = Math.max(-2.5, Math.min(2.5, j.x + j.vx));
        j.y      = Math.max(-2.5, Math.min(2.5, j.y + j.vy));
        const tN    = i / TRAIL_COUNT;                          // 0→1
        const op    = easeOutCubic(1 - tN) * 0.30;             // eased fade
        const size  = lerp(5, 1, tN);
        t.ref.style.transform  = `translate(${h.x + j.x}px,${h.y + j.y}px)`;
        t.ref.style.opacity    = String(op);
        t.ref.style.width      = `${size}px`;
        t.ref.style.height     = `${size}px`;
        t.ref.style.marginLeft = `-${size / 2}px`;
        t.ref.style.marginTop  = `-${size / 2}px`;
      });

      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.style.cursor = '';
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup',   onUp);
      cancelAnimationFrame(rafId.current);
      obs.disconnect();
    };
  }, [enabled, onEnter, onLeave, onDown, onUp]);

  /* ── Derived for JSX ──────────────────────────────────────── */
  const isHover = cursorState === 'hover';
  const isClick = cursorState === 'click';
  const dotSize = isHover ? 0 : isClick ? 14 : 6;

  if (!enabled || reducedMotion) return null;

  /* ── Full render ──────────────────────────────────────────── */
  return (
    <>
      <style>{`
        *, *::before, *::after { cursor: none !important; }

        .krc-base {
          position: fixed; top: 0; left: 0;
          pointer-events: none; z-index: 999999;
          border-radius: 50%; will-change: transform;
        }

        /* Spinning conic ring */
        @keyframes krc-spin { to { transform: rotate(360deg); } }
        .krc-spin-layer {
          position: absolute; inset: -2px;
          border-radius: inherit;
          animation: krc-spin 3s linear infinite;
        }

        /* Click ripple */
        @keyframes krc-ripple {
          0%   { transform: translate(-50%,-50%) scale(0);  opacity: 0.85; }
          100% { transform: translate(-50%,-50%) scale(4.2); opacity: 0; }
        }
        .krc-ripple {
          position: fixed; width: 36px; height: 36px; border-radius: 50%;
          pointer-events: none; z-index: 999998;
          animation: krc-ripple 0.72s cubic-bezier(0.22,1,0.36,1) forwards;
        }

        /* Dot breathing glow */
        @keyframes krc-dot-glow {
          0%,100% { box-shadow: 0 0 6px 2px rgba(201,162,89,0.75); }
          50%     { box-shadow: 0 0 18px 5px rgba(201,162,89,0.28); }
        }

        /* Label character stagger */
        @keyframes krc-char-in {
          from { opacity: 0; transform: translateY(6px) scaleY(0.7); }
          to   { opacity: 1; transform: translateY(0)   scaleY(1); }
        }
        .krc-char {
          display: inline-block;
          animation: krc-char-in 0.26s cubic-bezier(0.22,1,0.36,1) both;
        }
        .krc-label {
          position: absolute; top: calc(100% + 9px);
          left: 50%; transform: translateX(-50%);
          font-family: 'Inter','Outfit',sans-serif;
          font-size: 9px; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: ${GOLD}; white-space: nowrap;
          text-shadow: 0 0 14px rgba(201,162,89,0.8);
        }

        /* Blend-mode glow halo */
        .krc-glow {
          position: fixed; top: 0; left: 0;
          width: 90px; height: 90px; border-radius: 50%;
          margin-left: -45px; margin-top: -45px;
          pointer-events: none; z-index: 999997;
          will-change: transform;
          background: radial-gradient(circle, rgba(201,162,89,0.55) 0%, transparent 68%);
          mix-blend-mode: screen;
          filter: blur(10px);
        }
      `}</style>

      {/* ── Trail particles ── */}
      {trailRefs.current.map((t, i) => (
        <div key={i} ref={el => { trailRefs.current[i].ref = el; }}
          className="krc-base"
          style={{ width:'5px', height:'5px', marginLeft:'-2.5px', marginTop:'-2.5px', background: GOLD, opacity: 0 }}
        />
      ))}

      {/* ── Screen-blend glow (feature 4) ── */}
      <div ref={glowRef} className="krc-glow" />

      {/* ── Outer ring ── */}
      <div
        ref={ringRef}
        className="krc-base"
        style={{
          width:'38px', height:'38px', marginLeft:'-19px', marginTop:'-19px',
          backdropFilter: isHover ? 'blur(2px)' : 'none',
          WebkitBackdropFilter: isHover ? 'blur(2px)' : 'none',
          transition: 'backdrop-filter 0.3s ease',
        }}
      >
        {/* Spinning conic gradient ring */}
        <div className="krc-spin-layer" style={{
          background: isHover
            ? 'conic-gradient(from 0deg, #C9A259, #f0d898, #A8893F, #C9A259)'
            : 'conic-gradient(from 0deg, rgba(201,162,89,0.9) 0deg, rgba(201,162,89,0.06) 160deg, rgba(201,162,89,0.9) 360deg)',
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
          mask:       'radial-gradient(farthest-side, transparent calc(100% - 2px), #000 calc(100% - 2px))',
          filter: isHover
            ? 'drop-shadow(0 0 10px rgba(201,162,89,1))'
            : 'drop-shadow(0 0 5px rgba(201,162,89,0.65))',
        }} />

        {/* Hover fill tint */}
        {isHover && (
          <div style={{
            position:'absolute', inset:'3px', borderRadius:'inherit',
            background:'radial-gradient(circle, rgba(201,162,89,0.10) 0%, transparent 78%)',
          }} />
        )}

        {/* Dynamic staggered label (feature 3) */}
        {isHover && (
          <div className="krc-label" key={labelText}>
            {labelText.split('').map((ch, i) => (
              <span key={i} className="krc-char" style={{ animationDelay:`${i * 0.042}s` }}>
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Inner dot ── */}
      <div
        ref={dotRef}
        className="krc-base"
        style={{
          width:      `${Math.max(dotSize,1)}px`,
          height:     `${Math.max(dotSize,1)}px`,
          marginLeft: `-${dotSize / 2}px`,
          marginTop:  `-${dotSize / 2}px`,
          background: isClick
            ? 'radial-gradient(circle, #fff 25%, #C9A259 100%)'
            : 'radial-gradient(circle, #fff 15%, #C9A259 100%)',
          boxShadow: isClick
            ? '0 0 22px 7px rgba(201,162,89,0.95)'
            : '0 0 8px 2px rgba(201,162,89,0.75)',
          animation: !isHover && !isClick ? 'krc-dot-glow 2.2s ease-in-out infinite' : 'none',
          opacity: isHover ? 0 : 1,
          transition: 'opacity 0.18s ease',
        }}
      />

      {/* ── Click ripples (feature 6) — color varies by element type ── */}
      {ripples.map(r => (
        <div key={r.id} className="krc-ripple"
          style={{ left:r.x, top:r.y, border:`1.5px solid ${r.color}`, boxShadow:`0 0 10px ${r.color}` }}
        />
      ))}
    </>
  );
}
