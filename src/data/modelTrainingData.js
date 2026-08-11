// ── Model Training & AI History Data ──

export const contentAreas = [
  { id: 'all', label: 'All Topics' },
  { id: 'history', label: 'AI History' },
  { id: 'training-tech', label: 'Training Tech' },
  { id: 'pros-cons', label: 'Pros & Cons' },
  { id: 'individual', label: 'Individual Training' },
];

export const providers = [
  { id: 'all', label: 'All Providers' },
  { id: 'openai', label: 'OpenAI', color: '#10a37f' },
  { id: 'anthropic', label: 'Anthropic', color: '#d4a27f' },
  { id: 'google', label: 'Google', color: '#4285f4' },
  { id: 'meta', label: 'Meta', color: '#0668e1' },
  { id: 'xai', label: 'xAI', color: '#1d9bf0' },
  { id: 'mistral', label: 'Mistral', color: '#ff7000' },
  { id: 'nvidia', label: 'NVIDIA', color: '#76b900' },
];

export const timelineEvents = [
  {
    year: 1950,
    title: 'The Turing Test',
    description: 'Alan Turing publishes "Computing Machinery and Intelligence," proposing that machines could think and introducing the imitation game as a test for machine intelligence.',
    icon: '\u{1F9E0}',
  },
  {
    year: 1956,
    title: 'Dartmouth Conference',
    description: 'John McCarthy coins "artificial intelligence" at the Dartmouth workshop, marking the official birth of AI as a field of research.',
    icon: '\u{1F393}',
  },
  {
    year: 1958,
    title: 'The Perceptron',
    description: 'Frank Rosenblatt builds the Perceptron, the first artificial neural network capable of learning. It could recognize simple patterns but was limited to linearly separable problems.',
    icon: '\u{1F50C}',
  },
  {
    year: 1974,
    title: 'First AI Winter',
    description: 'Funding and interest collapse after the Lighthill Report criticizes AI progress. Governments and institutions dramatically cut AI research funding.',
    icon: '\u{2744}\u{FE0F}',
  },
  {
    year: 1980,
    title: 'Expert Systems Rise',
    description: 'Rule-based expert systems like MYCIN and XCON bring commercial success. Companies invest billions, but these brittle systems lead to the second AI winter by the late 1980s.',
    icon: '\u{1F4BC}',
  },
  {
    year: 1997,
    title: 'Deep Blue Beats Kasparov',
    description: 'IBM\'s Deep Blue defeats world chess champion Garry Kasparov, demonstrating that machines can outperform humans in complex strategic tasks using brute-force search.',
    icon: '\u{265F}\u{FE0F}',
  },
  {
    year: 2012,
    title: 'AlexNet & Deep Learning',
    description: 'Alex Krizhevsky\'s deep convolutional neural network wins ImageNet by a huge margin, igniting the deep learning revolution and proving GPUs could accelerate neural network training.',
    icon: '\u{1F5BC}\u{FE0F}',
  },
  {
    year: 2017,
    title: 'Attention Is All You Need',
    description: 'Google researchers publish the Transformer architecture paper, replacing recurrence with self-attention. This becomes the foundation for GPT, BERT, and virtually all modern LLMs.',
    icon: '\u{26A1}',
  },
  {
    year: 2019,
    title: 'GPT-2 & Scaling Begins',
    description: 'OpenAI releases GPT-2 (1.5B parameters) and initially withholds it citing misuse concerns, demonstrating that scaling up transformers produces surprisingly coherent text generation.',
    icon: '\u{1F4C8}',
  },
  {
    year: 2022,
    title: 'ChatGPT Changes Everything',
    description: 'OpenAI launches ChatGPT (GPT-3.5 with RLHF), reaching 100M users in two months. The conversational interface makes AI accessible to the general public for the first time.',
    icon: '\u{1F4AC}',
  },
  {
    year: 2023,
    title: 'The Frontier Race',
    description: 'GPT-4, Claude 2, Gemini, Llama 2, and Mistral launch in rapid succession. Open-source and closed-source models compete fiercely, driving rapid capability improvements.',
    icon: '\u{1F3C1}',
  },
  {
    year: 2024,
    title: 'Reasoning & Agents',
    description: 'Models gain chain-of-thought reasoning (o1, Claude 3.5), tool use, and agentic capabilities. AI coding assistants and autonomous workflows become production-ready.',
    icon: '\u{1F916}',
  },
  {
    year: 2025,
    title: 'The Agent Era',
    description: 'Claude Opus 4, GPT-5, and Gemini 2.5 push boundaries with deep reasoning, computer use, and multi-step agentic workflows. AI becomes a genuine collaborator in complex tasks.',
    icon: '\u{1F680}',
  },
];

