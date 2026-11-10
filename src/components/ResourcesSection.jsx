import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resources, resourceCategories, stayCurrentTips } from '../data/resourcesData';

function ResourceCard({ resource, index }) {
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="resource-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="resource-card-top">
        <div className="resource-card-icon" style={{ background: `${resource.color}15`, color: resource.color }}>
          {resource.icon}
        </div>
        <div className="resource-card-info">
          <h3 className="resource-card-name">{resource.name}</h3>
          <span className="resource-card-cat">
            {resourceCategories.find(c => c.id === resource.category)?.label}
          </span>
        </div>
        <span className="resource-card-arrow" style={{ color: resource.color }}>&rarr;</span>
      </div>

      <p className="resource-card-desc">{resource.description}</p>

      <div className="resource-highlights">
        {resource.highlights.map((h, i) => (
          <span key={i} className="resource-highlight-tag" style={{ borderColor: `${resource.color}30`, color: resource.color }}>
            {h}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

function StayCurrentPanel() {
  return (
    <motion.div
      className="stay-current-panel"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="stay-current-header">
        <span className="stay-current-icon">&#128640;</span>
        <div>
          <h3>How to Stay Current in AI</h3>
          <p>AI moves fast. Here is a practical routine to keep up without getting overwhelmed.</p>
        </div>
      </div>
      <div className="stay-current-grid">
        {stayCurrentTips.map((tip, i) => (
          <motion.div
            key={tip.title}
            className="stay-current-card"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <h4>{tip.title}</h4>
            <ul>
              {tip.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ResourcesSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredResources = activeFilter === 'all'
    ? resources
    : resources.filter(r => r.category === activeFilter);

  return (
    <section className="section" id="resources">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 8 — Stay Updated</span>
        <h2>Resources & Community</h2>
        <p>
          Publications, forums, newsletters, courses, and podcasts to keep you at the
          cutting edge of AI development.
        </p>
      </motion.div>

      <StayCurrentPanel />

      {/* Filter Bar */}
      <div className="filter-bar">
        {resourceCategories.map(cat => (
          <motion.button
            key={cat.id}
            className={`filter-chip ${activeFilter === cat.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            {cat.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filteredResources.length} of {resources.length} resources
      </p>

      {/* Resource Cards Grid */}
      <motion.div className="resources-grid" layout>
        <AnimatePresence>
          {filteredResources.map((resource, i) => (
            <ResourceCard key={resource.id} resource={resource} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
