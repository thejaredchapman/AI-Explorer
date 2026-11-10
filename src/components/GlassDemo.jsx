import { useState, useMemo, useEffect, useCallback, useRef, useId } from 'react';
import { motion as Motion } from 'framer-motion';
import { llmModels, capabilityLabels, dataAsOf } from '../data/llmData';
import { INDUSTRIES, CREATIVE, RISK_FLAGS, GRADES, gradeOf, scoreOf } from '../data/useCaseData';
import { CAP_KEYS, TIER_ORDER, PRIORITY_PRESETS, USE_CASE_RULES, DEMO_SCENES, DEMO_SCENE_MS } from '../data/glassDemo';
import './GlassDemo.css';

/* ───────── Data prep (once) ───────── */
const MODELS = [...llmModels].sort((a, b) => a.provider.localeCompare(b.provider) || b.releaseDate.localeCompare(a.releaseDate));
const MODEL_BY_ID = Object.fromEntries(MODELS.map((m) => [m.id, m]));
const PROVIDERS = [...new Set(MODELS.map((m) => m.provider))];
const GROUPS = [
  ...INDUSTRIES.map((ind) => ({ id: ind.id, name: ind.name, cases: ind.cases.map(([title, flags], i) => ({ id: `${ind.id}:${i}`, title, flags })) })),
  ...CREATIVE.map((cat) => ({ id: `c:${cat.id}`, name: `Creative: ${cat.name}`, cases: cat.ideas.map(([title, , flags], i) => ({ id: `c:${cat.id}:${i}`, title, flags })) })),
];
const CASE_BY_ID = Object.fromEntries(GROUPS.flatMap((g) => g.cases.map((c) => [c.id, { ...c, group: g.id }])));
const CASE_BY_TITLE = Object.fromEntries(Object.values(CASE_BY_ID).map((c) => [c.title, c.id]));
const PRESET = Object.fromEntries(PRIORITY_PRESETS.map((p) => [p.id, p]));
const SCENES = DEMO_SCENES.filter((s) => (!s.a || MODEL_BY_ID[s.a]) && (!s.b || MODEL_BY_ID[s.b]) && (!s.useCase || CASE_BY_TITLE[s.useCase]));
const TABS = [['duel', 'Head to head'], ['fit', 'Find my model'], ['case', 'Use case fit']];

const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const money = (n) => `$${n.toLocaleString(undefined, { maximumFractionDigits: n < 10 ? 2 : 0, minimumFractionDigits: n < 10 ? 2 : 0 })}`;
const ctx = (n) => (n >= 1e6 ? `${(n / 1e6).toFixed(n % 1e6 ? 2 : 0)}M` : `${Math.round(n / 1000)}K`);
// Monthly cost for `millions` of tokens, split 75% input / 25% output.
const monthly = (m, millions) => millions * (0.75 * m.inputCost + 0.25 * m.outputCost);
const costLabel = (m, millions) => (m.inputCost === 0 && m.outputCost === 0 ? 'Self-hosted: compute only' : `${money(monthly(m, millions))} / month`);

function fitScore(m, weights) {
  const total = CAP_KEYS.reduce((a, k) => a + weights[k], 0);
  if (!total) return Math.round((CAP_KEYS.reduce((a, k) => a + m.capabilities[k], 0) / CAP_KEYS.length) * 10);
  return Math.round((CAP_KEYS.reduce((a, k) => a + weights[k] * m.capabilities[k], 0) / total) * 10);
}

function rank(weights, { maxTier = 'Premium', openOnly = false, needVision = false } = {}) {
  const cap = TIER_ORDER.indexOf(maxTier);
  return MODELS
    .filter((m) => TIER_ORDER.indexOf(m.pricingTier) <= cap && (!openOnly || m.openSource) && (!needVision || m.multimodal))
    .map((m) => ({ m, score: fitScore(m, weights) }))
    .sort((x, y) => y.score - x.score || x.m.inputCost - y.m.inputCost || y.m.releaseDate.localeCompare(x.m.releaseDate));
}

