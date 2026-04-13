import Image from "next/image";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FaCheck } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaStethoscope, FaUsers, FaFileAlt, FaShieldAlt } from "react-icons/fa";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { sanityClient } from "../lib/sanity";
import { generateSchema } from "../lib/schemaGenerator";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "about-clinic",
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

const trustIconMap = {
  verifiedBadge: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.745 3.745 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.745 3.745 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  ),

  globe: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253"
      />
    </svg>
  ),

  document: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    </svg>
  ),

  prescriptionDoc: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  ),

  deliveryTruck: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
      />
    </svg>
  ),
};

const trustThemeMap = {
  green: {
    bg: "bg-green-100",
    icon: "text-green-600",
  },
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-500",
  },
  purple: {
    bg: "bg-purple-100",
    icon: "text-purple-500",
  },
};

const expectationsIconMap = {
  consultation: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
      />
    </svg>
  ),

  assessment: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  ),

  prescription: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z"
      />
    </svg>
  ),

  delivery: (
    <svg
      className="w-7 h-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),
};

function AboutClinic({ seoSettings, data, siteSettings }) {
  const [active, setActive] = useState(0);
  console.log(data, "about page data");
  const heroSection = data?.sections.find((s) => s._type === "aboutClinicHero");
  const introSection = data?.sections.find(
    (s) => s._type === "aboutClinicIntro",
  );

  const trustSection = data?.sections.find(
    (s) => s._type === "aboutClinicTrust",
  );

  const frameworkSection = data?.sections.find(
    (s) => s._type === "aboutClinicFramework",
  );

  const expectationsSection = data?.sections.find(
    (s) => s._type === "aboutClinicExpectations",
  );

  const safetySection = data?.sections.find(
    (s) => s._type === "aboutClinicSafety",
  );

  const tabsSection = data?.sections?.find(
    (s) => s._type === "aboutClinicTabs",
  );

  const resourcesSection = data?.sections.find(
    (s) => s._type === "aboutClinicResources",
  );

  const regulatorsSection = data?.sections.find(
    (s) => s._type === "aboutClinicRegulators",
  );

  const resourceIconMap = {
    guide: <FaStethoscope className="w-5 h-5 text-teal-600" />,
    faq: <FaUsers className="w-5 h-5 text-teal-600" />,
    support: <FaFileAlt className="w-5 h-5 text-teal-600" />,
    info: <FaShieldAlt className="w-5 h-5 text-teal-600" />,
  };

  const safetyThemeMap = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
  };

  const tabs = tabsSection?.aboutTabsItems || [];

  const tabIconMap = {
    consultation: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
      </svg>
    ),
    assessment: (
      <svg
        className="w-6 h-6 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
        />
      </svg>
    ),
    prescription: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75"
        />
      </svg>
    ),
    delivery: (
      <svg
        className="w-6 h-6 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    extra: (
      <svg
        className="w-6 h-6 text-teal-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
        />
      </svg>
    ),
  };

  // ✅ BG MAP (MATCH YOUR UI)
  const tabCardBgMap = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
  };

  // ✅ TRANSFORM DATA FOR YOUR EXISTING UI STRUCTURE
  const transformedTabs = tabs.map((tab) => ({
    label: tab.label,
    title: tab.title,
    paragraphs: tab.aboutTabsParagraphs || [],
    footer: tab.aboutTabsFooterNote || "",
    cards:
      tab.aboutTabsCards?.map((card) => ({
        text: card.text,
        bg: tabCardBgMap[card.theme] || "bg-blue-100",
        icon: tabIconMap[card.iconKey],
      })) || [],
  }));

  const current = transformedTabs[active] || {};

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/about-clinic/`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/about-clinic/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <div className="font-serif">
        {/* Hero Section */}
        <section className="text-center  sm:px-10 pt-14 sm:pt-20 pb-12 sm:pb-16 top-bg">
          <div className="container">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl med-font text-[#1a1a2e] mx-auto mb-7 sm:mb-9 leading-tight tracking-tight">
              {heroSection?.heading}
            </h1>

            <Link
              href={heroSection?.buttonLink || "#"}
              className="bg-[#4caf82] hover:bg-[#3d9e6e] text-white rounded-md px-5 sm:px-7 py-3 sm:py-3.5 text-sm reg-font font-sans tracking-wide transition-colors duration-200 cursor-pointer w-full sm:w-auto para-font"
            >
              {heroSection?.buttonLabel}
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="relative flex flex-col md:flex-row bg-white overflow-hidden doctor-bg">
          <div className="container flex justify-end items-center">
            {/* Left — Image column */}
            <div className="relative">
              {/* Mobile image only — hidden on md+ */}
              <div className="absolute inset-0 md:hidden">
                <Image
                  src={introSection?.desktopImage?.asset?.url}
                  alt="Doctor"
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>

              <div className="hidden md:block absolute inset-y-0 right-0 w-24" />
            </div>

            {/* Right — Text Content */}
            <div className="w-full sm:w-[100%] md:w-[48%] flex flex-col pt-8 md:py-16 md:pl-8">
              <h2 className="text-2xl md:text-4xl sm:text-[28px] med-font text-[#1a1a2e] mb-4 sm:mb-5 tracking-tight">
                {introSection?.heading}
              </h2>
              <p className="text-md leading-7 text-[#3a3a4a] reg-font mb-4 para-font">
                {introSection?.paragraph1}
              </p>
              <p className="text-md leading-7 text-[#3a3a4a] reg-font para-font">
                {introSection?.paragraph2}
              </p>
            </div>
          </div>
        </section>
      </div>
      <section className="bg-white text-gray-800">
        {/* Hero Text */}
        <div className="container py-10 md:py-30 text-left sm:text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-6 leading-tight">
            {trustSection?.topHeading}
          </h1>
          <p className="text-gray-600 text-md  leading-relaxed mb-5 para-font">
            {trustSection?.topParagraph1}
          </p>
          <p className="text-gray-600 text-md leading-relaxed para-font">
            {trustSection?.topParagraph2}
          </p>
        </div>

        {/* Two Column */}
        <div className="container sm:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left: UK-Licensed Medical Oversight */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-5">
                {trustSection?.leftHeading}
              </h2>
              <p className="text-gray-600 text-md leading-relaxed mb-4 para-font">
                {trustSection?.leftParagraph1}
              </p>
              <p className="text-gray-600 text-md leading-relaxed para-font">
                {trustSection?.leftParagraph2}
              </p>
            </div>

            {/* Right: Trust in Our Care */}
            <div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-5">
                {trustSection?.rightHeading}
              </h2>
              <div className="flex flex-col gap-3">
                {trustSection?.trustItems?.map((item, i) => {
                  const icon = trustIconMap[item.iconKey];
                  const theme =
                    trustThemeMap[item.theme] || trustThemeMap.green;

                  return (
                    <div
                      key={i}
                      className={`${theme.bg} rounded-2xl px-5 py-4 flex items-center gap-4 transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md`}
                    >
                      <div className={`${theme.icon} mt-0.5 shrink-0`}>
                        {icon}
                      </div>

                      <p className="text-gray-800 text-sm font-medium leading-snug footer-font-size">
                        {item.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Clinical Framework
       */}
      <section className="w-full bg-white ourClinic-bg">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[820px]">
          {/* Left: Image column */}
          <div className=" relative w-full h-[420px] md:h-full overflow-hidden">
            {/* Mobile image only — hidden on md+ */}
            <div className="absolute inset-0 md:hidden">
              <Image
                src={frameworkSection?.mobileImage?.asset?.url}
                alt="Clinical team reviewing patient information"
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>

          {/* Right: Content */}
          <div className="flex items-center px-6 sm:px-10 py-14 md:py-20 bg-white">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-5">
                {frameworkSection?.heading}
              </h2>

              <p className="text-gray-600 text-sm md:text-md leading-relaxed mb-4 para-font">
                {frameworkSection?.paragraph1}
              </p>

              <p className="text-gray-600 text-sm md:text-md leading-relaxed mb-4 para-font">
                {frameworkSection?.paragraph2}
              </p>

              <p className="text-gray-800 text-sm md:text-md font-medium mb-3 para-font">
                {frameworkSection?.leadText}
              </p>

              <ul className="space-y-2">
                {frameworkSection?.bulletItems?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-gray-600 text-sm md:text-md para-font"
                  >
                    <span className="mt-1 shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                      <FaCheck className="text-green-600 text-[8px]" />
                    </span>
                    {item?.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Patients Can Expect */}
      <section className="w-full bg-white overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 mt-0 sm:mt-20">
          {/* Left: Image with right fade */}
          <div className="relative w-full h-[420px] md:h-auto">
            <Image
              src="/Images/WhatPatientsCanExpect.png"
              alt="Doctor measuring patient waist"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Fade to white on the right */}
            <div className="absolute" />
          </div>

          {/* Right: Content */}
          <div className="flex items-start px-10 pt-8 md:py-16 bg-white">
            <div className="max-w-2xl w-full">
              {/* Heading */}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {expectationsSection?.heading}
              </h2>
              <p className="text-gray-500 text-md leading-relaxed mb-10 reg-font">
                {expectationsSection?.introText}
              </p>

              {/* Steps */}
              <div className="flex flex-col gap-8">
                {expectationsSection?.expectationItems?.map((item, i) => {
                  const icon = expectationsIconMap[item.iconKey];

                  return (
                    <div key={i} className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="shrink-0 text-teal-600 mt-0.5">
                        {icon}
                      </div>
                      {/* Text */}
                      <div>
                        <h3 className="text-lg med-font text-gray-900 mb-1 para-font">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-md leading-relaxed reg-font">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  Patient Safety at the Core */}
      <section className="w-full bg-white py-10 md:py-16 mt-5 sm:mt-20 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Heading */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl med-font text-gray-900 mb-3 md:mb-4">
              {safetySection?.heading}
            </h2>
            <p className="text-gray-500 text-sm md:text-md leading-relaxed mx-auto reg-font px-2 para-font">
              {safetySection?.introText}
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 md:mb-10">
            {safetySection?.aboutCards?.map((step) => {
              const theme = safetyThemeMap[step.theme] || safetyThemeMap.blue;

              return (
                <div
                  key={step.number}
                  className={`${theme} rounded-2xl p-5 flex flex-col gap-4`}
                >
                  {/* Number badge */}
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-lg med-font shrink-0`}
                  >
                    {step.number}
                  </div>
                  {/* Text */}
                  <p className="text-gray-700 text-sm md:text-md leading-relaxed reg-font para-font">
                    {step.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-500 text-sm leading-relaxed px-4 para-font">
            Accurate and complete information from patients supports safe
            decision-making throughout the process.
          </p>
        </div>
      </section>
      {/*tabs*/}

      <section className="w-full bg-white py-4 sm:py-12 md:py-16 px-4 md:px-6">
        <div className="container flex flex-col md:flex-row gap-0">
          {/* LEFT SIDE */}
          <div className="w-full md:w-72 md:shrink-0 md:border-r md:border-gray-200 md:pr-0">
            {/* MOBILE TABS */}
            <div className="md:hidden flex overflow-x-auto gap-2 pb-2 mb-6 scrollbar-hide border-b border-gray-200">
              {transformedTabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`shrink-0 text-sm px-4 py-2 rounded-full transition-colors duration-150 whitespace-nowrap
                ${
                  active === i
                    ? "bg-green-50 text-gray-800 med-font"
                    : "text-gray-500 hover:bg-gray-50 reg-font border border-gray-200"
                }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* DESKTOP SIDEBAR */}
            <ul className="hidden md:flex flex-col">
              {transformedTabs.map((tab, i) => (
                <li key={i}>
                  <button
                    onClick={() => setActive(i)}
                    className={`w-full text-left text-sm px-4 py-4 border-b border-gray-200 transition-colors duration-150 rounded-l-lg footer-font-size
                  ${
                    active === i
                      ? "bg-green-50 text-gray-800 med-font cursor-pointer"
                      : "text-gray-500 hover:bg-gray-50 reg-font cursor-pointer"
                  }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex-1 md:pl-10">
            <h2 className="text-2xl md:text-3xl med-font text-gray-900 mb-4">
              {current.title}
            </h2>

            {current.paragraphs?.map((p, i) => (
              <p
                key={i}
                className="text-gray-600 text-sm leading-relaxed mb-4 reg-font footer-font-size"
              >
                {p}
              </p>
            ))}

            {current.cards?.length > 0 && (
              <div className="flex flex-col gap-3 mt-5 mb-5">
                {current.cards.map((card, i) => (
                  <div
                    key={i}
                    className={`${card.bg} rounded-2xl px-4 md:px-5 py-4 flex items-center gap-3 md:gap-4`}
                  >
                    <div className="shrink-0">{card.icon}</div>

                    <p className="text-gray-800 text-sm med-font footer-font-size">
                      {card.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {current.footer && (
              <p className="text-gray-500 text-sm leading-relaxed mt-4 reg-font">
                {current.footer}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-10 md:py-16 px-4 md:px-6">
        <div className="container">
          {/* Heading */}
          <h2 className="text-2xl sm:text-2xl md:text-3xl med-font text-gray-900 text-center mb-8 md:mb-12 leading-tight max-w-3xl mx-auto px-2">
            {resourcesSection?.clinicResourcesHeading}
          </h2>

          {/* 4 Link Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10 md:mb-16">
            {resourcesSection?.aboutResourcesItems?.map((item, i) => {
              const icon = resourceIconMap[item.iconKey];

              return (
                <motion.div
                  key={i}
                  initial={{ backgroundColor: "#ffffff" }}
                  whileHover={{ backgroundColor: "#f5f7ff", y: -4 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="flex flex-col gap-2 p-5 md:p-6 cursor-pointer group rounded-2xl shadow-sm"
                >
                  <Link
                    href={item.href || "#"}
                    className="flex flex-col gap-2 h-full no-underline"
                  >
                    {/* Icon with colored bg */}
                    <div className="w-10 h-10 rounded-xl bg-blue-50  flex items-center justify-center mb-2 transition-colors duration-300">
                      <span className="text-[#4B5FC0] group-hover:text-white transition-colors duration-300 text-lg">
                        {icon}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg med-font text-gray-800 group-hover:text-teal-600 transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-400 text-xs leading-relaxed transition-colors duration-300 group-hover:text-gray-500 footer-font-size">
                      {item.description}
                    </p>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* 3 Regulator Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {regulatorsSection?.aboutRegulatorItems?.map((item, i) => (
              <div
                key={i}
                className="bg-green-50 rounded-2xl p-5 md:p-6 flex flex-col"
              >
                <div className="mb-3 md:mb-4">
                  <Image
                    src={item.logo.asset.url}
                    width={item.imageWidth || 150}
                    height={item.imageHeight || 100}
                    alt={item.shortName}
                  />
                </div>
                <h3 className="text-base md:text-lg med-font text-gray-900 mb-2 leading-snug para-font">
                  {item.fullName}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed reg-font footer-font-size">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer data={siteSettings} />
    </>
  );
}

export default AboutClinic;
