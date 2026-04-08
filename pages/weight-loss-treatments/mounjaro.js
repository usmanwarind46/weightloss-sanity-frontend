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
import { SEO_QUERY, SITE_SETTINGS_QUERY } from "../../lib/sanityQueries";
import NextButton from "../../components/ui/NextButton";
import { generateSchema } from "../../lib/schemaGenerator";
import Link from "next/link";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      seoSettings,
      siteSettings,
    },
    revalidate: false,
  };
}

const DOSAGES = [
  {
    label: "2.5mg (4 x doses of 2.5mg)",
    price: 210,
  },
  {
    label: "5mg (4 x doses of 5mg)",
    price: 235,
  },
  {
    label: "7.5mg (4 x doses of 7.5mg)",
    price: 315,
  },
  {
    label: "10mg (4 x doses of 10mg)",
    price: 340,
  },
  {
    label: "12.5mg (4 x doses of 12.5mg)",
    price: 355,
  },
  {
    label: "15mg (4 x doses of 15mg)",
    price: 375,
  },
];

const items = [
  {
    title: "Free online consultation",
    content:
      "Start by completing our quick, free consultation form. Share your health details and background information so our clinicians can assess your suitability accurately.",
  },
  {
    title: "Prescriber review and assessment",
    content:
      "Every online consultation is carefully reviewed by a UK-licensed clinician who ensures the treatment is safe and appropriate for you.",
  },
  {
    title: "Confidential and discreet delivery",
    content:
      "If you meet the eligibility criteria for Mounjaro weight loss pen, the prescription medication is dispensed to you by our UK-registered clinic via tracked courier service.",
  },
];

