import { CTASection } from "../components/CTASection";
import { FAQSection } from "../components/FAQSection";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { HowItWorks } from "../components/HowItWorks";
import LpCTASection from "../components/LandingPage/LpCTASection";
import { LpFAQSection } from "../components/LandingPage/LpFAQSection";
import { LpHero } from "../components/LandingPage/LpHero";
import { LpHowItWorks } from "../components/LandingPage/LpHowItWorks";
import PricingComparison from "../components/LandingPage/pricing";
import TestimonialsSection from "../components/LandingPage/Rating";
import StartMyJourney from "../components/LandingPage/StartMyJourney";
import { MedicationSection } from "../components/MedicationSection";
import { FadeUp } from "../components/MotionWrapper";
import { ReviewsSection } from "../components/ReviewsSection";
import { StatsSection } from "../components/StatsSection";
import { TrustSection } from "../components/TrustSection";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import { SITE_SETTINGS_QUERY } from "../lib/sanityQueries";
import MetaLayout from "../Meta/MetaLayout";

export async function getStaticProps() {
  // const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      // seoSettings,
      siteSettings,
    },
    revalidate: false,
  };
}

export default function Home({ siteSettings }) {
  return (
    <>
      <MetaLayout
        title="Weight Loss Treatments UK -  Online Weight Loss Clinic"
        description="Explore effective weight loss treatments at our UK-based clinic. Offering Mounjaro & Wegovy for safe and sustainable weight management. Start your journey today."
        canonical={`${meta_url}/`}
      />
      <div className="min-h-screen bg-white">
        <Header data={siteSettings} />
        <main>
          <LpHero />
          <PricingComparison />
          <FadeUp>{/* <TrustSection /> */}</FadeUp>
          <LpHowItWorks />
          <StartMyJourney />
          <TestimonialsSection />
          <LpFAQSection />
          <LpCTASection />
        </main>
        <Footer data={siteSettings} />
      </div>
    </>
  );
}
