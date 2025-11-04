# McDonald's AI Crew Member

Conversational web experience that simulates a seasoned McDonald’s crew member. Built with Next.js 14 and Framer Motion, it pairs a curated menu intelligence graph with quick-touch chat UX so guests can assemble meals, check nutrition, and surface deals.

## Getting Started

```bash
npm install
npm run dev
```

Visit http://localhost:3000 to interact with the agent.

## Available Scripts

- `npm run dev` — start the development server.
- `npm run build` — compile the optimized production bundle.
- `npm start` — run the production server.
- `npm run lint` — verify lint rules via `eslint-config-next`.

## Architecture Notes

- **Next.js App Router** with a single-page experience in `app/page.tsx`.
- **Agent heuristics** live in `lib/agent.ts`, combining menu, nutrition, and deal intelligence.
- **UI components** (`app/components/*`) power the chat surface, quick prompts, and follow-up chips with Framer Motion micro-interactions.
- **Styling** uses lightweight CSS in `app/globals.css`, reflecting the Golden Arches palette.

## Deployment

The project is optimized for Vercel:

```bash
npm run build
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-aae69ad0
```

After deployment, verify the production instance:

```bash
curl https://agentic-aae69ad0.vercel.app
```

## Extending the Agent

- Expand the menu dataset with regional specials or seasonal releases.
- Swap `generateAgentResponse` for a live LLM endpoint while keeping the curated knowledge graph as grounding facts.
- Localize copy and prompts by externalizing text assets.

---

Golden Arches © McDonald’s. This project is an unofficial prototype experience for demonstration purposes only.
