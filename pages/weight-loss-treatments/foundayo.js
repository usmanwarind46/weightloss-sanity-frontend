"use client";

import Image from "next/image";
import { BadgeCheck, ChevronDown } from "lucide-react";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import ManjaroTableContent from "../../components/ManjaroTableContent/ManjaroTableContent";
import MetaLayout from "../../Meta/MetaLayout";
import { meta_url } from "../../config/constants";
import { sanityClient } from "../../lib/sanity";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../../lib/sanityQueries";
import NextButton from "../../components/ui/NextButton";
import { generateSchema } from "../../lib/schemaGenerator";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import WegovySignupModalWrapper from "../../components/WegovySignupModalWrapper";
import WegovySignupModal from "../../components/WegovySignupModal";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "foundayo",
  });

  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      data,
      seoSettings,
      siteSettings,
    },
    revalidate: 1,
  };
}

function FAQItem({ question, answerHTML }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 px-2 text-left cursor-pointer hover:bg-gray-50 transition-colors duration-150"
      >
        <span className="font-semibold text-gray-900 pr-8">{question}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <ChevronDown size={18} className="text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-2 pb-6 text-gray-600 leading-relaxed">
              <div
                className="para-font faq-content"
                dangerouslySetInnerHTML={{
                  __html: answerHTML || "",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function WaitlistForm({ dark = false }) {
  const [state, setState] = useState("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!name.trim()) e.name = "Please enter your name";

    if (!email.trim()) {
      e.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Enter a valid email";
    }

    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // important: stop double click / repeated submit.
    if (state === "loading") return;

    const errs = validate();

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setState("loading");

    try {
      const payload = {
        type: "foundayo",
        firstName: name,
        email: email,
        company_id: 2,
      };

      const res = await fetch(
        "https://app.onlineweightlossclinic.co.uk/api/contact-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setState("success");
    } catch (error) {
      console.error("Waitlist submit failed:", error);
      setState("idle");
      setErrors({
        form: "Something went wrong. Please try again.",
      });
    }
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
        <label htmlFor={`waitlist-name-${dark ? "dark" : "light"}`}>
          Full name
        </label>

        <input
          id={`waitlist-name-${dark ? "dark" : "light"}`}
          type="text"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((p) => ({ ...p, name: "", form: "" }));
          }}
          className={errors.name ? "wlt-input err" : "wlt-input"}
        />

        {errors.name && <span className="wlt-err">{errors.name}</span>}
      </div>

      <div className="wlt-field">
        <label htmlFor={`waitlist-email-${dark ? "dark" : "light"}`}>
          Email address
        </label>

        <input
          id={`waitlist-email-${dark ? "dark" : "light"}`}
          type="email"
          placeholder="jane@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: "", form: "" }));
          }}
          className={errors.email ? "wlt-input err" : "wlt-input"}
        />

        {errors.email && <span className="wlt-err">{errors.email}</span>}
      </div>

      {errors.form && <span className="wlt-err">{errors.form}</span>}

      <button
        type="submit"
        className="wlt-submit"
        disabled={state === "loading"}
      >
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

export default function FoundayoProduct({
  data,
  seoSettings,
  siteSettings,
  dark = false,
}) {
  const [dosage, setDosage] = useState(0);
  const [open, setOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isWegovyModalOpen, setIsWegovyModalOpen] = useState(false);

  const mounjaroHero =
    data?.sections?.find((section) => section._type === "mounjaroHero") || {};

  const mounjaroJourney =
    data?.sections?.find((section) => section._type === "mounjaroJourney") ||
    {};

  const mounjaroWeightLoss =
    data?.sections?.find((section) => section._type === "mounjaroWeightLoss") ||
    {};

  const mounjaroCTA =
    data?.sections?.find((section) => section._type === "mounjaroCTA") || {};

  const mounjaroFaq =
    data?.sections?.find((section) => section._type === "mounjaroFaq") || {};

  const wegovyBottomCTA =
    data?.sections?.find((section) => section._type === "wegovyBottomCTA") ||
    {};

  const mounjaroTabsSection =
    data?.sections?.find(
      (section) => section._type === "mounjaroTabsSection",
    ) || {};

  const DOSAGES = mounjaroHero?.dosages || [];

  const IMAGES = mounjaroHero?.productImages || [];
  const price = DOSAGES[dosage]?.price;

  const faqs = mounjaroFaq?.faqs || [];

  const half = Math.ceil(faqs.length / 2);

  const leftCol = faqs.slice(0, half);

  const rightCol = faqs.slice(half);

  useEffect(() => {
    if (!emblaApi) return;

    const timer = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(timer);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setActive(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (i) => {
      emblaApi?.scrollTo(i);
    },
    [emblaApi],
  );

  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/weight-loss-treatments/wegovy-pill/`,
    manualSchema: data?.seo?.schema,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/weight-loss-treatments/wegovy-pill`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <div className=" sm:py-12 py-4">
        <div className="container mx-auto grid lg:grid-cols-2 sm:gap-10 gap-4">
          {/* LEFT SIDE */}

          {/* ── IMAGE SECTION ── */}
          {/* ── IMAGE SECTION ── */}
          <div className="w-full relative">
            {/* ── Main Slider ── */}
            <div
              className="overflow-hidden rounded-3xl h-[200px] sm:h-[500px] lg:h-[500px] bg-[#ddeeff]"
              ref={emblaRef}
            >
              <div className="flex h-full">
                {IMAGES.map((img, i) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] flex items-center justify-center h-full relative"
                  >
                    <Image
                      src={img.imageUrl}
                      width={1200}
                      height={900}
                      alt={
                        img.imageAlt || mounjaroHero?.heading || `product-${i}`
                      }
                      className="w-full h-full object-contain transition-opacity duration-500"
                      priority={i === 0}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Thumbnails — same width as slider, no scroll ── */}
            <div
              className="grid mt-3 gap-2"
              style={{ gridTemplateColumns: `repeat(${IMAGES.length}, 1fr)` }}
            >
              {IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${active === i
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                    }`}
                >
                  <Image
                    src={img.imageUrl}
                    width={200}
                    height={120}
                    alt={
                      img.imageAlt || mounjaroHero?.heading || `product-${i}`
                    }
                    className="w-full h-[60px] sm:h-[80px] lg:h-[90px] object-cover"
                  />
                </button>
              ))}
            </div>

            {/* DOCTOR CARD desc */}
            <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:block hidden">
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src={mounjaroHero?.doctorImage?.asset?.url}
                  width={150}
                  height={150}
                  alt={
                    mounjaroHero?.doctorImageAlt ||
                    mounjaroHero?.doctorName ||
                    "Doctor"
                  }
                  className="object-cover rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm sm:text-md text-gray-600 hidden sm:inline">
                      Reviewed by:
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      {mounjaroHero?.doctorName}
                    </span>
                    <BadgeCheck className="w-4 h-4 text-teal-500" />
                  </div>
                  <p className="text-xs text-gray-500">
                    GMC No.{" "}
                    <a
                      href={mounjaroHero?.doctorGmcLink}
                      className="text-teal-600 hover:underline"
                      target="_blank"
                    >
                      {mounjaroHero?.doctorGmc}
                    </a>
                  </p>
                </div>
              </div>

              {/* Short text — sirf desktop pe hamesha visible */}
              <p
                className="text-[13px] reg-font hidden sm:block  text-gray-600 leading-relaxed mt-3"
                dangerouslySetInnerHTML={{
                  __html: mounjaroHero?.doctorShortTextHTML || "",
                }}
              ></p>

              {/* Mobile: short text sirf Read more ke baad | Desktop: extended text */}
              <div style={{ display: isExpanded ? "block" : "none" }}>
                {/* Mobile pe short text bhi yahan aayega */}

                {/* Extended text — dono pe */}
                <p
                  className="text-[13px] reg-font text-gray-600 leading-relaxed mt-3"
                  dangerouslySetInnerHTML={{
                    __html: mounjaroHero?.doctorLongTextHTML || "",
                  }}
                ></p>
              </div>

              {/* Read more / Read less */}
              <button
                className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-2 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? "Read less" : "Read more"}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                />
              </button>

              {/* Last reviewed — hamesha visible */}
              <p className="text-xs text-gray-500 mt-3">
                Last reviewed on: {mounjaroHero?.lastReviewedDate}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* TITLE */}
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              {mounjaroHero?.heading}
            </h1>

            {/* DESCRIPTION */}
            <div className="text-gray-600 para-font space-y-4 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                {mounjaroHero?.featureItems?.map((item, i) => (
                  <li key={i}>
                    <PortableText
                      value={item.text}
                      components={{
                        marks: {
                          link: ({ value, children }) => (
                            <a
                              href={value?.href}
                              target={value?.blank ? "_blank" : "_self"}
                              rel={
                                value?.blank ? "noopener noreferrer" : undefined
                              }
                              className="text-teal-600 underline hover:text-teal-800"
                            >
                              {children}
                            </a>
                          ),
                        },
                        block: {
                          normal: ({ children }) => <span>{children}</span>,
                        },
                      }}
                    />
                  </li>
                ))}
              </ul>
              {/* Pehla paragraph — hamesha visible */}
              <PortableText value={mounjaroHero?.description} />

              {/* Baaki paragraphs — sirf tab dikhein jab descOpen true ho */}
              <div
                style={{ display: descOpen ? "block" : "none" }}
                className="space-y-4 text-gray-600 para-font"
              >
                <PortableText value={mounjaroHero?.readMoreContent} />
              </div>

              {/* Read more/less — dono pe dikhega */}
              <button
                className="flex items-center gap-1 text-teal-600 font-medium text-base mt-1 cursor-pointer"
                onClick={() => setDescOpen(!descOpen)}
              >
                {descOpen ? "Read less" : "Read more"}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${descOpen ? "rotate-180" : ""
                    }`}
                />
              </button>
            </div>

            {/* DOSAGES */}
            <div id="waitlist-form" className="mt-6">
              <h3 className="med-font mb-1 text-md sm:text-xl sm:text-3xl">
                {mounjaroHero?.dosageHeading}
              </h3>

              <p className="text-gray-600 para-font space-y-4 leading-relaxed mb-4">
                {mounjaroHero?.dosageText}
              </p>

              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                Dosages
              </label>

              {/* DROPDOWN */}
              <div className="relative mt-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full border rounded-lg px-4 py-3 flex justify-between items-center bg-white cursor-pointer"
                >
                  {DOSAGES[dosage]?.label}
                  <ChevronDown size={18} />
                </button>

                {open && (
                  <div className="absolute top-full mt-1 bg-white border rounded-lg w-full shadow cursor-pointer">
                    {DOSAGES.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDosage(i);
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* QUANTITYY */}
            {/* <div className="mt-4">
              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                Selected Quantity
              </label>

              <div className="border rounded-lg mt-2 px-4 py-3 bg-white text-sm">
                1 Month – £{price}.00
              </div>
            </div> */}

            {/* PRICE */}
            <div className="mt-4 bg-[#d4efe1] rounded-lg p-4 max-w-full sm:max-w-64">
              <p className="text-lg text-black med-font">
                Price (30 Oral Tablets):
              </p>

              {price == 0 ? (
                <p className="text-xl sm:text-xl font-bold text-blue-600">
                  Price coming soon
                </p>
              ) : (
                <p className="text-xl sm:text-3xl font-bold text-blue-600">
                  £{price}.00
                </p>
              )}
            </div>

            {/* PRE-ORDER NOTE — sirf 25mg pe */}
            {DOSAGES[dosage]?.label?.includes("25") && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 para-font mt-2">
                <strong className="semibold-font">Please note:</strong> The 25
                mg dose is now available for pre-order to reserve your stock.
                Deliveries are expected to begin from{" "}
                <strong className="semibold-font">4th August 2026</strong>{" "}
                onwards.
              </p>
            )}

            <div className="wlt-hero-form mt-6">
              <WaitlistForm />
            </div>

            <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 para-font mt-2">
              <strong className="semibold-font">Please note:</strong> This is a
              pre-order to reserve your stock. Deliveries will commence from{" "}
              <strong className="semibold-font">7 July 2026</strong> onwards.
              Taking pre-orders for 1.5 mg and 4 mg strengths only.
            </p>

            {/* CONSULTATION */}
            <div className="mt-2 bg-gray-100  rounded-xl p-5">
              <h3 className="text-xl sm:text-2xl font-reg mb-2">
                {mounjaroHero?.eligibilityHeading}
              </h3>

              <p className="text-md text-gray-600 mb-4 para-font">
                {mounjaroHero?.eligibilityText}
              </p>
              <Link href={mounjaroHero?.eligibilityButtonHref}>
                <button
                  className="w-full bg-[#4caf82] text-sm sm:text-lg text-white py-3 rounded-lg semibold-font  hover:bg-[#3d9e6e] cursor-pointer"
                // onClick={() => {
                //   window.open("/start-consultation/?product_id=1", "_blank");
                // }}
                >
                  {mounjaroHero?.eligibilityButtonLabel}
                </button>
              </Link>
            </div>
          </div>

          <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:hidden block">
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src={mounjaroHero?.doctorImage?.asset?.url}
                width={150}
                height={150}
                alt={
                  mounjaroHero?.doctorImageAlt ||
                  mounjaroHero?.doctorName ||
                  "Doctor"
                }
                className="object-cover rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] shrink-0"
              />
              <div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-md text-gray-600 hidden sm:inline">
                    Reviewed by:
                  </span>
                  <span className="font-semibold text-sm sm:text-base">
                    {mounjaroHero?.doctorName}
                  </span>
                  <BadgeCheck className="w-4 h-4 text-teal-500" />
                </div>
                <p className="text-xs text-gray-500">
                  GMC No.{" "}
                  <a
                    href={mounjaroHero?.doctorGmcLink}
                    className="text-teal-600 hover:underline"
                    target="_blank"
                  >
                    {mounjaroHero?.doctorGmc}
                  </a>
                </p>
              </div>
            </div>

            <p
              className="sm:hidden block text-sm text-gray-600 leading-relaxed mt-3"
              dangerouslySetInnerHTML={{
                __html: mounjaroHero?.doctorShortTextHTML || "",
              }}
            />

            {/* Mobile: short text sirf Read more ke baad | Desktop: extended text */}
            <div style={{ display: isExpanded ? "block" : "none" }}>
              {/* Mobile pe short text bhi yahan aayega */}

              {/* Extended text — dono pe */}
              <p
                className="text-sm text-gray-600 leading-relaxed mt-2"
                dangerouslySetInnerHTML={{
                  __html: mounjaroHero?.doctorLongTextHTML || "",
                }}
              />
            </div>

            <button
              className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-2 cursor-pointer"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </button>

            {/* Last reviewed — hamesha visible */}
            <p className="text-xs text-gray-500 mt-3">
              Last reviewed on: 30/03/2026
            </p>
          </div>
        </div>
      </div>

      <section className="py-4 sm:py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-3xl 2xl:text-4xl semibold-font text-gray-900">
              {mounjaroJourney?.heading}
            </h2>

            <p className="text-gray-600 para-font space-y-4 reg-font mb-2 mt-4">
              <PortableText
                value={mounjaroJourney?.paragraph}
                components={{
                  marks: {
                    link: ({ value, children }) => (
                      <a
                        href={value?.href}
                        target={value?.blank ? "_blank" : "_self"}
                        rel={value?.blank ? "noopener noreferrer" : undefined}
                        className="text-teal-600 underline hover:text-teal-800"
                      >
                        {children}
                      </a>
                    ),
                  },
                }}
              />
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap:6 sm:gap-16 mt-16 items-center">
            {/* LEFT SIDE */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M13.9546 13.8904C10.3359 13.8904 4.64941 13.274 4.64941 18.0261C4.64941 25.7804 23.2598 17.5091 23.2598 25.7804C23.2598 30.9499 15.5055 29.916 5.68332 29.916"
                    stroke="#212E53"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M27.0015 6.16427L17.716 2.02873C17.6412 2.00161 17.5613 1.99353 17.4828 2.00517C17.4044 2.01682 17.3298 2.04785 17.2653 2.09567C17.2007 2.1435 17.1481 2.20672 17.1118 2.28006C17.0755 2.3534 17.0566 2.43473 17.0566 2.51724V13.89C17.0566 14.0271 17.1089 14.1586 17.202 14.2555C17.2951 14.3525 17.4213 14.4069 17.5529 14.4069C17.6845 14.4069 17.8107 14.3525 17.9038 14.2555C17.9968 14.1586 18.0491 14.0271 18.0491 13.89V11.156L27.0015 7.14129C27.099 7.10614 27.1836 7.0402 27.2434 6.95264C27.3033 6.86508 27.3354 6.76027 27.3354 6.65278C27.3354 6.5453 27.3033 6.44048 27.2434 6.35293C27.1836 6.26537 27.099 6.19943 27.0015 6.16427ZM18.0491 10.0614V3.24419L26.0517 6.6526L18.0491 10.0614Z"
                    fill="#4DB581"
                    stroke="#4DB581"
                    strokeWidth="0.6"
                  ></path>
                </svg>
                {mounjaroJourney?.leftTitle}
              </h3>

              <div className="space-y-4">
                {mounjaroJourney?.journeyItems?.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border transition ${open === i
                      ? "bg-[#cfe4da] border-transparent"
                      : "border-gray-200"
                      }`}
                  >
                    <button
                      className="w-full flex justify-between items-center p-5 text-left cursor-pointer"
                      onClick={() => setOpen(open === i ? null : i)}
                    >
                      <span className="font-medium text-gray-900 para-font">
                        {item.title}
                      </span>

                      {open === i ? (
                        <Minus className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-600" />
                      )}
                    </button>

                    {open === i && (
                      <div className="px-5 pb-5 text-gray-600 text-sm leading-relaxed">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="flex justify-center">
              <Image
                src={mounjaroJourney?.sectionImage?.asset?.url}
                width={1220}
                height={520}
                alt={
                  mounjaroJourney?.imageAlt ||
                  mounjaroJourney?.heading ||
                  "Mounjaro treatment image"
                }
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SWITCHING TREATMENTS SECTION */}
      <section className="bg-[#f8faf9] py-12 sm:py-16">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl space-y-12 sm:space-y-14">
            {/* Foundayo vs Wegovy Pill */}
            <div>
              <h2 className="semibold-font mb-4 text-xl text-gray-900 sm:text-3xl 2xl:text-4xl">
                Foundayo vs Wegovy Pill: What sets them apart?
              </h2>

              <div className="space-y-4">
                <p className="para-font leading-relaxed text-gray-600">
                  A Foundayo vs{" "}
                  <Link
                    href="/weight-loss-treatments/wegovy-pill"
                    className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                  >
                    Wegovy pill
                  </Link>{" "}
                  comparison involves two once-daily oral GLP-1 weight management
                  treatments with different active ingredients. Foundayo pill
                  contains orforglipron, whereas the Wegovy pill contains semaglutide.
                </p>

                <p className="para-font leading-relaxed text-gray-600">
                  Their dosing instructions also differ. Foundayo can be taken at any
                  time of day without{" "}
                  <a
                    href="https://www.gov.uk/government/news/uk-first-in-europe-to-authorise-orforglipron-for-weight-management-and-type-2-diabetes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                  >
                    specific food or water restrictions
                  </a>
                  . The Wegovy pill is taken on an empty stomach with a limited amount
                  of water, followed by a 30-minute period before having food, drinks
                  or other oral medicines.
                </p>
              </div>
            </div>

            {/* Foundayo vs Mounjaro */}
            <div>
              <h2 className="semibold-font mb-4 text-xl text-gray-900 sm:text-3xl 2xl:text-4xl">
                Foundayo vs Mounjaro: What are the main differences?
              </h2>

              <div className="space-y-4">
                <p className="para-font leading-relaxed text-gray-600">
                  When looking at Foundayo vs{" "}
                  <Link
                    href="/weight-loss-treatments/mounjaro"
                    className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                  >
                    Mounjaro
                  </Link>
                  , the treatments differ in their active ingredients, format and
                  receptor activity. Foundayo contains orforglipron and is taken as a
                  daily tablet, while Mounjaro contains tirzepatide and is
                  administered as a weekly injection.
                </p>

                <p className="para-font leading-relaxed text-gray-600">
                  Foundayo acts on GLP-1 receptors, whereas Mounjaro targets both GIP
                  and GLP-1 receptors. Both can support weight management through
                  effects on appetite and fullness. Which option is appropriate for
                  you will depend on your health, medical history and individual
                  clinical assessment.
                </p>
              </div>
            </div>

            {/* Foundayo vs Wegovy */}
            <div>
              <h2 className="semibold-font mb-4 text-xl text-gray-900 sm:text-3xl 2xl:text-4xl">
                Foundayo vs Wegovy: A quick comparison
              </h2>

              <div className="space-y-4">
                <p className="para-font leading-relaxed text-gray-600">
                  The Foundayo vs{" "}
                  <Link
                    href="/weight-loss-treatments/wegovy"
                    className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                  >
                    Wegovy
                  </Link>{" "}
                  comparison shows several differences in how these treatments are
                  formulated and taken. Foundayo tablet contains orforglipron as a
                  once-daily tablet, whereas Wegovy contains semaglutide and is
                  administered by injection once a week.
                </p>

                <p className="para-font leading-relaxed text-gray-600">
                  Both are GLP-1 receptor agonists that act on pathways involved in
                  appetite and fullness. However, their treatment formats differ,
                  with Foundayo taken orally and Wegovy delivered by injection.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="w-full bg-[#f5f6f7] py-16 wegovyInjection-bg">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="w-full "></div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl">
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4">
              {mounjaroWeightLoss?.heading}
            </h2>

            <div className="para-font text-gray-600 leading-relaxed mb-4">
              <PortableText
                value={mounjaroWeightLoss?.content}
                components={{
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-4">{children}</p>
                    ),
                  },
                }}
              />
            </div>

            {/* <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-4">
              [bmi_calculator inline title="How much weight could you lose with
              Wegovy in one year"
              redirect="weightlosspharmacy.co.uk/start-consultation/?product_id=1"
              weight_loss_percentage="0.2"]
            </div> */}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#cfe8e6] to-[#7ea2d1] pt-8 sm:pt-0">
        <div className="container mx-auto grid lg:grid-cols-2 items-center gap-10 py-12">
          {/* LEFT CONTENT */}
          <div className="max-w-xl py-4">
            <h2 className="text-2xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-6 ">
              {mounjaroCTA?.heading}
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed para-font">
              {mounjaroCTA?.paragraph}
            </p>

            {mounjaroCTA?.scrollButtonLabel && (
              <div className="mt-6 w-full sm:max-w-xs">
                <NextButton
                  label={mounjaroCTA?.scrollButtonLabel}
                  type="button"
                  props="w-full sm:w-auto"
                  onClick={() => setIsWegovyModalOpen(true)}
                />
              </div>
            )}
            <WegovySignupModal
              isOpen={isWegovyModalOpen}
              onClose={() => setIsWegovyModalOpen(false)}
            />
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-end">
            <Image
              src={mounjaroCTA?.image?.asset?.url}
              width={500}
              height={600}
              alt={
                mounjaroCTA?.imageAlt || mounjaroCTA?.heading || "Mounjaro pens"
              }
              className="w-full max-w-[550px] object-contain"
            />
          </div>
        </div>
      </section>

      {/*  */}


      <ManjaroTableContent data={mounjaroTabsSection} />

      <div className="bg-white container mx-auto sm:px-6 py-6 sm:py-12">
        {/* Title */}
        <h4 className="text-2xl sm:text-4xl med-font text-gray-900 text-center mb-10">
          {mounjaroFaq?.heading}
        </h4>

        {/* 2-column FAQ grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* Left column */}
          <div>
            {leftCol.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answerHTML={faq.answerHTML}
              />
            ))}
          </div>
          {/* Right column */}
          <div>
            {rightCol.map((faq, i) => (
              <FAQItem
                key={i}
                question={faq.question}
                answerHTML={faq.answerHTML}
              />
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden cta-bg-2">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />

        <div className="relative z-10 container mx-auto  py-16 sm:py-24 md:py-36 cta-wrap">
          <div className="max-w-lg md:max-w-lg">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {wegovyBottomCTA?.heading}
            </h2>

            <p className="text-white/80 text-sm sm:text-base reg-font mb-8 leading-relaxed para-font">
              {wegovyBottomCTA?.paragraph}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cta-btn">
              <Link href={wegovyBottomCTA?.primaryButtonHref}>
                <NextButton label={wegovyBottomCTA?.primaryButtonLabel} />
              </Link>
              <Link
                href={wegovyBottomCTA?.secondaryButtonHref}
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-200 group"
              >
                {wegovyBottomCTA?.secondaryButtonLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer data={siteSettings} />

      {/* <WegovySignupModalWrapper /> */}
    </>
  );
}
