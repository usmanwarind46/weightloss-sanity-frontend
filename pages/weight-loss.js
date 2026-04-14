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
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "weight-loss",
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

const CellContent = ({ text, list }) => {
  if (list?.length) {
    return (
      <ul className="text-left inline-block space-y-1">
        {list.map((item, i) => (
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
  return <span className="text-sm text-gray-700 para-font">{text}</span>;
};

const WeightLossTreatments = ({ data, seoSettings, siteSettings }) => {
  const [active, setActive] = useState(0);

  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/weight-loss/`,
  });

  const heroSection = data?.sections?.find((s) => s._type === "weightLossHero");

  const comparisonSection = data?.sections?.find(
    (s) => s._type === "weightLossComparison",
  );

  const stepsSection = data?.sections?.find(
    (s) => s._type === "weightLossSteps",
  );

  const mythsSection = data?.sections?.find(
    (s) => s._type === "weightLossMyths",
  );

  const tabsSection = data?.sections?.find((s) => s._type === "weightLossTabs");

  const ctaSection = data?.sections?.find((s) => s._type === "ctaSection");

  const mythIconMap = {
    myth1: "/Images/myth-icon-1.svg",
    myth2: "/Images/myth-icon-2.svg",
    myth3: "/Images/myth-icon-3.svg",
    myth4: "/Images/myth-icon-4.svg",
  };

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
              {heroSection?.heading}
            </h1>
            <p className="text-gray-500 text-sm md:text-xl reg-font leading-relaxed max-w-2xl mx-auto para-font">
              {heroSection?.subheading}
            </p>
          </div>

          {/* Product Cards */}
          <div className="flex flex-col md:flex-row gap-5 justify-center ">
            {heroSection?.products?.map((product, i) => (
              <ProductCard
                key={i}
                product={{
                  ...product,
                  image: product?.image,
                }}
              />
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
              {comparisonSection?.heading}
            </h2>
            <p className="text-gray-500 text-sm md:text-base reg-font mb-3 para-font">
              {comparisonSection?.paragraph1}
            </p>
            <p className="text-gray-500 text-sm reg-font mx-auto leading-relaxed para-font">
              {comparisonSection?.paragraph2}
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
            {comparisonSection?.tableRows?.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${row.bgColor}`}
                style={{ marginTop: "6px" }}
              >
                <div className="px-8 py-6 text-sm text-gray-700 reg-font flex items-center justify-center text-center para-font">
                  {row.aspect}
                </div>

                <div className="px-8 py-6 text-center flex items-center justify-center para-font">
                  <CellContent
                    text={row.mounjaroText}
                    list={row.mounjaroList}
                  />
                </div>

                <div className="px-6 py-5 text-center">
                  <CellContent text={row.wegovyText} list={row.wegovyList} />
                </div>
              </div>
            ))}
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden flex flex-col gap-4 mb-10">
            {comparisonSection?.tableRows?.map((row, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                {/* Header */}
                <div className="bg-[#4B5FC0] px-4 py-3 text-white text-sm med-font text-center">
                  {row.aspect}
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 divide-x divide-gray-100">
                  {/* Mounjaro */}
                  <div
                    className={`${row.bgColor} px-4 py-4 flex flex-col gap-2`}
                  >
                    <p className="text-xs font-semibold text-[#4B5FC0] mb-1">
                      Mounjaro
                    </p>

                    <CellContent
                      text={row.mounjaroText}
                      list={row.mounjaroList}
                    />
                  </div>

                  {/* Wegovy */}
                  <div
                    className={`${row.bgColor} px-4 py-4 flex flex-col gap-2`}
                  >
                    <p className="text-xs font-semibold text-[#4B5FC0] mb-1">
                      Wegovy
                    </p>

                    <CellContent text={row.wegovyText} list={row.wegovyList} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer text */}
          <div className="text-center mx-auto mb-8">
            <p className="text-gray-500 text-sm reg-font leading-relaxed para-font">
              {comparisonSection?.footerNote}
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center">
            <Link href={comparisonSection?.ctaLink || "#"}>
              <NextButton label={comparisonSection?.ctaLabel} />
            </Link>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="py-12 md:py-20 bg-white">
        <div className="container mx-auto">
          {/* Heading */}
          <FadeUp>
            <div className="text-center mb-10 md:mb-16 mx-auto">
              <h2
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
                dangerouslySetInnerHTML={{
                  __html: stepsSection?.headingHTML || "",
                }}
              />
              <p className="reg-font text-gray-600 text-sm md:text-base lg:text-lg para-font">
                {stepsSection?.paragraph}
              </p>
            </div>
          </FadeUp>

          {/* Cards */}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-8 mb-12">
            {stepsSection?.steps?.map((step, index) => (
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
                      src={step?.imageUrl}
                      alt="step"
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
                {mythsSection?.heading}
              </h2>

              <div className="flex flex-col gap-6 md:gap-8">
                {mythsSection?.items?.map((item, i) => {
                  const icon = mythIconMap[item.iconKey];

                  return (
                    <div key={i} className="flex flex-col gap-2">
                      <div className="flex sm:items-start  items-center gap-3">
                        <span className="shrink-0 mt-0.5 ">
                          <Image
                            src={icon}
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
                  );
                })}
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
          {/* ================= MOBILE ================= */}
          <div className="md:hidden flex flex-col gap-3">
            {tabsSection?.tabs?.map((tab, i) => (
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
                        <div className="flex flex-col gap-4">
                          {/* Paragraphs */}
                          {tab.paragraphs?.map((p, idx) => (
                            <p
                              key={idx}
                              className="text-gray-600 text-sm md:text-base leading-relaxed para-font"
                              dangerouslySetInnerHTML={{ __html: p || "" }}
                            />
                          ))}

                          {/* Bullet List */}
                          {tab.listItems?.length > 0 && (
                            <ul className="flex flex-col gap-3">
                              {tab.listItems.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-2 text-sm md:text-base text-gray-600"
                                >
                                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                                  <span>
                                    <strong className="text-gray-800">
                                      {item.label}
                                    </strong>{" "}
                                    {item.text}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {/* Sub Sections */}
                          {tab.subSections?.map((sec, idx) => (
                            <div key={idx} className="mt-2">
                              <h3 className="text-lg md:text-xl med-font text-gray-900 mb-2">
                                {sec.title}
                              </h3>
                              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                                {sec.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* ================= DESKTOP ================= */}
          <div className="hidden md:flex gap-0">
            {/* Sidebar */}
            <div className="w-72 shrink-0 border-r border-gray-200 pr-0">
              <ul className="flex flex-col">
                {tabsSection?.tabs?.map((tab, i) => (
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

            {/* Content */}
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
                    {tabsSection?.tabs?.[active]?.title}
                  </h2>

                  <div className="flex flex-col gap-4">
                    {/* Paragraphs */}
                    {tabsSection?.tabs?.[active]?.paragraphs?.map((p, idx) => (
                      <p
                        key={idx}
                        className="text-gray-600 text-sm md:text-base leading-relaxed para-font"
                        dangerouslySetInnerHTML={{ __html: p || "" }}
                      />
                    ))}

                    {/* Bullet List */}
                    {tabsSection?.tabs?.[active]?.listItems?.length > 0 && (
                      <ul className="flex flex-col gap-3">
                        {tabsSection.tabs[active].listItems.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm md:text-base text-gray-600"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 shrink-0" />
                            <span>
                              <strong className="text-gray-800">
                                {item.label}
                              </strong>{" "}
                              {item.text}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Sub Sections */}
                    {tabsSection?.tabs?.[active]?.subSections?.map(
                      (sec, idx) => (
                        <div key={idx} className="mt-2">
                          <h3 className="text-lg md:text-xl med-font text-gray-900 mb-2">
                            {sec.title}
                          </h3>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {sec.text}
                          </p>
                        </div>
                      ),
                    )}
                  </div>
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
            <h2
              dangerouslySetInnerHTML={{
                __html: ctaSection?.headingHtml,
              }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            />

            <p className="text-white/80 text-sm sm:text-base reg-font mb-8 leading-relaxed para-font">
              {ctaSection?.description}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 cta-btn">
              <Link href="#top" scroll={false}>
                <NextButton
                  label={ctaSection.primaryButton.label}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </Link>
              {ctaSection?.secondaryButton?.link && (
                <Link
                  href={ctaSection.secondaryButton.link}
                  className="inline-flex items-center gap-2 border-2 border-white/70 hover:border-white text-white hover:bg-white/10 px-6 py-3 rounded-md text-sm md:text-base font-medium transition-all duration-200 group"
                >
                  {ctaSection.secondaryButton.label}
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}

      <Footer data={siteSettings} />
    </>
  );
};

export default WeightLossTreatments;
