import { motion } from 'framer-motion';
import { freeLearningGroups, freeLearningCount } from '../data/freeLearningData';

function FreeCard({ item, index }) {
  return (
    <motion.a
      href={item.url}
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
        <div className="resource-card-icon" style={{ background: `${item.color}15`, color: item.color }}>
          {item.icon}
        </div>
        <div className="resource-card-info">
          <h3 className="resource-card-name">{item.name}</h3>
          <span className="resource-card-cat">Free</span>
        </div>
        <span className="resource-card-arrow" style={{ color: item.color }}>&rarr;</span>
      </div>
      <p className="resource-card-desc">{item.description}</p>
      <div className="resource-highlights">
        {item.highlights.map((h) => (
          <span key={h} className="resource-highlight-tag" style={{ borderColor: `${item.color}30`, color: item.color }}>
            {h}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export default function FreeLearningSection() {
  return (
    <section className="section" id="free-learning">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Free Learning</span>
        <h2>Learn AI for Free</h2>
        <p>
          {freeLearningCount} free courses, academies, and curricula from the frontier labs,
          Hugging Face, and top universities. No paywall required.
        </p>
      </motion.div>

      {freeLearningGroups.map((group) => (
        <div key={group.id} className="free-learning-group">
          <h3 className="free-learning-group-title">{group.label}</h3>
          <p className="free-learning-group-blurb">{group.blurb}</p>
          <div className="resources-grid">
            {group.items.map((item, i) => (
              <FreeCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
