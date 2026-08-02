// POST /api/register
// Body: { email, password, business_name, niche, content_type }
const { createClient } = require("@supabase/supabase-js");
const bcrypt = require("bcryptjs");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, business_name, niche, content_type } = req.body;

  if (!email || !password || !business_name || !niche || !content_type) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password_hash, business_name, niche, content_type }])
    .select("id, email, business_name, niche, content_type")
    .single();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.status(200).json({ user: data });
};
  
