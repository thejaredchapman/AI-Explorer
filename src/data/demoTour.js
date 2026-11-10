// Guided demo script. Each stop scrolls to a section and narrates it.
// `id` must match an entry in SECTIONS (src/data/sections.js).
export const DEMO_STOPS = [
  { id: 'hero', title: 'Welcome to AI-Explorer', text: 'An interactive field guide to AI, from first concepts to building your own. Everything is static and runs in your browser. No sign-up, no API keys.' },
  { id: 'ai-examples', title: 'AI at work', text: 'Start with real examples so the abstract becomes concrete before any jargon shows up.' },
  { id: 'concepts', title: 'The vocabulary', text: 'Tokens, embeddings, agents, RAG. Open any card for a deeper walkthrough.' },
  { id: 'use-cases', title: 'Use Case Atlas', text: '500 ideas across ten industries, each graded A to D for safety. The grade is computed from risk flags, never hand-typed.' },
  { id: 'llm-rubric', title: 'Compare models', text: 'A side-by-side model table with the date the data was pulled, and a one-click Markdown export.' },
  { id: 'model-lab', title: 'Model Lab', text: 'Pick a model, price a workload in the cost lab, run missions and take the quiz.' },
  { id: 'prompt-engineering', title: 'Prompting', text: 'The techniques that reliably get better answers, with examples you can copy.' },
  { id: 'ai-tools', title: 'Tools and protocols', text: 'MCP versus plain APIs, and how agents connect to the outside world.' },
  { id: 'glass-demo', title: 'Glass Demo', text: 'A hands-on demo mode: compare two models head to head, rank every model by your priorities, or start from a use case. Press Play for its own walkthrough.' },
  { id: 'learning-games', title: 'Learn by playing', text: 'Seven levels from concept cards to a boss quiz. Earn XP as you go.' },
  { id: 'guides', title: 'Build something', text: 'Step-by-step guides to take what you learned and ship it. That is the tour. Explore freely from here.' },
];

export const DEMO_STEP_MS = 9000;
