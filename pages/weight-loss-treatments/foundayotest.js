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
    slug: "foundayotest",
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

// function WaitlistForm({ dark = false, heading, description }) {
//   const [state, setState] = useState("idle");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [errors, setErrors] = useState({});

//   const validate = () => {
//     const e = {};

//     if (!name.trim()) {
//       e.name = "Please enter your name";
//     }

//     if (!email.trim()) {
//       e.email = "Please enter your email";
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       e.email = "Enter a valid email";
//     }

//     return e;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prevent repeated submission
//     if (state === "loading") return;

//     const errs = validate();

//     if (Object.keys(errs).length) {
//       setErrors(errs);
//       return;
//     }

//     setErrors({});
//     setState("loading");

//     try {
//       const payload = {
//         type: "foundayo",
//         firstName: name,
//         email: email,
//         company_id: 2,
//       };

//       const res = await fetch(
//         "https://app.onlineweightlossclinic.co.uk/api/contact-submit",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(payload),
//         },
//       );

//       if (!res.ok) {
//         throw new Error("Request failed");
//       }

//       setState("success");
//     } catch (error) {
//       console.error("Waitlist submit failed:", error);

//       setState("idle");

//       setErrors({
//         form: "Something went wrong. Please try again.",
//       });
//     }
//   };

//   // Success state
//   if (state === "success") {
//     return (
//       <div className="relative overflow-hidden rounded-[24px] border border-[#4565BF]/15 bg-white p-6 shadow-[0_20px_60px_rgba(23,42,84,0.10)] sm:p-8">
//         {/* Decorative background */}
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#4565BF]/[0.07] blur-3xl"
//         />

//         <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
//           <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#4565BF]/10">
//             <svg
//               viewBox="0 0 52 52"
//               fill="none"
//               className="h-9 w-9"
//             >
//               <circle
//                 cx="26"
//                 cy="26"
//                 r="24"
//                 stroke="#4565BF"
//                 strokeWidth="2"
//               />

//               <path
//                 d="M15 26.5L22.5 34L38 18.5"
//                 stroke="#4565BF"
//                 strokeWidth="2.8"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>

//           <h3 className="text-[22px] font-semibold tracking-[-0.02em] text-[#17213B] sm:text-[26px]">
//             You're on the list
//           </h3>

//           <p className="mt-3 max-w-md text-sm leading-6 text-[#667085] sm:text-[15px]">
//             We'll email you as soon as Foundayo becomes available in the UK.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Loading state
//   if (state === "loading") {
//     return (
//       <div className="relative overflow-hidden rounded-[24px] border border-[#4565BF]/15 bg-white p-6 shadow-[0_20px_60px_rgba(23,42,84,0.10)] sm:p-8">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#4565BF]/[0.07] blur-3xl"
//         />

//         <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
//           <svg
//             className="h-11 w-11 animate-spin"
//             viewBox="0 0 50 50"
//           >
//             <circle
//               cx="25"
//               cy="25"
//               r="20"
//               fill="none"
//               stroke="rgba(69,101,191,.15)"
//               strokeWidth="4"
//             />

//             <circle
//               cx="25"
//               cy="25"
//               r="20"
//               fill="none"
//               stroke="#4565BF"
//               strokeWidth="4"
//               strokeDasharray="80 45"
//               strokeLinecap="round"
//             />
//           </svg>

//           <h3 className="mt-5 text-lg font-semibold text-[#17213B]">
//             Securing your spot
//           </h3>

//           <p className="mt-2 text-sm text-[#667085]">
//             Please wait a moment…
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       noValidate
//       className="relative overflow-hidden rounded-[24px] border border-[#4565BF]/15 bg-white p-3 shadow-[0_20px_60px_rgba(23,42,84,0.10)] sm:p-7 lg:p-8"
//     >
//       {/* Decorative glow */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#4565BF]/[0.07] blur-3xl"
//       />

//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -bottom-28 -left-28 h-56 w-56 rounded-full bg-[#4565BF]/[0.04] blur-3xl"
//       />

//       <div className="relative">
//         {/* Form Heading */}
//         {(heading || description) && (
//           <div className="mb-6">
//             {/* <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-[14px] border border-[#4565BF]/10 bg-[#4565BF]/10">
//               <svg
//                 width="21"
//                 height="21"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 aria-hidden="true"
//               >
//                 <path
//                   d="M18 8A6 6 0 006 8c0 7-3 7-3 9h18c0-2-3-2-3-9"
//                   stroke="#4565BF"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />

