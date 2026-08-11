import { motion } from 'framer-motion';
import { aiConcepts, aiProducts } from '../data/aiData';
import { llmModels } from '../data/llmData';
import { techniques } from '../data/promptEngineeringData';
import { toolTopics } from '../data/aiToolsData';
import { codeAssistants } from '../data/codeAssistantsData';
import { resources } from '../data/resourcesData';
import { guidesData } from '../data/guidesData';

const floatingItems = [
  { emoji: '\u{1F9E0}', x: '10%', y: '20%', delay: 0 },
  { emoji: '\u{1F4CA}', x: '85%', y: '15%', delay: 0.5 },
  { emoji: '\u2728', x: '75%', y: '70%', delay: 1 },
  { emoji: '\u{1F4AC}', x: '15%', y: '75%', delay: 1.5 },
  { emoji: '\u{1F916}', x: '90%', y: '45%', delay: 0.8 },
  { emoji: '\u{1F52C}', x: '5%', y: '50%', delay: 1.2 },
  { emoji: '\u{1F4BB}', x: '50%', y: '85%', delay: 0.3 },
  { emoji: '\u{1F680}', x: '30%', y: '10%', delay: 1.8 },
];

export default function Hero({ onNavigate }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg-items">
        {floatingItems.map((item, i) => (
          <motion.span
            key={i}
            className="hero-float-item"
            style={{ left: item.x, top: item.y }}
            animate={{ y: [0, -15, 0], opacity: [0.15, 0.3, 0.15] }}
            transition={{ repeat: Infinity, duration: 4, delay: item.delay, ease: 'easeInOut' }}
          >
            {item.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="hero-badge">Interactive Learning Experience</span>
        <h1 className="hero-title">
          Understand <span className="hero-gradient">AI</span> from
          <br />the Ground Up
        </h1>
        <p className="hero-subtitle">
          A comprehensive guide to AI — from foundational concepts and LLM comparisons to
          real-world products, code editors, community resources, and hands-on building guides.
          Everything you need to learn, evaluate, and start building with AI.
        </p>

        <div className="hero-actions">
          <motion.button
            className="btn btn-dark btn-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('concepts')}
          >
            Learn Concepts
          </motion.button>
          <motion.button
            className="btn btn-primary btn-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('llm-rubric')}
          >
            Compare Models
          </motion.button>
          <motion.button
            className="btn btn-ghost btn-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('code-assistants')}
          >
            Code Editors
          </motion.button>
          <motion.button
            className="btn btn-ghost btn-lg"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onNavigate('guides')}
          >
            Start Building &rarr;
          </motion.button>
        </div>

        {/* Learning Flow */}
        <div className="hero-flow">
          <div className="hero-flow-step" onClick={() => onNavigate('concepts')}>
            <span className="hero-flow-num">1</span>
            <span className="hero-flow-label">Learn Concepts</span>
          </div>
          <span className="hero-flow-arrow">&rarr;</span>
          <div className="hero-flow-step" onClick={() => onNavigate('llm-rubric')}>
            <span className="hero-flow-num">2</span>
            <span className="hero-flow-label">Compare Models</span>
          </div>
          <span className="hero-flow-arrow">&rarr;</span>
          <div className="hero-flow-step" onClick={() => onNavigate('prompt-engineering')}>
            <span className="hero-flow-num">3</span>
            <span className="hero-flow-label">Master Prompting</span>
          </div>
          <span className="hero-flow-arrow">&rarr;</span>
          <div className="hero-flow-step" onClick={() => onNavigate('products')}>
            <span className="hero-flow-num">4</span>
            <span className="hero-flow-label">Explore Products</span>
          </div>
          <span className="hero-flow-arrow">&rarr;</span>
          <div className="hero-flow-step" onClick={() => onNavigate('code-assistants')}>
            <span className="hero-flow-num">5</span>
            <span className="hero-flow-label">Pick Tools</span>
          </div>
          <span className="hero-flow-arrow">&rarr;</span>
          <div className="hero-flow-step" onClick={() => onNavigate('guides')}>
            <span className="hero-flow-num">6</span>
            <span className="hero-flow-label">Start Building</span>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">{aiConcepts.length}</span>
            <span className="hero-stat-label">AI Concepts</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{llmModels.length}</span>
            <span className="hero-stat-label">LLM Models</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{techniques.length}</span>
            <span className="hero-stat-label">Prompt Techniques</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{aiProducts.length}</span>
            <span className="hero-stat-label">AI Products</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{toolTopics.length}</span>
            <span className="hero-stat-label">Tools & Protocols</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{codeAssistants.length}</span>
            <span className="hero-stat-label">Code Editors</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{resources.length}</span>
            <span className="hero-stat-label">Resources</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <span className="hero-stat-num">{guidesData.guides.length}</span>
            <span className="hero-stat-label">Build Guides</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
