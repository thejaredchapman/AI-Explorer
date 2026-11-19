import news from '../data/aiNews.json';
import events from '../data/communityEvents.json';
import { whatsNew, whatsNewSince } from '../data/whatsNew';
import { dataAsOf } from '../data/llmData';
import { formatAsOf } from '../utils/llmMarkdown';

const AREAS = ['Models', 'News & events', 'Guides & tools', 'Site'];
const fmtDay = (iso) =>
  new Date(`${iso.slice(0, 10)}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

export default function WhatsNew() {
  const items = whatsNew.filter((e) => e.date >= whatsNewSince);
  const groups = AREAS
    .map((area) => [area, items.filter((e) => e.area === area)])
    .filter(([, list]) => list.length);
  const headlines = news.articles?.length ?? 0;
  const now = new Date().toISOString();
  const upcoming = Object.values(events.calendars ?? {})
    .flatMap((c) => c.events ?? [])
    .filter((e) => e.start >= now).length;

  return (
    <details className="ex-whatsnew">
      <summary>
        What&rsquo;s new since {fmtDay(whatsNewSince)}
        <span className="ex-whatsnew-count">{items.length} updates</span>
      </summary>
      <p className="ex-whatsnew-live">
        Model data as of {formatAsOf(dataAsOf)} · {headlines} headlines
        {news.updatedAt && <> (refreshed {fmtDay(news.updatedAt)})</>} · {upcoming} upcoming events
      </p>
      {groups.map(([area, list]) => (
        <section key={area}>
          <h3>{area}</h3>
          <ul>
            {list.map((e) => (
              <li key={e.text}>
                <time dateTime={e.date}>{fmtDay(e.date)}</time>
                <span>{e.text}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </details>
  );
}