const wegovyFaqs = [
  {
    question: "What is the golden dose (5th dose)?",
    answer:
      "The “golden dose” refers to the small remaining liquid in the pen after using the prescribed doses. This leftover liquid is not for injection and should not be used. Injecting it can lead to side effects like nausea or vomiting, or cause underdosing.",
  },
  {
    question: "Should I hide that I take Mounjaro?",
    answer:
      "You don’t need to hide taking Mounjaro, sharing that information is entirely your choice. Most providers use discreet, plain packaging, so your treatment remains private. However, it’s important to inform healthcare professionals involved in your care. Letting your GP or clinician know helps avoid medicine interactions and ensures your treatment is monitored safely.",
  },
  {
    question: "Do I need to stop taking Mounjaro when I reach my goal?",
    answer:
      "Mounjaro does not necessarily need to be stopped once you’ve reached your target weight. It can be part of your long-term maintenance plan, provided our clinical team deems it suitable for your ongoing needs.",
  },
  {
    question: "How long do I need to stay on Mounjaro?",
    answer:
      "Mounjaro can be used for up to two years if it continues to be appropriate for your weight management plan. After six months of using the highest tolerated dose, your progress will be evaluated. If you’ve lost at least 5% of your initial body weight, you can continue with treatment.",
  },
  {
    question:
      "How do I transition from Mounjaro to another weight loss treatment?",
    answer:
      "It is possible to transition from weight loss injections Mounjaro to Wegovy. If you qualify based on BMI criteria (30 or above, or 27-30 with a related health condition), our healthcare professional will assess your health and approve the switch. A 7-day break from Mounjaro is required before starting Wegovy. For more information, complete our online consultation today.",
  },
  {
    question: "What should I do if Mounjaro becomes unaffordable?",
    answer: {
      intro:
        "We understand that pricing may be a concern due to recent cost increases. Here are some alternatives:",
      bullets: [
        {
          bold: "Lower the dose:",
          text: " Reducing your Mounjaro dose may still offer effective results at a lower cost.",
        },
        {
          bold: "Stay on your current dose:",
          text: " If you're already on a lower dose, maintaining your treatment without increasing it could be a viable option.",
        },
        {
          bold: "Explore other treatments:",
          text: " If eligible, consider alternatives like Wegovy, which can be started just 7 days after stopping tirzepatide injection.",
        },
      ],
      outro:
        "For assistance, consult our clinical team for advice on the ideal course of action.",
    },
  },

  {
    question: "Is Mounjaro approved for weight loss?",
    answer:
      "Yes, Mounjaro is a prescription medication approved for weight loss in the UK. After a thorough consultation, a licensed healthcare professional will assess if Mounjaro is suitable for your weight management needs. It is available only through prescription after completing our free online consultation form.",
  },
  {
    question: "What is the cost of Mounjaro?",
    answer:
      "The cost of Mounjaro may vary depending on where you obtain it. At Online Weight Loss Clinic, the price starts from £210, which includes one pen (4 doses) and 4 needles, enough for a month’s supply.",
  },
  {
    question: "Can Mounjaro be stored outside the fridge?",
    answer:
      "Mounjaro should be kept in the fridge at temperatures between 2°C and 8°C. However, it can be stored at room temperature (below 30°C) for up to 30 days. After this time, discard any unused medication.",
  },
  {
    question: "Can I use Mounjaro while on the contraceptive pill?",
    answer:
      "Yes, you can take Mounjaro with the contraceptive pill, but it may reduce its effectiveness. To ensure proper contraception, consider using a non-oral contraceptive (such as an implant) or alternate protection like condoms for 4 weeks after starting Mounjaro. This is especially important if you experience vomiting or diarrhoea.",
  },
  {
    question: "Can I order Mounjaro without a prescription?",
    answer:
      "No, Mounjaro is a prescription-only medication. You must complete a consultation with a licensed healthcare professional to ensure it is appropriate for your weight management needs.",
  },
  {
    question: "I am afraid of needles. Do I have to inject Mounjaro?",
    answer:
      "Although Mounjaro is an injection-only treatment, it is designed to be simple and quick. Many users find the process manageable, but if you are particularly uncomfortable with needles, we recommend discussing your concerns with our prescribing team for advice and support.",
  },
  {
    question: "What is the required BMI to begin using Mounjaro?",
    answer:
      "To start Mounjaro, you need to have a BMI of 30 or higher, or a BMI of 27 or higher with a weight-related health condition like type 2 diabetes, high blood pressure, or high cholesterol. Our healthcare professional will assess your overall health to confirm whether weight loss shots Mounjaro is the right choice for you.",
  },
  {
    question: "What are the key considerations when using Mounjaro?",
    answer:
      "Mounjaro is effective for individuals with a BMI over 30 or 27+ with related health issues. It may not be suitable for those with severe digestive problems, a history of pancreatitis, or thyroid cancer. When completing your online questionnaire, it's essential to provide accurate medical history and details of any current medications.",
  },
  {
    question: "Should I choose Wegovy or Mounjaro for weight loss?",
    answer:
      "Both Wegovy and Mounjaro are once-weekly injections for weight loss, but Mounjaro works on both GLP-1 and GIP hormones, whereas Wegovy only targets GLP-1. Mounjaro has been shown to provide significant results in clinical trials, and the appropriate option for you will depend on your specific health needs and goals. Our clinical team will help determine which treatment suits you noticeably during your consultation.",
  },
  {
    question: "How do I administer Mounjaro?",
    answer:
      "Mounjaro is a once-weekly injection that can be administered in the abdomen, thigh, or upper arm. Using a fine needle, the injection is designed to cause minimal pain and is easy to self-administer. The pen comes with clear instructions, including a dial system to ensure accurate dosing. After each use, safely dispose of the needle in a sharps bin.",
  },
  {
    question: "How long will one Mounjaro pen last?",
    answer:
      "Each weight loss injections Mounjaro pen contains 4 doses, which provides a 4-week supply when used once a week. The dose will gradually increase every 4 weeks, depending on how well your body responds to the treatment. Always remember to dispose of needles safely after each use.",
  },
  {
    question: "What if I can't tolerate the new Mounjaro dose?",
    answer:
      "If you experience symptoms like nausea, vomiting, or diarrhoea with your new dose, don’t hesitate to contact our customer care team for advice. We may suggest adjusting your dose or continuing with your current one. Our team can also provide tips on how to manage symptoms for the optimal results. Never increase your dose until you’re ready, and consult the patient information leaflet if needed.",
  },
  {
    question: "Is Mounjaro licensed for weight loss in the UK?",
    answer:
      "Yes, Mounjaro is a prescription-only medication that is licensed for weight loss in the UK. It must be prescribed by a UK-licensed healthcare professional following a thorough consultation.",
  },
  {
    question: "Can Mounjaro be used during pregnancy?",
    answer:
      "Do not use Mounjaro during pregnancy. If you plan to conceive, it's important to consult with our healthcare provider for alternative recommendations.",
  },
  {
    question: "Should I use contraception while taking Mounjaro?",
    answer:
      "If you're of childbearing age, you should use contraception while using Mounjaro, as it may reduce the effectiveness of the oral contraceptive pill. Consider using barrier methods (like condoms) or a non-oral contraceptive such as an IUD or implant.",
  },
  {
    question:
      "What should I do if I plan to become pregnant while on Mounjaro?",
    answer:
      "Do not use Mounjaro injection for weight loss if you are planning to become pregnant. It is recommended to stop using the medication at least one month before trying to conceive. This allows your body to adjust and ensures a safe transition into pregnancy.",
  },
  {
    question: "Is it safe to breastfeed while using Mounjaro?",
    answer:
      "Do not use weight loss shots Mounjaro while breastfeeding, as it’s not known whether the medication passes into breast milk. It’s important to discuss alternative options with our healthcare provider before starting treatment.",
  },
  {
    question: "Where can I get Mounjaro in the UK?",
    answer:
      "Mounjaro is available through Online Weight Loss Clinic via a regulated online consultation service. After completing your consultation, a UK licensed clinician will review your medical history and, if appropriate, issue a prescription. Your medication will be delivered discreetly to your preferred address.",
  },
  {
    question: "What should I eat while using Mounjaro?",
    answer:
      "For optimal results, aim for balanced meals that include a good source of protein, complex carbohydrates, and fruits and vegetables. It's advised to limit high sugar and high-fat foods, particularly during the early stages, as they may worsen side effects like nausea. Many people find bland, light foods easier to digest when starting treatment.",
  },
  {
    question: "How much weight can I expect to lose on Mounjaro?",
    answer:
      "Clinical studies show that patients can lose 15-20% of their body weight over 72 weeks on Mounjaro. Results vary based on dosage, with the 5mg dose leading to 16.1kg (35.5lbs) lost, and the 15mg dose leading to 23.6kg (52lbs) of weight loss.",
  },
  {
    question: "When will I start seeing results with Mounjaro?",
    answer:
      "Mounjaro typically shows results within 4 to 8 weeks, with noticeable effects such as reduced appetite and feeling fuller for longer. You may experience temporary side effects during the initial phase, such as nausea, which should subside as your body adjusts.",
  },
  {
    question: "How can I switch to a different weight loss medication?",
    answer:
      "If you’re considering switching your weight loss treatment, the first step is to complete our online consultation form. A UK licensed healthcare professional will carefully review your health information to determine whether a change in medication is appropriate for your weight loss goals and overall health needs. This ensures that the transition to a new treatment aligns with your specific requirements.",
  },
  {
    question: "What's the process for purchasing Mounjaro online in the UK?",
    answer:
      "To purchase Mounjaro through Online Weight Loss Clinic, begin by filling out our online consultation form, providing details about your medical history and current health status. Our licensed clinician will assess whether medication is the right choice for your weight management. Once approved, your prescription will be issued, and the Mounjaro injection for weight loss will be dispensed by our partner pharmacy. You’ll receive your medication via discreet delivery, ensuring privacy throughout the process.",
  },
  {
    question:
      "Which Mounjaro dose delivers the noticeable weight loss results?",
    answer:
      "There isn’t a single “ideal” dose that works for everyone. The right Mounjaro dose depends on how your body responds, how well you tolerate the treatment, and your personal weight loss goals. Although 15 mg per week is the maximum approved dose, many people achieve strong results on lower doses. Our clinician will aim to find the dose that supports steady weight loss while keeping side effects manageable, rather than automatically pushing to the highest strength.",
  },
  {
    question: "What dose of Mounjaro is ideal for weight loss?",
    answer:
      "Mounjaro injection for weight loss follows a structured dose-escalation plan to help your body adjust gradually. Treatment usually begins at 2.5 mg once weekly, with dose increases considered every four weeks. If you tolerate the medication well and continue to make progress, our clinician may increase the dose in 2.5 mg steps. These adjustments always depend on your response, side effects, and overall progress, and should only happen under medical guidance.",
  },
  {
    question: "How do I request Mounjaro from Online Weight Loss Clinic?",
    answer:
      "To request Mounjaro, follow these steps: 1) Complete the online consultation form: Provide health details to help our clinicians assess your needs. 2) Consultation and prescription: A UK licensed healthcare professional will review your health and issue a prescription if suitable. 3) Choose delivery — your medication will be delivered discreetly to your door. 4) Receive support — after receiving your medication, you can access follow-up consultations for ongoing support.",
  },
  {
    question: "What support will you receive while using Mounjaro?",
    answer:
      "Throughout your treatment, you'll have access to continuous guidance and clear support. This includes convenient online consultations with no clinic visits, expert advice on nutrition, and discreet home delivery of your medication. Pricing is fully transparent with no unexpected charges, and your treatment comes with free needles, with sharps bins available if needed.",
  },
];

