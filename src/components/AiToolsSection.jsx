import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toolTopics, connectionMap, quickReference } from '../data/aiToolsData';

function ToolCard({ topic, isExpanded, onToggle, index }) {
  return (
    <motion.div
      className="tool-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      layout
    >
      <div className="tool-card-header" onClick={onToggle}>
        <div className="tool-card-icon" style={{ background: `${topic.color}15`, color: topic.color }}>
          {topic.icon}
        </div>
        <div className="tool-card-info">
          <h3 className="tool-card-title">{topic.title}</h3>
          <span className="tool-card-tagline">{topic.tagline}</span>
        </div>
        <motion.span
          className="tool-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <p className="tool-card-summary">{topic.summary}</p>

      <div className="tool-card-points">
        {topic.keyPoints.map((pt, i) => (
          <div key={i} className="tool-card-point">
            <span className="tool-card-bullet" style={{ background: topic.color }} />
            <span>{pt}</span>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="tool-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="tool-card-analogy" style={{ borderColor: `${topic.color}40` }}>
              <span className="tool-card-analogy-label">Think of it as...</span>
              <p>{topic.analogy}</p>
            </div>

            {topic.questionTypes && (
              <div className="tool-card-qtypes">
                <span className="tool-card-examples-label">Question types</span>
                <table>
                  <thead><tr><th>Type</th><th>You ask</th><th>You get back</th></tr></thead>
                  <tbody>
                    {topic.questionTypes.map((q) => (
                      <tr key={q.type}>
                        <td style={{ color: topic.color }}>{q.type}</td>
                        <td>{q.ask}</td>
                        <td><code>{q.returns}</code></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {topic.code && (
              <div className="tool-card-code">
                <span className="tool-card-examples-label">Example request (Python)</span>
                <pre><code>{topic.code}</code></pre>
              </div>
            )}

            <div className="tool-card-examples">
              <span className="tool-card-examples-label">{topic.questionTypes ? 'Use cases' : 'Real-World Examples'}</span>
              <div className="tool-card-examples-grid">
                {topic.examples.map((ex, i) => (
                  <div key={i} className="tool-card-example" style={{ borderColor: `${topic.color}25` }}>
                    <span className="tool-card-example-name" style={{ color: topic.color }}>{ex.name}</span>
                    <span className="tool-card-example-desc">{ex.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="tool-card-connects" style={{ background: `${topic.color}08` }}>
              <span className="tool-card-connects-label">How It Connects</span>
              <p>{topic.howItConnects}</p>
            </div>

            {topic.docsUrl && (
              <a className="tool-card-docs" href={topic.docsUrl} target="_blank" rel="noopener noreferrer" style={{ color: topic.color }}>
                {topic.docsLabel || 'Official docs'} ↗
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function QuickReferencePanel() {
  return (
    <motion.div
      className="tools-quickref"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="tools-quickref-title">{quickReference.title}</h3>
      <div className="tools-quickref-flow">
        {quickReference.steps.map((step, i) => (
          <div key={step.num} className="tools-quickref-step">
            <div className="tools-quickref-icon">{step.icon}</div>
            <div className="tools-quickref-num">{step.num}</div>
            <p className="tools-quickref-label">{step.label}</p>
            {i < quickReference.steps.length - 1 && (
              <span className="tools-quickref-arrow">&#8595;</span>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ConnectionDiagram() {
  return (
    <motion.div
      className="tools-connections"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="tools-connections-title">How Everything Connects</h3>
      <div className="tools-connections-grid">
        {connectionMap.map((conn, i) => {
          const from = toolTopics.find(t => t.id === conn.from);
          const to = toolTopics.find(t => t.id === conn.to);
          return (
            <motion.div
              key={i}
              className="tools-connection-row"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <span className="tools-conn-node" style={{ background: `${from.color}15`, color: from.color, borderColor: `${from.color}40` }}>
                {from.icon} {from.title}
              </span>
              <span className="tools-conn-label">{conn.label}</span>
              <span className="tools-conn-arrow">&#8594;</span>
              <span className="tools-conn-node" style={{ background: `${to.color}15`, color: to.color, borderColor: `${to.color}40` }}>
                {to.icon} {to.title}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function AiToolsSection() {
  const [expanded, setExpanded] = useState({});
  const [activeFilter, setActiveFilter] = useState('all');

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filters = [
    { id: 'all', label: 'All Topics', icon: '📋' },
    { id: 'core', label: 'Core Concepts', icon: '🧠' },
    { id: 'dev', label: 'For Developers', icon: '💻' },
  ];

  const coreIds = ['agents', 'mcp', 'api'];
  const devIds = ['api-codes', 'sdk', 'tool-use', 'jev'];

  const filteredTopics = activeFilter === 'all'
    ? toolTopics
    : activeFilter === 'core'
      ? toolTopics.filter(t => coreIds.includes(t.id))
      : toolTopics.filter(t => devIds.includes(t.id));

  return (
    <section className="section" id="ai-tools">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">New — Tools & Protocols</span>
        <h2>AI Tools & Protocols</h2>
        <p>
          Understand the building blocks of modern AI systems — what agents are, how they connect
          to tools through MCP, what APIs and API keys do, and how it all fits together.
        </p>
      </motion.div>

      <QuickReferencePanel />

      {/* Filter Bar */}
      <div className="filter-bar">
        {filters.map(f => (
          <motion.button
            key={f.id}
            className={`filter-chip ${activeFilter === f.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(f.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>{f.icon}</span> {f.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filteredTopics.length} of {toolTopics.length} topics
      </p>

      {/* Topic Cards Grid */}
      <motion.div className="tools-grid" layout>
        <AnimatePresence>
          {filteredTopics.map((topic, i) => (
            <ToolCard
              key={topic.id}
              topic={topic}
              isExpanded={expanded[topic.id]}
              onToggle={() => toggle(topic.id)}
              index={i}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <ConnectionDiagram />
    </section>
  );
}
