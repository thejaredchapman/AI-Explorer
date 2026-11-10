import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import events from '../data/communityEvents.json';

// Official communities only: each link comes from the company's own website.
const COMMUNITIES = [
  {
    id: 'langchain',
    name: 'LangChain Community',
    org: 'LangChain',
    color: '#1c3c3c',
    what: 'Meetups, workshops and hackathons for people building agents with LangChain and LangGraph.',
    url: 'https://luma.com/langchain',
    cta: 'LangChain events on Luma',
  },
  {
    id: 'ollama',
    name: 'Ollama Events',
    org: 'Ollama',
    color: '#7c3aed',
    what: 'Meetups for running open models locally with Ollama.',
    url: 'https://lu.ma/ollama',
    cta: 'Ollama events on Luma',
  },
  {
    id: 'openai-forum',
    name: 'OpenAI Forum',
    org: 'OpenAI',
    color: '#10a37f',
    what: 'OpenAI\'s community for talks, expert sessions and virtual events.',
    url: 'https://forum.openai.com/',
    cta: 'Visit the OpenAI Forum',
  },
  {
    id: 'openai-dev',
    name: 'OpenAI Developer Community',
    org: 'OpenAI',
    color: '#10a37f',
    what: 'Q&A forum for developers building with the OpenAI API.',
    url: 'https://community.openai.com/',
    cta: 'Visit the forum',
  },
  {
    id: 'gdg',
    name: 'Google Developer Groups',
    org: 'Google',
    color: '#4285f4',
    what: 'Local developer chapters worldwide that run meetups and study jams, including on Gemini and Google AI.',
    url: 'https://gdg.community.dev/events/',
    cta: 'Find GDG events',
  },
  {
    id: 'hf',
    name: 'Hugging Face Forums',
    org: 'Hugging Face',
    color: '#ffb000',
    what: 'Discussion forum for open models, datasets, Transformers and Spaces.',
    url: 'https://discuss.huggingface.co/',
    cta: 'Visit the forums',
  },
  {
    id: 'cursor',
    name: 'Cursor Community',
    org: 'Cursor',
    color: '#9aa3b2',
    what: 'Community meetups and workshops for the Cursor AI code editor.',
    url: 'https://cursor.com/community',
    cta: 'See Cursor community events',
  },
];

const PAGE = 12;
const CLAUDE_EVENTS = events.calendars.claude?.events ?? [];

const fmtWhen = (e) => {
  const d = new Date(e.start);
  const opts = { weekday: 'short', month: 'short', day: 'numeric' };
  // All-day events are calendar dates, so show them as-is (UTC); timed events use the visitor's time zone.
  if (e.allDay) return d.toLocaleDateString('en-US', { ...opts, timeZone: 'UTC' });
  return `${d.toLocaleDateString('en-US', opts)} · ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZoneName: 'short' })}`;
};

function EventRow({ e }) {
  return (
    <li className="cm-event">
      <time className="cm-when" dateTime={e.start}>{fmtWhen(e)}</time>
      <a className="cm-title" href={e.url} target="_blank" rel="noopener noreferrer">{e.title}</a>
      <span className="cm-where">{e.address || (e.city ? `${e.city} · location on Luma` : 'Location on Luma')}</span>
    </li>
  );
}

export default function CommunitySection() {
  const [query, setQuery] = useState('');
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CLAUDE_EVENTS;
    return CLAUDE_EVENTS.filter((e) => `${e.title} ${e.city || ''} ${e.address || ''}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <section className="section" id="community">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-badge">Community & Events</span>
        <h2>Meet people building with AI</h2>
        <p>
          The fastest way to learn is with other people. These are the official communities run by AI companies:
          local meetups, workshops and forums where you can ask questions and see what others are building.
        </p>
      </motion.div>

      <div className="cm-featured">
        <div className="cm-featured-head">
          <div>
            <span className="cm-org">Anthropic</span>
            <h3>Claude Community</h3>
            <p>
              Events hosted around the world by Claude Community members: Claude Code workshops, meetups and build days.
              Most are free; register on Luma.
            </p>
          </div>
          <div className="cm-links">
            <a className="cm-btn" href="https://luma.com/claudecommunity" target="_blank" rel="noopener noreferrer">All events on Luma ↗</a>
            <a className="cm-btn ghost" href="https://claude.com/community" target="_blank" rel="noopener noreferrer">About the community ↗</a>
          </div>
        </div>

        <input
          type="search"
          className="cm-search"
          aria-label="Filter Claude Community events by city or topic"
          placeholder="Filter by city or topic, e.g. London, Claude Code, workshop"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setShown(PAGE); }}
        />
        <p className="filter-count">
          {CLAUDE_EVENTS.length === 0
            ? 'Events appear after the first daily update runs.'
            : `${filtered.length} upcoming event${filtered.length === 1 ? '' : 's'} in the next ${events.daysAhead} days`}
        </p>

        {filtered.length > 0 && (
          <ol className="cm-events">
            {filtered.slice(0, shown).map((e) => <EventRow key={e.url} e={e} />)}
          </ol>
        )}
        {shown < filtered.length && (
          <button className="news-more" onClick={() => setShown((n) => n + PAGE)}>
            Show more ({filtered.length - shown} left)
          </button>
        )}
      </div>

      <h3 className="cm-subhead">Other AI communities</h3>
      <div className="cm-grid">
        {COMMUNITIES.map((c) => {
          const upcoming = events.calendars[c.id]?.events ?? [];
          return (
            <article key={c.id} className="cm-card" style={{ '--cm-color': c.color }}>
              <span className="cm-org">{c.org}</span>
              <h4>{c.name}</h4>
              <p>{c.what}</p>
              {upcoming.length > 0 && (
                <ol className="cm-events compact">
                  {upcoming.slice(0, 3).map((e) => <EventRow key={e.url} e={e} />)}
                </ol>
              )}
              <a className="cm-card-link" href={c.url} target="_blank" rel="noopener noreferrer">{c.cta} ↗</a>
            </article>
          );
        })}
      </div>

      <p className="news-credit">
        Event times are shown in your local time zone. Events and locations come from each community&apos;s public calendar, refreshed daily.
      </p>
    </section>
  );
}
