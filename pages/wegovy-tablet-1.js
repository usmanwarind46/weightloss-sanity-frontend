import Head from "next/head";
import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { sanityClient } from "../lib/sanity";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";
import { meta_url } from "../config/constants";
import MetaLayout from "../Meta/MetaLayout";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "wegovy-tablet-1",
  });

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      seoSettings,
      data,
      siteSettings,
    },
    revalidate: 1,
  };
}

/* ════════════════════════════════════════════════════════════════════════
   IMAGE MAP — swap these for your own assets later.
   Currently sourced from the two reference sites' CDNs (real, working URLs).
   ════════════════════════════════════════════════════════════════════════ */
const IMG = {
  heroLifestyle:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a267ba4563d93a2d2686cc7_water_drink.webp", // person + water (Wegovy tablet taken with water) — no other brand shown
  pillBottle:
    "https://cdn.prod.website-files.com/67653a4b46e84215ef90b44f/6a0ec0ddf3788aadac584eeb_weg-pill-4x3.avif", // Wegovy-only tablet bottle
  tabletsGrid:
    "https://cdn.prod.website-files.com/67653a4b46e84215ef90b44f/6a0ec0ddf3788aadac584eeb_weg-pill-4x3.avif", // Wegovy-only tablet bottle (reused; swap later)
  comingSoon:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a267ca397b72e37268f6504_8e2f3722c81380c5c1a0f2697a988845_coming-soon-pills.webp",
  stepQuiz:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/685980f30809b262ce416752_pexels-thirdman-7659567%201.png", // eligibility quiz
  stepBlood:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6973a724a84d087d77b3c246_blood_screen_tasso_hemed.webp", // blood test
  stepDelivery:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a26e724aea842b5b6a0b526_Men_Doorstep_HeMed%20copy.webp", // doorstep
  water:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a267ba4563d93a2d2686cc7_water_drink.webp",
  injectionPen:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a267ca397b72e37268f6504_8e2f3722c81380c5c1a0f2697a988845_coming-soon-pills.webp", // PLACEHOLDER — replace with your own Wegovy injection pen image
  testimonial1:
    "https://cdn.prod.website-files.com/681b31501d9e3386bfadd432/6a26dfc6479eeaaa7d5c4cf2_square_craig_1.webp", // Craig
  testimonial2: "https://randomuser.me/api/portraits/women/68.jpg",
  testimonial3: "https://randomuser.me/api/portraits/women/44.jpg",
};

/* ─── Hooks ──────────────────────────────────────────────────────────────── */
function useCountUp(target, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf, startTime;
    const step = (t) => {
      if (!startTime) startTime = t;
      const p = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(
        target % 1 === 0
          ? Math.floor(eased * target)
          : +(eased * target).toFixed(1),
      );
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value;
}

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Waitlist form (loader → success, in place) ─────────────────────────── */
function WaitlistForm({ dark = false }) {
  const [state, setState] = useState("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim()) e.email = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = "Enter a valid email";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});
    setState("loading");
    await new Promise((r) => setTimeout(r, 1800)); // replace with real endpoint
    setState("success");
  };

  if (state === "success") {
    return (
      <div className={`wlt-state ${dark ? "on-dark" : ""}`}>
        <div className="wlt-check">
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
        <h3 className="wlt-state-title">You're on the list</h3>
        <p className="wlt-state-body">
          We'll email you the moment Wegovy tablets are authorised in the UK —
          you'll be first in line.
        </p>
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className={`wlt-state ${dark ? "on-dark" : ""}`}>
        <div className="wlt-spinner">
          <svg viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              stroke="rgba(77,181,129,.18)"
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
        <p className="wlt-state-body">Securing your spot…</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="wlt-form" noValidate>
      <div className="wlt-field">
        <label htmlFor={`n-${dark}`}>Full name</label>
        <input
          id={`n-${dark}`}
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: "" }));
          }}
          className={errors.name ? "wlt-input err" : "wlt-input"}
        />
        {errors.name && <span className="wlt-err">{errors.name}</span>}
      </div>
      <div className="wlt-field">
        <label htmlFor={`e-${dark}`}>Email address</label>
        <input
          id={`e-${dark}`}
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: "" }));
          }}
          className={errors.email ? "wlt-input err" : "wlt-input"}
        />
        {errors.email && <span className="wlt-err">{errors.email}</span>}
      </div>
      <button type="submit" className="wlt-submit">
        Join the waitlist
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <p className="wlt-fineprint">
        No spam. We only email you when tablets reach the UK.
      </p>
    </form>
  );
}

