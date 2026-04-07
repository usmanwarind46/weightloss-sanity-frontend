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

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "privacy-policy",
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

const PrivacyPolicy = ({ seoSettings, data, siteSettings }) => {
  const privacySection = data?.sections.find(
    (s) => s._type === "privacyPolicySection",
  );

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/privacy-policy/`}
      />
      <Header data={siteSettings} />
      <main className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* ── Privacy Policy ── */}
          <h1 className="text-3xl sm:text-4xl text-gray-900 leading-tight mb-8">
            {privacySection?.privacyPageTitle}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: privacySection?.privacyPageContentHTML || "",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
