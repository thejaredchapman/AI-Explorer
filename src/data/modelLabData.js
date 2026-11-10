// Model Lab data. Source: Anthropic launch post for Claude Fable 5.2 and Mythos 5.2 (2026-11-09)
// plus the provider radar compiled from official provider pages on the same date.
// Sonnet 5.5 and Haiku 5.5 have no scores in the launch post, so none are invented here.

export const labAsOf = '2026-11-09';
export const LAUNCH_URL = 'https://www.anthropic.com/claude-fable-and-mythos-5-2';

export const FAMILY = [
  { id: 'haiku', name: 'Haiku 5.5', apiId: 'claude-haiku-5-5', color: '#6fbcb4', tag: 'Light work, lots of it',
    role: 'Step down to Haiku when the job is light, or when you need a worker for the small pieces of a bigger job.',
    uses: ['Classifying, extracting, routing', 'High-volume pipelines', 'Worker inside an orchestrated team'],
    tech: 'Can consult Fable 5.2 as an Advisor. Anthropic lists it from $0.10 / $0.50 per million tokens with a 1M context window and 128K max output. Retirement not before Oct 7, 2027.' },
  { id: 'sonnet', name: 'Sonnet 5.5', apiId: 'claude-sonnet-5-5', color: '#5b8def', tag: 'The step down from Opus',
    role: 'Step down to Sonnet when Opus is more than the task needs. A sensible default worker for routine, well-defined jobs.',
    uses: ['Routine coding and writing', 'Worker in an advisor setup', 'Medium subtasks in a team'],
    tech: '$2 in / $10 out per million tokens, 1M context, 128K max output, default effort high. Can consult Fable 5.2 as an Advisor. Retirement not before Sep 28, 2027.' },
  { id: 'opus', name: 'Opus 5.5', apiId: 'claude-opus-5-5', color: '#ec9a3c', tag: 'The daily driver',
    role: 'Anthropic calls it "our strongest daily driver" and suggests starting here, then moving up or down.',
    uses: ['Everyday professional coding and analysis', 'Strong baseline to compare against', 'Advisor-style work and long sessions'],
    tech: '$4 / $20 per million tokens, 1M context, 128K max output, default effort medium. FrontierCode 2.0: 45.5% (Fable 5.2: 49.1% at Xhigh). OSWorld 2.1: 87.2%. Remote Labor Index: 21.3% vs Fable 5.2 at 41.3%. Blocked Fable queries fall back to older Opus models (Opus 4.8 for cyber, Opus 5 for biology), not to Opus 5.5.' },
  { id: 'fable', name: 'Fable 5.2', apiId: 'claude-fable-5-2', color: '#e0658f', tag: 'Ambitious, open-ended work',
    role: 'For the most ambitious technical work: big refactors, agent teams, hard science and engineering. Available to everyone on every major platform.',
    uses: ['Multi-agent builds and migrations', 'Long-running, open-ended projects', 'Advisor or orchestrator for smaller models'],
    tech: '$8 in / $40 out per million tokens. Fast mode: $16 / $80 for up to 2.5x faster generation. 1M context, 128K max output. Medium effort is the default in Claude apps and Claude Code. Cyber and biology safeguards on. Retirement not before Nov 9, 2027.' },
  { id: 'mythos', name: 'Mythos 5.2', apiId: 'Not listed in the launch post', color: '#a58ae0', tag: 'Same model, fewer safeguards',
    role: 'The same model without certain cyber and biology safeguards, for vetted organizations doing defensive security and life-science research.',
    uses: ['Finding vulnerabilities before attackers do', 'Protein and biology research', 'Continuous code scanning via Claude Security'],
    tech: 'CVE Rediscovery: 89.6% (Opus 5.5 without safeguards: 81.3%). CyScenarioBench: 76.3%. De novo binder design (24 hr): 85.1%. AI-R&D limits and the Opus 5 fallbacks for some topics still apply. Fast mode is limited to Verification Program organizations.' },
];

