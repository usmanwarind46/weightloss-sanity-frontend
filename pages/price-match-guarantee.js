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
    slug: "price-match-guarantee",
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

export default function PriceMatchSection({ seoSettings, data, siteSettings }) {
  const priceMatchSection = data?.sections.find(
    (s) => s._type === "priceMatchGuaranteeSection",
  );

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/price-match-quarantee`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/price-match-quarantee`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <div className="min-h-screen bg-white">
        {/* ── BREADCRUMB ── */}

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            {priceMatchSection?.priceMatchGuaranteeTitle}
          </h1>

          {/* Section: Shipping */}
          <div
            dangerouslySetInnerHTML={{
              __html: priceMatchSection?.priceMatchGuaranteeContentHTML || "",
            }}
          />
        </div>
      </div>
      <Footer data={siteSettings} />
    </>
  );
}
