import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { INDUSTRIES, CREATIVE, RISK_FLAGS, FLAG_ORDER, GRADES, gradeOf, scoreOf } from '../data/useCaseData';
import './UseCaseAtlas.css';

// Flatten once. Ids are stable (industry id + index) so stars survive reloads.
const CASES = INDUSTRIES.flatMap((ind) => ind.cases.map(([title, flags], i) => ({
  id: `${ind.id}:${i}`, title, flags, grade: gradeOf(flags), industry: ind.id, industryName: ind.name,
})));
const IDEAS = CREATIVE.flatMap((cat) => cat.ideas.map(([title, desc, flags], i) => ({
  id: `c:${cat.id}:${i}`, title, desc, flags, grade: gradeOf(flags), cat: cat.id, industryName: 'Creative',
})));
const BY_ID = Object.fromEntries([...CASES, ...IDEAS].map((x) => [x.id, x]));
const PAGE = 60;

function useStars() {
  const [stars, setStars] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ai-explorer-uc-stars') || '[]'); } catch { return []; }
  });
  const toggle = (id) => {
    const next = stars.includes(id) ? stars.filter((x) => x !== id) : [...stars, id];
    setStars(next);
    try { localStorage.setItem('ai-explorer-uc-stars', JSON.stringify(next)); } catch { /* storage unavailable */ }
  };
  return [stars, toggle, (next) => { setStars(next); try { localStorage.setItem('ai-explorer-uc-stars', JSON.stringify(next)); } catch { /* storage unavailable */ } }];
}

const Grade = ({ g }) => <span className={`uc-g uc-g-${g}`} title={`Grade ${g}: ${GRADES[g].name}`}>{g}</span>;
const Flags = ({ flags }) => flags.split('').filter(Boolean).map((c) => <span key={c} className="uc-fl" title={RISK_FLAGS[c].name}>{c}</span>);

function CopyBtn({ text, label }) {
  const [s, setS] = useState(label);
  const go = () => {
    const done = () => { setS('Copied'); setTimeout(() => setS(label), 1500); };
    try { navigator.clipboard.writeText(text).then(done, () => setS('Copy blocked')); } catch { setS('Copy blocked'); }
  };
  return <button type="button" className="uc-btn" onClick={go}>{s}</button>;
}

function Detail({ item }) {
  const fs = item.flags.split('').filter(Boolean);
  const math = fs.length ? `${fs.map((c) => `${c}(${RISK_FLAGS[c].weight})`).join(' + ')} = ${scoreOf(item.flags)}` : 'No risk flags = 0';
  const prompt = item.desc
    ? `Let's try this: ${item.title}. ${item.desc} Ask me two questions to get started, and flag anything where I should double-check with a professional.`
    : `Help me with this: "${item.title.replace(/ \(do not do this( alone)?\)/, '')}". Context: I work in ${item.industryName}. Ask me what you need to know first, and tell me where a human should review the output.`;
  return (
    <div className="uc-detail">
      <p><strong className={`uc-gc-${item.grade}`}>Grade {item.grade}, {GRADES[item.grade].name}.</strong> {GRADES[item.grade].oversight}</p>
      <p className="uc-mono">{math} → {item.grade}</p>
      {fs.length ? <ul>{fs.map((c) => <li key={c}><strong>{RISK_FLAGS[c].name}:</strong> {RISK_FLAGS[c].guardrail}</li>)}</ul> : <p className="uc-small">No special guardrails beyond reading what it wrote.</p>}
      <pre>{prompt}</pre>
      <div><CopyBtn text={prompt} label="Copy starter prompt" /></div>
    </div>
  );
}

function Row({ item, starred, onStar, showIndustry }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="uc-row">
      <button type="button" className="uc-rowhead" aria-expanded={open} onClick={() => setOpen(!open)}>
        <Grade g={item.grade} />
        <span className="uc-title">{item.title}{showIndustry && <span className="uc-small"> · {item.industryName}</span>}</span>
        <span className="uc-flags"><Flags flags={item.flags} /></span>
      </button>
      <button type="button" className="uc-star" aria-pressed={starred} aria-label={`${starred ? 'Unstar' : 'Star'} ${item.title}`} onClick={() => onStar(item.id)}>{starred ? '★' : '☆'}</button>
      {open && <Detail item={item} />}
    </div>
  );
}

