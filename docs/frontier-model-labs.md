# AI Explorer: Frontier Model Lab content pack

Prepared against official provider documentation on 2026-11-10. This is written to extend the ten-tab Anthropic Model Lab at [AI Explorer](https://ai-explorer-theta.vercel.app/). No site changes have been made.

## How to use this pack

Use the provider chapters as site copy. “Suggested” routing, patterns, benchmark exercises, and missions are editorial teaching material, not claims of measured provider performance. The companion JSON contains the same content, model records, pricing conditions, 56 missions, and 64 quiz questions. Adapt its fields to the application; it is not a verified drop-in import format.

The pack covers OpenAI, Google DeepMind, xAI/Grok, Mistral, DeepSeek, Meta, Alibaba/Qwen, and Moonshot/Kimi. It is a selected set of frontier and major model providers, not an exhaustive ranking.

## Shared lab copy and behavior

**Title:** Frontier models, hands on

**Intro:** Pick a provider, find a model that fits, price a realistic task, check the evidence, and learn by doing.

**Provider selector:** Choose a provider

**Tabs:** Family · Ways in · Pick a model · Cost lab · Benchmarks · Patterns · Access · Try it · Quiz · What’s new

**Simple:** Plain-language roles and examples. Start here if model names feel like alphabet soup.

**Technical:** Exact IDs, supported capabilities, pricing conditions, and linked documentation.

**Pricing footer:** API estimates, not subscription prices. Prices in USD per million tokens unless stated otherwise. Tools, cache writes, storage, media, retries, taxes, and special service tiers may add cost.

Keep the existing progress and seven-mission format. Keep progress per provider. The nine learning tabs award stamps; What’s new is informational. Keep seven mission checkboxes and quiz progress separately.

### Pick a model: shared questions

1. What must it do? Extraction/routing; writing/analysis; coding/agents; visual/document understanding; voice/media.
2. What matters most? Low cost and speed; balance; strongest result.
3. How often will it run? One-off; hundreds per day; continuous pipeline.
4. What must the deployment support? Required modalities and tools; permitted data use; region; hosted or self-managed.

Filter incompatible candidates first. Use each provider’s routing below to suggest a baseline, then validate it on the user’s examples. Frequency changes total spend; it does not by itself prove a smaller model is adequate.

### Cost lab: shared setup

Use the three presets in the JSON. The worked example in every chapter is 20,000 uncached input tokens, 5,000 billed output tokens, 200 requests per day, and 30 days. It excludes ancillary charges and assumes those token counts for illustration, not equal task quality or equal tokenization across providers.

```text
request cost = (uncached input × input rate
              + cached input × cache-hit rate
              + billed output × output rate) / 1,000,000
              + tool fees + cache-write fees + other fees
month estimate = request cost × requests per day × 30
```

Select the model, date, region, service tier, input-length tier, and cache treatment before calculating. Include billed reasoning tokens where applicable. Unknown prices stay null and display “Check pricing.” Google rows marked official_search_index_only are reference figures with calculation disabled until a live numeric rate is reconfirmed. Never silently multiply or stack discounts that the provider has not documented as compatible.

### Benchmarks: shared copy

A benchmark is evidence about a test setup. Use it to form a hypothesis, then test the model on your work.

Suggested tracks: coding with executable tests; reasoning with a known answer; extraction with field-level labels; multimodal questions with evidence locations; and tool workflows with verified outcomes. Keep supplied-evidence tasks separate from search-enabled tasks. Record model ID, benchmark version, effort, tools, harness, attempts, token budget, source, and date.

No new numeric leaderboard is supplied here. Existing site scores were not independently audited. Empty state: “No comparable verified score is available for this view. Open the source or run the lab’s task set.” Never render missing scores as zero or combine different benchmark versions in one ranking.

### Patterns: shared interaction

Offer Solo, Planner + workers, and Advisor views. Let the learner compare the verified outcome, total cost, and elapsed time. Any animated “cost units” are illustrative units; label them and keep them separate from API dollar estimates. A prompt describing delegation needs actual routing and tool orchestration to execute it.

### Access: shared scenarios

For ordinary tasks, show the required model capability and endpoint. For an account-restricted model, show the documented access route. For an unverified case, say “Check provider documentation.” Do not copy Anthropic’s Fable/Mythos safeguard-routing diagram into another provider’s lab without evidence that the same mechanism exists there.

For tool actions, show what the model proposes, what the application executes, and where a person reviews the action. Use supplied or synthetic data in tutorial examples.

## 1. OpenAI models, hands on

**Provider:** OpenAI

**Hero copy:** Match the model to the job. Compare Astra, Sol, Terra, and Luna, estimate a real workload, connect the tools you need, and complete seven practical missions.

### Family

**Simple:** Astra tackles the hardest work. Sol balances capability and cost. Terra is geared toward visual work, computer interaction, and writing. Luna handles focused work that repeats.

**Technical:** The current flagship catalog lists text-and-image input, text output, approximately 1.05M context, and 128K maximum output for these four models. Supported effort levels differ: Astra and Sol start at low; Terra and Luna also offer none.

| Model | API ID | Card copy |
|---|---|---|
| GPT-6 Astra | `gpt-6-astra` | For difficult reasoning, complex code, and demanding professional work. |
| GPT-6.1 Sol | `gpt-6.1-sol` | For complex work when you also need to manage time and cost. |
| GPT-6.1 Terra | `gpt-6.1-terra` | For visual reasoning, computer use, concise writing, and scoped code changes. |
| GPT-6 Luna | `gpt-6-luna` | For classification, routing, extraction, and other focused tasks at volume. |

Sources: [oa_models](https://developers.openai.com/api/docs/models), [oa_guide](https://developers.openai.com/api/docs/guides/latest-model).

### Ways in

- **Explore:** Use the official model-selection guide to match your workflow to the models available in ChatGPT or Codex. Product access and settings can differ from the API. [Official guide](https://developers.openai.com/api/docs/guides/model-selection).

- **Build:** Use the OpenAI API quickstart and Responses API to call an explicit model ID. [Official guide](https://developers.openai.com/api/docs/quickstart).

### Pick a model

Suggested lab routing, based on the official model-selection guidance. A quality-first learner can start with Astra, establish a baseline, then test cheaper candidates against it.

| If the learner needs… | Suggest… |
|---|---|
| Quick extraction or routing | GPT-6 Luna |
| Visual tasks, writing from supplied material, scoped fixes | GPT-6.1 Terra |
| Complex work with a cost constraint | GPT-6.1 Sol |
| Hard, ambiguous, or extended professional work | GPT-6 Astra |

### Cost lab

At fixed token counts, Astra costs five times Sol, and Sol costs twice Terra. Use the calculator to ask whether the difference buys better completed work. Actual token use may differ.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| gpt-6-astra — Standard | $10 | $50 | $0.45 | $2,700 |
| gpt-6.1-sol — Standard | $2 | $10 | $0.09 | $540 |
| gpt-6.1-terra — Standard | $1 | $5 | $0.045 | $270 |
| gpt-6-luna — Standard | $0.1 | $0.5 | $0.0045 | $27 |

Sources: [oa_models](https://developers.openai.com/api/docs/models).

### Benchmarks

Build a task set with repository fixes, source-grounded writing, and screenshot interpretation. Compare the four models on the same inputs and acceptance criteria. Show a completed-task rate next to cost and elapsed time.

### Patterns

Suggested pattern: Sol handles routine work, Luna extracts and routes, Terra handles suitable visual or writing subtasks, and Astra reviews difficult decisions. In a custom app, the orchestrator must implement the routing and verification; a prompt alone does not create a working multi-model system.

### Access

Use the general models for the general lab. OpenAI lists separate cybersecurity and life-sciences offerings; the catalog explicitly describes Rosalind as intended for approved organizations. Link to the relevant access documentation before adding specialist missions. Model names, effort settings, and product entitlements are separate choices.

Sources: [oa_models](https://developers.openai.com/api/docs/models), [oa_select](https://developers.openai.com/api/docs/guides/model-selection).

### Try it: seven missions

**1. Meet the family — Beginner**

Run the same prompt on Sol and Luna.

> Turn these rough notes into five actions. Preserve every owner and deadline. Use “unspecified” where the notes omit one: <notes>

**Done when:** Check every extracted field against the notes.

**2. Try visual reasoning — Beginner**

Give Terra a screenshot you are allowed to share.

> Describe the visible problem in this screen. Cite the visual evidence and separate observations from hypotheses.

**Done when:** Count claims supported by the screenshot.

**3. Change the effort — Builder**

Compare two supported effort settings on the same model.

> Find the bug in this function. Give a minimal failing example and a corrected implementation: <function>

**Done when:** Run the example and compare time, tokens, and correctness.

**4. Give it a contract — Builder**

Ask Sol to produce a plan against explicit requirements.

> Propose a migration plan for <module>. Include acceptance checks, rollback steps, and unanswered questions.

**Done when:** Have another person check the plan against the requirements.

**5. Escalate a difficult case — Expert**

Compare Sol’s result with Astra’s result.

> Review this proposed fix for concurrency failures. Identify a concrete failure schedule or explain what evidence is missing: <fix>

**Done when:** Use a reproducible test to decide which answer helps.

**6. Build a router — Expert**

In your application, route easy and difficult test cases to different models.

> Classify this task as bounded or open-ended. State the evidence for that label and a measurable success condition: <task>

**Done when:** Log actual model IDs and compare the routed workflow with one-model execution.

**7. Call it from code — Expert**

Run the Responses API example in the appendix.

> Review this function for bugs and return one minimal failing test: <function>

**Done when:** Record response.model, usage, and a test result.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Which model is aimed at focused, high-volume tasks?**

Luna / Astra / The image-generation model

**Answer:** Luna. Luna occupies the efficient execution role in the current catalog.

**Can API and app access be assumed identical?**

Yes / No / Only for paid users

**Answer:** No. Check the product’s available models, tools, and settings separately.

### What’s new

Current catalog snapshot: GPT-6 Astra, GPT-6.1 Sol, GPT-6.1 Terra, and GPT-6 Luna are listed. For dated release entries, use the API changelog; “checked today” is not a release date.

Sources: [oa_models](https://developers.openai.com/api/docs/models), [oa_news](https://developers.openai.com/api/docs/changelog).

## 2. Gemini models, hands on

**Provider:** Google DeepMind

**Hero copy:** Choose a reasoning model, a fast execution model, or a specialist for voice and media. Compare the results on text, documents, and visual inputs, then price the workflow you actually run.

### Family

**Simple:** Carbon is the strongest reasoning option in the current Gemini 4 catalog. Argon is the more efficient Gemini 4 option. Flash and Flash-Lite offer additional choices for repeated work. Voice and generated media have dedicated models.

**Technical:** Carbon accepts text, image, video, audio, and PDF and returns text. Its 1,048,576-token context is a unified input/output limit. Default synchronous output is 65,536 tokens; long decode supports more under its documented workflow. Carbon supports tools and structured output, but does not itself provide image generation, audio generation, or the Live API.

| Model | API ID | Card copy |
|---|---|---|
| Gemini 4 Carbon | `gemini-4-carbon` | For the most demanding reasoning and multimodal knowledge work. |
| Gemini 4 Argon | `gemini-4-argon` | For Gemini 4 reasoning with an emphasis on efficiency. |
| Gemini 3.8 Flash | `gemini-3.8-flash` | A Flash option for coding, agents, and enterprise workflows. |
| Gemini 3.5 Flash-Lite | `gemini-3.5-flash-lite` | For cost-sensitive, high-throughput execution. |

Sources: [g_models](https://aistudio.google.com/docs/models), [g_carbon](https://aistudio.google.com/docs/models/gemini-4-carbon).

### Ways in

- **Prototype:** Use Google AI Studio to inspect the available model and experiment with supplied inputs. [Official guide](https://aistudio.google.com/docs/models).

- **Build:** Use the Gemini API with an explicit model ID and check each model’s tool and modality support. [Official guide](https://aistudio.google.com/docs/models/gemini-4-carbon).

- **Voice and media:** Use the catalog’s Live, image, video, or speech models for the output you need. [Official guide](https://aistudio.google.com/docs/models).

### Pick a model

Suggested lab routing. First filter by required input, output, and tools; compare quality and cost only among compatible candidates.

| If the learner needs… | Suggest… |
|---|---|
| Routine high-volume processing | Gemini 3.5 Flash-Lite |
| A Flash baseline for agents and coding | Gemini 3.8 Flash |
| Difficult reasoning with efficiency in mind | Gemini 4 Argon |
| Most demanding multimodal reasoning | Gemini 4 Carbon |
| Real-time spoken conversation | A catalog-listed Live model |
| Generate an image or video | A catalog-listed image or video model |

### Cost lab

Price by date, model, modality, and service tier. The official indexed pricing lists Argon at $2/$10 through November 30, then $4/$20; Flash 3.8 at $0.75/$3.75 through December 31, then $1.50/$7.50. Prices are input/output per million tokens. Thinking tokens are included in output billing. Editorial verification note: the live pricing page rendered its headings but not numeric tables during this review. Reconfirm these indexed rates before enabling the calculator. Carbon has no verified numeric rate in this pack.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| gemini-4-carbon — Standard | — | — | Check pricing | Check pricing |
| gemini-4-argon — Standard; through 2026-11-30 | $2 | $10 | $0.09 | $540 |
| gemini-4-argon — Standard; from 2026-12-01 | $4 | $20 | $0.18 | $1,080 |
| gemini-3.8-flash — Standard; through 2026-12-31 | $0.75 | $3.75 | $0.03375 | $202.5 |
| gemini-3.8-flash — Standard; from 2027-01-01 | $1.5 | $7.5 | $0.0675 | $405 |
| gemini-3.5-flash-lite — Standard | $0.3 | $2.5 | $0.0185 | $111 |

Sources: [g_liveprices](https://aistudio.google.com/docs/pricing), [g_prices](https://ai.google.dev/gemini-api/docs/pricing).

### Benchmarks

Give each compatible model the same document, screenshot, and short video question. Score evidence location, factual correctness, omissions, latency, and cost. Test audio understanding separately from voice generation so the lab measures the intended capability.

### Patterns

Suggested pattern: a compatible efficient model extracts candidate facts from each input, Argon synthesizes them, and Carbon handles difficult exceptions. Keep evidence locations alongside extracted facts so a reviewer can verify the final answer.

### Access

The pricing documentation excludes Gemini 4 from the free API tier. Consumer plans and API billing should be checked separately. Tool support varies: Carbon’s support for audio input does not mean it generates speech. Present the specific endpoint and capability needed for every mission.

Sources: [g_prices](https://ai.google.dev/gemini-api/docs/pricing), [g_carbon](https://aistudio.google.com/docs/models/gemini-4-carbon).

### Try it: seven missions

**1. Compare the family — Beginner**

Run one document question on Flash and Argon.

> From this document, list five decisions and quote the short evidence phrase for each. Say when a decision is only implied.

**Done when:** Check every evidence phrase in the original.

**2. Read a screenshot — Beginner**

Use an input-compatible model on a screenshot.

> Explain the chart in this screenshot. State units, visible trend, and two things the image does not establish.

**Done when:** Check axes, units, and unsupported claims.

**3. Understand a clip — Builder**

Use a model that lists video input support.

> Create a timeline of visible events in this short clip. Include timestamps and mark uncertain actions.

**Done when:** Compare timestamps with the video.

**4. Find the right output — Builder**

Compare a text model with the relevant media workflow.

> Write a storyboard for a 10-second product demonstration, including a shot list and voiceover.

**Done when:** Use the storyboard as input to the separately selected video tool; compare it with the result.

**5. Ground a current claim — Expert**

Enable the supported search tool in the API or product.

> Find the current official documentation for <feature>. Give its status, evidence links, and the date checked.

**Done when:** Open the links and check whether they support the answer.

**6. Control the bill — Expert**

Repeat a measured workload with a shorter answer requirement.

> Answer the same question in no more than 150 words, preserving all decision-critical evidence: <question>

**Done when:** Compare billed tokens and task quality; include search charges where used.

**7. Call it from code — Expert**

Use the Gemini API example in the appendix.

> Return three risks in this migration plan and a check for each: <plan>

**Done when:** Record model, usage metadata, time, and acceptance checks.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Does Carbon’s audio input support imply spoken output?**

Yes / No / Only for short clips

**Answer:** No. Its model page lists text output and no audio generation.

**What changes an introductory API price?**

The date and published pricing terms / The chat title / A longer prompt alone

**Answer:** The date and published pricing terms. Store effective dates and avoid silently keeping expired rates.

### What’s new

Carbon’s model page says “Latest update: November 2026”; no release day is inferred here. The catalog says Gemini 2.5 Pro and Flash API requests will auto-route to newer models on December 1, 2026. Review migration guidance before that date.

Sources: [g_carbon](https://aistudio.google.com/docs/models/gemini-4-carbon), [g_models](https://aistudio.google.com/docs/models).

## 3. Grok, hands on

**Provider:** xAI / Grok

**Hero copy:** Separate the reasoning model from its search tools. Compare a supplied-evidence answer with a grounded answer, then measure the cost of the complete workflow.

### Family

**Simple:** Grok 4.7 is the general-purpose flagship. Imagine and Voice cover other output types. Current information requires the relevant search tools.

**Technical:** The model catalog lists Grok 4.7 with 500K context and configurable reasoning. Web Search and X Search supply current information; the model alone is not a live feed.

| Model | API ID | Card copy |
|---|---|---|
| Grok 4.7 | `grok-4.7` | For general reasoning, coding, and tool-based workflows. |

Sources: [x_models](https://docs.x.ai/developers/models).

### Ways in

- **Explore:** Use Grok or the API console playground, checking which model and tools the surface exposes. [Official guide](https://docs.x.ai/developers/models).

- **Build:** Use the API and enable Web Search or X Search when the task needs current sources. [Official guide](https://docs.x.ai/developers/models).

- **Other outputs:** Select Imagine for image/video workflows or Voice for speech workflows. [Official guide](https://docs.x.ai/developers/models).

### Pick a model

Suggested routing: choose required tools and output first. Compare versions using measured results rather than assuming recency guarantees a win.

| If the learner needs… | Suggest… |
|---|---|
| General reasoning or coding | Grok 4.7 |
| Current web or X information | Grok 4.7 with the relevant search tool |
| Image, video, or voice output | The corresponding specialist API |

### Cost lab

The main pricing table sets a 200K long-context threshold and charges the long-context rate for the whole request. Grok 4.7 Fast is a distinct serving option limited to Cursor and Grok Build, not a public API model ID. Keep it separate from standard API pricing.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| grok-4.7 — Standard; input < 200,000 | $2 | $6 | $0.07 | $420 |
| grok-4.7 — Long context; input ≥ 200,000 | $4 | $12 | Not applicable¹ | Not applicable¹ |

¹ The 20K-input example does not qualify for a long-context rate. Use an input above the threshold to calculate that tier.

Sources: [x_prices](https://docs.x.ai/developers/pricing).

### Benchmarks

Use two tracks: closed-book reasoning over supplied material, and current-information research with search enabled. Score citation validity and freshness in the second track. Include tool fees and repeated searches in the reported cost.

### Patterns

Suggested pattern: retrieve candidate claims, build a claim-to-source table, check contradictions, then draft the answer. A second pass should verify that every current factual claim has supporting evidence.

### Access

The presence of an X integration does not give every API response automatic live knowledge. The lab should show whether search is enabled, which tool ran, and the sources actually returned.

Sources: [x_models](https://docs.x.ai/developers/models).

### Try it: seven missions

**1. Separate memory from evidence — Beginner**

Ask about a supplied article.

> Summarize this article into five claims. Attach one evidence phrase to each: <article>

**Done when:** Check all five against the article.

**2. Spot stale information — Beginner**

Compare a supplied-data answer with a search-enabled answer.

> What is the current status of <public project>? Use dated primary sources and distinguish announcements from completed changes.

**Done when:** Verify dates and links.

**3. Audit X evidence — Builder**

Where available, enable X Search.

> Find public statements about <topic>. Distinguish first-hand statements, commentary, and unverified reports.

**Done when:** Check attribution in the original posts.

**4. Review code — Builder**

Give Grok a small function.

> Find a failing input for this function and suggest the smallest correction: <function>

**Done when:** Run the test.

**5. Measure a context threshold — Expert**

Use synthetic inputs on either side of the published tier threshold.

> Extract the requested IDs from the supplied records: <records>

**Done when:** Check the selected rate and all-request billing.

**6. Verify a research answer — Expert**

Run a source verification pass.

> For each claim below, state whether the linked source directly supports it. Flag mismatched dates and missing context: <claims and links>

**Done when:** Open a sample of original sources.

**7. Record a real run — Expert**

Use the official API quickstart linked from the model catalog.

> Explain the root cause in this public bug report using only supplied evidence: <report>

**Done when:** Log model, tools, tokens, time, and verified result.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Is Grok automatically current without search tools?**

Yes / No / Only on weekends

**Answer:** No. The catalog explicitly says current information requires search tools.

**Is Grok 4.7 Fast a public API option?**

Yes / No / It is a free tier

**Answer:** No. The pricing page limits it to Cursor and Grok Build.

### What’s new

The official catalog lists Grok 4.7 as flagship. This pack does not infer a launch day from a crawl date or the documentation footer.

Sources: [x_models](https://docs.x.ai/developers/models).

## 4. Mistral models, hands on

**Provider:** Mistral AI

**Hero copy:** Compare a large model with an efficient one, discover specialist document and audio tools, and distinguish hosted API pricing from running weights yourself.

### Family

**Simple:** Large 4 is the general-purpose multimodal flagship. Small 4 combines instruction following, reasoning, and coding in a smaller option. Specialist OCR and audio services address different jobs.

**Technical:** Large 4’s current card lists 1M context and an open-weight release under the Mistral Ecosystem Open Weight License. The card now says GA; the older October 6 changelog describes its earlier preview state. Use the current model card for present availability.

| Model | API ID | Card copy |
|---|---|---|
| Mistral Large 4 | `mistral-large-4` | For general multimodal work and complex reasoning. |
| Mistral Small 4 | `mistral-small-2603` | For an efficient baseline across instruction, reasoning, and coding tasks. |

Sources: [m_models](https://docs.mistral.ai/models), [m_large](https://docs.mistral.ai/models/mistral-large-4), [m_small](https://docs.mistral.ai/models/mistral-small-4-0-26-03), [m_news](https://docs.mistral.ai/resources/changelogs).

### Ways in

- **Explore:** Use Vibe for the product experience and Studio’s Playground for API experiments. [Official guide](https://docs.mistral.ai/getting-started/platform-overview).

- **Build:** Use Studio for API keys and model calls. [Official guide](https://docs.mistral.ai/getting-started/platform-overview).

- **Deploy:** For an open-weight release, inspect the exact checkpoint, license, runtime requirements, and serving cost. [Official guide](https://docs.mistral.ai/models/mistral-large-4).

### Pick a model

Suggested lab routing. Compare extraction quality separately from the quality of the answer written from extracted text.

| If the learner needs… | Suggest… |
|---|---|
| General demanding multimodal work | Mistral Large 4 |
| Cost-sensitive general work | Mistral Small 4 |
| Document text extraction | The OCR service |
| Transcription or speech | The relevant Voxtral service |

### Cost lab

Hosted API rates and self-hosting costs answer different questions. For a deployment exercise, add GPU time, utilization, engineering, and operations to the model comparison. Open weights do not make inference cost-free.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| mistral-large-4 — Standard | $0.7 | $2.1 | $0.0245 | $147 |
| mistral-small-2603 — Standard | $0.15 | $0.6 | $0.006 | $36 |

Sources: [m_prices](https://docs.mistral.ai/inference/pricing).

### Benchmarks

Use a document task with a known answer, a multilingual task, and a code task. Score extraction and synthesis separately. For self-hosted comparisons, record quantization, hardware, serving runtime, and concurrency.

### Patterns

Suggested pattern: extract document content, normalize fields with a smaller model, and escalate inconsistent records to a larger model. Preserve page references through every step.

### Access

Treat each weight release’s license and deployment route as its own choice. A model hosted in Mistral Studio may come from another lab: a third-party DeepSeek or GLM listing does not make that model a Mistral-developed model.

Sources: [m_models](https://docs.mistral.ai/models), [m_large](https://docs.mistral.ai/models/mistral-large-4).

### Try it: seven missions

**1. Read the same task twice — Beginner**

Compare Large and Small on supplied notes.

> Extract every deadline and responsible person. Mark missing fields: <notes>

**Done when:** Measure exact extraction accuracy.

**2. Work across languages — Beginner**

Use parallel source passages.

> Summarize the same policy in English and <language>. Preserve all numerical limits: <policy>

**Done when:** Check numbers and meaning in both outputs.

**3. Separate OCR from reasoning — Builder**

Use a public scanned document.

> Using the extracted text, list all fees and the page on which each appears: <text>

**Done when:** Check OCR mistakes before judging the language model.

**4. Test code changes — Builder**

Use a small function and an executable test.

> Improve this function without changing documented behavior. Add a regression test: <function>

**Done when:** Run the test before and after.

**5. Inspect a deployment — Expert**

Review an exact model card and runtime proposal.

> Compare these deployment options by hardware cost, utilization, latency, and operational work: <options>

**Done when:** Use measured infrastructure figures.

**6. Route exceptions — Expert**

Create a mixed document set with ambiguous records.

> Extract fields and flag contradictions that need a second pass: <records>

**Done when:** Review the escalated records and missed exceptions.

**7. Measure end-to-end cost — Expert**

Use the hosted API or a measured serving endpoint.

> Produce a source-grounded answer to this document question: <question and sources>

**Done when:** Include extraction, generation, retries, and serving costs.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Does “open weight” mean zero serving cost?**

Yes / No / Only for vision

**Answer:** No. Hardware and operations still cost money.

**Is every model in Mistral’s catalog developed by Mistral?**

Yes / No / Only the largest ones

**Answer:** No. The catalog also lists third-party models.

### What’s new

Large 4’s current card is dated November 5, 2026 and marked GA. The October 6 changelog records the earlier preview launch; present both milestones with their own sources.

Sources: [m_large](https://docs.mistral.ai/models/mistral-large-4), [m_news](https://docs.mistral.ai/resources/changelogs).

## 5. DeepSeek models, hands on

**Provider:** DeepSeek

**Hero copy:** Compare Flash and Pro, experiment with thinking and tools, and see how cached input and peak hours change the bill.

### Family

**Simple:** Flash is the lower-priced option and supports vision in the current API table. Pro is another reasoning option but does not currently support vision on this endpoint. Test both on your own text tasks.

**Technical:** The API table maps deepseek-flash to DeepSeek-V4.1-Flash-1017 and deepseek-v4-pro to DeepSeek-V4-Pro-0813. Both list 1M context, up to 384K output, thinking/non-thinking modes, JSON, and tool calls.

| Model | API ID | Card copy |
|---|---|---|
| DeepSeek V4.1 Flash 1017 | `deepseek-flash` | For a lower-cost baseline, including supported image input. |
| DeepSeek V4 Pro 0813 | `deepseek-v4-pro` | For comparison on difficult text reasoning and coding tasks. |

Sources: [d_prices](https://api-docs.deepseek.com/quick_start/pricing/).

### Ways in

- **Build:** Use the documented OpenAI-format or Anthropic-format endpoint and its supported fields. [Official guide](https://api-docs.deepseek.com/quick_start/pricing/).

- **Search:** Search and Fetch are separately billed APIs; include them explicitly in a research workflow. [Official guide](https://api-docs.deepseek.com/quick_start/pricing/).

- **Explore releases:** Read the official release page for version-specific capabilities and open-weight information. [Official guide](https://api-docs.deepseek.com/news/news261017/).

### Pick a model

Suggested evaluation path. Pro’s name is not evidence that it wins every workload; use a scored comparison.

| If the learner needs… | Suggest… |
|---|---|
| Image understanding on the direct endpoint | DeepSeek Flash |
| Cost-sensitive text work | Start by evaluating Flash |
| Harder text work that fails your Flash checks | Compare Pro on the failed cases |

### Cost lab

Peak hours are 01:00–04:00 and 06:00–10:00 UTC, Monday–Friday excluding Chinese public holidays. Other hours are off-peak. Cache-hit and cache-miss input have different rates. Show a rate selector and disclose its timezone; do not apply one flat price to all requests.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| deepseek-flash — Peak | $0.3 | $1.2 | $0.012 | $72 |
| deepseek-flash — Off-peak | $0.15 | $0.6 | $0.006 | $36 |
| deepseek-v4-pro — Peak | $1.32 | $3.96 | $0.0462 | $277.2 |
| deepseek-v4-pro — Off-peak | $0.66 | $1.98 | $0.0231 | $138.6 |

Sources: [d_prices](https://api-docs.deepseek.com/quick_start/pricing/).

### Benchmarks

Use matched text reasoning and code tasks for Flash versus Pro. Use a separate image track for Flash. Compare thinking modes with the same acceptance checks and report total billed work.

### Patterns

Suggested pattern: Flash handles bounded extraction; cases that fail validation go to a second reasoning pass. Use Pro only when the second-pass results justify it. Search results should be passed as evidence with attribution.

### Access

Select by required modality before cost: the direct API currently lists vision for Flash and no vision for Pro. Compatibility with another provider’s request format does not promise identical tools or behavior.

Sources: [d_prices](https://api-docs.deepseek.com/quick_start/pricing/).

### Try it: seven missions

**1. Meet Flash — Beginner**

Use a short supplied record.

> Extract dates, names, and amounts from this record. Do not infer omitted values: <record>

**Done when:** Check each field.

**2. Try image input — Beginner**

Use Flash with a supported image.

> List the text and visible numerical values in this image. Mark anything unclear.

**Done when:** Compare with the original image.

**3. Compare thinking — Builder**

Run the same text problem in supported modes.

> Find a counterexample to this proposed algorithm or explain the assumptions needed: <algorithm>

**Done when:** Verify the counterexample with code.

**4. Compare Pro — Builder**

Use a task that failed the Flash baseline.

> Find the smallest fix for this reproducible failure: <code and failure>

**Done when:** Run the regression test.

**5. Observe caching — Expert**

Repeat a stable synthetic prefix and inspect reported usage.

> Answer the final query using only the supplied reference block: <reference and query>

**Done when:** Use actual cache-hit counts instead of assuming the whole prompt was cached.

**6. Price the schedule — Expert**

Evaluate peak and off-peak scenarios without generating traffic unnecessarily.

> Estimate this batch using both published schedules: <token counts>

**Done when:** Check UTC boundaries and public-holiday handling.

**7. Add retrieval — Expert**

Connect documented Search or Fetch in your own app.

> Answer this public-document question with evidence links: <question>

**Done when:** Record retrieval fees separately from generation.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Which direct-API model currently lists vision support?**

Flash / Pro / Both

**Answer:** Flash. The current pricing/capability table lists vision only for Flash.

**Which timezone defines peak hours?**

Your browser timezone / UTC / Pacific Time

**Answer:** UTC. Use the published UTC schedule and holiday exceptions.

### What’s new

The October 17, 2026 release page introduces V4.1 Flash 1017. The current API table says the legacy Flash names route to this version; display both the requested alias and resolved version when available.

Sources: [d_news](https://api-docs.deepseek.com/news/news261017/), [d_prices](https://api-docs.deepseek.com/quick_start/pricing/).

## 6. Muse models, hands on

**Provider:** Meta

**Hero copy:** Compare planning with repeated execution, choose Standard or Contributor mode deliberately, and measure a workflow that combines model roles.

### Family

**Simple:** Wonder handles complex, long-running work. Spark is the lower-cost agentic and coding option. Ember handles repeated, bounded execution.

**Technical:** The current comparison lists Wonder 1.0, Spark 1.3, and Ember 1.0 with 1,048,576-token context and multimodal inputs. Spark 1.3 is the recommended Spark version. The guide flags degraded audio quality on Spark 1.3 and recommends Spark 1.2 or Voice Transcribe for that need.

| Model | API ID | Card copy |
|---|---|---|
| Muse Wonder | `muse-wonder-1.0` | For complex software engineering and long-horizon agents. |
| Muse Spark 1.3 | `muse-spark-1.3` | For lower-cost agentic and coding work. |
| Muse Ember | `muse-ember-1.0` | For repeated execution, routing, and bounded subtasks. |

Sources: [meta_select](https://dev.meta.ai/docs/choose-a-model).

### Ways in

- **Build:** Call Meta Model API using the documented request surface. [Official guide](https://dev.meta.ai/docs/overview).

- **Code:** Use Muse Code or a documented integration with an existing agent. [Official guide](https://dev.meta.ai/docs/overview).

- **Self-host:** Explore the separate Spark Open or Glimmer releases and their requirements. [Official guide](https://dev.meta.ai/docs/overview).

### Pick a model

Suggested routing follows the current model-selection guide. Check availability for the chosen product and variant.

| If the learner needs… | Suggest… |
|---|---|
| Hard, long-running repository changes | Muse Wonder |
| Agent or coding work with a tighter cost target | Muse Spark 1.3 |
| High-volume bounded subtasks | Muse Ember |
| Audio understanding | Check the guide’s Spark 1.2 or transcription recommendation |

### Cost lab

Standard mode does not use your content to train Meta models. Contributor mode trades permission to train on submitted content and responses for a lower price or more usage. The pricing page says Muse Code subscriptions default to Contributor mode. Ember has a higher all-request rate above 200K input; Wonder and Spark do not have that long-context premium.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| muse-wonder-1.0 — Standard | $4 | $20 | $0.18 | $1,080 |
| muse-spark-1.3 — Standard | $1.25 | $4.25 | $0.04625 | $277.5 |
| muse-spark-1.3-contributor — Contributor | $0.1 | $0.2 | $0.003 | $18 |
| muse-ember-1.0 — Standard; input ≤ 200,000 | $0.1 | $0.5 | $0.0045 | $27 |
| muse-ember-1.0 — Long context; input > 200,000 | $0.3 | $1.5 | Not applicable¹ | Not applicable¹ |

¹ The 20K-input example does not qualify for a long-context rate. Use an input above the threshold to calculate that tier.

Sources: [meta_prices](https://dev.meta.ai/docs/pricing-rate-limits).

### Benchmarks

Compare a long repository task and many bounded extraction tasks. Record whether the stronger model planned and verified the work or merely generated a plan. Compare at the same data-use mode and include every worker call.

### Patterns

Suggested pattern: Wonder or Spark plans and checks the outcome; Ember executes well-scoped tasks. Define a result schema and acceptance check for each worker before comparing the combined workflow with solo execution.

### Access

Wonder Full is a Muse Code-only variant, not an API model selected by setting reasoning effort to max. Contributor mode is a data-use choice, not a capability or safety setting. Display it before the user sends content.

Sources: [meta_select](https://dev.meta.ai/docs/choose-a-model), [meta_prices](https://dev.meta.ai/docs/pricing-rate-limits).

### Try it: seven missions

**1. Meet Spark — Beginner**

Use synthetic task notes.

> Organize these notes into decisions, actions, and unanswered questions: <notes>

**Done when:** Check every claim.

**2. Meet Ember — Beginner**

Use a set of labeled example records.

> Classify each ticket as billing, bug, or feature request and give a short evidence phrase: <tickets>

**Done when:** Compare with known labels.

**3. Review the mode — Builder**

Read the account’s data-use setting before submitting real material.

> List what content this workflow sends and whether each item is suitable for the selected data-use mode: <workflow>

**Done when:** Confirm against the actual setting and policy.

**4. Try a difficult change — Builder**

Compare Spark and Wonder on a small repository task.

> Fix <reproducible bug>. First write a regression test; report all changed files.

**Done when:** Run the test and inspect the diff.

**5. Split planning and execution — Expert**

Implement separate planner and worker calls.

> Split this task into independently checkable subtasks. Give inputs, output schema, and a test for each: <task>

**Done when:** Check the worker’s actual output and planner verification.

**6. Check long-context rates — Expert**

Estimate the Ember bill for two synthetic input sizes.

> Compare this workload below and above 200K input tokens using the published all-request rates: <counts>

**Done when:** Check the exact threshold.

**7. Compare the complete workflow — Expert**

Run a repeatable benchmark in your application.

> Complete <task> and return the acceptance evidence.

**Done when:** Log every model call, mode, token count, and verified outcome.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**What changes when you choose Contributor mode?**

Only answer length / Permission to use your content for model training / The context window alone

**Answer:** Permission to use your content for model training. Choose the mode based on the permitted use of your content.

**Does max effort select Wonder Full on the API?**

Yes / No / Only for image input

**Answer:** No. The guide identifies Wonder Full as available only in Muse Code.

### What’s new

The current catalog includes Wonder, Spark 1.3, and Ember. Release dates are not asserted here because the reviewed comparison and pricing pages do not establish them.

Sources: [meta_select](https://dev.meta.ai/docs/choose-a-model), [meta_prices](https://dev.meta.ai/docs/pricing-rate-limits).

## 7. Qwen models, hands on

**Provider:** Alibaba / Qwen

**Hero copy:** Move between Max, Plus, and Flash, use the same general model on text and visual input, and learn why region and context tier belong in every cost estimate.

### Family

**Simple:** Max prioritizes capability, Plus balances capability and cost, and Flash prioritizes cost. Evaluate the exact version available in your deployment region.

**Technical:** The current Model Studio guide recommends qwen3.8-max, qwen3.7-plus, and qwen3.8-flash. All three list 1M context, text/image/video input, thinking, function calling, built-in tools, and structured output.

| Model | API ID | Card copy |
|---|---|---|
| Qwen3.8 Max | `qwen3.8-max` | For higher reasoning and understanding requirements. |
| Qwen3.7 Plus | `qwen3.7-plus` | A balanced starting point. |
| Qwen3.8 Flash | `qwen3.8-flash` | For cost-sensitive repeated work. |

Sources: [q_models](https://www.alibabacloud.com/help/en/model-studio/text-generation-model).

### Ways in

- **Build:** Use Alibaba Cloud Model Studio and choose the region and deployment scope explicitly. [Official guide](https://www.alibabacloud.com/help/en/model-studio/text-generation-model).

- **Choose a specialist:** Use the task-specific guides for OCR, translation, long documents, and research. [Official guide](https://www.alibabacloud.com/help/en/model-studio/text-generation-model).

### Pick a model

Suggested routing follows Model Studio’s guide. Hosted model names and available open-weight checkpoints are separate catalog choices.

| If the learner needs… | Suggest… |
|---|---|
| Balanced starting point | Qwen3.7 Plus |
| Higher reasoning requirements | Qwen3.8 Max |
| Cost-sensitive bounded work | Qwen3.8 Flash |
| Specialist extraction or translation | Compare the relevant specialist with your general-model baseline |

### Cost lab

These rows use Singapore / International list pricing. The Plus alias currently advertises a temporary discount, excluded from this baseline. Other regions, deployment scopes, and promotions differ. For tiered prices, the input size selects the rate for the whole request.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| qwen3.8-max — Standard; Singapore / International | $2 | $6 | $0.07 | $420 |
| qwen3.7-plus — List price, short context; Singapore / International; input ≤ 256,000 | $0.4 | $1.6 | $0.016 | $96 |
| qwen3.7-plus — List price, long context; Singapore / International; input > 256,000 | $1.2 | $4.8 | Not applicable¹ | Not applicable¹ |
| qwen3.8-flash — Standard; Singapore / International | $0.15 | $0.47 | $0.00535 | $32.1 |

¹ The 20K-input example does not qualify for a long-context rate. Use an input above the threshold to calculate that tier.

Sources: [q_prices](https://www.alibabacloud.com/help/en/model-studio/model-pricing).

### Benchmarks

Use matched English and Chinese tasks, a screenshot task, and a code task. Score factual preservation, structured field accuracy, and executable correctness. Report the region and model ID with each result.

### Patterns

Suggested pattern: Flash extracts records, Plus writes routine summaries, and Max handles difficult contradictions. Apply one validation schema across the routes so quality is compared consistently.

### Access

Region and invocation methods vary by model. A model listing elsewhere does not establish availability on your endpoint. Confirm the required tools and deployment scope before enabling a mission.

Sources: [q_models](https://www.alibabacloud.com/help/en/model-studio/text-generation-model), [q_prices](https://www.alibabacloud.com/help/en/model-studio/model-pricing).

### Try it: seven missions

**1. Meet Plus — Beginner**

Use supplied notes.

> Turn these notes into a concise decision log with evidence phrases: <notes>

**Done when:** Check factual preservation.

**2. Compare languages — Beginner**

Use the same source in a bilingual task.

> Summarize this policy in English and Chinese without changing dates, quantities, or conditions: <policy>

**Done when:** Check all numbers and conditions.

**3. Read a screen — Builder**

Supply a screenshot.

> Extract visible labels and values into a table. Mark unclear text: <image>

**Done when:** Compare with the original.

**4. Compare Flash — Builder**

Use the same labeled extraction set on Flash and Plus.

> Extract these fields without inventing missing values: <records and schema>

**Done when:** Measure field accuracy and cost.

**5. Escalate to Max — Expert**

Use failed or ambiguous cases from the baseline.

> Resolve this contradiction using only the supplied evidence. Say if the evidence is insufficient: <case>

**Done when:** Check whether escalation improved the answer.

**6. Price your region — Expert**

Select exact region, scope, and token tier.

> Estimate this workload with the selected region’s published list rates: <counts>

**Done when:** Compare with the correct table, not a different region’s headline price.

**7. Build a validated output — Expert**

Enable the documented structured-output mode in your app.

> Extract the requested fields according to this schema: <schema and input>

**Done when:** Validate the returned JSON and compare field values with the source.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Which model does the current guide suggest as the balanced start?**

Qwen3.7 Plus / An unspecified qwen-latest alias / Every model equally

**Answer:** Qwen3.7 Plus. The guide explicitly recommends qwen3.7-plus as its balanced starting point.

**Is one regional price valid for all Model Studio deployments?**

Yes / No / Only for Flash

**Answer:** No. Record region, deployment scope, context tier, and promotion terms.

### What’s new

The model guide reviewed here was updated November 5, 2026, and the pricing page November 7. These are documentation update dates, not inferred model launch dates.

Sources: [q_models](https://www.alibabacloud.com/help/en/model-studio/text-generation-model), [q_prices](https://www.alibabacloud.com/help/en/model-studio/model-pricing).

## 8. Kimi models, hands on

**Provider:** Moonshot AI / Kimi

**Hero copy:** Explore long-context coding and document work, distinguish product subscriptions from API usage, and measure a long task with explicit evidence and stopping conditions.

### Family

**Simple:** Kimi K3.1 Pro is Moonshot’s current flagship for demanding agentic work. K3 provides another model to compare. Use an exact ID and verify access before starting.

**Technical:** K3-series documentation lists a 1,048,576-token context window. K3.1 Pro uses the ID kimi-k3.1-pro, always enables thinking, and accepts low, high, or max reasoning effort, defaulting to max. A high-speed variant is separately listed.

| Model | API ID | Card copy |
|---|---|---|
| Kimi K3.1 Pro | `kimi-k3.1-pro` | For demanding long-horizon coding and complex agentic work. |
| Kimi K3 | `kimi-k3` | A second K3-series baseline for your task set. |

Sources: [k_home](https://www.moonshot.ai/), [k_prices](https://platform.kimi.ai/docs/pricing/chat), [k_pro](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart).

### Ways in

- **Explore:** Use Kimi’s product experience for supported document and creation workflows. [Official guide](https://www.moonshot.ai/).

- **Code:** Use the separately offered Kimi Code product and its plan details. [Official guide](https://www.moonshot.ai/).

- **Build:** Use the Kimi API platform and the documented model IDs. [Official guide](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart).

### Pick a model

Suggested evaluation path. Do not assume that a product subscription grants equivalent API credit or identical model access.

| If the learner needs… | Suggest… |
|---|---|
| Demanding long-context agentic work | Evaluate Kimi K3.1 Pro |
| Compare another K3-series baseline | Kimi K3 |
| Need a high-speed variant | Check the separately listed variant’s availability and price |

### Cost lab

No numeric Kimi rates are asserted in this pack: the readable inference-pricing page did not expose a rate table. It does state that supported K3 batch requests are billed at 60% of standard pricing, and that caching can add TTL-dependent write charges. Verify the complete rate before enabling calculation.

| Model / rate condition | Input / 1M | Output / 1M | Worked request | 30-day estimate |
|---|---:|---:|---:|---:|
| kimi-k3.1-pro — Standard | — | — | Check pricing | Check pricing |
| kimi-k3 — Standard | — | — | Check pricing | Check pricing |

Sources: [k_prices](https://platform.kimi.ai/docs/pricing/chat).

### Benchmarks

Use a long document with facts planted near the beginning, middle, and end, plus a repository change with explicit regression tests. Measure retrieval accuracy and completed work rather than prompt capacity alone.

### Patterns

Suggested pattern: inspect and index the evidence, plan the task, execute bounded steps, and stop at defined checkpoints. Keep a ledger of evidence, changed files, tests, and remaining uncertainty.

### Access

The Pro quickstart says the flagship unlocks after a successful top-up of at least $1. API inference is pay-as-you-go and separate from Kimi membership and Kimi Code. Check the exact account and endpoint rather than assuming product access transfers.

Sources: [k_pro](https://platform.kimi.ai/docs/guide/kimi-k3-1-pro-quickstart), [k_prices](https://platform.kimi.ai/docs/pricing/chat).

### Try it: seven missions

**1. Meet Kimi — Beginner**

Use a supplied public document.

> Write a decision brief with five findings, an evidence location for each, and three unresolved questions.

**Done when:** Check every location.

**2. Test long context — Beginner**

Use a synthetic document with known facts in different sections.

> Find every occurrence of <target fact> and identify conflicting versions.

**Done when:** Compare with the known source set.

**3. Write a change plan — Builder**

Use a small repository task.

> Plan this change with explicit file dependencies, regression checks, and a stopping point: <task>

**Done when:** Review the plan before execution.

**4. Compare effort — Builder**

Use two documented effort settings on Pro.

> Find a reproducible counterexample to this implementation: <code>

**Done when:** Run it and compare time and tokens.

**5. Track a long task — Expert**

Use a multi-step task with a fixed acceptance check.

> Complete <task>. At each checkpoint, report verified work, failed checks, and the next bounded step.

**Done when:** Check the work ledger against actual artifacts.

**6. Evaluate caching — Expert**

Use a stable synthetic prefix and recorded usage.

> Answer this query from the reference material: <reference and query>

**Done when:** Include cache write and hit charges once rates are verified.

**7. Call the API — Expert**

Follow the official Pro quickstart.

> Review this function and return the smallest failing example: <function>

**Done when:** Record model, effort, usage, and test outcome.

### Quiz

Use the six shared questions below, then these two provider-specific questions. In the JSON, each provider contains all eight complete questions.

**Can K3.1 Pro’s thinking be assumed disabled by default?**

Yes / No / Only in batch

**Answer:** No. Its guide says thinking is always enabled, with configurable effort.

**Does Kimi membership automatically equal API credit?**

Yes / No / Only for coding

**Answer:** No. The API pricing guide distinguishes pay-as-you-go inference from memberships and Kimi Code.

### What’s new

Moonshot’s homepage dates K3.1 Pro to October 24, 2026. The API pricing page says K2 models closed to new users on October 31 and are planned for retirement by the end of December 2026.

Sources: [k_home](https://www.moonshot.ai/), [k_prices](https://platform.kimi.ai/docs/pricing/chat).

## Six shared quiz questions

**What should decide whether a cheaper model is good enough?**

Its name / Results on representative tasks / Its parameter count alone

**Answer:** Results on representative tasks. Use examples with known acceptance criteria and compare quality, latency, and cost.

**Does a larger context window guarantee perfect recall?**

Yes / No / Only for PDFs

**Answer:** No. Capacity is a limit, not a guarantee that the model will use every detail correctly.

**Which number helps you price a working agent?**

Cost per successful completed task / Input price alone / The longest possible answer

**Answer:** Cost per successful completed task. Retries, tools, output, and failed attempts can change the total.

**What makes a benchmark comparison useful?**

The same benchmark version and comparable settings / A larger bar / A provider logo

**Answer:** The same benchmark version and comparable settings. Record tools, effort, token budget, harness, date, and model version.

**What should happen before a tool makes an important external change?**

Nothing / Review the planned action and apply the workflow’s approval rules / Increase temperature

**Answer:** Review the planned action and apply the workflow’s approval rules. Separate proposing an action from executing it.

**How should an unavailable price appear?**

As zero / As a verified free tier / As unknown, with a pricing link

**Answer:** As unknown, with a pricing link. Unknown and free have different meanings.

## API mission appendix

These are minimal text-call examples, not live-tested requests. No API keys were used and no paid inference was run while preparing this pack. Tool-enabled workflows require their documented tool configuration. Keep keys on the server or in the environment.

### OpenAI

Install the official Python SDK (`pip install openai`) and set `OPENAI_API_KEY`.

```python
from openai import OpenAI

client = OpenAI()
response = client.responses.create(
    model="gpt-6.1-sol",
    input="Name three migration risks and a verification check for each.",
    max_output_tokens=1024,
)
print(response.output_text)
print(response.usage)
```

[Official OpenAI quickstart](https://developers.openai.com/api/docs/quickstart).

### Google Gemini

Install the Google Gen AI SDK (`pip install google-genai`) and set `GEMINI_API_KEY`.

```python
import os
from google import genai
from google.genai import types

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
response = client.models.generate_content(
    model="gemini-4-argon",
    contents="Name three migration risks and a verification check for each.",
    config=types.GenerateContentConfig(max_output_tokens=2048),
)
print(response.text)
print(response.usage_metadata)
```

[Official Gemini getting-started guide](https://aistudio.google.com/docs/get-started). Confirm the current SDK example before publishing; this sample was not executed.

## Editorial gaps to resolve before publishing

- **Google:** Model capabilities were read in the live official UI. Numeric reference rates came from the official search index because the live pricing tables did not render. Reconfirm them; Carbon’s rate remains unknown.
- **Kimi:** Verify numeric prices, cache-write charges, and high-speed pricing directly in the current table or console. No unverified $2/$10 rate was carried over from the existing site.
- **Benchmarks:** Supply cited, comparable measurements before adding numerical bars. This content pack provides exercises and comparison rules, not new measured rankings.
- **Availability:** The listed public routes do not establish access for a particular account, region, or subscription.
- **Other providers:** Z.ai/GLM, MiniMax, Cohere, Amazon Nova, and NVIDIA Nemotron could receive additional chapters. They were not covered in this pass; no ranking exclusion is implied.

## Integration notes

Use the provider selector above the existing lab rather than duplicating the entire page navigation. Keep each provider’s progress isolated. Each price record must be selected by its conditions; do not sum rows for one model. Hide or disable calculations when any required rate is missing or not fully verified. Benchmark scores are deliberately an empty array. Link sources next to facts and show “checked on” separately from “released on.”
