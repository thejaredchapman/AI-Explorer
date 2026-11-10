import { useState, useCallback, useEffect } from 'react';
import { usePersisted, money } from './labShared';
import { Tech, CopyBlock } from './LabUi';

// Model Lab for non-Anthropic providers, driven by the Frontier Model Lab content pack
// (src/data/frontierLabs.json). Prices marked unverified in the pack are never used in
// the calculator; they show "Check pricing" with the source link instead.

const TABS = [['family', 'Family'], ['ways', 'Ways in'], ['pick', 'Pick a model'], ['cost', 'Cost lab'], ['bench', 'Benchmarks'], ['patterns', 'Patterns'], ['access', 'Access'], ['try', 'Try it'], ['quiz', 'Quiz'], ['news', "What's new"]];
const STAMP_LABELS = { family: 'Met the family', ways: 'Found a way in', pick: 'Picked a model', cost: 'Ran the numbers', bench: 'Planned a test', patterns: 'Routed a task', access: 'Checked access', try: 'Finished a mission', quiz: 'Passed the quiz' };
const PASS = 6;

const today = () => new Date().toISOString().slice(0, 10);
const fmtTokens = (n) => (n >= 1e6 ? `${+(n / 1e6).toFixed(2)}M` : `${Math.round(n / 1000)}K`);
const fmtDate = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function SourceLinks({ keys, sources, label = 'Source' }) {
  if (!keys?.length) return null;
  return (
    <p className="ml-small">
      {label}{keys.length > 1 ? 's' : ''}:{' '}
      {keys.map((k, i) => (
        <span key={k}>{i > 0 && ' · '}<a href={sources[k]} target="_blank" rel="noopener noreferrer">{sources[k].replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')}</a></span>
      ))}
    </p>
  );
}

function GotIt({ onClick, done, children = 'Got it' }) {
  return <button type="button" className={`ml-btn${done ? '' : ' pri'}`} onClick={onClick} disabled={done}>{done ? 'Stamp earned' : children}</button>;
}

/* ───────── Family ───────── */
function Family({ p, sources, onStamp }) {
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <p className="ml-simple-only">{p.simple}</p>
        <Tech>{p.technical}</Tech>
      </div>
      <div className="ml-grid">
        {p.models.map((m) => (
          <article key={m.modelId} className="ml-card" onMouseEnter={() => onStamp('family')} onFocus={() => onStamp('family')} tabIndex={0}>
            <h4>{m.name}</h4>
            <p>{m.cardCopy}</p>
            <p className="ml-small">{m.contextTokens ? `${fmtTokens(m.contextTokens)}-token context` : 'Context window: see source'}</p>
            <Tech>Model ID <code>{m.modelId}</code> · verified {m.verifiedOn} · <a href={m.sourceUrl} target="_blank" rel="noopener noreferrer">source</a></Tech>
          </article>
        ))}
      </div>
      <SourceLinks keys={p.familySource} sources={sources} />
    </div>
  );
}

/* ───────── Ways in ───────── */
function Ways({ p, sources, onStamp }) {
  return (
    <div className="ml-pane">
      <div className="ml-grid">
        {p.ways.map(([label, text, key]) => (
          <article key={label} className="ml-card">
            <span className="ml-eyebrow">{label}</span>
            <p>{text}</p>
            {sources[key] && <a className="ml-btn" href={sources[key]} target="_blank" rel="noopener noreferrer" onClick={() => onStamp('ways')}>Open the official page ↗</a>}
          </article>
        ))}
      </div>
    </div>
  );
}

