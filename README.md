# TrendForge

Frontend: `index.html` (Coral Bloom theme, all 5 tabs, login/register).
Backend: `/api` folder — Vercel serverless functions, no separate server needed.

## Folder structure

```
trendforge/
├── index.html          Your site — deployed as-is, no build step
├── api/
│   ├── register.js     Creates a user (email, password, business_name, niche, content_type)
│   ├── login.js         Logs a user in
│   ├── coach.js          AI chat — replies personalized to the business profile
│   ├── forge.js          Generates 3 post ideas for a given trend + niche
│   └── trends-cron.js    Auto-refreshes trends every 3 days (drafts only, needs approval)
├── supabase/
│   └── schema.sql        Database tables to create in Supabase
├── vercel.json            Schedules the cron job
├── package.json
└── .env.example
```

## Setup steps

**1. Create a Supabase project** (free tier is fine)
   - supabase.com → New project
   - Go to SQL Editor → paste the contents of `supabase/schema.sql` → Run
   - Go to Project Settings → API → copy your `Project URL` and `service_role` key

**2. Get a free Gemini API key** (no credit card needed)
   - aistudio.google.com → sign in with any Google account → "Get API key" → Create API key

**3. Set environment variables in Vercel**
   - Your Vercel project → Settings → Environment Variables
   - Add: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GEMINI_API_KEY`, `CRON_SECRET` (make up any random string for this last one)

**4. Push this folder to your GitHub repo, then redeploy on Vercel**
   - Vercel auto-detects `/api/*.js` as serverless functions — no framework config needed
   - `index.html` is served as your homepage automatically

## Connecting the frontend to these endpoints

Right now `index.html` uses mock/static data. To make it real, replace the fake JS logic with real calls, for example:

```javascript
// Coach tab — sending a message
const res = await fetch('/api/coach', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    user_id: currentUser.id,
    business_name: currentUser.business_name,
    niche: currentUser.niche,
    content_type: currentUser.content_type,
    message: userMessage
  })
});
const { reply } = await res.json();
```

```javascript
// Register
const res = await fetch('/api/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password, business_name, niche, content_type })
});
const { user } = await res.json();
// save `user` in localStorage or a cookie so it persists across page loads
```

## Notes on the trend cron

`trends-cron.js` writes new trends with `status: 'pending'` — they won't show in the app
until someone flips them to `'approved'` in Supabase's table editor. This is a safety
gate so an AI-hallucinated trend never reaches users unreviewed.
