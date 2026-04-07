import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { generateSchema } from "../lib/schemaGenerator";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "shipping-policy",
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

export default function ShippingPolicy({ seoSettings, data, siteSettings }) {
  const shippingSection = data?.sections.find(
    (s) => s._type === "shippingPolicySection",
  );

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/shipping-policy/`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/shipping-policy/`}
        autoSchemas={autoSchemas}
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
