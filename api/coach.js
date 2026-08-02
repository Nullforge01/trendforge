POST /api/coach
// Body: { user_id, business_name, niche, content_type, message }
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { user_id, business_name, niche, content_type, message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Missing message" });
  }

  const systemPrompt = `You are a friendly, practical growth coach inside the TrendForge app.
You are speaking with the owner of "${business_name}", a ${niche} business that mainly posts ${content_type}.
Keep answers short (2-4 sentences), specific to their niche and content type, and actionable today.
Never invent fake statistics or guaranteed results.`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 300,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a reply just now.";

    if (user_id) {
      await supabase.from("chat_messages").insert([
        { user_id, role: "user", content: message },
        { user_id, role: "ai", content: reply },
      ]);
    }

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: "Coach is temporarily unavailable" });
  }
};
        
