import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
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
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "off-label-prescribing",
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

const OffLabelPrescribing = ({ seoSettings, data, siteSettings }) => {
  const offLabelSection = data?.sections.find(
    (s) => s._type === "offLabelPrescribingSection",
  );

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/off-label-prescribing/`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/off-label-prescribing/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <main className="min-h-screen py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl med-font text-gray-900 mb-10 md:mb-10 leading-tight">
            {offLabelSection?.offLabelPageTitle}
          </h1>

          <div
            dangerouslySetInnerHTML={{
              __html: offLabelSection?.offLabelPageContentHTML || "",
            }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OffLabelPrescribing;
