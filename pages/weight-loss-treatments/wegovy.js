"use client";

import Image from "next/image";
import { BadgeCheck, ChevronDown } from "lucide-react";

import { Header } from "../../components/Header";

import { Footer } from "../../components/Footer";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";

import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import WegovyTableContent from "../../components/WegovyTableContent/WegovyTableContent";
import MetaLayout from "../../Meta/MetaLayout";
import { meta_url } from "../../config/constants";
import NextButton from "../../components/ui/NextButton";
import Link from "next/link";
import { sanityClient } from "../../lib/sanity";
import { SEO_QUERY, SITE_SETTINGS_QUERY } from "../../lib/sanityQueries";

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
    label: "0.25 mg (4 x doses of 0.25 mg)",
    price: 168,
  },
  {
    label: "0.5 mg (4 x doses of 0.5 mg)",
    price: 189,
  },
  {
    label: "1.0 mg (4 x doses of 1.0 mg)",
    price: 197,
  },
  {
    label: "1.7 mg (4 x doses of 1.7 mg)",
    price: 247,
  },
  {
    label: "2.4 mg (4 x doses of 2.4 mg)",
    price: 297,
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
      "Every online consultation is carefully reviewed by a UK licensed clinician who ensures the treatment is safe and appropriate for you.",
  },
  {
    title: "Confidential and discreet delivery",
    content:
      "If you meet the eligibility criteria for the Mounjaro weight loss pen, the prescription medication is dispensed to you by our UK-registered clinic via tracked courier service.",
  },
];