//                 <path
//                   d="M10 21h4"
//                   stroke="#4565BF"
//                   strokeWidth="1.8"
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </div> */}

//             {heading && (
//               <h3
//                 className={`max-w-2xl text-[21px] roboto-semibold leading-[1.3] tracking-[-0.025em] sm:text-[25px] ${dark ? "text-white" : "text-[#17213B]"
//                   }`}
//               >
//                 {heading}
//               </h3>
//             )}

//             {description && (
//               <p
//                 className={`mt-2.5 max-w-4xl text-sm leading-6 sm:text-[14px] ${dark ? "text-white/70" : "text-[#667085]"
//                   }`}
//               >
//                 {description}
//               </p>
//             )}
//           </div>
//         )}

//         {/* Divider */}
//         {/* {(heading || description) && (
//           <div className="mb-6 h-px w-full bg-gradient-to-r from-[#4565BF]/20 via-[#E4E8F0] to-transparent" />
//         )} */}

//         {/* Inputs */}
//         <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
//           {/* Full Name */}
//           <div>
//             <label
//               htmlFor={`waitlist-name-${dark ? "dark" : "light"}`}
//               className="mb-2 block text-[14px] roboto-semibold text-[#34415D]"
//             >
//               Full name
//             </label>

//             <div className="relative">
//               <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#98A2B3]">
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <path
//                     d="M20 21a8 8 0 0 0-16 0"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                     strokeLinecap="round"
//                   />

//                   <circle
//                     cx="12"
//                     cy="7"
//                     r="4"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                   />
//                 </svg>
//               </span>

//               <input
//                 id={`waitlist-name-${dark ? "dark" : "light"}`}
//                 type="text"
//                 placeholder="Jane Smith"
//                 value={name}
//                 onChange={(e) => {
//                   setName(e.target.value);

//                   setErrors((prev) => ({
//                     ...prev,
//                     name: "",
//                     form: "",
//                   }));
//                 }}
//                 className={`h-[52px] w-full rounded-[14px] border bg-[#F8FAFD] pl-11 pr-4 text-sm font-medium text-[#17213B] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#98A2B3] focus:bg-white focus:ring-4 ${errors.name
//                   ? "border-red-400 focus:border-red-400 focus:ring-red-100"
//                   : "border-[#DCE2ED] hover:border-[#BCC7DA] focus:border-[#4565BF] focus:ring-[#4565BF]/10"
//                   }`}
//               />
//             </div>

//             {errors.name && (
//               <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="9"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />

//                   <path
//                     d="M12 8v5M12 16h.01"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                 </svg>

//                 {errors.name}
//               </div>
//             )}
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor={`waitlist-email-${dark ? "dark" : "light"}`}
//               className="mb-2 block text-[14px] roboto-semibold text-[#34415D]"
//             >
//               Email address
//             </label>

//             <div className="relative">
//               <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#98A2B3]">
//                 <svg
//                   width="18"
//                   height="18"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <rect
//                     x="3"
//                     y="5"
//                     width="18"
//                     height="14"
//                     rx="2.5"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                   />

//                   <path
//                     d="m4 7 8 6 8-6"
//                     stroke="currentColor"
//                     strokeWidth="1.7"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </span>

//               <input
//                 id={`waitlist-email-${dark ? "dark" : "light"}`}
//                 type="email"
//                 placeholder="jane@example.com"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);

//                   setErrors((prev) => ({
//                     ...prev,
//                     email: "",
//                     form: "",
//                   }));
//                 }}
//                 className={`h-[52px] w-full rounded-[14px] border bg-[#F8FAFD] pl-11 pr-4 text-sm font-medium text-[#17213B] outline-none transition-all duration-200 placeholder:font-normal placeholder:text-[#98A2B3] focus:bg-white focus:ring-4 ${errors.email
//                   ? "border-red-400 focus:border-red-400 focus:ring-red-100"
//                   : "border-[#DCE2ED] hover:border-[#BCC7DA] focus:border-[#4565BF] focus:ring-[#4565BF]/10"
//                   }`}
//               />
//             </div>

//             {errors.email && (
//               <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
//                 <svg
//                   width="13"
//                   height="13"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                 >
//                   <circle
//                     cx="12"
//                     cy="12"
//                     r="9"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                   />