export const WAYS = [
  { name: 'Claude apps', group: 'Chat', who: ['chat'], fast: 'Not listed',
    steps: ['Sign in to Claude.', 'Choose Fable 5.2 as the model for your chat.', 'During launch week (Nov 9-16, 2026), Pro plans and standard Team seats can use up to 50% of weekly usage limits on Fable.'],
    tech: 'Medium effort is the default in the apps. Launch promo: Max, Ultra and premium seats get one to three Fable limit resets depending on subscription length; Pro and standard Team seats get one.',
    link: ['https://support.claude.com/en/articles/17506494', 'Plan and usage details'] },
  { name: 'Claude Code', group: 'Build', who: ['dev'], fast: 'Yes',
    steps: ['Open Claude Code in a project.', 'Run /model and pick Fable 5.2.', 'Run /fast when you want faster output.'],
    tech: 'Medium effort is the default. Fast mode runs up to 2.5x faster at $16 in / $80 out per million tokens.' },
  { name: 'Cowork', group: 'Chat', who: ['chat'], fast: 'Not listed',
    steps: ['Open Cowork and check its model options for Fable 5.2.'],
    tech: 'The launch post names Cowork alongside claude.ai and Claude Code as a place it measured safeguard blocks, but gives no setup steps.' },
  { name: 'Claude Platform API', group: 'Build', who: ['dev'], fast: 'Yes',
    steps: ['Create an API key in the Claude Platform.', 'Call the Messages API with model claude-fable-5-2.', 'See mission 7 for a working snippet.'],
    tech: 'Preserved thinking is now enabled for all accounts. Fast mode is available here.' },
  { name: 'Managed Agents', group: 'Build', who: ['dev'], fast: 'Not listed',
    steps: ['Set up a multi-agent session (subagents or workflows), with Fable 5.2 as the coordinator.', 'Follow the multi-agent orchestration guide.'],
    tech: 'Managed Agents can host a multi-agent setup in one session; Fable 5.2 can act as the coordinator.',
    link: ['https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration', 'Orchestration docs'] },
  { name: 'Amazon Web Services', group: 'Cloud', who: ['cloud'], fast: 'Not listed',
    steps: ['Use the Claude models in your AWS account.', 'Look up the Fable 5.2 model ID in your AWS console, since cloud IDs can differ from claude-fable-5-2.'],
    tech: 'Anthropic says Fable 5.2 is available today on all platforms, including AWS.' },
  { name: 'Google Cloud', group: 'Cloud', who: ['cloud'], fast: 'Yes',
    steps: ['Use Claude Models on Google Cloud, either Anthropic-managed or Google-managed.', 'Look up the Fable 5.2 model ID in your console.'],
    tech: 'Fast mode is available on both the Anthropic-managed and Google-managed options.' },
  { name: 'Microsoft Azure / Foundry', group: 'Cloud', who: ['cloud'], fast: 'Yes (Anthropic-hosted)',
    steps: ['Use Claude in Microsoft Foundry.', 'Look up the Fable 5.2 model ID in your Azure console.'],
    tech: 'Fast mode is available on Microsoft Foundry when Anthropic-hosted.' },
  { name: 'Claude Security', group: 'Secure', who: ['sec'], fast: 'Not listed',
    steps: ['Needs a Claude Enterprise plan.', 'Open Claude Security and connect your repos.', 'Optional: wire it into your tools through the API or MCP.'],
    tech: 'Uses Anthropic\'s most capable models, now including Mythos 5.2, and watches repos as code changes and tracks findings until they are fixed. This is the cyber route that Fable itself blocks.',
    link: ['https://claude.com/product/claude-security', 'Claude Security'] },
];
export const WAY_FILTERS = [['all', 'Show all nine'], ['chat', 'I just want to chat'], ['dev', 'I write code'], ['cloud', 'My company is on a cloud'], ['sec', 'I do security work']];

