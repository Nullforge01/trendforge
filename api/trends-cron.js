// GET /api/trends-cron
// Triggered automatically every 3 days by Vercel Cron (see vercel.json)
// Drafts new trends per niche using AI, saved as "pending" for human approval
// before they show up in the app (prevents fabricated/hallucinated trends going live).
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const NICHES = ["Business & services", "Fitness", "Beauty", "Food", "Tech", "Education"];

module.exports = async (req, res) => {
  // Vercel Cron sends a secret header — verify it matches to stop random public calls
  if (req.headers["authorization"] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const results = [];

  for (const niche of NICHES) {
    const prompt = `Suggest one short-form content trend idea currently relevant for a ${niche} business.
Respond ONLY as JSON: {"title": "...", "type": "hot|rising|niche", "why_it_works": "1-2 sentences"}`;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": process.env.GEMINI_API_KEY,
          },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      const { error } = await supabase.from("trends").insert([
        {
          title: parsed.title,
          type: parsed.type,
          niche,
          why_it_works: parsed.why_it_works,
          status: "pending", // an admin reviews and flips this to 'approved'
        },
      ]);

      results.push({ niche, ok: !error });
    } catch (err) {
      results.push({ niche, ok: false });
    }
  }

  return res.status(200).json({ refreshed: results });
};