function Industries({ stars, toggle }) {
  const [ind, setInd] = useState('all');
  const [grades, setGrades] = useState({ A: true, B: true, C: true, D: true });
  const [flag, setFlag] = useState('');
  const [q, setQ] = useState('');
  const [shown, setShown] = useState(PAGE);
  const res = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return CASES.filter((x) => (ind === 'all' || x.industry === ind) && grades[x.grade] && (!flag || x.flags.includes(flag)) && (!ql || x.title.toLowerCase().includes(ql)));
  }, [ind, grades, flag, q]);
  const cnt = { A: 0, B: 0, C: 0, D: 0 };
  res.forEach((x) => { cnt[x.grade] += 1; });
  const reset = (fn) => (v) => { fn(v); setShown(PAGE); };
  const flip = (g) => {
    const next = { ...grades, [g]: !grades[g] };
    setGrades(Object.values(next).some(Boolean) ? next : { A: true, B: true, C: true, D: true });
    setShown(PAGE);
  };
  return (
    <div className="uc-pane">
      <div className="uc-row2" role="group" aria-label="Industry">
        <button type="button" className="uc-chip" aria-pressed={ind === 'all'} onClick={() => reset(setInd)('all')}>All industries (500)</button>
        {INDUSTRIES.map((i) => <button key={i.id} type="button" className="uc-chip" aria-pressed={ind === i.id} onClick={() => reset(setInd)(i.id)}>{i.name}</button>)}
      </div>
      <div className="uc-row2">
        <input type="search" className="uc-search" placeholder="Search use cases, such as contracts, triage or forecasting" aria-label="Search use cases" value={q} onChange={(e) => reset(setQ)(e.target.value)} />
        <div className="uc-row2" role="group" aria-label="Grades">
          {['A', 'B', 'C', 'D'].map((g) => <button key={g} type="button" className="uc-chip" aria-pressed={grades[g]} onClick={() => flip(g)}>Grade {g}</button>)}
        </div>
      </div>
      <div className="uc-row2" role="group" aria-label="Risk flags">
        <span className="uc-small">Has risk:</span>
        <button type="button" className="uc-chip" aria-pressed={flag === ''} onClick={() => reset(setFlag)('')}>Any</button>
        {FLAG_ORDER.map((f) => <button key={f} type="button" className="uc-chip" title={RISK_FLAGS[f].desc} aria-pressed={flag === f} onClick={() => reset(setFlag)(f)}>{f} · {RISK_FLAGS[f].name}</button>)}
      </div>
      <div className="uc-card">
        <div className="uc-between"><strong>{res.length} use case{res.length === 1 ? '' : 's'}</strong><span className="uc-small">A {cnt.A} · B {cnt.B} · C {cnt.C} · D {cnt.D}</span></div>
        <div className="uc-dist" aria-hidden="true">{res.length > 0 && ['A', 'B', 'C', 'D'].map((g) => <i key={g} className={`uc-d-${g}`} style={{ width: `${(cnt[g] / res.length) * 100}%` }} />)}</div>
      </div>
      <div className="uc-card uc-list">
        {res.length === 0 && <p className="uc-small">Nothing matches. Loosen a filter.</p>}
        {res.slice(0, shown).map((x) => <Row key={x.id} item={x} starred={stars.includes(x.id)} onStar={toggle} showIndustry={ind === 'all'} />)}
      </div>
      {res.length > shown && <div className="uc-center"><button type="button" className="uc-btn" onClick={() => setShown(shown + PAGE)}>Show more ({res.length - shown} left)</button></div>}
    </div>
  );
}

