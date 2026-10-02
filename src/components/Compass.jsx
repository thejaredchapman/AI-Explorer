import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { SECTIONS, bearingOf, formatBearing } from '../data/sections';
import './Compass.css';

const STORAGE_KEY = 'ai-explorer-compass-pos';

function loadPos() {
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) return p;
  } catch { /* ignore */ }
  return { x: 0, y: 0 };
}

const TICKS = Array.from({ length: 36 }, (_, i) => i * 10);

/** Draggable compass: the needle points at the section being read; click it to jump anywhere. */
export default function Compass({ currentSection, onNavigate }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [below, setBelow] = useState(false);
  const ref = useRef(null);
  const constraints = useRef(null);
  const [start] = useState(loadPos);
  const x = useMotionValue(start.x);
  const y = useMotionValue(start.y);
  const angle = useMotionValue(0);

  const index = Math.max(0, SECTIONS.findIndex((s) => s.id === currentSection));
  const current = SECTIONS[index];

  // Turn the needle the short way round.
  useEffect(() => {
    const target = bearingOf(index);
    const delta = ((target - angle.get() + 540) % 360) - 180;
    const next = angle.get() + delta;
    if (reduced) angle.set(next);
    else animate(angle, next, { type: 'spring', stiffness: 90, damping: 11, mass: 0.8 });
  }, [index, angle, reduced]);

  const go = (i) => onNavigate(SECTIONS[(i + SECTIONS.length) % SECTIONS.length].id);

  const toggle = () => {
    if (!open && ref.current) setBelow(ref.current.getBoundingClientRect().top < 380);
    setOpen((o) => !o);
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(index + 1); }
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(index - 1); }
    else if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="cp-bounds" ref={constraints} aria-hidden={false}>
      <motion.div
        ref={ref}
        className="cp"
        drag
        dragConstraints={constraints}
        dragMomentum={false}
        dragElastic={0.1}
        style={{ x, y }}
        onDragEnd={() => {
          try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: x.get(), y: y.get() })); } catch { /* ignore */ }
        }}
        whileDrag={{ scale: 1.06 }}
      >
        <AnimatePresence>
          {open && (
            <motion.div
              className={`cp-menu ${below ? 'below' : ''}`}
              role="menu"
              initial={{ opacity: 0, y: below ? -8 : 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: below ? -8 : 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <p className="cp-menu-title">Set your bearing</p>
              <ol>
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <button
                      role="menuitem"
                      className={s.id === current.id ? 'active' : ''}
                      onClick={() => { onNavigate(s.id); setOpen(false); }}
                    >
                      <span className="cp-menu-deg">{formatBearing(i)}</span>
                      <span>{s.label}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className="cp-face"
          onTap={toggle}
          onKeyDown={onKeyDown}
          aria-expanded={open}
          aria-label={`Section compass, pointing at ${current.label}. Drag to move, Enter to open the section list, arrow keys to step between sections.`}
        >
          <svg viewBox="0 0 100 100" className="cp-dial" aria-hidden="true">
            <circle cx="50" cy="50" r="48" className="cp-bezel" />
            <circle cx="50" cy="50" r="40" className="cp-inner" />
            {TICKS.map((d) => (
              <line
                key={d}
                x1="50" x2="50"
                y1={d % 90 === 0 ? 11 : 13}
                y2={d % 90 === 0 ? 18 : 16}
                className={d % 90 === 0 ? 'cp-tick major' : 'cp-tick'}
                transform={`rotate(${d} 50 50)`}
              />
            ))}
            <text x="50" y="30" className="cp-letter n">N</text>
            <text x="50" y="76" className="cp-letter">S</text>
            <text x="27" y="53" className="cp-letter">W</text>
            <text x="73" y="53" className="cp-letter">E</text>
          </svg>
          <motion.span className="cp-needle" style={{ rotate: angle }}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <polygon points="50,14 56,50 44,50" className="cp-north" />
              <polygon points="50,86 56,50 44,50" className="cp-south" />
              <circle cx="50" cy="50" r="4" className="cp-pivot" />
            </svg>
          </motion.span>
        </motion.button>
        <span className="cp-readout" aria-live="polite">
          <b>{formatBearing(index)}</b> {current.label}
        </span>
      </motion.div>
    </div>
  );
}
