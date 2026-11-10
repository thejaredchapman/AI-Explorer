import { useState } from 'react';

// Shared UI pieces for the Anthropic Model Lab and the frontier provider labs.

export const Dot = ({ color }) => <span className="ml-dot" style={{ background: color }} aria-hidden="true" />;
export const Tech = ({ children }) => <p className="ml-tech">{children}</p>;

export function CopyBlock({ text, label = 'Copy' }) {
  const [state, setState] = useState(label);
  const copy = () => {
    const done = () => { setState('Copied'); setTimeout(() => setState(label), 1500); };
    try { navigator.clipboard.writeText(text).then(done, () => setState('Select and copy')); } catch { setState('Select and copy'); }
  };
  return (
    <div className="ml-code">
      <pre>{text}</pre>
      <button type="button" className="ml-copy" onClick={copy}>{state}</button>
    </div>
  );
}
