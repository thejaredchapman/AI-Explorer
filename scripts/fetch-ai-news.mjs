#!/usr/bin/env node
// Fetch the last 30 days of AI headlines from selected outlets via NewsAPI.org
// and write them to src/data/aiNews.json for the "AI in the News" section.
//
// Usage: NEWS_API_KEY=... node scripts/fetch-ai-news.mjs
// The key is sent in the X-Api-Key header and is never written to disk.

import { writeFile } from 'node:fs/promises';

const OUTLETS = [
  { domain: 'apnews.com', name: 'AP News' },
  { domain: 'cnn.com', name: 'CNN' },
  { domain: 'foxnews.com', name: 'Fox News' },
  { domain: 'bloomberg.com', name: 'Bloomberg' },
  { domain: 'theverge.com', name: 'The Verge' },
  { domain: 'gizmodo.com', name: 'Gizmodo' },
];

const QUERY = '"artificial intelligence" OR AI OR OpenAI OR Anthropic OR ChatGPT OR Gemini OR Claude OR chatbot OR "large language model"';
const DAYS = 30;
const PER_OUTLET = 40; // NewsAPI pageSize; 6 requests per run
const OUT_FILE = new URL('../src/data/aiNews.json', import.meta.url);

const key = process.env.NEWS_API_KEY;
if (!key) {
  console.error('NEWS_API_KEY is not set.');
  process.exit(1);
}

const now = new Date();
const from = new Date(now.getTime() - DAYS * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
const to = now.toISOString().slice(0, 10);

const clean = (s) => (typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : '');
const isHttps = (u) => {
  try { return new URL(u).protocol === 'https:'; } catch { return false; }
};

async function fetchOutlet({ domain, name }) {
  const params = new URLSearchParams({
    q: QUERY,
    searchIn: 'title,description',
    domains: domain,
    from,
    to,
    language: 'en',
    sortBy: 'publishedAt',
    pageSize: String(PER_OUTLET),
  });
  const res = await fetch(`https://newsapi.org/v2/everything?${params}`, {
    headers: { 'X-Api-Key': key, 'User-Agent': 'ai-explorer-news/1.0' },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.status !== 'ok') {
    throw new Error(`${name}: ${body.code || res.status} ${body.message || ''}`.trim());
  }
  return body.articles
    .filter((a) => a.title && a.title !== '[Removed]' && isHttps(a.url))
    .map((a) => ({
      title: clean(a.title),
      description: clean(a.description).slice(0, 300),
      url: a.url,
      outlet: name,
      domain,
      author: clean(a.author).slice(0, 120) || null,
      publishedAt: a.publishedAt,
    }));
}

const results = await Promise.allSettled(OUTLETS.map(fetchOutlet));
const errors = results.filter((r) => r.status === 'rejected').map((r) => r.reason.message);
errors.forEach((e) => console.error(`warning: ${e}`));

if (errors.length === OUTLETS.length) {
  console.error('Every request failed; keeping the existing news file.');
  process.exit(1);
}

// Merge, drop duplicates (same URL or same headline), newest first.
const seen = new Set();
const articles = results
  .filter((r) => r.status === 'fulfilled')
  .flatMap((r) => r.value)
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .filter((a) => {
    const k1 = a.url.split('?')[0];
    const k2 = a.title.toLowerCase();
    if (seen.has(k1) || seen.has(k2)) return false;
    seen.add(k1); seen.add(k2);
    return true;
  });

const data = {
  updatedAt: now.toISOString(),
  from,
  to,
  outlets: OUTLETS.map((o) => ({
    ...o,
    count: articles.filter((a) => a.domain === o.domain).length,
    error: errors.find((e) => e.startsWith(`${o.name}:`)) ? 'unavailable' : null,
  })),
  articles,
};

await writeFile(OUT_FILE, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Wrote ${articles.length} articles (${from} to ${to}); ${errors.length} outlet(s) failed.`);
