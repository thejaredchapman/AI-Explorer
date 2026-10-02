import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  llmModels,
  providerOptions,
  categoryOptions,
  pricingOptions,
  capabilityLabels,
  sortOptions,
  dataAsOf,
  hfIncident,
} from '../data/llmData';
import { downloadMarkdown, formatAsOf } from '../utils/llmMarkdown';
import './LlmRubric.css';

const CATEGORY_COLORS = {
  Frontier: '#818cf8',
  Balanced: '#38bdf8',
  Efficient: '#34d399',
  Reasoning: '#fbbf24',
  'Open Source': '#2dd4bf',
  Specialized: '#c084fc',
};

const scoreTone = (v) => (v >= 9 ? 'high' : v >= 7 ? 'mid' : v >= 5 ? 'low' : 'weak');
const fmtTokens = (n) => (n >= 1000000 ? `${+(n / 1000000).toFixed(2)}M` : `${Math.round(n / 1000)}K`);
const fmtPrice = (n) => (n === 0 ? 'Free' : `$${n < 1 ? n.toFixed(2) : n}`);
const NEW_MODELS = llmModels
  .filter((m) => m.isNew)
  .sort((a, b) => b.releaseDate.localeCompare(a.releaseDate) || b.inputCost - a.inputCost);
const PROVIDER_COUNT = new Set(llmModels.map((m) => m.provider)).size;

function CapabilityBar({ label, value }) {
  return (
    <div className="lx-cap">
      <span className="lx-cap-label">{label}</span>
      <div className="lx-cap-track">
        <motion.div
          className={`lx-cap-fill tone-${scoreTone(value)}`}
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className={`lx-cap-value tone-${scoreTone(value)}`}>{value === 0 ? '—' : value}</span>
    </div>
  );
}

function Heat({ capabilities }) {
  return (
    <div className="lx-heat" aria-hidden="true">
      {Object.keys(capabilityLabels).map((k) => (
        <span key={k} className={`lx-heat-cell tone-${scoreTone(capabilities[k])}`} title={`${capabilityLabels[k]} ${capabilities[k]}/10`} />
      ))}
    </div>
  );
}