//                   <path
//                     d="M12 8v5M12 16h.01"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                   />
//                 </svg>

//                 {errors.email}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Form Error */}
//         {errors.form && (
//           <div className="mt-4 flex items-start gap-2.5 rounded-[13px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
//             <svg
//               className="mt-0.5 shrink-0"
//               width="17"
//               height="17"
//               viewBox="0 0 24 24"
//               fill="none"
//             >
//               <circle
//                 cx="12"
//                 cy="12"
//                 r="9"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//               />

//               <path
//                 d="M12 8v5M12 16h.01"
//                 stroke="currentColor"
//                 strokeWidth="1.8"
//                 strokeLinecap="round"
//               />
//             </svg>

//             <span>{errors.form}</span>
//           </div>
//         )}

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={state === "loading"}
//           className="group mt-5 flex h-[54px] w-full items-center justify-center gap-2.5 rounded-[14px] bg-[#4565BF] px-6 text-sm roboto-semibold text-white shadow-[0_10px_25px_rgba(69,101,191,0.26)] transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#3D5AB0] hover:shadow-[0_14px_32px_rgba(69,101,191,0.34)] active:translate-y-0 active:shadow-[0_7px_18px_rgba(69,101,191,0.25)] disabled:pointer-events-none disabled:opacity-60 cursor-pointer"
//         >
//           <span>Join the waitlist</span>

//           <svg
//             width="17"
//             height="17"
//             viewBox="0 0 16 16"
//             fill="none"
//             className="transition-transform duration-200 group-hover:translate-x-1"
//           >
//             <path
//               d="M3 8h10M9 4l4 4-4 4"
//               stroke="currentColor"
//               strokeWidth="1.6"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </button>

//         {/* Privacy */}
//         <div className="mt-4 flex items-center justify-center gap-2 text-center">
//           <svg
//             width="14"
//             height="14"
//             viewBox="0 0 24 24"
//             fill="none"
//             className="shrink-0 text-[#98A2B3]"
//           >
//             <path
//               d="M12 3 5 6v5c0 4.8 2.7 8.1 7 10 4.3-1.9 7-5.2 7-10V6l-7-3Z"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               strokeLinejoin="round"
//             />

