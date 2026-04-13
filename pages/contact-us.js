"use client";
import { useForm } from "react-hook-form";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import NextButton from "../components/ui/NextButton";
import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import toast from "react-hot-toast";
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
    slug: "contact-us",
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

export default function ContactUs({ seoSettings, data, siteSettings }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm();

  const contactInfoSection = data?.sections.find(
    (s) => s._type === "contactInfoSection",
  );

  const onSubmit = async (data) => {
    // const loadingToast = toast.loading("Sending message...");

    try {
      const res = await fetch(
        "https://vmi12.com/clients/vmi/online_contact_send.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            email: data.email,
            message: data.message,
          }),
        },
      );

      const result = await res.text();
      console.log(result, "API Response");

      if (res.ok) {
        toast.success("Message sent successfully");
        reset();
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/contact-us/`,
  });

  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/contact-us/`}
        autoSchemas={autoSchemas}
      />
      <Header data={siteSettings} />
      <section
        className="w-full py-12 md:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background:
            "linear-gradient(135deg, #e0f5ec 0%, #eef4fb 50%, #dceefb 100%)",
        }}
      >
        <div className="w-full lg:w-[60%] mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl med-font text-gray-900 mb-8 md:mb-10 tracking-tight">
              Contact Us
            </h1>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-sm mb-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700 reg-font">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "First name must be at least 2 characters",
                      },
                    })}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#4B5FC0] transition ${
                      errors.firstName ? "ring-2 ring-red-400" : ""
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700 reg-font">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Last name must be at least 2 characters",
                      },
                    })}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#4B5FC0] transition ${
                      errors.lastName ? "ring-2 ring-red-400" : ""
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700 reg-font">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={15}
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{7,15}$/,
                        message: "Phone number must be 7 to 15 digits only",
                      },
                    })}
                    onInput={(e) => {
                      const onlyNumbers = e.currentTarget.value.replace(
                        /\D/g,
                        "",
                      );
                      e.currentTarget.value = onlyNumbers;
                      setValue("phone", onlyNumbers, { shouldValidate: true });
                    }}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#4B5FC0] transition ${
                      errors.phone ? "ring-2 ring-red-400" : ""
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm text-gray-700 reg-font">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#4B5FC0] transition ${
                      errors.email ? "ring-2 ring-red-400" : ""
                    }`}
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm text-gray-700 reg-font">
                  Write Your Message
                </label>
                <textarea
                  {...register("message", {
                    required: "Message is required",
                    minLength: {
                      value: 10,
                      message: "Message must be at least 10 characters",
                    },
                  })}
                  rows={5}
                  className={`w-full bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#4B5FC0] transition resize-y ${
                    errors.message ? "ring-2 ring-red-400" : ""
                  }`}
                  placeholder="Write your message here..."
                />
                {errors.message && (
                  <p className="text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center">
                <NextButton
                  disabled={isSubmitting}
                  label={isSubmitting ? "Submitting..." : "Submit"}
                />
              </div>

              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 reg-font leading-relaxed footer-font-size">
                  *By clicking the "Submit" button, you agree to our{" "}
                  <a
                    href="/terms-conditions"
                    className="text-[#4B5FC0] underline underline-offset-2"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy-policy/"
                    className="text-[#4B5FC0] underline underline-offset-2"
                  >
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>

          {/* Remaining UI same as your code */}

          {/* Contact Details Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Left: Contact info */}
            <div className="bg-blue-50 rounded-2xl p-6 flex flex-col gap-4">
              <h3 className="text-lg md:text-xl med-font text-gray-900">
                {contactInfoSection?.contactDetailsHeading}
              </h3>
              <div className="flex flex-col gap-3">
                {contactInfoSection?.contactDetailsItems?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {/* ICON (keep frontend logic) */}
                    {item.type === "phone" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4B5FC0"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z" />
                      </svg>
                    )}
                    {item.type === "email" && (
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#4B5FC0"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    )}

                    <span className="text-sm text-black reg-font break-all footer-font-size">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Address */}
            <div className="bg-green-50 rounded-2xl p-6 flex flex-col justify-center">
              <div className="flex items-start gap-3">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4B9E7A"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm text-gray-700 reg-font footer-font-size">
                    {contactInfoSection?.pharmacyHeading}
                  </span>

                  {contactInfoSection?.pharmacyAddressLines?.map((line, i) => (
                    <span
                      key={i}
                      className="text-sm text-gray-700 reg-font footer-font-size"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer data={siteSettings} />
    </>
  );
}
