# TrendForge

Daily trend + content engine for creators and small businesses.
Coral Bloom theme, Next.js 14 + Tailwind, 5 tabs: Oracle, Forge, Coach, Promote, Hack.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Push to your GitHub repo

You already have an empty repo ready. From inside this `trendforge` folder:

```bash
git init
git add .
git commit -m "Initial TrendForge frontend"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git
git push -u origin main
```

Replace `<your-username>` and `<your-repo-name>` with your actual GitHub username and repo name.

## Deploy (optional, once pushed)

Vercel deploys straight from a GitHub repo with zero config for Next.js:
1. Go to vercel.com → New Project
2. Import the repo you just pushed
3. Click Deploy — no settings needed, it detects Next.js automatically

## What's built (frontend only, no backend yet)

- Login / register screens (register captures business name, niche, content type)
- Oracle — today's trends
- Forge — AI-generated post ideas (currently static/mock content)
- Coach — AI chat, replies reference the registered business (currently mock replies)
- Promote — collab matching + growth checklist
- Hack — viral post pattern breakdowns

## Next steps (not yet wired up)

- Supabase for real auth + database (users, trends, ideas, chat_messages tables)
- OpenAI API call for real Coach replies and Forge idea generation
- Cron job to auto-refresh trends every 3 days
