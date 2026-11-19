// "What's new" panel in the Hero. Newest first. The weekly refresh (refresh-content skill)
// rolls `whatsNewSince` forward and adds entries; manual edits are fine too.
// `area` is one of: 'Models', 'News & events', 'Guides & tools', 'Site'.
export const whatsNewSince = '2026-11-12';

export const whatsNew = [
  { date: '2026-11-19', area: 'Models', text: 'GPT-6.2 Astra ($8 / $40 per 1M tokens) and GPT-6.2 Sol ($2 / $10) added.' },
  { date: '2026-11-19', area: 'Models', text: 'Gemini 4 Neon ($3 / $15 per 1M tokens) and Gemini 4 Hydrogen ($1.50 / $7.50) added.' },
  { date: '2026-11-19', area: 'Models', text: 'Gemini 4 Argon is now listed as generally available.' },
  { date: '2026-11-19', area: 'Models', text: 'GPT-5, GPT-5 mini, GPT-5 nano, o3 and o3-pro now point to GPT-6.1 Sol, GPT-6.1 Terra or GPT-6 Luna as replacements.' },
  { date: '2026-11-18', area: 'Site', text: 'New "What\'s new" panel at the top of the page.' },
  { date: '2026-11-18', area: 'Site', text: 'The "updated" date now changes every time the daily update runs.' },
  { date: '2026-11-18', area: 'Site', text: 'The footer notes that the site is updated with the Claude Agent SDK.' },
  { date: '2026-11-18', area: 'News & events', text: 'Headlines and community events refreshed every day.' },
];
