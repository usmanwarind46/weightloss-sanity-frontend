import Link from "next/link";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import { sanityClient } from "../lib/sanity";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "../lib/sanityQueries";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "complaints",
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

export default function Complaints({ data, siteSettings }) {
  const complaintsSection = data?.sections.find(
    (s) => s._type === "complaintsSection",
  );

  return (
    <>
      <MetaLayout
        title="Complaints Policy - Weight Loss Treatment Clinic Support"
        description="We take your feedback seriously. Learn about our complaints process and how we address issues related to Mounjaro and Wegovy treatments at our clinic."
        canonical={`${meta_url}/complaints/`}
      />
      <Header data={siteSettings} />
      <div className="bg-white">
        {/* ── BREADCRUMB ── */}
        {/* <div className="border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-600">Complaints</span>
        </div>
      </div> */}

        {/* ── CONTENT ── */}
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            {complaintsSection?.complaintsPageTitle}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: complaintsSection?.complaintsPageContentHTML || "",
            }}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}
