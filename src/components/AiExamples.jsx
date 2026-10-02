import { motion } from 'framer-motion';
import { aiExamplesData } from '../data/examplesData';

export default function AiExamples() {
  return (
    <section id="ai-examples" className="section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-badge">Step 0 — See it in action</span>
        <h2>What can you do with AI?</h2>
        <p>Brief examples of how AI can enhance your daily tasks, creativity, and workflows.</p>
      </motion.div>

      <div className="ae-grid">
        {aiExamplesData.map((category, index) => (
          <motion.article
            key={category.id}
            className="ae-card"
            style={{ '--ae': category.color }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
          >
            <header>
              <span className="ae-num">{String(index + 1).padStart(2, '0')}</span>
              <span className="ae-icon" aria-hidden="true">{category.icon}</span>
              <h3>{category.title}</h3>
            </header>
            <ul>
              {category.examples.map((example) => (
                <li key={example}>{example}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
