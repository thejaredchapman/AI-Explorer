import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiConcepts } from '../data/aiData';

function ConceptCard({ concept, isExpanded, onToggle, onOpenDetail, index }) {
  return (
    <motion.div
      className="concept-tile"
      style={{ '--accent': concept.color }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      layout
    >
      <div className="concept-tile-header" onClick={onToggle}>
        <div className="concept-tile-icon" style={{ background: `${concept.color}15`, color: concept.color }}>
          {concept.icon}
        </div>
        <div className="concept-tile-info">
          <h3>{concept.title}</h3>
          <span className="concept-tile-abbr">{concept.abbr}</span>
        </div>
        <motion.span
          className="concept-tile-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          ▾
        </motion.span>
      </div>

      <p className="concept-tile-brief">{concept.brief}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="concept-tile-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="concept-tile-insight">
              <span className="insight-icon">💡</span>
              <p>{concept.keyInsight}</p>
            </div>
            <div className="concept-tile-examples">
              <span className="examples-label">Examples:</span>
              <div className="example-tags">
                {concept.examples.map(ex => (
                  <span key={ex} className="example-tag" style={{ borderColor: `${concept.color}40`, color: concept.color }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
            {concept.detail && onOpenDetail && (
              <button
                className="concept-learn-more"
                style={{ borderColor: concept.color, color: concept.color }}
                onClick={(e) => { e.stopPropagation(); onOpenDetail(concept.id); }}
                data-concept={concept.id}
              >
                Learn More →
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function RelationshipDiagram() {
  const layers = [
    { concepts: ['ai'], label: 'Broadest' },
    { concepts: ['ml', 'cv', 'nlp', 'responsibleai'], label: 'Branches & Governance' },
    { concepts: ['dl', 'rl', 'transferlearning', 'federatedlearning'], label: 'Techniques' },
    { concepts: ['transformers', 'diffusion'], label: 'Architectures' },
    { concepts: ['genai', 'llm', 'multimodal'], label: 'Modern AI' },
    { concepts: ['agents', 'mcp', 'rag', 'knowledgegraphs'], label: 'Applications' },
    { concepts: ['finetuning', 'embeddings', 'vectordb', 'prompting'], label: 'Customization' },
    { concepts: ['mlops', 'syntheticdata', 'edgeai'], label: 'Infrastructure & Deployment' },
  ];

  return (
    <div className="relationship-diagram">
      <h3 className="diagram-title">How They Relate</h3>
      <p className="diagram-subtitle">AI is the umbrella — each concept narrows the focus</p>
      <div className="diagram-layers">
        {layers.map((layer, li) => (
          <motion.div
            key={li}
            className="diagram-layer"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: li * 0.15 }}
          >
            <span className="layer-label">{layer.label}</span>
            <div className="layer-items">
              {layer.concepts.map(id => {
                const c = aiConcepts.find(x => x.id === id);
                return (
                  <motion.div
                    key={id}
                    className="layer-chip"
                    style={{ background: `${c.color}12`, borderColor: `${c.color}30`, color: c.color }}
                    whileHover={{ scale: 1.05, borderColor: c.color }}
                  >
                    <span>{c.icon}</span> {c.abbr}
                  </motion.div>
                );
              })}
            </div>
            {li < layers.length - 1 && (
              <div className="layer-arrow">↓</div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function AiConcepts({ onOpenDetail }) {
  const [expanded, setExpanded] = useState({});

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="section" id="concepts">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 1 — Fundamentals</span>
        <h2>AI Concepts Explained</h2>
        <p>
          Start here. Understanding these {aiConcepts.length} core concepts gives you the vocabulary and mental models
          to evaluate any AI product, model, or technique. Click any card to expand, then "Learn More" for the full deep dive.
        </p>
      </motion.div>

      <RelationshipDiagram />

      <div className="concepts-grid">
        {aiConcepts.map((concept, i) => (
          <ConceptCard
            key={concept.id}
            concept={concept}
            isExpanded={expanded[concept.id]}
            onToggle={() => toggle(concept.id)}
            onOpenDetail={onOpenDetail}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
