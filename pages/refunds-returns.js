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
    slug: "refund-return",
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

export default function RefundsReturns({ seoSettings, data, siteSettings }) {
  const refundsSection = data?.sections.find(
    (s) => s._type === "refundsReturnsSection",
  );

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/refunds-returns/`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/refunds-returns/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <div className="bg-white">
        {/* ── BREADCRUMB ── */}
        {/* <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-600">Refunds &amp; Returns</span>
        </div>
      </div> */}

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            {refundsSection?.refundsPageTitle}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: refundsSection?.refundsPageContentHTML || "",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
