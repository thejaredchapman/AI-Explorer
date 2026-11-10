import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_STOPS, DEMO_STEP_MS } from '../data/demoTour';
import './DemoTour.css';
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function DemoTour({ active, onExit, onNavigate }) {
  // Bar mounts fresh each time the tour opens, so its state starts clean.
  return <AnimatePresence>{active && <TourBar key="bar" onExit={onExit} onNavigate={onNavigate} />}</AnimatePresence>;
}

function TourBar({ onExit, onNavigate }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false) // never autoplay: the viewer presses Play;
  const timer = useRef(null);
  const last = DEMO_STOPS.length - 1;
  const stop = DEMO_STOPS[index];

  // Scroll to the current stop and spotlight its section.
  useEffect(() => {
    onNavigate(stop.id);
    const el = document.getElementById(stop.id);
    el?.classList.add('demo-spotlight');
    return () => el?.classList.remove('demo-spotlight');
  }, [stop.id, onNavigate]);

  // Autoplay: advance, and stop playing on the last stop.
  useEffect(() => {
    if (!playing) return;
    timer.current = setTimeout(() => {
      if (index >= last) setPlaying(false);
      else setIndex((i) => i + 1);
    }, DEMO_STEP_MS);
    return () => clearTimeout(timer.current);
  }, [playing, index, last]);

  const next = useCallback(() => setIndex((i) => Math.min(i + 1, last)), [last]);
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

  // Keyboard: arrows to step, space to play/pause, Esc to exit.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      else if (e.key === ' ' && !e.target.closest?.('button, a')) { e.preventDefault(); setPlaying((p) => !p); }
      else if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, onExit]);

  return (
        <motion.aside
          className="demo-bar"
          role="region"
          aria-label="Guided demo"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <div className="demo-progress" aria-hidden="true">
            {DEMO_STOPS.map((s, i) => (
              <button
                key={s.id}
                className={`demo-dot ${i === index ? 'on' : i < index ? 'done' : ''}`}
                onClick={() => setIndex(i)}
                tabIndex={-1}
              />
            ))}
          </div>
          <div className="demo-body" aria-live="polite">
            <span className="demo-step">Stop {index + 1} of {DEMO_STOPS.length}</span>
            <h3>{stop.title}</h3>
            <p>{stop.text}</p>
            {!playing && index === 0 && <p className="demo-hint"><strong>Press the Play button to start the demo.</strong></p>}
          </div>
          <div className="demo-controls">
            <button className="btn btn-ghost" onClick={prev} disabled={index === 0}>&larr; Back</button>
            <button className="btn btn-ghost" onClick={() => setPlaying((p) => !p)}>{playing ? '❚❚ Pause' : '▶ Play'}</button>
            {index < last
              ? <button className="btn btn-dark" onClick={next}>Next &rarr;</button>
              : <button className="btn btn-dark" onClick={onExit}>Finish</button>}
            <button className="demo-exit" onClick={onExit} aria-label="Exit demo" title="Exit (Esc)">&times;</button>
          </div>
          {playing && (
            <motion.div
              key={`${index}-bar`}
              className="demo-timer"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: DEMO_STEP_MS / 1000, ease: 'linear' }}
            />
          )}
        </motion.aside>
  );
}
