import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';

const WA = 'https://wa.me/917347535399';
const PHONE = '+91 73475 35399';

const rules = [
  {
    test: /whatsapp|wa\b|call|phone|number|contact|email|mail/,
    reply: `Phone / WhatsApp: ${PHONE}. Email: contact@krinova.com. Use Talk on WhatsApp under the box if you want a founder.`,
  },
  {
    test: /price|pricing|cost|budget|rate|kitna|charge|quote|fee|fees/,
    reply: 'No fixed menu. Write 2–3 lines — site, ads, or brand — and we quote on a call. Typical start is a scoped brief, not a package list.',
  },
  {
    test: /where|location|zirakpur|office|mall|address|visit|map|chandigarh|mohali|panchkula/,
    reply: 'Studio: Cosmo Mall, Zirakpur (Tricity). Call first and fix a time — Raghvendra or Kishan will meet you.',
  },
  {
    test: /\bhours?\b|timing|available|sunday|weekend|\bmonday\b/,
    reply: 'Weekdays 10:30am–7pm IST. Weekends by appointment. After hours, WhatsApp still lands with the founders.',
  },
  {
    test: /service|kya karte|what do you|offer|kaam|\bhelp\b/,
    reply: 'Brand, identity, websites, ads, search (Google + ChatGPT), content, social, reviews, automation, Web3. Pick one — or tap a chip below.',
  },
  {
    test: /seo|search|google|chatgpt|gemini|aeo|geo/,
    reply: 'Search Everywhere: Google plus when people ask ChatGPT / Gemini. Local SEO and listings sit with Reputation Desk.',
  },
  {
    test: /meta ads|google ads|youtube ads|linkedin ads|performance|ppc|advert/,
    reply: 'Performance Lab: ads only if they produce leads or sales. What isn’t paying, we switch off.',
  },
  {
    test: /\bads?\b|facebook|instagram ads|leads?/,
    reply: 'Ads for leads and sales — Meta, Google, YouTube, LinkedIn. Brief us here, we say if it is worth running.',
  },
  {
    test: /web\b|website|site|landing|ecommerce|e-commerce|ui\/?ux/,
    reply: 'Digital Experience: sites that load and make the next step obvious. Send a brief or a screenshot.',
  },
  {
    test: /logo|identity|packag|deck|guideline|visual/,
    reply: 'Identity Studio: mark, colours, type, packs, decks — one look, not five versions.',
  },
  {
    test: /brand|position|naming|voice|strategy/,
    reply: 'Brand Intelligence: who you are, who you sell to, why they pick you — written so the team can actually use it.',
  },
  {
    test: /reel|youtube|content|creator|video|ugc|influencer/,
    reply: 'Content & Creator Studio: reels, YouTube, founder videos — things people watch, not a leftover calendar.',
  },
  {
    test: /social|instagram|linkedin|facebook|\bdms?\b/,
    reply: 'Social Desk: Instagram, LinkedIn, DMs — a week of posts you can keep. Reputation Desk covers Google reviews.',
  },
  {
    test: /review|reputation|maps|gbp|google business/,
    reply: 'Reputation Desk: Google reviews, Maps, listings. We ask, we reply, we keep it honest.',
  },
  {
    test: /automat|crm|follow.?up|whatsapp automat/,
    reply: 'Automation: WhatsApp, CRM, email follow-up that happens without someone chasing it every night.',
  },
  {
    test: /ai\b|chatbot|agent/,
    reply: 'AI Growth: drafts, chat, follow-ups that save time. Not a slide that says “we use AI”.',
  },
  {
    test: /web3|crypto|token|nft|discord/,
    reply: 'Web3 & Crypto: launches, community, listings — said in plain language.',
  },
  {
    test: /data|analytic|dashboard|roi|report|track/,
    reply: 'Data & Growth Intelligence: tracking plus a short Monday note — what worked, what we cut. No 40-page PDF.',
  },
  {
    test: /portfolio|work|case|client|project/,
    reply: 'Work lives on the Portfolio page. For a live walkthrough of a similar brief, WhatsApp is faster.',
  },
  {
    test: /career|hiring|vacanc|\bjobs?\b|\bintern/,
    reply: 'Open roles are on Careers. Apply there, or send a short note + CV link.',
  },
  {
    test: /founder|raghvendra|kishan|team|who|cto|cmo/,
    reply: 'Raghvendra — Founder & CTO. Kishan Kumar — Founder & CMO. Both sit in Zirakpur. About page has the rest.',
  },
  {
    test: /thank|thanks|shukriya|dhanyavad/,
    reply: 'Done. Message again if something is still stuck.',
  },
  {
    test: /^(hi|hii|hello|hey|namaste|hola)\b|good (morning|evening|afternoon)/,
    reply: 'Hi — this is Krinova auto-reply. Brand, site, ads, search, or a visit: what do you need?',
  },
];

function replyTo(text) {
  const t = text.toLowerCase().trim();
  const hit = rules.find((r) => r.test.test(t));
  if (hit) return hit.reply;
  return `Got it. Auto-reply covers services, pricing, Zirakpur, hours, and ${PHONE}. Write what you sell and what is blocked — or talk on WhatsApp from below.`;
}

