import React, { useState } from "react";
import { Header } from "../components/Header";
import ProductCard from "../components/ProductCard/ProductCard";
import {
  FadeUp,
  StaggerContainer,
  StaggerItem,
} from "../components/MotionWrapper";
import NextButton from "../components/ui/NextButton";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "../components/Footer";
import Link from "next/link";
import { href } from "react-router";
import { meta_url } from "../config/constants";
import MetaLayout from "../Meta/MetaLayout";
import { sanityClient } from "../lib/sanity";
import { SEO_QUERY, SITE_SETTINGS_QUERY } from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      seoSettings,
      siteSettings,
    },
    revalidate: 1,
  };
}

const products = [
  {
    id: 1,
    name: "Mounjaro",
    subtitle: "Tirzepatide",
    price: "£210.00",
    bgColor: "#5B6EE8",
    image: "/Images/Mounjaro.png",
    href: "/weight-loss-treatments/mounjaro",
    features: [
      { text: "Dose titration every 4 weeks" },
      {
        text: "Clinically shown ",
        bold: "up to 22.5% reduction",
        suffix: " in body weight within 72 weeks",
      },
      { text: "Follows a dual agonist mechanism" },
    ],
  },
  {
    id: 2,
    name: "Wegovy",
    subtitle: "Semaglutide",
    price: "£168.00",
    bgColor: "#5B6EE8",
    image: "/Images/Wegovy.png",
    href: "/weight-loss-treatments/wegovy",
    features: [
      { text: "Dose titration every 4 weeks" },
      {
        text: "Clinically shown ",
        bold: "up to 15% reduction",
        suffix: " in body weight within 68 weeks",
      },
      { text: "Follows a single agonist mechanism" },
    ],
  },
];

const tableData = [
  {
    aspect: "Core Ingredient",
    mounjaro: "Tirzepatide",
    wegovy: "Semaglutide",
    bg: "bg-green-100",
  },
  {
    aspect: "Mechanism",
    mounjaro:
      "Works by training your brain to improve hormonal functionality, ultimately regulating metabolism and prolonging satiety.",
    wegovy:
      "Works by training your brain to improve hormonal functionality, ultimately regulating metabolism and prolonging satiety.",
    bg: "bg-blue-100",
  },
  {
    aspect: "Dosage Schedule",
    mounjaro: "Once-weekly, same-day dose intake",
    wegovy: "Once-weekly, same-day dose intake",
    bg: "bg-green-100",
  },
  {
    aspect: "Receptor",
    mounjaro: "GLP-1 and GPI",
    wegovy: "GLP-1",
    bg: "bg-blue-100",
  },
  {
    aspect: "Proven Efficacy",
    mounjaro:
      "Clinical studies show a 22.5% reduction in body weight within 72 weeks.",
    wegovy:
      "Clinical studies show a 15% reduction in body weight within 68-72 weeks.",
    bg: "bg-green-100",
  },
  {
    aspect: "Side Effects",
    mounjaro: [
      "Nausea/Vomiting",
      "Difficulty Passing Stool",
      "Irregular Bowel Movement/ Diarrhoea",
    ],
    wegovy: [
      "Nausea/Vomiting",
      "Difficulty Passing Stool",
      "Irregular Bowel Movement/",
      "Idiarrhoea",
      "Headache",
    ],
    bg: "bg-blue-100",
    isList: true,
  },
];

const steps = [
  {
    description: "150 Minutes of Moderate Exercise Per Week",
    image: "/Images/health-1.png",
    bgColor: "bg-blue-100",
  },
  {
    description: "Stay Physically Active Throughout the Day",
    image: "/Images/health-2.png",
    bgColor: "bg-green-100",
  },
  {
    description: "Follow a Balanced, Nutrient-Dense Diet",
    image: "/Images/health-3.png",
    bgColor: "bg-blue-100",
  },
];

