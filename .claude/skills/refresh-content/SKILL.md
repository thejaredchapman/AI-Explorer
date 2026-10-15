---
name: refresh-content
description: Refresh AI-Explorer model data (src/data/llmData.js) against official provider pages. Use when asked for a content refresh or when the weekly routine runs.
---

# Refresh AI-Explorer content

Source of truth is each provider's official page. Never use third-party pricing aggregators; they disagreed with the providers in past refreshes.

## Sources

| Provider | Page |
| --- | --- |
| Anthropic | https://platform.claude.com/docs/en/models/overview |
| OpenAI | https://developers.openai.com/api/docs/pricing and `https://developers.openai.com/api/docs/models/<model-id>` |
| Google | https://ai.google.dev/gemini-api/docs/models, `/models/<model-code>` and `/pricing` |

Some pages return 403 to automated fetches. If a figure cannot be verified, leave the entry unchanged and list it in the PR body.

## Steps

1. Read `src/data/llmData.js` (`llmModels`, `dataAsOf`).
2. Compare each current model against the sources: `inputCost`, `outputCost`, `contextWindow`, `maxOutput`, retirement or "superseded" wording.
3. Add missing current models, copying the shape of a neighbouring entry. `category` and `pricingTier` must reuse existing values. `capabilities` are editorial 0-10 estimates.
4. Set `dataAsOf` to today (`date -u +%F`).
5. Run `npm run build` and `npx eslint src/data/llmData.js`. Both must pass.
6. Commit on a branch named `content-refresh-YYYY-MM-DD` and open a PR to `main` listing every change with its source URL, plus anything unverified. Never push to `main` or merge.

If nothing but `dataAsOf` would change, stop without opening a PR.

## Out of scope for the weekly run

Non-model data (resources, guides, free learning links, skills, tools) is refreshed manually.
