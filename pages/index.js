import { CTASection } from "../components/CTASection";
import { FAQSection } from "../components/FAQSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { LpFAQSection } from "../components/LandingPage/LpFAQSection";
import { MedicationSection } from "../components/MedicationSection";
import { FadeUp } from "../components/MotionWrapper";
import { ReviewsSection } from "../components/ReviewsSection";
import { StatsSection } from "../components/StatsSection";
import { TrustSection } from "../components/TrustSection";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";
import MetaLayout from "../Meta/MetaLayout";
import { useEffect } from "react";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "home",
  });

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      seoSettings,
      data,
      siteSettings,
    },
    revalidate: false,
  };
}

export default function Home({ seoSettings, data, siteSettings }) {
  console.log(data, "data From New Frontend");

  const heroSection = data?.sections?.find(
    (section) => section._type === "hero",
  );

  const trustSection = data?.sections?.find(
    (section) => section._type === "trustSection",
  );

  const howItWorks = data?.sections?.find(
    (section) => section._type === "howItWorks",
  );

  const medicationSection = data?.sections?.find(
    (section) => section._type === "medicationSection",
  );

  const statsSection = data?.sections?.find((s) => s._type === "statsSection");

  const reviewsSection = data?.sections?.find(
    (s) => s._type === "reviewsSection",
  );

  const faqSection = data?.sections?.find((s) => s._type === "faqSection");

  const ctaSection = data?.sections?.find((s) => s._type === "ctaSection");

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/${data?.slug?.current || ""}`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/`}
        autoSchemas={autoSchemas}
      />
      <div className="min-h-screen bg-white">
        <Header data={siteSettings} />
        <main>
          {heroSection && <Hero data={heroSection} />}
          {/* <FadeUp>
            {trustSection && <TrustSection data={trustSection} />}
          </FadeUp> */}
          {howItWorks && <HowItWorks data={howItWorks} />}
          {medicationSection && <MedicationSection data={medicationSection} />}
          {statsSection && <StatsSection data={statsSection} />}
          {reviewsSection && <ReviewsSection data={reviewsSection} />}
          {faqSection && <FAQSection data={faqSection} />}
          {ctaSection && <CTASection data={ctaSection} />}
        </main>
        <Footer />
      </div>
    </>
  );
}
