// ── AI Tools & Protocols ──
// Overview-level explanations of Agents, MCP, APIs, and related concepts

export const toolTopics = [
  {
    id: 'agents',
    title: 'AI Agents',
    icon: '🤖',
    color: '#7c3aed',
    tagline: 'AI that acts, not just responds',
    summary: 'An AI agent is an autonomous system that can plan, reason, use tools, and take multi-step actions to accomplish goals. Unlike a chatbot that answers one question at a time, an agent operates in a loop: observe the current state, think about the next step, take an action, evaluate the result, and repeat until the task is complete.',
    keyPoints: [
      'Agents go beyond Q&A — they take real actions like writing code, searching the web, and calling APIs',
      'They follow an "agentic loop": Observe → Think → Act → Evaluate → Repeat',
      'Agents use tools (APIs, file systems, databases) to interact with the outside world',
      'Multi-agent systems have specialized agents collaborating like a team',
    ],
    analogy: 'A chatbot is a reference librarian — ask a question, get an answer. An agent is an executive assistant — say "plan my trip to Tokyo" and they book flights, reserve hotels, check your calendar, and send you the itinerary.',
    examples: [
      { name: 'Claude Cowork', desc: 'Anthropic\'s "AI intern" capable of autonomous, background task execution across systems' },
      { name: 'Claude Tag', desc: 'Anthropic\'s persistent AI teammate in Slack — tag @Claude to delegate tasks, then it plans, works asynchronously, and proactively follows up' },
      { name: 'OpenClaw', desc: 'Open-source personal AI assistant framework with a CLI/TUI, self-hosted gateway, and multi-channel messaging (WhatsApp, Slack)' },
      { name: 'ChatGPT Agent Mode', desc: 'OpenAI\'s mode where the AI moves beyond chatting to actively taking autonomous action' },
      { name: 'Claude Code', desc: 'Anthropic\'s CLI agent that reads files, writes code, runs tests, and fixes errors autonomously' },
      { name: 'Devin', desc: 'An autonomous software engineering agent that can plan and execute entire coding tasks' },
    ],
    howItConnects: 'Agents are powered by LLMs (for reasoning), use MCP (to discover and call tools), and often leverage APIs (to interact with external services). They represent the shift from AI as a tool to AI as a collaborator.',
  },
  {
    id: 'mcp',
    title: 'Model Context Protocol',
    icon: '🔗',
    color: '#ef4444',
    tagline: 'USB-C for AI — one standard to connect everything',
    summary: 'MCP (Model Context Protocol) is an open standard created by Anthropic that defines how AI applications communicate with external tools and data sources. Instead of building a custom integration for every tool, MCP provides one universal protocol — any AI app that supports MCP can connect to any MCP server.',
    keyPoints: [
      'MCP standardizes AI-to-tool communication the way USB-C standardized device charging',
      'AI agents can auto-discover available tools by calling tools/list — no hardcoding needed',
      'Architecture: MCP Host (AI app) → MCP Client → MCP Server (exposes tools)',
      'Three primitives: Tools (actions), Resources (data/context), Prompts (templates)',
    ],
    analogy: 'Before USB-C, every device had a different charger. MCP does the same for AI: instead of writing custom code for every tool, one protocol connects any AI to any tool.',
    examples: [
      { name: 'Claude Desktop', desc: 'Connects to local MCP servers for file access, Git, databases, and more' },
      { name: 'GitHub MCP Server', desc: 'Exposes GitHub tools (issues, PRs, repos) so AI can interact with GitHub' },
      { name: 'Database Servers', desc: 'Let AI query databases by exposing SQL tools through the MCP protocol' },
      { name: 'Slack / Calendar', desc: 'MCP servers that let AI read messages, schedule events, and automate workflows' },
    ],
    howItConnects: 'MCP is the infrastructure that makes Agents practical at scale. Without it, every agent-tool connection requires custom code. With MCP, agents discover and use tools through a single standard protocol.',
  },
  {
    id: 'api',
    title: 'APIs',
    icon: '🔌',
    color: '#0ea5e9',
    tagline: 'The plumbing that connects all software',
    summary: 'An API (Application Programming Interface) is how one piece of software talks to another. When you use an app that shows the weather, checks your bank balance, or processes a payment, that app is calling an API behind the scenes. APIs define specific endpoints (URLs), request formats, and response structures that developers code against.',
    keyPoints: [
      'APIs are the foundation of modern software — they let apps communicate with services',
      'Common styles: REST (most popular), GraphQL (flexible queries), gRPC (high performance)',
      'Developers write code to call specific endpoints like GET /users or POST /payments',
      'APIs are deterministic and contract-driven: same input always produces the same output path',
    ],
    analogy: 'An API is like a restaurant menu. You (the app) look at the menu (documentation), order a specific dish (make a request to an endpoint), and the kitchen (the service) prepares exactly what you ordered (sends the response).',
    examples: [
      { name: 'Stripe API', desc: 'Process payments by calling endpoints like POST /v1/charges with amount and currency' },
      { name: 'OpenAI API', desc: 'Send prompts to GPT models and receive completions via POST /v1/chat/completions' },
      { name: 'Anthropic API', desc: 'Send messages to Claude models via POST /v1/messages with your API key' },
      { name: 'Google Maps API', desc: 'Get directions, geocode addresses, and embed maps in your application' },
    ],
    howItConnects: 'APIs are what agents and MCP servers call under the hood. When an agent "uses a tool," it is often making API calls. MCP standardizes how AI discovers and uses these APIs, while the APIs themselves remain the endpoints doing the actual work.',
  },
  {
    id: 'api-codes',
    title: 'API Keys & Codes',
    icon: '🔑',
    color: '#f59e0b',
    tagline: 'Your identity card for accessing AI services',
    summary: 'API keys (sometimes called API codes or tokens) are unique strings that identify and authenticate you when calling an API. Think of them as passwords for your application. Every major AI service — OpenAI, Anthropic, Google — requires an API key to use their models. Without one, the service does not know who is making the request or whether they are authorized.',
    keyPoints: [
      'An API key is a unique identifier (like sk-abc123...) that you include with every request',
      'Keys control access, track usage, and enforce rate limits and billing',
      'NEVER share your API key publicly — treat it like a password',
      'Most AI providers charge per-token or per-request, billed to the key owner',
    ],
    analogy: 'An API key is like a membership card at a gym. You swipe it to get in (authenticate), the gym tracks how many times you visit (usage tracking), and your membership level determines what equipment you can use (permissions and rate limits).',
    examples: [
      { name: 'OpenAI Key', desc: 'Starts with sk-... — used in the Authorization header to call GPT models' },
      { name: 'Anthropic Key', desc: 'Used with x-api-key header to access Claude models via the Messages API' },
      { name: 'Google AI Key', desc: 'Generated in Google Cloud Console — authenticates calls to Gemini and other Google AI services' },
      { name: 'Hugging Face Token', desc: 'Grants access to model downloads, Inference API, and Spaces deployment' },
    ],
    howItConnects: 'When an Agent calls an API (directly or through MCP), it needs an API key to authenticate. MCP servers often store API keys securely so the AI can use tools without exposing credentials. Understanding API keys is essential for building anything with AI services.',
  },
  {
    id: 'sdk',
    title: 'SDKs & Libraries',
    icon: '📦',
    color: '#22c55e',
    tagline: 'Pre-built code that makes APIs easy to use',
    summary: 'An SDK (Software Development Kit) is a collection of pre-written code that wraps an API, making it easier to use. Instead of manually constructing HTTP requests, setting headers, and parsing responses, you call simple functions. Most AI providers offer official SDKs in Python, JavaScript/TypeScript, and other languages.',
    keyPoints: [
      'SDKs wrap raw API calls into simple function calls in your preferred programming language',
      'They handle authentication, retries, error parsing, and response typing automatically',
      'Official SDKs for major AI providers: openai (Python/JS), @anthropic-ai/sdk, google-generativeai',
      'Using an SDK is almost always preferred over raw HTTP calls for production code',
    ],
    analogy: 'If an API is a car engine, an SDK is the steering wheel and pedals. The engine does the real work, but the controls make it possible for anyone to drive without understanding every mechanical detail.',
    examples: [
      { name: 'openai (Python)', desc: 'client.chat.completions.create() — call GPT models in one line of Python' },
      { name: '@anthropic-ai/sdk', desc: 'client.messages.create() — send messages to Claude with TypeScript or JavaScript' },
      { name: 'LangChain', desc: 'Framework that provides unified abstractions across multiple LLM providers' },
      { name: 'Vercel AI SDK', desc: 'React hooks and streaming helpers for building AI-powered web applications' },
    ],
    howItConnects: 'SDKs make APIs accessible. When building an Agent or MCP server, you use SDKs to call the underlying AI models and external services. They are the practical tools developers reach for first.',
  },
  {
    id: 'tool-use',
    title: 'Function / Tool Calling',
    icon: '🛠️',
    color: '#ec4899',
    tagline: 'How AI models reach beyond text generation',
    summary: 'Function calling (also called tool use) is the ability for an LLM to output structured tool calls instead of just text. When a model "calls a function," it generates a JSON object describing which function to invoke and with what arguments. The application then executes that function and feeds the result back to the model. This is the core mechanism that enables AI agents.',
    keyPoints: [
      'The model does not execute code — it outputs a structured request that your app executes',
      'You define available functions with names, descriptions, and parameter schemas',
      'The model decides when and which function to call based on the conversation context',
      'Results are fed back to the model so it can incorporate real data into its response',
    ],
    analogy: 'Imagine a manager who cannot leave their desk. They write detailed memos ("call the weather service for San Francisco") that an assistant executes. The assistant brings back the results, and the manager uses that information to make decisions. The model is the manager, your code is the assistant.',
    examples: [
      { name: 'Weather Lookup', desc: 'Model calls get_weather({location: "NYC"}) → your code fetches the data → model responds with current conditions' },
      { name: 'Database Query', desc: 'Model calls query_db({sql: "SELECT..."}) → your code runs the query → model summarizes the results' },
      { name: 'Web Search', desc: 'Model calls search({query: "latest news"}) → your code hits a search API → model synthesizes findings' },
      { name: 'Code Execution', desc: 'Model calls run_code({code: "print(2+2)"}) → your sandbox runs it → model sees the output' },
    ],
    howItConnects: 'Function calling is the mechanism that makes Agents and MCP possible. When an agent "uses a tool," it is performing function calling. MCP standardizes how tools are described and discovered, but function calling is the underlying capability in the LLM that makes it all work.',
  },
  {
    // Source: TypeSafe docs (docs.typesafe.ai), checked 2026-11-10.
    id: 'jev',
    title: 'Structured Decisions with Jev',
    icon: '🎯',
    color: '#0891b2',
    tagline: 'Typed answers your code can act on, not paragraphs to parse',
    summary: 'Jev is TypeSafe\'s "System One" model for decisions inside software. With a normal LLM you ask in words, get prose back, and write code to pull a decision out of it. With Jev you send your data (the state) plus typed questions, and get back values your code branches on directly: a chosen option, a score, a probability, or an image location, each with probabilities that say how sure it is. Every question is evaluated separately and in parallel against the same state, so adding questions barely adds latency and one question cannot bias another.',
    keyPoints: [
      'Four question types: Choice (pick one of up to 255 described options), Score (place it on an ordered scale; can land between levels, e.g. 1.43), Noul (probability a statement is true, 0 to 1), Box (where something is in an image, as fractions of width and height)',
      'Choice and Score return confidence from 0 (probability spread evenly) to 1 (all on one answer). It measures how settled the answer is, not a guarantee it is right',
      'Route on it: act automatically when sure, ask a person to confirm when unsure, and demand a higher bar for risky actions (about 0.9 before anything destructive)',
      'Ask one specific question per factor and combine the answers in your own code, instead of one vague "rate this" question',
      'Python: pip install typesafe-sdk; JS/TS: npm install @typesafe-ai/sdk; HTTP: POST https://api.typesafe.ai/v1/systemone with a bearer key from TYPESAFE_API_KEY',
    ],
    analogy: 'An LLM is a consultant who writes you a report; you still have to read it and decide. Jev is a panel of specialists who each answer one form question with a checkbox and how sure they are. Your code reads the checkboxes and acts, and anything marked "unsure" goes to a human.',
    questionTypes: [
      { type: 'Choice', ask: 'Which of these options fits?', returns: 'choice, probabilities, confidence' },
      { type: 'Score', ask: 'Where on this ordered scale?', returns: 'score, probabilities, confidence, legend' },
      { type: 'Noul', ask: 'Is this statement true?', returns: 'noul (probability of yes)' },
      { type: 'Box', ask: 'Where is it in this image?', returns: 'box (top, bottom, left, right), confidence' },
    ],
    code: `from typesafe_sdk import Choice, Noul, Score, TypeSafeClient

with TypeSafeClient() as client:  # reads TYPESAFE_API_KEY
    response = client.system_one(
        state="Charged twice this month and nobody has replied in 3 days.",
        questions={
            "team": Choice(
                instructions="Which team should own this ticket?",
                criteria={
                    "billing": "Charges, refunds, invoices",
                    "technical": "Bugs, outages, errors",
                    "account": "Login, access, profile changes",
                },
            ),
            "frustration": Score(
                instructions="How frustrated is the customer?",
                criteria=["Calm", "Annoyed", "Angry or threatening to leave"],
            ),
            "refund": Noul(instructions="Does the customer ask for money back?"),
        },
    )

team = response.answers["team"]
if team.probabilities["billing"] > 0.9:   # sure enough to act
    assign("billing")
else:
    send_to_triage()                        # unsure: a person decides`,
    examples: [
      { name: 'Support ticket routing', desc: 'A Choice picks the owning team, a Score rates frustration and a Noul spots refund requests, all in one call. Confident tickets are assigned automatically; unclear ones go to triage.' },
      { name: 'Moderation with a human in the loop', desc: 'One Noul per policy (harassment, personal data, spam). Remove above 0.9, approve below 0.1, and send the uncertain middle band to a moderator.' },
      { name: 'Cheap pre-filter', desc: 'Ask one Noul ("is this a real sales lead?") before an expensive step such as a frontier LLM, human review or database write, and run it only on the passes.' },
      { name: 'Composite scoring', desc: 'Score market size, feasibility and differentiation separately, then weight them in code (0.5, 0.3, 0.2). Weights change without re-prompting, and each factor can be audited.' },
      { name: 'Safe agent actions', desc: 'Before an agent runs a tool, ask which action the request maps to. Read-only actions run at a lower bar; destructive ones need about 0.9 or user confirmation.' },
      { name: '"None of the above" detection', desc: 'A Choice always returns its top option. Pair it with a Noul ("does any category fit?") and ignore the Choice when that is low.' },
      { name: 'Checking AI output', desc: 'Grade another model\'s draft with Scores for "uses only the source facts", "answers the question" and "right tone", and rewrite or review anything that scores low.' },
      { name: 'Document and screenshot inspection', desc: 'A Noul asks "is there a signature?", then a Box finds where it is. Coordinates are fractions, so they work at any resolution for cropping, redaction or highlighting.' },
      { name: 'Speculative fan-out', desc: 'Ask everything you might need (language, intent, urgency, personal data, escalation) in one request and use only what your code ends up needing. Questions run in parallel, so this is usually cheaper and faster than chaining calls.' },
    ],
    howItConnects: 'Jev complements generative models rather than replacing them: use Claude or GPT to write, summarise and converse, and Jev to decide, route, check and score around them. In agents it acts as a guard step before function calls, with thresholds you can measure. Confidence is not calibrated accuracy, so before automating anything important, run Jev on examples where you already know the right answer and set thresholds from those results.',
    docsUrl: 'https://docs.typesafe.ai/introduction',
    docsLabel: 'TypeSafe docs',
  },
];

