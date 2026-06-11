"use client";

import { useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  HeartPulse,
  Mail,
  Menu,
  Pill,
  Shield,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Syringe,
  User,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { sanityClient } from "../lib/sanity";
import { generateSchema } from "../lib/schemaGenerator";
import { meta_url } from "../config/constants";
import MetaLayout from "../Meta/MetaLayout";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "wegovy-tablet-2",
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

const navLinks = [
  { label: "Treatment", href: "#treatment" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Benefits", href: "#benefits" },
  { label: "FAQs", href: "#faqs" },
];

const heroBullets = [
  "No needles",
  "Tablet-based routine",
  "Priority availability updates",
  "Clinician-led guidance",
];

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Registration only",
    text: "No prescription at this stage",
  },
  {
    icon: ShieldCheck,
    title: "No payment required",
    text: "Join the waitlist for free",
  },
  {
    icon: Stethoscope,
    title: "Clinical review required",
    text: "Suitability must be assessed",
  },
  {
    icon: Bell,
    title: "Priority updates",
    text: "Get notified first",
  },
];

const benefits = [
  {
    icon: Pill,
    title: "Oral tablet format",
    text: "A future tablet-based option for people interested in weight management support.",
  },
  {
    icon: Syringe,
    title: "No injection pen",
    text: "Designed for users who prefer a non-injection routine.",
  },
  {
    icon: Bell,
    title: "Early access updates",
    text: "Receive important availability and consultation updates by email.",
  },
  {
    icon: HeartPulse,
    title: "Clinician-led pathway",
    text: "Any future treatment must be reviewed by a qualified clinician.",
  },
];

const steps = [
  {
    title: "Join the waitlist",
    text: "Submit your name and email address using the simple interest form.",
  },
  {
    title: "Receive updates",
    text: "We’ll notify you when meaningful Wegovy oral tablet updates are available.",
  },
  {
    title: "Complete consultation",
    text: "When available, treatment suitability will require a clinician-reviewed consultation.",
  },
];

const comparisonRows = [
  {
    feature: "Format",
    wegovy: "Oral tablet",
    injectable: "Injection pen",
  },
  {
    feature: "Status",
    wegovy: "Coming Soon",
    injectable: "Available separately",
  },
  {
    feature: "Needles",
    wegovy: "No needles",
    injectable: "Requires injection",
  },
  {
    feature: "Clinical review",
    wegovy: "Required",
    injectable: "Required",
  },
  {
    feature: "Availability",
    wegovy: "Subject to approval",
    injectable: "Depends on service",
  },
];

const registerReasons = [
  "Be first to receive availability updates",
  "Get notified when consultation opens",
  "Learn about tablet-based weight management options",
  "No payment required today",
  "Registration is quick and simple",
];

const faqs = [
  {
    question: "Is Wegovy oral tablet available now?",
    answer:
      "This page is for registration of interest only. Availability depends on regulatory approval, supply, and clinical guidance.",
  },
  {
    question: "Do I need to pay today?",
    answer:
      "No. Joining the waitlist is free and only requires your name and email address.",
  },
  {
    question: "Is this an injection?",
    answer:
      "No. This page is focused on interest in an oral tablet format, not an injection pen.",
  },
  {
    question: "Will I automatically get treatment?",
    answer:
      "No. Any future treatment would require a proper consultation and approval from a qualified clinician.",
  },
  {
    question: "What happens after I join?",
    answer:
      "You’ll see a confirmation message and receive updates when availability or consultation details are ready.",
  },
];