/* ─── Stat ───────────────────────────────────────────────────────────────── */
function Stat({ value, suffix, prefix, label, start }) {
  const n = useCountUp(value, 1800, start);
  return (
    <div className="wlt-stat">
      <span className="wlt-stat-num">
        {prefix}
        {n}
        {suffix}
      </span>
      <span className="wlt-stat-label">{label}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export default function WegovyTabletWaitlist({
  seoSettings,
  data,
  siteSettings,
}) {
  const [loaded, setLoaded] = useState(false);
  const [statsRef, statsIn] = useInView(0.3);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  const steps = [
    {
      n: "01",
      img: IMG.stepQuiz,
      title: "Check your eligibility",
      body: "Complete a two-minute online assessment so our clinicians can confirm oral semaglutide is safe and suitable for you.",
    },
    {
      n: "02",
      img: IMG.stepBlood,
      title: "Quick health review",
      body: "A simple needle-free check helps us understand your baseline health and tailor your treatment plan from day one.",
    },
    {
      n: "03",
      img: IMG.stepDelivery,
      title: "Delivered to your door",
      body: "Once a clinician approves your prescription, your tablets arrive discreetly — no fridge, no needles, no fuss.",
    },
  ];

  const journey = [
    {
      phase: "Week 1–4",
      label: "Getting started",
      body: "Build your daily morning routine — taken on an empty stomach with water. Appetite changes can begin in the first week, and any mild nausea usually settles quickly.",
    },
    {
      phase: "Weeks 4–12",
      label: "Finding your rhythm",
      body: "True momentum takes hold. Food feels significantly less urgent as the treatment titrates up and stabilises safely in your system.",
    },
    {
      phase: "Week 12+",
      label: "Building momentum",
      body: "Side effects have fully settled and healthy lifestyle habits feel natural, with ongoing support from your clinical team every step of the way.",
    },
  ];

  // Weight loss by threshold — oral semaglutide 25mg vs placebo (OASIS 4 trial)
  const thresholds = [
    { label: "At least 10%", wegovy: 60, placebo: 13 },
    { label: "At least 15%", wegovy: 47, placebo: 6 },
    { label: "At least 20%", wegovy: 28, placebo: 3 },
  ];

  const benefits = [
    {
      icon: "🔔",
      title: "First to know",
      body: "Get notified the moment the MHRA authorises Wegovy tablets — before the public announcement.",
    },
    {
      icon: "💊",
      title: "No needles",
      body: "A once-daily tablet you swallow with water. Same semaglutide, none of the injection kit.",
    },
    {
      icon: "❄️",
      title: "No refrigeration",
      body: "Store it at room temperature. No cold chain, no sharps bin, no special handling.",
    },
    {
      icon: "🩺",
      title: "Clinician-led",
      body: "UK-registered clinicians support you with monthly check-ins throughout treatment.",
    },
    {
      icon: "🧬",
      title: "Proven science",
      body: "Oral semaglutide — the identical active ingredient to the Wegovy injection.",
    },
    {
      icon: "🔒",
      title: "Priority access",
      body: "Waitlist members get early access and priority booking the day tablets launch.",
    },
  ];

  const testimonials = [
    {
      img: IMG.testimonial1,
      name: "Craig",
      meta: "Lost 19kg in 5 months",
      quote:
        "I know it's a treatment, but for me it changed my life. Joining was the best decision I've made.",
    },
    {
      img: IMG.testimonial2,
      name: "Sarah",
      meta: "On the injection, switching to tablets",
      quote:
        "The results have been incredible. Knowing I can move to a tablet with no needles is exactly what I wanted.",
    },
    {
      img: IMG.testimonial3,
      name: "Megan",
      meta: "Waitlist member",
      quote:
        "I've struggled with injections for years. A daily tablet feels like it was made for people like me.",
    },
  ];

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/wegovy-tablet-1`,
  });

  return (
    <>
      <Head>
        <title>
          Wegovy Tablet Waitlist — Oral Semaglutide Coming to the UK
        </title>
        <meta
          name="description"
          content="Wegovy oral tablet (semaglutide) is coming to the UK in 2026. Join the waitlist for priority access, clinician-led care, and weight loss without needles."
        />
      </Head>

      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/wegovy-tablet-1`}
        autoSchemas={autoSchemas}
      />

      <Header data={siteSettings} />

      <main className="wlt">
        {/* ═══ HERO ═══════════════════════════════════════════════════════ */}
        <section className="wlt-hero">
          <div
            className={`wlt-hero-grid ${loaded ? "in" : ""}`}
            id="main-heading"
          >
            {/* Left */}
            <div className="wlt-hero-copy">
              <div className="wlt-badge">
                <span className="wlt-badge-dot" />
                Coming to the UK · 2026
              </div>
              <h1 className="wlt-hero-h1">
                Weight loss in a <em>daily tablet.</em> No needles.
              </h1>
              <p className="wlt-hero-lede">
                Wegovy tablet brings the same clinically-proven semaglutide as
                the injection — in a once-daily pill. Join the waitlist for
                priority access the moment it lands in the UK.
              </p>

              <div className="wlt-hero-form" id="waitlist-form">
                <WaitlistForm />
              </div>

              <div className="wlt-hero-proof">
                <div className="wlt-avatars">
                  <img src={IMG.testimonial2} alt="" />
                  <img src={IMG.testimonial3} alt="" />
                  <img src={IMG.testimonial1} alt="" />
                </div>
                <p>
                  Joining <strong>thousands</strong> already on the list
                </p>
              </div>
            </div>

            {/* Right — image with floating cards */}
            <div className="wlt-hero-media">
              <div className="wlt-hero-imgwrap">
                <img
                  src={IMG.heroLifestyle}
                  alt="Person taking a once-daily Wegovy tablet with a glass of water"
                  className="wlt-hero-img"
                />
                <div className="wlt-floatcard wlt-fc-1">
                  <span className="wlt-fc-num">~14%</span>
                  <span className="wlt-fc-label">average weight loss</span>
                </div>
                <div className="wlt-floatcard wlt-fc-2">
                  <span className="wlt-fc-icon">💊</span>
                  <div>
                    <strong>Once daily</strong>
                    <span>oral tablet</span>
                  </div>
                </div>
                <div className="wlt-floatcard wlt-fc-3">
                  <span className="wlt-fc-icon">🧬</span>
                  <div>
                    <strong>Semaglutide</strong>
                    <span>same as the injection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TRUST STRIP ════════════════════════════════════════════════ */}
        <div className="wlt-trust">
          {[
            "GPhC-registered pharmacy",
            "UK-based clinical team",
            "Monthly check-ins included",
            "Trusted by 90,000+ patients",
          ].map((t) => (
            <span key={t} className="wlt-trust-item">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3.5 3.5 6.5-7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t}
            </span>
          ))}
        </div>

        {/* ═══ ANNOUNCEMENT ═══════════════════════════════════════════════ */}
        <section className="wlt-announce">
          <div className="wlt-wrap wlt-announce-grid">
            <div className="wlt-announce-media">
              <img
                src={IMG.comingSoon}
                alt="Wegovy tablets coming soon to the UK"
              />
              <span className="wlt-announce-tag">Coming soon</span>
            </div>
            <div className="wlt-announce-copy">
              <span className="wlt-eyebrow">The wait is nearly over</span>
              <h2 className="wlt-h2">
                When will Wegovy tablets arrive in the UK?
              </h2>
              <p className="wlt-p">
                Oral semaglutide was approved by the US FDA in December 2025. In
                the UK, it's working through MHRA review now, with NICE guidance
                to follow for NHS availability.
              </p>
              <p className="wlt-p">
                The first oral GLP-1 treatments are expected in the UK through
                2026. Join the waitlist and we'll do the watching for you — no
                need to keep checking back.
              </p>
              <div className="wlt-announce-time">
                <div className="wlt-time-dot" />
                <span>
                  Expected UK availability: <strong>2026</strong>, subject to
                  regulatory approval
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ WHAT IS IT ═════════════════════════════════════════════════ */}
        <section className="wlt-what">
          <div className="wlt-wrap wlt-what-grid">
            <div className="wlt-what-media">
              <img
                src={IMG.tabletsGrid}
                alt="Wegovy oral semaglutide tablets"
              />
            </div>
            <div className="wlt-what-copy">
              <span className="wlt-eyebrow">The science, simply</span>
              <h2 className="wlt-h2">What is the Wegovy tablet?</h2>
              <p className="wlt-p">
                It's the world's first once-daily GLP-1 tablet for weight
                management. It contains semaglutide — the very same active
                ingredient as the Wegovy injection — but as a pill you take each
                morning instead of a weekly injection.
              </p>
              <p className="wlt-p">
                It works by mimicking the GLP-1 hormone your body releases after
                eating. That quietens "food noise", curbs appetite, and helps
                you feel satisfied with less — without feeling deprived.
              </p>
              <div className="wlt-chips">
                {[
                  "Once-daily tablet",
                  "No injection",
                  "Room-temperature storage",
                  "No sharps disposal",
                  "Same semaglutide",
                ].map((c) => (
                  <span key={c} className="wlt-chip">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ STATS BAND ═════════════════════════════════════════════════ */}
        <section className="wlt-stats" ref={statsRef}>
          <div className="wlt-wrap">
            <div className="wlt-stats-head">
              <span className="wlt-eyebrow on-green">
                What the evidence shows
              </span>
              <h2 className="wlt-h2 on-dark">
                Real results from clinical trials
              </h2>
            </div>
            <div className="wlt-stats-row">
              <Stat
                value={13.6}
                suffix="%"
                label="average body weight lost over 64 weeks"
                start={statsIn}
              />
              <span className="wlt-stat-sep" />
              <Stat
                value={60}
                suffix="%"
                label="of patients lost at least 10% of body weight"
                start={statsIn}
              />
              <span className="wlt-stat-sep" />
              <Stat
                value={28}
                suffix="%"
                label="lost 20% or more of their body weight"
                start={statsIn}
              />
              <span className="wlt-stat-sep" />
              <Stat
                value={307}
                suffix=""
                label="adults studied in the phase 3 trial"
                start={statsIn}
              />
            </div>
            <p className="wlt-stats-note">
              Source: OASIS 4 trial (oral semaglutide 25mg), published in the
              New England Journal of Medicine. Averages from controlled settings
              alongside diet and lifestyle support. Individual results vary.
            </p>
          </div>
        </section>

        {/* ═══ EVIDENCE — WEIGHT LOSS BY THRESHOLD ════════════════════════ */}
        <section className="wlt-evidence">
          <div className="wlt-wrap">
            <div className="wlt-evidence-grid">
              <div className="wlt-evidence-copy">
                <span className="wlt-eyebrow">How much could you lose?</span>
                <h2 className="wlt-h2">More patients hit every milestone</h2>
                <p className="wlt-p">
                  In the OASIS 4 trial, adults taking oral semaglutide lost{" "}
                  <strong>13.6%</strong> of their body weight on average over 64
                  weeks — roughly 1 in 4 lost a fifth of their body weight or
                  more.
                </p>
                <p className="wlt-p">
                  Here's how the Wegovy tablet compared to placebo at each
                  weight-loss milestone, alongside diet and lifestyle support.
                </p>
                <div className="wlt-legend">
                  <span className="wlt-legend-item">
                    <i className="wlt-dot-green" />
                    Wegovy tablet
                  </span>
                  <span className="wlt-legend-item">
                    <i className="wlt-dot-grey" />
                    Placebo (no treatment)
                  </span>
                </div>
              </div>

              <div className="wlt-bars-card">
                {thresholds.map((t, i) => (
                  <div
                    key={t.label}
                    className="wlt-bar-group"
                    style={{ "--delay": `${i * 0.15}s` }}
                  >
                    <div className="wlt-bar-label">
                      {t.label}
                      <span>of body weight</span>
                    </div>
                    <div className="wlt-bar-track">
                      <div
                        className="wlt-bar wlt-bar-green"
                        style={{ "--target": `${t.wegovy}%` }}
                      />
                      <span className="wlt-bar-val wlt-val-green">
                        {t.wegovy}%
                      </span>
                    </div>
                    <div className="wlt-bar-track">
                      <div
                        className="wlt-bar wlt-bar-grey"
                        style={{ "--target": `${t.placebo}%` }}
                      />
                      <span className="wlt-bar-val wlt-val-grey">
                        ~{t.placebo}%
                      </span>
                    </div>
                  </div>
                ))}
                <p className="wlt-bars-note">
                  Source: OASIS 4 trial (oral semaglutide 25mg), 307 adults.
                  Trial conditions with diet and lifestyle support — individual
                  results vary. Not yet available in the UK; availability
                  subject to regulatory approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ TABLET VS INJECTION ════════════════════════════════════════ */}
        <section className="wlt-compare">
          <div className="wlt-wrap">
            <div className="wlt-section-head">
              <span className="wlt-eyebrow">Which is right for you?</span>
              <h2 className="wlt-h2">Tablet vs injection</h2>
              <p className="wlt-sub">
                Both are clinically-proven and effective. The right choice comes
                down to how you'd prefer to take your treatment.
              </p>
            </div>
            <div className="wlt-compare-cards">
              <div className="wlt-cc wlt-cc-feature">
                <div className="wlt-cc-tag">Coming soon</div>
                <img
                  src={IMG.pillBottle}
                  alt="Wegovy tablet bottle"
                  className="wlt-cc-img"
                />
                <h3 className="wlt-cc-title">Wegovy Tablet</h3>
                <p className="wlt-cc-sub">Oral semaglutide</p>
                <ul className="wlt-cc-list">
                  <li>
                    <b>Format</b>
                    <span>Once-daily tablet</span>
                  </li>
                  <li>
                    <b>Weight loss</b>
                    <span>Up to ~14%</span>
                  </li>
                  <li>
                    <b>Needles</b>
                    <span>None</span>
                  </li>
                  <li>
                    <b>Storage</b>
                    <span>Room temperature</span>
                  </li>
                  <li>
                    <b>Dose</b>
                    <span>1.5mg → 25mg</span>
                  </li>
                </ul>
                <a href="#main-heading" className="wlt-join-btn">
                  Join our waitlist
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
              <div className="wlt-cc">
                <div className="wlt-cc-tag muted">Available now</div>
                <img
                  src={IMG.injectionPen}
                  alt="Wegovy injection pen"
                  className="wlt-cc-img"
                />
                <h3 className="wlt-cc-title">Wegovy Injection</h3>
                <p className="wlt-cc-sub">Subcutaneous semaglutide</p>
                <ul className="wlt-cc-list">
                  <li>
                    <b>Format</b>
                    <span>Once-weekly pen</span>
                  </li>
                  <li>
                    <b>Weight loss</b>
                    <span>Up to ~15%</span>
                  </li>
                  <li>
                    <b>Needles</b>
                    <span>Weekly injection</span>
                  </li>
                  <li>
                    <b>Storage</b>
                    <span>Refrigerated</span>
                  </li>
                  <li>
                    <b>Dose</b>
                    <span>0.25mg → 2.4mg</span>
                  </li>
                </ul>
                <Link
                  href="/weight-loss-treatments/wegovy"
                  className="wlt-cc-link"
                >
                  Available now →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ HOW IT WORKS (image-rich) ══════════════════════════════════ */}
        <section className="wlt-how">
          <div className="wlt-wrap">
            <div className="wlt-section-head">
              <span className="wlt-eyebrow">Simple from start to finish</span>
              <h2 className="wlt-h2">How it works</h2>
              <p className="wlt-sub">
                When tablets launch, getting started takes minutes. Here's the
                journey from waitlist to your front door.
              </p>
            </div>
            <div className="wlt-how-grid">
              {steps.map((s) => (
                <article key={s.n} className="wlt-how-card">
                  <div className="wlt-how-imgwrap">
                    <img src={s.img} alt={s.title} />
                    <span className="wlt-how-num">{s.n}</span>
                  </div>
                  <h3 className="wlt-how-title">{s.title}</h3>
                  <p className="wlt-how-body">{s.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TREATMENT JOURNEY TIMELINE ═════════════════════════════════ */}
        <section className="wlt-journey">
          <div className="wlt-wrap">
            <div className="wlt-section-head">
              <span className="wlt-eyebrow">What to expect over time</span>
              <h2 className="wlt-h2">Your treatment journey</h2>
              <p className="wlt-sub">
                Wegovy tablet titrates gradually from 1.5mg up to 25mg, so your
                body adjusts comfortably while results build.
              </p>
            </div>
            <div className="wlt-timeline">
              <div className="wlt-timeline-line" />
              {journey.map((j, i) => (
                <div key={j.phase} className="wlt-tl-step" style={{ "--i": i }}>
                  <div className="wlt-tl-node">
                    <span className="wlt-tl-node-inner" />
                  </div>
                  <div className="wlt-tl-card">
                    <span className="wlt-tl-phase">{j.phase}</span>
                    <h3 className="wlt-tl-title">{j.label}</h3>
                    <p className="wlt-tl-body">{j.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══════════════════════════════════════════════ */}
        <section className="wlt-testi">
          <div className="wlt-wrap">
            <div className="wlt-section-head">
              <span className="wlt-eyebrow">In their own words</span>
              <h2 className="wlt-h2">Real people, real change</h2>
            </div>
            <div className="wlt-testi-grid">
              {testimonials.map((t) => (
                <figure key={t.name} className="wlt-testi-card">
                  <div className="wlt-quotemark">"</div>
                  <blockquote>{t.quote}</blockquote>
                  <figcaption>
                    <img src={t.img} alt={t.name} />
                    <div>
                      <strong>{t.name}</strong>
                      <span>{t.meta}</span>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="wlt-testi-foot">
              <div className="wlt-stars">★★★★★</div>
              Rated <strong>4.7 / 5</strong> by patients on Trustpilot
            </div>
          </div>
        </section>

        {/* ═══ FINAL CTA ══════════════════════════════════════════════════ */}
        <section className="wlt-cta">
          <div className="wlt-wrap wlt-cta-grid">
            <div className="wlt-cta-copy">
              <span className="wlt-eyebrow on-green">
                Don't miss the launch
              </span>
              <h2 className="wlt-h2 on-dark">
                Be first in line for Wegovy tablets
              </h2>
              <p className="wlt-cta-p">
                Reserve your spot in 30 seconds. We'll notify you the moment
                MHRA approval comes through — and you'll get priority access
                before public launch.
              </p>
              <div className="wlt-cta-perks">
                {[
                  "Priority access before public launch",
                  "Free guide to oral GLP-1 treatment",
                  "Clinician-led support from day one",
                ].map((p) => (
                  <div key={p} className="wlt-cta-perk">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
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
              <div className="wlt-cta-interim">
                Want to start treatment now?{" "}
                <Link
                  href="/weight-loss-treatments/wegovy"
                  className="wlt-cta-interim-link"
                >
                  View the Wegovy injection →
                </Link>
              </div>
            </div>
            <div className="wlt-cta-card">
              <h3 className="wlt-cta-card-title">Reserve your spot</h3>
              <p className="wlt-cta-card-sub">
                Free forever · takes 30 seconds
              </p>
              <WaitlistForm dark />
            </div>
          </div>
        </section>
      </main>

      <Footer data={siteSettings} />

      {/* ═══ STYLES ═══════════════════════════════════════════════════════ */}
      <style jsx global>{`
        /* All tokens scoped to .wlt — zero conflict with the rest of the site */
        html {
          scroll-behavior: smooth;
        }
        .wlt {
          --green: #4caf8a;
          --green-d: #3d9e7a;
          --green-l: #eaf6f0;
          --green-mid: #bfe5d2;
          --ink: #2b5344;
          --ink-soft: #585858;
          --cream: #f8f6f1;
          --sage: #eef3ee;
          --line: #e6e3da;
          --white: #fff;
          --d-heading: "GraphikRegular", sans-serif;
          --d-hero: "GraphikSemibold", sans-serif;
          --d-body: "GraphikRegular", sans-serif;
          --r: 20px;
          --r-sm: 12px;
        }
        .wlt * {
          box-sizing: border-box;
        }
        .wlt {
          font-family: var(--d-heading);
          color: var(--ink);
          background: var(--cream);
          overflow-x: hidden;
        }
        .wlt-wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 24px;
        }
        .wlt-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-family: var(--semibold-font, "GraphikSemibold", sans-serif);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--green-d);
          margin-bottom: 14px;
        }
        .wlt-eyebrow.on-green {
          color: var(--green-mid);
        }
        .wlt-h2 {
          font-family: var(--d-heading);
          font-size: clamp(1.9rem, 3.4vw, 2.9rem);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -1px;
          margin: 0 0 18px;
          color: var(--ink);
        }
        .wlt-h2.on-dark {
          color: var(--white);
        }
        .wlt-p {
          font-size: 16.5px;
          line-height: 1.75;
          color: var(--ink-soft);
          margin: 0 0 16px;
        }
        .wlt-sub {
          font-size: 17px;
          line-height: 1.7;
          color: var(--ink-soft);
          max-width: 600px;
          margin: 0 auto;
        }
        .wlt-section-head {
          text-align: center;
          margin-bottom: 56px;
        }

        /* ── Hero ──────────────────────────────────────────────── */
        .wlt-hero {
          padding: 120px 24px 72px;
          background:
            radial-gradient(
              1200px 600px at 80% -10%,
              rgba(77, 181, 129, 0.1),
              transparent 60%
            ),
            var(--cream);
        }
        .wlt-hero-grid {
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: 64px;
          align-items: center;
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.7s ease,
            transform 0.7s ease;
        }
        .wlt-hero-grid.in {
          opacity: 1;
          transform: none;
        }
        .wlt-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--green-l);
          border: 1px solid var(--green-mid);
          color: var(--green-d);
          padding: 7px 15px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 22px;
        }
        .wlt-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--green);
          animation: wltPulse 2s infinite;
        }
        @keyframes wltPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.45;
            transform: scale(0.8);
          }
        }
        .wlt-hero-h1 {
          font-family: var(--d-hero);
          font-size: clamp(2.4rem, 4.6vw, 4rem);
          font-weight: 400;
          line-height: 1.06;
          letter-spacing: -2px;
          margin: 0 0 20px;
          color: #1a1a1a;
        }
        .wlt-hero-h1 em {
          font-style: normal;
          font-family: var(--d-hero);
          color: var(--green-d);
        }
        .wlt-hero-lede {
          font-size: 18px;
          line-height: 1.7;
          color: var(--ink-soft);
          max-width: 520px;
          margin: 0 0 32px;
        }
        .wlt-hero-form {
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 24px;
          box-shadow: 0 18px 50px rgba(22, 36, 28, 0.08);
          max-width: 480px;
        }
        .wlt-hero-proof {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 24px;
        }
        .wlt-avatars {
          display: flex;
        }
        .wlt-avatars img {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid var(--cream);
          object-fit: cover;
          margin-left: -10px;
        }
        .wlt-avatars img:first-child {
          margin-left: 0;
        }
        .wlt-hero-proof p {
          font-size: 14px;
          color: var(--ink-soft);
          margin: 0;
        }

        .wlt-hero-media {
          display: flex;
          justify-content: center;
        }
        .wlt-hero-imgwrap {
          position: relative;
          width: 100%;
          max-width: 460px;
        }
        .wlt-hero-img {
          width: 100%;
          border-radius: 28px;
          object-fit: cover;
          aspect-ratio: 4/5;
          box-shadow: 0 30px 70px rgba(22, 36, 28, 0.18);
        }
        .wlt-floatcard {
          position: absolute;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          box-shadow: 0 12px 36px rgba(22, 36, 28, 0.14);
          padding: 12px 16px;
          animation: wltFloat 5s ease-in-out infinite alternate;
        }
        .wlt-fc-1 {
          top: 26px;
          left: -28px;
          text-align: left;
        }
        .wlt-fc-1 .wlt-fc-num {
          display: block;
          font-family: var(--d-heading);
          font-size: 26px;
          font-weight: 500;
          color: var(--green-d);
          line-height: 1;
        }
        .wlt-fc-1 .wlt-fc-label {
          font-size: 12px;
          color: var(--ink-soft);
        }
        .wlt-fc-2,
        .wlt-fc-3 {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .wlt-fc-2 {
          bottom: 70px;
          right: -34px;
          animation-delay: 1.4s;
        }
        .wlt-fc-3 {
          bottom: -18px;
          left: 24px;
          animation-delay: 2.6s;
        }
        .wlt-fc-icon {
          font-size: 20px;
        }
        .wlt-floatcard strong {
          display: block;
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .wlt-floatcard span {
          font-size: 11.5px;
          color: var(--ink-soft);
        }
        @keyframes wltFloat {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-10px);
          }
        }

        /* ── Form ──────────────────────────────────────────────── */
        .wlt-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .wlt-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .wlt-field label {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--ink);
        }
        .wlt-input {
          padding: 12px 15px;
          border: 1.5px solid var(--line);
          border-radius: var(--r-sm);
          font-size: 15px;
          font-family: var(--d-heading);
          background: #fbfaf7;
          outline: none;
          transition:
            border-color 0.2s,
            box-shadow 0.2s,
            background 0.2s;
          color: var(--ink);
        }
        .wlt-input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(77, 181, 129, 0.16);
          background: #fff;
        }
        .wlt-input.err {
          border-color: #d65745;
        }
        .wlt-err {
          font-size: 12px;
          color: #d65745;
        }
        .wlt-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--green);
          color: #fff;
          border: none;
          cursor: pointer;
          padding: 14px;
          border-radius: var(--r-sm);
          font-size: 15px;
          font-weight: 600;
          font-family: var(--d-heading);
          transition:
            background 0.2s,
            transform 0.15s;
          margin-top: 2px;
        }
        .wlt-submit:hover {
          background: var(--green-d);
          transform: translateY(-1px);
        }
        .wlt-fineprint {
          font-size: 11.5px;
          color: #8a948d;
          text-align: center;
          margin: 2px 0 0;
        }

        .wlt-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          min-height: 230px;
          padding: 24px;
          animation: wltFade 0.5s ease;
        }
        @keyframes wltFade {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .wlt-spinner {
          width: 48px;
          height: 48px;
          animation: wltSpin 1s linear infinite;
        }
        @keyframes wltSpin {
          to {
            transform: rotate(360deg);
          }
        }
        .wlt-check {
          width: 60px;
          height: 60px;
          margin-bottom: 14px;
        }
        .wlt-check circle {
          stroke-dasharray: 157;
          stroke-dashoffset: 157;
          animation: wltDraw 0.6s ease forwards;
        }
        .wlt-check path {
          stroke-dasharray: 40;
          stroke-dashoffset: 40;
          animation: wltDraw 0.4s ease 0.5s forwards;
        }
        @keyframes wltDraw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .wlt-state-title {
          font-family: var(--d-heading);
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 8px;
          color: var(--ink);
        }
        .wlt-state-body {
          font-size: 14px;
          color: var(--ink-soft);
          line-height: 1.6;
          max-width: 300px;
          margin: 0;
        }
        .wlt-state.on-dark .wlt-state-title {
          color: var(--ink);
        }

        /* ── Trust strip ───────────────────────────────────────── */
        .wlt-trust {
          background: var(--ink);
          color: rgba(255, 255, 255, 0.92);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 28px;
          padding: 16px 24px;
        }
        .wlt-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.85);
        }
        .wlt-trust-item svg {
          color: var(--green);
        }

        /* ── Announce ──────────────────────────────────────────── */
        .wlt-announce {
          padding: 96px 0;
          background: var(--white);
        }
        .wlt-announce-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .wlt-announce-media {
          position: relative;
        }
        .wlt-announce-media img {
          width: 100%;
          border-radius: var(--r);
          object-fit: cover;
          aspect-ratio: 4/3;
        }
        .wlt-announce-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          background: var(--green);
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: 100px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .wlt-announce-time {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 24px;
          padding: 16px 20px;
          background: var(--green-l);
          border-radius: var(--r-sm);
          font-size: 14.5px;
          color: var(--ink-soft);
        }
        .wlt-announce-time strong {
          color: var(--ink);
        }
        .wlt-time-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--green);
          flex-shrink: 0;
          box-shadow: 0 0 0 4px rgba(77, 181, 129, 0.2);
        }

        /* ── What ──────────────────────────────────────────────── */
        .wlt-what {
          padding: 96px 0;
        }
        .wlt-what-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 64px;
          align-items: center;
        }
        .wlt-what-media img {
          width: 100%;
          border-radius: var(--r);
          object-fit: cover;
          aspect-ratio: 1/1;
          box-shadow: 0 20px 50px rgba(22, 36, 28, 0.1);
        }
        .wlt-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 24px;
        }
        .wlt-chip {
          background: var(--white);
          border: 1px solid var(--green-mid);
          color: var(--green-d);
          font-size: 13px;
          font-weight: 600;
          padding: 7px 15px;
          border-radius: 100px;
        }

        /* ── Stats ─────────────────────────────────────────────── */
        .wlt-stats {
          padding: 84px 0;
          background: var(--ink);
        }
        .wlt-stats-head {
          text-align: center;
          margin-bottom: 48px;
        }
        .wlt-stats-row {
          display: flex;
          align-items: stretch;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0;
        }
        .wlt-stat {
          text-align: center;
          padding: 16px 44px;
          flex: 1;
          min-width: 180px;
        }
        .wlt-stat-num {
          display: block;
          font-family: var(--d-heading);
          font-size: clamp(2.6rem, 5vw, 3.8rem);
          font-weight: 500;
          color: var(--green);
          line-height: 1;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
        }
        .wlt-stat-label {
          font-size: 13.5px;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.45;
          display: block;
        }
        .wlt-stat-sep {
          width: 1px;
          background: rgba(255, 255, 255, 0.12);
          align-self: stretch;
        }
        .wlt-stats-note {
          text-align: center;
          font-size: 12px;
          color: rgb(255, 255, 255);
          margin-top: 36px;
          max-width: 720px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        /* ── Compare ───────────────────────────────────────────── */
        .wlt-compare {
          padding: 96px 0;
          background: var(--sage);
        }
        .wlt-compare-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 880px;
          margin: 0 auto;
        }
        .wlt-cc {
          position: relative;
          background: var(--white);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 32px 28px;
        }
        .wlt-cc-feature {
          border: 2px solid var(--green);
          box-shadow: 0 18px 50px rgba(77, 181, 129, 0.14);
        }
        .wlt-cc-tag {
          position: absolute;
          top: 20px;
          right: 20px;
          background: var(--green);
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          padding: 5px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .wlt-cc-tag.muted {
          background: var(--ink-soft);
        }
        .wlt-cc-img {
          width: 110px;
          height: 110px;
          object-fit: contain;
          margin-bottom: 16px;
        }
        .wlt-cc-title {
          font-family: var(--d-heading);
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 4px;
        }
        .wlt-cc-sub {
          font-size: 13.5px;
          color: var(--ink-soft);
          margin: 0 0 20px;
        }
        .wlt-cc-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .wlt-cc-list li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 11px 0;
          border-top: 1px solid var(--line);
          font-size: 14px;
        }
        .wlt-cc-list b {
          color: var(--ink-soft);
          font-weight: 500;
        }
        .wlt-cc-list span {
          font-weight: 600;
          color: var(--ink);
        }
        .wlt-cc-feature .wlt-cc-list span {
          color: var(--green-d);
        }
        .wlt-cc-link {
          display: inline-block;
          margin-top: 18px;
          font-size: 14px;
          font-weight: 600;
          color: var(--green-d);
          text-decoration: none;
        }
        .wlt-cc-link:hover {
          text-decoration: underline;
        }
        .wlt-join-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 20px;
          padding: 13px 20px;
          background: var(--green);
          color: #fff;
          border-radius: var(--r-sm);
          font-size: 15px;
          font-weight: 600;
          font-family: var(--d-heading);
          text-decoration: none;
          transition:
            background 0.2s,
            transform 0.15s;
        }
        .wlt-join-btn:hover {
          background: var(--green-d);
          transform: translateY(-1px);
        }

        /* ── How ───────────────────────────────────────────────── */
        .wlt-how {
          padding: 96px 0;
          background: var(--white);
        }
        .wlt-how-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        .wlt-how-card {
        }
        .wlt-how-imgwrap {
          position: relative;
          border-radius: var(--r);
          overflow: hidden;
          margin-bottom: 20px;
          aspect-ratio: 4/3;
        }
        .wlt-how-imgwrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .wlt-how-card:hover .wlt-how-imgwrap img {
          transform: scale(1.05);
        }
        .wlt-how-num {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--d-heading);
          font-weight: 500;
          font-size: 16px;
          color: var(--green-d);
        }
        .wlt-how-title {
          font-family: var(--d-heading);
          font-size: 20px;
          font-weight: 500;
          margin: 0 0 10px;
        }
        .wlt-how-body {
          font-size: 15px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Testimonials ──────────────────────────────────────── */
        .wlt-testi {
          padding: 96px 0;
          background: var(--white);
        }
        .wlt-testi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .wlt-testi-card {
          position: relative;
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 32px 28px;
        }
        .wlt-quotemark {
          font-family: var(--d-heading);
          font-size: 64px;
          line-height: 0.6;
          color: var(--green-mid);
          height: 30px;
        }
        .wlt-testi-card blockquote {
          font-size: 16px;
          line-height: 1.7;
          color: var(--ink);
          margin: 0 0 24px;
          font-style: italic;
        }
        .wlt-testi-card figcaption {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .wlt-testi-card figcaption img {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
        }
        .wlt-testi-card figcaption strong {
          display: block;
          font-size: 14.5px;
          font-weight: 700;
          color: var(--ink);
        }
        .wlt-testi-card figcaption span {
          font-size: 12.5px;
          color: var(--ink-soft);
        }
        .wlt-testi-foot {
          text-align: center;
          margin-top: 40px;
          font-size: 15px;
          color: var(--ink-soft);
        }
        .wlt-testi-foot strong {
          color: var(--ink);
        }
        .wlt-stars {
          color: #f5a623;
          font-size: 20px;
          letter-spacing: 2px;
          margin-bottom: 6px;
        }

        /* ── Why ───────────────────────────────────────────────── */

        /* ── Final CTA ─────────────────────────────────────────── */
        .wlt-cta {
          padding: 96px 0;
          background:
            radial-gradient(
              900px 500px at 15% 110%,
              rgba(77, 181, 129, 0.16),
              transparent 60%
            ),
            var(--ink);
        }
        .wlt-cta-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .wlt-cta-p {
          font-size: 16.5px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin: 0 0 28px;
        }
        .wlt-cta-perks {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 28px;
        }
        .wlt-cta-perk {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          color: rgba(255, 255, 255, 0.88);
        }
        .wlt-cta-interim {
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
          font-size: 14px;
          color: rgba(255, 255, 255, 0.88);
        }
        .wlt-cta-interim-link {
          color: var(--green);
          font-weight: 600;
          text-decoration: none;
        }
        .wlt-cta-interim-link:hover {
          text-decoration: underline;
        }
        .wlt-cta-card {
          background: var(--white);
          border-radius: var(--r);
          padding: 32px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
        }
        .wlt-cta-card-title {
          font-family: var(--d-heading);
          font-size: 22px;
          font-weight: 500;
          margin: 0 0 4px;
          color: var(--ink);
        }
        .wlt-cta-card-sub {
          font-size: 13.5px;
          color: var(--ink-soft);
          margin: 0 0 22px;
        }

        /* ── Evidence / threshold bars ─────────────────────────── */
        .wlt-evidence {
          padding: 96px 0;
          background: var(--white);
        }
        .wlt-evidence-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 64px;
          align-items: center;
        }
        .wlt-legend {
          display: flex;
          gap: 22px;
          margin-top: 24px;
        }
        .wlt-legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--ink-soft);
        }
        .wlt-legend-item i {
          width: 14px;
          height: 14px;
          border-radius: 4px;
        }
        .wlt-dot-green {
          background: var(--green);
        }
        .wlt-dot-grey {
          background: #cfd6cf;
        }
        .wlt-bars-card {
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 32px;
        }
        .wlt-bar-group {
          margin-bottom: 26px;
        }
        .wlt-bar-label {
          font-size: 14px;
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 10px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }
        .wlt-bar-label span {
          font-size: 12px;
          font-weight: 400;
          color: var(--ink-soft);
        }
        .wlt-bar-track {
          height: 34px;
          background: #fff;
          border-radius: 8px;
          margin-bottom: 7px;
          border: 1px solid var(--line);
          display: flex;
          align-items: center;
        }
        .wlt-bar {
          height: 100%;
          width: 0;
          border-radius: 7px;
          flex-shrink: 0;
          animation: wltGrow 1.1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--delay);
        }
        .wlt-bar-green {
          background: linear-gradient(90deg, var(--green) 0%, #5cc592 100%);
        }
        .wlt-bar-grey {
          background: #d6ddd6;
        }
        .wlt-bar-val {
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          padding: 0 10px;
          opacity: 0;
          animation: wltFadeVal 0.4s ease forwards;
          animation-delay: calc(var(--delay) + 0.5s);
        }
        .wlt-val-green {
          color: var(--green-d);
        }
        .wlt-val-grey {
          color: var(--ink-soft);
        }
        @keyframes wltGrow {
          to {
            width: var(--target);
          }
        }
        @keyframes wltFadeVal {
          to {
            opacity: 1;
          }
        }
        .wlt-bars-note {
          font-size: 11px;
          color: #8a948d;
          line-height: 1.6;
          margin: 18px 0 0;
        }

        /* ── Journey timeline ──────────────────────────────────── */
        .wlt-journey {
          padding: 96px 0;
          background: var(--sage);
        }
        .wlt-timeline {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .wlt-timeline-line {
          position: absolute;
          top: 11px;
          left: 8%;
          right: 8%;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--green-mid),
            var(--green),
            var(--green-mid)
          );
          z-index: 0;
        }
        .wlt-tl-step {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .wlt-tl-node {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid var(--green);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 0 0 5px var(--sage);
        }
        .wlt-tl-node-inner {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: var(--green);
        }
        .wlt-tl-card {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: var(--r);
          padding: 26px 24px;
          text-align: left;
          height: 100%;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
        }
        .wlt-tl-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 36px rgba(22, 36, 28, 0.08);
        }
        .wlt-tl-phase {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--green-d);
          background: var(--green-l);
          padding: 4px 11px;
          border-radius: 100px;
          margin-bottom: 12px;
        }
        .wlt-tl-title {
          font-family: var(--d-heading);
          font-size: 19px;
          font-weight: 500;
          margin: 0 0 10px;
          color: var(--ink);
        }
        .wlt-tl-body {
          font-size: 14.5px;
          line-height: 1.7;
          color: var(--ink-soft);
          margin: 0;
        }

        /* ── Responsive ────────────────────────────────────────── */
        @media (max-width: 980px) {
          .wlt-hero-grid,
          .wlt-announce-grid,
          .wlt-what-grid,
          .wlt-cta-grid {
            grid-template-columns: 1fr;
            gap: 44px;
          }
          .wlt-hero-media {
            order: -1;
          }
          .wlt-announce-media {
            order: -1;
          }
          .wlt-how-grid,
          .wlt-testi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .wlt-stat-sep {
            display: none;
          }
          .wlt-stat {
            min-width: 45%;
          }
          .wlt-evidence-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .wlt-timeline {
            grid-template-columns: 1fr;
            gap: 0;
            max-width: 520px;
          }
          .wlt-timeline-line {
            left: 11px;
            right: auto;
            top: 0;
            bottom: 0;
            width: 2px;
            height: auto;
            background: linear-gradient(
              180deg,
              var(--green-mid),
              var(--green),
              var(--green-mid)
            );
          }
          .wlt-tl-step {
            flex-direction: row;
            align-items: flex-start;
            gap: 22px;
            text-align: left;
            padding-bottom: 28px;
          }
          .wlt-tl-node {
            margin-bottom: 0;
            flex-shrink: 0;
          }
          .wlt-tl-card {
            flex: 1;
          }
        }
        @media (max-width: 600px) {
          .wlt-hero {
            padding: 100px 20px 56px;
          }
          .wlt-announce,
          .wlt-what,
          .wlt-compare,
          .wlt-how,
          .wlt-testi,
          .wlt-cta,
          .wlt-stats,
          .wlt-evidence,
          .wlt-journey {
            padding: 64px 0;
          }
          .wlt-how-grid,
          .wlt-testi-grid,
          .wlt-compare-cards {
            grid-template-columns: 1fr;
          }
          .wlt-fc-1 {
            left: -12px;
          }
          .wlt-fc-2 {
            right: -10px;
          }
          .wlt-stat {
            min-width: 100%;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wlt-floatcard,
          .wlt-badge-dot {
            animation: none;
          }
          .wlt-hero-grid {
            transition: none;
          }
        }
      `}</style>
    </>
  );
}