/* ───────── Pick a model ───────── */
function Pick({ p, onStamp }) {
  const [choice, setChoice] = useState(null);
  const pick = choice == null ? null : p.picker[choice];
  const model = pick && p.models.find((m) => pick[1].toLowerCase().includes(m.name.toLowerCase()) || m.name.toLowerCase().includes(pick[1].toLowerCase()));
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <h4>What do you need to do?</h4>
        <div className="ml-opts">
          {p.picker.map(([task], i) => (
            <button key={task} type="button" className="ml-opt" aria-pressed={choice === i} onClick={() => { setChoice(i); onStamp('pick'); }}>{task}</button>
          ))}
        </div>
      </div>
      {pick && (
        <div className="ml-card ml-result">
          <span className="ml-eyebrow">Suggested starting point</span>
          <div className="ml-big">{pick[1]}</div>
          {model && <p>{model.cardCopy}</p>}
          <p className="ml-small">{p.pickerNote}</p>
          <Tech>Validate the suggestion on your own examples before committing: run a few representative tasks and compare quality, latency and cost.</Tech>
        </div>
      )}
    </div>
  );
}

/* ───────── Cost lab ───────── */
function appliesOn(r, day) {
  return (!r.effectiveFrom || day >= r.effectiveFrom) && (!r.effectiveTo || day <= r.effectiveTo);
}
function appliesTo(r, tin) {
  return (r.inputTokensMinInclusive == null || tin >= r.inputTokensMinInclusive)
    && (r.inputTokensMinExclusive == null || tin > r.inputTokensMinExclusive)
    && (r.inputTokensMaxInclusive == null || tin <= r.inputTokensMaxInclusive)
    && (r.inputTokensMaxExclusive == null || tin < r.inputTokensMaxExclusive);
}
const tierNote = (r) => {
  if (r.inputTokensMaxInclusive != null) return `prompts up to ${fmtTokens(r.inputTokensMaxInclusive)}`;
  if (r.inputTokensMaxExclusive != null) return `prompts under ${fmtTokens(r.inputTokensMaxExclusive)}`;
  if (r.inputTokensMinExclusive != null) return `prompts over ${fmtTokens(r.inputTokensMinExclusive)}`;
  if (r.inputTokensMinInclusive != null) return `prompts of ${fmtTokens(r.inputTokensMinInclusive)} or more`;
  return null;
};

