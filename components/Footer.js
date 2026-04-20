"use client";

import { Shield, Phone, Mail, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import NextButton from "./ui/NextButton";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewsletterModal from "./NewsletterModal/NewsletterModal";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function Footer({ data }) {
  console.log(data, "data From foooooter");
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
  };
  // ✅ NEW: accordion state
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  const onSubmit = async (data) => {
    try {
      const res = await fetch(
        "https://app.onlineweightlossclinic.co.uk/api/contact-submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            firstName: data.name,
            email: data.email,
            type: "news-letter",
            company_id: 2,
          }),
        },
      );

      if (res.ok) {
        toast.success("Thank You for Subscribing");
        reset();
        setSubmitted(true);
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <footer className="bg-gray-50 text-gray-900">
      <div className="container pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="min-w-0">
            <div className="mb-4">
              <Image
                src={data?.footerLogo?.asset?.url || "/Images/logo.png"}
                alt="Online Weight Loss Clinic Logo"
                width={160}
                height={60}
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed footer-font-size">
              {data?.footerDescription}
            </p>
          </div>

          {/* Column 2: Information */}
          <div className="min-w-0">
            <h4
              onClick={() => toggle(0)}
              className="font-semibold text-gray-900 mb-5 text-sm tracking-wide uppercase footer-font-size cursor-pointer 
  max-[600px]:flex max-[600px]:justify-between max-[600px]:items-center 
  max-[600px]:pb-3 max-[600px]:border-b max-[600px]:border-gray-300"
            >
              Information
              <span className="max-[600px]:block hidden">
                {activeIndex === 0 ? "-" : "+"}
              </span>
            </h4>

            <ul
              className={`space-y-3 text-sm footer-font-size max-[600px]:transition-all max-[600px]:overflow-hidden ${
                activeIndex === 0
                  ? "max-[600px]:max-h-96"
                  : "max-[600px]:max-h-0"
              } md:max-h-full`}
            >
              {data?.footerLinks1?.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href || "#"}
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="min-w-0">
            <h4
              onClick={() => toggle(1)}
              className="font-semibold text-gray-900 mb-5 text-sm tracking-wide uppercase footer-font-size cursor-pointer 
  max-[600px]:flex max-[600px]:justify-between max-[600px]:items-center 
  max-[600px]:pb-3 max-[600px]:border-b max-[600px]:border-gray-300"
            >
              Customer Care
              <span className="max-[600px]:block hidden">
                {activeIndex === 1 ? "-" : "+"}
              </span>
            </h4>

            <ul
              className={`space-y-3 text-sm footer-font-size max-[600px]:transition-all max-[600px]:overflow-hidden ${
                activeIndex === 1
                  ? "max-[600px]:max-h-96"
                  : "max-[600px]:max-h-0"
              } md:max-h-full`}
            >
              {data?.footerLinks2?.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href || "#"}
                    className="text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Help & Support (UNCHANGED) */}
          <div className="min-w-0">
            <h4 className="font-semibold text-gray-900 mb-5 text-sm tracking-wide uppercase footer-font-size">
              Help &amp; Support
            </h4>
            <ul className="space-y-4 text-sm footer-font-size">
              <li className="flex items-start gap-3">
                <Phone size={15} className="text-teal-600 mt-0.5 shrink-0" />
                <a
                  href={`tel:${data?.footerContact?.phone}`}
                  className="text-gray-600 hover:text-teal-600"
                >
                  {data?.footerContact?.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-teal-600 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${data?.footerContact?.email}`}
                  className="text-gray-600 hover:text-teal-600 break-all"
                >
                  {data?.footerContact?.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-teal-600 mt-0.5 shrink-0" />
                <address className="not-italic text-gray-600">
                  {data?.footerContact?.address?.map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* rest of code unchanged */}
        <div className="border-t border-gray-200 py-2 flex flex-col sm:flex-row items-center justify-between gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="grid grid-cols-2 md:grid-cols-2 w-full max-w-md items-center">
            <div className="flex justify-center relative left-9 sm:left-0">
              <Image
                src="/Images/footer-payment.png"
                alt="Payment Methods"
                width={1200}
                height={150}
                className="w-full h-auto object-contain footer_payment_visa "
              />
            </div>

            <div className="flex sm:justify-start ms-16 sm:ms-8">
              <Link
                href="https://www.legitscript.com/websites/Onlineweightlossclinic.co.uk"
                target="_blank"
                className="w-20"
              >
                <Image
                  src="/Images/legitscript-logo.png"
                  alt="Legitscript Logo"
                  width={50}
                  height={50}
                  className="w-full h-auto"
                />
              </Link>
            </div>
          </div>

          {/* Newsletter ✌️✌️✌️✌️✌️ */}
          <div className="w-full max-w-3xl mx-auto sm:p-8">
            {/* Heading */}
            <div className="mb-6 text-start sm:text-center sm:text-left">
              <h3 className="font-semibold text-gray-900 mb-5 text-sm tracking-wide uppercase footer-font-size">
                Newsletter
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Subscribe to our newsletter to get updates and exclusive offers
              </p>
            </div>

            <div className="pt-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key="form"
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* Name */}
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Your Name"
                          {...register("name", { required: "Required" })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 shadow-sm
                  ${errors.name ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="flex-1">
                        <input
                          type="email"
                          placeholder="Your Email"
                          {...register("email", {
                            required: "Required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email",
                            },
                          })}
                          className={`w-full px-4 py-3 rounded-xl bg-white border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 
                  focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 shadow-sm
                  ${errors.email ? "border-red-400" : "border-gray-200"}`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      {/* Button */}
                      <button
                        type="submit"
                        className="px-6 py-3 rounded-xl text-white roboto-reg text-md 
                bg-gradient-to-r from-emerald-500 to-teal-500 
                hover:from-emerald-600 hover:to-teal-600 
                transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer tracking-wide
"
                      >
                        Subscribe
                      </button>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {/* <NextButton
            label="Join Our Newsletter"
            onClick={() => setOpen(true)}
          /> */}
        </div>

        {/* <NewsletterModal open={open} setOpen={setOpen} /> */}
      </div>

      {/* ── PHARMACY TRUST BAR ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* GPhC Badge + pharmacy name */}
            <div className="flex items-center gap-4">
              <a
                href={data?.pharmacy?.registrationLink}
                className="text-teal-600 hover:underline footer-bottom-size"
                target="_blank"
              >
                <Image
                  src="/Images/registered.png"
                  width={70}
                  height={70}
                  alt="GPhC Registered"
                />
              </a>
              <div>
                <p className="text-sm font-semibold text-gray-900 footer-bottom-size">
                  {data?.pharmacy?.name}
                </p>
                <p className="text-xs text-gray-500 footer-bottom-size">
                  GPhC Registration:{" "}
                  <a
                    href={data?.pharmacy?.registrationLink}
                    className="text-teal-600 hover:underline footer-bottom-size"
                    target="_blank"
                  >
                    {data?.pharmacy?.registrationNumber}
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-0.5 footer-bottom-size">
                  Prescriber: {data?.pharmacy?.prescriberName} — GMC No.{" "}
                  <a
                    href={data?.pharmacy?.prescriberLink}
                    className="text-teal-600 hover:underline"
                    target="_blank"
                  >
                    {data?.pharmacy?.prescriberGmc}
                  </a>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>

            {/* Description */}
            <p className="text-xs text-gray-500 max-w-md text-center md:text-left leading-relaxed footer-bottom-size">
              {data?.pharmacy?.description}
            </p>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>

            {/* Trust signal */}
            <div className="flex items-center gap-2 text-xs text-gray-500 shrink-0 footer-bottom-size">
              <Shield size={16} className="text-teal-600 shrink-0" />
              <span>GPhC &amp; MHRA Registered</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p className="footer-bottom-size">
            © 2026 Online Weight Loss Clinic. All Rights Reserved
          </p>
          <p className="text-center sm:text-right footer-bottom-size">
            All consultations and prescribing are carried out by UK registered
            healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