function Creative({ stars, toggle }) {
  const [cat, setCat] = useState('all');
  const [q, setQ] = useState('');
  const [hl, setHl] = useState(null);
  const res = IDEAS.filter((x) => (cat === 'all' || x.cat === cat) && (!q.trim() || `${x.title} ${x.desc}`.toLowerCase().includes(q.trim().toLowerCase())));
  const surprise = () => {
    const x = IDEAS[Math.floor(Math.random() * IDEAS.length)];
    setCat('all'); setQ(''); setHl(x.id);
    setTimeout(() => document.getElementById(`uc-${x.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
  };
  return (
    <div className="uc-pane">
      <div className="uc-row2"><input type="search" className="uc-search" placeholder="Search ideas" aria-label="Search ideas" value={q} onChange={(e) => setQ(e.target.value)} /><button type="button" className="uc-btn pri" onClick={surprise}>Surprise me</button></div>
      <div className="uc-row2" role="group" aria-label="Category">
        <button type="button" className="uc-chip" aria-pressed={cat === 'all'} onClick={() => setCat('all')}>All 100</button>
        {CREATIVE.map((c) => <button key={c.id} type="button" className="uc-chip" aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>{c.name}</button>)}
      </div>
      <div className="uc-grid">
        {res.map((x) => (
          <article key={x.id} id={`uc-${x.id}`} className={`uc-card${hl === x.id ? ' hl' : ''}`}>
            <h4><Grade g={x.grade} /><span className="uc-grow">{x.title}</span>
              <button type="button" className="uc-star tight" aria-pressed={stars.includes(x.id)} aria-label={`Star ${x.title}`} onClick={() => toggle(x.id)}>{stars.includes(x.id) ? '★' : '☆'}</button></h4>
            <p className="uc-small">{x.desc}</p>
            <div className="uc-row2"><CopyBtn label="Copy starter prompt" text={`Let's try this: ${x.title}. ${x.desc} Ask me two questions to get started, and flag anything where I should double-check with a professional.`} /><Flags flags={x.flags} /></div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Grader() {
  const [sel, setSel] = useState({});
  const flags = FLAG_ORDER.filter((f) => sel[f]).join('');
  const g = gradeOf(flags), sc = scoreOf(flags);
  const key = (s) => s.split('').sort().join('');
  const same = CASES.filter((x) => key(x.flags) === key(flags));
  return (
    <div className="uc-pane uc-two">
      <div className="uc-card">
        {FLAG_ORDER.map((f) => (
          <label key={f} className="uc-check">
            <input type="checkbox" checked={!!sel[f]} onChange={(e) => setSel({ ...sel, [f]: e.target.checked })} />
            <span><strong>{f} · {RISK_FLAGS[f].name}</strong> <span className="uc-small">(+{RISK_FLAGS[f].weight})</span><br /><span className="uc-small">{RISK_FLAGS[f].desc}</span></span>
          </label>
        ))}
      </div>
      <div className="uc-card">
        <div className="uc-biggrade"><span className={`uc-g uc-g-${g} lg`}>{g}</span><div><h4>{GRADES[g].name}</h4><span className="uc-mono">Score {sc}</span></div></div>
        <p>{GRADES[g].oversight}</p>
        {flags ? <ul>{flags.split('').map((c) => <li key={c}><strong>{RISK_FLAGS[c].name}:</strong> {RISK_FLAGS[c].guardrail}</li>)}</ul> : <p className="uc-small">No risk flags ticked. Read the output, then use it.</p>}
        <div><span className="uc-eyebrow">{same.length} use cases in the Atlas share this exact profile</span>
          {same.slice(0, 3).map((x) => <p key={x.id} className="uc-small">{x.title} ({x.industryName})</p>)}</div>
      </div>
      <div className="uc-card uc-wide">
        <h4>How the grade is computed</h4>
        <p className="uc-small">Each flag adds points: H, S and C add 2; P, R and X add 1. A total of 0 is A, 1 is B, 2 to 3 is C, and 4 or more is D. The rule is deliberately simple so you can argue with it and adjust it. This is a planning aid for deciding how much human oversight to apply. It is not a legal, medical or regulatory certification and not an official Anthropic rating. Follow the rules in your own jurisdiction and organization.</p>
      </div>
    </div>
  );
}

function Shortlist({ stars, toggle, clear }) {
  const items = stars.map((id) => BY_ID[id]).filter(Boolean);
  const [msg, setMsg] = useState('');
  const copy = () => {
    const text = items.map((x) => `[${x.grade}] ${x.title} (${x.industryName})`).join('\n');
    try { navigator.clipboard.writeText(text).then(() => setMsg('List copied'), () => setMsg('Copy blocked')); } catch { setMsg('Copy blocked'); }
  };
  return (
    <div className="uc-pane">
      <p className="uc-small">{items.length ? `${items.length} starred. Copy the list to share with your team.` : 'Nothing starred yet. Tap the star on any use case or creative idea.'}</p>
      <div className="uc-row2"><button type="button" className="uc-btn pri" onClick={copy} disabled={!items.length}>Copy as a list</button><button type="button" className="uc-btn" onClick={clear} disabled={!items.length}>Clear all</button><span className="uc-small">{msg}</span></div>
      {items.length > 0 && <div className="uc-card uc-list">{items.map((x) => (
        <div key={x.id} className="uc-row"><div className="uc-rowhead static"><Grade g={x.grade} /><span className="uc-title">{x.title}<span className="uc-small"> · {x.industryName}</span></span></div>
          <button type="button" className="uc-star" aria-pressed="true" aria-label="Remove" onClick={() => toggle(x.id)}>★</button></div>
      ))}</div>}
    </div>
  );
}

const TABS = [['ind', 'Industries (500)'], ['cre', 'Creative 100'], ['grade', 'Grade your own'], ['list', 'Shortlist']];

export default function UseCaseAtlas() {
  const [tab, setTab] = useState('ind');
  const [stars, toggle, setAll] = useStars();
  return (
    <section className="section" id="use-cases">
      <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="section-badge">Use Case Atlas</span>
        <h2>500 industry use cases and 100 creative ways</h2>
        <p>Fifty use cases in each of ten industries, every one with a safety grade from A to D computed from the risks it carries. Filter, search, star, and open any row for guardrails and a starter prompt. Grades are a planning aid, not a certification.</p>
      </motion.div>
      <div className="uc-legend uc-card">
        {Object.entries(GRADES).map(([g, v]) => <div key={g}><Grade g={g} /><div><strong>{v.name}</strong><p className="uc-small">{v.oversight}</p></div></div>)}
      </div>
      <div className="uc-tabs" role="tablist">
        {TABS.map(([k, label]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{k === 'list' ? `Shortlist (${stars.length})` : label}</button>)}
      </div>
      {tab === 'ind' && <Industries stars={stars} toggle={toggle} />}
      {tab === 'cre' && <Creative stars={stars} toggle={toggle} />}
      {tab === 'grade' && <Grader />}
      {tab === 'list' && <Shortlist stars={stars} toggle={toggle} clear={() => setAll([])} />}
    </section>
  );
}