//             <path
//               d="m9.5 12 1.7 1.7 3.5-3.7"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <p className="text-[12px] leading-5 text-[#98A2B3]">
//             No spam. We'll only email you when Foundayo becomes available.
//           </p>
//         </div>
//       </div>
//     </form>
//   );
// }

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
    canonical: `${meta_url}/weight-loss-treatments/foundayotest/`,
    manualSchema: data?.seo?.schema,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/weight-loss-treatments/foundayotest`}
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
                  className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    active === i
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
                  className={`transition-transform duration-300 ${
                    descOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>

            {/* DOSAGES */}
            <div id="waitlist-form" className="mt-6">
              <p className="text-black para-font roboto-semibold space-y-4 leading-relaxed mb-4">
                Foundayo is now available. Start an online consultation to see
                if this once-daily treatment is right for you.
              </p>
              <h3 className="med-font mb-1 text-md sm:text-xl sm:text-3xl">
                {mounjaroHero?.dosageHeading}
              </h3>

              {/* <p className="text-gray-600 para-font space-y-4 leading-relaxed mb-4">
                {mounjaroHero?.dosageText}
              </p> */}

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
              <p className="text-lg text-black med-font">Price:</p>

              {price == 0 ? (
                <p className="text-xl sm:text-xl font-bold text-blue-600">
                  Coming soon
                </p>
              ) : (
                <p className="text-xl sm:text-3xl font-bold text-blue-600">
                  £{price}.00
                </p>
              )}
            </div>

            {/* PRE-ORDER NOTE — sirf 25mg pe */}
            {/* {DOSAGES[dosage]?.label?.includes("25") && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 para-font mt-2">
                <strong className="semibold-font">Please note:</strong> The 25
                mg dose is now available for pre-order to reserve your stock.
                Deliveries are expected to begin from{" "}
                <strong className="semibold-font">4th August 2026</strong>{" "}
                onwards.
              </p>
            )} */}

            {/* <div className="wlt-hero-form mt-6"> */}
            {/* <WaitlistForm
              heading={mounjaroHero?.dosageHeading}
              description={mounjaroHero?.dosageText}
            /> */}
            {/* </div> */}
            {price !== 0 && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 para-font mt-2">
                <strong className="semibold-font">Please note:</strong> <br />{" "}
                Orders for{" "}
                <strong className="semibold-font">Foundayo 0.8mg</strong> will
                begin dispatching from{" "}
                <strong className="semibold-font">
                  Wednesday, 26 August 2026
                </strong>
                , while{" "}
                <strong className="semibold-font">Foundayo 2.5mg</strong> orders
                are expected to start dispatching towards the end of this week.
                You will receive your tracking information once your order has
                been dispatched.
              </p>
            )}

            {/* CONSULTATION */}

            <div className="mt-2 bg-gray-100  rounded-xl p-5">
              <h3 className="text-xl sm:text-2xl font-reg mb-2">
                {mounjaroHero?.eligibilityHeading}
              </h3>

              <p className="text-md text-gray-600 mb-4 para-font">
                {mounjaroHero?.eligibilityText}
              </p>
              {price !== 0 && (
                <Link href={mounjaroHero?.eligibilityButtonHref || "#"}>
                  <button
                    className="w-full bg-[#4caf82] text-sm sm:text-lg text-white py-3 rounded-lg semibold-font  hover:bg-[#3d9e6e] cursor-pointer"
                    // onClick={() => {
                    //   window.open("/start-consultation/?product_id=1", "_blank");
                    // }}
                  >
                    {mounjaroHero?.eligibilityButtonLabel}
                  </button>
                </Link>
              )}
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
              Last reviewed on: 18/08/2026
            </p>
          </div>
        </div>
      </div>

      <section className="py-4 sm:py-16 bg-white">
        <div className="container mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-4xl mx-auto">
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
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-xs font-semibold tracking-wide uppercase text-[#4caf8a] bg-[#e9f6f0] px-3 py-1 rounded-full mb-3">
              Switching Treatments
            </span>
            <h2 className="text-xl sm:text-3xl 2xl:text-4xl semibold-font text-gray-900">
              Switching to Foundayo from other GLP-1 treatments
            </h2>
          </div>

          <div className="space-y-14 max-w-4xl mx-auto">
            {/* Intro */}
            <div>
              <p className="text-gray-600 leading-relaxed para-font mb-3">
                If you are using Mounjaro, Wegovy injection or Wegovy pill, you
                may be able to move to Foundayo. Starting at 0.8 mg is not
                always necessary, as the dose selected can vary according to
                your existing medicine and current strength.
              </p>
              <p className="text-gray-600 leading-relaxed para-font">
                A clinician should oversee any change in treatment. The doses
                below are not intended for self-directed switching.
              </p>
            </div>

            {/* === Mounjaro → Foundayo === */}
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3">
                Can I switch from Mounjaro to Foundayo?
              </h3>
              <p className="text-gray-600 leading-relaxed para-font mb-3">
                Yes. Moving from Mounjaro to Foundayo may be possible. The
                Foundayo dose selected can vary depending on your current weekly{" "}
                <Link
                  href="/weight-loss-treatments/mounjaro"
                  className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                >
                  Mounjaro
                </Link>{" "}
                dose.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
                <table className="w-full text-left border-collapse min-w-[420px]">
                  <thead>
                    <tr className="bg-[#5B6EE8]">
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Current Mounjaro dose
                      </th>
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Foundayo dose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["2.5 mg weekly", "0.8 mg daily"],
                      ["5 mg weekly", "2.5 mg daily"],
                      ["7.5 mg weekly", "2.5 mg daily"],
                      ["10 mg weekly", "9 mg daily"],
                      ["12.5 mg weekly", "9 mg daily"],
                      ["15 mg weekly", "9 mg daily"],
                    ].map(([from, to], i) => (
                      <tr
                        key={from}
                        className={`border-b border-gray-100 last:border-b-0 ${
                          i % 2 === 0 ? "bg-white" : "bg-[#f5f7fb]"
                        }`}
                      >
                        <td className="px-5 py-3 text-gray-700 para-font">
                          {from}
                        </td>
                        <td className="px-5 py-3 text-gray-900 font-medium para-font">
                          {to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* === Wegovy Injection → Foundayo === */}
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3">
                Can I switch from Wegovy Injection to Foundayo?
              </h3>
              <p className="text-gray-600 leading-relaxed para-font mb-3">
                Yes. It may be possible to move from a weekly{" "}
                <Link
                  href="/weight-loss-treatments/wegovy"
                  className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                >
                  Wegovy
                </Link>{" "}
                injection to once-daily Foundayo. Your existing Wegovy dose can
                help determine which Foundayo strength is appropriate when
                changing treatment.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
                <table className="w-full text-left border-collapse min-w-[420px]">
                  <thead>
                    <tr className="bg-[#4caf8a]">
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Current Wegovy injection dose
                      </th>
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Foundayo dose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["0.25 mg weekly", "0.8 mg daily"],
                      ["0.5 mg weekly", "0.8 mg daily"],
                      ["1 mg weekly", "2.5 mg daily"],
                      ["1.7 mg weekly", "9 mg daily"],
                      ["2.4 mg weekly", "9 mg daily"],
                      ["7.2 mg weekly", "9 mg daily"],
                    ].map(([from, to], i) => (
                      <tr
                        key={from}
                        className={`border-b border-gray-100 last:border-b-0 ${
                          i % 2 === 0 ? "bg-white" : "bg-[#f5f7fb]"
                        }`}
                      >
                        <td className="px-5 py-3 text-gray-700 para-font">
                          {from}
                        </td>
                        <td className="px-5 py-3 text-gray-900 font-medium para-font">
                          {to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-600 leading-relaxed para-font">
                As an oral medicine, Foundayo may suit people looking to move
                away from a weekly injectable treatment.
              </p>
            </div>

            {/* === Wegovy Pill → Foundayo === */}
            <div>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-3">
                Can I switch from Wegovy Pill to Foundayo?
              </h3>
              <p className="text-gray-600 leading-relaxed para-font mb-3">
                Yes. A change from{" "}
                <Link
                  href="/weight-loss-treatments/wegovy-pill"
                  className="font-medium text-[#4caf8a] underline decoration-[#4caf8a]/40 underline-offset-4 transition-colors hover:text-[#388f70]"
                >
                  Wegovy pill
                </Link>{" "}
                to Foundayo may be an option. The Foundayo strength selected can
                vary according to the daily Wegovy pill dose you currently use.
              </p>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
                <table className="w-full text-left border-collapse min-w-[420px]">
                  <thead>
                    <tr className="bg-[#5B6EE8]">
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Current Wegovy pill dose
                      </th>
                      <th className="px-5 py-3 text-sm sm:text-base font-semibold text-white">
                        Foundayo dose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["1.5 mg daily", "0.8 mg daily"],
                      ["4 mg daily", "0.8 mg daily"],
                      ["9 mg daily", "2.5 mg daily"],
                      ["25 mg daily", "9 mg daily"],
                    ].map(([from, to], i) => (
                      <tr
                        key={from}
                        className={`border-b border-gray-100 last:border-b-0 ${
                          i % 2 === 0 ? "bg-white" : "bg-[#f5f7fb]"
                        }`}
                      >
                        <td className="px-5 py-3 text-gray-700 para-font">
                          {from}
                        </td>
                        <td className="px-5 py-3 text-gray-900 font-medium para-font">
                          {to}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-gray-600 leading-relaxed para-font mb-3">
                Foundayo also offers greater flexibility around meals, as the
                tablet can be taken on a full or empty stomach without specific
                food or water restrictions.
              </p>

              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 para-font">
                <strong className="semibold-font">Please note:</strong>{" "}
                Switching requirements differ between individuals. Do not change
                your medicine or dose without advice from a clinician.
              </p>
            </div>

            <div>
              <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-5">
                Switching to Foundayo: Visual Dose Comparison Guide
              </h3>
              <img src="/Images/owlc_foundayo_chart.jpg" />
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
          <div className="max-w-3xl py-4">
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
                  onClick={() => {
                    window.open("/start-consultation/?product_id=8", "_blank");
                  }}
                />
              </div>
            )}
            {/* <WegovySignupModal
              isOpen={isWegovyModalOpen}
              onClose={() => setIsWegovyModalOpen(false)}
            /> */}
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
              {wegovyBottomCTA?.primaryButtonHref ? (
                <Link href={wegovyBottomCTA.primaryButtonHref}>
                  <NextButton
                    label={wegovyBottomCTA?.primaryButtonLabel}
                    props="w-full sm:w-auto"
                  />
                </Link>
              ) : (
                <NextButton
                  label={wegovyBottomCTA?.primaryButtonLabel}
                  props="w-full sm:w-auto"
                  type="button"
                  onClick={() => setIsWegovyModalOpen(true)}
                />
              )}
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
