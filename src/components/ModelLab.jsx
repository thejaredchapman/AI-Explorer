import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  labAsOf, LAUNCH_URL, FAMILY, WAYS, WAY_FILTERS, BENCH_MODELS, BENCHMARKS, COST_PRESETS, COST_ROWS,
  PICK_QUESTIONS, PATTERN_TASKS, PATTERN_MODES, ACCESS_REQUESTS, MISSIONS, QUIZ, RADAR, RADAR_SINCE, RADAR_UNVERIFIED,
} from '../data/modelLabData';
import { usePersisted, money } from './labShared';
import { Dot, Tech, CopyBlock } from './LabUi';
import FrontierLab from './FrontierLab';
import './ModelLab.css';

/* ───────── Family ───────── */
function Family({ onStamp }) {
  const [open, setOpen] = useState({});
  const [fm, setFm] = useState('f');
  const toggle = (id) => {
    const next = { ...open, [id]: !open[id] };
    setOpen(next);
    if (Object.values(next).filter(Boolean).length >= 2) onStamp('family');
  };
  return (
    <div className="ml-pane">
      <div className="ml-ladder">
        <span className="ml-pill"><Dot color="#ec9a3c" />Start at Opus 5.5</span> then
        <span className="ml-pill">step up to <Dot color="#e0658f" />Fable or <Dot color="#a58ae0" />Mythos</span> or
        <span className="ml-pill">step down to <Dot color="#5b8def" />Sonnet or <Dot color="#6fbcb4" />Haiku</span>
      </div>
      <div className="ml-grid">
        {FAMILY.map((m) => (
          <article key={m.id} className="ml-card">
            <button type="button" className="ml-head" aria-expanded={!!open[m.id]} onClick={() => toggle(m.id)}>
              <Dot color={m.color} /><span className="ml-name">{m.name}</span><span className="ml-chev">{open[m.id] ? '−' : '+'}</span>
              <span className="ml-tag">{m.tag}</span>
            </button>
            {open[m.id] && (
              <div className="ml-body">
                <p>{m.role}</p>
                <ul>{m.uses.map((u) => <li key={u}>{u}</li>)}</ul>
                <Tech>{m.tech}</Tech>
                <p className="ml-tech">API ID: <code>{m.apiId}</code></p>
              </div>
            )}
          </article>
        ))}
      </div>
      <div className="ml-card">
        <h4>Same brain, different guardrails</h4>
        <div className="ml-seg" role="group" aria-label="Fable or Mythos">
          <button type="button" aria-pressed={fm === 'f'} onClick={() => { setFm('f'); onStamp('family'); }}>Fable 5.2</button>
          <button type="button" aria-pressed={fm === 'm'} onClick={() => { setFm('m'); onStamp('family'); }}>Mythos 5.2</button>
        </div>
        <div className="ml-trio">
          <div><span className="ml-eyebrow">Capability</span><p>Same underlying model</p></div>
          <div><span className="ml-eyebrow">Cyber + biology safeguards</span><p>{fm === 'f' ? 'On. Blocked queries fall back to older Opus models (Opus 4.8 for cyber, Opus 5 for biology).' : 'Reduced. Mythos runs without certain cyber and biology safeguards.'}</p></div>
          <div><span className="ml-eyebrow">Who can use it</span><p>{fm === 'f' ? 'Everyone, on all platforms including AWS, Google Cloud and Azure.' : 'Vetted organizations in the verification programs.'}</p></div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Ways in ───────── */
function Ways({ onStamp }) {
  const [f, setF] = useState('all');
  const hits = WAYS.filter((w) => f === 'all' || w.who.includes(f)).length;
  return (
    <div className="ml-pane">
      <div className="ml-row" role="group" aria-label="Who are you">
        {WAY_FILTERS.map(([k, label]) => (
          <button key={k} type="button" className="ml-chip" aria-pressed={f === k} onClick={() => { setF(k); onStamp('ways'); }}>{label}</button>
        ))}
      </div>
      <p className="ml-small">{f === 'all' ? 'All 9 routes shown.' : `${hits} of 9 routes fit you. The rest are dimmed.`}</p>
      <div className="ml-grid">
        {WAYS.map((w) => {
          const hit = f === 'all' || w.who.includes(f);
          return (
            <article key={w.name} className="ml-card" style={{ opacity: hit ? 1 : 0.4 }}>
              <div className="ml-between"><h4>{w.name}</h4><span className="ml-lvl">{w.group}</span></div>
              <ol className="ml-steps">{w.steps.map((s) => <li key={s}>{s}</li>)}</ol>
              <p className="ml-small">Fast mode: <strong>{w.fast}</strong></p>
              {w.link && <p className="ml-small"><a href={w.link[0]} target="_blank" rel="noopener noreferrer">{w.link[1]}</a></p>}
              <Tech>{w.tech}</Tech>
            </article>
          );
        })}
      </div>
      <div className="ml-card ml-gated">
        <h4>Getting Mythos 5.2</h4>
        <p>Mythos is not on the open menu. Vetted organizations apply through a verification program, then use it on the Claude API, or through Claude Security on Claude Enterprise. Fast mode for Mythos is limited to Verification Program organizations.</p>
        <div className="ml-row">
          <a className="ml-btn" href="https://support.claude.com/en/articles/14604842-cyber-verification-program" target="_blank" rel="noopener noreferrer">Cyber Verification Program</a>
          <a className="ml-btn" href="https://claude.com/product/claude-security" target="_blank" rel="noopener noreferrer">Claude Security (Enterprise)</a>
        </div>
      </div>
    </div>
  );
}

/* ───────── Pick ───────── */
const TIER = ['', 'haiku', 'sonnet', 'opus', 'fable'];
function Pick({ onStamp, onJump }) {
  const [ans, setAns] = useState({});
  const done = Object.keys(ans).length === PICK_QUESTIONS.length;
  const rec = useMemo(() => {
    if (!done) return null;
    const v = (k) => PICK_QUESTIONS.find((q) => q.k === k).o[ans[k]][1];
    const lvl = Math.max(1, Math.min(4, v('task') + v('prio') + (v('vol') === 'scale' ? -1 : 0)));
    const dom = v('dom'), vol = v('vol');
    let key = TIER[lvl];
    const why = [`Your task sits at the "${['', 'simple', 'routine', 'professional', 'ambitious'][v('task')]}" level.`];
    if (v('prio') === -1) why.push('You value cost and speed, so it drops a tier.');
    if (v('prio') === 1) why.push('You want the best result, so it moves up a tier.');
    if (vol === 'scale') why.push('At constant volume, a lighter tier keeps the bill sane.');
    let pattern = 'Run it solo';
    if (dom === 'sec') { key = 'mythos'; why.push('Security research is where Mythos 5.2 is strongest, but it needs the Cyber Verification Program. Without it, Fable blocks most cyber tasks.'); }
    if (dom === 'bio') { key = 'mythos'; why.push('Fable blocks most research biology and falls back to Opus 5. Mythos 5.2 is the route for verified life-science teams.'); }
    const effort = lvl === 4 ? 'High, and Xhigh for your hardest runs' : lvl === 3 ? 'Medium (the default in Claude apps and Claude Code)' : 'The default. Raise it only if results fall short.';
    if (lvl === 4 && vol !== 'few') pattern = 'Orchestrator: Fable keeps the hard calls and hands routine tasks to Sonnet and Haiku.';
    else if (lvl <= 3 && v('prio') === 1) pattern = `Advisor: run on ${FAMILY.find((m) => m.id === key).name} and consult Fable 5.2 for hard decisions.`;
    if (key === 'mythos') pattern = dom === 'bio' ? 'Verified access first: apply through the Life Sciences Verification Program.' : 'Verified access first: apply through the Cyber Verification Program. Claude Enterprise teams can also use Claude Security, which now includes Mythos 5.2.';
    return { model: FAMILY.find((m) => m.id === key), why, effort, pattern };
  }, [ans, done]);
  useEffect(() => { if (done) onStamp('picker'); }, [done, onStamp]);
  return (
    <div className="ml-pane ml-two">
      <div className="ml-card ml-qs">
        {PICK_QUESTIONS.map((q, i) => (
          <div key={q.k}>
            <h4>{i + 1}. {q.q}</h4>
            <div className="ml-opts">
              {q.o.map((o, j) => (
                <button key={o[0]} type="button" className="ml-opt" aria-pressed={ans[q.k] === j} onClick={() => setAns({ ...ans, [q.k]: j })}>
                  {o[0]}{o[2] && <small>{o[2]}</small>}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="ml-card ml-result">
        <span className="ml-eyebrow">Your recommendation</span>
        {!rec ? <p className="ml-small">Answer all four questions and it appears here. {PICK_QUESTIONS.length - Object.keys(ans).length} to go.</p> : (
          <>
            <div className="ml-big"><Dot color={rec.model.color} />{rec.model.name}</div>
            <p>{rec.model.tag}.</p>
            <ul>{rec.why.map((w) => <li key={w}>{w}</li>)}</ul>
            <div className="ml-trio"><div><span className="ml-eyebrow">Effort</span><p>{rec.effort}</p></div><div><span className="ml-eyebrow">Pattern</span><p>{rec.pattern}</p></div></div>
            <Tech>API ID: {rec.model.apiId}. {rec.model.tech}</Tech>
            <div className="ml-row"><button type="button" className="ml-btn pri" onClick={() => onJump('try')}>Try it in a mission</button><button type="button" className="ml-btn" onClick={() => setAns({})}>Start over</button></div>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────── Cost ───────── */
function Cost({ onStamp }) {
  const [tin, setTin] = useState(30000);
  const [tout, setTout] = useState(3000);
  const [req, setReq] = useState(200);
  const rows = COST_ROWS.map((r) => {
    const long = r.longPrice && tin > r.longAbove;
    const [pi, po] = long ? r.longPrice : r.price;
    const per = (tin / 1e6) * pi + (tout / 1e6) * po;
    return { ...r, long, eff: [pi, po], per, mo: per * req * 30 };
  });
  const mx = Math.max(...rows.map((r) => r.mo), 0.0001);
  const set = (fn) => (e) => { fn(+e.target.value || 0); onStamp('cost'); };
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-row"><span className="ml-small">Presets:</span>
          {COST_PRESETS.map(([n, i, o, r]) => <button key={n} type="button" className="ml-chip" onClick={() => { setTin(i); setTout(o); setReq(r); onStamp('cost'); }}>{n}</button>)}
        </div>
        <div className="ml-form">
          <label>Input tokens per request<input type="number" min="0" value={tin} onChange={set(setTin)} /></label>
          <label>Output tokens per request<input type="number" min="0" value={tout} onChange={set(setTout)} /></label>
          <label>Requests per day<input type="number" min="0" value={req} onChange={set(setReq)} /></label>
        </div>
        <div className="ml-tbl">
          <table>
            <thead><tr><th>Model</th><th>$ in / M</th><th>$ out / M</th><th>Per request</th><th>Per month</th><th /></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td><span className="ml-nowrap"><Dot color={r.color} />{r.name}</span>{r.longPrice && <small className="ml-small"> {r.long ? `prompt over ${r.longAbove / 1000}K tokens: higher rate` : `up to ${r.longAbove / 1000}K-token prompts`}</small>}</td>
                  <td>${r.eff[0]}</td><td>${r.eff[1]}</td><td>{money(r.per)}</td><td>{money(r.mo)}</td>
                  <td><div className="ml-mbar"><i style={{ width: `${Math.max(2, (r.mo / mx) * 100)}%`, background: r.color }} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Tech>Cost = (input tokens / 1,000,000 x input price) + (output tokens / 1,000,000 x output price). Month = 30 days. Fast mode charges twice the standard rate for up to 2.5x faster generation. Anthropic says Fable 5.2 at High effort is about level with Opus 5.5 at Max effort on FrontierCode 2.0, for roughly half the cost per task, so price per request is only half the story; price per solved task is the number to watch. Haiku 5.5 is $0.10 / $0.50 for prompts up to 100K tokens and $0.50 / $2.50 above that. Batch is 50% off and cache reads are a fraction of input price (Opus 5.5 and Sonnet 5.5: 5%; Fable 5.2: 2.5%; Haiku 5.5: 10%).</Tech>
        <p className="ml-small ml-simple-only">Rule of thumb: output tokens cost 5x input tokens on Fable. Long answers and long agent runs are where the money goes.</p>
      </div>
    </div>
  );
}

/* ───────── Benchmarks ───────── */
function Bench({ onStamp }) {
  const [bi, setBi] = useState(0);
  const [guessOn, setGuessOn] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [guess, setGuess] = useState(50);
  const [msg, setMsg] = useState('');
  const b = BENCHMARKS[bi];
  const hero = b.s.f52 != null ? 'f52' : 'm52';
  const hide = guessOn && !revealed;
  const rows = Object.keys(b.s).sort((a, c) => b.s[c] - b.s[a]);
  const pick = (i) => { setBi(i); setRevealed(false); setMsg(''); };
  const lock = () => {
    const a = b.s[hero], d = Math.abs(guess - a);
    setRevealed(true);
    setMsg(`You said ${guess}%. Actual: ${a}%. ${d < 3 ? 'Within 3 points, nicely done.' : d < 10 ? `Off by ${d.toFixed(1)} points.` : `Off by ${d.toFixed(1)} points. Surprising, right?`}`);
    onStamp('bench');
  };
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-row" role="group" aria-label="Benchmarks">
          {BENCHMARKS.map((x, i) => <button key={x.name} type="button" className="ml-chip" aria-pressed={i === bi} onClick={() => pick(i)}>{x.name}</button>)}
        </div>
        <div className="ml-between">
          <div><h4>{b.name}</h4><p className="ml-small">{b.what}</p></div>
          <label className="ml-check"><input type="checkbox" checked={guessOn} onChange={(e) => { setGuessOn(e.target.checked); setRevealed(false); setMsg(''); }} /> Guess first</label>
        </div>
        {guessOn && (
          <div className="ml-guess">
            <label htmlFor="ml-guess-range">What did {b.labels?.[hero] || BENCH_MODELS[hero][0]} score? {guess}%</label>
            <input id="ml-guess-range" type="range" min="0" max="100" step="0.5" value={guess} onChange={(e) => setGuess(+e.target.value)} />
            <div className="ml-row"><button type="button" className="ml-btn pri" onClick={lock}>Lock in my guess</button><span className="ml-small">{msg}</span></div>
          </div>
        )}
        <div>
          {rows.map((k) => {
            const h = hide && k === hero, [baseName, color] = BENCH_MODELS[k], name = b.labels?.[k] || baseName;
            return (
              <div key={k} className={`ml-brow${h ? ' hid' : ''}`}>
                <span className="ml-lbl"><Dot color={color} />{name}</span>
                <span className="ml-track"><i style={{ width: h ? '100%' : `${b.s[k]}%`, background: h ? undefined : color, opacity: k === 'f51' || k === 'm51' ? 0.55 : 1 }} /></span>
                <b>{h ? '?' : b.s[k].toFixed(1)}</b>
              </div>
            );
          })}
        </div>
        <Tech>{b.note} Scores are as reported by Anthropic in the launch post.</Tech>
      </div>
    </div>
  );
}

/* ───────── Patterns ───────── */
const UNIT = { haiku: 1, sonnet: 3, opus: 5, fable: 8 };
const WHO_COLOR = { haiku: '#6fbcb4', sonnet: '#5b8def', fable: '#e0658f' };
function Patterns({ onStamp }) {
  const [mode, setMode] = useState('orch');
  const [tasks, setTasks] = useState(PATTERN_TASKS);
  const plan = useMemo(() => {
    const rows = tasks.map((t) => {
      let who, cost, risk = false;
      if (mode === 'fable') { who = ['fable']; cost = 8; }
      else if (mode === 'small') { who = ['sonnet']; cost = 3; risk = t.d === 3; }
      else if (mode === 'advisor') { who = ['sonnet']; cost = 3; if (t.d === 3) { who = ['sonnet', 'fable']; cost += 2; } }
      else { who = [t.d === 1 ? 'haiku' : t.d === 2 ? 'sonnet' : 'fable']; cost = UNIT[who[0]]; }
      return { t, who, cost, risk };
    });
    const total = rows.reduce((a, r) => a + r.cost, 0) + (mode === 'orch' ? 2 : 0);
    const risks = rows.filter((r) => r.risk).length;
    const sv = Math.round((1 - total / (tasks.length * 8)) * 100);
    return { rows, total, risks, sv };
  }, [mode, tasks]);
  const cycle = (i) => { setTasks(tasks.map((t, j) => (j === i ? { ...t, d: (t.d % 3) + 1 } : t))); onStamp('patterns'); };
  const DL = ['', 'Easy', 'Medium', 'Hard'];
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-row" role="group" aria-label="Strategy">
          {PATTERN_MODES.map(([k, n]) => <button key={k} type="button" className="ml-chip" aria-pressed={mode === k} onClick={() => { setMode(k); onStamp('patterns'); }}>{n}</button>)}
        </div>
        <p className="ml-small">{PATTERN_MODES.find((m) => m[0] === mode)[2]}</p>
        {plan.rows.map((r, i) => (
          <div key={r.t.t} className="ml-task">
            <span>{r.t.t}</span>
            <button type="button" className="ml-diff" onClick={() => cycle(i)} aria-label={`Difficulty ${DL[r.t.d]}. Tap to change`}>{'●'.repeat(r.t.d)}{'○'.repeat(3 - r.t.d)} {DL[r.t.d]}</button>
            <div className="ml-who">
              {r.who.map((w, j) => <span key={w + j} className="ml-pill"><Dot color={WHO_COLOR[w]} />{j ? 'advises ' : ''}{w[0].toUpperCase() + w.slice(1)}</span>)}
              {r.risk && <span className="ml-risk">likely to struggle</span>}
              <span className="ml-small">{r.cost} units</span>
            </div>
          </div>
        ))}
        <div className="ml-trio">
          <div><span className="ml-eyebrow">Total cost units</span><p>{plan.total}{mode === 'orch' && <span className="ml-small"> (includes 2 for planning)</span>}</p></div>
          <div><span className="ml-eyebrow">Versus solo Fable</span><p>{plan.sv > 0 ? `${plan.sv}% cheaper` : plan.sv < 0 ? `${-plan.sv}% pricier` : 'same'}</p></div>
          <div><span className="ml-eyebrow">Risky tasks</span><p>{plan.risks ? `${plan.risks} hard task${plan.risks > 1 ? 's' : ''} on a smaller model` : 'None'}</p></div>
        </div>
        <Tech>Advisor: a smaller model (Haiku, Sonnet or Opus) does the work and consults Fable 5.2 for hard calls. Orchestrator: Fable delegates simple tasks to smaller models and keeps the hard ones. Cost units here are illustrative (Haiku 1, Sonnet 3, Opus 5, Fable 8), not real prices. Docs: <a href="https://code.claude.com/docs/en/advisor" target="_blank" rel="noopener noreferrer">advisor</a>, <a href="https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration" target="_blank" rel="noopener noreferrer">orchestration</a>.</Tech>
      </div>
    </div>
  );
}

/* ───────── Access ───────── */
function Access({ onStamp }) {
  const [ri, setRi] = useState(0);
  const [m, setM] = useState('f');
  const r = ACCESS_REQUESTS[ri], f = m === 'f', name = f ? 'Fable 5.2' : 'Mythos 5.2';
  let st, title, body, target;
  if (r.kind === 'ok') { st = 'ok'; title = `Handled by ${name}`; target = name; body = 'Ordinary requests pass straight through. Safeguards target high-risk cyber activity and research biology, plus a few AI-R&D topics such as some accelerator kernels.'; }
  else if (r.kind === 'cyber') {
    if (f) { st = 'fb'; title = 'Blocked, rerouted to Opus 4.8'; target = 'Opus 4.8'; body = 'Fable 5.2 blocks penetration testing, exploit generation and binary vulnerability work. The query falls back to Opus 4.8.'; }
    else { st = 'gate'; title = 'Needs verification'; target = 'Mythos 5.2 (verified orgs)'; body = 'Mythos 5.2 is the model for this, but only for organizations in the Cyber Verification Program.'; }
  } else if (r.kind === 'scan') {
    if (f) { st = 'fb'; title = 'Mostly blocked on Fable'; target = 'Fallback or Claude Security'; body = 'Fable 5.2 blocks most cybersecurity tasks. Claude Enterprise customers can use Claude Security instead, which now includes Mythos 5.2, watches repos as code changes and tracks fixes.'; }
    else { st = 'gate'; title = 'Needs verification'; target = 'Mythos 5.2 (verified orgs)'; body = 'Available to Verification Program organizations, or through Claude Security for Enterprise customers.'; }
  } else if (r.kind === 'bio') {
    if (f) { st = 'fb'; title = 'Blocked, rerouted to Opus 5'; target = 'Opus 5'; body = 'Fable 5.2 blocks most research-biology tasks. Blocked queries fall back to Opus 5.'; }
    else { st = 'gate'; title = 'Needs verification'; target = 'Mythos 5.2 (verified orgs)'; body = 'Mythos 5.2 handles this for organizations that pass the Life Sciences verification.'; }
  } else {
    st = 'fb'; title = 'Partly limited, may fall back to Opus 5'; target = 'Opus 5 for some topics';
    body = f ? 'Anthropic deliberately limited accelerator-kernel optimization and LLM architecture work to about Opus 5.5 level. Some topics, including kernels for certain nonstandard accelerators, fall back to Opus 5.' : 'Same as Fable: AI-R&D work is limited to about Opus 5.5 level in training, and some topics, including kernels for certain nonstandard accelerators, fall back to Opus 5.';
  }
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-row" role="group" aria-label="Requests">
          {ACCESS_REQUESTS.map((x, i) => <button key={x.label} type="button" className="ml-chip" aria-pressed={i === ri} onClick={() => { setRi(i); onStamp('access'); }}>{x.label}</button>)}
        </div>
        <div className="ml-seg" role="group" aria-label="Model">
          <button type="button" aria-pressed={f} onClick={() => { setM('f'); onStamp('access'); }}>Fable 5.2</button>
          <button type="button" aria-pressed={!f} onClick={() => { setM('m'); onStamp('access'); }}>Mythos 5.2</button>
        </div>
        <div className="ml-path">
          <span className="ml-node">{r.label}</span><span>→</span>
          <span className={`ml-node${st !== 'ok' ? ' hit' : ''}`}>Safeguard check</span><span>→</span>
          <span className={`ml-node${st === 'ok' ? ' hit' : ''}`}>{target}</span>
        </div>
        <span className={`ml-status ${st}`}>{st === 'ok' ? 'Allowed' : st === 'fb' ? 'Rerouted' : 'Gated'}</span>
        <h4>{title}</h4>
        <p>{body}</p>
        <Tech>Fable 5.2 blocks high-risk cyber activity (penetration testing, exploit generation, binary vulnerability work) and most research biology. Blocked queries fall back to Opus 4.8 for cyber and Opus 5 for biology. Anthropic reports about 55% fewer blocks than Fable 5.1 (about 60% fewer cyber, 40% fewer biology) in early testing.</Tech>
      </div>
    </div>
  );
}

/* ───────── Missions ───────── */
function Missions({ onStamp }) {
  const [done, setDone] = usePersisted('missions', []);
  const toggle = (id) => {
    const next = done.includes(id) ? done.filter((x) => x !== id) : [...done, id];
    setDone(next);
    if (next.length) onStamp('try');
  };
  return (
    <div className="ml-pane">
      <div className="ml-card">
        <div className="ml-between"><strong>{done.length} of {MISSIONS.length} done</strong><span className="ml-small">Beginner, Builder, Expert</span></div>
        <div className="ml-prog"><i style={{ width: `${(done.length / MISSIONS.length) * 100}%` }} /></div>
      </div>
      <div className="ml-grid wide">
        {MISSIONS.map((m) => (
          <article key={m.id} className={`ml-card${done.includes(m.id) ? ' done' : ''}`}>
            <div className="ml-row"><span className="ml-lvl">{m.level}</span><h4>{m.title}</h4></div>
            <p>{m.steps}</p>
            <CopyBlock text={m.prompt} />
            {m.link && <p className="ml-small"><a href={m.link[0]} target="_blank" rel="noopener noreferrer">{m.link[1]}</a></p>}
            <Tech>{m.tech}</Tech>
            <label className="ml-check"><input type="checkbox" checked={done.includes(m.id)} onChange={() => toggle(m.id)} /> I did this</label>
          </article>
        ))}
      </div>
    </div>
  );
}

/* ───────── Quiz ───────── */
function Quiz({ onStamp }) {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [best, setBest] = usePersisted('best', 0);
  const q = QUIZ[i];
  const finished = i >= QUIZ.length;
  useEffect(() => {
    if (finished) { if (score > best) setBest(score); if (score >= 6) onStamp('quiz'); }
  }, [finished, score, best, setBest, onStamp]);
  if (finished) {
    return (
      <div className="ml-pane"><div className="ml-card">
        <h4>You scored {score} of {QUIZ.length}</h4>
        <p>{score >= 6 ? 'Stamp earned. Now go run a mission.' : 'Close. Re-read the answers or flip to Technical mode and try again.'} Best score: {Math.max(best, score)}.</p>
        <button type="button" className="ml-btn pri" onClick={() => { setI(0); setScore(0); setPicked(null); }}>Try again</button>
      </div></div>
    );
  }
  const choose = (j) => { if (picked !== null) return; setPicked(j); if (j === q.a) setScore(score + 1); };
  return (
    <div className="ml-pane"><div className="ml-card">
      <span className="ml-eyebrow">Question {i + 1} of {QUIZ.length}</span>
      <h4>{q.q}</h4>
      {q.o.map((o, j) => (
        <button key={o} type="button" className={`ml-qopt${picked !== null ? (j === q.a ? ' right' : j === picked ? ' wrong' : '') : ''}`} onClick={() => choose(j)}>{o}</button>
      ))}
      {picked !== null && (
        <div className="ml-explain">
          <p><strong>{picked === q.a ? 'Correct. ' : 'Not quite. '}</strong>{q.e}</p>
          <button type="button" className="ml-btn pri" onClick={() => { setI(i + 1); setPicked(null); }}>{i === QUIZ.length - 1 ? 'See score' : 'Next'}</button>
        </div>
      )}
    </div></div>
  );
}

/* ───────── Radar ───────── */
function Radar() {
  const [prov, setProv] = useState('All');
  const names = ['All', ...RADAR.map((r) => r.provider)];
  return (
    <div className="ml-pane">
      <p className="ml-small">Changes since {RADAR_SINCE}, read from official provider pages on {labAsOf}. Every item links to its source. Items with no published date say so.</p>
      <div className="ml-row" role="group" aria-label="Provider">
        {names.map((n) => <button key={n} type="button" className="ml-chip" aria-pressed={prov === n} onClick={() => setProv(n)}>{n}</button>)}
      </div>
      {RADAR.filter((r) => prov === 'All' || r.provider === prov).map((r) => (
        <div key={r.provider} className="ml-card">
          <h4><Dot color={r.color} />{r.provider}</h4>
          <ul className="ml-feed">
            {r.items.map((it) => (
              <li key={it.date + it.text}>
                <span className="ml-date">{it.date}</span><span className={`ml-kind ${it.kind}`}>{it.kind}</span>
                <span>{it.text} <a href={it.url} target="_blank" rel="noopener noreferrer">source</a></span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="ml-card">
        <h4>Could not verify</h4>
        <p className="ml-small">These are gaps in what official pages let us read. Nothing here is guessed.</p>
        <ul>{RADAR_UNVERIFIED.map((u) => <li key={u}>{u}</li>)}</ul>
      </div>
    </div>
  );
}

/* ───────── Shell ───────── */
const TABS = [['family', 'Family'], ['ways', 'Ways in'], ['pick', 'Pick a model'], ['cost', 'Cost lab'], ['bench', 'Benchmarks'], ['patterns', 'Patterns'], ['access', 'Access'], ['try', 'Try it'], ['quiz', 'Quiz'], ['radar', "What's new"]];
const STAMP_LABELS = { family: 'Met the family', ways: 'Found a way in', picker: 'Picked a model', cost: 'Ran the numbers', bench: 'Made a prediction', patterns: 'Routed a task', access: 'Tested safeguards', try: 'Finished a mission', quiz: 'Passed the quiz' };

const PROVIDERS = [
  ['anthropic', 'Anthropic'], ['openai', 'OpenAI'], ['google', 'Google DeepMind'], ['xai', 'xAI / Grok'], ['mistral', 'Mistral AI'],
  ['deepseek', 'DeepSeek'], ['meta', 'Meta'], ['qwen', 'Alibaba / Qwen'], ['moonshot', 'Moonshot AI / Kimi'],
];

export default function ModelLab() {
  const [provider, setProvider] = usePersisted('provider', 'anthropic');
  const [pack, setPack] = useState(null);
  const [packError, setPackError] = useState(false);
  const [tab, setTab] = useState('family');
  const [depth, setDepth] = usePersisted('depth', 'simple');
  const [stamps, setStamps] = usePersisted('stamps', []);
  const [toast, setToast] = useState('');
  const onStamp = useCallback((k) => {
    if (stamps.includes(k)) return;
    setStamps([...stamps, k]);
    setToast(`Stamp earned: ${STAMP_LABELS[k]}`);
    setTimeout(() => setToast(''), 2200);
  }, [stamps, setStamps]);
  // The frontier provider pack is large, so load it only when someone picks a non-Anthropic provider.
  useEffect(() => {
    if (provider === 'anthropic' || pack) return;
    import('../data/frontierLabs.json').then((m) => setPack(m.default), () => setPackError(true));
  }, [provider, pack]);
  const total = Object.keys(STAMP_LABELS).length;
  const panes = { family: Family, ways: Ways, pick: Pick, cost: Cost, bench: Bench, patterns: Patterns, access: Access, try: Missions, quiz: Quiz, radar: Radar };
  const Pane = panes[tab];
  const isClaude = provider === 'anthropic';
  const title = isClaude ? 'Claude 5 family, hands on'
    : pack?.providers.find((x) => x.id === provider)?.title || `${PROVIDERS.find(([id]) => id === provider)?.[1]} models, hands on`;
  return (
    <section className="section" id="model-lab">
      <motion.div className="section-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="section-badge">Model Lab</span>
        <h2>{title}</h2>
        {isClaude
          ? <p>Pick a model, price it, argue with the benchmarks, find every way in, and run seven missions. Based on the Fable 5.2 and Mythos 5.2 launch of November 9, 2026 (<a href={LAUNCH_URL} target="_blank" rel="noopener noreferrer">read the original</a>).</p>
          : <p>Pick a provider, find a model that fits, price a realistic task, check the evidence, and learn by doing.</p>}
      </motion.div>
      <div className={`ml-lab depth-${depth}`}>
        <div className="ml-row ml-providers" role="group" aria-label="Choose a provider">
          <span className="ml-small">Choose a provider:</span>
          {PROVIDERS.map(([id, label]) => (
            <button key={id} type="button" className="ml-chip" aria-pressed={provider === id} onClick={() => setProvider(id)}>{label}</button>
          ))}
        </div>
        <div className="ml-bar">
          <div className="ml-seg" role="group" aria-label="Detail level">
            <button type="button" aria-pressed={depth === 'simple'} onClick={() => setDepth('simple')}>Simple</button>
            <button type="button" aria-pressed={depth === 'tech'} onClick={() => setDepth('tech')}>Technical</button>
          </div>
          {isClaude && <span className="ml-count">{stamps.length}/{total} stamps</span>}
        </div>
        {isClaude ? (
          <>
            <div className="ml-tabs" role="tablist">
              {TABS.map(([k, label]) => <button key={k} type="button" role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{label}</button>)}
            </div>
            <Pane onStamp={onStamp} onJump={setTab} />
            <div className={`ml-toast${toast ? ' show' : ''}`} role="status" aria-live="polite">{toast}</div>
          </>
        ) : pack ? (
          <FrontierLab key={provider} pack={pack} providerId={provider} />
        ) : (
          <p className="ml-small">{packError ? 'Could not load this provider. Reload the page to try again.' : 'Loading…'}</p>
        )}
      </div>
    </section>
  );
}
