# BO Trust Web v2

Clean-owned, responsive implementation of the BO Trust financial consulting website, built with Next.js App Router and prepared for Vercel.

## Stack

- Next.js 16
- React 19
- TypeScript 6
- Framer Motion
- Local fonts and media assets

## Available routes

- `/` — Home
- `/about` — About
- `/contact` — Contact
- `/service-static` — Strategic financial planning service
- `/case-study` — Case studies index
- `/case-study/cutting-costs-for-a-multi-location-retail-chain` — Case study detail

## Local development

Requires Node.js 20.9 or newer.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm test
npm run typecheck
npm run build
```

The repository includes contract tests for the application shell, local fonts, route composition, responsive pages, service content, and case-study content.

## Deploy to Vercel

1. Import this GitHub repository in Vercel.
2. Keep **Framework Preset** set to `Next.js`.
3. Use the default install command (`npm install`/`npm ci`) and build command (`next build`).
4. No environment variables are currently required.
5. Deploy.

The app uses only local/static assets and does not depend on a proprietary page-builder runtime.

## Repository hygiene

Internal reconstruction evidence, browser captures, generated builds, dependencies, local environment files, and harness tooling are deliberately excluded from Git and Vercel deployments.
