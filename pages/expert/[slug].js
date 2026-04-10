import Image from "next/image";
import Link from "next/link";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import MetaLayout from "../../Meta/MetaLayout";
import NextButton from "../../components/ui/NextButton";

import { meta_url } from "../../config/constants";
import { generateSchema } from "../../lib/schemaGenerator";
import { sanityClient } from "../../lib/sanity";
import {
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
  EXPERT_QUERY,
} from "../../lib/sanityQueries";
import { PortableText } from "@portabletext/react";

// ==============================
// PATHS
// ==============================
export async function getStaticPaths() {
  const slugs = await sanityClient.fetch(
    `*[_type == "expert" && defined(slug.current)][].slug.current`,
  );

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
}

// ==============================
// PROPS
// ==============================
export async function getStaticProps({ params }) {
  const data = await sanityClient.fetch(EXPERT_QUERY, {
    slug: params.slug,
  });

  const seoSettings = await sanityClient.fetch(SEO_QUERY);
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      data,
      seoSettings,
      siteSettings,
    },
    revalidate: 1,
  };
}

const portableTextComponents = {
  block: {
    normal: ({ children }) => {
      // remove empty blocks
      if (!children || children.every((child) => child === "")) {
        return null;
      }

      return <p className="text-auther leading-relaxed mb-4">{children}</p>;
    },
  },
};

// ==============================
// PAGE
// ==============================
const ExpertDetails = ({ data, seoSettings, siteSettings }) => {
  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/expert/${data?.slug?.current}`,
  });

  console.log(data, "Expert Data");

  return (
    <>
      <MetaLayout
        globalSeo={seoSettings}
        canonical={`${meta_url}/expert/${data?.slug?.current}`}
        autoSchemas={autoSchemas}
      />

      <Header data={siteSettings} />

      {/* HERO */}
      <section className="bg-[#3c528d] py-12 md:py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            {data?.image && (
              <Image
                src={data.image}
                alt={data.name}
                width={400}
                height={500}
                className="rounded-xl object-cover w-[280px] md:w-[350px]"
              />
            )}
          </div>

          {/* TEXT */}
          <div className="text-white order-2 md:order-1">
            {/* ROLE */}
            {data?.role && (
              <p className="inline-block bg-[#E0EDFF] text-[#0f3f2f] text-sm rounded-md px-3 py-1 mb-4 roboto-medium">
                {data.role}
              </p>
            )}

            {/* NAME */}
            {data?.name && (
              <h2 className="text-3xl md:text-5xl font-semibold mb-3">
                {data.name}
              </h2>
            )}

            {/* GMC */}
            {data?.gmcNumber && (
              <div className="inline-block text-[#0f3f2f] text-sm rounded-md py-1 mb-4 roboto-medium">
                {/* <h3 className="text-lg font-semibold text-white mb-2">
                  Registered
                </h3> */}

                {data.gmcLink ? (
                  <a
                    href={data.gmcLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    GMC No:{" "}
                    <span className="text-teal-600 underline">
                      {data.gmcNumber}
                    </span>
                  </a>
                ) : (
                  <p className="text-gray-900 text-auther">
                    GMC reference no: {data.gmcNumber}
                  </p>
                )}
              </div>
            )}

            <div className="w-full h-[1px] bg-white/30 my-5"></div>

            {/* SECOND TEXT */}
            {data?.medicalExpertise && (
              <p className="text-auther leading-relaxed">
                {data.medicalExpertise}
              </p>
            )}

            {/* EXTRA TEXT */}
            {data?.extraText && (
              <p className="text-auther text-gray-200 mt-4">{data.extraText}</p>
            )}

            {/* EXPERTISE BOX */}
            {data?.expertise && (
              <div className="bg-[#E0EDFF] text-[#0f3f2f] rounded-xl p-5 mt-6">
                <h3 className="font-semibold mb-2 text-lg md:text-xl">
                  Expertise
                </h3>
                <p className="text-auther leading-relaxed">{data.expertise}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="container mx-auto px-4 py-10">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>

        {data?.bio && (
          <div className="text-auther leading-relaxed">
            <PortableText
              value={data.bio}
              components={portableTextComponents}
            />
          </div>
        )}

        {/* ABOUT */}
        {data?.about && (
          <div className="text-auther text-gray-700 leading-relaxed mb-4">
            <PortableText value={data.about} />
          </div>
        )}

        {/* MEDICAL EXPERTISE */}
        {data?.medicalExpertise && (
          <div className="text-auther text-gray-700 leading-relaxed">
            <PortableText value={data.medicalExpertise} />
          </div>
        )}

        {/* SPECIALISMS */}
        {data?.specialisms?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Specialisms
            </h3>

            <div className="flex flex-wrap gap-2">
              {data.specialisms.map((item) => (
                <span
                  key={item}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-auther"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* QUALIFICATIONS */}
        {data?.qualifications?.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Qualifications
            </h3>

            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {data.qualifications.map((item) => (
                <li key={item} className="text-auther">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="cta-section py-8 sm:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-medium text-[#24352f] leading-tight mb-8">
            Your first step towards <br className="hidden md:block" />
            weight loss starts here
          </h2>

          <Link href={"/start-consultation"} className="inline-block">
            <NextButton label={"Start Consultation"} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExpertDetails;