export const BENCH_MODELS = {
  f52: ['Fable 5.2', '#e0658f'], m52: ['Mythos 5.2', '#a58ae0'], f51: ['Fable 5.1', '#e0658f'], m51: ['Mythos 5.1', '#a58ae0'],
  opus: ['Opus 5.5', '#ec9a3c'], gpt: ['GPT-6 Astra', '#7f9a93'], gem: ['Gemini 4 Carbon', '#8a8f9c'],
};
export const BENCHMARKS = [
  { name: 'FrontierCode 2.0', what: 'Agentic coding. Measures whether a model\'s code changes would be merged by the maintainers of open-source repositories.', s: { f52: 49.1, f51: 32.4, opus: 45.5, gpt: 42.8, gem: 41.1 }, note: 'Fable 5.2 shown at Xhigh effort. At High effort it scores 45.3%, about level with Opus 5.5 at Max effort, for roughly half the cost per task, per Anthropic. Gemini is at Medium effort.' },
  { name: 'FrontierSWE v2', what: 'Agentic coding.', s: { f52: 69.9, f51: 56.3, opus: 62.3, gpt: 65.5, gem: 61.2 }, note: 'Highest effort, safeguards on.' },
  { name: 'AutomationBench', what: 'Business workflows.', s: { f52: 51.4, f51: 31.4, opus: 42.5, gpt: 41.4, gem: 53.9 }, note: 'The one chart here where a rival (Gemini 4 Carbon) beats Fable 5.2.' },
  { name: 'Terminal-Bench-Science 0.1', what: 'Agentic scientific research.', s: { m52: 75.3, f52: 74.6, f51: 52.6, opus: 58.7, gpt: 68.1, gem: 64.8 }, note: 'Mythos and Fable are nearly tied, which fits Anthropic calling them the same underlying model.' },
  { name: 'OSWorld 2.1', what: 'Operating a computer: clicking, typing, using real apps.', s: { f52: 89.3, f51: 83.5, opus: 87.2, gpt: 79.5, gem: 81.5 }, note: 'Offline, partial run per the launch post.' },
  { name: 'Remote Labor Index', what: 'Knowledge work.', s: { f52: 41.3, f51: 17.9, opus: 21.3, gpt: 20.8 }, note: 'High effort. The biggest jump over Opus 5.5 on this page: about double.' },
  { name: "Humanity's Last Exam", what: 'Multidisciplinary reasoning, with tools.', s: { f52: 74.2, f51: 65.6, opus: 67.7, gpt: 57.2 }, note: 'With tools.' },
  { name: 'Chartography', what: 'Reading and reasoning over charts, no tools.', s: { f52: 73.4, f51: 44.8, opus: 64.4, gpt: 71.0, gem: 72.5 }, note: 'At Medium effort Fable 5.2 scores 66.4%.' },
  { name: 'BenchCAD 2.1', what: 'Hardware and mechanical engineering design.', s: { f52: 83.5, f51: 44.4, opus: 65.3 }, note: 'Max effort.' },
  { name: 'CVE Rediscovery', what: 'Finding known vulnerabilities in code (internal benchmark).', s: { m52: 89.6, m51: 78.3, opus: 81.3 }, note: 'Opus 5.5 run without safeguards. Mythos 5.2 found 10.2% more than Opus 5.5 across 1,829 CVEs.' },
  { name: 'CyScenarioBench', what: 'Cybersecurity scenarios with unique tasks per lab.', s: { m52: 76.3, m51: 61.7, opus: 67.6, gpt: 61 }, labels: { gpt: 'GPT-6 Cyber' }, note: 'Opus 5.5 without safeguards. The GPT entry is GPT-6 Cyber.' },
];