const myths = [
  {
    icon: "/Images/myth-icon-1.svg",
    myth: "Myth: Mounjaro and Wegovy Are Interchangeable",
    fact: "Fact: No, they are not direct alternatives. While both are prescribed for weight loss, Mounjaro and Wegovy differ significantly in their active ingredients, mechanism of action, and clinical outcomes",
  },
  {
    icon: "/Images/myth-icon-2.svg",
    myth: "Myth: Mounjaro Delivers Similar Results to Wegovy",
    fact: "Fact: Clinical studies show that Mounjaro delivers faster and greater weight loss. On average, patients lost up to 22.5% of their body weight in 72 weeks, compared to 15% with Wegovy over 68 weeks.",
  },
  {
    icon: "/Images/myth-icon-3.svg",
    myth: "Myth: The Side Effects Are Too Severe",
    fact: "Fact: Most side effects are mild and manageable. They vary by individual and usually improve as your body adjusts. When prescribed and monitored, side effects are typically temporary and well-tolerated.",
  },
  {
    icon: "/Images/myth-icon-4.svg",
    myth: "Myth: The Injection Alone Is Enough",
    fact: "Fact: Weight loss injections work best when combined with moderate physical activity and a balanced, nutrient-rich diet. A holistic approach leads to better, more sustainable results.",
  },
];

const CellContent = ({ value, isList }) => {
  if (isList && Array.isArray(value)) {
    return (
      <ul className="text-left inline-block space-y-1">
        {value.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-700 para-font"
          >
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    );
  }
  return <span className="text-sm text-gray-700 para-font">{value}</span>;
};

const tabs = [
  {
    id: 1,
    label: "Precautions while using weight loss treatments",
    title: "Precautions while using weight loss treatments",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed para-font">
          To ensure your safety and achieve the best results with weight loss
          medications such as Mounjaro or Wegovy, it’s important to follow
          medical guidance carefully — especially during the initial stages of
          treatment.
        </p>
        <ul className="flex flex-col gap-3">
          {[
            {
              label: "Dosage:",
              text: "Always follow the prescribed dosage and schedule. Do not take more than one GLP-1 medication (e.g. Mounjaro or Wegovy) at the same time, or combine them with similar medications, unless advised by a healthcare professional.",
            },
            {
              label: "Medication Interactions:",
              text: "If you are currently taking insulin, sulfonylureas, or other diabetes medications, consult your doctor or prescriber as dose adjustments may be necessary.",
            },
            {
              label: "Hydration & Diet:",
              text: "To help minimise gastrointestinal side effects, increase your water intake and maintain a balanced, nutritious diet throughout your treatment.",
            },
            {
              label: "When to Seek Medical Advice:",
              text: "If you experience symptoms such as severe abdominal pain, vision changes, or extreme fatigue, contact your clinician immediately.",
            },
          ].map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm md:text-base text-gray-600"
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
              <span>
                <strong className="text-gray-800">{item.label}</strong>{" "}
                {item.text}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <h3 className="text-lg md:text-xl med-font text-gray-900 mb-2">
            Storage Instructions
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            Before first use, store your medication in a refrigerator (between
            2–8°C).
            <br />
            After opening (if applicable), follow the storage instructions
            provided — some medications can be kept at room temperature for a
            limited time.
          </p>
        </div>
        <div className="mt-2">
          <h3 className="text-lg md:text-xl med-font text-gray-900 mb-2">
            Pregnancy and Breastfeeding
          </h3>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            If you are pregnant, planning to conceive, or breastfeeding, do not
            use these medications.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 2,
    label: "How do these weight loss treatments work?",
    title: "How do these weight loss treatments work?",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          <strong className="text-gray-800">Mounjaro (Tirzepatide)</strong> and{" "}
          <strong className="text-gray-800">Wegovy (Semaglutide)</strong> are
          clinically proven, MHRA-approved injectable medications used for the
          management of obesity. Both weight loss treatments function by
          targeting hormonal pathways that affect appetite, satiety, and
          metabolic processes that are often disturbed in individuals struggling
          with excess weight.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          These medications are not simple appetite suppressants. They mimic
          naturally occurring gut hormones involved in the regulation of hunger,
          insulin secretion, and glucose metabolism. By doing so, they address
          physiological and behavioural components of weight management.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          <strong className="text-gray-800">Mounjaro</strong> is a newer class
          of weight loss treatment with a dual agonist mechanism. It acts on
          both GLP-1 and glucose-dependent insulinotropic polypeptide (GIP)
          receptors. GIP, another incretin hormone, improves insulin response
          and may further regulate appetite and fat metabolism.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          <strong className="text-gray-800">Wegovy</strong> is a GLP-1 receptor
          agonist. It mimics the action of glucagon-like peptide-1 (GLP-1) — a
          hormone that plays a key role in appetite regulation and blood sugar
          control.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          By influencing these hormonal pathways, both treatments help you feel
          fuller for longer and reduce the urge to overeat, making it easier to
          stick to a healthier lifestyle.
        </p>
      </div>
    ),
  },
  {
    id: 3,
    label: "What is the most effective way to lose weight?",
    title: "What is the most effective way to lose weight?",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Sustainable weight loss is best achieved through a combination of
          healthy lifestyle choices, including a balanced diet, regular physical
          activity, proper hydration, and adequate sleep. These habits form the
          foundation for long-term weight loss and help support overall
          metabolic health.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          For those who need additional support, clinically approved weight loss
          treatments such as Wegovy (Semaglutide) and Mounjaro (Tirzepatide) may
          be prescribed by a licensed healthcare professional. These once-weekly
          injectable medications work by mimicking the body's natural hormones
          to regulate appetite.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Wegovy is a GLP-1 receptor agonist, while Mounjaro acts on both GLP-1
          and GIP receptors, offering a dual mechanism that may lead to greater
          weight reduction. Clinical studies have shown that Mounjaro can reduce
          body weight by up to 22.5% over 72 weeks, while Wegovy has
          demonstrated a 15% reduction over 68 weeks.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          Each treatment comes in a pre-filled pen, containing four doses to be
          used over four weeks. Doses are typically increased gradually to allow
          the body to adjust and to optimise results:
        </p>
        <p className="text-gray-800 text-sm md:text-base font-semibold">
          Mounjaro starts at 2.5 mg, with dose increases up to a maximum of 15
          mg per week.
        </p>
        <p className="text-gray-800 text-sm md:text-base font-semibold">
          Wegovy begins at 0.25 mg, with gradual increases up to 2.4 mg per
          week.
        </p>
      </div>
    ),
  },
  {
    id: 4,
    label: "Can I get weight loss treatments over the counter?",
    title: "Can I get weight loss treatments over the counter?",
    content: (
      <div className="flex flex-col gap-4">
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          No. The most effective weight loss treatments, including Mounjaro
          (Tirzepatide) and Wegovy (Semaglutide), are prescription-only
          medications. These treatments are not available over the counter, as
          they require medical oversight due to their mechanism of action and
          potential side effects.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          At Online Weight Loss Clinic, access to these medications is only
          given following a clinician-reviewed online consultation, where your
          medical history, current health status, and any ongoing medications
          are carefully assessed.
        </p>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          While some over-the-counter products, such as herbal supplements or
          fat binders, are marketed for weight loss. They typically offer
          limited effectiveness and are not supported by the same level of
          clinical evidence or regulatory approval as prescription treatments.
        </p>
      </div>
    ),
  },
];