export const trainingTechnologies = [
  {
    id: 'rlhf',
    title: 'RLHF (Reinforcement Learning from Human Feedback)',
    provider: 'openai',
    color: '#10a37f',
    icon: '\u{1F44D}',
    summary: 'Human raters rank model outputs; a reward model learns their preferences, then the LLM is optimized via PPO to maximize that reward signal.',
    keyPoints: [
      'Human annotators compare pairs of model responses and pick the better one',
      'A separate reward model is trained to predict human preference scores',
      'The LLM is fine-tuned with Proximal Policy Optimization (PPO) against the reward model',
      'This is what made ChatGPT feel conversational vs raw GPT-3',
    ],
    frameworks: ['PyTorch', 'DeepSpeed', 'Ray'],
    relatedModels: ['GPT-4', 'GPT-4o', 'InstructGPT'],
  },
  {
    id: 'scaling-laws',
    title: 'Scaling Laws & Compute-Optimal Training',
    provider: 'openai',
    color: '#10a37f',
    icon: '\u{1F4CA}',
    summary: 'Research by Kaplan et al. and the Chinchilla paper showed predictable relationships between model size, dataset size, compute budget, and final performance.',
    keyPoints: [
      'Loss decreases as a power law with more parameters, data, and compute',
      'Chinchilla (DeepMind) showed most models were under-trained on too little data',
      'Optimal training balances model size with the amount of training tokens',
      'This insight shifted the industry toward training smaller models on more data',
    ],
    frameworks: ['JAX', 'PyTorch', 'Megatron-LM'],
    relatedModels: ['GPT-4', 'Chinchilla', 'Llama'],
  },
  {
    id: 'constitutional-ai',
    title: 'Constitutional AI (CAI)',
    provider: 'anthropic',
    color: '#d4a27f',
    icon: '\u{1F4DC}',
    summary: 'Anthropic\'s approach where the model critiques its own outputs against a set of principles ("constitution"), reducing reliance on human labelers for safety alignment.',
    keyPoints: [
      'The model generates responses, then critiques and revises them against explicit principles',
      'A "Red Team" phase deliberately elicits harmful outputs to identify failure modes',
      'RLAIF (RL from AI Feedback) trains the reward model using AI-generated preference labels',
      'Reduces the cost and subjectivity of human feedback while maintaining safety',
    ],
    frameworks: ['PyTorch', 'Custom Infrastructure'],
    relatedModels: ['Claude Opus 5', 'Claude Sonnet 5', 'Claude Haiku 4.5'],
  },
  {
    id: 'interpretability',
    title: 'Mechanistic Interpretability',
    provider: 'anthropic',
    color: '#d4a27f',
    icon: '\u{1F52C}',
    summary: 'Reverse-engineering how neural networks actually work by identifying interpretable features, circuits, and computational structures inside trained models.',
    keyPoints: [
      'Sparse autoencoders decompose neuron activations into interpretable features',
      'Circuit analysis traces how information flows through specific pathways',
      'Helps identify and mitigate deceptive or undesirable learned behaviors',
      'Anthropic has published research finding millions of interpretable features in Claude',
    ],
    frameworks: ['TransformerLens', 'PyTorch', 'Custom Tools'],
    relatedModels: ['Claude 3', 'Claude 3.5 Sonnet'],
  },
  {
    id: 'pathways',
    title: 'Pathways & Multi-Task Training',
    provider: 'google',
    color: '#4285f4',
    icon: '\u{1F310}',
    summary: 'Google\'s Pathways system enables a single model to handle thousands of tasks across modalities, training sparse models that activate only relevant pathways per input.',
    keyPoints: [
      'One model learns many tasks simultaneously rather than separate models per task',
      'Sparse activation means only a fraction of parameters are used for any given input',
      'Efficient training across TPU pods using Google\'s custom SPMD partitioning',
      'Foundation for Gemini\'s native multimodal capabilities (text, image, audio, video)',
    ],
    frameworks: ['JAX', 'TPU v4/v5', 'T5X', 'Pax'],
    relatedModels: ['PaLM 2', 'Gemini 1.5', 'Gemini 2.0'],
  },
  {
    id: 'distillation',
    title: 'Knowledge Distillation',
    provider: 'google',
    color: '#4285f4',
    icon: '\u{1F4A7}',
    summary: 'A large "teacher" model\'s knowledge is compressed into a smaller, faster "student" model that approximates the teacher\'s performance at a fraction of the cost.',
    keyPoints: [
      'The student model learns to match the teacher\'s output probability distributions',
      'Soft labels from the teacher carry more information than hard ground-truth labels',
      'Enables deployment of powerful capabilities on smaller, cheaper, faster models',
      'Used extensively by Google for Gemini Flash and Nano model variants',
    ],
    frameworks: ['JAX', 'TensorFlow', 'PyTorch'],
    relatedModels: ['Gemini Flash', 'Gemini Nano', 'DistilBERT'],
  },
  {
    id: 'open-weight',
    title: 'Open-Weight Training & Community',
    provider: 'meta',
    color: '#0668e1',
    icon: '\u{1F513}',
    summary: 'Meta releases model weights publicly, allowing anyone to fine-tune, deploy, and study them. This catalyzed an enormous ecosystem of community-built variants and research.',
    keyPoints: [
      'Llama models are released with weights, enabling local deployment and fine-tuning',
      'Community creates thousands of variants optimized for specific tasks',
      'Quantization techniques (GGUF, GPTQ, AWQ) make large models run on consumer hardware',
      'Open weights accelerate research by letting anyone reproduce and build on results',
    ],
    frameworks: ['PyTorch', 'Hugging Face', 'llama.cpp', 'vLLM'],
    relatedModels: ['Llama 4', 'Llama 3.3', 'Code Llama'],
  },
  {
    id: 'fsdp',
    title: 'FSDP (Fully Sharded Data Parallel)',
    provider: 'meta',
    color: '#0668e1',
    icon: '\u{2699}\u{FE0F}',
    summary: 'Meta\'s distributed training strategy that shards model parameters, gradients, and optimizer states across GPUs, enabling training of models that don\'t fit on a single device.',
    keyPoints: [
      'Each GPU holds only a shard of the full model, reducing per-device memory requirements',
      'Parameters are gathered on-demand for forward/backward passes, then re-sharded',
      'Scales to thousands of GPUs with near-linear efficiency',
      'Now a core PyTorch feature used across the industry, not just by Meta',
    ],
    frameworks: ['PyTorch FSDP', 'FairScale', 'torchtitan'],
    relatedModels: ['Llama 4 Maverick', 'Llama 3.3'],
  },
  {
    id: 'colossus',
    title: 'Colossus Supercluster Training',
    provider: 'xai',
    color: '#1d9bf0',
    icon: '\u{1F5A5}\u{FE0F}',
    summary: 'xAI built Colossus, one of the world\'s largest GPU clusters (100k+ H100s), enabling training of massive models like Grok at unprecedented speed and scale.',
    keyPoints: [
      'Custom-built supercomputer with 100,000+ NVIDIA H100 GPUs',
      'Purpose-built infrastructure designed for maximum training throughput',
      'Enables rapid iteration on very large model architectures',
      'Combined with real-time data from the X platform for training data freshness',
    ],
    frameworks: ['JAX', 'Custom Stack', 'Kubernetes'],
    relatedModels: ['Grok 4.5', 'Grok-3'],
  },
  {
    id: 'moe',
    title: 'Mixture of Experts (MoE)',
    provider: 'mistral',
    color: '#ff7000',
    icon: '\u{1F9E9}',
    summary: 'A routing mechanism sends each input token to only a subset of specialized "expert" sub-networks, allowing models with many total parameters to remain fast and efficient.',
    keyPoints: [
      'A gating/router network decides which expert sub-networks process each token',
      'Only 2-4 experts activate per token, so compute cost stays manageable',
      'Total parameter count can be very large while active parameters remain small',
      'Mixtral 8x7B has 47B total parameters but uses ~13B per forward pass',
    ],
    frameworks: ['PyTorch', 'Megablocks', 'vLLM'],
    relatedModels: ['Mixtral 8x7B', 'Mixtral 8x22B', 'Mistral Large 3'],
  },
  {
    id: 'blackwell-architecture',
    title: 'Blackwell GPU Architecture',
    provider: 'nvidia',
    color: '#76b900',
    icon: '\u{1F4A0}',
    summary: 'NVIDIA\'s Blackwell architecture (B200, GB200, GB300) is the GPU platform powering AI factories for the age of reasoning. It delivers massive improvements in training throughput and inference efficiency over the prior Hopper generation, enabling trillion-parameter model training.',
    keyPoints: [
      'Up to 4x faster AI training and 30x faster inference than Hopper H100 GPUs',
      'GB200 NVL72 rack-scale system connects 72 GPUs as a single unified compute unit',
      'Second-generation Transformer Engine with FP4 precision for efficient inference',
      'NVLink 5th-gen provides 1.8TB/s GPU-to-GPU bandwidth for massive parallelism',
    ],
    frameworks: ['CUDA 13', 'TensorRT-LLM', 'NeMo', 'Dynamo'],
    relatedModels: ['Nemotron Ultra 253B', 'Nemotron Super 49B', 'Llama 4'],
  },
  {
    id: 'vera-rubin',
    title: 'Vera Rubin Platform',
    provider: 'nvidia',
    color: '#76b900',
    icon: '\u{1F680}',
    summary: 'NVIDIA\'s next-generation AI platform after Blackwell, featuring seven new chips purpose-built for the age of agentic AI. Includes the Vera CPU — the first processor designed specifically for agentic AI workloads — delivering 2x efficiency and 50% faster performance.',
    keyPoints: [
      'Seven new chips in full production designed for scaling AI factories',
      'Vera CPU is the first processor purpose-built for agentic AI workloads',
      'Vera Rubin NVL72 serves as a rack-scale agentic AI supercomputer',
      'BlueField-4 STX enables modular storage for long-context reasoning in agents',
    ],
    frameworks: ['CUDA-X', 'Dynamo', 'NeMo', 'OpenShell'],
    relatedModels: ['Nemotron Ultra 253B', 'Future Nemotron models'],
  },
  {
    id: 'nvidia-dynamo',
    title: 'Dynamo Inference OS',
    provider: 'nvidia',
    color: '#76b900',
    icon: '\u{26A1}',
    summary: 'NVIDIA Dynamo is an open-source inference operating system for generative and agentic AI at scale. It orchestrates distributed multi-node inference across data centers, optimizing throughput, latency, and GPU utilization for production LLM serving.',
    keyPoints: [
      'Open-source inference OS for distributed multi-node LLM serving',
      'Optimizes GPU utilization across data center scale deployments',
      'Designed for both generative and agentic AI inference patterns',
      'Integrates with NIM microservices for turnkey model deployment',
    ],
    frameworks: ['TensorRT-LLM', 'NIM', 'Triton', 'Kubernetes'],
    relatedModels: ['Nemotron Ultra 253B', 'Nemotron Super 49B'],
  },
];

