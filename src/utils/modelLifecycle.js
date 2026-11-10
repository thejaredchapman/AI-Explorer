import { llmModels } from '../data/llmData';

// Optional `lifecycle` field on a model in llmData.js. Omit it for active models.
//   status:      'legacy'     still available, provider recommends a newer model
//                'deprecated' still callable, has an announced retirement date
//                'retired'    no longer callable through the provider's API
//   retiresOn:   'YYYY-MM-DD' scheduled retirement (deprecated) or the date it retired (retired)
//   replacement: id of the recommended model in llmModels
//   source:      URL of the provider page the status came from
export const LIFECYCLE_LABELS = { legacy: 'Legacy', deprecated: 'Deprecated', retired: 'Retired' };

const byId = Object.fromEntries(llmModels.map((m) => [m.id, m]));

export const isRetired = (m) => m.lifecycle?.status === 'retired';

export const replacementFor = (m) => (m.lifecycle?.replacement ? byId[m.lifecycle.replacement] : undefined);

export const fmtDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

// One-line human summary, e.g. "Deprecated · retires Nov 30, 2026"
export function lifecycleSummary(m) {
  const lc = m.lifecycle;
  if (!lc || !LIFECYCLE_LABELS[lc.status]) return null;
  const label = LIFECYCLE_LABELS[lc.status];
  if (!lc.retiresOn) return label;
  return `${label} · ${lc.status === 'retired' ? 'retired' : 'retires'} ${fmtDate(lc.retiresOn)}`;
}

// Deprecated models with a retirement date today or later, soonest first.
export function upcomingRetirements(today = new Date().toISOString().slice(0, 10)) {
  return llmModels
    .filter((m) => m.lifecycle?.status === 'deprecated' && m.lifecycle.retiresOn && m.lifecycle.retiresOn >= today)
    .sort((a, b) => a.lifecycle.retiresOn.localeCompare(b.lifecycle.retiresOn));
}
