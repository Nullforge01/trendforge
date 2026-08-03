// POST /api/forge
// Body: { user_id, trend_title, niche }
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, trend_title, niche } = req.body;
  if (!trend_title || !niche) {
    return res.status(400).json({ error: "Missing trend_title or niche" });
  }

  const prompt = `You are a short-form video content strategist.
Trend: ${trend_title}
Niche: ${niche}

Give exactly 3 post ideas. Respond ONLY as JSON, no other text, in this exact shape:
[{"hook": "...", "script": ["...", "...", "..."], "caption": "...", "hashtags": "#tag1 #tag2 #tag3 #tag4 #tag5"}]`;

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
    const raw = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "[]";
    const clean = raw.replace(/```json|```/g, "").trim();
    const ideas = JSON.parse(clean);

    if (user_id) {
      const rows = ideas.map((idea) => ({
        user_id,
        niche,
        hook: idea.hook,
        script: JSON.stringify(idea.script),
        caption: idea.caption,
        hashtags: idea.hashtags,
      }));
      await supabase.from("ideas").insert(rows);
    }

    return res.status(200).json({ ideas });
  } catch (err) {
    return res.status(500).json({ error: "Could not generate ideas right now" });
  }
  }
