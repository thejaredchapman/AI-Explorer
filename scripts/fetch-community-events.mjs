#!/usr/bin/env node
// Fetch upcoming events from official AI community calendars (Luma iCal feeds)
// and write them to src/data/communityEvents.json for the "Community & Events" section.
// No API key needed. Usage: node scripts/fetch-community-events.mjs
//
// Only calendars that the company's own website links to are included.

import { writeFile } from 'node:fs/promises';

const CALENDARS = [
  { id: 'claude', calendar: 'cal-TOpA5LAFfuDeFpu', limit: 80 },  // linked from claude.com/community
  { id: 'langchain', calendar: 'cal-mvNH1VHlaFtSMFx', limit: 10 }, // linked from langchain.com
  { id: 'ollama', calendar: 'cal-ab6w7NUO0oqSPA3', limit: 10 },    // linked from ollama.com
];
const DAYS_AHEAD = 120;
const OUT_FILE = new URL('../src/data/communityEvents.json', import.meta.url);

const unescape = (s) => s.replace(/\\n/gi, ' ').replace(/\\([,;\\])/g, '$1').replace(/\s+/g, ' ').trim();
const isHttps = (u) => {
  try { return new URL(u).protocol === 'https:'; } catch { return false; }
};

// 20261211 or 20261211T183000Z -> ISO string (UTC)
function parseDate(value) {
  const m = value.match(/^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})Z?)?$/);
  if (!m) return null;
  const [, y, mo, d, h = '00', mi = '00', s = '00'] = m;
  return { iso: `${y}-${mo}-${d}T${h}:${mi}:${s}Z`, allDay: !m[4] };
}

function parseIcs(text) {
  // Unfold continuation lines (RFC 5545: a line starting with a space continues the previous one)
  const lines = text.replace(/\r\n[ \t]/g, '').replace(/\n[ \t]/g, '').split(/\r?\n/);
  const events = [];
  let ev = null;
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') ev = {};
    else if (line === 'END:VEVENT') { if (ev) events.push(ev); ev = null; }
    else if (ev) {
      const i = line.indexOf(':');
      if (i < 0) continue;
      const key = line.slice(0, i).split(';')[0];
      ev[key] = line.slice(i + 1);
    }
  }
  return events;
}

async function fetchCalendar({ id, calendar, limit }) {
  const res = await fetch(`https://api.lu.ma/ics/get?entity=calendar&id=${calendar}`, {
    headers: { 'User-Agent': 'ai-explorer-community/1.0' },
  });
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  const now = Date.now();
  const horizon = now + DAYS_AHEAD * 24 * 60 * 60 * 1000;
  return parseIcs(await res.text())
    .map((e) => {
      const start = parseDate(e.DTSTART || '');
      const description = unescape(e.DESCRIPTION || '');
      const location = unescape(e.LOCATION || '');
      const link = (description.match(/https:\/\/(?:lu\.ma|luma\.com)\/[\w-]+/) || [])[0]
        || (isHttps(location) ? location : null);
      const title = unescape(e.SUMMARY || '');
      // Many titles start with the city, e.g. "Bogota | Claude for Gamers Workshop".
      const city = (title.match(/^([^|]{2,40}?)\s*\|\s*\S/) || [])[1] || null;
      return {
        title,
        start: start?.iso,
        allDay: start?.allDay ?? false,
        city,
        // Luma puts a link instead of the address when it is shown only to registered guests.
        address: isHttps(location) ? null : location.slice(0, 140) || null,
        url: link,
      };
    })
    .filter((e) => e.title && e.start && e.url && isHttps(e.url))
    .filter((e) => { const t = Date.parse(e.start); return t >= now - 12 * 3600 * 1000 && t <= horizon; })
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, limit);
}

const results = await Promise.allSettled(CALENDARS.map(fetchCalendar));
const failed = results.filter((r) => r.status === 'rejected').map((r) => r.reason.message);
failed.forEach((f) => console.error(`warning: ${f}`));
if (failed.length === CALENDARS.length) {
  console.error('Every calendar failed; keeping the existing events file.');
  process.exit(1);
}

const data = { updatedAt: new Date().toISOString(), daysAhead: DAYS_AHEAD, calendars: {} };
CALENDARS.forEach((c, i) => {
  const r = results[i];
  data.calendars[c.id] = r.status === 'fulfilled' ? { events: r.value, error: null } : { events: [], error: 'unavailable' };
});

await writeFile(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(Object.entries(data.calendars).map(([k, v]) => `${k}: ${v.events.length}`).join(', '));
