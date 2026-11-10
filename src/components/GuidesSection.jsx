import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { guidesData, providers, categories, providerColors } from '../data/guidesData';

function QuickStartPanel() {
  const qs = guidesData.quickStart;

  return (
    <motion.div
      className="quickstart-panel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="quickstart-header">
        <span className="quickstart-icon">&#9889;</span>
        <div>
          <h3>{qs.title}</h3>
          <p>{qs.description}</p>
        </div>
      </div>
      <div className="quickstart-steps">
        {qs.steps.map((step, i) => (
          <div key={i} className="quickstart-step">
            <div className="step-number">{i + 1}</div>
            <div className="step-content">
              <span className="step-label">{step.label}</span>
              <pre className="step-code"><code>{step.code}</code></pre>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function GuideCard({ guide, isExpanded, onToggle, index }) {
  const categoryObj = categories.find(c => c.id === guide.category);
  const providerObj = providers.find(p => p.id === guide.provider);
  const pColor = providerColors[guide.provider] || '#818cf8';

  return (
    <motion.div
      className="guide-card"
      style={{ '--guide-accent': pColor }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      layout
    >
      <div className="guide-card-header" onClick={onToggle}>
        <div className="guide-card-icon" style={{ background: `${pColor}15`, color: pColor }}>
          {guide.icon}
        </div>
        <div className="guide-card-info">
          <div className="guide-card-meta">
            <span className="guide-number">#{guide.number}</span>
            <span
              className="guide-category-badge"
              style={{ background: `${categoryObj?.color}18`, color: categoryObj?.color, borderColor: `${categoryObj?.color}40` }}
            >
              {categoryObj?.label}
            </span>
            <span
              className="guide-provider-badge"
              style={{ background: `${pColor}15`, color: pColor }}
            >
              {providerObj?.icon} {providerObj?.label}
            </span>
          </div>
          <h3>{guide.title}</h3>
          <span className="guide-model-label">{guide.model}</span>
        </div>
        <motion.span
          className="guide-card-chevron"
          animate={{ rotate: isExpanded ? 180 : 0 }}
        >
          &#9662;
        </motion.span>
      </div>

      <p className="guide-card-desc">{guide.description}</p>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="guide-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {guide.setup?.length > 0 && (
              <div className="guide-setup">
                <span className="guide-concepts-label">Before you start:</span>
                <ol className="guide-setup-list">
                  {guide.setup.map(step => <li key={step}>{step}</li>)}
                </ol>
              </div>
            )}

            <div className="guide-concepts">
              <span className="guide-concepts-label">Key Concepts:</span>
              <div className="guide-concept-tags">
                {guide.concepts.map(c => (
                  <span key={c} className="guide-concept-tag" style={{ borderColor: `${pColor}40`, color: pColor }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="guide-code-preview">
              <div className="code-preview-header">
                <span className="code-preview-dot red" />
                <span className="code-preview-dot yellow" />
                <span className="code-preview-dot green" />
                <span className="code-preview-filename">{guide.file}</span>
              </div>
              <pre className="code-preview-body"><code>{guide.codePreview}</code></pre>
            </div>

            <div className="guide-run-bar">
              <span className="guide-run-label">Run it:</span>
              <code className="guide-run-command">{guide.runCommand}</code>
            </div>

            {guide.docsUrl && (
              <a
                className="guide-docs-link"
                href={guide.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: pColor }}
              >
                {guide.docsLabel || 'Official docs'} ↗
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProviderCards({ activeProvider, onSelect }) {
  return (
    <div className="provider-cards-grid">
      {providers.filter(p => p.id !== 'all').map((provider, i) => (
        <motion.div
          key={provider.id}
          className={`provider-card ${activeProvider === provider.id ? 'active' : ''}`}
          style={{ '--prov-color': providerColors[provider.id] }}
          onClick={() => onSelect(activeProvider === provider.id ? 'all' : provider.id)}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="provider-card-icon">{provider.icon}</span>
          <div>
            <h4>{provider.label}</h4>
            <p>{provider.description}</p>
            <span className="provider-card-count">
              {guidesData.guides.filter(g => g.provider === provider.id).length} guides
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default function GuidesSection() {
  const [expanded, setExpanded] = useState({});
  const [activeProvider, setActiveProvider] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredGuides = guidesData.guides.filter(g => {
    const providerMatch = activeProvider === 'all' || g.provider === activeProvider;
    const categoryMatch = activeCategory === 'all' || g.category === activeCategory;
    return providerMatch && categoryMatch;
  });

  return (
    <section className="section" id="guides">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 8 — Start Building</span>
        <h2>Quick Start & How-To Guides</h2>
        <p>
          You have the concepts, compared the models, explored the products, and know your tools.
          Now build. {guidesData.guides.length} runnable Python guides organized by provider — pick your platform and start coding.
        </p>
      </motion.div>

      <QuickStartPanel />

      {/* Provider Selection Cards */}
      <ProviderCards activeProvider={activeProvider} onSelect={setActiveProvider} />

      {/* Category Filter */}
      <div className="filter-bar" style={{ marginTop: '20px' }}>
        <motion.button
          className={`filter-chip ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCategory('all')}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          All Levels
        </motion.button>
        {categories.map(c => (
          <motion.button
            key={c.id}
            className={`filter-chip ${activeCategory === c.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(c.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {c.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filteredGuides.length} of {guidesData.guides.length} guides
        {activeProvider !== 'all' && ` for ${providers.find(p => p.id === activeProvider)?.label}`}
      </p>

      {/* Guides Grid */}
      <div className="guides-grid">
        {filteredGuides.map((guide, i) => (
          <GuideCard
            key={guide.id}
            guide={guide}
            isExpanded={expanded[guide.id]}
            onToggle={() => toggle(guide.id)}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}
