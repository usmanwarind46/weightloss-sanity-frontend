import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { meta_url } from "../config/constants";
import MetaLayout from "../Meta/MetaLayout";
import { sanityClient } from "../lib/sanity";
import { PAGE_QUERY, SITE_SETTINGS_QUERY } from "../lib/sanityQueries";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "off-label-prescribing",
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

const OffLabelPrescribing = ({ data, siteSettings }) => {
  const offLabelSection = data?.sections.find(
    (s) => s._type === "offLabelPrescribingSection",
  );

  return (
    <>
      <MetaLayout
        title="Off-Label Prescribing Policy for Weight Loss Treatments | Online Clinic"
        description="Learn about off-label prescribing of Mounjaro and Wegovy for weight loss. Our clinic offers safe, effective treatment options, following medical guidelines."
        canonical={`${meta_url}/off-label-prescribing/`}
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
