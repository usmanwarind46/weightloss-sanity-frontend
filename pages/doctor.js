import Image from "next/image";
import { Header } from "../components/Header";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import { generateSchema } from "../lib/schemaGenerator";
import { sanityClient } from "../lib/sanity";
import { SEO_QUERY, SITE_SETTINGS_QUERY } from "../lib/sanityQueries";
import { Footer } from "../components/Footer";
import Link from "next/link";
import NextButton from "../components/ui/NextButton";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: { seoSettings, siteSettings },
    revalidate: 1,
  };
}

const DoctorDetails = ({ seoSettings, siteSettings }) => {
  const autoSchemas = generateSchema({
    globalSeo: seoSettings,
    canonical: `${meta_url}/doctor/`,
  });

  return (
    <>
      <MetaLayout
        globalSeo={seoSettings}
        canonical={`${meta_url}/doctor/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />

      {/* HERO */}
      <section className="bg-[#3c528d] py-12 md:py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          {/* IMAGE FIRST ON MOBILE */}
          <div className="flex justify-center md:justify-end order-1 md:order-2">
            <Image
              src="/Images/dr-mihaela.png"
              alt="Dr Mihaela"
              width={400}
              height={500}
              className="rounded-xl object-cover w-[280px] md:w-[350px]"
            />
          </div>

          {/* TEXT SECOND ON MOBILE */}
          <div className="text-white order-2 md:order-1">
            <h2 className="text-3xl md:text-5xl font-semibold mb-3">
              Dr Mihaela C
            </h2>

            <p className="inline-block bg-[#E0EDFF] text-[#0f3f2f] text-sm rounded-md px-3 py-1 mb-4 roboto-medium">
              GMC No.{" "}
              <a
                href="https://www.gmc-uk.org/registrants/7099398"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 hover:underline"
              >
                7099398
              </a>
            </p>

            <p className="text-auther leading-relaxed ">
              Dr Mihaela C. is a highly experienced General Practitioner
              registered with the General Medical Council, with a strong
              background in both NHS and private healthcare across the UK.
            </p>

            <div className="w-full h-[1px] bg-white/30 my-5"></div>

            <p className="text-auther leading-relaxed">
              Her clinical expertise spans general medicine, occupational
              health, weight management, and medico-legal reporting.
            </p>

            <p className="text-auther text-gray-200 mt-4">
              Passionate about patient wellbeing, Dr Mihaela ensures every
              patient feels safe, supported, and valued.
            </p>

            {/* BOX */}
            <div className="bg-[#E0EDFF] text-[#0f3f2f] rounded-xl p-5 mt-6">
              <h3 className="font-semibold mb-2 text-lg md:text-xl ">
                Expertise: Safety & Clinical Governance
              </h3>
              <p className="text-auther leading-relaxed">
                Strong focus on clinical risk governance and safety ensures the
                highest standards in prescribing and patient care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container mx-auto px-4 py-10">
        {/* ABOUT */}
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">About</h2>
        <p className="text-auther text-gray-700 leading-relaxed mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
          amet scelerisque neque. Mauris sed sapien at nibh efficitur vulputate
          eu a elit. Donec ac purus volutpat arcu imperdiet cursus non sed
          ipsum. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Morbi molestie ultrices risus, vel
          posuere dolor. Duis bibendum nibh efficitur, tincidunt diam sit amet,
          consectetur est. Suspendisse ut magna a sem accumsan pretium
          condimentum a dui. Curabitur bibendum ex quam, sit amet venenatis
          massa suscipit at. Suspendisse potenti. Etiam condimentum erat vitae
          leo congue laoreet. Maecenas malesuada eleifend porta. Suspendisse in
          nisl odio. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Quisque nec consectetur risus, ac
          pellentesque tellus. Sed eget nulla non lorem finibus pulvinar quis at
          metus. In nec justo ante.
        </p>

        {/* MEDICAL EXPERTISE */}
        <h2 className="text-3xl font-semibold text-gray-900 mt-10 mb-4">
          Medical expertise
        </h2>
        <p className="text-auther text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit
          amet scelerisque neque. Mauris sed sapien at nibh efficitur vulputate
          eu a elit. Donec ac purus volutpat arcu imperdiet cursus non sed
          ipsum. Class aptent taciti sociosqu ad litora torquent per conubia
          nostra, per inceptos himenaeos. Morbi molestie ultrices risus, vel
          posuere dolor. Duis bibendum nibh efficitur, tincidunt diam sit amet,
          consectetur est. Suspendisse ut magna a sem accumsan pretium
          condimentum a dui. Curabitur bibendum ex quam, sit amet venenatis
          massa suscipit at. Suspendisse potenti. Etiam condimentum erat vitae
          leo congue laoreet. Maecenas malesuada eleifend porta. Suspendisse in
          nisl odio. Vestibulum ante ipsum primis in faucibus orci luctus et
          ultrices posuere cubilia curae; Quisque nec consectetur risus, ac
          pellentesque tellus. Sed eget nulla non lorem finibus pulvinar quis at
          metus. In nec justo ante.
        </p>

        {/* REGISTERED */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Registered
          </h3>
          <p className="text-gray-700 text-auther">GMC reference no: 7099398</p>
        </div>

        {/* SPECIALISMS */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Specialisms
          </h3>

          <div className="flex flex-wrap gap-2">
            {[
              "Men’s Health",
              "Women’s Health",
              "Family Planning",
              "TeleMedicine",
            ].map((item) => (
              <span
                key={item}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-auther"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* QUALIFICATIONS */}
        <div className="mt-8">
          <h3 className="text-lg  font-semibold text-gray-900 mb-3">
            Qualifications
          </h3>

          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li className="text-auther">Bachelor of Medicine (MBBS)</li>
            <li className="text-auther">
              Harvard Business School Certification
            </li>
            <li className="text-auther">
              Royal College of General Practitioners
            </li>
          </ul>
        </div>
      </section>

      <section className="cta-section py-8 sm:py-24 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-medium text-[#24352f] leading-tight mb-8">
            Your first step towards <br className="hidden md:block" />
            weight loss starts here
          </h2>
          <Link href={"/consultation"} className="inline-block">
            <NextButton label={"Start Consultation"} />
          </Link>
          {/* <button className="bg-white px-8 py-3 rounded-full text-sm font-medium text-gray-800">
      Start assessment
    </button> */}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default DoctorDetails;