const starters = ['Services', 'Pricing', 'Zirakpur', 'WhatsApp'];
const welcomeFollowUp = 'I auto-reply on services, pricing, office, and hours. Ask anything — or talk to a founder on WhatsApp.';

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi. I'm the Krinova desk. How can I help with brand, site, or growth today?" },
  ]);
  const greeted = useRef(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open || greeted.current) return;
    greeted.current = true;
    const id = window.setTimeout(() => {
      setTyping(true);
      window.setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: welcomeFollowUp }]);
        setTyping(false);
      }, 400);
    }, 550);
    return () => window.clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const pushBot = (text) => {
    setTyping(true);
    window.setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text }]);
      setTyping(false);
    }, 420);
  };

  const send = (raw) => {
    const text = (raw ?? input).trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: 'user', text }]);
    setInput('');
    if (/whatsapp/i.test(text)) {
      pushBot(`Talk on WhatsApp from the line under this box. ${PHONE}.`);
      return;
    }
    pushBot(replyTo(text));
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close chat overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[998] border-0 bg-black/40 md:hidden"
        />
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Krinova live chat"
          className="fab-panel fixed inset-x-3 z-[999] flex flex-col overflow-hidden rounded-[22px] bg-[#F3F0E8] shadow-[0_18px_50px_rgba(0,0,0,0.28)] bottom-[max(0.75rem,env(safe-area-inset-bottom))] h-[min(68dvh,540px)] max-h-[calc(100dvh-5.5rem)] md:inset-auto md:right-6 md:bottom-6 md:h-[min(500px,calc(100dvh-3rem))] md:w-[380px]"
        >
          <div className="flex shrink-0 items-center justify-between gap-3 bg-[#161616] px-4 py-3.5">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white">
                <img src="/logo.png" alt="" className="h-7 w-auto object-contain" />
              </span>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold tracking-wide text-white">Krinova AI</p>
                <p className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] text-[#C9A259] uppercase">
                  <span className="size-1.5 rounded-full bg-[#C9A259]" />
                  Always online
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/16 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>

          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3.5 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.from === 'user'
                      ? 'rounded-br-md bg-[#C9A259] text-[#161616]'
                      : 'rounded-bl-md border border-black/6 bg-white text-[#2a2a2a] shadow-[0_1px_2px_rgba(0,0,0,0.04)]'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-black/6 bg-white px-3.5 py-2.5">
                  <span className="fab-dot size-1.5 rounded-full bg-[#161616]/40" />
                  <span className="fab-dot-2 size-1.5 rounded-full bg-[#161616]/40" />
                  <span className="fab-dot-3 size-1.5 rounded-full bg-[#161616]/40" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex shrink-0 flex-wrap gap-1.5 px-3.5 pb-2">
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-black/10 bg-white px-3 py-1 text-[11px] font-medium text-[#444] hover:border-[#C9A259] hover:text-[#8a6d2e]"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="shrink-0 bg-white px-3 pb-3 pt-2">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="min-w-0 flex-1 rounded-full border border-black/10 bg-[#F7F5EF] px-4 py-2.5 text-sm text-[#161616] outline-none placeholder:text-[#9a9588] focus:border-[#C9A259]/70"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#C9A259] text-[#161616] hover:brightness-105"
              >
                <Send size={15} />
              </button>
            </form>
            <p className="mt-2 text-center text-[9px] font-medium tracking-[0.16em] text-[#8a867c] uppercase">
              Powered by Krinova · Zirakpur
            </p>
            <a
              href={WA}
              target="_blank"
              rel="noreferrer"
              className="mt-1 block text-center text-[11px] font-medium text-[#8a6d2e] no-underline hover:underline"
            >
              Talk on WhatsApp
            </a>
          </div>
        </div>
      )}

      {!open && (
        <button
          type="button"
          aria-label="Open live chat"
          onClick={() => setOpen(true)}
          className="group fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[max(1.15rem,env(safe-area-inset-bottom))] z-[998] flex items-center border-0 bg-transparent p-0"
        >
          <span className="chat-pill-glow relative flex h-[68px] items-center rounded-full border border-[#C9A259]/25 bg-white py-2 pr-[5.6rem] pl-6 text-left transition-transform duration-300 group-hover:-translate-y-0.5">
            <span className="pr-1">
              <span className="chat-live-blink flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.2em] text-[#C9A259] uppercase">
                <span className="chat-dot size-1.5 rounded-full bg-[#C9A259]" />
                Live chat
              </span>
              <span className="mt-1 block whitespace-nowrap text-[14px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">
                Ask Krinova
              </span>
            </span>
          </span>
          <span className="absolute top-1/2 right-1.5 flex size-[56px] -translate-y-1/2 items-center justify-center">
            <span className="chat-logo-ping pointer-events-none absolute -inset-[5px] rounded-full border border-[#C9A259]/50" />
            <span className="relative z-10 flex size-full items-center justify-center overflow-hidden rounded-full bg-[#faf8f2] ring-1 ring-[#C9A259]/40">
              <img src="/logo.png" alt="Krinova" className="h-[34px] w-auto object-contain" />
            </span>
          </span>
        </button>
      )}
    </>
  );
}
