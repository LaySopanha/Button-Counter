# Button Counter

A counter you click, with every click recorded in a database so the history is visible.

This is a project made by Group 5 in the Japanese IT Pathway Batch 1.

Live site: https://button-counter-seven.vercel.app

## Stack

| Layer     | Choice                         |
| --------- | ------------------------------ |
| Language  | TypeScript                     |
| Framework | SvelteKit 2 + Svelte 5 (runes) |
| Database  | Turso (libSQL)                 |
| Tests     | Vitest                         |
| CI        | GitHub Actions                 |
| Hosting   | Vercel                         |

## Getting started

```bash
npm install
cp .env.example .env   # fill in Turso credentials
npm run dev
```

Open http://localhost:5173.

## Scripts

| Command                | Does                            |
| ---------------------- | ------------------------------- |
| `npm run dev`          | Dev server with hot reload      |
| `npm run build`        | Production build                |
| `npm run preview`      | Serve the production build      |
| `npm run check`        | TypeScript + Svelte typecheck   |
| `npm run check:watch`  | Typecheck in watch mode         |
| `npm run test`         | Unit tests once                 |
| `npm run test:watch`   | Unit tests in watch mode        |
| `npm run format`       | Format all files with Prettier  |
| `npm run format:check` | Fail if anything is unformatted |

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Short version: one issue, one branch,
one PR, CI green, one approval, squash merge.

## Team

| Member       | Area                        |
| ------------ | --------------------------- |
| @LaySopanha  | Lead, CI, deploy, reviews   |
| @zinhour10   | Database, Turso schema      |
| @virakbottch | Server routes, form actions |
| @Thaikarona  | Counter UI                  |
| @LYLEAB      | History UI                  |
| @Bemine5Cent | Tests, docs, QA             |
