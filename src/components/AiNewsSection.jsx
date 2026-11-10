import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import news from '../data/aiNews.json';

const PAGE = 24;

const fmtDay = (iso) =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default function AiNewsSection() {
  const [outlet, setOutlet] = useState('all');
  const [shown, setShown] = useState(PAGE);

  const articles = useMemo(
    () => (outlet === 'all' ? news.articles : news.articles.filter((a) => a.domain === outlet)),
    [outlet],
  );

  const pick = (domain) => { setOutlet(domain); setShown(PAGE); };

  return (
    <section className="section" id="ai-news">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">In the News</span>
        <h2>AI in the News</h2>
        <p>
          AI headlines from the past 30 days at AP News, CNN, Fox News, Bloomberg, The Verge and Gizmodo,
          refreshed daily. Each headline links to the original story.
        </p>
      </motion.div>

      <div className="filter-bar" role="group" aria-label="Filter by outlet">
        <button className={`filter-chip ${outlet === 'all' ? 'active' : ''}`} aria-pressed={outlet === 'all'} onClick={() => pick('all')}>
          All outlets ({news.articles.length})
        </button>
        {news.outlets.map((o) => (
          <button
            key={o.domain}
            className={`filter-chip ${outlet === o.domain ? 'active' : ''}`}
            aria-pressed={outlet === o.domain}
            onClick={() => pick(o.domain)}
            disabled={o.count === 0}
            title={o.error ? 'Not available in the last update' : undefined}
          >
            {o.name} ({o.count})
          </button>
        ))}
      </div>

      <p className="filter-count">
        {news.updatedAt
          ? <>Updated {fmtDay(news.updatedAt)} · stories from {fmtDay(news.from)} to {fmtDay(news.to)}</>
          : 'Headlines appear after the first daily update runs.'}
      </p>

      {articles.length > 0 && (
        <ol className="news-list">
          {articles.slice(0, shown).map((a) => (
            <li key={a.url} className="news-item">
              <div className="news-meta">
                <span className="news-outlet">{a.outlet}</span>
                <time dateTime={a.publishedAt}>{fmtDay(a.publishedAt)}</time>
              </div>
              <a className="news-title" href={a.url} target="_blank" rel="noopener noreferrer">
                {a.title}
              </a>
              {a.description && <p className="news-desc">{a.description}</p>}
            </li>
          ))}
        </ol>
      )}

      {shown < articles.length && (
        <button className="news-more" onClick={() => setShown((n) => n + PAGE)}>
          Show more ({articles.length - shown} left)
        </button>
      )}

      <p className="news-credit">
        Headlines via <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer">NewsAPI.org</a>.
        Stories belong to their publishers.
      </p>
    </section>
  );
}
