"use client";

import { useState } from "react";

type Screen = "login" | "register" | "app";
type Tab = "oracle" | "forge" | "coach" | "promote" | "hack";
type ChatMsg = { role: "ai" | "user"; text: string };

const NICHES = ["Business & services", "Fitness", "Beauty", "Food", "Tech", "Education"];
const CONTENT_TYPES = ["Short video / Reels", "Photos", "Written / blog", "Livestream"];

export default function Home() {
  const [screen, setScreen] = useState<Screen>("login");
  const [tab, setTab] = useState<Tab>("oracle");

  const [bizName, setBizName] = useState("Nomsa's Cakes");
  const [niche, setNiche] = useState(NICHES[3]);
  const [contentType, setContentType] = useState(CONTENT_TYPES[0]);

  const [chat, setChat] = useState<ChatMsg[]>([
    {
      role: "ai",
      text: `Hi — I've got your profile: ${bizName}, ${niche} niche, mostly ${contentType.toLowerCase()}. Ask me anything about what to post or how to grow, and I'll tailor it to that.`,
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [checklist, setChecklist] = useState([true, false, false]);

  function enterApp(e: React.FormEvent) {
    e.preventDefault();
    setChat([
      {
        role: "ai",
        text: `Hi — I've got your profile: ${bizName}, ${niche} niche, mostly ${contentType.toLowerCase()}. Ask me anything about what to post or how to grow, and I'll tailor it to that.`,
      },
    ]);
    setScreen("app");
  }

  function sendChat(text?: string) {
    const msg = text ?? chatInput.trim();
    if (!msg) return;
    setChat((c) => [...c, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          role: "ai",
          text: "Based on your niche, I'd focus on posting during your audience's peak hours and using today's Oracle trend as your hook — want me to draft that post for you in Forge?",
        },
      ]);
    }, 700);
  }

  const initials = bizName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (screen !== "app") {
    return (
      <Phone>
        <div className="flex-1 overflow-y-auto p-9 pb-8 flex flex-col">
          <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-gradient-to-br from-orange to-[#FFA694] flex items-center justify-center mb-5 shadow-lg shadow-orange/30">
            <BoltIcon className="text-white w-6 h-6" />
          </div>
          <h1 className="font-display text-[26px] font-bold mb-1.5 tracking-tight">
            {screen === "login" ? "Welcome back" : "Register your business"}
          </h1>
          <p className="text-[13.5px] text-charcoalSoft mb-6 leading-relaxed">
            {screen === "login"
              ? "Log in to get today's trends and tips built around your business."
              : "Tell us what you do — your trends, ideas, and coaching all get tailored to this."}
          </p>

          <form onSubmit={enterApp} className="flex flex-col gap-3.5">
            {screen === "register" && (
              <>
                <Field icon={<TagIcon />} label="Business name">
                  <input
                    className="field-input"
                    value={bizName}
                    onChange={(e) => setBizName(e.target.value)}
                    placeholder="e.g. Nomsa's Cakes"
                  />
                </Field>
                <Field icon={<ChartIcon />} label="What best describes your business?">
                  <select className="field-input" value={niche} onChange={(e) => setNiche(e.target.value)}>
                    {NICHES.map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </Field>
                <Field icon={<PlayIcon />} label="Content you mainly post">
                  <select
                    className="field-input"
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                  >
                    {CONTENT_TYPES.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </>
            )}

            <Field icon={<MailIcon />} label="Email">
              <input className="field-input" type="email" placeholder="you@business.com" required />
            </Field>
            <Field icon={<LockIcon />} label="Password">
              <input className="field-input" type="password" placeholder="••••••••" required />
            </Field>

            <button type="submit" className="mt-2 w-full bg-charcoal text-cream py-3.5 rounded-2xl font-bold text-[14.5px]">
              {screen === "login" ? "Log in" : "Create account"}
            </button>
          </form>

          <p className="text-center text-[13px] text-charcoalSoft mt-4">
            {screen === "login" ? (
              <>
                New here?{" "}
                <button className="text-orangeDeep font-bold" onClick={() => setScreen("register")}>
                  Register your business
                </button>
              </>
            ) : (
              <>
                Already registered?{" "}
                <button className="text-orangeDeep font-bold" onClick={() => setScreen("login")}>
                  Log in
                </button>
              </>
            )}
          </p>
        </div>

        <style jsx global>{`
          .field-input {
            width: 100%;
            padding: 13px 14px 13px 40px;
            border-radius: 12px;
            border: 1.5px solid #f3e4d3;
            background: white;
            font-size: 14px;
            color: #33302c;
          }
          .field-input:focus {
            outline: none;
            border-color: #ff6f5e;
          }
        `}</style>
      </Phone>
    );
  }

  return (
    <Phone>
      <div className="px-5 pt-1.5 pb-3.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8.5 h-8.5 w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-orange to-[#FFA694] flex items-center justify-center shadow shadow-orange/30">
            <BoltIcon className="text-white w-[18px] h-[18px]" />
          </div>
          <span className="font-display font-bold text-[19px] tracking-tight">TrendForge</span>
        </div>
        <button
          onClick={() => setScreen("login")}
          className="flex items-center gap-1.5 bg-white pl-1.5 pr-3 py-1.5 rounded-pill border border-line"
        >
          <span className="w-6 h-6 rounded-full bg-charcoal text-cream flex items-center justify-center text-[11px] font-bold font-display">
            {initials}
          </span>
          <span className="text-[12.5px] font-semibold">{bizName}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24">
        {tab === "oracle" && <OracleTab onUseTrend={() => setTab("forge")} />}
        {tab === "forge" && <ForgeTab />}
        {tab === "coach" && (
          <CoachTab bizName={bizName} chat={chat} input={chatInput} setInput={setChatInput} onSend={sendChat} />
        )}
        {tab === "promote" && <PromoteTab checklist={checklist} setChecklist={setChecklist} />}
        {tab === "hack" && <HackTab />}
      </div>

      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-line flex px-1 pt-2.5 pb-4">
        {(
          [
            ["oracle", "Oracle", <CompassIcon key="c" />],
            ["forge", "Forge", <BoltIcon key="b" />],
            ["coach", "Coach", <ChatIcon key="ch" />],
            ["promote", "Promote", <TrendUpIcon key="t" />],
            ["hack", "Hack", <TargetIcon key="ta" />],
          ] as [Tab, string, React.ReactNode][]
        ).map(([key, label, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 flex flex-col items-center gap-0.5 py-1 ${
              tab === key ? "text-orangeDeep" : "text-gray"
            }`}
          >
            <span className="w-5 h-5">{icon}</span>
            <span className="text-[10px] font-semibold">{label}</span>
          </button>
        ))}
      </nav>
    </Phone>
  );
}

/* ---------- LAYOUT SHELL ---------- */
function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[420px] bg-cream sm:rounded-[36px] overflow-hidden relative flex flex-col h-screen sm:h-[860px] sm:max-h-[92vh] shadow-[0_30px_60px_-20px_rgba(45,45,45,0.35)] sm:ring-[10px] sm:ring-charcoal">
      <div className="flex justify-between items-center px-6 pt-3.5 pb-1 text-[13px] font-semibold shrink-0">
        <span>9:41</span>
        <span>● ● ● ●</span>
      </div>
      {children}
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[12.5px] font-bold mb-1.5 block">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-3.5 text-gray w-4 h-4">{icon}</span>
        {children}
      </div>
    </div>
  );
}

/* ---------- TABS ---------- */
function OracleTab({ onUseTrend }: { onUseTrend: () => void }) {
  const pills = ["All", "Business", "Fitness", "Beauty", "Food", "Tech"];
  const [active, setActive] = useState(0);
  const trends = [
    { rank: 2, title: '"Tell me without telling me" format', sub: "Comedy · Business", tag: "Rising" },
    { rank: 3, title: "Slow-zoom before/after edits", sub: "Fitness · Beauty", tag: "Rising" },
    { rank: 4, title: "Whisper-voice product reviews", sub: "Tech · Beauty", tag: "Niche" },
    { rank: 5, title: '"Day in my business" vlogs', sub: "Business", tag: "Niche" },
  ];

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold mt-2.5 mb-0.5 tracking-tight">Today's trends</h1>
      <p className="text-[13.5px] text-charcoalSoft mb-4.5 mb-[18px]">Updated this morning · 5 trends worth using</p>

      <PillRow items={pills} active={active} onSelect={setActive} />

      <div className="rounded-[22px] p-5.5 p-[22px] text-white mb-4 shadow-[0_14px_30px_-12px_rgba(229,80,62,0.5)]"
           style={{ background: "linear-gradient(150deg,#FF6F5E 0%, #E5503E 100%)" }}>
        <span className="inline-flex items-center gap-1.5 bg-white/20 px-2.5 py-1 rounded-pill text-[12px] font-bold mb-3">
          <BoltIcon className="w-3.5 h-3.5" /> HOT · #1 TODAY
        </span>
        <div className="font-display text-2xl font-bold mb-1.5 leading-tight">"POV: my morning routine" audio</div>
        <div className="flex gap-4 my-3.5 mb-4">
          <div>
            <div className="font-display text-[17px] font-bold flex items-center gap-1"><TrendUpIcon className="w-4 h-4" />Rising fast</div>
            <div className="text-[11px] opacity-85">Growth this week</div>
          </div>
          <div>
            <div className="font-display text-[17px] font-bold flex items-center gap-1"><ClockIcon className="w-4 h-4" />2 days</div>
            <div className="text-[11px] opacity-85">Estimated peak window</div>
          </div>
        </div>
        <div className="bg-white/15 rounded-2xl p-3.5 text-[13px] leading-relaxed mb-4">
          <b>Why it works:</b> Routines feel relatable and low-effort to film, and viewers trust people who show process over polish.
        </div>
        <button onClick={onUseTrend} className="w-full bg-white text-orangeDeep py-3.5 rounded-2xl font-bold text-[14.5px]">
          Get 3 ideas using this →
        </button>
      </div>

      <SectionLabel>More trends today</SectionLabel>
      {trends.map((t) => (
        <div key={t.rank} className="flex items-center gap-3 bg-white border border-line rounded-2xl p-3.5 mb-2.5">
          <div className="w-[30px] h-[30px] rounded-[9px] bg-cream flex items-center justify-center font-display font-bold text-[13px] text-orangeDeep shrink-0">
            {t.rank}
          </div>
          <div>
            <div className="text-sm font-semibold">{t.title}</div>
            <div className="text-xs text-charcoalSoft mt-0.5">{t.sub}</div>
          </div>
          <span
            className={`ml-auto text-[11px] font-bold px-2.5 py-1 rounded-pill ${
              t.tag === "Rising" ? "bg-[#E8F5E9] text-green" : "bg-[#F1ECE3] text-[#9A8C6D]"
            }`}
          >
            {t.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

function ForgeTab() {
  const pills = ["Business", "Fitness", "Beauty", "Food", "Education"];
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [generating, setGenerating] = useState(false);

  const ideas = [
    {
      hook: '"The 6am habit that changed how I run my business"',
      script: ["Open on your actual morning — no staging", "Show one small decision you make before 7am", "Cut to a result it led to this week"],
      caption: "Not glamorous. Just consistent. Here's what actually happens before I open my laptop.",
      tags: "#morningroutine #smallbusiness #founderlife #dayinmylife #consistency",
    },
    {
      hook: '"POV: you finally systemized your morning chaos"',
      script: ["Quick montage of your old chaotic mornings", "Show the one system that fixed it", "End on how much time it saves weekly"],
      caption: "I used to lose an hour every morning to decision fatigue. Here's the fix that stuck.",
      tags: "#productivity #businessowner #systems #timemanagement #growth",
    },
    {
      hook: '"What my morning looks like at 2 employees vs. 20"',
      script: ["Split-screen or before/after framing", "Name one thing you stopped doing yourself", "Name one thing you'll never delegate"],
      caption: "Scaling changes your mornings more than your revenue. Here's the real shift.",
      tags: "#scaling #entrepreneur #delegation #businessgrowth #founder",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold mt-2.5 mb-0.5">Make your post</h1>
      <p className="text-[13.5px] text-charcoalSoft mb-4.5 mb-[18px]">Pick your niche, get 3 ready-to-film ideas</p>
      <PillRow items={pills} active={active} onSelect={setActive} />

      <div className="bg-white border border-dashed border-orange rounded-2xl p-3.5 text-[12.5px] mb-4 flex items-center gap-2">
        <ClockIcon className="w-4 h-4 text-orangeDeep" /> Using trend: <b className="text-orangeDeep">"POV: my morning routine" audio</b>
      </div>

      {ideas.map((idea, i) => (
        <div key={i} className="bg-white border border-line rounded-[18px] p-4 mb-3.5">
          <span className="font-display text-orange text-xs font-bold uppercase tracking-wide mb-2 block">Idea {i + 1}</span>
          <div className="text-[15px] font-bold mb-2.5 leading-snug">{idea.hook}</div>
          <ul className="text-[13px] text-charcoalSoft mb-2.5 space-y-1">
            {idea.script.map((s, j) => (
              <li key={j} className="pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-orange">
                {s}
              </li>
            ))}
          </ul>
          <div className="text-[12.5px] bg-cream p-2.5 rounded-[10px] mb-2 leading-relaxed">{idea.caption}</div>
          <div className="text-xs text-orangeDeep font-semibold mb-3">{idea.tags}</div>
          <button
            onClick={() => {
              setCopied(i);
              setTimeout(() => setCopied(null), 1200);
            }}
            className="w-full border-[1.5px] border-charcoal text-charcoal py-2 rounded-[10px] text-xs font-bold"
          >
            {copied === i ? "Copied" : "Copy all"}
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          setGenerating(true);
          setTimeout(() => setGenerating(false), 900);
        }}
        className="w-full border-[1.5px] border-dashed border-orange text-orangeDeep py-3.5 rounded-2xl font-bold text-[13.5px] mt-1.5"
      >
        {generating ? "Generating..." : "Generate 3 new ideas"}
      </button>
      <p className="text-center text-[11.5px] text-charcoalSoft mt-2.5">Your ideas are saved to your account</p>
    </div>
  );
}

function CoachTab({
  bizName,
  chat,
  input,
  setInput,
  onSend,
}: {
  bizName: string;
  chat: ChatMsg[];
  input: string;
  setInput: (v: string) => void;
  onSend: (text?: string) => void;
}) {
  const suggestions = ["Caption ideas for today", "Best posting times", "How to fix low views"];
  return (
    <div className="pb-16">
      <h1 className="font-display text-[22px] font-bold mt-2.5 mb-0.5">Coach</h1>
      <p className="text-[13.5px] text-charcoalSoft mb-4.5 mb-[18px]">Ask anything about growing {bizName}</p>

      <div className="flex flex-col gap-3 pb-3">
        {chat.map((m, i) => (
          <div
            key={i}
            className={`max-w-[82%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
              m.role === "ai"
                ? "bg-white border border-line self-start rounded-bl-[4px]"
                : "bg-charcoal text-cream self-end rounded-br-[4px] ml-auto"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto my-1 mb-4">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSend(s)}
            className="shrink-0 bg-white border border-line px-3.5 py-2 rounded-pill text-xs font-semibold text-orangeDeep whitespace-nowrap"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="fixed bottom-[82px] left-0 right-0 max-w-[420px] mx-auto bg-cream px-5 py-2.5 flex gap-2 border-t border-line">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
          placeholder="Ask your coach anything..."
          className="flex-1 px-3.5 py-3 rounded-pill border-[1.5px] border-line bg-white text-[13.5px] focus:outline-none focus:border-orange"
        />
        <button onClick={() => onSend()} className="w-[42px] h-[42px] rounded-full bg-orange flex items-center justify-center shrink-0">
          <SendIcon className="text-white w-[18px] h-[18px]" />
        </button>
      </div>
    </div>
  );
}

function PromoteTab({
  checklist,
  setChecklist,
}: {
  checklist: boolean[];
  setChecklist: (v: boolean[]) => void;
}) {
  const items = [
    { text: "Optimize your bio", sub: "Clear on what you sell + a way to contact you" },
    { text: "Post at your peak time", sub: "6–8pm works best for Food audiences" },
    { text: "Reply to every comment today", sub: "Boosts your post back into more feeds" },
  ];

  function toggle(i: number) {
    const next = [...checklist];
    next[i] = !next[i];
    setChecklist(next);
  }

  return (
    <div>
      <h1 className="font-display text-[22px] font-bold mt-2.5 mb-0.5">Promote</h1>
      <p className="text-[13.5px] text-charcoalSoft mb-4.5 mb-[18px]">Grow your account and find real collabs</p>

      <div className="bg-charcoal text-cream rounded-2xl p-4.5 p-[18px] mb-4.5 mb-[18px] flex justify-between items-center">
        <div>
          <div className="font-display text-[26px] font-bold text-orange">1,204</div>
          <div className="text-xs opacity-75 max-w-[170px] leading-relaxed">ideas generated today by creators like you</div>
        </div>
        <TrendUpIcon className="w-7 h-7 text-orange" />
      </div>

      <SectionLabel>Collab match</SectionLabel>
      <div className="bg-white rounded-[20px] p-5 border border-line mb-4 text-center">
        <div className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center font-display font-bold text-white text-lg"
             style={{ background: "linear-gradient(135deg,#FFA694,#FF6F5E)" }}>
   
