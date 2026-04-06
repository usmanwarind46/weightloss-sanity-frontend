import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "../lib/sanityQueries";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "shipping-policy",
  });

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      data,
      siteSettings,
    },
    revalidate: false,
  };
}

export default function ShippingPolicy({ data, siteSettings }) {
  const shippingSection = data?.sections.find(
    (s) => s._type === "shippingPolicySection",
  );

  return (
    <>
      <MetaLayout
        title="Shipping Policy - Fast & Secure Delivery of Weight Loss Treatments"
        description="Read our shipping policy for Mounjaro and Wegovy treatments. Learn about delivery options, timelines, and secure shipping to your location."
        canonical={`${meta_url}/shipping-policy/`}
      />
      <Header data={siteSettings} />
      <div className="min-h-screen bg-white">
        {/* ── BREADCRUMB ── */}

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            {shippingSection?.shippingPageTitle}
          </h1>

          {/* Section: Shipping */}
          <div
            dangerouslySetInnerHTML={{
              __html: shippingSection?.shippingPageContentHTML || "",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