export const prosAndCons = {
  pros: [
    {
      icon: '\u{26A1}',
      title: 'Unprecedented Productivity',
      description: 'LLMs can draft emails, write code, summarize documents, and generate content in seconds, multiplying individual output by 10x or more across knowledge work.',
    },
    {
      icon: '\u{1F310}',
      title: 'Democratized Access to Knowledge',
      description: 'Anyone with internet access can query an LLM for expert-level explanations on virtually any topic, from medical information to legal concepts to programming.',
    },
    {
      icon: '\u{1F4BB}',
      title: 'Accelerated Software Development',
      description: 'Code generation, debugging, and review capabilities allow developers to ship faster. AI coding assistants are becoming essential tools in modern development workflows.',
    },
    {
      icon: '\u{1F30D}',
      title: 'Breaking Language Barriers',
      description: 'Multilingual models enable real-time translation and cross-language communication, making information and collaboration accessible across linguistic boundaries.',
    },
    {
      icon: '\u{1F52C}',
      title: 'Scientific Discovery',
      description: 'LLMs assist in literature review, hypothesis generation, data analysis, and protein structure prediction, accelerating research across biology, chemistry, and physics.',
    },
    {
      icon: '\u{267F}',
      title: 'Accessibility & Inclusion',
      description: 'AI assistants help people with disabilities through voice interfaces, screen reading, content simplification, and real-time captioning, making technology more inclusive.',
    },
  ],
  cons: [
    {
      icon: '\u{1F624}',
      title: 'Hallucination & Confabulation',
      description: 'LLMs confidently generate plausible-sounding but factually incorrect information. They cannot distinguish what they "know" from what they fabricate, making verification essential.',
    },
    {
      icon: '\u{2696}\u{FE0F}',
      title: 'Bias Amplification',
      description: 'Models inherit and can amplify biases present in training data, including racial, gender, cultural, and political biases that are difficult to detect and mitigate completely.',
    },
    {
      icon: '\u{1F50B}',
      title: 'Enormous Energy Consumption',
      description: 'Training frontier models requires massive compute clusters consuming megawatts of power. A single GPT-4-scale training run may use as much energy as hundreds of US homes use in a year.',
    },
    {
      icon: '\u{1F4B0}',
      title: 'Concentration of Power',
      description: 'Only a handful of well-funded companies can train frontier models, creating a potential oligopoly over one of the most transformative technologies in human history.',
    },
    {
      icon: '\u{1F4C4}',
      title: 'Copyright & Data Concerns',
      description: 'Training data often includes copyrighted material used without explicit consent. Ongoing lawsuits and evolving regulations create legal uncertainty for model providers and users.',
    },
    {
      icon: '\u{1F4BC}',
      title: 'Job Displacement Risks',
      description: 'Automation of writing, coding, translation, customer support, and creative tasks threatens to displace workers faster than new roles emerge, requiring proactive workforce adaptation.',
    },
  ],
};

