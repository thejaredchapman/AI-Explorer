import { motion } from 'framer-motion';
import { aiConcepts, aiProducts } from '../data/aiData';
import { llmModels } from '../data/llmData';
import { techniques } from '../data/promptEngineeringData';
import { toolTopics } from '../data/aiToolsData';
import { codeAssistants } from '../data/codeAssistantsData';
import { resources } from '../data/resourcesData';
import { guidesData } from '../data/guidesData';
import { SECTIONS, formatBearing } from '../data/sections';
import { dataAsOf } from '../data/llmData';
import { formatAsOf } from '../utils/llmMarkdown';

export default function Hero({ onNavigate }) {
  const stats = [
    [aiConcepts.length, 'AI concepts'],
    [llmModels.length, 'LLM models'],
    [techniques.length, 'Prompt techniques'],
    [aiProducts.length, 'AI products'],
    [toolTopics.length, 'Tools & protocols'],
    [codeAssistants.length, 'Code editors'],
    [resources.length, 'Resources'],
    [guidesData.guides.length, 'Build guides'],
  ];

  return (
    <section className="ex-hero" id="hero">
      <div className="ex-hero-grid">
        <motion.div
          className="ex-copy"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <span className="ex-kicker">
            Field guide to artificial intelligence · updated <time dateTime={dataAsOf}>{formatAsOf()}</time>
          </span>
          <h1 className="ex-title">
            AI-<em>Explorer</em>
          </h1>
          <p className="ex-sub">
            Chart the whole territory: core concepts, a side-by-side model comparison, real products, code editors,
            community resources and hands-on build guides. Learn it, evaluate it, then start building.
          </p>
          <div className="ex-actions">
            <button className="btn btn-dark btn-lg" onClick={() => onNavigate('concepts')}>Begin with concepts</button>
            <button className="btn btn-ghost btn-lg" onClick={() => onNavigate('llm-rubric')}>Compare models</button>
            <button className="btn btn-ghost btn-lg" onClick={() => onNavigate('guides')}>Start building &rarr;</button>
          </div>
          <p className="ex-hint">Tip: drag the compass anywhere. It points at the section you are reading, and a click opens the full map.</p>
        </motion.div>

        <motion.nav
          className="ex-index"
          aria-label="Section index"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <h2>Expedition index</h2>
          <ol>
            {SECTIONS.slice(1).map((s, i) => (
              <li key={s.id}>
                <button onClick={() => onNavigate(s.id)}>
                  <span className="ex-index-deg">{formatBearing(i + 1)}</span>
                  <span className="ex-index-name">{s.label}</span>
                  <span className="ex-index-blurb">{s.blurb}</span>
                </button>
              </li>
            ))}
          </ol>
        </motion.nav>
      </div>

      <dl className="ex-stats">
        {stats.map(([n, label]) => (
          <div key={label}>
            <dd>{n}</dd>
            <dt>{label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