export const COST_PRESETS = [['Chat reply', 2000, 500, 500], ['Code review', 30000, 3000, 200], ['Agent run', 400000, 60000, 20]];
// price: [input, output] per million tokens, null when the user must enter it.
export const COST_ROWS = [
  { id: 'f', name: 'Fable 5.2 standard', color: '#e0658f', price: [8, 40] },
  { id: 'ff', name: 'Fable 5.2 fast mode', color: '#e0658f', price: [16, 80] },
  { id: 'o', name: 'Opus 5.5', color: '#ec9a3c', price: [4, 20] },
  { id: 's', name: 'Sonnet 5.5', color: '#5b8def', price: [2, 10] },
  { id: 'h', name: 'Haiku 5.5', color: '#6fbcb4', price: [0.1, 0.5], longPrice: [0.5, 2.5], longAbove: 100000 },
];

export const PICK_QUESTIONS = [
  { k: 'task', q: 'What are you asking it to do?', o: [['Quick, simple tasks', 1, 'Classify, extract, short answers'], ['Routine, well-defined work', 2, 'Clear steps, known patterns'], ['Daily professional work', 3, 'Coding, analysis, writing'], ['Hard, open-ended, long-running', 4, 'Big refactors, research, agent teams']] },
  { k: 'prio', q: 'What matters most?', o: [['Low cost and speed', -1, ''], ['A balance', 0, ''], ['Best possible result', 1, '']] },
  { k: 'vol', q: 'How often will it run?', o: [['A few times', 'few', 'One-offs and experiments'], ['Hundreds of times a day', 'many', 'A team or a product feature'], ['Constantly, at scale', 'scale', 'Pipelines and agents']] },
  { k: 'dom', q: 'What field is this in?', o: [['General', 'gen', ''], ['Security research', 'sec', 'Vulnerability finding, exploits, pentests'], ['Life-science research', 'bio', 'Proteins, biology R&D']] },
];

export const PATTERN_TASKS = [
  { t: 'Rename a config key across the repo', d: 1 }, { t: 'Write unit tests for the parser', d: 2 }, { t: 'Update the README', d: 1 },
  { t: 'Design the caching strategy', d: 3 }, { t: 'Track down an intermittent race condition', d: 3 }, { t: 'Migrate settings to the new format', d: 2 },
];
export const PATTERN_MODES = [
  ['orch', 'Orchestrator', 'Fable plans, then hands each task to the smallest model that can handle it and keeps the hard ones.'],
  ['advisor', 'Advisor', 'Sonnet does the work and phones Fable only on the hard calls.'],
  ['fable', 'Solo Fable', 'Fable does everything. Best quality, highest bill.'],
  ['small', 'Solo Sonnet', 'Sonnet does everything. Cheap, but hard tasks are a gamble.'],
];

export const ACCESS_REQUESTS = [
  { label: 'Fix a bug in my web app', kind: 'ok' }, { label: 'Explain how vaccines work', kind: 'ok' },
  { label: 'Penetration-test my staging network', kind: 'cyber' }, { label: 'Generate an exploit from a binary', kind: 'cyber' },
  { label: 'Scan my repo for vulnerabilities', kind: 'scan' }, { label: 'Design a binder protein', kind: 'bio' },
  { label: 'Write kernels for a nonstandard accelerator', kind: 'kern' },
];