const wegovyFaqs = [
  {
    question: "How quickly will I see results with Wegovy?",
    answer:
      "Wegovy can start working within the first few weeks, but it’s important to use it in combination with a healthy diet and exercise for optimal results. We’ll monitor your progress over 6 months to ensure you’ve lost at least 5% of your starting weight. If successful, your treatment can continue under medical supervision.",
  },
  {
    question: "Is Wegovy weight loss injection safe?",
    answer:
      "Wegovy is safe for most people when prescribed by a licensed healthcare provider. However, certain conditions, like pancreatitis, may make it unsuitable for some individuals. Before starting Wegovy in the UK, a medical assessment is necessary to ensure it’s the right fit for your health needs.",
  },
  {
    question: "Can I drink alcohol while using Wegovy?",
    answer:
      "It’s ideal to limit alcohol while using Wegovy. Alcohol can interfere with your weight loss efforts by increasing your calorie intake, and it can also lower blood sugar, leading to dizziness. Additionally, alcohol may amplify side effects such as nausea and vomiting, especially after increasing your dose.",
  },
  {
    question: "Does Wegovy burn fat?",
    answer:
      "Wegovy does not burn fat directly. Instead, it helps reduce your appetite, making it easier to maintain a calorie deficit. For successful fat loss, focus on combining Wegovy with a healthy, balanced diet and regular exercise to achieve sustainable results.",
  },
  {
    question: "How do I dispose of my used Wegovy pen?",
    answer:
      "To dispose of your Wegovy pen, take it to a local pharmacy that offers medication disposal services. Do not throw used pens or needles in household waste. We recommend using a sharps bin for safe disposal. You can request a sharps bin during your consultation for added convenience.",
  },
  {
    question: "How do I inject Wegovy?",
    answer:
      "Wegovy is administered through a simple, weekly injection into the arm, leg, or abdomen. The pre-filled pen is easy to use, with a button that delivers the correct dose. After each injection, dispose of the needle in a sharps bin to ensure safe disposal.",
  },
  {
    question: "How long does one Wegovy pen last?",
    answer:
      "Each Wegovy pen provides 4 doses, typically lasting a month. The dose is gradually increased as your body adjusts to the medication, with higher doses being administered over time.",
  },
  {
    question: "Can I use Wegovy long-term?",
    answer:
      "Wegovy is approved for long-term use, with clinical studies supporting its use for up to two years. If you’ve lost at least 5% of your starting weight after six months, you can continue treatment with the guidance of our clinician..",
  },
  {
    question: "What if I can’t tolerate my new dose?",
    answer:
      "If you experience persistent side effects like nausea, vomiting, or diarrhoea, consult our licensed healthcare professional. Adjustments to your dose may be necessary to help you manage these symptoms more effectively. Our healthcare provider will ensure you’re ready for the next dose increase.",
  },
  {
    question: "Is Wegovy a licensed weight loss medication in the uk?",
    answer:
      "Yes, Wegovy is fully licensed by the MHRA (Medicines and Healthcare products Regulatory Agency) for weight loss treatment in the UK. It can be prescribed through the Online Weight Loss Clinic after a thorough medical evaluation.",
  },
  {
    question: "How does Wegovy benefit heart health?",
    answer:
      "Wegovy is more than just a weight loss treatment it also has notable heart health benefits. By aiding weight loss, it can help reduce blood pressure, lower “bad” cholesterol levels, and improve overall cardiovascular function. For individuals with obesity or weight-related health issues, these benefits can significantly reduce the risk of heart disease, stroke, and other cardiovascular conditions.",
  },
  {
    question: "Can I use Wegovy while pregnant?",
    answer:
      "Do not use Wegovy during pregnancy, as its effects on an unborn child are not fully understood. If you’re planning to conceive, it’s recommended to discontinue Wegovy at least two months before attempting pregnancy. Always consult with our healthcare provider if you think you might be pregnant while using Wegovy.",
  },
  {
    question: "Do I need contraception while using Wegovy?",
    answer:
      "Yes, if you are of childbearing age, it’s crucial to consult with our clinician  about contraception before starting Wegovy. While Wegovy doesn’t affect the effectiveness of oral contraceptives, side effects such as vomiting or diarrhea can interfere with their absorption. Alternative contraception methods may be necessary to ensure maximum protection.",
  },
  {
    question:
      "Does wegovy affect the effectiveness of the oral contraceptive pill?",
    answer:
      "Wegovy does not directly impact the effectiveness of the oral contraceptive pill. However, if you experience severe diarrhoea or vomiting after taking the pill, you may need to take a repeat dose of your contraceptive. If these symptoms continue, consult with our  UK licensed healthcare professional for alternative contraception methods and to ensure the appropriate solution for your health.",
  },
  {
    question: "How much weight can I lose with Wegovy?",
    answer:
      "Clinical studies suggest that Wegovy can help individuals lose up to 15-17% of their body weight when combined with a healthy diet and regular exercise. The exact amount of weight loss will depend on individual factors, but many patients see significant results with ongoing support from our clinic, helping them achieve their weight loss goals safely.",
  },
  {
    question: "Who is eligible to use Wegovy?",
    answer:
      "Wegovy is generally prescribed to adults who: Have a BMI of 30 or higher, or Have a BMI of 27 or higher with weight-related health issues such as high blood pressure, type 2 diabetes, or high cholesterol. Before prescribing Wegovy, our UK-licensed clinician will assess your health history and discuss your weight loss goals to determine if this treatment is right for you.",
  },
  {
    question: "What doses of Wegovy are available?",
    answer:
      "Wegovy comes in pre-filled pens with doses ranging from 0.25mg to 2.4mg. Treatment typically starts with the lowest dose, gradually increasing over several months. This allows your body to adjust and minimises side effects as you progress toward your weight loss goals.",
  },
  {
    question: "What side effects should I expect from Wegovy?",
    answer:
      "Most users experience mild side effects when they start using Wegovy, such as: Nausea, Bloating, Constipation,Fatigue  These symptoms usually improve after a few weeks. We’ll provide guidance on how to manage any side effects, ensuring a smoother experience as your body adjusts to the medication.",
  },
  {
    question: "Can I get Wegovy without a prescription?",
    answer:
      "No, Wegovy is available only with a prescription in the UK. To ensure it is suitable for your needs, you’ll undergo a thorough consultation with one of our licensed healthcare professionals before receiving a online wegovy prescription.",
  },
  {
    question: "What other health benefits does Wegovy offer?",
    answer:
      "In addition to weight loss, clinical studies have shown Wegovy has several health benefits. For instance,  improving heart health by reducing the risk of cardiovascular events, lowering blood pressure, and enhancing cholesterol levels. Maintaining a healthy weight can also help reduce the risk of type 2 diabetes and certain cancers, making Wegovy an effective solution for improving both weight and overall health.",
  },
  {
    question: "Can I use Wegovy while breastfeeding?",
    answer:
      "It is not recommended to use Wegovy while breastfeeding, as its effects on breast milk are not fully known. To ensure the safety of both you and your baby, it’s appropriate to avoid using this medication during breastfeeding.To fully understand the side effects and restrictions associated with Wegovy, be sure to review the Patient Information Leaflet.",
  },
  {
    question: "How much does Wegovy cost?",
    answer:
      "The cost of Wegovy depends on the prescribed dose and treatment plan. During your consultation, we’ll provide a clear breakdown of the costs, ensuring full transparency before you begin your treatment.",
  },
  {
    question: "Is mental health support available while using Wegovy?",
    answer:
      "Yes, we offer mental health support for patients who need extra help managing the emotional aspects of weight loss. Our team provides guidance and counselling services to support you throughout your weight loss journey, ensuring you feel empowered every step of the way.",
  },
  {
    question: "Why does my weight loss plateau?",
    answer:
      "Weight loss plateaus are common as your body adapts to your new routine. If you experience a plateau, we can help by adjusting your treatment plan, diet, and exercise regimen to continue your progress and achieve your weight loss goals.",
  },
  {
    question: "What should I do if I experience side effects?",
    answer:
      "If you notice any side effects or feel unwell while using Wegovy, reach out to our clinician promptly. They may adjust your dose, temporarily stop treatment, or explore other weight loss options to ensure your comfort and safety.",
  },
  {
    question: "Is Wegovy the same as Rybelsus?",
    answer:
      "Although Wegovy and Rybelsus contain the same active ingredient, semaglutide, they are prescribed for different purposes. Wegovy is specifically for weight loss, while Rybelsus is used for managing type 2 diabetes. While both medications are beneficial, they are tailored to meet different health goals and should be used accordingly.",
  },
  {
    question:
      "How to get a prescription for Wegovy from Online Weight Loss Clinic?",
    answer:
      "To begin, complete our secure online consultation form where you’ll provide details about your health and weight loss objectives. After a thorough review, our  UK licensed clinician will decide if Wegovy is suitable for you. If it is, your online wegovy prescription will be sent, and we’ll arrange for discreet delivery right to your home.",
  },

  {
    question:
      "What support and guidance are available while taking Wegovy from Online Weight Loss Clinic?",
    answer:
      "Throughout your Wegovy weight loss journey, you will receive continuous support from our team of experienced UK healthcare professionals. You’ll benefit from: Free advice and aftercare to ensure you’re on track. Convenient online consultations, no need for in-person visits. Nutritional support to complement your weight loss journey. Discreet home delivery with no hidden fees. We’re committed to making your weight loss experience as smooth and successful as possible, providing all the resources you need to reach your goals.",
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
            <div className="px-2  pb-6 text-gray-600 leading-relaxed whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
const IMAGES = [
  "/Images/Slider2/image-20.png",
  "/Images/Slider2/image-21.png",
  "/Images/Slider2/image-22.png",
  "/Images/Slider2/image-23.png",
  "/Images/Slider2/image-24.png",
  "/Images/Slider2/image-25.png",
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
  return (
    <>
      <MetaLayout
        // seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/weight-loss-treatments/wegovy/`}
      />
      <Header data={siteSettings} />
      <div className="sm:py-12 py-4">
        <div className="container mx-auto grid lg:grid-cols-2 sm:gap-10 gap-4">
          {/* LEFT SIDE */}

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

            {/* DOCTOR CARD des */}
            <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:block hidden">
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
                  <p className="text-xs text-gray-500">GMC No. 7099398</p>
                </div>
              </div>

              {/* Short text — sirf desktop pe hamesha visible */}
              <p className="text-[13px] reg-font hidden sm:block  text-gray-600 leading-relaxed mt-3">
                Dr Mihaela C. is a highly experienced General Practitioner
                registered with the General Medical Council (GMC No. 7099398),
                with a strong background in both NHS and private healthcare
                across the UK.
              </p>

              {/* Mobile: short text sirf Read more ke baad | Desktop: extended text */}
              <div style={{ display: isExpanded ? "block" : "none" }}>
                {/* Mobile pe short text bhi yahan aayega */}

                {/* Extended text — dono pe */}
                <p className="text-[13px] reg-font text-gray-600 leading-relaxed mt-3">
                  Her clinical expertise spans general medicine, occupational
                  health, weight management, and medico-legal reporting. As part
                  of her commitment to improving long-term health outcomes, Dr
                  Mihaela offers medically supervised weight loss treatment
                  designed to support patients in achieving sustainable, safe,
                  and effective results. Her approach is rooted in clinical
                  evidence and focuses on understanding each patient's unique
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
                Last reviewed on: 01/12/2025
              </p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            {/* TITLE */}
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">
              Wegovy <span className="">(Semaglutide)</span>
            </h1>

            {/* DESCRIPTION */}
            <div className="text-gray-600 para-font space-y-4 leading-relaxed">
              <ul className="list-disc pl-5 space-y-2">
                <li>Once-a-week weight loss injection</li>
                <li>Clinically validated for effective weight management</li>
                <li>
                  Approved for{" "}
                  <a href="/weight-loss" className="text-[#4DB581]">
                    weight loss
                  </a>
                </li>
                <li>Produced by Novo Nordisk</li>
                <li>Key ingredient: Semaglutide</li>
              </ul>
              <p>
                Wegovy is a prescription-based treatment designed to support
                weight loss. It contains semaglutide, which mimics a hormone
                naturally produced by the body, helping to regulate hunger
                signals and promote a sense of satiety. This makes it easier to
                manage food intake, ultimately supporting weight reduction.
              </p>

              <div
                style={{ display: descOpen ? "block" : "none" }}
                className="space-y-4 text-gray-600 para-font"
              >
                <p>
                  When paired with a balanced diet and consistent physical
                  activity, Wegovy weight loss pen works to enhance weight loss
                  results. In addition to aiding weight loss, weight loss
                  injection may also improve cardiovascular health. It helps
                  reduce the risks of heart attacks and strokes, especially for
                  individuals with existing heart conditions.
                </p>

                <p>
                  Each Wegovy pen provides four weekly doses for convenient and
                  consistent usage.
                </p>
              </div>

              {/* ✅ Yeh button missing tha */}
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
                Wegovy Dosage and Prices
              </h3>

              <p className="text-gray-600 text-gray-600 para-font space-y-4 leading-relaxed">
                One Wegovy pen contains four doses, so a pen lasts for 4 weeks.
              </p>

              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                In Stock Dosages
              </label>

              {/* DROPDOWN */}
              <div className="relative mt-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-full border rounded-lg px-4 py-3 flex justify-between items-center bg-white"
                >
                  {DOSAGES[dosage].label}
                  <ChevronDown size={18} />
                </button>

                {open && (
                  <div className="absolute top-full mt-1 bg-white border rounded-lg w-full shadow">
                    {DOSAGES.map((d, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setDosage(i);
                          setOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* QUANTITY */}
            <div className="mt-4">
              <label className="text-gray-700 text-sm sm:text-lg space-y-4 leading-relaxed med-font">
                Selected Quantity
              </label>

              <div className="border rounded-lg mt-2 px-4 py-3 bg-white text-sm">
                1 Month – £{price}.00
              </div>
            </div>

            <div className="mt-4 bg-[#d4efe1] rounded-lg p-4 max-w-full sm:max-w-52">
              <p className="text-lg text-black med-font">Price:</p>
              <p className="text-xl sm:text-3xl font-bold text-blue-600">
                £{price}.00
              </p>
            </div>

            <div className="mt-6 bg-gray-100  rounded-xl p-5">
              <h3 className="text-xl sm:text-2xl font-reg mb-2">
                Check if you're eligible
              </h3>

              <p className="text-md text-gray-600 mb-4 para-font">
                Wegovy (semaglutide) is privately prescribed at Weight Loss
                Pharmacy following an online medical assessment and clinician
                review. Simply complete our online consultation form. If you
                meet the eligibility criteria, you may proceed with placing an
                order for Wegovy weight loss injection pens.
              </p>

              <button
                className="w-full bg-[#4caf82] text-sm sm:text-lg text-white py-3 rounded-lg semibold-font  hover:bg-[#3d9e6e] cursor-pointer"
                onClick={() => {
                  window.open("/start-consultation/?product_id=1", "_blank");
                }}
              >
                Start Your Free Consultation Now
              </button>
            </div>
          </div>

          <div className="mt-6 bg-[#e7eaf6] rounded-xl p-3 sm:p-5 sm:hidden block">
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
                <p className="text-xs text-gray-500">GMC No. 7099398</p>
              </div>
            </div>

            <p className="sm:hidden block text-sm text-gray-600 leading-relaxed mt-3">
              Dr Mihaela C. is a highly experienced General Practitioner
              registered with the General Medical Council (GMC No. 7099398),
              with a strong background in both NHS and private healthcare across
              the UK
            </p>

            {/* Mobile: short text sirf Read more ke baad | Desktop: extended text */}
            <div style={{ display: isExpanded ? "block" : "none" }}>
              {/* Mobile pe short text bhi yahan aayega */}

              {/* Extended text — dono pe */}
              <p className="text-sm text-gray-600 leading-relaxed mt-2">
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
              Last reviewed on: 01/12/2025
            </p>
          </div>
        </div>
      </div>

      <section className="py-4 sm:py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-3xl 2xl:text-4xl semibold-font  text-gray-900">
              Lose up to 15% body weight with Wegovy. Backed by clinical
              studies.
            </h2>

            <p className="text-gray-600 para-font space-y-4 reg-font mb-2 mt-4">
              Start your weight loss journey by completing a short consultation
              to see if Wegovy (semaglutide) is right for you. Get the
              prescription weight loss injection delivered discreetly to you.
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
                Order Wegovy weight loss injection online
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
                src="/Images/wegovyImg.jpg"
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
      <section className="w-full bg-[#f5f6f7] py-16 wegovyInjection-bg">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT IMAGE */}
          <div className="w-full "></div>

          {/* RIGHT CARD */}
          <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl">
            <h2 className="text-xl sm:text-3xl font-semibold text-gray-900 mb-4">
              Lose up to 15% of your body weight
            </h2>

            <p className="para-font text-gray-600 leading-relaxed mb-4">
              Wegovy treatment helps you effectively lose up to 15% of your body
              weight, depending on how well you adhere to the treatment.
            </p>

            <p className="para-font text-gray-600 leading-relaxed mb-4">
              Based on the results of a peer-reviewed clinical study of 2539
              participants.
            </p>

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
              Get started with Wegovy weight loss treatment today
            </h2>

            <p className="text-lg text-gray-700 leading-relaxed para-font">
              Providing patients with safe, medically supervised access to
              clinically-tested Wegovy weight loss injection.
            </p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-end">
            <Image
              src="/Images/Wegovy.png"
              width={500}
              height={600}
              alt="Mounjaro pens"
              className="w-full max-w-[400px] object-contain"
            />
          </div>
        </div>
      </section>

      {/*  */}

      <WegovyTableContent />
      <div className="bg-white container mx-auto px-6 py-12">
        {/* Title */}
        <h4 className="text-2xl sm:text-4xl med-font text-gray-900 text-center mb-10">
          Frequently Asked Questions for Wegovy Weight Loss
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
              <NextButton label="View Treatments" />

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
