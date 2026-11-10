import { useState, useEffect } from 'react';

// Shared helpers for the Anthropic Model Lab and the frontier provider labs.

export function usePersisted(key, initial) {
  const [value, setValue] = useState(() => {
    try { const v = localStorage.getItem(`ai-explorer-lab-${key}`); return v == null ? initial : JSON.parse(v); }
    catch { return initial; }
  });
  useEffect(() => { try { localStorage.setItem(`ai-explorer-lab-${key}`, JSON.stringify(value)); } catch { /* storage unavailable */ } }, [key, value]);
  return [value, setValue];
}

export const money = (n) => (Number.isFinite(n) ? `$${n.toLocaleString(undefined, { maximumFractionDigits: n < 1 ? 4 : 2, minimumFractionDigits: n < 10 ? 2 : 0 })}` : '—');
