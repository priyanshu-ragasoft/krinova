import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import BrandLogo from "../BrandLogo";
import PageTitle from "../PageTitle";
import { isAdminAuthed, loginAdmin } from "../../lib/adminAuth";

const COLORS = {
  bg: "#0E1512",
  bgDeep: "#0A0F0C",
  panelBorder: "rgba(241,243,241,0.08)",
  text: "#F1F3F1",
  muted: "#8FA396",
  mutedDark: "#5C6D62",
  gold: "#C9A227",
  goldBright: "#DFB93A",
  goldSoft: "rgba(201,162,39,0.16)",
  teal: "#3FA796",
  inputBorder: "rgba(241,243,241,0.16)",
  inputBorderFocus: "#C9A227",
  danger: "#C96A45",
};

const SERIF =
  "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif";
const SANS =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif";

function Field({ id, label, type = "text", placeholder, right, value, onChange, error }) {
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? COLORS.danger
    : focused
    ? COLORS.inputBorderFocus
    : COLORS.inputBorder;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-xs"
          style={{ color: COLORS.muted, fontFamily: SANS, letterSpacing: "0.02em" }}
        >
          {label}
        </label>
        {right}
      </div>
      <div
        className="relative"
        style={{
          boxShadow: focused ? `0 1px 0 0 ${COLORS.inputBorderFocus}` : "none",
        }}
      >
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-2.5 text-[15px] outline-none transition-colors duration-200"
          style={{
            color: COLORS.text,
            fontFamily: SANS,
            borderBottom: `1px solid ${borderColor}`,
          }}
        />
      </div>
    </div>
  );
}

export default function KrinovaLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/admin";
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isAdminAuthed()) navigate("/admin", { replace: true });
  }, [navigate]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    const result = await loginAdmin({ email, password, remember: rememberMe });
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate(from, { replace: true });
  };

  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{ backgroundColor: COLORS.bg, fontFamily: SANS }}
    >
      <PageTitle title="Sign in — Krinova" description="Studio console." />
      <style>{`
        @keyframes krivFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .kriv-in { animation: krivFadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        .kriv-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.15s ease, box-shadow 0.25s ease, background-color 0.25s ease;
        }
        .kriv-btn:hover { box-shadow: 0 8px 24px -8px rgba(201,162,39,0.55); }
        .kriv-btn:active { transform: scale(0.985); }
        .kriv-btn .arrow { transition: transform 0.25s ease; }
        .kriv-btn:hover .arrow { transform: translateX(4px); }
        .kriv-link { position: relative; }
        .kriv-link::after {
          content: "";
          position: absolute;
          left: 0; right: 100%;
          bottom: -2px;
          height: 1px;
          background: currentColor;
          transition: right 0.25s ease;
        }
        .kriv-link:hover::after { right: 0; }
        .kriv-spinner {
          animation: krivSpin 0.7s linear infinite;
        }
        @keyframes krivSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Left panel — brand */}
      <div
        className="hidden lg:flex lg:w-[42%] flex-col justify-between p-14 relative"
        style={{
          borderRight: `1px solid ${COLORS.panelBorder}`,
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(241,243,241,0.05) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
          backgroundColor: COLORS.bgDeep,
        }}
      >
        <div
          className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,162,39,0.10), transparent 70%)" }}
        />

        <div className="kriv-in" style={{ animationDelay: mounted ? "0.05s" : "0s" }}>
          <BrandLogo size="md" asLink={false} />
        </div>

        <div className="kriv-in max-w-sm relative" style={{ animationDelay: mounted ? "0.15s" : "0s" }}>
          <h1
            className="text-[2.6rem] leading-[1.12]"
            style={{ color: COLORS.text, fontFamily: SERIF }}
          >
            The studio desk. Quiet, and only for us.
          </h1>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
            Cosmo Mall, Zirakpur. Sign in to the console — not the public site.
          </p>
        </div>

        <div className="kriv-in" style={{ animationDelay: mounted ? "0.25s" : "0s" }}>
          <div className="h-px w-full mb-5" style={{ backgroundColor: COLORS.panelBorder }} />
          <div className="flex items-center justify-between text-xs" style={{ color: COLORS.mutedDark }}>
            <span>© {year} Krinova</span>
            <span className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: COLORS.teal, boxShadow: `0 0 6px ${COLORS.teal}` }}
              />
              All systems operational
            </span>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="kriv-in w-full max-w-sm" style={{ animationDelay: mounted ? "0.1s" : "0s" }}>
          {/* Mobile brand row */}
          <div className="mb-10 lg:hidden">
            <BrandLogo size="sm" asLink={false} />
          </div>

          <h2
            className="text-[1.7rem] mb-2"
            style={{ color: COLORS.text, fontFamily: SERIF }}
          >
            Sign in
          </h2>
          <p className="text-sm mb-9" style={{ color: COLORS.muted }}>
            Founders and studio only.
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            <Field
              id="email"
              label="Email address"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Field
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              right={
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="kriv-link text-xs"
                  style={{ color: COLORS.gold }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              }
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-3.5 w-3.5 cursor-pointer"
                  style={{ accentColor: COLORS.gold }}
                />
                <span className="text-xs" style={{ color: COLORS.muted }}>
                  Remember me
                </span>
              </label>

              <span className="text-xs" style={{ color: COLORS.mutedDark }}>
                Session stays on this device if remembered.
              </span>
            </div>

            {error && (
              <p className="text-sm" style={{ color: COLORS.danger }} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="kriv-btn w-full py-3 text-sm flex items-center justify-center gap-2"
              style={{
                backgroundColor: submitting ? COLORS.gold : COLORS.gold,
                opacity: submitting ? 0.85 : 1,
                color: "#14100A",
                fontFamily: SANS,
                fontWeight: 600,
                letterSpacing: "0.01em",
                cursor: submitting ? "default" : "pointer",
              }}
              onMouseEnter={(e) => { if (!submitting) e.currentTarget.style.backgroundColor = COLORS.goldBright; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = COLORS.gold; }}
            >
              {submitting ? (
                <>
                  <svg className="kriv-spinner h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#14100A" strokeOpacity="0.25" strokeWidth="2.5" />
                    <path d="M21 12a9 9 0 00-9-9" stroke="#14100A" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                  Signing in
                </>
              ) : (
                <>
                  Sign in
                  <svg className="arrow h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="#14100A" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 6l6 6-6 6M5 12h14" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <p className="mt-10 text-xs" style={{ color: COLORS.mutedDark }}>
            <Link to="/" className="kriv-link" style={{ color: COLORS.muted }}>
              Back to the site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}