function ModelCard({ model, expanded, onToggle, index }) {
  const cat = CATEGORY_COLORS[model.category];
  return (
    <motion.article
      id={`lx-${model.id}`}
      className={`lx-card ${expanded ? 'is-open' : ''}`}
      style={{ '--rail': model.providerColor }}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: Math.min(index, 12) * 0.025, duration: 0.3 }}
    >
      <button className="lx-card-head" onClick={onToggle} aria-expanded={expanded}>
        <span className="lx-card-title">
          <span className="lx-card-name">{model.name}</span>
          <span className="lx-card-meta">
            <span style={{ color: model.providerColor }}>{model.provider}</span>
            <span style={{ color: cat }}>{model.category}</span>
            <span>{model.releaseDate}</span>
            {model.isNew && <span className="lx-tag-new">New</span>}
            {model.openSource && <span className="lx-tag">Open</span>}
            {model.multimodal && <span className="lx-tag">Multimodal</span>}
          </span>
        </span>
        <span className="lx-chev" aria-hidden="true">{expanded ? '−' : '+'}</span>
      </button>

      <dl className="lx-facts">
        <div><dt>Context</dt><dd>{fmtTokens(model.contextWindow)}</dd></div>
        <div><dt>In / 1M</dt><dd>{fmtPrice(model.inputCost)}</dd></div>
        <div><dt>Out / 1M</dt><dd>{fmtPrice(model.outputCost)}</dd></div>
        <div><dt>Params</dt><dd>{model.parameters}</dd></div>
        <div><dt>Tier</dt><dd>{model.pricingTier}</dd></div>
      </dl>
      <Heat capabilities={model.capabilities} />

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="lx-detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <p className="lx-desc">{model.description}</p>
            <p className="lx-best"><strong>Best for</strong> {model.bestUseCase}</p>
            <div className="lx-caps">
              {Object.entries(model.capabilities).map(([k, v]) => (
                <CapabilityBar key={k} label={capabilityLabels[k]} value={v} />
              ))}
            </div>
            <div className="lx-pros-cons">
              <div>
                <h4>Strengths</h4>
                <ul className="lx-list pro">{model.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
              <div>
                <h4>Limitations</h4>
                <ul className="lx-list con">{model.limitations.map((l) => <li key={l}>{l}</li>)}</ul>
              </div>
            </div>
            <p className="lx-foot">
              Max output {model.maxOutput.toLocaleString()} tokens ·{' '}
              <a href={model.docsUrl} target="_blank" rel="noopener noreferrer">Official docs ↗</a>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function Incident() {
  const [open, setOpen] = useState(true);
  return (
    <section className="lx-incident" aria-labelledby="lx-incident-title">
      <div className="lx-incident-top">
        <span className="lx-flag">Incident report</span>
        <button className="lx-link-btn" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
          {open ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <h3 id="lx-incident-title">{hfIncident.title}</h3>
      <p className="lx-incident-summary">{hfIncident.summary}</p>
      <ul className="lx-incident-stats">
        {hfIncident.stats.map((s) => (
          <li key={s.label}><strong>{s.value}</strong><span>{s.label}</span></li>
        ))}
      </ul>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="lx-incident-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="lx-incident-grid">
              <ol className="lx-timeline">
                {hfIncident.timeline.map((t) => (
                  <li key={t.date}><time>{t.date}</time><p>{t.text}</p></li>
                ))}
              </ol>
              <div>
                <h4>Impact</h4>
                <ul className="lx-list con">{hfIncident.impact.map((i) => <li key={i}>{i}</li>)}</ul>
                <h4>Related: malicious model repo</h4>
                <p className="lx-related">{hfIncident.related}</p>
              </div>
            </div>
            <p className="lx-sources">
              Sources:{' '}
              {hfIncident.sources.map((s, i) => (
                <span key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
                  {i < hfIncident.sources.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function LlmRubric() {
  const [search, setSearch] = useState('');
  const [providerFilter, setProviderFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [pricingFilter, setPricingFilter] = useState('All');
  const [openSourceOnly, setOpenSourceOnly] = useState(false);
  const [multimodalOnly, setMultimodalOnly] = useState(false);
  const [sortBy, setSortBy] = useState('releaseDate');
  const [sortDir, setSortDir] = useState('desc');
  const [expandedId, setExpandedId] = useState(null);
  const [viewMode, setViewMode] = useState('cards');
  const catalogRef = useRef(null);

  const filtered = useMemo(() => {
    let result = [...llmModels];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((m) =>
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.bestUseCase.toLowerCase().includes(q) ||
        m.category.toLowerCase().includes(q));
    }
    if (providerFilter !== 'All') result = result.filter((m) => m.provider === providerFilter);
    if (categoryFilter !== 'All') result = result.filter((m) => m.category === categoryFilter);
    if (pricingFilter !== 'All') result = result.filter((m) => m.pricingTier === pricingFilter);
    if (openSourceOnly) result = result.filter((m) => m.openSource);
    if (multimodalOnly) result = result.filter((m) => m.multimodal);

    const value = (m) =>
      ['reasoning', 'coding', 'math', 'speed'].includes(sortBy) ? m.capabilities[sortBy] : m[sortBy] ?? m.name;
    result.sort((a, b) => {
      const A = value(a);
      const B = value(b);
      const cmp = typeof A === 'string' ? A.localeCompare(B) : A - B;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [search, providerFilter, categoryFilter, pricingFilter, openSourceOnly, multimodalOnly, sortBy, sortDir]);

  const toggleSort = (field) => {
    if (sortBy === field) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortBy(field); setSortDir('desc'); }
  };

  const clearFilters = () => {
    setSearch(''); setProviderFilter('All'); setCategoryFilter('All'); setPricingFilter('All');
    setOpenSourceOnly(false); setMultimodalOnly(false); setSortBy('releaseDate'); setSortDir('desc');
  };

  const hasActiveFilters = search || providerFilter !== 'All' || categoryFilter !== 'All' ||
    pricingFilter !== 'All' || openSourceOnly || multimodalOnly;

  const jumpTo = (model) => {
    clearFilters();
    setViewMode('cards');
    setExpandedId(model.id);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      document.getElementById(`lx-${model.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }));
  };

  const arrow = (id) => (sortBy === id ? (sortDir === 'asc' ? ' ↑' : ' ↓') : '');
  const sortableHead = (id, label) => (
    <th aria-sort={sortBy === id ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}>
      <button className="lx-th-btn" onClick={() => toggleSort(id)}>{label}{arrow(id)}</button>
    </th>
  );

  return (
    <section className="section lx" id="llm-rubric">
      <header className="lx-masthead">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <span className="lx-eyebrow">Step 2 — Compare Models</span>
          <h2 className="lx-title">Compare the <em>AI models</em></h2>
          <p className="lx-lede">
            Now that you understand the concepts, compare the actual models. Filter and sort to find the right LLM for
            your use case, whether you need top reasoning, speed, or open-source flexibility. Open any model for full details.
          </p>
          <p className="lx-disclaimer">
            Data pulled <time dateTime={dataAsOf}>{formatAsOf()}</time> · {llmModels.length} models · {PROVIDER_COUNT} providers.
            Pricing and availability change quickly; verify with each provider.{' '}
            <button className="lx-link-btn" onClick={downloadMarkdown}>Download all as .md ↓</button>
          </p>
        </motion.div>
      </header>

      <div className="lx-fresh">
        <div className="lx-band-head">
          <h3>New this cycle</h3>
          <span>Latest releases as of {formatAsOf()}</span>
        </div>
        <ul className="lx-fresh-list">
          {NEW_MODELS.map((m, i) => (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button className="lx-fresh-tile" style={{ '--rail': m.providerColor }} onClick={() => jumpTo(m)}>
                <span className="lx-fresh-provider">{m.provider} · {m.releaseDate}</span>
                <span className="lx-fresh-name">{m.name}</span>
                <span className="lx-fresh-price">
                  {fmtPrice(m.inputCost)}<small> in</small> / {fmtPrice(m.outputCost)}<small> out</small>
                </span>
                <span className="lx-fresh-ctx">{fmtTokens(m.contextWindow)} context</span>
                {m.id === 'gemini-4-argon' && <span className="lx-fresh-note">Fairwind-only access</span>}
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <Incident />

      <div className="lx-controls" ref={catalogRef}>
        <input
          type="search"
          className="lx-search"
          aria-label="Search models"
          placeholder="Search models, providers, capabilities…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label className="lx-select">
          <span>Provider</span>
          <select value={providerFilter} onChange={(e) => setProviderFilter(e.target.value)}>
            {providerOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="lx-select">
          <span>Category</span>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            {categoryOptions.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="lx-select">
          <span>Pricing</span>
          <select value={pricingFilter} onChange={(e) => setPricingFilter(e.target.value)}>
            {pricingOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="lx-select">
          <span>Sort</span>
          <select
            value={sortBy}
            onChange={(e) => { setSortBy(e.target.value); setSortDir(e.target.value === 'name' || e.target.value === 'provider' ? 'asc' : 'desc'); }}
          >
            {sortOptions.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </label>
        <button className="lx-chip" aria-pressed={sortDir === 'asc'} onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}>
          {sortDir === 'asc' ? 'Ascending ↑' : 'Descending ↓'}
        </button>
        <button className="lx-chip" aria-pressed={openSourceOnly} onClick={() => setOpenSourceOnly(!openSourceOnly)}>Open source</button>
        <button className="lx-chip" aria-pressed={multimodalOnly} onClick={() => setMultimodalOnly(!multimodalOnly)}>Multimodal</button>
        {hasActiveFilters && <button className="lx-link-btn" onClick={clearFilters}>Reset</button>}
      </div>

      <div className="lx-toolbar">
        <p>Showing <strong>{filtered.length}</strong> of {llmModels.length} models</p>
        <div className="lx-seg" role="group" aria-label="View mode">
          <button aria-pressed={viewMode === 'cards'} onClick={() => setViewMode('cards')}>Cards</button>
          <button aria-pressed={viewMode === 'table'} onClick={() => setViewMode('table')}>Table</button>
        </div>
      </div>

      {viewMode === 'cards' && (
        <motion.div className="lx-grid" layout>
          <AnimatePresence>
            {filtered.map((m, i) => (
              <ModelCard
                key={m.id}
                model={m}
                index={i}
                expanded={expandedId === m.id}
                onToggle={() => setExpandedId(expandedId === m.id ? null : m.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {viewMode === 'table' && (
        <div className="lx-table-wrap">
          <table className="lx-table">
            <thead>
              <tr>
                {sortableHead('name', 'Model')}
                {sortableHead('provider', 'Provider')}
                {sortableHead('contextWindow', 'Context')}
                {sortableHead('inputCost', 'In $/M')}
                {sortableHead('outputCost', 'Out $/M')}
                {sortableHead('reasoning', 'Reason')}
                {sortableHead('coding', 'Code')}
                {sortableHead('math', 'Math')}
                {sortableHead('speed', 'Speed')}
                <th>Open</th>
                <th>Multi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td className="lx-td-name">
                    <span className="lx-dot" style={{ background: m.providerColor }} />
                    {m.name}{m.isNew && <span className="lx-tag-new">New</span>}
                  </td>
                  <td style={{ color: m.providerColor }}>{m.provider}</td>
                  <td>{fmtTokens(m.contextWindow)}</td>
                  <td>{fmtPrice(m.inputCost)}</td>
                  <td>{fmtPrice(m.outputCost)}</td>
                  {['reasoning', 'coding', 'math', 'speed'].map((k) => (
                    <td key={k}><span className={`lx-score tone-${scoreTone(m.capabilities[k])}`}>{m.capabilities[k]}</span></td>
                  ))}
                  <td>{m.openSource ? '✓' : '—'}</td>
                  <td>{m.multimodal ? '✓' : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="lx-empty">No models match your filters. Try adjusting your search or resetting.</p>
      )}
    </section>
  );
}
