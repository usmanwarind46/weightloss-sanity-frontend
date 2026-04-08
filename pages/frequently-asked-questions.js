"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import {
  SITE_SETTINGS_QUERY,
  PAGE_QUERY,
  SEO_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";

const GRADIENT = "linear-gradient(135deg, #76c8a1, #4b6bc1)";
const BORDER_DEFAULT = "#e5e7eb";

// ✅ STATIC PROPS (ONLY THIS — NO getStaticPaths)
export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "frequently-asked-questions",
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

// ✅ FAQ ITEM COMPONENT
function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "1px",
        borderRadius: "1rem",
        background: hovered || open ? GRADIENT : BORDER_DEFAULT,
      }}
    >
      <div
        className={`rounded-2xl overflow-hidden ${
          open ? "bg-gray-50" : "bg-white"
        }`}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
        >
          <span className="font-semibold text-gray-900 pr-8">{question}</span>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            >
              <div className="px-6 pb-6 text-gray-600 whitespace-pre-line">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ✅ MAIN PAGE
export default function FAQPage({ seoSettings, data, siteSettings }) {
  console.log(data, "datadatadata");
  const sections = data?.sections || [];

  const faqSection = sections.find((s) => s._type === "faqPageSection");

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/frequently-asked-questions/`,
  });

  return (
    <>
      {/* ✅ SEO (static for now) */}
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/frequently-asked-questions/`}
        autoSchemas={autoSchemas}
      />

      {/* ✅ HEADER */}
      <Header data={siteSettings} />

      <div className="bg-white">
        {/* HERO */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 text-center">
          <h1
            dangerouslySetInnerHTML={{
              __html: faqSection?.headingHtml,
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          />

          <p className="text-xl text-gray-600">{faqSection?.subheading}</p>
        </div>

        {/* FAQ CONTENT */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          {faqSection?.categories?.map((cat, catIndex) => (
            <div key={catIndex} className="mb-14">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-100">
                {cat.category}
              </h2>

              <div className="space-y-3">
                {cat.faqs?.map((faq, faqIndex) => (
                  <FAQItem
                    key={faqIndex}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ FOOTER */}
      <Footer />
    </>
  );
}