export const MISSIONS = [
  { id: 'm1', level: 'Beginner', title: 'Meet Fable', steps: 'Open Claude Code in any project. Run /model and choose Fable 5.2. Paste the prompt below.', prompt: 'Give me a 5-bullet tour of this codebase, then name the three files most likely to break if I change the data model, and say why.', tech: 'The API ID is claude-fable-5-2. At Medium effort (the default in Claude Code), Anthropic says Fable 5.2 can do challenging tasks with fewer tokens than Fable 5.1.' },
  { id: 'm2', level: 'Beginner', title: 'Turn the effort dial', steps: 'Run the same prompt at Medium (default), then again at High. Compare depth, time and tokens used.', prompt: 'Find the most fragile function in this repo and propose a fix with a test.', tech: 'Effort is a cost lever. On FrontierCode 2.0 Fable 5.2 scores 45.3% at High and 49.1% at Xhigh. Anthropic says High is about level with Opus 5.5 at Max effort, for roughly half the cost per task.' },
  { id: 'm3', level: 'Builder', title: 'Go fast', steps: 'Toggle fast mode in Claude Code, then do something interactive, such as fixing lint errors one by one.', prompt: '/fast', tech: 'Fast mode generates up to 2.5x faster at twice the price ($16 in / $80 out per million tokens). Worth it when you are waiting on it, wasteful for background jobs.' },
  { id: 'm4', level: 'Builder', title: 'Refactor with a safety net', steps: 'Pick a small module and port it to another language or framework. Make Fable write tests first.', prompt: 'Port <module> from <language> to <language>. Write characterization tests first and keep them green at every step. Report before and after timings.', tech: 'A small version of the migration Anthropic describes: a Python service moved to Rust that starts about 26x faster. Tests are what let an agent run unattended.' },
  { id: 'm5', level: 'Expert', title: 'Add an advisor', steps: 'Work on a smaller model and let it call Fable for the hard decisions. Read the docs for the exact setup.', prompt: 'Work on this task. Before any design decision, or when tests fail twice in a row, consult the advisor model and follow its guidance.', link: ['https://code.claude.com/docs/en/advisor', 'Advisor docs'], tech: 'Haiku, Sonnet or Opus can act as the worker. On API billing you pay Fable rates only for the advisor calls; on a subscription, advisor use counts toward your plan limits, and a Fable advisor bills to usage credits.' },
  { id: 'm6', level: 'Expert', title: 'Run a small team', steps: 'Ask Fable to act as orchestrator for a multi-part task. Check that it routes work sensibly.', prompt: 'Act as orchestrator. Split this task into independent subtasks, label each easy, medium or hard, delegate easy ones to the smallest capable model, keep the hard ones, and verify every result before merging.', link: ['https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration', 'Orchestration docs'], tech: "Anthropic reports teams of about 1,000 Fable 5.2 agents. One formalized Fermat's Last Theorem in Lean in 30 hours with minimal human intervention." },
  { id: 'm7', level: 'Expert', title: 'Call it from code', steps: 'Use the API. Set your key in ANTHROPIC_API_KEY, install the SDK, and run this.', prompt: 'import anthropic\n\nclient = anthropic.Anthropic()\nmsg = client.messages.create(\n    model="claude-fable-5-2",\n    max_tokens=2048,\n    messages=[{"role": "user",\n               "content": "Review this function for bugs: ..."}],\n)\nprint(msg.content[0].text)', tech: 'Preserved thinking is now enabled for all accounts. The model is also on AWS, Google Cloud and Azure.' },
];

