import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { SITE_SETTINGS_QUERY } from "../lib/sanityQueries";
import { sanityClient } from "../lib/sanity";

export async function getStaticProps() {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      siteSettings,
    },
    revalidate: 1,
  };
}

// ─── Animated counter hook ───────────────────────────────────────────────────
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ─── Intersection observer hook ──────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Stats section ────────────────────────────────────────────────────────────
function StatCounter({ value, suffix, label, start }) {
  const count = useCountUp(value, 1800, start);
  return (
    <div className="wl-stat">
      <span className="wl-stat-number">
        {count}
        {suffix}
      </span>
      <span className="wl-stat-label">{label}</span>
    </div>
  );
}

// ─── Waitlist form ────────────────────────────────────────────────────────────
function WaitlistForm() {
  const [state, setState] = useState("idle"); // idle | loading | success
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Please enter a valid email";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setState("loading");
    // Simulate API call — replace with your real endpoint
    await new Promise((r) => setTimeout(r, 1800));
    setState("success");
  };

  if (state === "success") {
    return (
      <div className="wl-form-success">
        <div className="wl-success-icon">
          <svg viewBox="0 0 52 52" fill="none">
            <circle cx="26" cy="26" r="25" stroke="#4DB581" strokeWidth="2" />
            <path
              d="M14 26l8 8 16-16"
              stroke="#4DB581"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="wl-success-title">You're on the list!</h3>
        <p className="wl-success-body">
          We'll notify you the moment Wegovy tablets receive UK authorisation —
          you'll be first in line.
        </p>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className="wl-form-loading">
        <div className="wl-spinner">
          <svg viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#e8f5ee"
              strokeWidth="4"
            />
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="#4DB581"
              strokeWidth="4"
              strokeDasharray="80 45"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p className="wl-loading-text">Securing your spot…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="wl-form" noValidate>
      <div className="wl-field">
        <label htmlFor="wl-name">Full name</label>
        <input
          id="wl-name"
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: "" }));
          }}
          className={errors.name ? "wl-input error" : "wl-input"}
        />
        {errors.name && <span className="wl-error">{errors.name}</span>}
      </div>
      <div className="wl-field">
        <label htmlFor="wl-email">Email address</label>
        <input
          id="wl-email"
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: "" }));
          }}
          className={errors.email ? "wl-input error" : "wl-input"}
        />
        {errors.email && <span className="wl-error">{errors.email}</span>}
      </div>
      <button type="submit" className="wl-submit">
        Join the waitlist
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="wl-disclaimer">
        No spam, ever. We'll only contact you when tablets are available in the
        UK.
      </p>
    </form>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function WegovyTabletWaitlist({ siteSettings }) {
  const [statsRef, statsInView] = useInView(0.3);
  const [heroLoaded, setHeroLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    {
      week: "Day 1–30",
      title: "Getting started",
      body: "Take your 1.5 mg tablet every morning on an empty stomach. Appetite changes begin within days for many people.",
      icon: "🌱",
    },
    {
      week: "Month 2–3",
      title: "Finding your rhythm",
      body: "Dose titrates to 4 mg. Food feels less urgent. Most initial nausea settles as your body adjusts.",
      icon: "📈",
    },
    {
      week: "Month 4+",
      title: "Building momentum",
      body: "Progressing toward 25 mg maintenance. Healthy habits feel natural with ongoing clinical support.",
      icon: "🎯",
    },
  ];

  const whys = [
    {
      icon: "🔔",
      title: "First to know",
      body: "Get notified the moment MHRA grants UK authorisation — before it's publicly announced.",
    },
    {
      icon: "💊",
      title: "No needles required",
      body: "A once-daily oral tablet. Same clinically-proven semaglutide, none of the injection equipment.",
    },
    {
      icon: "❄️",
      title: "No refrigeration",
      body: "Store at room temperature. No cold chain, no pens, no sharps disposal.",
    },
    {
      icon: "🩺",
      title: "Clinician-led care",
      body: "Every patient supported by our UK-registered clinical team with monthly check-ins.",
    },
    {
      icon: "✅",
      title: "Same proven science",
      body: "Oral semaglutide — the same active ingredient as Wegovy injection, now in tablet form.",
    },
    {
      icon: "🔒",
      title: "Priority access",
      body: "Waitlist members get exclusive early access and priority booking when tablets launch.",
    },
  ];

  return (
    <>
      <Head>
        <title>Wegovy Tablet Waitlist — Online Weight Loss Clinic</title>
        <meta
          name="description"
          content="Wegovy oral tablet (semaglutide) is coming to the UK. Join our waitlist for priority access, clinician-led care, and no needles."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header data={siteSettings} />

      <main className="wl-page">
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="wl-hero">
          {/* Animated background blobs */}
          <div className="wl-hero-bg">
            <div className="wl-blob wl-blob-1" />
            <div className="wl-blob wl-blob-2" />
            <div className="wl-blob wl-blob-3" />
            <div className="wl-grid-pattern" />
          </div>

          <div className={`wl-hero-inner ${heroLoaded ? "loaded" : ""}`}>
            {/* Left: content + form */}
            <div className="wl-hero-left">
              <div className="wl-pill-badge">
                <span className="wl-badge-dot" />
                Coming to UK 2026
              </div>

              <h1 className="wl-hero-title">
                Wegovy Tablet
                <span className="wl-title-accent"> is coming.</span>
                <br />
                No needles. Same results.
              </h1>

              <p className="wl-hero-sub">
                Oral semaglutide — the same clinically-proven GLP-1 as Wegovy
                injection, now in a once-daily tablet. Be the first to access it
                in the UK.
              </p>

              <div className="wl-hero-stats">
                <div className="wl-hero-stat">
                  <strong>~14%</strong>
                  <span>average weight loss</span>
                </div>
                <div className="wl-hero-stat-divider" />
                <div className="wl-hero-stat">
                  <strong>Once daily</strong>
                  <span>oral tablet</span>
                </div>
                <div className="wl-hero-stat-divider" />
                <div className="wl-hero-stat">
                  <strong>No fridge</strong>
                  <span>room temp storage</span>
                </div>
              </div>

              {/* Form card */}
              <div className="wl-form-card">
                <div className="wl-form-card-header">
                  <h2 className="wl-form-title">Join the waitlist</h2>
                  <p className="wl-form-subtitle">
                    Get priority access when UK approval lands
                  </p>
                </div>
                <WaitlistForm />
              </div>
            </div>

            {/* Right: product visual */}
            <div className="wl-hero-right">
              <div className="wl-pill-visual">
                <div className="wl-pill-glow" />
                <img
                  src="https://cdn.prod.website-files.com/67653a4b46e84215ef90b44f/6a0ec0ddf3788aadac584eeb_weg-pill-4x3.avif"
                  alt="Wegovy oral semaglutide tablet bottle"
                  className="wl-pill-img"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                {/* Floating badges */}
                <div className="wl-float-badge wl-float-1">
                  <span className="wl-float-icon">💊</span>
                  <div>
                    <strong>25mg</strong>
                    <span>maintenance dose</span>
                  </div>
                </div>
                <div className="wl-float-badge wl-float-2">
                  <span className="wl-float-icon">🧬</span>
                  <div>
                    <strong>Semaglutide</strong>
                    <span>GLP-1 receptor agonist</span>
                  </div>
                </div>
                <div className="wl-float-badge wl-float-3">
                  <span className="wl-float-icon">🏥</span>
                  <div>
                    <strong>MHRA</strong>
                    <span>approval pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ─────────────────────────────────────────────────────── */}
        <div className="wl-trust-bar">
          {[
            "GPhC Registered Pharmacy",
            "UK-Based Clinical Team",
            "Monthly Check-ins Included",
            "Trusted by 90,000+ Patients",
            "Clinician-Led Care",
          ].map((t) => (
            <div key={t} className="wl-trust-item">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3.5 3.5 6.5-7"
                  stroke="#4DB581"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </div>
          ))}
        </div>

        {/* ── WHAT IS IT ────────────────────────────────────────────────────── */}
        <section className="wl-section wl-what">
          <div className="wl-container">
            <div className="wl-what-grid">
              <div className="wl-what-left">
                <span className="wl-eyebrow">The science</span>
                <h2 className="wl-section-title">What is Wegovy Tablet?</h2>
                <p className="wl-body-text">
                  Oral semaglutide is the world's first once-daily GLP-1 tablet
                  for weight management. It contains the same active ingredient
                  as the Wegovy injection — semaglutide — but in a tablet you
                  swallow each morning instead of an injection pen.
                </p>
                <p className="wl-body-text">
                  It works by mimicking the GLP-1 hormone your body naturally
                  produces after eating, calming food noise, reducing appetite,
                  and helping you feel satisfied with less food — without
                  feeling deprived.
                </p>
                <p className="wl-body-text">
                  The FDA approved it for weight management in December 2025. UK
                  MHRA authorisation is currently under review, with arrival
                  expected in 2026.
                </p>
                <div className="wl-fact-chips">
                  <span className="wl-chip">Once daily tablet</span>
                  <span className="wl-chip">No injection</span>
                  <span className="wl-chip">Room temp storage</span>
                  <span className="wl-chip">No sharps disposal</span>
                  <span className="wl-chip">Same semaglutide</span>
                </div>
              </div>
              <div className="wl-what-right">
                <div className="wl-comparison-card">
                  <div className="wl-compare-header">Tablet vs Injection</div>
                  <table className="wl-compare-table">
                    <thead>
                      <tr>
                        <th></th>
                        <th>
                          <span className="wl-compare-col-label wl-active">
                            Wegovy Tablet
                          </span>
                        </th>
                        <th>
                          <span className="wl-compare-col-label">
                            Wegovy Injection
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        [
                          "Format",
                          "Once-daily tablet",
                          "Once-weekly injection",
                        ],
                        ["Active ingredient", "Semaglutide", "Semaglutide"],
                        ["Avg. weight loss", "~14%", "~15%"],
                        ["Needles", "❌ None", "✓ Weekly pen"],
                        ["Refrigeration", "❌ Not required", "✓ Required"],
                        ["Available in UK", "Coming 2026", "Available now"],
                      ].map(([label, a, b]) => (
                        <tr key={label}>
                          <td className="wl-compare-label">{label}</td>
                          <td className="wl-compare-val wl-active">{a}</td>
                          <td className="wl-compare-val">{b}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="wl-compare-note">
                    * Averages from clinical trials with diet and lifestyle
                    support. Individual results vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ─────────────────────────────────────────────────────────── */}
        <section className="wl-stats-section" ref={statsRef}>
          <div className="wl-container">
            <div className="wl-stats-inner">
              <StatCounter
                value={14}
                suffix="%"
                label="average weight loss in 64-week trial"
                start={statsInView}
              />
              <div className="wl-stat-divider" />
              <StatCounter
                value={60}
                suffix="%"
                label="of patients lost at least 10% body weight"
                start={statsInView}
              />
              <div className="wl-stat-divider" />
              <StatCounter
                value={307}
                suffix=""
                label="adults in phase 3 clinical trial"
                start={statsInView}
              />
              <div className="wl-stat-divider" />
              <StatCounter
                value={64}
                suffix=" wks"
                label="trial duration showing sustained results"
                start={statsInView}
              />
            </div>
            <p className="wl-stats-note">
              Source: OASIS 4 trial, New England Journal of Medicine. Results in
              controlled settings alongside diet and lifestyle changes.
            </p>
          </div>
        </section>

        {/* ── JOURNEY TIMELINE ──────────────────────────────────────────────── */}
        <section className="wl-section">
          <div className="wl-container">
            <div className="wl-section-header">
              <span className="wl-eyebrow">What to expect</span>
              <h2 className="wl-section-title">Your treatment journey</h2>
              <p className="wl-section-sub">
                Wegovy tablet titrates gradually over months to minimise side
                effects and maximise results.
              </p>
            </div>
            <div className="wl-timeline">
              {steps.map((step, i) => (
                <div key={i} className="wl-timeline-step">
                  <div className="wl-timeline-left">
                    <div className="wl-timeline-icon">{step.icon}</div>
                    {i < steps.length - 1 && (
                      <div className="wl-timeline-line" />
                    )}
                  </div>
                  <div className="wl-timeline-body">
                    <span className="wl-timeline-week">{step.week}</span>
                    <h3 className="wl-timeline-title">{step.title}</h3>
                    <p className="wl-timeline-text">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY JOIN ──────────────────────────────────────────────────────── */}
        <section className="wl-section wl-why-section">
          <div className="wl-container">
            <div className="wl-section-header">
              <span className="wl-eyebrow">Why register</span>
              <h2 className="wl-section-title">What being on our list means</h2>
            </div>
            <div className="wl-why-grid">
              {whys.map((w) => (
                <div key={w.title} className="wl-why-card">
                  <span className="wl-why-icon">{w.icon}</span>
                  <h3 className="wl-why-title">{w.title}</h3>
                  <p className="wl-why-body">{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ────────────────────────────────────────────────────── */}
        <section className="wl-cta-section">
          <div className="wl-container">
            <div className="wl-cta-inner">
              <div className="wl-cta-left">
                <span className="wl-eyebrow wl-eyebrow-light">
                  Don't wait to find out
                </span>
                <h2 className="wl-cta-title">
                  Be first in line for Wegovy Tablet in the UK
                </h2>
                <p className="wl-cta-sub">
                  Join thousands already on our waitlist. We'll notify you the
                  moment MHRA approval comes through — no spam, just the news
                  you need.
                </p>
                <div className="wl-cta-perks">
                  {[
                    "Priority access before public launch",
                    "Free guide on oral GLP-1 treatment",
                    "Clinician-led support from day one",
                  ].map((p) => (
                    <div key={p} className="wl-cta-perk">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <circle
                          cx="9"
                          cy="9"
                          r="8.25"
                          stroke="#4DB581"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M5.5 9l2.5 2.5 4.5-5"
                          stroke="#4DB581"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {p}
                    </div>
                  ))}
                </div>
                <div className="wl-interim-cta">
                  <p className="wl-interim-text">
                    Want to start treatment right now?
                  </p>
                  <Link
                    href="/weight-loss-treatments/wegovy"
                    className="wl-interim-link"
                  >
                    View Wegovy injection →
                  </Link>
                </div>
              </div>
              <div className="wl-cta-form">
                <div className="wl-form-card wl-form-card-dark">
                  <div className="wl-form-card-header">
                    <h2 className="wl-form-title">Reserve your spot</h2>
                    <p className="wl-form-subtitle">
                      Takes 30 seconds — free forever
                    </p>
                  </div>
                  <WaitlistForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer data={siteSettings} />

      {/* ── STYLES ────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        /* ── Tokens ──────────────────────────────────────────────────────── */
        :root {
          --green: #4db581;
          --green-dark: #3a9167;
          --green-light: #e8f5ee;
          --green-mid: #c3e8d3;
          --navy: #0d1b2e;
          --navy-mid: #1a2e47;
          --slate: #2c3e50;
          --body: #4a5568;
          --muted: #718096;
          --border: #e2e8f0;
          --white: #ffffff;
          --bg-soft: #f7faf8;
          --font-display: "Sora", sans-serif;
          --font-body: "Inter", sans-serif;
          --radius: 16px;
          --radius-sm: 10px;
        }

        /* ── Reset ───────────────────────────────────────────────────────── */
        .wl-page * {
          box-sizing: border-box;
        }
        .wl-page {
          font-family: var(--font-body);
          color: var(--slate);
        }
        .wl-container {
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .wl-section {
          padding: 96px 0;
        }

        /* ── Hero ────────────────────────────────────────────────────────── */
        .wl-hero {
          position: relative;
          background: var(--navy);
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 120px 24px 80px;
        }
        .wl-hero-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .wl-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: blobFloat 8s ease-in-out infinite alternate;
        }
        .wl-blob-1 {
          width: 600px;
          height: 600px;
          background: var(--green);
          top: -200px;
          right: -100px;
          animation-delay: 0s;
        }
        .wl-blob-2 {
          width: 400px;
          height: 400px;
          background: #1a6b4a;
          top: 40%;
          left: -150px;
          animation-delay: 2s;
        }
        .wl-blob-3 {
          width: 300px;
          height: 300px;
          background: #4db581;
          bottom: -100px;
          right: 30%;
          animation-delay: 4s;
        }
        @keyframes blobFloat {
          0% {
            transform: translate(0, 0) scale(1);
          }
          100% {
            transform: translate(20px, -30px) scale(1.05);
          }
        }
        .wl-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(77, 181, 129, 0.04) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(77, 181, 129, 0.04) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
        }
        .wl-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1160px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.8s ease,
            transform 0.8s ease;
        }
        .wl-hero-inner.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .wl-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(77, 181, 129, 0.15);
          border: 1px solid rgba(77, 181, 129, 0.3);
          color: var(--green);
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 24px;
          width: fit-content;
        }
        .wl-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(0.8);
          }
        }
        .wl-hero-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          color: var(--white);
          line-height: 1.12;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }
        .wl-title-accent {
          color: var(--green);
        }
        .wl-hero-sub {
          font-size: 17px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin: 0 0 32px;
          max-width: 500px;
        }
        .wl-hero-stats {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          padding: 16px 24px;
          margin-bottom: 36px;
          width: fit-content;
        }
        .wl-hero-stat {
          text-align: center;
          padding: 0 20px;
        }
        .wl-hero-stat strong {
          display: block;
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
          font-family: var(--font-display);
        }
        .wl-hero-stat span {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.55);
        }
        .wl-hero-stat-divider {
          width: 1px;
          height: 40px;
          background: rgba(255, 255, 255, 0.15);
        }

        /* ── Form card ───────────────────────────────────────────────────── */
        .wl-form-card {
          background: var(--white);
          border-radius: var(--radius);
          padding: 32px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.25);
          max-width: 480px;
        }
        .wl-form-card-dark {
          background: var(--white);
        }
        .wl-form-card-header {
          margin-bottom: 24px;
        }
        .wl-form-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 6px;
        }
        .wl-form-subtitle {
          font-size: 14px;
          color: var(--muted);
          margin: 0;
        }

        /* ── Form ────────────────────────────────────────────────────────── */
        .wl-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .wl-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wl-field label {
          font-size: 13px;
          font-weight: 600;
          color: var(--slate);
        }
        .wl-input {
          padding: 12px 16px;
          border: 1.5px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: 15px;
          color: var(--slate);
          font-family: var(--font-body);
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s;
          background: #fafafa;
        }
        .wl-input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(77, 181, 129, 0.15);
          background: #fff;
        }
        .wl-input.error {
          border-color: #e53e3e;
        }
        .wl-error {
          font-size: 12px;
          color: #e53e3e;
        }
        .wl-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--green);
          color: var(--white);
          padding: 14px 24px;
          border-radius: var(--radius-sm);
          font-size: 15px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          transition:
            background 0.2s,
            transform 0.15s;
          margin-top: 4px;
        }
        .wl-submit:hover {
          background: var(--green-dark);
          transform: translateY(-1px);
        }
        .wl-submit:active {
          transform: translateY(0);
        }
        .wl-disclaimer {
          font-size: 12px;
          color: var(--muted);
          text-align: center;
          margin: 0;
        }

        /* ── Loader ──────────────────────────────────────────────────────── */
        .wl-form-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 48px 24px;
          min-height: 220px;
        }
        .wl-spinner {
          width: 52px;
          height: 52px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .wl-loading-text {
          font-size: 15px;
          color: var(--muted);
        }

        /* ── Success ─────────────────────────────────────────────────────── */
        .wl-form-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 40px 24px;
          animation: fadeUp 0.5s ease;
          min-height: 220px;
          justify-content: center;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .wl-success-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 16px;
        }
        .wl-success-icon circle {
          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          animation: circleDraw 0.6s ease forwards;
        }
        .wl-success-icon path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: checkDraw 0.4s ease 0.5s forwards;
        }
        @keyframes circleDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes checkDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .wl-success-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 10px;
        }
        .wl-success-body {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.6;
          max-width: 280px;
          margin: 0;
        }

        /* ── Hero right ──────────────────────────────────────────────────── */
        .wl-hero-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wl-pill-visual {
          position: relative;
          width: 420px;
          height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wl-pill-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at center,
            rgba(77, 181, 129, 0.25) 0%,
            transparent 70%
          );
          border-radius: 50%;
          animation: glowPulse 3s ease-in-out infinite alternate;
        }
        @keyframes glowPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.05);
            opacity: 1;
          }
        }
        .wl-pill-img {
          width: 280px;
          height: 280px;
          object-fit: contain;
          position: relative;
          z-index: 1;
          filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4));
          animation: imgFloat 4s ease-in-out infinite alternate;
        }
        @keyframes imgFloat {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-12px);
          }
        }
        .wl-float-badge {
          position: absolute;
          z-index: 2;
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          white-space: nowrap;
          animation: badgeFloat 5s ease-in-out infinite alternate;
        }
        .wl-float-1 {
          top: 12%;
          left: -8%;
          animation-delay: 0s;
        }
        .wl-float-2 {
          bottom: 22%;
          left: -10%;
          animation-delay: 1.5s;
        }
        .wl-float-3 {
          top: 18%;
          right: -8%;
          animation-delay: 3s;
        }
        @keyframes badgeFloat {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-8px);
          }
        }
        .wl-float-icon {
          font-size: 20px;
        }
        .wl-float-badge strong {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: var(--white);
        }
        .wl-float-badge span {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
        }

        /* ── Trust bar ───────────────────────────────────────────────────── */
        .wl-trust-bar {
          background: var(--green);
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 24px;
        }
        .wl-trust-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          color: var(--white);
          white-space: nowrap;
        }

        /* ── Section headers ─────────────────────────────────────────────── */
        .wl-section-header {
          text-align: center;
          margin-bottom: 64px;
        }
        .wl-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 12px;
        }
        .wl-eyebrow-light {
          color: var(--green-mid);
        }
        .wl-section-title {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 800;
          color: var(--navy);
          margin: 0 0 16px;
          letter-spacing: -0.02em;
        }
        .wl-section-sub {
          font-size: 17px;
          color: var(--body);
          max-width: 540px;
          margin: 0 auto;
          line-height: 1.7;
        }
        .wl-body-text {
          font-size: 16px;
          color: var(--body);
          line-height: 1.75;
          margin: 0 0 16px;
        }

        /* ── What section ────────────────────────────────────────────────── */
        .wl-what {
          background: var(--bg-soft);
        }
        .wl-what-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 72px;
          align-items: start;
        }
        .wl-what-left .wl-eyebrow {
          margin-bottom: 10px;
        }
        .wl-what-left .wl-section-title {
          text-align: left;
          margin-bottom: 20px;
        }

        .wl-fact-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 24px;
        }
        .wl-chip {
          background: var(--green-light);
          color: var(--green-dark);
          font-size: 13px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          border: 1px solid var(--green-mid);
        }

        /* ── Comparison table ────────────────────────────────────────────── */
        .wl-comparison-card {
          background: var(--white);
          border-radius: var(--radius);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.07);
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .wl-compare-header {
          background: var(--navy);
          color: var(--white);
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          padding: 16px 24px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .wl-compare-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }
        .wl-compare-table thead th {
          padding: 14px 16px;
          text-align: center;
          border-bottom: 1px solid var(--border);
        }
        .wl-compare-col-label {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 700;
          color: var(--muted);
        }
        .wl-compare-col-label.wl-active {
          background: var(--green-light);
          color: var(--green-dark);
        }
        .wl-compare-table tbody tr:nth-child(even) {
          background: #f9fbf9;
        }
        .wl-compare-label {
          padding: 12px 16px;
          color: var(--muted);
          font-weight: 500;
        }
        .wl-compare-val {
          padding: 12px 16px;
          text-align: center;
          color: var(--slate);
          font-weight: 500;
        }
        .wl-compare-val.wl-active {
          color: var(--green-dark);
          font-weight: 700;
        }
        .wl-compare-note {
          font-size: 11px;
          color: var(--muted);
          padding: 12px 16px;
          margin: 0;
          border-top: 1px solid var(--border);
        }

        /* ── Stats ───────────────────────────────────────────────────────── */
        .wl-stats-section {
          background: var(--navy);
          padding: 80px 0;
        }
        .wl-stats-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          flex-wrap: wrap;
        }
        .wl-stat {
          text-align: center;
          padding: 24px 48px;
        }
        .wl-stat-number {
          display: block;
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          color: var(--green);
          letter-spacing: -0.03em;
          line-height: 1;
          margin-bottom: 10px;
        }
        .wl-stat-label {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.4;
          max-width: 180px;
          display: block;
        }
        .wl-stat-divider {
          width: 1px;
          height: 80px;
          background: rgba(255, 255, 255, 0.1);
        }
        .wl-stats-note {
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 40px;
        }

        /* ── Timeline ────────────────────────────────────────────────────── */
        .wl-timeline {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .wl-timeline-step {
          display: flex;
          gap: 24px;
        }
        .wl-timeline-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          width: 56px;
        }
        .wl-timeline-icon {
          width: 56px;
          height: 56px;
          background: var(--green-light);
          border: 2px solid var(--green-mid);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }
        .wl-timeline-line {
          width: 2px;
          background: var(--green-mid);
          flex: 1;
          min-height: 40px;
          margin: 6px 0;
        }
        .wl-timeline-body {
          padding-bottom: 48px;
        }
        .wl-timeline-week {
          font-size: 12px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--green);
        }
        .wl-timeline-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 700;
          color: var(--navy);
          margin: 6px 0 10px;
        }
        .wl-timeline-text {
          font-size: 15px;
          color: var(--body);
          line-height: 1.7;
          margin: 0;
        }

        /* ── Why grid ────────────────────────────────────────────────────── */
        .wl-why-section {
          background: var(--bg-soft);
        }
        .wl-why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .wl-why-card {
          background: var(--white);
          border-radius: var(--radius);
          padding: 28px;
          border: 1px solid var(--border);
          transition:
            box-shadow 0.2s,
            transform 0.2s;
        }
        .wl-why-card:hover {
          box-shadow: 0 8px 32px rgba(77, 181, 129, 0.12);
          transform: translateY(-3px);
        }
        .wl-why-icon {
          font-size: 28px;
          display: block;
          margin-bottom: 14px;
        }
        .wl-why-title {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 700;
          color: var(--navy);
          margin: 0 0 8px;
        }
        .wl-why-body {
          font-size: 14px;
          color: var(--body);
          line-height: 1.65;
          margin: 0;
        }

        /* ── Bottom CTA ──────────────────────────────────────────────────── */
        .wl-cta-section {
          background: var(--navy);
          padding: 96px 0;
        }
        .wl-cta-inner {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .wl-cta-title {
          font-family: var(--font-display);
          font-size: clamp(1.9rem, 3vw, 2.7rem);
          font-weight: 800;
          color: var(--white);
          letter-spacing: -0.02em;
          margin: 8px 0 20px;
          line-height: 1.15;
        }
        .wl-cta-sub {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.7;
          margin: 0 0 32px;
        }
        .wl-cta-perks {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 40px;
        }
        .wl-cta-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.85);
          font-weight: 500;
        }
        .wl-interim-cta {
          padding-top: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wl-interim-text {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
          margin: 0 0 8px;
        }
        .wl-interim-link {
          font-size: 15px;
          color: var(--green);
          font-weight: 600;
          text-decoration: none;
          transition: color 0.2s;
        }
        .wl-interim-link:hover {
          color: var(--green-mid);
        }
        .wl-cta-form {
          display: flex;
          justify-content: center;
        }
        .wl-cta-form .wl-form-card {
          width: 100%;
          max-width: 440px;
        }

        /* ── Responsive ──────────────────────────────────────────────────── */
        @media (max-width: 1024px) {
          .wl-hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .wl-hero-right {
            display: none;
          }
          .wl-what-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .wl-cta-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .wl-why-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wl-stat {
            padding: 20px 28px;
          }
        }

        @media (max-width: 640px) {
          .wl-hero {
            padding: 100px 20px 60px;
          }
          .wl-hero-stats {
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }
          .wl-hero-stat-divider {
            width: 100%;
            height: 1px;
          }
          .wl-form-card {
            padding: 24px 20px;
          }
          .wl-why-grid {
            grid-template-columns: 1fr;
          }
          .wl-stats-inner {
            flex-direction: column;
          }
          .wl-stat-divider {
            width: 80%;
            height: 1px;
          }
          .wl-trust-bar {
            gap: 12px;
          }
          .wl-section {
            padding: 64px 0;
          }
          .wl-what-left .wl-section-title {
            font-size: 1.7rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wl-blob,
          .wl-pill-img,
          .wl-float-badge,
          .wl-badge-dot,
          .wl-pill-glow {
            animation: none;
          }
          .wl-hero-inner {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
