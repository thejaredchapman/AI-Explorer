// ═══════════════════════════════════════
// Quick Start & How-To Guides Data
// Organized by Provider
// ═══════════════════════════════════════

export const providers = [
  { id: 'all', label: 'All Providers', icon: '📦', color: '#818cf8' },
  { id: 'anthropic', label: 'Anthropic', icon: '🟠', color: '#d97706', description: 'Claude models — excels at reasoning, coding, and long-context tasks.' },
  { id: 'openai', label: 'OpenAI', icon: '🟢', color: '#10a37f', description: 'GPT models — the most widely adopted LLM platform with a rich ecosystem.' },
  { id: 'google', label: 'Google Gemini', icon: '🔵', color: '#4285f4', description: 'Gemini models — strong multimodal capabilities with deep Google integration.' },
  { id: 'llama', label: 'Llama (Meta)', icon: '🦙', color: '#7c3aed', description: 'Open-source models you can run locally — full control, no API costs.' },
  { id: 'langchain', label: 'LangChain', icon: '🦜', color: '#1c3c3c', description: 'LLM orchestration framework — chains, agents, RAG, and tool integration across any model.' },
  { id: 'langgraph', label: 'LangGraph', icon: '🕸️', color: '#0f766e', description: 'Stateful, multi-actor agent framework — graph-based workflows, cycles, persistence, and human-in-the-loop.' },
  { id: 'crewai', label: 'CrewAI', icon: '👷', color: '#e63946', description: 'Multi-agent orchestration — define roles, goals, and tasks for crews of AI agents that collaborate autonomously.' },
];

export const categories = [
  { id: 'beginner', label: 'Beginner', color: '#22c55e' },
  { id: 'intermediate', label: 'Intermediate', color: '#f59e0b' },
  { id: 'advanced', label: 'Advanced', color: '#ef4444' },
];

