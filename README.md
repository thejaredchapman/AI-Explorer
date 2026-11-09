# AI-Explorer

An interactive field guide to AI: core concepts, a side-by-side model comparison (with a data-pulled date and Markdown export), products, code editors, resources and build guides. A draggable compass points at the section you are reading.

Built with React 19, Vite and Framer Motion.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Model data lives in `src/data/llmData.js` (`dataAsOf` is the date shown on the page). Section order, and each section's compass bearing, lives in `src/data/sections.js`.

Use cases live in `src/data/useCaseData.js` (50 per industry across ten industries, plus 100 creative ideas). Each entry is `[title, riskFlags]`; the A to D safety grade is computed from the flags by `gradeOf`, never stored. The Model Lab (Claude 5 family, ways in, cost lab, benchmarks, missions, quiz and the provider radar) lives in `src/data/modelLabData.js`; its `labAsOf` date and the radar are refreshed by hand.

Guided demo: click "Take the guided tour" on the home page, or open the site with `?demo=1`. It auto-advances every 9s; use the arrow keys to step, Space to play/pause and Esc to exit. The script (one stop per section, with narration) lives in `src/data/demoTour.js`; each stop's `id` must match a section in `src/data/sections.js`.
