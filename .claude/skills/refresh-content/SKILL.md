---
name: refresh-content
description: Refresh AI-Explorer model data (src/data/llmData.js) against official provider pages, including pricing, limits, and model lifecycle (legacy, deprecated, retired, replacements). Use when asked for a content refresh or when the weekly routine runs.
---

# Refresh AI-Explorer content

Source of truth is each provider's official page. Never use third-party pricing aggregators; they disagreed with the providers in past refreshes.

## Sources

| Provider | Models and pricing | Lifecycle (deprecations) |
| --- | --- | --- |
| Anthropic | https://platform.claude.com/docs/en/models/overview | https://platform.claude.com/docs/en/about-claude/model-deprecations |
| OpenAI | https://developers.openai.com/api/docs/pricing and `https://developers.openai.com/api/docs/models/<model-id>` | https://developers.openai.com/api/docs/deprecations |
| Google | https://aistudio.google.com/docs/models, `/models/<model-code>` and `/pricing` (`ai.google.dev/gemini-api/docs/...` redirects here) | https://aistudio.google.com/docs/deprecations |

For other providers in `llmModels`, use their official deprecation or model-lifecycle page if one exists. Otherwise leave their `lifecycle` unchanged.

Some pages return 403 to automated fetches. If a figure cannot be verified, leave the entry unchanged and list it in the PR body.

## The `lifecycle` field

Each model may have an optional `lifecycle` object. Omit it for active models. The UI and the Markdown export read it through `src/utils/modelLifecycle.js`.

```js
lifecycle: {
  status: 'deprecated',            // 'legacy' | 'deprecated' | 'retired'
  retiresOn: '2026-11-30',         // YYYY-MM-DD: scheduled date (deprecated) or date it retired (retired)
  replacement: 'claude-sonnet-5-5', // an `id` that exists in llmModels
  source: 'https://platform.claude.com/docs/en/about-claude/model-deprecations',
},
```

- `legacy`: still available but the provider recommends a newer model and has not set a retirement date. Omit `retiresOn`.
- `deprecated`: still callable, retirement date announced.
- `retired` (OpenAI calls this "shut down"): no longer callable. Retired models are hidden in the UI by default, so keep the entry rather than deleting it.
- `replacement` must be the `id` of a model in `llmModels`. Use the provider's recommended replacement. If that model isn't in `llmModels`, add it (step 3) or omit `replacement` and say so in the PR body. Never invent a replacement the provider didn't name.
- Use dates from the provider's API deprecation page (the Claude API schedule for Anthropic), not cloud-partner schedules.
- When you add or change `lifecycle`, remove now-redundant free-text such as "Superseded by X" or "Legacy model" from `limitations` and `description`.

## Steps

1. Read `src/data/llmData.js` (`llmModels`, `dataAsOf`).
2. Compare each current model against the sources: `inputCost`, `outputCost`, `contextWindow`, `maxOutput`.
3. Add missing current models, copying the shape of a neighbouring entry. `category` and `pricingTier` must reuse existing values. `capabilities` are editorial 0-10 estimates.
4. Update `lifecycle` for every model from the lifecycle pages, following the rules above. Check every `replacement` with Grep for `id: '<replacement>'` in `src/data/llmData.js`.
5. Set `dataAsOf` to today (`date -u +%F`).
6. Run `npm run build` and `npx eslint src/data/llmData.js`. Both must pass.
7. Commit on a branch named `content-refresh-YYYY-MM-DD` and open a PR to `main` listing every change with its source URL, plus anything unverified. Put lifecycle changes in their own section of the PR body. Never push to `main` or merge.

If nothing but `dataAsOf` would change, stop without opening a PR.

## Out of scope for the weekly run

Non-model data (resources, guides, free learning links, skills, tools) is refreshed manually.