export default function WegovyLandingPage({ seoSettings, data, siteSettings }) {
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data) => {
    console.log("Wegovy waitlist data:", data);

    await new Promise((resolve) => setTimeout(resolve, 700));

    setSubmitted(true);
  };

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/wegovy-tablet-2`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/wegovy-tablet-2`}
        autoSchemas={autoSchemas}
      />
      <main className="min-h-screen overflow-hidden bg-[#F8FAFF] text-[#102A69] smooth-scroll">
        {/* <header className="sticky top-0 z-50 border-b border-[#EEF4FF] bg-white/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4B5FC0] text-white shadow-lg shadow-[#4B5FC0]/25">
              <Pill className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-lg mont-bold-font tracking-[-0.04em]">
                Wegovy
              </span>
              <span className="block text-xs mont-bold-font text-[#5B6B8C]">
                Oral GLP-1 Tablets
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm mont-bold-font text-[#5B6B8C] transition hover:text-[#4B5FC0]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#waitlist"
            className="hidden rounded-full bg-[#4B5FC0] cursor-pointer px-6 py-3 text-sm mont-bold-font text-white shadow-lg shadow-[#4B5FC0]/20 transition hover:-translate-y-0.5 hover:bg-[#102A69] lg:inline-flex"
          >
            Join Waitlist
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#4B5FC0] lg:hidden"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-[#EEF4FF] bg-white px-5 py-5 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-2xl bg-[#F8FAFF] px-4 py-3 text-sm mont-bold-font text-[#102A69]"
                >
                  {link.label}
                </a>
              ))}

              <a
                href="#waitlist"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-2xl cursor-pointer bg-[#4B5FC0] px-4 py-3 text-center text-sm mont-bold-font text-white"
              >
                Join Waitlist
              </a>
            </div>
          </div>
        )}
      </header> */}

        <section className="bg-[#41a27e] px-5 py-3 text-center text-sm mont-bold-font text-white lg:px-8">
          Wegovy Oral GLP-1 Tablets Coming Soon — Join the waitlist for priority
          updates
        </section>

        <section className="relative px-5 py-14 lg:px-8 lg:py-20">
          <div className="pointer-events-none absolute left-[-120px] top-[-140px] h-[420px] w-[420px] rounded-full bg-[#D9E3FF]/40 blur-3xl" />
          <div className="pointer-events-none absolute bottom-[-140px] right-[-140px] h-[420px] w-[420px] rounded-full bg-[#4B5FC0]/15 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.20fr_0.80fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#D6E2FF] bg-white px-4 py-2 text-xs mont-bold-font uppercase tracking-[0.18em] text-[#4B5FC0] shadow-sm">
                <Sparkles className="h-4 w-4" />
                Oral Weight Loss Medication
              </div>

              <h1 className="max-w-4xl text-5xl mont-bold-font leading-[1.02] tracking-[-0.06em] text-[#41a27e] md:text-6xl lg:text-7xl">
                Wegovy Oral
                <span className="block text-[#102A69]">GLP-1 Tablets</span>
                <span className="block text-[#102A69]">Coming Soon</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg mont-reg-font leading-8 text-[#5B6B8C]">
                Be the first to know when Wegovy oral GLP-1 tablets become
                available. Register your interest for priority updates.
              </p>

              <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
                {heroBullets.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-[#EEF4FF] bg-white px-4 py-3 shadow-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#41A27E]" />
                    <span className="text-sm mont-bold-font text-[#102A69]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#how-it-works"
                  className="group inline-flex items-center cursor-pointer justify-center gap-3 rounded-full bg-[#41a27e] px-7 py-4 text-sm mont-bold-font text-white shadow-xl shadow-[#4B5FC0]/25 transition hover:-translate-y-1 hover:bg-[#102A69]"
                >
                  Join in three steps
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div id="waitlist" className="relative">
              <div className="absolute -inset-4 rounded-[3rem] bg-gradient-to-br from-[#D9E3FF]/70 via-[#4B5FC0]/20 to-[#102A69]/20 blur-2xl" />

              <div className="soft-shadow relative overflow-hidden rounded-[2.4rem] border border-white bg-white p-4">
                <div className="relative min-h-[360px] overflow-hidden rounded-[1.9rem] bg-[#EEF4FF]">
                  <img
                    src="/Images/hero-man-drinking-water.png"
                    alt="Person drinking water for healthy lifestyle"
                    className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#102A69]/75 via-[#102A69]/10 to-transparent" />

                  <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs mont-bold-font uppercase tracking-[0.16em] text-[#4B5FC0]">
                    Coming Soon
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 rounded-[1.5rem] border border-white/20 bg-white/90 p-4 backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF]">
                        <img
                          src="/Images/wegovy-pack.png"
                          alt="Wegovy oral GLP-1 tablets pack"
                          className="h-16 w-16 object-contain"
                        />
                      </div>

                      <div>
                        <p className="text-xs mont-bold-font uppercase tracking-[0.16em] text-[#4B5FC0]">
                          Product
                        </p>
                        <h2 className="mt-1 text-xl mont-bold-font tracking-[-0.04em] text-[#102A69]">
                          Wegovy Oral Tablets
                        </h2>
                        <p className="mt-1 text-sm mont-reg-font text-[#5B6B8C]">
                          Waitlist now open
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-2 pt-6 sm:p-4 sm:pt-7">
                  <div className="mb-6 flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#4B5FC0]">
                      <ClipboardCheck className="h-6 w-6" />
                    </div>

                    <div>
                      <h2 className="text-2xl mont-bold-font tracking-[-0.05em] cursor-pointer text-[#102A69]">
                        Join the waitlist
                      </h2>
                      <p className="mt-1 text-sm mont-reg-font leading-6 text-[#5B6B8C]">
                        Add your name and email to receive future updates.
                      </p>
                    </div>
                  </div>

                  {submitted ? (
                    <div
                      aria-live="polite"
                      className="rounded-[1.8rem] border border-[#D9E3FF] bg-[#EEF4FF] p-7 text-center"
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#41A27E] text-white shadow-xl shadow-[#41A27E]/25">
                        <Check className="h-8 w-8" />
                      </div>

                      <h3 className="mt-5 text-2xl mont-bold-font tracking-[-0.05em] text-[#102A69]">
                        Thank you!
                      </h3>

                      <p className="mt-2 text-sm mont-reg-font leading-6 text-[#5B6B8C]">
                        You’re on the Wegovy waitlist. We’ll contact you when
                        new availability updates are ready.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <div>
                        {/* <label
                        htmlFor="name"
                        className="mb-2 block text-sm mont-bold-font text-[#102A69]"
                      >
                        Full Name
                      </label> */}

                        <div className="relative">
                          <User className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8AAF]" />

                          <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register("name", {
                              required: "Name is required",
                              minLength: {
                                value: 2,
                                message: "Name must be at least 2 characters",
                              },
                              maxLength: {
                                value: 50,
                                message:
                                  "Name must not be more than 50 characters",
                              },
                              validate: (value) =>
                                value.trim().length > 0 ||
                                "Name cannot be empty",
                            })}
                            className={`input-shadow w-full rounded-2xl border bg-white px-12 py-4 text-sm mont-reg-font text-[#102A69] outline-none transition placeholder:text-[#8A97B8] focus:ring-4 ${
                              errors.name
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-[#DCE7FF] focus:border-[#4B5FC0] focus:ring-[#D9E3FF]/35"
                            }`}
                          />
                        </div>

                        {errors.name && (
                          <p className="mt-2 text-sm mont-reg-font text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        {/* <label
                        htmlFor="email"
                        className="mb-2 block text-sm mont-bold-font text-[#102A69]"
                      >
                        Email Address
                      </label> */}

                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#7A8AAF]" />

                          <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                              required: "Email is required",
                              maxLength: {
                                value: 100,
                                message:
                                  "Email must not be more than 100 characters",
                              },
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Please enter a valid email address",
                              },
                              validate: (value) =>
                                value.trim().length > 0 ||
                                "Email cannot be empty",
                            })}
                            className={`input-shadow w-full rounded-2xl border bg-white px-12 py-4 text-sm mont-reg-font text-[#102A69] outline-none transition placeholder:text-[#8A97B8] focus:ring-4 ${
                              errors.email
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-[#DCE7FF] focus:border-[#4B5FC0] focus:ring-[#D9E3FF]/35"
                            }`}
                          />
                        </div>

                        {errors.email && (
                          <p className="mt-2 text-sm mont-reg-font text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#41a27e] px-6 py-4 text-sm mont-bold-font text-white shadow-xl shadow-[#4B5FC0]/25 transition hover:-translate-y-0.5 hover:bg-[#102A69] disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {isSubmitting ? "Submitting..." : "Join Waitlist"}
                        <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
                      </button>

                      <p className="text-center text-xs mont-reg-font leading-5 text-[#5B6B8C]">
                        Registration of interest only. No payment required.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 pb-12 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 rounded-[2rem] border border-[#EEF4FF] bg-white p-4 shadow-xl shadow-[#102A69]/5 md:grid-cols-2 lg:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-[1.5rem] bg-[#F8FAFF] p-5"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#4B5FC0]">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="text-sm mont-bold-font tracking-[-0.03em] text-[#102A69]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs mont-med-font leading-5 text-[#5B6B8C]">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="treatment" className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-[#41a37f] px-4 py-2 text-sm mont-bold-font text-white">
                Product Focus
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69] md:text-5xl">
                One product. Clear waitlist.
              </h2>

              <p className="mt-4 text-base mont-reg-font leading-7 text-[#5B6B8C]">
                This page is focused only on Wegovy Oral GLP-1 Tablets.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-5xl overflow-hidden rounded-[2.5rem] border border-[#EEF4FF] bg-white card-shadow">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex min-h-[420px] items-center justify-center bg-[#EEF4FF] p-8">
                  <div className="absolute left-6 top-6 rounded-full bg-[#41a27e] px-4 py-2 text-xs mont-bold-font uppercase tracking-[0.16em] text-white">
                    Coming Soon
                  </div>

                  <img
                    src="/Images/wegovy-bottle.png"
                    alt="Wegovy oral GLP-1 tablet bottle"
                    className="relative z-10 h-72 w-72 object-contain drop-shadow-2xl"
                  />

                  <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-[#D9E3FF]/60 blur-2xl" />
                </div>

                <div className="p-8 md:p-12">
                  <p className="text-xs mont-bold-font uppercase tracking-[0.18em] text-[#4B5FC0]">
                    Oral GLP-1 medication
                  </p>

                  <h3 className="mt-3 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69]">
                    Wegovy Oral GLP-1 Tablets
                  </h3>

                  <p className="mt-5 text-base mont-reg-font leading-8 text-[#5B6B8C]">
                    A future tablet-based weight management option designed for
                    people interested in a non-injection treatment pathway.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {[
                      ["Status", "Coming Soon"],
                      ["Format", "Oral tablet"],
                      ["Use", "Weight management support"],
                      ["Availability", "Subject to approval"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-2xl border border-[#EEF4FF] bg-[#F8FAFF] p-4"
                      >
                        <p className="text-xs mont-bold-font uppercase tracking-[0.14em] text-[#4B5FC0]">
                          {label}
                        </p>
                        <p className="mt-2 text-sm mont-bold-font text-[#102A69]">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#waitlist"
                    className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#41a27e] px-7 py-4 text-sm mont-bold-font text-white shadow-xl shadow-[#4B5FC0]/20 transition hover:-translate-y-1 hover:bg-[#102A69]"
                  >
                    Join Waitlist
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="rounded-full bg-[#41a37f] px-4 py-2 text-sm mont-bold-font text-white">
                Availability
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69] md:text-5xl">
                When will Wegovy oral tablets be available?
              </h2>

              <p className="mt-5 text-base mont-reg-font leading-8 text-[#5B6B8C]">
                Wegovy oral GLP-1 tablets are expected as a future weight
                management option. Availability depends on UK regulatory
                approval, supply, and clinical prescribing guidance.
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#EEF4FF] p-4">
              <img
                src="/Images/tablets-hand.png"
                alt="Oral tablets in hand"
                className="h-[460px] w-full rounded-[2rem] object-cover"
              />

              <div className="absolute inset-x-10 top-10 text-center">
                <span className="mont-reg-font text-7xl italic leading-none text-white drop-shadow-xl md:text-8xl">
                  soon
                </span>
              </div>

              <div className="absolute bottom-8 left-8 right-8 rounded-[1.7rem] bg-white/90 p-5 shadow-2xl backdrop-blur-xl">
                <p className="text-sm mont-reg-font uppercase tracking-[0.16em] text-[#4B5FC0]">
                  Waitlist open
                </p>
                <h3 className="mt-1 text-2xl mont-bold-font tracking-[-0.05em]">
                  Register your interest today
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="rounded-full bg-[#41a37f] px-4 py-2 text-sm mont-bold-font text-white">
                Benefits
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69] md:text-5xl">
                A simpler tablet-based interest journey
              </h2>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div
                    key={benefit.title}
                    className="group rounded-[2rem] border border-[#EEF4FF] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#102A69]/10"
                  >
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF4FF] text-[#41a37f] transition group-hover:bg-[#41a37f] group-hover:text-white">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-lg mont-bold-font tracking-[-0.04em] text-[#102A69]">
                      {benefit.title}
                    </h3>

                    <p className="mt-3 text-sm mont-reg-font leading-6 text-[#5B6B8C]">
                      {benefit.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-[2.8rem] bg-[#102A69] p-6 text-white md:p-10 lg:p-14">
            <div className="max-w-2xl">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm mont-bold-font text-[#D9E3FF]">
                How It Works
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] md:text-5xl">
                Join in three simple steps
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 backdrop-blur-xl"
                >
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D9E3FF] text-xl mont-bold-font text-[#102A69]">
                    {index + 1}
                  </div>

                  <h3 className="text-xl mont-bold-font tracking-[-0.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm mont-reg-font leading-6 text-white/65">
                    {step.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-2xl">
              <span className="rounded-full bg-[#41a37f] px-4 py-2 text-sm mont-bold-font text-white">
                Comparison
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69] md:text-5xl">
                Tablets vs injections
              </h2>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-[#EEF4FF] bg-white shadow-xl shadow-[#102A69]/5">
              <div className="grid grid-cols-3 bg-[#41a37f] text-white">
                <div className="p-4 text-sm mont-bold-font md:p-6">Feature</div>
                <div className="bg-[#41a37f] p-4 text-sm mont-bold-font md:p-6">
                  Wegovy Oral Tablets
                </div>
                <div className="p-4 text-sm mont-bold-font md:p-6">
                  Injectable GLP-1 Options
                </div>
              </div>

              {comparisonRows.map((row) => (
                <div
                  key={row.feature}
                  className="grid grid-cols-3 border-t border-[#EEF4FF]"
                >
                  <div className="p-4 text-sm mont-bold-font text-[#102A69] md:p-6">
                    {row.feature}
                  </div>
                  <div className="bg-[#EEF4FF] p-4 text-sm mont-bold-font text-[#4B5FC0] md:p-6">
                    {row.wegovy}
                  </div>
                  <div className="p-4 text-sm mont-reg-font text-[#5B6B8C] md:p-6">
                    {row.injectable}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2.8rem] bg-[#F0FAF7] p-6 md:p-10 lg:grid-cols-[0.95fr_1.05fr] lg:p-14">
            <div>
              <span className="rounded-full bg-[#41a37f] px-4 py-2 text-sm mont-bold-font text-white">
                Why Register?
              </span>

              <h2 className="mt-5 text-4xl mont-bold-font tracking-[-0.06em] text-[#102A69] md:text-5xl">
                Why join the Wegovy waitlist?
              </h2>

              <div className="mt-8 space-y-4">
                {registerReasons.map((reason) => (
                  <div key={reason} className="flex items-start gap-4">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#41a37f] text-white">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm mont-bold-font leading-6 text-[#102A69]">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex min-h-[240px] items-center justify-center rounded-[2rem] bg-[#EAF4FF] p-8">
                <img
                  src="/Images/wegovy-pack.png"
                  alt="Wegovy pack"
                  className="h-48 w-48 object-contain drop-shadow-xl"
                />
              </div>

              <div className="row-span-2 overflow-hidden rounded-[2rem]">
                <img
                  src="/Images/doctor-consultation.png"
                  alt="Clinician consultation"
                  className="h-full min-h-[500px] w-full object-cover"
                />
              </div>

              <div className="flex min-h-[240px] items-center justify-center rounded-[2rem] bg-[#EEF4FF] p-8">
                <img
                  src="/Images/wegovy-bottle.png"
                  alt="Wegovy bottle"
                  className="h-48 w-48 object-contain drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 lg:px-8">
          <div className="purple-gradient  mx-auto max-w-7xl overflow-hidden rounded-[2.8rem] p-8 text-center text-white shadow-2xl shadow-[#102A69]/20 md:p-14">
            <Sparkles className="mx-auto h-12 w-12 text-[#D9E3FF]" />

            <h2 className="mx-auto mt-6 max-w-3xl text-4xl mont-bold-font tracking-[-0.06em] md:text-6xl">
              Join the Wegovy Oral GLP-1 Tablets Waitlist
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base mont-reg-font leading-8 text-white/75">
              Register your interest today and receive priority updates when new
              availability information is ready.
            </p>

            <a
              href="#waitlist"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm mont-bold-font text-[#4B5FC0] shadow-xl transition hover:-translate-y-1 hover:bg-[#D9E3FF]"
            >
              Join Waitlist
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </section>
        <footer className="border-t border-[#EEF4FF] bg-white">
          <section className="px-5 py-10 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                <div>
                  {" "}
                  <div className="max-w-md">
                    <div className="mb-4">
                      <Image
                        src={
                          "https://cdn.sanity.io/images/1bpeg73a/production/56c0179e410d05fa2bf750c4fd1a6fe4c1fe8083-1500x478.png" ||
                          "/Images/logo.png"
                        }
                        alt="Online Weight Loss Clinic Logo"
                        width={160}
                        height={60}
                      />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed footer-font-size">
                      Online Weight Loss Clinic provides clinician-led weight
                      loss treatments in the UK using MHRA - approved
                      medications. All consultations are conducted by qualified
                      healthcare professionals to ensure safe, personalised
                      care.
                    </p>
                  </div>
                </div>

                <div>
                  {" "}
                  <div className="border-gray-200 py-2 flex flex-col sm:flex-row items-end justify-end gap-6">
                    <div className="flex w-full max-w-md items-center justify-end">
                      <div className="flex justify-center relative left-9 sm:left-0">
                        <Image
                          src="/Images/footer-payment.png"
                          alt="Payment Methods"
                          width={1200}
                          height={150}
                          className="w-full h-auto object-contain footer_payment_visa "
                        />
                      </div>

                      <div className="flex sm:justify-start ms-16 sm:ms-8">
                        <Link
                          href="https://www.legitscript.com/websites/Onlineweightlossclinic.co.uk"
                          target="_blank"
                          className="w-20"
                        >
                          <Image
                            src="/Images/legitscript-logo.png"
                            alt="Legitscript Logo"
                            width={50}
                            height={50}
                            className="w-full h-auto"
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Newsletter ✌️✌️✌️✌️✌️ */}

                    {/* <NextButton
            label="Join Our Newsletter"
            onClick={() => setOpen(true)}
          /> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-7xl">
              {/* ── 6/6 EQUAL COLUMNS ── */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                {/* LEFT 6 COLUMN */}
                <div>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://www.pharmacyregulation.org/registers/pharmacy/registrationnumber/1039469"
                      className="shrink-0 text-[#41A27E] hover:underline footer-bottom-size"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View Primed Pharmacy GPhC registration"
                    >
                      <Image
                        src="/Images/registered.png"
                        width={70}
                        height={70}
                        alt="GPhC Registered"
                        className="h-[70px] w-[70px] object-contain"
                      />
                    </a>

                    <div>
                      <p className="text-sm mont-bold-font text-[#102A69] footer-bottom-size">
                        Primed Pharmacy
                      </p>

                      <p className="mt-1 text-xs text-[#5B6B8C] footer-bottom-size mont-reg-font">
                        GPhC Registration:{" "}
                        <a
                          href="https://www.pharmacyregulation.org/registers/pharmacy/registrationnumber/1039469"
                          className="text-[#41A27E] hover:underline footer-bottom-size mont-bold-font"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          1039469
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* RIGHT 6 COLUMN */}
                <div className="flex flex-col gap-4 md:items-end md:text-right">
                  <p className="max-w-xl text-left text-xs leading-relaxed text-[#5B6B8C] mont-reg-font md:text-right">
                    Primed Pharmacy is our partner pharmacy. All dispensing and
                    shipping of medicines is completed by Primed Pharmacy, a UK
                    licensed, General Pharmaceutical Council registered
                    pharmacy.
                  </p>

                  <div className="flex items-center gap-2 text-xs text-[#5B6B8C] footer-bottom-size mont-reg-font">
                    <Shield size={16} className="shrink-0 text-[#41A27E]" />
                    <span>GPhC &amp; MHRA Registered</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── BOTTOM BAR ── */}
          <div className="border-t border-gray-100 bg-white px-5 py-5 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 text-xs text-gray-400 sm:grid-cols-2">
              <p className="footer-bottom-size mont-reg-font">
                © 2026 Online Weight Loss Clinic. All Rights Reserved.
              </p>

              <p className="footer-bottom-size mont-reg-font text-left sm:text-right">
                All consultations and prescribing are carried out by UK
                registered healthcare professionals.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
