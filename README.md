# AI-Explorer

An interactive field guide to AI: core concepts, a side-by-side model comparison (with a data-pulled date and Markdown export), products, code editors, resources and build guides. A draggable compass points at the section you are reading.

Built with React 19, Vite and Framer Motion.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build into dist/
```

Model data lives in `src/data/llmData.js` (`dataAsOf` is the date shown on the page). Section order, and each section's compass bearing, lives in `src/data/sections.js`.
