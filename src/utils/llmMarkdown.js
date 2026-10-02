import { llmModels, capabilityLabels, dataAsOf, hfIncident } from '../data/llmData';

const money = (n) => (n === 0 ? 'Free' : `$${n < 1 ? n.toFixed(2) : n}`);
const tokens = (n) => (n >= 1000000 ? `${+(n / 1000000).toFixed(2)}M` : `${Math.round(n / 1000)}K`);
const bullets = (items) => items.map((i) => `- ${i}`).join('\n');

export function formatAsOf(iso = dataAsOf) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
}

function modelSection(m) {
  const caps = Object.entries(m.capabilities)
    .map(([k, v]) => `${capabilityLabels[k]} ${v}/10`)
    .join(' · ');
  return `### ${m.name}

**${m.provider}** · ${m.category} · Released ${m.releaseDate}${m.isNew ? ' · NEW' : ''}

${m.description}

- **Best for:** ${m.bestUseCase}
- **Context / max output:** ${tokens(m.contextWindow)} / ${tokens(m.maxOutput)} tokens
- **Price per 1M tokens:** ${money(m.inputCost)} in / ${money(m.outputCost)} out (${m.pricingTier})
- **Parameters:** ${m.parameters} · ${m.openSource ? 'Open source' : 'Closed source'} · ${m.multimodal ? 'Multimodal' : 'Text only'}
- **Capability scores (editorial):** ${caps}
- **Strengths:** ${m.strengths.join('; ')}
- **Limitations:** ${m.limitations.join('; ')}
- **Docs:** ${m.docsUrl}`;
}

export function buildMarkdown() {
  const fresh = llmModels.filter((m) => m.isNew);
  const providers = [...new Set(llmModels.map((m) => m.provider))];

  const releases = fresh
    .map((m) => `| ${m.name} | ${m.provider} | ${m.releaseDate} | ${tokens(m.contextWindow)} | ${money(m.inputCost)} / ${money(m.outputCost)} |`)
    .join('\n');

  const catalog = providers
    .map((p) => `## ${p}\n\n${llmModels.filter((m) => m.provider === p).map(modelSection).join('\n\n')}`)
    .join('\n\n');

  return `# AI Model Comparison

> Data pulled: **${formatAsOf()}** (${dataAsOf}). Pricing, availability and benchmark claims change quickly. Verify against each provider's docs before relying on them. Capability scores are editorial estimates, not benchmark results.

${llmModels.length} models across ${providers.length} providers.

## New this cycle

| Model | Provider | Released | Context | Price in / out per 1M |
| --- | --- | --- | --- | --- |
${releases}

## Incident: ${hfIncident.title}

${hfIncident.summary}

${hfIncident.stats.map((s) => `- **${s.value}** ${s.label}`).join('\n')}

### Timeline

${hfIncident.timeline.map((t) => `- **${t.date}:** ${t.text}`).join('\n')}

### Impact

${bullets(hfIncident.impact)}

### Related

${hfIncident.related}

### Sources

${hfIncident.sources.map((s) => `- [${s.name}](${s.url})`).join('\n')}

# Model catalog

${catalog}
`;
}

export function downloadMarkdown() {
  const blob = new Blob([buildMarkdown()], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-model-comparison-${dataAsOf}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