export const QUIZ = [
  { q: 'How are Fable 5.2 and Mythos 5.2 related?', o: ['Two separate models', 'The same underlying model, different safeguards', 'Fable is a distilled Mythos', 'Mythos is an older release'], a: 1, e: 'Anthropic calls them the same underlying model. Fable has cyber and biology safeguards; Mythos runs without certain of them and is gated to vetted organizations.' },
  { q: 'What is the API model ID for Fable 5.2?', o: ['claude-fable-5.2', 'fable-5-2-latest', 'claude-fable-5-2', 'claude-5-fable'], a: 2, e: 'The launch post gives claude-fable-5-2 on the Claude Platform.' },
  { q: 'What does Fable 5.2 cost per million output tokens in standard mode?', o: ['$8', '$16', '$40', '$80'], a: 2, e: '$8 in and $40 out. Fast mode doubles that to $16 and $80.' },
  { q: 'What does fast mode trade for speed?', o: ['Lower accuracy', 'Twice the price for up to 2.5x faster generation', 'Smaller context window', 'Nothing, it is free'], a: 1, e: 'Fast mode is $16 in / $80 out per million tokens for up to 2.5 times faster token generation.' },
  { q: 'Which model does Anthropic call its strongest "daily driver"?', o: ['Haiku 5.5', 'Sonnet 5.5', 'Opus 5.5', 'Fable 5.2'], a: 2, e: 'The post suggests starting with Opus 5.5, then moving up to Fable or Mythos, or down to Sonnet or Haiku.' },
  { q: 'In the advisor pattern, who consults Fable 5.2?', o: ['Only Opus', 'Haiku, Sonnet or Opus', 'Only Mythos', 'Nobody, Fable works alone'], a: 1, e: 'Haiku, Sonnet or Opus can call Fable for hard decisions. In the orchestrator pattern, Fable instead delegates to the smaller models.' },
  { q: 'A cyber query is blocked on Fable 5.2. Where does it fall back?', o: ['Haiku 5.5', 'Opus 4.8', 'Mythos 5.2', 'It just errors'], a: 1, e: 'Blocked cyber queries fall back to Opus 4.8. Blocked biology queries fall back to Opus 5.' },
  { q: 'What is the default effort level in Claude apps and Claude Code?', o: ['Low', 'Medium', 'High', 'Max'], a: 1, e: 'Medium is the default in Claude apps and Claude Code. Anthropic says Fable 5.2 at Medium can do challenging tasks with fewer tokens than Fable 5.1.' },
];