export const guidesData = {
  quickStart: {
    title: 'Quick Start',
    description: 'Get up and running in minutes. Clone, install, and run your first AI-powered script.',
    steps: [
      {
        label: 'Clone & navigate',
        code: 'git clone <your-repo-url>\ncd mcp_api/guides',
      },
      {
        label: 'Install dependencies',
        code: 'pip install -r requirements.txt',
      },
      {
        label: 'Set up API keys',
        code: 'cp .env.example .env\n# Edit .env and add your API keys:\n# ANTHROPIC_API_KEY=sk-ant-...\n# OPENAI_API_KEY=sk-...\n# GOOGLE_API_KEY=AIza...',
      },
      {
        label: 'Run your first guide',
        code: 'python anthropic_01_chatbot.py',
      },
    ],
  },

  guides: [
    // ═══════════════════════════════════════
    // ANTHROPIC (Claude) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'anthropic-chatbot',
      number: 'A1',
      title: 'Build a Chatbot with Claude',
      file: 'anthropic_01_chatbot.py',
      category: 'beginner',
      provider: 'anthropic',
      model: 'Claude Sonnet 5',
      icon: '💬',
      color: '#d97706',
      description: 'Create a conversational chatbot with memory using the Anthropic SDK. Learn how Claude handles multi-turn conversations with system prompts and message history.',
      concepts: ['Anthropic SDK setup', 'System prompts', 'Conversation memory', 'Message formatting'],
      codePreview: `import anthropic

client = anthropic.Anthropic()
messages = []

while True:
    user_input = input("You: ")
    messages.append({"role": "user", "content": user_input})

    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=1024,
        system="You are a helpful coding assistant.",
        messages=messages,
    )

    assistant_msg = response.content[0].text
    messages.append({"role": "assistant", "content": assistant_msg})
    print(f"Claude: {assistant_msg}")`,
      runCommand: 'python anthropic_01_chatbot.py',
    },
    {
      id: 'anthropic-streaming',
      number: 'A2',
      title: 'Streaming Responses with Claude',
      file: 'anthropic_02_streaming.py',
      category: 'beginner',
      provider: 'anthropic',
      model: 'Claude Sonnet 5',
      icon: '⚡',
      color: '#d97706',
      description: 'Stream Claude responses token-by-token for real-time output. Reduces perceived latency and provides a ChatGPT-like typing experience.',
      concepts: ['Token streaming', 'Event handling', 'Perceived latency', 'Stream processing'],
      codePreview: `import anthropic

client = anthropic.Anthropic()

# Stream response token by token
with client.messages.stream(
    model="claude-sonnet-5",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Explain quantum computing"}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)`,
      runCommand: 'python anthropic_02_streaming.py',
    },
    {
      id: 'anthropic-tools',
      number: 'A3',
      title: 'Tool Use & Function Calling with Claude',
      file: 'anthropic_03_tools.py',
      category: 'intermediate',
      provider: 'anthropic',
      model: 'Claude Sonnet 5',
      icon: '🔧',
      color: '#d97706',
      description: 'Give Claude the ability to call functions — web search, calculator, database lookups. Implements the full tool-use loop: Claude decides which tool to call, you execute it, and return results.',
      concepts: ['Tool definitions', 'Tool use loop', 'JSON schema', 'Function execution'],
      codePreview: `tools = [{
    "name": "get_weather",
    "description": "Get current weather for a city",
    "input_schema": {
        "type": "object",
        "properties": {
            "city": {"type": "string", "description": "City name"}
        },
        "required": ["city"]
    }
}]

response = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=1024,
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}],
)

# Check if Claude wants to use a tool
for block in response.content:
    if block.type == "tool_use":
        result = execute_tool(block.name, block.input)
        # Send result back to Claude for final answer`,
      runCommand: 'python anthropic_03_tools.py',
    },
    {
      id: 'anthropic-rag',
      number: 'A4',
      title: 'RAG: Document Q&A with Claude',
      file: 'anthropic_04_rag.py',
      category: 'intermediate',
      provider: 'anthropic',
      model: 'Claude Sonnet 5',
      icon: '📚',
      color: '#d97706',
      description: 'Build a Retrieval-Augmented Generation system with Claude. Split documents, embed them, store in a vector database, and retrieve relevant context for accurate answers.',
      concepts: ['Document chunking', 'Embeddings', 'Vector stores', 'Context injection', 'ChromaDB'],
      codePreview: `from langchain_anthropic import ChatAnthropic
from langchain_community.vectorstores import Chroma

# Split documents into chunks
chunks = text_splitter.split_documents(documents)

# Embed and store in vector database
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# RAG chain: retrieve context -> augment prompt -> generate
llm = ChatAnthropic(model="claude-sonnet-5")
rag_chain = (
    {"context": retriever | format_docs,
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)`,
      runCommand: 'python anthropic_04_rag.py',
    },
    {
      id: 'anthropic-agents',
      number: 'A5',
      title: 'Building AI Agents with Claude',
      file: 'anthropic_05_agents.py',
      category: 'advanced',
      provider: 'anthropic',
      model: 'Claude Sonnet 5',
      icon: '🤖',
      color: '#d97706',
      description: 'Build an autonomous agent that plans, uses tools, and iterates to complete tasks. Uses the Anthropic Agent SDK for multi-step reasoning with web search and code execution.',
      concepts: ['Agent loops', 'Planning', 'Multi-step reasoning', 'Anthropic Agent SDK'],
      codePreview: `import anthropic

client = anthropic.Anthropic()
tools = [search_tool, calculator_tool, code_runner_tool]

# Agent loop: Claude decides actions until task is complete
messages = [{"role": "user", "content": "Research AI trends and summarize"}]

while True:
    response = client.messages.create(
        model="claude-sonnet-5",
        max_tokens=4096,
        tools=tools,
        messages=messages,
    )
    if response.stop_reason == "end_turn":
        break  # Task complete
    # Execute tool calls and continue the loop
    messages = handle_tool_calls(response, messages)`,
      runCommand: 'python anthropic_05_agents.py',
    },
    {
      id: 'anthropic-mcp',
      number: 'A6',
      title: 'Build an MCP Server for Claude',
      file: 'anthropic_06_mcp.py',
      category: 'advanced',
      provider: 'anthropic',
      model: 'Any Claude model',
      icon: '🔌',
      color: '#d97706',
      description: 'Create a Model Context Protocol server that exposes custom tools any MCP-compatible AI client can discover and use. The open standard for AI-tool interoperability.',
      concepts: ['MCP protocol', 'Tool registration', 'Server setup', 'Resource exposure'],
      codePreview: `from mcp.server import Server
from mcp.types import Tool

server = Server("my-mcp-server")

@server.tool()
async def search_database(query: str) -> str:
    """Search the knowledge base for information."""
    results = db.search(query)
    return format_results(results)

@server.tool()
async def create_ticket(title: str, body: str) -> str:
    """Create a support ticket."""
    ticket = tickets.create(title=title, body=body)
    return f"Created ticket #{ticket.id}"

# Any MCP client (Claude Desktop, Claude Code) can now
# discover and use these tools automatically
server.run()`,
      runCommand: 'python anthropic_06_mcp.py',
    },

    // ═══════════════════════════════════════
    // OPENAI (GPT) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'openai-chatbot',
      number: 'O1',
      title: 'Build a Chatbot with GPT',
      file: 'openai_01_chatbot.py',
      category: 'beginner',
      provider: 'openai',
      model: 'GPT-5.6',
      icon: '💬',
      color: '#10a37f',
      description: 'Create a conversational chatbot using the OpenAI SDK. Learn the Chat Completions API, message roles, and how to maintain conversation history.',
      concepts: ['OpenAI SDK setup', 'Chat Completions API', 'Message roles', 'Conversation history'],
      codePreview: `from openai import OpenAI

client = OpenAI()
messages = [{"role": "system", "content": "You are a helpful assistant."}]

while True:
    user_input = input("You: ")
    messages.append({"role": "user", "content": user_input})

    response = client.chat.completions.create(
        model="gpt-5.6",
        messages=messages,
    )

    reply = response.choices[0].message.content
    messages.append({"role": "assistant", "content": reply})
    print(f"GPT: {reply}")`,
      runCommand: 'python openai_01_chatbot.py',
    },
    {
      id: 'openai-functions',
      number: 'O2',
      title: 'Function Calling with GPT',
      file: 'openai_02_functions.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-5.6',
      icon: '🔧',
      color: '#10a37f',
      description: 'Give GPT the ability to call your functions. Define tool schemas, let the model decide when to call them, execute locally, and return results for the final answer.',
      concepts: ['Function definitions', 'Tool choice', 'Parallel tool calls', 'JSON mode'],
      codePreview: `tools = [{
    "type": "function",
    "function": {
        "name": "get_stock_price",
        "description": "Get the current stock price",
        "parameters": {
            "type": "object",
            "properties": {
                "symbol": {"type": "string", "description": "Stock ticker"}
            },
            "required": ["symbol"]
        }
    }
}]

response = client.chat.completions.create(
    model="gpt-5.6",
    messages=messages,
    tools=tools,
    tool_choice="auto",  # GPT decides when to call tools
)

# Handle tool calls in the response
if response.choices[0].message.tool_calls:
    for call in response.choices[0].message.tool_calls:
        result = execute_function(call.function.name, call.function.arguments)`,
      runCommand: 'python openai_02_functions.py',
    },
    {
      id: 'openai-rag',
      number: 'O3',
      title: 'RAG with OpenAI Embeddings',
      file: 'openai_03_rag.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-5.6 + text-embedding-3-small',
      icon: '📚',
      color: '#10a37f',
      description: 'Build a document Q&A system using OpenAI embeddings and GPT-5.6. Uses text-embedding-3-small for fast, affordable embeddings with strong semantic search quality.',
      concepts: ['OpenAI embeddings', 'text-embedding-3-small', 'Vector search', 'Context window management'],
      codePreview: `from openai import OpenAI

client = OpenAI()

# Create embeddings for your documents
response = client.embeddings.create(
    model="text-embedding-3-small",
    input=["Document chunk 1", "Document chunk 2"],
)
embeddings = [item.embedding for item in response.data]

# Store in vector DB, retrieve relevant chunks
relevant_chunks = vector_search(query_embedding, stored_embeddings)

# Generate answer with retrieved context
answer = client.chat.completions.create(
    model="gpt-5.6",
    messages=[
        {"role": "system", "content": f"Context: {relevant_chunks}"},
        {"role": "user", "content": user_question},
    ],
)`,
      runCommand: 'python openai_03_rag.py',
    },
    {
      id: 'openai-assistants',
      number: 'O4',
      title: 'OpenAI Assistants API',
      file: 'openai_04_assistants.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-5.6',
      icon: '🧑‍💼',
      color: '#10a37f',
      description: 'Use the Assistants API for stateful, multi-turn conversations with built-in tools. OpenAI manages the thread history, file retrieval, and code execution for you.',
      concepts: ['Assistants API', 'Threads & Runs', 'File search', 'Code interpreter'],
      codePreview: `from openai import OpenAI

client = OpenAI()

# Create an assistant with tools
assistant = client.beta.assistants.create(
    name="Data Analyst",
    instructions="You analyze data and create visualizations.",
    model="gpt-5.6",
    tools=[
        {"type": "code_interpreter"},
        {"type": "file_search"},
    ],
)

# Create a thread and send a message
thread = client.beta.threads.create()
client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content="Analyze the sales data and find top trends",
)

# Run the assistant — it handles tool calls automatically
run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=assistant.id,
)`,
      runCommand: 'python openai_04_assistants.py',
    },
    {
      id: 'openai-structured',
      number: 'O5',
      title: 'Structured Output with GPT',
      file: 'openai_05_structured.py',
      category: 'intermediate',
      provider: 'openai',
      model: 'GPT-5.6',
      icon: '📋',
      color: '#10a37f',
      description: 'Extract structured JSON from natural language using GPT\'s native structured output mode. Guarantees valid JSON matching your schema every time.',
      concepts: ['Structured outputs', 'JSON mode', 'Pydantic integration', 'Schema enforcement'],
      codePreview: `from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class MovieReview(BaseModel):
    title: str
    rating: float
    summary: str
    pros: list[str]
    cons: list[str]

response = client.beta.chat.completions.parse(
    model="gpt-5.6",
    messages=[
        {"role": "user", "content": "Review the movie Inception"},
    ],
    response_format=MovieReview,
)

review = response.choices[0].message.parsed
print(f"{review.title}: {review.rating}/10")`,
      runCommand: 'python openai_05_structured.py',
    },
    {
      id: 'openai-vision',
      number: 'O6',
      title: 'Vision & Image Analysis with GPT-5.6',
      file: 'openai_06_vision.py',
      category: 'advanced',
      provider: 'openai',
      model: 'GPT-5.6',
      icon: '👁️',
      color: '#10a37f',
      description: 'Analyze images, extract text from photos, compare visuals, and answer questions about what GPT-5.6 sees. Supports URLs and base64-encoded images.',
      concepts: ['Vision API', 'Image encoding', 'Visual Q&A', 'Multi-image comparison'],
      codePreview: `import base64
from openai import OpenAI

client = OpenAI()

# Encode image
with open("photo.jpg", "rb") as f:
    image_b64 = base64.b64encode(f.read()).decode()

response = client.chat.completions.create(
    model="gpt-5.6",
    messages=[{
        "role": "user",
        "content": [
            {"type": "text", "text": "What's in this image?"},
            {"type": "image_url", "image_url": {
                "url": f"data:image/jpeg;base64,{image_b64}"
            }},
        ],
    }],
)
print(response.choices[0].message.content)`,
      runCommand: 'python openai_06_vision.py',
    },

    // ═══════════════════════════════════════
    // GOOGLE (Gemini) GUIDES
    // ═══════════════════════════════════════
    {
      id: 'gemini-chatbot',
      number: 'G1',
      title: 'Build a Chatbot with Gemini',
      file: 'gemini_01_chatbot.py',
      category: 'beginner',
      provider: 'google',
      model: 'Gemini 3.6 Flash',
      icon: '💬',
      color: '#4285f4',
      description: 'Create a conversational chatbot using the Google GenAI SDK. Gemini\'s chat interface manages conversation history automatically with a simple API.',
      concepts: ['Google GenAI SDK', 'Chat sessions', 'Multi-turn conversations', 'Safety settings'],
      codePreview: `import google.generativeai as genai

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-3.6-flash")

# Start a chat session (history is managed automatically)
chat = model.start_chat(history=[])

while True:
    user_input = input("You: ")
    response = chat.send_message(user_input)
    print(f"Gemini: {response.text}")

    # Access full conversation history
    # chat.history contains all messages`,
      runCommand: 'python gemini_01_chatbot.py',
    },
    {
      id: 'gemini-multimodal',
      number: 'G2',
      title: 'Multimodal Input with Gemini',
      file: 'gemini_02_multimodal.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 3.6 Flash',
      icon: '🖼️',
      color: '#4285f4',
      description: 'Send images, PDFs, audio, and video to Gemini for analysis. Gemini natively handles multiple modalities in a single request — no separate vision API needed.',
      concepts: ['Multimodal inputs', 'Image analysis', 'PDF processing', 'Audio transcription'],
      codePreview: `import google.generativeai as genai
from pathlib import Path

model = genai.GenerativeModel("gemini-3.6-flash")

# Analyze an image
image = genai.upload_file("photo.jpg")
response = model.generate_content([
    "Describe what you see in detail",
    image,
])
print(response.text)

# Process a PDF document
pdf = genai.upload_file("report.pdf")
response = model.generate_content([
    "Summarize the key findings in this report",
    pdf,
])`,
      runCommand: 'python gemini_02_multimodal.py',
    },
    {
      id: 'gemini-imagegen',
      number: 'G3',
      title: 'Image Generation with Gemini',
      file: 'gemini_03_imagegen.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 3.6 Flash / Imagen',
      icon: '🎨',
      color: '#4285f4',
      description: 'Generate images from text descriptions using Gemini and Imagen. Includes prompt engineering tips for photorealistic, illustration, and artistic styles.',
      concepts: ['Text-to-image', 'Imagen model', 'Prompt engineering for images', 'Style control'],
      codePreview: `import google.generativeai as genai
from pathlib import Path

model = genai.GenerativeModel("gemini-3.6-flash")

response = model.generate_content(
    "Generate an image: A futuristic cityscape at sunset "
    "with flying vehicles, cyberpunk style",
    generation_config=genai.GenerationConfig(
        response_mime_type="image/png",
    ),
)

# Save generated image
for part in response.candidates[0].content.parts:
    if hasattr(part, "inline_data"):
        Path("cityscape.png").write_bytes(part.inline_data.data)
        print("Image saved to cityscape.png")`,
      runCommand: 'python gemini_03_imagegen.py',
    },
    {
      id: 'gemini-functions',
      number: 'G4',
      title: 'Function Calling with Gemini',
      file: 'gemini_04_functions.py',
      category: 'intermediate',
      provider: 'google',
      model: 'Gemini 3.6 Flash',
      icon: '🔧',
      color: '#4285f4',
      description: 'Give Gemini the ability to call your functions. Define callable tools, let Gemini decide when to use them, and handle the execution loop.',
      concepts: ['Function declarations', 'Automatic function calling', 'Tool config', 'Grounding'],
      codePreview: `import google.generativeai as genai

def get_weather(city: str) -> dict:
    """Get weather for a city."""
    return {"temp": 72, "condition": "sunny", "city": city}

model = genai.GenerativeModel(
    "gemini-3.6-flash",
    tools=[get_weather],  # Pass Python functions directly
)

chat = model.start_chat(
    enable_automatic_function_calling=True,
)

# Gemini calls get_weather automatically when needed
response = chat.send_message("What's the weather in San Francisco?")
print(response.text)  # "It's 72F and sunny in San Francisco"`,
      runCommand: 'python gemini_04_functions.py',
    },
    {
      id: 'gemini-embeddings',
      number: 'G5',
      title: 'Embeddings & Search with Gemini',
      file: 'gemini_05_embeddings.py',
      category: 'intermediate',
      provider: 'google',
      model: 'text-embedding-004',
      icon: '📐',
      color: '#4285f4',
      description: 'Create text embeddings with Google\'s embedding model for semantic search, clustering, and classification. Build a searchable knowledge base with cosine similarity.',
      concepts: ['Google embeddings API', 'Semantic search', 'Cosine similarity', 'Document retrieval'],
      codePreview: `import google.generativeai as genai
import numpy as np

# Create embeddings
result = genai.embed_content(
    model="models/text-embedding-004",
    content=["Machine learning is powerful",
             "Deep learning uses neural networks"],
    task_type="retrieval_document",
)

# Search with query embedding
query_emb = genai.embed_content(
    model="models/text-embedding-004",
    content="How do neural networks work?",
    task_type="retrieval_query",
)

# Compute cosine similarity to find relevant documents
similarities = np.dot(result["embedding"], query_emb["embedding"])`,
      runCommand: 'python gemini_05_embeddings.py',
    },
    {
      id: 'gemini-grounding',
      number: 'G6',
      title: 'Grounded Search with Gemini',
      file: 'gemini_06_grounding.py',
      category: 'advanced',
      provider: 'google',
      model: 'Gemini 3.6 Flash',
      icon: '🔍',
      color: '#4285f4',
      description: 'Use Gemini with Google Search grounding for up-to-date, factual answers. Gemini automatically searches the web and cites sources in its responses.',
      concepts: ['Google Search grounding', 'Source citations', 'Factual accuracy', 'Real-time info'],
      codePreview: `import google.generativeai as genai

model = genai.GenerativeModel("gemini-3.6-flash")

# Enable Google Search grounding
response = model.generate_content(
    "What are the latest developments in AI this week?",
    tools="google_search_retrieval",
)

print(response.text)

# Access grounding metadata and sources
for chunk in response.candidates[0].grounding_metadata.chunks:
    print(f"Source: {chunk.web.uri}")
    print(f"Title: {chunk.web.title}")`,
      runCommand: 'python gemini_06_grounding.py',
    },

    // ═══════════════════════════════════════
    // LLAMA (Meta) GUIDES — Run Locally
    // ═══════════════════════════════════════
    {
      id: 'llama-setup',
      number: 'L1',
      title: 'Run Llama Locally with Ollama',
      file: 'llama_01_setup.py',
      category: 'beginner',
      provider: 'llama',
      model: 'Llama 4 Scout',
      icon: '🦙',
      color: '#7c3aed',
      description: 'Set up and run Meta\'s Llama models on your own machine using Ollama. No API keys, no cloud costs — full privacy and control. Works on Mac, Linux, and Windows.',
      concepts: ['Ollama setup', 'Local model running', 'Model pulling', 'API compatibility'],
      codePreview: `# First, install Ollama: https://ollama.com
# Then pull a model:
# ollama pull llama4:scout

import requests

# Ollama exposes an OpenAI-compatible API locally
response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama4:scout",
        "messages": [
            {"role": "user", "content": "Explain transformers"}
        ],
        "stream": False,
    },
)

print(response.json()["message"]["content"])`,
      runCommand: 'ollama pull llama4:scout && python llama_01_setup.py',
    },
    {
      id: 'llama-openai-compat',
      number: 'L2',
      title: 'Use Llama with OpenAI SDK',
      file: 'llama_02_openai_compat.py',
      category: 'beginner',
      provider: 'llama',
      model: 'Llama 4 Scout',
      icon: '🔄',
      color: '#7c3aed',
      description: 'Use the OpenAI Python SDK to talk to local Llama models via Ollama. Switch between cloud and local models by changing one line — same code, zero cloud costs.',
      concepts: ['OpenAI compatibility', 'Base URL override', 'Provider switching', 'Cost elimination'],
      codePreview: `from openai import OpenAI

# Point OpenAI SDK at local Ollama server
client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama",  # Required but unused
)

response = client.chat.completions.create(
    model="llama4:scout",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a Python function to sort a list"},
    ],
)

print(response.choices[0].message.content)
# Same code works with OpenAI by changing base_url and api_key!`,
      runCommand: 'python llama_02_openai_compat.py',
    },
    {
      id: 'llama-rag',
      number: 'L3',
      title: 'Local RAG with Llama',
      file: 'llama_03_rag.py',
      category: 'intermediate',
      provider: 'llama',
      model: 'Llama 4 Scout + nomic-embed-text',
      icon: '📚',
      color: '#7c3aed',
      description: 'Build a fully local RAG system — no data leaves your machine. Uses Llama for generation and nomic-embed-text for embeddings, both running via Ollama.',
      concepts: ['Local embeddings', 'Private RAG', 'Ollama embeddings', 'LangChain + Ollama'],
      codePreview: `from langchain_ollama import ChatOllama, OllamaEmbeddings
from langchain_community.vectorstores import Chroma

# All local — no API calls, no data leaves your machine
llm = ChatOllama(model="llama4:scout")
embeddings = OllamaEmbeddings(model="nomic-embed-text")

# Embed and store documents locally
vectorstore = Chroma.from_documents(chunks, embeddings)
retriever = vectorstore.as_retriever(search_kwargs={"k": 3})

# RAG chain — 100% private
rag_chain = (
    {"context": retriever | format_docs,
     "question": RunnablePassthrough()}
    | rag_prompt | llm | StrOutputParser()
)
answer = rag_chain.invoke("What does the policy say about PTO?")`,
      runCommand: 'python llama_03_rag.py',
    },
    {
      id: 'llama-finetuning',
      number: 'L4',
      title: 'Fine-Tune Llama on Your Data',
      file: 'llama_04_finetune.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Llama 3.2 8B',
      icon: '🎯',
      color: '#7c3aed',
      description: 'Fine-tune Llama on your own dataset using QLoRA for memory-efficient training. Customize the model\'s behavior, tone, and domain knowledge on a single GPU.',
      concepts: ['QLoRA fine-tuning', 'Training data format', 'Hugging Face PEFT', 'Model merging'],
      codePreview: `from transformers import AutoModelForCausalLM, TrainingArguments
from peft import LoraConfig, get_peft_model
from trl import SFTTrainer

# Load base model with 4-bit quantization
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.2-8B-Instruct",
    load_in_4bit=True,
)

# Configure LoRA adapters (only trains ~1% of parameters)
lora_config = LoraConfig(r=16, lora_alpha=32, target_modules=["q_proj", "v_proj"])
model = get_peft_model(model, lora_config)

# Train on your dataset
trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=TrainingArguments(output_dir="./llama-finetuned", num_train_epochs=3),
)
trainer.train()`,
      runCommand: 'python llama_04_finetune.py',
    },
    {
      id: 'llama-agents',
      number: 'L5',
      title: 'Local AI Agents with Llama',
      file: 'llama_05_agents.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Llama 4 Scout',
      icon: '🤖',
      color: '#7c3aed',
      description: 'Build autonomous agents that run entirely on your hardware. Uses Llama\'s tool-calling capabilities through Ollama for private, cost-free agentic workflows.',
      concepts: ['Local agents', 'Ollama tool calling', 'LangChain agents', 'Private automation'],
      codePreview: `from langchain_ollama import ChatOllama
from langchain.agents import create_tool_calling_agent, AgentExecutor

# Local LLM with tool-calling support
llm = ChatOllama(model="llama4:scout")

# Define tools the agent can use
tools = [search_files_tool, run_code_tool, write_file_tool]

# Create local agent
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# Agent runs entirely on your machine
result = executor.invoke({
    "input": "Find all Python files with TODO comments and list them"
})`,
      runCommand: 'python llama_05_agents.py',
    },
    {
      id: 'llama-quantize',
      number: 'L6',
      title: 'Quantize & Optimize Models',
      file: 'llama_06_quantize.py',
      category: 'advanced',
      provider: 'llama',
      model: 'Any Llama model',
      icon: '⚡',
      color: '#7c3aed',
      description: 'Shrink model sizes by 50-75% with quantization while maintaining quality. Learn GGUF conversion, different quantization levels, and how to run large models on consumer hardware.',
      concepts: ['GGUF format', 'Quantization levels', 'llama.cpp', 'Memory optimization'],
      codePreview: `# Install llama-cpp-python for local inference
# pip install llama-cpp-python

from llama_cpp import Llama

# Load a quantized GGUF model — runs on CPU or GPU
llm = Llama(
    model_path="./models/llama-3.3-70b-Q4_K_M.gguf",
    n_ctx=4096,       # Context window
    n_gpu_layers=35,   # Offload layers to GPU
    verbose=False,
)

# Generate text with the quantized model
output = llm.create_chat_completion(
    messages=[{"role": "user", "content": "Explain quantum computing"}],
    max_tokens=512,
)
print(output["choices"][0]["message"]["content"])

# Q4_K_M: 70B model fits in ~40GB RAM (was 140GB at fp16)`,
      runCommand: 'python llama_06_quantize.py',
    },
    // ═══════════════════════════════════════
    // LANGCHAIN GUIDES
    // ═══════════════════════════════════════
    {
      id: 'langchain-chains',
      number: 'LC1',
      title: 'Build Your First Chain with LangChain',
      file: 'langchain_01_chains.py',
      category: 'beginner',
      provider: 'langchain',
      model: 'Any LLM',
      icon: '🔗',
      color: '#1c3c3c',
      description: 'Learn the core abstraction of LangChain — chains. Compose prompt templates, LLMs, and output parsers into reusable pipelines using the LangChain Expression Language (LCEL).',
      concepts: ['LCEL pipes', 'PromptTemplate', 'Output parsers', 'Runnable chains'],
      codePreview: `from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

# Build a chain with LCEL (LangChain Expression Language)
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant that explains {topic} simply."),
    ("human", "{question}"),
])

llm = ChatOpenAI(model="gpt-4.1")
chain = prompt | llm | StrOutputParser()

# Run the chain
answer = chain.invoke({
    "topic": "machine learning",
    "question": "What is gradient descent?"
})
print(answer)`,
      runCommand: 'python langchain_01_chains.py',
    },
    {
      id: 'langchain-rag',
      number: 'LC2',
      title: 'RAG Pipeline with LangChain',
      file: 'langchain_02_rag.py',
      category: 'intermediate',
      provider: 'langchain',
      model: 'Any LLM + Embeddings',
      icon: '📚',
      color: '#1c3c3c',
      description: 'Build a complete Retrieval-Augmented Generation pipeline. Load documents, split into chunks, embed into a vector store, and retrieve context for grounded answers.',
      concepts: ['Document loaders', 'Text splitters', 'Vector stores', 'Retriever chains'],
      codePreview: `from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough

# Load and split documents
docs = PyPDFLoader("handbook.pdf").load()
chunks = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200
).split_documents(docs)

# Embed and store
vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})

# RAG chain
prompt = ChatPromptTemplate.from_template(
    "Answer based on context:\\n{context}\\n\\nQuestion: {question}"
)
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt | ChatOpenAI(model="gpt-4.1") | StrOutputParser()
)
print(rag_chain.invoke("What is the PTO policy?"))`,
      runCommand: 'python langchain_02_rag.py',
    },
    {
      id: 'langchain-agents',
      number: 'LC3',
      title: 'Tool-Calling Agents with LangChain',
      file: 'langchain_03_agents.py',
      category: 'intermediate',
      provider: 'langchain',
      model: 'Any tool-calling LLM',
      icon: '🤖',
      color: '#1c3c3c',
      description: 'Create an agent that autonomously decides which tools to call. Uses LangChain\'s agent framework with custom tools, built-in search, and the agent executor loop.',
      concepts: ['@tool decorator', 'create_tool_calling_agent', 'AgentExecutor', 'Tool schemas'],
      codePreview: `from langchain_openai import ChatOpenAI
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.tools import tool

@tool
def search_web(query: str) -> str:
    """Search the web for current information."""
    return f"Results for: {query}..."

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

llm = ChatOpenAI(model="gpt-4.1")
prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful research assistant."),
    ("human", "{input}"),
    ("placeholder", "{agent_scratchpad}"),
])

agent = create_tool_calling_agent(llm, [search_web, calculator], prompt)
executor = AgentExecutor(agent=agent, tools=[search_web, calculator])
result = executor.invoke({"input": "What is 15% of the US population?"})
print(result["output"])`,
      runCommand: 'python langchain_03_agents.py',
    },
    {
      id: 'langchain-structured',
      number: 'LC4',
      title: 'Structured Output with LangChain',
      file: 'langchain_04_structured.py',
      category: 'intermediate',
      provider: 'langchain',
      model: 'Any LLM',
      icon: '📋',
      color: '#1c3c3c',
      description: 'Extract structured data from natural language using Pydantic models. Works with any LLM — LangChain handles schema conversion and validation automatically.',
      concepts: ['with_structured_output', 'Pydantic models', 'Schema enforcement', 'Provider-agnostic'],
      codePreview: `from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

class JobPosting(BaseModel):
    title: str = Field(description="Job title")
    company: str = Field(description="Company name")
    salary_min: int = Field(description="Minimum salary in USD")
    salary_max: int = Field(description="Maximum salary in USD")
    skills: list[str] = Field(description="Required skills")
    remote: bool = Field(description="Whether remote work is available")

llm = ChatOpenAI(model="gpt-4.1")
structured_llm = llm.with_structured_output(JobPosting)

posting = structured_llm.invoke(
    "Senior Python dev at Acme Corp, 150-200k, "
    "needs Python, AWS, Docker. Fully remote."
)
print(f"{posting.title} at {posting.company}")
print(f"Salary: \${posting.salary_min:,}-\${posting.salary_max:,}")
print(f"Skills: {', '.join(posting.skills)}")
print(f"Remote: {posting.remote}")`,
      runCommand: 'python langchain_04_structured.py',
    },
    {
      id: 'langchain-memory',
      number: 'LC5',
      title: 'Conversation Memory & History',
      file: 'langchain_05_memory.py',
      category: 'intermediate',
      provider: 'langchain',
      model: 'Any LLM',
      icon: '🧠',
      color: '#1c3c3c',
      description: 'Add persistent conversation memory to your chains. Manage chat history with different strategies — full history, summary memory, and token-window trimming.',
      concepts: ['ChatMessageHistory', 'RunnableWithMessageHistory', 'Summary memory', 'Token trimming'],
      codePreview: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.chat_history import InMemoryChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

store = {}

def get_session_history(session_id: str):
    if session_id not in store:
        store[session_id] = InMemoryChatMessageHistory()
    return store[session_id]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

chain = prompt | ChatOpenAI(model="gpt-4.1")

# Wrap with message history — memory is automatic
with_history = RunnableWithMessageHistory(
    chain,
    get_session_history,
    input_messages_key="input",
    history_messages_key="history",
)

# Each call remembers previous turns
config = {"configurable": {"session_id": "user-123"}}
with_history.invoke({"input": "My name is Alice"}, config=config)
resp = with_history.invoke({"input": "What's my name?"}, config=config)
print(resp.content)  # "Your name is Alice!"`,
      runCommand: 'python langchain_05_memory.py',
    },
    {
      id: 'langchain-multichain',
      number: 'LC6',
      title: 'Multi-Model Routing & Fallbacks',
      file: 'langchain_06_routing.py',
      category: 'advanced',
      provider: 'langchain',
      model: 'Multiple LLMs',
      icon: '🔀',
      color: '#1c3c3c',
      description: 'Route requests to different models based on task complexity, add fallback chains for reliability, and run multiple models in parallel. LangChain\'s killer feature for production apps.',
      concepts: ['RunnableBranch', 'with_fallbacks', 'RunnableParallel', 'Model routing'],
      codePreview: `from langchain_openai import ChatOpenAI
from langchain_anthropic import ChatAnthropic
from langchain_core.runnables import RunnableBranch, RunnableParallel
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

fast = ChatOpenAI(model="gpt-4.1-mini")
smart = ChatAnthropic(model="claude-sonnet-5")

# Fallback: if primary fails, use backup
chain_with_fallback = smart.with_fallbacks([fast])

# Route by complexity
classifier = ChatOpenAI(model="gpt-4.1-mini")
prompt = ChatPromptTemplate.from_template("{input}")

router = RunnableBranch(
    (lambda x: x["complexity"] == "high", prompt | smart | StrOutputParser()),
    prompt | fast | StrOutputParser(),  # default: fast model
)

# Parallel: run multiple models simultaneously
parallel = RunnableParallel(
    claude=prompt | smart | StrOutputParser(),
    gpt=prompt | fast | StrOutputParser(),
)
results = parallel.invoke({"input": "Explain recursion"})
print(f"Claude: {results['claude'][:100]}...")
print(f"GPT: {results['gpt'][:100]}...")`,
      runCommand: 'python langchain_06_routing.py',
    },

    // ═══════════════════════════════════════
    // LANGGRAPH GUIDES
    // ═══════════════════════════════════════
    {
      id: 'langgraph-basics',
      number: 'LG1',
      title: 'Build Your First Graph with LangGraph',
      file: 'langgraph_01_basics.py',
      category: 'beginner',
      provider: 'langgraph',
      model: 'Any LLM',
      icon: '🕸️',
      color: '#0f766e',
      description: 'Learn LangGraph\'s core concept — state graphs. Define nodes (functions), edges (transitions), and state to build workflows that go beyond simple linear chains.',
      concepts: ['StateGraph', 'Nodes & edges', 'TypedDict state', 'Graph compilation'],
      codePreview: `from langgraph.graph import StateGraph, START, END
from typing import TypedDict

# Define the state that flows through the graph
class State(TypedDict):
    question: str
    answer: str

# Define nodes — each is a function that transforms state
def research(state: State) -> dict:
    """Look up information about the question."""
    return {"answer": f"Researched: {state['question']}"}

def format_answer(state: State) -> dict:
    """Format the research into a clean answer."""
    return {"answer": f"Final: {state['answer']}"}

# Build the graph
graph = StateGraph(State)
graph.add_node("research", research)
graph.add_node("format", format_answer)
graph.add_edge(START, "research")
graph.add_edge("research", "format")
graph.add_edge("format", END)

app = graph.compile()
result = app.invoke({"question": "What is LangGraph?"})
print(result["answer"])`,
      runCommand: 'python langgraph_01_basics.py',
    },
    {
      id: 'langgraph-react-agent',
      number: 'LG2',
      title: 'ReAct Agent with LangGraph',
      file: 'langgraph_02_react_agent.py',
      category: 'intermediate',
      provider: 'langgraph',
      model: 'Any tool-calling LLM',
      icon: '🤖',
      color: '#0f766e',
      description: 'Build a ReAct (Reason + Act) agent using LangGraph\'s prebuilt agent. The agent reasons about what to do, calls tools, observes results, and loops until the task is complete.',
      concepts: ['create_react_agent', 'Tool integration', 'Agent loop', 'Prebuilt agents'],
      codePreview: `from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def search(query: str) -> str:
    """Search the web for information."""
    return f"Top results for '{query}': AI is transforming..."

@tool
def calculator(expression: str) -> str:
    """Evaluate a math expression."""
    return str(eval(expression))

llm = ChatOpenAI(model="gpt-4.1")

# Create a ReAct agent — handles the reason/act loop
agent = create_react_agent(llm, [search, calculator])

# The agent decides which tools to call and when to stop
result = agent.invoke({
    "messages": [{"role": "user",
        "content": "How many seconds are in 3.5 days?"}]
})

for msg in result["messages"]:
    print(f"{msg.type}: {msg.content}")`,
      runCommand: 'python langgraph_02_react_agent.py',
    },
    {
      id: 'langgraph-conditional',
      number: 'LG3',
      title: 'Conditional Routing & Branching',
      file: 'langgraph_03_conditional.py',
      category: 'intermediate',
      provider: 'langgraph',
      model: 'Any LLM',
      icon: '🔀',
      color: '#0f766e',
      description: 'Add decision points to your graph with conditional edges. Route to different nodes based on LLM output, state values, or custom logic — the core of dynamic workflows.',
      concepts: ['Conditional edges', 'add_conditional_edges', 'Router functions', 'Dynamic flow'],
      codePreview: `from langgraph.graph import StateGraph, START, END
from langchain_openai import ChatOpenAI
from typing import TypedDict, Literal

class State(TypedDict):
    query: str
    category: str
    response: str

llm = ChatOpenAI(model="gpt-4.1-mini")

def classify(state: State) -> dict:
    """Classify the query into a category."""
    result = llm.invoke(f"Classify as 'technical' or 'general': {state['query']}")
    return {"category": result.content.strip().lower()}

def handle_technical(state: State) -> dict:
    resp = llm.invoke(f"Give a detailed technical answer: {state['query']}")
    return {"response": resp.content}

def handle_general(state: State) -> dict:
    resp = llm.invoke(f"Give a simple, friendly answer: {state['query']}")
    return {"response": resp.content}

# Route based on classification
def route(state: State) -> Literal["technical", "general"]:
    return "technical" if "technical" in state["category"] else "general"

graph = StateGraph(State)
graph.add_node("classify", classify)
graph.add_node("technical", handle_technical)
graph.add_node("general", handle_general)
graph.add_edge(START, "classify")
graph.add_conditional_edges("classify", route)
graph.add_edge("technical", END)
graph.add_edge("general", END)

app = graph.compile()
result = app.invoke({"query": "How does TCP/IP work?"})
print(result["response"])`,
      runCommand: 'python langgraph_03_conditional.py',
    },
    {
      id: 'langgraph-persistence',
      number: 'LG4',
      title: 'Persistence & Checkpointing',
      file: 'langgraph_04_persistence.py',
      category: 'intermediate',
      provider: 'langgraph',
      model: 'Any LLM',
      icon: '💾',
      color: '#0f766e',
      description: 'Add memory to your graphs with checkpointing. Persist conversation state across sessions, resume interrupted workflows, and build multi-session chatbots with thread-level history.',
      concepts: ['MemorySaver', 'Thread IDs', 'Checkpointing', 'State persistence'],
      codePreview: `from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4.1")

# Use MessagesState for automatic message list management
def chatbot(state: MessagesState) -> dict:
    response = llm.invoke(state["messages"])
    return {"messages": [response]}

graph = StateGraph(MessagesState)
graph.add_node("chatbot", chatbot)
graph.add_edge(START, "chatbot")
graph.add_edge("chatbot", END)

# Add persistence — state is saved after every node
memory = MemorySaver()
app = graph.compile(checkpointer=memory)

# Thread 1: start a conversation
config = {"configurable": {"thread_id": "user-123"}}
app.invoke({"messages": [{"role": "user", "content": "I'm Alice"}]}, config)

# Same thread — the bot remembers previous messages
result = app.invoke(
    {"messages": [{"role": "user", "content": "What's my name?"}]}, config
)
print(result["messages"][-1].content)  # "Your name is Alice!"`,
      runCommand: 'python langgraph_04_persistence.py',
    },
    {
      id: 'langgraph-hitl',
      number: 'LG5',
      title: 'Human-in-the-Loop Approval',
      file: 'langgraph_05_hitl.py',
      category: 'advanced',
      provider: 'langgraph',
      model: 'Any LLM',
      icon: '🙋',
      color: '#0f766e',
      description: 'Pause graph execution to get human approval before critical actions. Use interrupt points to review tool calls, edit state, then resume — essential for safe agentic workflows.',
      concepts: ['interrupt_before', 'Human review', 'State editing', 'Resumption'],
      codePreview: `from langgraph.graph import StateGraph, START, END, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import create_react_agent, ToolNode
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool

@tool
def send_email(to: str, subject: str, body: str) -> str:
    """Send an email (requires human approval)."""
    return f"Email sent to {to}: {subject}"

llm = ChatOpenAI(model="gpt-4.1")
tools = [send_email]

# Create agent with interrupt BEFORE tool execution
agent = create_react_agent(
    llm, tools,
    checkpointer=MemorySaver(),
    interrupt_before=["tools"],  # Pause before running tools
)

config = {"configurable": {"thread_id": "email-1"}}

# Agent plans to send email — but pauses for approval
result = agent.invoke(
    {"messages": [{"role": "user",
        "content": "Email bob@co.com about the meeting at 3pm"}]},
    config,
)
print("Agent wants to call:", result["messages"][-1].tool_calls)

# Human approves → resume execution
result = agent.invoke(None, config)  # Continue from checkpoint
print(result["messages"][-1].content)`,
      runCommand: 'python langgraph_05_hitl.py',
    },
    {
      id: 'langgraph-multi-agent',
      number: 'LG6',
      title: 'Multi-Agent Collaboration',
      file: 'langgraph_06_multi_agent.py',
      category: 'advanced',
      provider: 'langgraph',
      model: 'Any LLM',
      icon: '👥',
      color: '#0f766e',
      description: 'Build a team of specialized agents that collaborate on tasks. A supervisor routes work to researcher, coder, and reviewer agents — each with their own tools and prompts.',
      concepts: ['Supervisor pattern', 'Agent handoff', 'Specialized sub-agents', 'Collaborative workflows'],
      codePreview: `from langgraph.graph import StateGraph, START, END, MessagesState
from langchain_openai import ChatOpenAI
from typing import Literal

llm = ChatOpenAI(model="gpt-4.1")

def supervisor(state: MessagesState) -> dict:
    """Route tasks to the right specialist agent."""
    response = llm.invoke([
        {"role": "system", "content":
         "Route to 'researcher', 'coder', or 'FINISH'."},
        *state["messages"],
    ])
    return {"messages": [response]}

def researcher(state: MessagesState) -> dict:
    resp = llm.invoke([
        {"role": "system", "content": "You are a research specialist."},
        *state["messages"],
    ])
    return {"messages": [resp]}

def coder(state: MessagesState) -> dict:
    resp = llm.invoke([
        {"role": "system", "content": "You are an expert programmer."},
        *state["messages"],
    ])
    return {"messages": [resp]}

def route(state: MessagesState) -> Literal["researcher", "coder", "__end__"]:
    last = state["messages"][-1].content.lower()
    if "researcher" in last: return "researcher"
    if "coder" in last: return "coder"
    return "__end__"

graph = StateGraph(MessagesState)
graph.add_node("supervisor", supervisor)
graph.add_node("researcher", researcher)
graph.add_node("coder", coder)
graph.add_edge(START, "supervisor")
graph.add_conditional_edges("supervisor", route)
graph.add_edge("researcher", "supervisor")  # Report back
graph.add_edge("coder", "supervisor")       # Report back
app = graph.compile()`,
      runCommand: 'python langgraph_06_multi_agent.py',
    },

    // ═══════════════════════════════════════
    // CREWAI GUIDES
    // ═══════════════════════════════════════
    {
      id: 'crewai-basics',
      number: 'CR1',
      title: 'Build Your First Crew with CrewAI',
      file: 'crewai_01_basics.py',
      category: 'beginner',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '👷',
      color: '#e63946',
      description: 'Learn CrewAI\'s core concepts — agents, tasks, and crews. Define agents with roles and goals, assign them tasks, and let the crew collaborate to produce results.',
      concepts: ['Agent roles', 'Task definitions', 'Crew assembly', 'Sequential process'],
      codePreview: `from crewai import Agent, Task, Crew

# Define agents with roles and goals
researcher = Agent(
    role="Senior Research Analyst",
    goal="Find the latest AI trends and breakthroughs",
    backstory="You are an expert analyst at a top tech firm.",
    verbose=True,
)

writer = Agent(
    role="Tech Content Writer",
    goal="Write engaging articles about AI discoveries",
    backstory="You are a skilled writer for a major tech blog.",
    verbose=True,
)

# Define tasks and assign to agents
research_task = Task(
    description="Research the top 3 AI trends in 2026.",
    expected_output="A detailed report with key findings.",
    agent=researcher,
)

write_task = Task(
    description="Write a blog post based on the research.",
    expected_output="A polished 500-word blog post.",
    agent=writer,
)

# Assemble the crew and kick off
crew = Crew(agents=[researcher, writer], tasks=[research_task, write_task])
result = crew.kickoff()
print(result)`,
      runCommand: 'python crewai_01_basics.py',
    },
    {
      id: 'crewai-tools',
      number: 'CR2',
      title: 'Custom Tools for CrewAI Agents',
      file: 'crewai_02_tools.py',
      category: 'intermediate',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '🔧',
      color: '#e63946',
      description: 'Give your agents superpowers with custom tools. Use CrewAI\'s built-in tools for web search and file I/O, or create your own with the @tool decorator.',
      concepts: ['@tool decorator', 'Built-in tools', 'Tool assignment', 'SerperDevTool'],
      codePreview: `from crewai import Agent, Task, Crew
from crewai.tools import tool
from crewai_tools import SerperDevTool, FileReadTool

# Built-in tools
search_tool = SerperDevTool()
file_tool = FileReadTool()

# Custom tool with the @tool decorator
@tool("Database Lookup")
def db_lookup(query: str) -> str:
    """Search the internal company database."""
    # Your database logic here
    return f"Found 3 records matching '{query}'"

# Agent with multiple tools
analyst = Agent(
    role="Data Analyst",
    goal="Answer questions using all available data sources",
    backstory="You combine web research with internal data.",
    tools=[search_tool, file_tool, db_lookup],
    verbose=True,
)

task = Task(
    description="Compare our Q4 revenue with industry benchmarks.",
    expected_output="A comparison table with insights.",
    agent=analyst,
)

crew = Crew(agents=[analyst], tasks=[task])
result = crew.kickoff()
print(result)`,
      runCommand: 'python crewai_02_tools.py',
    },
    {
      id: 'crewai-hierarchical',
      number: 'CR3',
      title: 'Hierarchical Crew with a Manager',
      file: 'crewai_03_hierarchical.py',
      category: 'intermediate',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '👔',
      color: '#e63946',
      description: 'Switch from sequential to hierarchical process — a manager agent automatically delegates tasks, reviews output, and coordinates the crew like a real team lead.',
      concepts: ['Hierarchical process', 'Manager LLM', 'Delegation', 'Task review'],
      codePreview: `from crewai import Agent, Task, Crew, Process
from langchain_openai import ChatOpenAI

researcher = Agent(
    role="Researcher",
    goal="Gather comprehensive data on the topic",
    backstory="Expert at finding and synthesizing information.",
    allow_delegation=False,
)

analyst = Agent(
    role="Data Analyst",
    goal="Analyze data and extract actionable insights",
    backstory="Skilled at finding patterns in complex data.",
    allow_delegation=False,
)

writer = Agent(
    role="Report Writer",
    goal="Create clear, executive-ready reports",
    backstory="Former McKinsey consultant with sharp writing.",
    allow_delegation=False,
)

tasks = [
    Task(description="Research market size for AI agents in 2026.",
         expected_output="Raw data and sources."),
    Task(description="Analyze the data for growth trends.",
         expected_output="Key insights and projections."),
    Task(description="Write a 1-page executive summary.",
         expected_output="Polished executive brief."),
]

# Hierarchical: a manager LLM coordinates the agents
crew = Crew(
    agents=[researcher, analyst, writer],
    tasks=tasks,
    process=Process.hierarchical,
    manager_llm=ChatOpenAI(model="gpt-4.1"),
    verbose=True,
)

result = crew.kickoff()
print(result)`,
      runCommand: 'python crewai_03_hierarchical.py',
    },
    {
      id: 'crewai-memory',
      number: 'CR4',
      title: 'Crew Memory & Knowledge Sharing',
      file: 'crewai_04_memory.py',
      category: 'intermediate',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '🧠',
      color: '#e63946',
      description: 'Enable short-term, long-term, and entity memory so agents learn from past interactions. Crews remember context across tasks and even across multiple runs.',
      concepts: ['Short-term memory', 'Long-term memory', 'Entity memory', 'Cross-task context'],
      codePreview: `from crewai import Agent, Task, Crew

researcher = Agent(
    role="Research Assistant",
    goal="Build knowledge over multiple research sessions",
    backstory="You learn and remember across conversations.",
    memory=True,  # Enable agent-level memory
)

analyst = Agent(
    role="Analyst",
    goal="Use accumulated research to provide deeper insights",
    backstory="You build on previous findings.",
    memory=True,
)

task1 = Task(
    description="Research the history of transformer models.",
    expected_output="Timeline of key transformer milestones.",
    agent=researcher,
)

task2 = Task(
    description="Based on the research, predict next breakthroughs.",
    expected_output="Top 3 predicted breakthroughs with reasoning.",
    agent=analyst,
)

# Enable crew-level memory for cross-task knowledge sharing
crew = Crew(
    agents=[researcher, analyst],
    tasks=[task1, task2],
    memory=True,        # Short-term: within this run
    long_term_memory=True,  # Persists across runs
    entity_memory=True,     # Tracks people, orgs, concepts
    verbose=True,
)

result = crew.kickoff()
print(result)`,
      runCommand: 'python crewai_04_memory.py',
    },
    {
      id: 'crewai-structured',
      number: 'CR5',
      title: 'Structured Output with CrewAI',
      file: 'crewai_05_structured.py',
      category: 'intermediate',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '📋',
      color: '#e63946',
      description: 'Get structured Pydantic objects as crew output instead of raw text. Define output schemas on tasks to guarantee the format of agent responses.',
      concepts: ['output_pydantic', 'Task output types', 'Pydantic models', 'Schema validation'],
      codePreview: `from crewai import Agent, Task, Crew
from pydantic import BaseModel, Field

# Define structured output schema
class MarketReport(BaseModel):
    industry: str = Field(description="Industry analyzed")
    market_size: str = Field(description="Total market size")
    growth_rate: float = Field(description="Annual growth rate %")
    top_players: list[str] = Field(description="Top 5 companies")
    risks: list[str] = Field(description="Key market risks")

analyst = Agent(
    role="Market Research Analyst",
    goal="Produce accurate, structured market reports",
    backstory="Senior analyst at a leading research firm.",
)

task = Task(
    description="Analyze the AI agent platform market in 2026.",
    expected_output="A structured market report.",
    agent=analyst,
    output_pydantic=MarketReport,  # Enforce structured output
)

crew = Crew(agents=[analyst], tasks=[task])
result = crew.kickoff()

# Access typed fields directly
report = result.pydantic
print(f"Industry: {report.industry}")
print(f"Market Size: {report.market_size}")
print(f"Growth: {report.growth_rate}%")
print(f"Top Players: {', '.join(report.top_players)}")`,
      runCommand: 'python crewai_05_structured.py',
    },
    {
      id: 'crewai-flows',
      number: 'CR6',
      title: 'Multi-Crew Flows & Pipelines',
      file: 'crewai_06_flows.py',
      category: 'advanced',
      provider: 'crewai',
      model: 'Any LLM',
      icon: '🔄',
      color: '#e63946',
      description: 'Chain multiple crews together in a Flow — the output of one crew feeds into the next. Build complex multi-stage pipelines with conditional routing and parallel execution.',
      concepts: ['Flow class', '@start / @listen', 'Crew chaining', 'Conditional flows'],
      codePreview: `from crewai import Agent, Task, Crew
from crewai.flow.flow import Flow, listen, start

class ContentPipeline(Flow):
    @start()
    def research_phase(self):
        """First crew: gather information."""
        researcher = Agent(role="Researcher", goal="Gather data")
        task = Task(
            description=f"Research: {self.state['topic']}",
            expected_output="Key findings.",
            agent=researcher,
        )
        crew = Crew(agents=[researcher], tasks=[task])
        result = crew.kickoff()
        return result.raw

    @listen(research_phase)
    def writing_phase(self, research):
        """Second crew: write content from research."""
        writer = Agent(role="Writer", goal="Write a blog post")
        task = Task(
            description=f"Write a blog post using: {research}",
            expected_output="A polished blog post.",
            agent=writer,
        )
        crew = Crew(agents=[writer], tasks=[task])
        result = crew.kickoff()
        return result.raw

    @listen(writing_phase)
    def review_phase(self, draft):
        """Third crew: edit and polish."""
        editor = Agent(role="Editor", goal="Polish the draft")
        task = Task(
            description=f"Edit and improve: {draft}",
            expected_output="Publication-ready article.",
            agent=editor,
        )
        crew = Crew(agents=[editor], tasks=[task])
        return crew.kickoff().raw

# Run the full pipeline
flow = ContentPipeline()
result = flow.kickoff(inputs={"topic": "AI agents in production"})
print(result)`,
      runCommand: 'python crewai_06_flows.py',
    },
  ],
};

export const providerColors = {
  anthropic: '#d97706',
  openai: '#10a37f',
  google: '#4285f4',
  llama: '#7c3aed',
  langchain: '#1c3c3c',
  langgraph: '#0f766e',
  crewai: '#e63946',
};