export const connectionMap = [
  { from: 'agents', to: 'mcp', label: 'discover tools via' },
  { from: 'agents', to: 'api', label: 'call services through' },
  { from: 'mcp', to: 'api', label: 'wraps and standardizes' },
  { from: 'api-codes', to: 'api', label: 'authenticate' },
  { from: 'sdk', to: 'api', label: 'wraps for easy use' },
  { from: 'tool-use', to: 'agents', label: 'core capability of' },
  { from: 'tool-use', to: 'mcp', label: 'mechanism behind' },
  { from: 'jev', to: 'agents', label: 'guards the actions of' },
];

export const quickReference = {
  title: 'Quick Reference: How It All Fits Together',
  steps: [
    { num: 1, label: 'You ask an AI Agent to do something', icon: '💬' },
    { num: 2, label: 'The Agent reasons about what tools it needs (Function Calling)', icon: '🧠' },
    { num: 3, label: 'It discovers available tools via MCP (tools/list)', icon: '🔍' },
    { num: 4, label: 'It calls the right tool, which hits an API endpoint', icon: '🔌' },
    { num: 5, label: 'The API authenticates the request using an API Key', icon: '🔑' },
    { num: 6, label: 'The result flows back through the chain to the Agent', icon: '📦' },
    { num: 7, label: 'The Agent uses the result to continue or complete your task', icon: '✅' },
  ],
};