export const individualTraining = [
  {
    id: 'what-is-finetuning',
    title: 'What is Fine-Tuning?',
    subtitle: 'Understanding the fundamentals',
    icon: '\u{1F3AF}',
    color: '#818cf8',
    description: 'Fine-tuning takes a pre-trained model and continues training it on your specific dataset. Instead of training from scratch (which costs millions), you adapt existing knowledge to your domain.',
    keyPoints: [
      'Pre-training: learns general language from trillions of tokens (done by the provider)',
      'Fine-tuning: adapts the model to your specific task with hundreds to thousands of examples',
      'Much cheaper and faster than training from scratch — hours instead of months',
      'The model retains its general capabilities while becoming specialized',
    ],
    codeExample: `# Conceptual overview of the fine-tuning pipeline
# 1. Start with a pre-trained base model (e.g., Llama 3.1 8B)
# 2. Prepare your domain-specific dataset
# 3. Train for a few epochs on your data
# 4. Evaluate and iterate

from transformers import AutoModelForCausalLM, TrainingArguments

model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.1-8B")
# The model already knows language — now we teach it YOUR task`,
    approaches: null,
  },
  {
    id: 'preparing-data',
    title: 'Preparing Training Data',
    subtitle: 'Data quality determines model quality',
    icon: '\u{1F4CA}',
    color: '#22d3ee',
    description: 'The quality and format of your training data is the single biggest factor in fine-tuning success. Most practitioners spend 80% of their time on data preparation.',
    keyPoints: [
      'Format data as instruction/response pairs (chat format) or completion pairs',
      'Aim for 500-10,000 high-quality examples for most tasks',
      'Ensure diversity — cover edge cases and variations your model will encounter',
      'Clean data rigorously: remove duplicates, fix formatting, verify accuracy',
    ],
    codeExample: `# Example: Preparing a JSONL dataset for fine-tuning
import json

# Each example follows the chat format
training_examples = [
    {
        "messages": [
            {"role": "system", "content": "You are a medical coding assistant."},
            {"role": "user", "content": "Patient presents with acute bronchitis"},
            {"role": "assistant", "content": "ICD-10: J20.9 - Acute bronchitis, unspecified"}
        ]
    },
    {
        "messages": [
            {"role": "system", "content": "You are a medical coding assistant."},
            {"role": "user", "content": "Type 2 diabetes with diabetic nephropathy"},
            {"role": "assistant", "content": "ICD-10: E11.21 - Type 2 diabetes mellitus with diabetic nephropathy"}
        ]
    }
]

# Save as JSONL (one JSON object per line)
with open("training_data.jsonl", "w") as f:
    for example in training_examples:
        f.write(json.dumps(example) + "\\n")`,
    approaches: null,
  },
  {
    id: 'lora-qlora',
    title: 'LoRA & QLoRA',
    subtitle: 'Efficient fine-tuning on consumer hardware',
    icon: '\u{1F9EC}',
    color: '#a78bfa',
    description: 'Low-Rank Adaptation (LoRA) freezes the original model weights and trains small adapter matrices instead. QLoRA adds 4-bit quantization, enabling fine-tuning of 70B+ models on a single GPU.',
    keyPoints: [
      'LoRA trains only 0.1-1% of total parameters while keeping the rest frozen',
      'Adapter weights are tiny (10-100MB) and can be swapped in/out at inference time',
      'QLoRA quantizes the base model to 4-bit, reducing memory by ~75%',
      'A 7B model can be fine-tuned on a single 24GB GPU; 70B on a single 48GB GPU',
    ],
    codeExample: `# Fine-tuning Llama 3.1 8B with QLoRA using PEFT + bitsandbytes
from transformers import AutoModelForCausalLM, BitsAndBytesConfig
from peft import LoraConfig, get_peft_model

# 4-bit quantization config
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype="bfloat16",
)

# Load model in 4-bit
model = AutoModelForCausalLM.from_pretrained(
    "meta-llama/Llama-3.1-8B",
    quantization_config=bnb_config,
    device_map="auto",
)

# LoRA config — only train small adapter matrices
lora_config = LoraConfig(
    r=16,             # rank of update matrices
    lora_alpha=32,    # scaling factor
    target_modules=["q_proj", "v_proj", "k_proj", "o_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# Output: trainable params: 13.6M || all params: 8B || trainable%: 0.17%`,
    approaches: [
      { method: 'Full Fine-Tuning', vram: '160+ GB', params: '100%', speed: 'Slow', cost: '$$$' },
      { method: 'LoRA', vram: '24-48 GB', params: '~0.5%', speed: 'Fast', cost: '$' },
      { method: 'QLoRA', vram: '12-24 GB', params: '~0.5%', speed: 'Fast', cost: '$' },
    ],
  },
  {
    id: 'api-finetuning',
    title: 'API-Based Fine-Tuning',
    subtitle: 'No GPU required — use provider APIs',
    icon: '\u{2601}\u{FE0F}',
    color: '#34d399',
    description: 'OpenAI, Google, and others offer fine-tuning through their APIs. You upload your data, they handle the infrastructure. This is the easiest path but gives you less control.',
    keyPoints: [
      'Upload a JSONL dataset through the API — no GPU or infrastructure needed',
      'Provider handles training, checkpointing, and hyperparameter tuning',
      'Results in a private model accessible only through their API',
      'Costs vary: OpenAI charges ~$8/1M training tokens for GPT-4o mini',
    ],
    codeExample: `# Fine-tuning via OpenAI API
from openai import OpenAI
client = OpenAI()

# Step 1: Upload your training file
file = client.files.create(
    file=open("training_data.jsonl", "rb"),
    purpose="fine-tune"
)

# Step 2: Create a fine-tuning job
job = client.fine_tuning.jobs.create(
    training_file=file.id,
    model="gpt-4o-mini-2024-07-18",
    hyperparameters={
        "n_epochs": 3,
        "batch_size": "auto",
        "learning_rate_multiplier": "auto"
    }
)

# Step 3: Monitor progress
print(client.fine_tuning.jobs.retrieve(job.id))

# Step 4: Use your fine-tuned model
response = client.chat.completions.create(
    model=job.fine_tuned_model,  # e.g., "ft:gpt-4o-mini:my-org::abc123"
    messages=[{"role": "user", "content": "Your domain-specific prompt"}]
)`,
    approaches: [
      { method: 'OpenAI API', models: 'GPT-4o, GPT-4o mini', ease: 'Easiest', control: 'Low' },
      { method: 'Google Vertex AI', models: 'Gemini Flash', ease: 'Easy', control: 'Medium' },
      { method: 'AWS Bedrock', models: 'Llama, Mistral', ease: 'Moderate', control: 'Medium' },
    ],
  },
  {
    id: 'evaluation',
    title: 'Evaluation & Iteration',
    subtitle: 'Measuring fine-tuning success',
    icon: '\u{1F50D}',
    color: '#f59e0b',
    description: 'A fine-tuned model is only as good as your evaluation. Use held-out test sets, domain-specific metrics, and human evaluation to measure improvement over the base model.',
    keyPoints: [
      'Always hold out 10-20% of your data as a test set the model never sees during training',
      'Compare fine-tuned model against the base model on identical prompts',
      'Track task-specific metrics (accuracy, F1, BLEU) alongside general quality',
      'Watch for overfitting: if training loss drops but test quality degrades, reduce epochs',
    ],
    codeExample: `# Simple evaluation framework for fine-tuned models
import json
from openai import OpenAI

client = OpenAI()

def evaluate_model(model_id, test_file):
    """Compare fine-tuned model against test set."""
    correct = 0
    total = 0

    with open(test_file) as f:
        for line in f:
            example = json.loads(line)
            messages = example["messages"][:-1]  # all but expected answer
            expected = example["messages"][-1]["content"]

            response = client.chat.completions.create(
                model=model_id,
                messages=messages,
                temperature=0,
            )
            predicted = response.choices[0].message.content

            if expected.strip().lower() in predicted.strip().lower():
                correct += 1
            total += 1

    accuracy = correct / total * 100
    print(f"Accuracy: {accuracy:.1f}% ({correct}/{total})")
    return accuracy

# Compare base vs fine-tuned
base_score = evaluate_model("gpt-4o-mini", "test_data.jsonl")
ft_score = evaluate_model("ft:gpt-4o-mini:my-org::abc123", "test_data.jsonl")
print(f"Improvement: {ft_score - base_score:+.1f}%")`,
    approaches: null,
  },
  {
    id: 'when-to-finetune',
    title: 'When to Fine-Tune vs Prompt Engineer',
    subtitle: 'Choosing the right approach',
    icon: '\u{1F914}',
    color: '#ec4899',
    description: 'Fine-tuning isn\'t always the answer. Often, better prompting, few-shot examples, or RAG (Retrieval-Augmented Generation) can achieve similar results with less effort.',
    keyPoints: [
      'Start with prompt engineering — it\'s free, fast, and often sufficient',
      'Try RAG before fine-tuning if your task needs access to specific knowledge',
      'Fine-tune when you need consistent style, format, or domain-specific behavior',
      'Fine-tune when you want to reduce prompt length and inference cost',
    ],
    codeExample: `# Decision framework for choosing your approach

APPROACH_GUIDE = {
    "prompt_engineering": {
        "when": [
            "You need quick results without training",
            "Your task can be defined in natural language instructions",
            "You have fewer than 50 examples",
            "The base model almost works but needs guidance",
        ],
        "cost": "Free (just API usage)",
        "time": "Minutes to hours",
    },
    "rag": {
        "when": [
            "You need the model to reference specific documents",
            "Your knowledge base changes frequently",
            "You need citations and source attribution",
            "Domain knowledge is the bottleneck, not style/format",
        ],
        "cost": "Vector DB hosting + API usage",
        "time": "Hours to days",
    },
    "fine_tuning": {
        "when": [
            "You need consistent output format or style",
            "You have 500+ high-quality examples",
            "Prompt engineering hits a quality ceiling",
            "You want to reduce token usage (shorter prompts)",
        ],
        "cost": "$10-$1000+ depending on model and data size",
        "time": "Hours to days",
    },
}`,
    approaches: [
      { method: 'Prompt Engineering', effort: 'Low', examples: '<50', best: 'Quick iteration' },
      { method: 'RAG', effort: 'Medium', examples: 'N/A (docs)', best: 'Knowledge-heavy tasks' },
      { method: 'Fine-Tuning', effort: 'High', examples: '500+', best: 'Style & format' },
    ],
  },
];