const WeightLossTreatments = ({ seoSettings, siteSettings }) => {
  const [active, setActive] = useState(0);

  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/weight-loss/`,
  });

  return (
    <>
      <MetaLayout
        // seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/weight-loss/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      {/* Hero + Product Cards */}
      <div
        className="py-12 md:py-20 px-4 md:px-6"
        style={{
          background:
            "linear-gradient(180deg, #e8f5f0 0%, #f4faf7 40%, #ffffff 100%)",
        }}
      >
        <div className="container mx-auto">
          {/* Heading */}
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-2xl sm:text-3xl md:text-5xl med-font text-[#1a1a2e] mb-4 leading-tight tracking-tight">
              Explore Weight Loss Treatments
            </h1>
            <p className="text-gray-500 text-sm md:text-xl reg-font leading-relaxed max-w-2xl mx-auto para-font">
              Choose any treatment and start free consultation online
            </p>
          </div>

          {/* Product Cards */}
          <div className="flex flex-col md:flex-row gap-5 justify-center ">
            {products.map((product) => (
              <div key={product.id} className="w-full md:w-1/2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Comparison Table */}
      <section className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl med-font text-gray-900 mb-3 leading-tight">
              Essential Insights into Weight Loss Treatment Options
            </h2>
            <p className="text-gray-500 text-sm md:text-base reg-font mb-3 para-font">
              Take a closer look at how our treatments work and how soon you can
              expect to see results.
            </p>
            <p className="text-gray-500 text-sm reg-font mx-auto leading-relaxed para-font">
              Online Weight Loss Clinic delivers MHRA-approved weight loss
              treatments in the UK. Our core treatments include Wegovy and
              Mounjaro weight loss injections, prescribed following an online
              consultation. Each injection is taken once-weekly, with doses
              typically increased at monthly intervals to support long-term
              results.
            </p>
          </div>

          {/* Desktop Table */}
          <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-10">
            {/* Header */}
            <div className="grid grid-cols-3 bg-[#4B5FC0]">
              <div className="px-8 py-5 text-white text-sm med-font text-center para-font">
                Aspects
              </div>
              <div className="px-8 py-5 text-white text-sm med-font text-center para-font">
                Mounjaro Injection in the UK
              </div>
              <div className="px-8 py-5 text-white text-sm med-font text-center para-font">
                Wegovy Injection in the UK
              </div>
            </div>

            {/* Rows */}
            {tableData.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${row.bg}`}
                style={{ marginTop: "6px" }}
              >
                <div className="px-8 py-6 text-sm text-gray-700 reg-font flex items-center justify-center text-center para-font">
                  {row.aspect}
                </div>
                <div className="px-8 py-6 text-center flex items-center justify-center para-font">
                  <CellContent value={row.mounjaro} isList={row.isList} />
                </div>
                <div className="px-8 py-6 text-center flex items-center justify-center para-font">
                  <CellContent value={row.wegovy} isList={row.isList} />
                </div>
              </div>
            ))}
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4 mb-10">
            {tableData.map((row, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                <div className="bg-[#4B5FC0] px-4 py-3 text-white text-sm med-font text-center">
                  {row.aspect}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  <div className={`${row.bg} px-4 py-4 flex flex-col gap-2`}>
                    <p className="text-xs font-semibold text-[#4B5FC0] mb-1">
                      Mounjaro
                    </p>
                    <CellContent value={row.mounjaro} isList={row.isList} />
                  </div>
                  <div className={`${row.bg} px-4 py-4 flex flex-col gap-2`}>
                    <p className="text-xs font-semibold text-[#4B5FC0] mb-1">
                      Wegovy
                    </p>
                    <CellContent value={row.wegovy} isList={row.isList} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <div className="text-center mx-auto mb-8">
            <p className="text-gray-500 text-sm reg-font leading-relaxed para-font">
              All weight loss treatments are provided in accordance with
              comprehensive guidelines set by NICE. They are prescribed and
              carefully monitored in line with MHRA-approved UK clinical
              standards to ensure patient safety, appropriate dosing and regular
              review by a healthcare professional.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <NextButton
              label="Start Consultation"
              onClick={() => {
                window.open("/start-consultation/", "_blank");
              }}
            />
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto">
          {/* Heading */}
          <FadeUp>
            <div className="text-center mb-10 md:mb-16 mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Support Your Weight Loss Journey with{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #76c8a1, #4b6bc1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Healthy Habits
                </span>{" "}
                for Better Results
              </h2>
              <p className="reg-font text-gray-600 text-sm md:text-base lg:text-lg para-font">
                It takes more than an injection to speed up your weight loss
                journey. With a proper, healthy diet and a little exercise, you
                can achieve the best possible results soon.
              </p>
            </div>
          </FadeUp>

          {/* Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 mb-12">
            {steps.map((step, index) => (
              <StaggerItem key={index} hover className="h-full rounded-3xl">
                <div
                  className={`${step.bgColor} rounded-3xl flex flex-col overflow-hidden h-full`}
                >
                  <div className="p-5 md:p-8">
                    <p className="text-gray-700 mb-4 md:mb-6 text-lg md:text-2xl roboto-reg">
                      {step.description}
                    </p>
                  </div>
                  <div className="flex-1 flex items-end justify-center">
                    <img
                      src={step.image}
                      alt={`Step ${step.number}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Debunking the Myths */}
      <section className="myths-bg w-full sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center md:min-h-[620px]">
            {/* Mobile image — visible below md only */}

            {/* Left: Content */}
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl med-font text-gray-900 mb-6 md:mb-10 leading-tight">
                Debunking the Myths
              </h2>

              <div className="flex flex-col gap-6 md:gap-8">
                {myths.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex sm:items-start  items-center gap-3">
                      <span className="shrink-0 mt-0.5 ">
                        <Image
                          src={item.icon}
                          alt="myth icon"
                          width={28}
                          height={28}
                        />
                      </span>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl reg-font text-gray-900 leading-snug">
                        {item.myth}
                      </h3>
                    </div>
                    <p className="relative right-8 text-gray-500 text-xs sm:text-sm md:text-base reg-font leading-relaxed pl-9">
                      {item.fact}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden md:hidden">
              <Image
                src="/Images/manjaro-bg-mobile.jpg"
                alt="Person holding Mounjaro injection pen"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            {/* Right: empty column — desktop bg image fills this side */}
            <div className="hidden md:block" />
          </div>
        </div>
      </section>

      {/* tabs */}

      <section className="w-full bg-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          {/* Mobile: dropdown/accordion style */}
          <div className="md:hidden flex flex-col gap-3">
            {tabs.map((tab, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActive(active === i ? -1 : i)}
                  className={`w-full text-left px-5 py-4 flex items-center justify-between gap-3 transition-colors duration-200  cursor-pointer
                  ${active === i ? "bg-green-50" : "bg-white"}`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold shrink-0 ${active === i ? "text-green-700" : "text-gray-400"}`}
                    >
                      {tab.id}
                    </span>
                    <span
                      className={`text-sm reg-font leading-snug cursor-pointer ${active === i ? "text-gray-900" : "text-gray-600"} `}
                    >
                      {tab.label}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: active === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-gray-400"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {active === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 py-5 border-t border-gray-100">
                        {tab.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop: sidebar + content */}
          <div className="hidden md:flex gap-0">
            {/* Left Sidebar */}
            <div className="w-72 shrink-0 border-r border-gray-200 pr-0">
              <ul className="flex flex-col">
                {tabs.map((tab, i) => (
                  <li key={i}>
                    <button
                      onClick={() => setActive(i)}
                      className={`w-full text-left px-4 py-5 border-b border-gray-100 transition-colors duration-200 rounded-l-xl flex items-center sm:items-start gap-3
                      ${active === i ? "bg-green-50" : "hover:bg-gray-50"}`}
                    >
                      <span
                        className={`text-sm font-semibold shrink-0 mt-0.5 ${active === i ? "text-green-700" : "text-gray-400"}`}
                      >
                        {tab.id}
                      </span>
                      <span
                        className={`text-md 2xl:text-lg leading-snug ${active === i ? "text-gray-900 med-font" : "text-gray-500 reg-font"} cursor-pointer `}
                      >
                        {tab.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Content */}
            <div className="flex-1 pl-10 md:pl-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h2 className="text-2xl md:text-3xl med-font text-gray-900 mb-6 leading-tight">
                    {tabs[active]?.title}
                  </h2>
                  {tabs[active]?.content}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/*  */}

      <section className="relative overflow-hidden cta-bg-2">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />

        <div className="relative z-10 container mx-auto  py-16 sm:py-24 md:py-36 cta-wrap">
          <div className="max-w-lg md:max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              See If You’re Eligible for Clinically Proven Weight Loss
              Injections
            </h2>

            <p className="text-white/80 text-sm sm:text-base reg-font mb-8 leading-relaxed para-font">
              Complete your free online consultation to check your eligibility
              for your selected treatment. Our healthcare experts ensure ensure
              you receive the most suitable treatment.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cta-btn">
              <Link href="#top" scroll={false}>
                <NextButton
                  label="View Treatments"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </Link>
              <Link
                href="/frequently-asked-questions"
                className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-200 group"
              >
                More Questions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer />
    </>
  );
};

export default WeightLossTreatments;