function FAQItem({ question, answer }) {
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
              {typeof answer === "string" ? (
                <p className="whitespace-pre-line">{answer}</p>
              ) : (
                <>
                  <p className="mb-3">{answer.intro}</p>
                  <ul className="space-y-2 mb-3">
                    {answer.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-700 shrink-0"></span>
                        <span>
                          <strong className="text-gray-800">{item.bold}</strong>
                          {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p>{answer.outro}</p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const IMAGES = [
  "/Images/Slider/image-20.png",
  "/Images/Slider/image-21.png",
  "/Images/Slider/image-22.png",
  "/Images/Slider/image-23.png",
  "/Images/Slider/image-24.png",
  "/Images/Slider/image-25.png",
];

export default function MounjaroProduct({ seoSettings, siteSettings }) {
  const half = Math.ceil(wegovyFaqs.length / 2);
  const leftCol = wegovyFaqs.slice(0, half);
  const rightCol = wegovyFaqs.slice(half);
  const [dosage, setDosage] = useState(0);
  const [open, setOpen] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const price = DOSAGES[dosage].price;
  const [isExpanded, setIsExpanded] = useState(false);
  const [active, setActive] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

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
    canonical: `${meta_url}/weight-loss-treatments/mounjaro/`,
  });

  return (
    <>
      <MetaLayout
        // seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/weight-loss-treatments/mounjaro/`}
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
                      src={img}
                      width={1200}
                      height={900}
                      alt={`product-${i}`}
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
                  className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    active === i
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  }`}
                >
                  <Image
                    src={img}
                    width={200}
                    height={120}
                    alt={`thumb-${i}`}
                    className="w-full h-[60px] sm:h-[80px] lg:h-[90px] object-cover"
                  />
                </button>
              ))}
            </div>

            {/* DOCTOR CARD */}
            <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:block hidden">
              {/* Doctor info */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Image
                  src="/Images/dr-mihaela-c-mayfair.png"
                  width={150}
                  height={150}
                  alt="Doctor"
                  className="object-cover rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <span className="text-sm sm:text-md text-gray-600 hidden sm:inline">
                      Reviewed by:
                    </span>
                    <span className="font-semibold text-sm sm:text-base">
                      Dr Mihaela C.
                    </span>
                    <BadgeCheck className="w-4 h-4 text-teal-500" />
                  </div>
                  <p className="text-xs text-gray-500">
                    GMC No.{" "}
                    <a
                      href="https://www.gmc-uk.org/registrants/7099398"
                      className="text-teal-600 hover:underline"
                      target="_blank"
                    >
                      7099398
                    </a>
                  </p>
                </div>
              </div>

              {/* Short text — only for desktop */}
              <p className="text-[16px] reg-font hidden sm:block  text-gray-600 leading-relaxed mt-3">
                Dr Mihaela C. is a highly experienced General Practitioner
                registered with the General Medical Council (GMC No.{" "}
                <a
                  href="https://www.gmc-uk.org/registrants/7099398"
                  className="text-teal-600 hover:underline"
                  target="_blank"
                >
                  7099398
                </a>
                ), with a strong background in both NHS and private healthcare
                across the UK.
              </p>

              {/* Mobile: short text after read more | Desktop: extended text */}
              <div style={{ display: isExpanded ? "block" : "none" }}>
                {/* Mobile short text here */}

                {/* Extended text — dono pe */}
                <p className="text-[16px] reg-font text-gray-600 leading-relaxed mt-3">
                  Her clinical expertise spans general medicine, occupational
                  health, weight management, and medico-legal reporting. As part
                  of her commitment to improving long-term health outcomes, Dr
                  Mihaela offers medically supervised weight loss treatment
                  designed to support patients in achieving sustainable, safe,
                  and effective results. Her approach is rooted in clinical
                  evidence and focuses on understanding each patient’s unique
                  medical profile, lifestyle, and goals to develop personalised
                  care plans.
                </p>
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
                Last reviewed on: 30/03/2026
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* TITLE */}
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              Mounjaro <span className="">(Tirzepatide)</span>
            </h1>

            {/* DESCRIPTION */}
            <div className="text-gray-600 para-font space-y-4 leading-relaxed">
              {/* Pehla paragraph — hamesha visible */}
              <p>
                Mounjaro is a once-weekly self-injectable treatment designed to
                support effective weight loss. Its active ingredient,
                tirzepatide, helps regulate blood sugar levels and improve
                energy balance.
              </p>

              {/* Baaki paragraphs — sirf tab dikhein jab descOpen true ho */}
              <div
                style={{ display: descOpen ? "block" : "none" }}
                className="space-y-4 text-gray-600 para-font"
              >
                <p>
                  Mounjaro works by activating the GLP-1 and GIP receptors, two
                  key hormones that regulate appetite and satiety. This dual
                  action helps reduce hunger, control cravings, and support
                  sustainable weight management under medical supervision.
                </p>

                <p>
                  Clinical studies have shown that treatment with Mounjaro
                  (tirzepatide) can lead to an average reduction of up to{" "}
                  <span className="font-semibold text-teal-600">
                    <a
                      href="https://investor.lilly.com/news-releases/news-release-details/lillys-tirzepatide-delivered-225-weight-loss-adults-obesity-or"
                      target="_blank"
                    >
                      22.5% body weight
                    </a>
                  </span>{" "}
                  when combined with lifestyle and dietary changes. It is
                  regarded as one of the most effective evidence-based,
                  medically supervised weight-loss treatments currently
                  available in the UK, offering a promising option for patients
                  seeking long-term, clinically supported results.
                </p>
              </div>

              {/* Read more/less — dono pe dikhega */}
              <button
                className="flex items-center gap-1 text-teal-600 font-medium text-base mt-1 cursor-pointer"
                onClick={() => setDescOpen(!descOpen)}
              >
                {descOpen ? "Read less" : "Read more"}
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${
                    descOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* DOSAGES */}
            <div className="mt-6">
              <h3 className="med-font mb-1 text-md sm:text-xl sm:text-3xl">
                Mounjaro KwikPen Dosages and Prices
              </h3>

              <p className="text-gray-600 para-font space-y-4 leading-relaxed mb-4">
                One Mounjaro pen contains four doses, so a pen lasts for 4
                weeks.
              </p>

              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                In Stock Dosages
              </label>

              {/* DROPDOWN */}
              <div className="relative mt-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full border rounded-lg px-4 py-3 flex justify-between items-center bg-white cursor-pointer"
                >
                  {DOSAGES[dosage].label}
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

            {/* QUANTITY */}
            {/* <div className="mt-4">
              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                Selected Quantity
              </label>

              <div className="border rounded-lg mt-2 px-4 py-3 bg-white text-sm">
                1 Month – £{price}.00
              </div>
            </div> */}

            {/* PRICE */}
            <div className="mt-4 bg-[#d4efe1] rounded-lg p-4 max-w-full sm:max-w-52">
              <p className="text-lg text-black med-font">Price for 1 Month:</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">
                £{price}.00
              </p>
            </div>

            {/* CONSULTATION */}
            <div className="mt-6 bg-gray-100  rounded-xl p-4 sm:p-8 paraLargeScreenFont">
              <h3 className="text-xl sm:text-2xl font-reg mb-2">
                Check if you're eligible
              </h3>

              <p className="text-gray-600 para-font space-y-4 reg-font mb-2 ">
                Mounjaro (tirzepatide) is privately prescribed at Online Weight
                Loss Clinic following an online medical assessment and clinician
                review. Simply complete our online consultation form. If you
                meet the eligibility criteria, you may proceed with placing an
                order for Mounjaro weight loss injection pens.
              </p>

              <button
                className="w-full bg-[#4caf82] text-sm sm:text-lg text-white py-3 rounded-lg semibold-font  hover:bg-[#3d9e6e] cursor-pointer"
                onClick={() => {
                  window.open("/start-consultation/?product_id=4", "_blank");
                }}
              >
                Start Your Free Consultation Now
              </button>
            </div>
          </div>

          <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:hidden block">
            {/* Doctor info */}
            <div className="flex items-center gap-3 sm:gap-4">
              <Image
                src="/Images/dr-mihaela-c-mayfair.png"
                width={150}
                height={150}
                alt="Doctor"
                className="object-cover rounded-full w-[50px] h-[50px] sm:w-[80px] sm:h-[80px] shrink-0"
              />
              <div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-sm sm:text-md text-gray-600 hidden sm:inline">
                    Reviewed by:
                  </span>
                  <span className="font-semibold text-sm sm:text-base">
                    Dr Mihaela C.
                  </span>
                  <BadgeCheck className="w-4 h-4 text-teal-500" />
                </div>
                <p className="text-xs text-gray-500">
                  GMC No.{" "}
                  <a
                    href="https://www.gmc-uk.org/registrants/7099398"
                    className="text-teal-600 hover:underline"
                    target="_blank"
                  >
                    7099398
                  </a>
                  7099398
                </p>
              </div>
            </div>

            {/* Short text — sirf desktop pe hamesha visible */}
            <p className="para-font text-gray-600 leading-relaxed mt-3">
              Dr Mihaela C. is a highly experienced General Practitioner
              registered with the General Medical Council (GMC No.{" "}
              <a
                href="https://www.gmc-uk.org/registrants/7099398"
                className="text-teal-600 hover:underline"
                target="_blank"
              >
                7099398
              </a>
              ), with a strong background in both NHS and private healthcare
              across the UK.
            </p>

            {/* Mobile: short text sirf Read more ke baad | Desktop: extended text */}
            <div style={{ display: isExpanded ? "block" : "none" }}>
              {/* Mobile pe short text bhi yahan aayega */}

              {/* Extended text — dono pe */}
              <p className="para-font text-gray-600 leading-relaxed mt-2">
                Her clinical expertise spans general medicine, occupational
                health, weight management, and medico-legal reporting. As part
                of her commitment to improving long-term health outcomes, Dr
                Mihaela offers medically supervised weight loss treatment
                designed to support patients in achieving sustainable, safe, and
                effective results. Her approach is rooted in clinical evidence
                and focuses on understanding each patient’s unique medical
                profile, lifestyle, and goals to develop personalised care
                plans.
              </p>
            </div>

            {/* Read more / Read less */}
            <button
              className="flex items-center gap-1 text-blue-600 font-medium text-sm mt-2"
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

      <section className="py-4 sm:py-20 2xl:py-4 bg-white">
        <div className="container sm:max-w-5xl mx-auto">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-3xl 2xl:text-4xl semibold-font  text-gray-900">
              Achieve up to <span className="font-bold">22.5% weight loss</span>{" "}
              with Mounjaro weight loss injection
            </h2>

            <p className="text-gray-600 para-font space-y-4 reg-font mb-2 mt-4">
              Start your weight loss journey by completing a short consultation
              to see if Mounjaro is right for you. Get the prescription weight
              loss injection delivered discreetly to you.
            </p>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-16 mt-16 items-center">
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
                    stroke-width="1.6"
                    stroke-linecap="round"
                  ></path>
                  <path
                    d="M27.0015 6.16427L17.716 2.02873C17.6412 2.00161 17.5613 1.99353 17.4828 2.00517C17.4044 2.01682 17.3298 2.04785 17.2653 2.09567C17.2007 2.1435 17.1481 2.20672 17.1118 2.28006C17.0755 2.3534 17.0566 2.43473 17.0566 2.51724V13.89C17.0566 14.0271 17.1089 14.1586 17.202 14.2555C17.2951 14.3525 17.4213 14.4069 17.5529 14.4069C17.6845 14.4069 17.8107 14.3525 17.9038 14.2555C17.9968 14.1586 18.0491 14.0271 18.0491 13.89V11.156L27.0015 7.14129C27.099 7.10614 27.1836 7.0402 27.2434 6.95264C27.3033 6.86508 27.3354 6.76027 27.3354 6.65278C27.3354 6.5453 27.3033 6.44048 27.2434 6.35293C27.1836 6.26537 27.099 6.19943 27.0015 6.16427ZM18.0491 10.0614V3.24419L26.0517 6.6526L18.0491 10.0614Z"
                    fill="#4DB581"
                    stroke="#4DB581"
                    stroke-width="0.6"
                  ></path>
                </svg>
                Order Mounjaro weight loss injection online
              </h3>

              <div className="space-y-4">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className={`rounded-xl border transition ${
                      open === i
                        ? "bg-[#cfe4da] border-transparent"
                        : "border-gray-200"
                    }`}
                  >
                    <button
                      className="w-full flex justify-between items-center p-5 text-left"
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
                      <div className="px-5 pb-5 text-gray-600  text-sm leading-relaxed">
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
                src="/Images/manjaro-side-img.png"
                width={420}
                height={520}
                alt="Mounjaro Injection"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="w-full bg-white  py-0 pb-4 sm:py-16 injection-bg">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="w-full "></div>

          {/* RIGHT CARD */}
          <div className="bg-white sm:rounded-2xl sm:shadow-md px-2 sm:p-8 max-w-xl">
            <h2 className="text-xl sm:text-3xl semibold-font text-gray-900 mb-4">
              Lose up to <span className="font-bold">22.5%</span> of your body
              weight
            </h2>

            <p className="text-gray-600 leading-relaxed mb-4 para-font">
              Mounjaro (tirzepatide) is a clinically proven prescription weight
              loss treatment that can help you lose up to 22.5% of your body
              weight, depending on adherence to your prescribed plan.
            </p>

            <p className="text-gray-600 leading-relaxed mb-4 para-font">
              Based on the results of a peer-reviewed clinical study of 2539
              participants.
            </p>

            {/* <div className="bg-gray-100 rounded-lg p-4 text-sm text-gray-700 mb-4">
              [bmi_calculator inline title="How much weight could you lose with
              Wegovy in one year"
              redirect="weightlosspharmacy.co.uk/start-consultation/?product_id=1"
              weight_loss_percentage="0.2"]
            </div> */}

            <p className="text-gray-600 leading-relaxed mb-4 para-font hidden">
              This calculator is for illustrative purposes only. Results are
              estimates and may vary between individuals. They are based on
              clinical data showing up to 22.5% weight loss over 72 weeks with
              Mounjaro (tirzepatide) under medical supervision.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-r from-[#cfe8e6] to-[#7ea2d1] pt-8 sm:pt-0">
        <div className="container mx-auto grid lg:grid-cols-2 items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="max-w-xl py-4">
            <h2 className="text-2xl sm:text-5xl font-semibold text-gray-900 leading-tight mb-6 ">
              Get started with <br />
              Mounjaro weight loss <br />
              treatment today
            </h2>

            <p className="para-font text-gray-700 leading-relaxed">
              Providing patients with safe, medically supervised access to
              clinically tested Mounjaro weight loss injections.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-end">
            <Image
              src="/Images/Mounjaro.png"
              width={500}
              height={600}
              alt="Mounjaro pens"
              className="w-full max-w-[400px] object-contain"
            />
          </div>
        </div>
      </section>

      {/*  */}

      <ManjaroTableContent />

      <div className="bg-white container mx-auto px-6 py-12">
        {/* Title */}
        <h4 className="text-2xl sm:text-4xl med-font text-gray-900 text-center mb-10">
          Frequently Asked Questions for Mounjaro Weight Loss
        </h4>

        {/* 2-column FAQ grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {/* Left column */}
          <div>
            {leftCol.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          {/* Right column */}
          <div>
            {rightCol.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </div>

      <section className="relative overflow-hidden cta-bg-2">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/10" />

        <div className="relative z-10 container mx-auto  py-16 sm:py-24 md:py-36 cta-wrap">
          <div className="max-w-lg md:max-w-xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Take Next Step
            </h2>

            <p className="text-white/80 text-sm sm:text-base reg-font mb-8 leading-relaxed para-font">
              Let’s talk about how we can work together to make healthcare work
              for all of us.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cta-btn">
              <Link href="/weight-loss/">
                <NextButton label="View Treatments" />
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
      <Footer />
    </>
  );
}
