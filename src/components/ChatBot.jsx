import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { divisions } from '../data/divisions';
import { CALL_DISPLAY, CALL_HREF, WA_DISPLAY, WA_HREF, EMAIL } from '../data/contact';

const WA = WA_HREF;
const PHONE = CALL_DISPLAY;
const TEL = CALL_HREF;
const MAIL = `mailto:${EMAIL}`;

function nextStepChips(topic) {
  const note = `Hi Krinova — I would like to talk about ${topic}.`;
  return [
    { label: 'Services' },
    { label: 'WhatsApp', href: `${WA}?text=${encodeURIComponent(note)}` },
    { label: 'Call', href: TEL },
    { label: 'Email', href: MAIL },
  ];
}

const rules = [
  {
    test: /whatsapp|wa\b|call|phone|number|contact|email|mail/,
    reply: `Call ${PHONE}. WhatsApp ${WA_DISPLAY}. Email ${EMAIL}. Use the chips below — WhatsApp and call are different numbers.`,
  },
  {
    test: /price|pricing|cost|budget|rate|kitna|charge|quote|fee|fees|investment/,
    reply: 'We do not publish a rate card. Share the brief — brand, site, or growth — and we will return a scoped proposal after a short call.',
  },
  {
    test: /where|location|zirakpur|office|mall|address|visit|map|chandigarh|mohali|panchkula/,
    reply: 'The studio is in Cosmo Mall, Zirakpur, serving the Tricity. Appointments are by arrangement — Raghvendra or Kishan will receive you.',
  },
  {
    test: /\bhours?\b|timing|available|sunday|weekend|\bmonday\b/,
    reply: 'The desk is open weekdays, 10:30–19:00 IST. Weekends by appointment. After hours, WhatsApp still reaches the founders.',
  },
  {
    test: /service|kya karte|what do you|offer|kaam|\bhelp\b/,
    reply: [
      'The studio works across these desks. Name one, and I will take you further.',
      '',
      ...divisions.map((d, i) => `${String(i + 1).padStart(2, '0')}  ${d.title}`),
    ].join('\n'),
  },
  {
    test: /seo|search|google|chatgpt|gemini|aeo|geo/,
    reply: 'Search Everywhere covers Google and the places people now ask — ChatGPT, Gemini, and the rest. Local presence sits with Reputation Desk.',
  },
  {
    test: /meta ads|google ads|youtube ads|linkedin ads|performance|ppc|advert/,
    reply: 'Performance Lab runs media for pipeline and revenue. Spend that does not earn its place is retired. A one-page brief is enough to start.',
  },
  {
    test: /\bads?\b|facebook|instagram ads|leads?/,
    reply: 'We plan and run Meta, Google, YouTube, and LinkedIn. The test is simple: does it produce qualified demand? If you share the product, we will say whether it is worth the spend.',
  },
  {
    test: /web\b|website|site|landing|ecommerce|e-commerce|ui\/?ux/,
    reply: 'Digital Experience: sites and product surfaces that load, read cleanly, and make the next step obvious. A URL or a short brief is a good place to begin.',
  },
  {
    test: /logo|identity|packag|deck|guideline|visual/,
    reply: 'Identity Studio holds the mark, colour, type, packaging, and decks — one system, used everywhere. References are welcome if you have them.',
  },
  {
    test: /brand|position|naming|voice|strategy/,
    reply: 'Brand Intelligence defines who you are, whom you serve, and why you are chosen — written so the organisation can actually use it.',
  },
  {
    test: /reel|youtube|content|creator|video|ugc|influencer/,
    reply: 'Content & Creator Studio produces work people finish: film, short-form, founder presence, and partnerships. Not a calendar that expires in week two.',
  },
  {
    test: /social|instagram|linkedin|facebook|\bdms?\b/,
    reply: 'Social Desk keeps Instagram and LinkedIn alive — publishing and correspondence. Reviews and Maps are handled separately by Reputation Desk.',
  },
  {
    test: /review|reputation|maps|gbp|google business/,
    reply: 'Reputation Desk looks after Google Business, Maps, and reviews: the request, the reply, the listing. Quiet, consistent, accurate.',
  },
  {
    test: /automat|crm|follow.?up|whatsapp automat/,
    reply: 'Automation connects WhatsApp, CRM, and email so follow-up happens without someone chasing it at midnight.',
  },
  {
    test: /ai\b|chatbot|agent/,
    reply: 'AI Growth is used where it saves time — drafts, qualification, follow-up. We do not sell the word “AI” as a service.',
  },
  {
    test: /web3|crypto|token|nft|discord/,
    reply: 'Web3 & Crypto: launch, community, and listings, spoken in plain language. Tell us the stage you are at.',
  },
  {
    test: /data|analytic|dashboard|roi|report|track/,
    reply: 'Growth Intelligence is a short weekly read: what held, what did not. Not a forty-page appendix.',
  },
  {
    test: /portfolio|work|case|client|project/,
    reply: 'Selected work is on the Portfolio page. If you want a conversation around a brief like yours, WhatsApp is the faster route.',
  },
  {
    test: /career|hiring|vacanc|\bjobs?\b|\bintern/,
    reply: 'Open roles are listed under Careers. A short note and a CV link is enough — we read them.',
  },
  {
    test: /founder|raghvendra|kishan|team|who|cto|cmo/,
    reply: 'Raghvendra, Founder & CTO. Kishan Kumar, Founder & CMO. Both work from Zirakpur. The About page has the rest.',
  },
  {
    test: /thank|thanks|shukriya|dhanyavad/,
    reply: 'Of course. We are here if you need the next step.',
  },
  {
    test: /^(hi|hii|hello|hey|namaste|hola)\b|good (morning|evening|afternoon)/,
    reply: 'Good to have you. Brand, digital, growth, or a visit to the studio — what would you like to begin with?',
  },
];