function Cost({ p, shared, onStamp }) {
  const [tin, setTin] = useState(20000);
  const [cached, setCached] = useState(0);
  const [tout, setTout] = useState(5000);
  const [req, setReq] = useState(200);
  const day = today();
  const name = (id) => p.models.find((m) => m.modelId === id)?.name || id;
  const rows = p.rates
    .filter((r) => appliesOn(r, day) && appliesTo(r, tin))
    .map((r) => {
      const usable = r.calculatorEnabledByDefault && Number.isFinite(r.input) && Number.isFinite(r.output);
      const cacheRate = Number.isFinite(r.cachedInput) ? r.cachedInput : r.input;
      const c = Math.min(cached, tin);
      const per = usable ? ((tin - c) * r.input + c * cacheRate + tout * r.output) / 1e6 : NaN;
      return { ...r, usable, per, mo: per * req * 30 };
    });
  const upcoming = p.rates.filter((r) => r.effectiveFrom && r.effectiveFrom > day);
  const mx = Math.max(...rows.filter((r) => r.usable).map((r) => r.mo), 0.0001);
  const set = (fn) => (e) => { fn(Math.max(0, +e.target.value || 0)); onStamp('cost'); };
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-row"><span className="ml-small">Presets:</span>
          {shared.costPresets.map((x) => (
            <button key={x.name} type="button" className="ml-chip" onClick={() => { setTin(x.inputTokens); setTout(x.outputTokens); setReq(x.requestsPerDay); setCached(0); onStamp('cost'); }}>{x.name}</button>
          ))}
        </div>
        <div className="ml-form">
          <label>Input tokens per request<input type="number" min="0" value={tin} onChange={set(setTin)} /></label>
          <label>of which cached<input type="number" min="0" value={cached} onChange={set(setCached)} /></label>
          <label>Output tokens per request<input type="number" min="0" value={tout} onChange={set(setTout)} /></label>
          <label>Requests per day<input type="number" min="0" value={req} onChange={set(setReq)} /></label>
        </div>
        <div className="ml-tbl">
          <table>
            <thead><tr><th>Model</th><th>$ in / M</th><th>$ out / M</th><th>Per request</th><th>Per month</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r.modelId}-${r.label}-${r.effectiveFrom || ''}`}>
                  <td>
                    <span className="ml-nowrap">{name(r.modelId)}</span>
                    <small className="ml-small">{' '}{[r.label !== 'Standard' && r.label, tierNote(r), r.scope, r.effectiveTo && `until ${fmtDate(r.effectiveTo)}`].filter(Boolean).join(' · ')}</small>
                  </td>
                  {r.usable ? (
                    <>
                      <td>${r.input}</td><td>${r.output}</td><td>{money(r.per)}</td><td>{money(r.mo)}</td>
                      <td><div className="ml-mbar"><i style={{ width: `${Math.max(2, (r.mo / mx) * 100)}%`, background: 'var(--accent)' }} /></div></td>
                    </>
                  ) : (
                    <td colSpan={5}>
                      <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer">{shared.unknownPriceLabel} ↗</a>
                      <small className="ml-small"> {Number.isFinite(r.input) ? `listed ${money(r.input)} / ${money(r.output)}, not yet verified on an official pricing page` : 'price not published on a verifiable official page'}</small>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {upcoming.length > 0 && (
          <ul className="ml-small">
            {upcoming.map((r) => <li key={`${r.modelId}-${r.effectiveFrom}`}>Scheduled: {name(r.modelId)} changes to ${r.input} / ${r.output} from {fmtDate(r.effectiveFrom)}.</li>)}
          </ul>
        )}
        <p className="ml-note">{p.costCopy}</p>
        <Tech>Cost = {shared.costFormula}. Month = 30 days. Cached tokens use the cache-hit rate where the provider publishes one.</Tech>
        <p className="ml-small">{shared.pricingDisclaimer}</p>
      </div>
    </div>
  );
}

/* ───────── Benchmarks ───────── */
function Bench({ p, shared, onStamp, stamped }) {
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <p>{shared.benchmarkIntro}</p>
        <p className="ml-small">{shared.benchmarkEmptyState}</p>
      </div>
      <div className="ml-card">
        <h4>Build your own test</h4>
        <p>{p.benchmarkCopy}</p>
        <Tech>A comparable score needs: {shared.benchmarkFields.join(', ')}.</Tech>
        <GotIt onClick={() => onStamp('bench')} done={stamped}>I&apos;ll build this task set</GotIt>
      </div>
    </div>
  );
}

/* ───────── Patterns ───────── */
function Patterns({ p, onStamp, stamped }) {
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <h4>Suggested routing pattern</h4>
        <p>{p.pattern}</p>
        <GotIt onClick={() => onStamp('patterns')} done={stamped} />
      </div>
    </div>
  );
}

/* ───────── Access ───────── */
function Access({ p, sources, onStamp, stamped }) {
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <h4>Who can use what</h4>
        <p>{p.access}</p>
        <SourceLinks keys={p.accessSource} sources={sources} />
        <GotIt onClick={() => onStamp('access')} done={stamped} />
      </div>
    </div>
  );
}

/* ───────── Try it (missions) ───────── */
function Missions({ p, onStamp }) {
  const [done, setDone] = usePersisted(`missions-${p.id}`, []);
  const toggle = (id) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    if (next.length) onStamp('try');
  };
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-between"><strong>{done.length} of {p.missions.length} done</strong><span className="ml-small">Beginner, Builder, Expert</span></div>
        <div className="ml-prog"><i style={{ width: `${(done.length / p.missions.length) * 100}%` }} /></div>
      </div>
      <div className="ml-grid wide">
        {p.missions.map(([level, title, steps, prompt, check]) => (
          <article key={title} className={`ml-card${done.includes(title) ? ' done' : ''}`}>
            <div className="ml-row"><span className="ml-lvl">{level}</span><h4>{title}</h4></div>
            <p>{steps}</p>
            <CopyBlock text={prompt} />
            <p className="ml-small"><strong>Check:</strong> {check}</p>
            <label className="ml-check"><input type="checkbox" checked={done.includes(title)} onChange={() => toggle(title)} /> I did this</label>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ───────── Quiz ───────── */
function Quiz({ p, onStamp }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [best, setBest] = usePersisted(`best-${p.id}`, 0);
  const qs = p.quiz;
  const q = qs[i];
  const finished = i >= qs.length;
  useEffect(() => {
    if (finished) { if (score > best) setBest(score); if (score >= PASS) onStamp('quiz'); }
  }, [finished, score, best, setBest, onStamp]);
  if (finished) {
    return (
      <div className="ml-pane"><div className="ml-card">
        <h4>You scored {score} of {qs.length}</h4>
        <p>{score >= PASS ? 'Stamp earned. Now go run a mission.' : `You need ${PASS} to pass. Re-read the answers and try again.`} Best score: {Math.max(best, score)}.</p>
        <button type="button" className="ml-btn pri" onClick={() => { setI(0); setScore(0); setPicked(null); }}>Try again</button>
      </div></div>
    );
  }
  const choose = (j) => { if (picked !== null) return; setPicked(j); if (j === q.correctIndex) setScore(score + 1); };
  return (
    <div className="ml-pane"><div className="ml-card">
      <span className="ml-eyebrow">Question {i + 1} of {qs.length}</span>
      <h4>{q.question}</h4>
      {q.options.map((o, j) => (
        <button key={o} type="button" className={`ml-qopt${picked !== null ? (j === q.correctIndex ? ' right' : j === picked ? ' wrong' : '') : ''}`} onClick={() => choose(j)}>{o}</button>
      ))}
      {picked !== null && (
        <div className="ml-explain">
          <p><strong>{picked === q.correctIndex ? 'Correct. ' : 'Not quite. '}</strong>{q.explanation}</p>
          <button type="button" className="ml-btn pri" onClick={() => { setI(i + 1); setPicked(null); }}>{i === qs.length - 1 ? 'See score' : 'Next'}</button>
        </div>
      )}
    </div></div>
  );
}

/* ───────── What's new ───────── */
function News({ p, sources, checkedOn }) {
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <p>{p.whatsNew}</p>
        <SourceLinks keys={p.newsSource} sources={sources} label="Check for updates" />
        <p className="ml-small">Content checked against official pages on {fmtDate(checkedOn)}.</p>
      </div>
    </div>
  );
}

/* ───────── Shell ───────── */
const PANES = { family: Family, ways: Ways, pick: Pick, cost: Cost, bench: Bench, patterns: Patterns, access: Access, try: Missions, quiz: Quiz, news: News };

export default function FrontierLab({ pack, providerId }) {
  const p = pack.providers.find((x) => x.id === providerId);
  const [tab, setTab] = useState('family');
  const [stamps, setStamps] = usePersisted(`stamps-${providerId}`, []);
  const [toast, setToast] = useState('');
  const onStamp = useCallback((k) => {
    if (stamps.includes(k)) return;
    setStamps([...stamps, k]);
    setToast(`Stamp earned: ${STAMP_LABELS[k]}`);
    setTimeout(() => setToast(''), 2200);
  }, [stamps, setStamps]);
  if (!p) return null;
  const Pane = PANES[tab];
  const stampKey = { try: 'try', news: null }[tab] ?? tab;
  return (
    <>
      <span className="ml-count">{stamps.length}/{Object.keys(STAMP_LABELS).length} stamps</span>
      <p className="ml-small">{p.intro}</p>
      <div className="ml-tabs" role="tablist">
        {TABS.map(([k, label]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{label}</button>)}
      </div>
      <Pane p={p} shared={pack.shared} sources={pack.sources} checkedOn={pack.checkedOn} onStamp={onStamp} stamped={stampKey != null && stamps.includes(stampKey)} />
      <div className={`ml-toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  );
}
