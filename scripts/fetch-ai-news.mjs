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

const QUERY = 'AI OR "artificial intelligence" OR OpenAI OR ChatGPT OR Anthropic OR Claude OR Gemini OR Copilot OR chatbot OR chatbots OR deepfake OR DeepSeek OR Grok OR xAI OR "Sam Altman" OR "Character.ai" OR Suno OR agentic OR "machine learning" OR "language model"';
// Strict AI-only filter. A story is kept only if its HEADLINE is about AI;
// a passing mention in the summary or body is not enough.
// Case-sensitive acronyms, so "Ai Weiwei" or "agi" in other words don't match.
const AI_ACRONYM = /\b(AI|A\.I\.|AGI|LLMs?|xAI|GPT-?\d[\w.]*)\b/;
// Unambiguous AI terms, companies, products and people, any case.
const AI_TERMS = /\b(artificial intelligence|machine learning|deep learning|neural networks?|large language models?|language models?|superintelligence|agentic|chatbots?|deepfakes?|OpenAI|ChatGPT|Anthropic|DeepSeek|Midjourney|Hugging Face|Perplexity AI|Mistral AI|Character\.ai|Suno|Grok|Sora|Sam Altman|Dario Amodei|Demis Hassabis)\b/i;
// Names that are ambiguous on their own (zodiac Gemini, car copilots, people named Claude)
// only count with a clear AI or company signal in the same headline.
const AI_QUALIFIED = /\b(Google'?s? Gemini|Gemini (AI|chatbot|app|model|for|in|Live|Pro|Flash|Ultra)|(Microsoft|GitHub)'?s? Copilot|Claude (AI|chatbot|model|Code|Opus|Sonnet|Haiku)|Anthropic'?s? Claude)\b/i;
const isAiHeadline = (title) => AI_ACRONYM.test(title) || AI_TERMS.test(title) || AI_QUALIFIED.test(title);

const DAYS = 30;
const PER_OUTLET = 100; // NewsAPI's maximum pageSize; 6 requests per run
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
    searchIn: 'title', // fill the 100 slots with headline matches only
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
    .filter((a) => isAiHeadline(a.title))
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