// ── Provider radar: what changed since the previous data refresh (2026-10-14) ──
export const RADAR_SINCE = '2026-10-14';
export const RADAR = [
  { provider: 'Anthropic', color: '#d4a27f', items: [
    { date: '2026-11-09', kind: 'Model', text: 'Claude Fable 5.2 and Mythos 5.2 released. Fable priced at $8/$40, fast mode at $16/$80; Mythos restricted to vetted organizations.', url: LAUNCH_URL },
    { date: '2026-10-27', kind: 'Service', text: 'GSA partnership expansion: government partners get 40% off Claude Enterprise, Claude for Government and the API.', url: 'https://www.anthropic.com/news/expanding-partnership-gsa' },
    { date: '2026-10-22', kind: 'Service', text: 'Agent Skills donated to the Agentic AI Foundation; the post says 70+ platforms have integrated them.', url: 'https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation' },
  ] },
  { provider: 'OpenAI', color: '#10a37f', items: [
    { date: '2026-11-05', kind: 'Model', text: 'GPT-6-Cyber released. gpt-5.5-cyber-preview deprecated, shutdown Feb 1, 2027.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-11-04', kind: 'Model', text: 'GPT-Image-2.6 Sunburst and Flare released, adding SVG and animated GIF generation.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-11-02', kind: 'Service', text: 'Outbound SIP calling for GPT-Live open to all organizations.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-30', kind: 'Model', text: 'GPT-6 Rosalind (life sciences, trusted access only). Agents API gains async compaction, time awareness and automatic review.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-28', kind: 'Service', text: 'ChatGPT Pro and Business subscribers can claim up to $500 per month in API credits.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-26', kind: 'Model', text: 'GPT-6.1 Terra released at $1 / $5 per million tokens (now in the model table).', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-23', kind: 'Service', text: 'Scheduled automations in the Agents API (public beta). Decisions API reached GA on Oct 22.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-20', kind: 'Service', text: '12-hour prompt caching; cache writes cost 2.5x base input price.', url: 'https://developers.openai.com/api/docs/changelog' },
    { date: '2026-10-14', kind: 'Retiring', text: 'GPT-4 series (4o, 4.1) notified for shutdown Jan 14, 2027.', url: 'https://developers.openai.com/api/docs/deprecations' },
    { date: '2026-12-11', kind: 'Retiring', text: 'Older gpt-5 and o3 snapshots shut down Dec 11, 2026 (notice given June 11, 2026).', url: 'https://developers.openai.com/api/docs/deprecations' },
    { date: '2026-11-30', kind: 'Retiring', text: 'Agent Builder and the Evals platform shut down Nov 30, 2026 (notice given June 3, 2026).', url: 'https://developers.openai.com/api/docs/deprecations' },
  ] },
  { provider: 'Google', color: '#4285f4', items: [
    { date: '2026-10', kind: 'Model', text: 'Gemini 4 Argon shows "latest update October 2026" (day not stated). Intro price $2 / $10 through Nov 30, then $4 / $20.', url: 'https://aistudio.google.com/docs/models/gemini-4-argon' },
    { date: 'undated', kind: 'Service', text: 'Gemini Omni 1.2 Flash (video generation and editing) is GA on the paid tier.', url: 'https://aistudio.google.com/docs/pricing' },
    { date: '2026-12-01', kind: 'Retiring', text: 'gemini-2.5-pro and gemini-2.5-flash auto-route to newer models on Dec 1. Several prices rise Jan 1, 2027.', url: 'https://aistudio.google.com/docs/models' },
  ] },
  { provider: 'Mistral AI', color: '#f97316', items: [
    { date: 'undated', kind: 'Model', text: 'Mistral Large 4 (Le Chonk) is now open weight: a 1-trillion-parameter multimodal model.', url: 'https://mistral.ai/news/mistral-large-4-oss/' },
    { date: 'undated', kind: 'Model', text: 'Voxtral 3: transcribe, realtime and text-to-speech models.', url: 'https://mistral.ai/news/voxtral-3/' },
    { date: '2026-10-15', kind: 'Model', text: 'Timestral: probabilistic time-series forecasting models.', url: 'https://mistral.ai/news/timestral/' },
    { date: 'undated', kind: 'Service', text: 'Mistral Studio product post: putting Large 4 to work.', url: 'https://mistral.ai/news/build-with-studio/' },
  ] },
  { provider: 'DeepSeek', color: '#4f46e5', items: [
    { date: '2026-10-17', kind: 'Model', text: 'DeepSeek-V4.1-Flash-1017 released with open weights. Search and Fetch APIs open to all users.', url: 'https://api-docs.deepseek.com/news/news261017' },
  ] },
  { provider: 'Moonshot AI', color: '#9aa3b2', items: [
    { date: 'undated', kind: 'Model', text: 'Kimi K3.1 Pro launched (1M context, $2 / $10). K3 is open-weight (2.8T parameters).', url: 'https://platform.kimi.ai/' },
  ] },
  { provider: 'Microsoft', color: '#00a4ef', items: [
    { date: '2026-10-28', kind: 'Service', text: 'Microsoft Copilot harness in Foundry Agent Service, public preview.', url: 'https://azure.microsoft.com/en-us/blog/' },
    { date: '2026-11-06', kind: 'Service', text: 'fal models now in Microsoft Foundry. Microsoft Ignite runs Nov 17-20, 2026.', url: 'https://azure.microsoft.com/en-us/blog/' },
  ] },
];
export const RADAR_UNVERIFIED = [
  'xAI: x.ai/news returned 403. Grok 4.7 is listed as the flagship ($2 / $6, 500K context) but no release date is published, so it is not in the model table yet.',
  'Meta: dev.meta.ai lists the Muse family (Spark 1.3, Wonder, Ember, Spark Open at 816B) without dates, prices or context windows, and Llama is no longer listed.',
  'Amazon: Nova 2 Lite and Nova 2 Sonic are named, but model IDs and prices were not readable on official pages.',
  'NVIDIA: Nemotron 3.5 Super VL is named but undated, with no IDs or prices.',
  'Cohere: Command A+ (command-a-plus-05-2026) is live; official pages list no prices.',
  'Alibaba Qwen: the official site returned no readable content.',
  'Google blog and OpenAI news pages could not be read (blank or 403), so announcements outside the API docs are not covered.',
];