function inferPriorities(item) {
  const weights = Object.fromEntries(CAP_KEYS.map((k) => [k, k === 'reasoning' || k === 'instruction' ? 2 : 0]));
  const reasons = [];
  for (const r of USE_CASE_RULES) {
    if (r.re.test(item.title) && !reasons.some((x) => x.cap === r.cap)) { weights[r.cap] = 5; reasons.push({ cap: r.cap, why: `the use case ${r.why}` }); }
  }
  const grade = gradeOf(item.flags);
  if (grade === 'C' || grade === 'D') {
    weights.reasoning = Math.max(weights.reasoning, 4);
    weights.instruction = Math.max(weights.instruction, 4);
    reasons.push({ cap: 'reasoning', why: `grade ${grade} raises the bar on careful reasoning` });
  }
  return { weights, reasons, grade };
}

/* ───────── Small pieces ───────── */
function ModelSelect({ label, value, onChange }) {
  const id = useId();
  return (
    <label className="gd-field" htmlFor={id}>
      <span className="gd-eyebrow">{label}</span>
      <select id={id} className="gd-input" value={value} onChange={(e) => onChange(e.target.value)}>
        {PROVIDERS.map((p) => (
          <optgroup key={p} label={p}>
            {MODELS.filter((m) => m.provider === p).map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </optgroup>
        ))}
      </select>
    </label>
  );
}

function Meter({ value, max = 100, tone = 'a', label }) {
  return (
    <span className={`gd-meter gd-tone-${tone}`} role="img" aria-label={label}>
      <i style={{ width: `${Math.max(0, Math.min(100, (value / max) * 100))}%` }} />
    </span>
  );
}

const Grade = ({ g }) => <span className={`gd-grade gd-grade-${g}`} title={`Grade ${g}: ${GRADES[g].name}`}>{g}</span>;

/* ───────── Tab: Head to head ───────── */
function Duel({ a, b, setA, setB, volume, setVolume }) {
  const A = MODEL_BY_ID[a];
  const B = MODEL_BY_ID[b];
  const tally = CAP_KEYS.reduce((t, k) => {
    const d = A.capabilities[k] - B.capabilities[k];
    return d > 0 ? { ...t, a: t.a + 1 } : d < 0 ? { ...t, b: t.b + 1 } : { ...t, tie: t.tie + 1 };
  }, { a: 0, b: 0, tie: 0 });
  const ca = monthly(A, volume);
  const cb = monthly(B, volume);
  const cheaper = ca === cb ? null : ca < cb ? A : B;
  const ratio = Math.min(ca, cb) > 0 ? Math.max(ca, cb) / Math.min(ca, cb) : null;

  return (
    <div className="gd-grid">
      <div className="gd-glass gd-pad gd-row2">
        <ModelSelect label="Model A" value={a} onChange={setA} />
        <button type="button" className="gd-btn gd-swap" onClick={() => { setA(b); setB(a); }} aria-label="Swap models A and B">⇄ Swap</button>
        <ModelSelect label="Model B" value={b} onChange={setB} />
      </div>

      {[[A, 'a'], [B, 'b']].map(([m, tone]) => (
        <article key={tone} className={`gd-glass gd-pad gd-card gd-edge-${tone}`}>
          <span className="gd-eyebrow">Model {tone.toUpperCase()} · {m.provider}</span>
          <h3>{m.name}</h3>
          <dl className="gd-facts">
            <div><dt>Tier</dt><dd>{m.pricingTier}</dd></div>
            <div><dt>Context</dt><dd>{ctx(m.contextWindow)}</dd></div>
            <div><dt>$ / 1M in · out</dt><dd>{money(m.inputCost)} · {money(m.outputCost)}</dd></div>
            <div><dt>Weights</dt><dd>{m.openSource ? 'Open' : 'Closed'}</dd></div>
          </dl>
          <p className="gd-muted">{m.bestUseCase}</p>
        </article>
      ))}

      <div className="gd-glass gd-pad gd-wide">
        <div className="gd-between">
          <h4>Capability match-up</h4>
          <p className="gd-muted" aria-live="polite">{A.name} leads on {tally.a}, {B.name} on {tally.b}, tied on {tally.tie}.</p>
        </div>
        <ul className="gd-duel">
          {CAP_KEYS.map((k) => {
            const va = A.capabilities[k];
            const vb = B.capabilities[k];
            const lead = va > vb ? 'A' : vb > va ? 'B' : '=';
            return (
              <li key={k}>
                <span className="gd-num">{va}</span>
                <Meter value={va} max={10} tone="a" label={`${A.name} ${capabilityLabels[k]} ${va} of 10`} />
                <span className="gd-cap">{capabilityLabels[k]}<b className={`gd-lead gd-lead-${lead}`}>{lead === '=' ? 'tie' : `${lead} leads`}</b></span>
                <Meter value={vb} max={10} tone="b" label={`${B.name} ${capabilityLabels[k]} ${vb} of 10`} />
                <span className="gd-num">{vb}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="gd-glass gd-pad gd-wide">
        <label className="gd-field">
          <span className="gd-between"><span className="gd-eyebrow">Monthly volume</span><strong>{volume.toLocaleString()}M tokens</strong></span>
          <input type="range" min="1" max="1000" step="1" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="gd-range" />
        </label>
        <div className="gd-costs">
          <p><span className="gd-eyebrow">A · {A.name}</span><strong>{costLabel(A, volume)}</strong></p>
          <p><span className="gd-eyebrow">B · {B.name}</span><strong>{costLabel(B, volume)}</strong></p>
        </div>
        <p className="gd-muted" aria-live="polite">
          {cheaper ? `${cheaper.name} is cheaper by ${money(Math.abs(ca - cb))} a month${ratio ? ` (${ratio.toFixed(1)}x)` : ''}.` : 'Both cost the same at this volume.'} Assumes 75% input, 25% output tokens, list prices as of {dataAsOf}.
        </p>
      </div>
    </div>
  );
}

/* ───────── Shared: weights + ranking ───────── */
function Ranking({ rows, limit = 5, volume }) {
  if (!rows.length) return <p className="gd-muted">No model matches these filters. Loosen the tier or open-weights filter.</p>;
  return (
    <ol className="gd-rank">
      {rows.slice(0, limit).map(({ m, score }, i) => (
        <Motion.li key={m.id} layout={!reducedMotion()} className="gd-glass gd-glass-sub">
          <span className="gd-pos">{i + 1}</span>
          <span className="gd-grow">
            <strong>{m.name}</strong>
            <span className="gd-muted"> · {m.provider} · {m.pricingTier}{volume ? ` · ${costLabel(m, volume)}` : ''}</span>
            <Meter value={score} tone={i === 0 ? 'a' : 'b'} label={`Fit ${score} of 100`} />
          </span>
          <span className="gd-score">{score}<small>/100</small></span>
        </Motion.li>
      ))}
    </ol>
  );
}

function Fit({ weights, setWeights, maxTier, setMaxTier, openOnly, setOpenOnly, needVision, setNeedVision }) {
  const rows = useMemo(() => rank(weights, { maxTier, openOnly, needVision }), [weights, maxTier, openOnly, needVision]);
  const top = rows[0];
  return (
    <div className="gd-grid">
      <div className="gd-glass gd-pad">
        <h4>What matters to you</h4>
        <div className="gd-chips" role="group" aria-label="Presets">
          {PRIORITY_PRESETS.map((p) => {
            const on = CAP_KEYS.every((k) => p.weights[k] === weights[k]);
            return <button key={p.id} type="button" className="gd-chip" aria-pressed={on} onClick={() => setWeights(p.weights)}>{p.label}</button>;
          })}
        </div>
        <div className="gd-sliders">
          {CAP_KEYS.map((k) => (
            <label key={k} className="gd-slider">
              <span>{capabilityLabels[k]}</span>
              <input type="range" min="0" max="5" step="1" value={weights[k]} className="gd-range"
                onChange={(e) => setWeights({ ...weights, [k]: Number(e.target.value) })}
                aria-valuetext={`${weights[k]} of 5`} />
              <b className="gd-num">{weights[k]}</b>
            </label>
          ))}
        </div>
      </div>

      <div className="gd-glass gd-pad">
        <h4>Filters</h4>
        <span className="gd-eyebrow">Highest price tier</span>
        <div className="gd-chips" role="group" aria-label="Highest price tier">
          {TIER_ORDER.map((t) => <button key={t} type="button" className="gd-chip" aria-pressed={maxTier === t} onClick={() => setMaxTier(t)}>{t}</button>)}
        </div>
        <label className="gd-check"><input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} /> Open weights only</label>
        <label className="gd-check"><input type="checkbox" checked={needVision} onChange={(e) => setNeedVision(e.target.checked)} /> Must accept images</label>
        <p className="gd-muted">{rows.length} of {MODELS.length} models qualify.</p>
        <div className="gd-callout" aria-live="polite">
          {top ? <><span className="gd-eyebrow">Top pick</span><strong>{top.m.name}</strong><span className="gd-muted">{top.m.provider} · fit {top.score}/100</span></> : <span>No match</span>}
        </div>
      </div>

      <div className="gd-glass gd-pad gd-wide">
        <h4>Live ranking</h4>
        <Ranking rows={rows} />
      </div>
    </div>
  );
}

/* ───────── Tab: Use case fit ───────── */
function CaseFit({ caseId, setCaseId, onSendToFit }) {
  const item = CASE_BY_ID[caseId];
  const group = GROUPS.find((g) => g.id === item.group);
  const { weights, reasons, grade } = useMemo(() => inferPriorities(item), [item]);
  const rows = useMemo(() => rank(weights), [weights]);
  const flags = item.flags.split('').filter(Boolean);
  const groupId = useId();
  const caseSel = useId();
  return (
    <div className="gd-grid">
      <div className="gd-glass gd-pad gd-row2 gd-wide">
        <label className="gd-field" htmlFor={groupId}>
          <span className="gd-eyebrow">Industry or theme</span>
          <select id={groupId} className="gd-input" value={group.id} onChange={(e) => setCaseId(GROUPS.find((g) => g.id === e.target.value).cases[0].id)}>
            {GROUPS.map((g) => <option key={g.id} value={g.id}>{g.name} ({g.cases.length})</option>)}
          </select>
        </label>
        <label className="gd-field gd-grow" htmlFor={caseSel}>
          <span className="gd-eyebrow">Use case</span>
          <select id={caseSel} className="gd-input" value={caseId} onChange={(e) => setCaseId(e.target.value)}>
            {group.cases.map((c) => <option key={c.id} value={c.id}>[{gradeOf(c.flags)}] {c.title}</option>)}
          </select>
        </label>
      </div>

      <div className="gd-glass gd-pad">
        <div className="gd-headline">
          <Grade g={grade} />
          <div>
            <h4>Grade {grade}: {GRADES[grade].name}</h4>
            <p className="gd-muted">{GRADES[grade].oversight}</p>
          </div>
        </div>
        <p className="gd-mono">Risk score {scoreOf(item.flags)}{flags.length ? ` from ${flags.map((c) => `${RISK_FLAGS[c].name} (${RISK_FLAGS[c].weight})`).join(', ')}` : ' (no risk flags)'}</p>
        {flags.length
          ? <ul className="gd-list">{flags.map((c) => <li key={c}><strong>{RISK_FLAGS[c].name}:</strong> {RISK_FLAGS[c].guardrail}</li>)}</ul>
          : <p className="gd-muted">No special guardrails beyond reading what it wrote.</p>}
      </div>

      <div className="gd-glass gd-pad">
        <h4>Why these priorities</h4>
        {reasons.length
          ? <ul className="gd-list">{reasons.map((r, i) => <li key={i}><strong>{capabilityLabels[r.cap]}</strong>: {r.why}.</li>)}</ul>
          : <p className="gd-muted">No strong signals in the wording, so this leans on reasoning and instruction following.</p>}
        <div className="gd-bars">
          {CAP_KEYS.filter((k) => weights[k] > 0).map((k) => (
            <div key={k} className="gd-bar"><span>{capabilityLabels[k]}</span><Meter value={weights[k]} max={5} tone="a" label={`${capabilityLabels[k]} weight ${weights[k]} of 5`} /><b className="gd-num">{weights[k]}</b></div>
          ))}
        </div>
        <button type="button" className="gd-btn" onClick={() => onSendToFit(weights)}>Tune these in Find my model →</button>
      </div>

      <div className="gd-glass gd-pad gd-wide">
        <h4>Best fits for this use case</h4>
        <Ranking rows={rows} limit={3} />
        <p className="gd-muted">A model suggestion is a starting point. The grade above decides how much a person checks the output.</p>
      </div>
    </div>
  );
}

/* ───────── Section ───────── */
export default function GlassDemo() {
  const [tab, setTab] = useState('duel');
  const [a, setA] = useState(SCENES[0]?.a ?? MODELS[0].id);
  const [b, setB] = useState(SCENES[0]?.b ?? MODELS[1].id);
  const [volume, setVolume] = useState(50);
  const [weights, setWeights] = useState(PRESET.balanced.weights);
  const [maxTier, setMaxTier] = useState('Premium');
  const [openOnly, setOpenOnly] = useState(false);
  const [needVision, setNeedVision] = useState(false);
  const [caseId, setCaseId] = useState(() => CASE_BY_TITLE[SCENES.find((s) => s.useCase)?.useCase] ?? Object.keys(CASE_BY_ID)[0]);
  const [scene, setScene] = useState(-1); // -1 = free play, otherwise index into SCENES
  const [playing, setPlaying] = useState(false);
  const tabRefs = useRef({});
  const baseId = useId();

  const applyScene = useCallback((i) => {
    const s = SCENES[i];
    setScene(i);
    setTab(s.tab);
    if (s.a) setA(s.a);
    if (s.b) setB(s.b);
    if (s.volume) setVolume(s.volume);
    if (s.preset) setWeights(PRESET[s.preset].weights);
    if (s.maxTier) setMaxTier(s.maxTier);
    if (s.openOnly != null) setOpenOnly(s.openOnly);
    if (s.useCase) setCaseId(CASE_BY_TITLE[s.useCase]);
  }, []);

  // Autoplay: advance one scene per tick; stop after the last.
  useEffect(() => {
    if (!playing) return undefined;
    const t = setTimeout(() => {
      if (scene >= SCENES.length - 1) setPlaying(false);
      else applyScene(scene + 1);
    }, DEMO_SCENE_MS);
    return () => clearTimeout(t);
  }, [playing, scene, applyScene]);

  const start = () => { applyScene(scene >= 0 && scene < SCENES.length - 1 ? scene : 0); setPlaying(true); };
  const step = (d) => { setPlaying(false); applyScene(Math.max(0, Math.min(SCENES.length - 1, (scene < 0 ? 0 : scene + d)))); };
  const exitDemo = () => { setPlaying(false); setScene(-1); };
  // Any direct interaction with the workspace hands control back to the user.
  const takeOver = () => { if (playing) setPlaying(false); };
  const onWorkspaceKey = (e) => { if (e.key !== 'Tab' && e.key !== 'Shift') takeOver(); };

  const selectTab = (k) => { takeOver(); setTab(k); };
  const onTabKey = (e) => {
    const keys = TABS.map(([k]) => k);
    const i = keys.indexOf(tab);
    let next = null;
    if (e.key === 'ArrowRight') next = keys[(i + 1) % keys.length];
    else if (e.key === 'ArrowLeft') next = keys[(i - 1 + keys.length) % keys.length];
    else if (e.key === 'Home') next = keys[0];
    else if (e.key === 'End') next = keys[keys.length - 1];
    if (!next) return;
    e.preventDefault();
    e.stopPropagation(); // keep the guided tour's global arrow keys from also firing
    selectTab(next);
    tabRefs.current[next]?.focus();
  };

  const current = scene >= 0 ? SCENES[scene] : null;

  return (
    <section className="section" id="glass-demo">
      <Motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="section-badge">Glass Demo</span>
        <h2>An interactive demo, under glass</h2>
        <p>Pit two models against each other, rank all {MODELS.length} by what you care about, or start from a real use case and see its safety grade and best fits. Press Play for a hands-free walkthrough, or take the controls at any time.</p>
      </Motion.div>

      <div className="gd-stage">
        <span className="gd-orb gd-orb-1" aria-hidden="true" />
        <span className="gd-orb gd-orb-2" aria-hidden="true" />
        <span className="gd-orb gd-orb-3" aria-hidden="true" />

        <div className="gd-glass gd-toolbar">
          <div className="gd-tabs" role="tablist" aria-label="Demo views" onKeyDown={onTabKey}>
            {TABS.map(([k, label]) => (
              <button key={k} type="button" role="tab" id={`${baseId}-tab-${k}`} aria-controls={`${baseId}-panel`}
                aria-selected={tab === k} tabIndex={tab === k ? 0 : -1}
                ref={(el) => { tabRefs.current[k] = el; }} onClick={() => selectTab(k)}>
                {label}
              </button>
            ))}
          </div>
          <div className="gd-player" role="group" aria-label="Demo mode">
            <button type="button" className="gd-btn" onClick={() => step(-1)} disabled={scene <= 0} aria-label="Previous scene">←</button>
            <button type="button" className="gd-btn gd-btn-pri" onClick={() => (playing ? setPlaying(false) : start())} aria-pressed={playing}>
              {playing ? '❚❚ Pause demo' : scene >= SCENES.length - 1 ? '↻ Replay demo' : scene >= 0 ? '▶ Resume demo' : '▶ Play demo'}
            </button>
            <button type="button" className="gd-btn" onClick={() => step(1)} disabled={scene >= SCENES.length - 1} aria-label="Next scene">→</button>
            {scene >= 0 && <button type="button" className="gd-btn" onClick={exitDemo}>Free play</button>}
          </div>
        </div>

        {!current && (
          <div className="gd-glass gd-cta">
            <div>
              <strong>Watch the guided demo</strong>
              <span>Press the Play button to start the demo. It never starts on its own; pause or take over any time.</span>
            </div>
            <button type="button" className="gd-btn gd-btn-pri gd-play-big" onClick={start}>
              <span aria-hidden="true">▶</span> Play demo
            </button>
          </div>
        )}

        {current && (
          <div className="gd-glass gd-caption" aria-live="polite">
            <span className="gd-eyebrow">Scene {scene + 1} of {SCENES.length}</span>
            <strong>{current.title}</strong>
            <span>{current.caption}</span>
            {playing && <i key={scene} className="gd-timer" style={{ animationDuration: `${DEMO_SCENE_MS}ms` }} aria-hidden="true" />}
          </div>
        )}

        <div id={`${baseId}-panel`} role="tabpanel" aria-labelledby={`${baseId}-tab-${tab}`}
          className="gd-workspace" onPointerDownCapture={takeOver} onKeyDownCapture={onWorkspaceKey}>
          {tab === 'duel' && <Duel a={a} b={b} setA={setA} setB={setB} volume={volume} setVolume={setVolume} />}
          {tab === 'fit' && <Fit weights={weights} setWeights={setWeights} maxTier={maxTier} setMaxTier={setMaxTier}
            openOnly={openOnly} setOpenOnly={setOpenOnly} needVision={needVision} setNeedVision={setNeedVision} />}
          {tab === 'case' && <CaseFit caseId={caseId} setCaseId={setCaseId} onSendToFit={(wts) => { setWeights(wts); setMaxTier('Premium'); setOpenOnly(false); setTab('fit'); }} />}
        </div>
      </div>
    </section>
  );
}
