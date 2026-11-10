// Glass Demo: config for the interactive demo tab. Model data comes from llmData.js and
// use cases from useCaseData.js; this file only holds presets, keyword rules and the autoplay script.

export const CAP_KEYS = ['reasoning', 'coding', 'creativeWriting', 'math', 'multilingual', 'vision', 'speed', 'instruction'];

// Cheapest to most expensive. A tier filter keeps every model at or below the chosen tier.
export const TIER_ORDER = ['Free (self-hosted)', 'Budget', 'Mid-Range', 'Premium'];

const w = (o) => Object.fromEntries(CAP_KEYS.map((k) => [k, o[k] ?? 0]));

export const PRIORITY_PRESETS = [
  { id: 'balanced', label: 'Balanced', weights: w({ reasoning: 3, coding: 3, creativeWriting: 3, math: 3, multilingual: 3, vision: 3, speed: 3, instruction: 3 }) },
  { id: 'coder', label: 'Coding agent', weights: w({ coding: 5, reasoning: 4, instruction: 4, speed: 1 }) },
  { id: 'writer', label: 'Writer', weights: w({ creativeWriting: 5, instruction: 3, multilingual: 2 }) },
  { id: 'analyst', label: 'Analyst', weights: w({ reasoning: 5, math: 5, instruction: 3 }) },
  { id: 'fast', label: 'Fast and cheap', weights: w({ speed: 5, instruction: 3, reasoning: 1 }) },
];

// Keyword rules that turn a use-case title into capability priorities. Shown to the user as "why".
export const USE_CASE_RULES = [
  { re: /\b(code|coding|api|sql|tests?|refactor|bugs?|debug|migrat|software|scripts?|front-end|database|queries)\b/i, cap: 'coding', why: 'mentions code or data systems' },
  { re: /\b(translat\w*|languages?|multilingual|locali[sz]\w*)\b/i, cap: 'multilingual', why: 'works across languages' },
  { re: /\b(images?|photos?|diagrams?|visual\w*|scans?|inspect\w*|mockups?|drawings?|video|charts?)\b/i, cap: 'vision', why: 'involves images or visuals' },
  { re: /\b(math|forecast\w*|pric\w*|budget\w*|financ\w*|calculat\w*|statistic\w*|quant\w*|accounting|demand|risk)\b/i, cap: 'math', why: 'involves numbers or forecasting' },
  { re: /\b(write|writing|draft\w*|stor(y|ies)|copy|blog|posts?|poems?|captions?|newsletters?|creative|game)\b/i, cap: 'creativeWriting', why: 'produces written or creative output' },
  { re: /\b(summar\w*|analy[sz]\w*|explain\w*|review\w*|research\w*|plan\w*|diagnos\w*|compar\w*|assess\w*|argue)\b/i, cap: 'reasoning', why: 'needs analysis or judgment' },
  { re: /\b(real-time|chat|triage|classif\w*|label\w*|tag\w*|rout\w*|quick|instant|support|on-call)\b/i, cap: 'speed', why: 'is high-volume or time-sensitive' },
  { re: /\b(format\w*|templates?|forms?|checklists?|polic(y|ies)|compliance|extract\w*|documentation|runbooks?)\b/i, cap: 'instruction', why: 'must follow a structure exactly' },
];

// Autoplay script for demo mode. Each scene sets the visible tab and its controls.
// Model ids must exist in llmModels; use cases are matched by exact title.
export const DEMO_SCENES = [
  { tab: 'duel', title: 'Head to head', caption: 'Pick any two models and compare every capability side by side, with the leader called out in words, not just color.', a: 'claude-opus-5-5', b: 'gpt-6-sol', volume: 50 },
  { tab: 'duel', title: 'Price the gap', caption: 'Same comparison, now a premium model against a budget one. Slide the monthly volume to see how fast the cost gap grows.', a: 'claude-opus-5-5', b: 'claude-haiku-5-5', volume: 400 },
  { tab: 'fit', title: 'Find my model', caption: 'Weight what matters and the ranking updates live. Here: a coding agent, any price tier.', preset: 'coder', maxTier: 'Premium', openOnly: false },
  { tab: 'fit', title: 'Tight budget, open weights', caption: 'Same priorities, limited to open-weight models you can self-host or rent cheaply.', preset: 'coder', maxTier: 'Budget', openOnly: true },
  { tab: 'case', title: 'Start from a use case', caption: 'Pick a real use case from the atlas. Its safety grade sets the oversight, and its wording sets the priorities.', useCase: 'Review pull requests for bugs and style' },
  { tab: 'case', title: 'Higher stakes', caption: 'A grade D use case raises the bar on reasoning and instruction following, and the guardrails say who stays in charge.', useCase: 'Summarize patient charts for clinician review' },
];

export const DEMO_SCENE_MS = 7000;