function replyTo(text) {
  const t = text.toLowerCase().trim();
  const hit = rules.find((r) => r.test.test(t));
  if (hit) return hit.reply;
  return `Noted. I can speak to services, investment, the studio, and hours. WhatsApp ${WA_DISPLAY}, or call ${PHONE}.`;
}

const starters = [
  { label: 'Services' },
  { label: 'Investment' },
  { label: 'Studio' },
  { label: 'WhatsApp', href: WA },
];
const welcomeFollowUp = 'Ask about the work, investment, or the studio. For a founder, use Talk on WhatsApp below.';
const nextStepLine = [
  'To continue with a founder:',
  '',
  `WhatsApp  ${WA_DISPLAY}`,
  `Call  ${PHONE}`,
  `Email  ${EMAIL}`,
  'Studio  Cosmo Mall, Zirakpur',
].join('\n');

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [chips, setChips] = useState(starters);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Welcome to Krinova. How can the studio be of use — brand, digital, or growth?' },
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

    if (/^services?$/i.test(text) || /kya karte|what do you/i.test(text)) {
      setChips(divisions.map((d) => ({ label: d.title })));
      pushBot(replyTo(text));
      return;
    }

    const desk = divisions.find((d) => d.title.toLowerCase() === text.toLowerCase());
    const pickedDesk = Boolean(desk);
    const pickedOther = /investment|studio|pricing|price|zirakpur/i.test(text);

    if (pickedDesk || pickedOther) {
      setChips(nextStepChips(desk?.title || text));
      pushBot(replyTo(text));
      window.setTimeout(() => {
        setMessages((m) => [...m, { from: 'bot', text: nextStepLine }]);
      }, 700);
      return;
    }

    if (/whatsapp/i.test(text)) {
      pushBot(`WhatsApp ${WA_DISPLAY}. To call instead, ${PHONE}.`);
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
                  <span className="whitespace-pre-line">{m.text}</span>
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
            {chips.map((s) => {
              const label = s.label;
              const chipClass =
                'rounded-full border border-black/10 bg-white px-3 py-1.5 text-[11px] font-medium text-[#444] no-underline hover:border-[#C9A259] hover:text-[#8a6d2e]';
              if (s.href) {
                return (
                  <a key={label} href={s.href} target={s.href.startsWith('tel:') ? undefined : '_blank'} rel="noreferrer" className={chipClass}>
                    {label}
                  </a>
                );
              }
              return (
                <button key={label} type="button" onClick={() => send(label)} className={chipClass}>
                  {label}
                </button>
              );
            })}
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
