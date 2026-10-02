// Single source of truth for page sections. Order defines each section's compass bearing:
// bearing = 360 * index / SECTIONS.length, so Home sits at due north (000°).
export const SECTIONS = [
  { id: 'hero', label: 'Home', blurb: 'Start here' },
  { id: 'ai-examples', label: 'Examples', blurb: 'AI at work' },
  { id: 'concepts', label: 'AI Concepts', blurb: 'The vocabulary' },
  { id: 'llm-rubric', label: 'Compare Models', blurb: 'Who is best at what' },
  { id: 'model-training', label: 'Training', blurb: 'How models are made' },
  { id: 'prompt-engineering', label: 'Prompting', blurb: 'Getting better answers' },
  { id: 'products', label: 'Products', blurb: 'What you can use' },
  { id: 'ai-tools', label: 'Tools & Protocols', blurb: 'MCP, APIs, agents' },
  { id: 'code-assistants', label: 'Code Editors', blurb: 'AI in your IDE' },
  { id: 'skills', label: 'Skills', blurb: 'Reusable know-how' },
  { id: 'learning-games', label: 'Games', blurb: 'Learn by playing' },
  { id: 'resources', label: 'Resources', blurb: 'Courses and communities' },
  { id: 'guides', label: 'Guides', blurb: 'Build something' },
];

export const bearingOf = (index) => (360 * index) / SECTIONS.length;
export const formatBearing = (index) => `${String(Math.round(bearingOf(index)) % 360).padStart(3, '0')}°`;
