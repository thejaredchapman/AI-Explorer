import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aiProducts, userTypes } from '../data/aiData';

function ProductCard({ product, activeUserType, index }) {
  const [expanded, setExpanded] = useState(false);
  const matchesFilter = activeUserType === 'all' || product.userTypes.includes(activeUserType);

  return (
    <motion.div
      className={`product-card ${!matchesFilter ? 'dimmed' : ''}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: matchesFilter ? 1 : 0.25, y: 0, scale: matchesFilter ? 1 : 0.95 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <div className="product-card-top">
        <div className="product-logo" style={{ background: `${product.color}15`, color: product.color }}>
          {product.logo}
        </div>
        <div>
          <h3 className="product-company">{product.company}</h3>
          <span className="product-type">{product.type}</span>
        </div>
      </div>

      <p className="product-brief">{product.brief}</p>

      <div className="product-products">
        <span className="product-products-label">Products:</span> {product.products}
      </div>

      <div className="product-user-tags">
        {product.userTypes.map(ut => {
          const u = userTypes.find(x => x.id === ut);
          return (
            <span key={ut} className={`user-tag ${activeUserType === ut ? 'active' : ''}`}>
              {u?.icon} {u?.label}
            </span>
          );
        })}
      </div>

      <button className="product-flip-btn" onClick={() => setExpanded(!expanded)}>
        {expanded ? '← Less' : 'See Impact →'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="product-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="product-transformations">
              {Object.entries(product.transformation).map(([key, val]) => {
                const u = userTypes.find(x => x.id === key);
                return (
                  <div
                    key={key}
                    className={`transformation-item ${activeUserType === key ? 'highlighted' : ''}`}
                    style={activeUserType === key ? { borderColor: product.color, background: `${product.color}08` } : {}}
                  >
                    <span className="transformation-user">{u?.icon} {u?.label}</span>
                    <span className="transformation-text">{val}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProductsExplorer() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCount = activeFilter === 'all'
    ? aiProducts.length
    : aiProducts.filter(p => p.userTypes.includes(activeFilter)).length;

  return (
    <section className="section" id="products">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Step 5 — Explore Products</span>
        <h2>AI Products & Platforms</h2>
        <p>
          With model knowledge in hand, explore the {aiProducts.length} products and platforms built on top of them.
          Filter by your role to see which tools transform your specific workflow. Click "See Impact" for real-world use cases.
        </p>
      </motion.div>

      <div className="filter-bar">
        {userTypes.map(ut => (
          <motion.button
            key={ut.id}
            className={`filter-chip ${activeFilter === ut.id ? 'active' : ''}`}
            onClick={() => setActiveFilter(ut.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            <span>{ut.icon}</span> {ut.label}
          </motion.button>
        ))}
      </div>

      <p className="filter-count">
        Showing {filteredCount} of {aiProducts.length} products
      </p>

      <motion.div className="products-grid" layout>
        {aiProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            activeUserType={activeFilter}
            index={i}
          />
        ))}
      </motion.div>
    </section>
  );
}
