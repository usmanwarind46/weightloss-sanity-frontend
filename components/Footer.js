"use client";

import { Shield, Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import NextButton from "./ui/NextButton";
import Link from "next/link";
import { useState } from "react";
import NewsletterModal from "./NewsletterModal/NewsletterModal";

export function Footer() {
  const [open, setOpen] = useState(false);

  // ✅ NEW: accordion state
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <footer className="bg-gray-50 text-gray-900">
      <div className="container pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-12">
          {/* Column 1: Brand */}
          <div className="min-w-0">
            <div className="mb-4">
              <Image
                src="/Images/logo.png"
                alt="Online Weight Loss Clinic Logo"
                width={160}
                height={60}
              />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed footer-font-size">
              Online Weight Loss Clinic provides clinician-led weight loss
              treatments in the UK using MHRA approved medications. All
              consultations are conducted by qualified healthcare professionals
              to ensure safe, personalised care.
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
              {[
                { label: "Weight Loss Treatments", href: "/weight-loss" },
                { label: "About Us", href: "/about-clinic" },
                { label: "Contact Us", href: "/contact-us" },
                { label: "Guide", href: "/guide" },
                { label: "FAQs", href: "/frequently-asked-questions" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
              {[
                { label: "Shipping", href: "/shipping-policy" },
                { label: "Refunds & Returns", href: "/refunds-returns" },
                {
                  label: "Off-Label Prescribing",
                  href: "/off-label-prescribing",
                },
                { label: "Complaints", href: "/complaints" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
                { label: "Privacy Policy", href: "/privacy-policy" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
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
                  href="tel:+442081782178"
                  className="text-gray-600 hover:text-teal-600"
                >
                  +44 (0)208 178 2178
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={15} className="text-teal-600 mt-0.5 shrink-0" />
                <a
                  href="mailto:contact@onlineweightlossclinic.co.uk"
                  className="text-gray-600 hover:text-teal-600 break-all"
                >
                  contact@onlineweightlossclinic.co.uk
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-teal-600 mt-0.5 shrink-0" />
                <address className="not-italic text-gray-600">
                  Online Weight Loss Clinic
                  <br />
                  2 Raven Road
                  <br />
                  London, E18 1HB
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* rest of code unchanged */}
        <div className="border-t border-gray-200 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Image
            src="/Images/footer-payment.png"
            alt="Payment Methods"
            width={200}
            height={150}
          />
          <NextButton
            label="Join Our Newsletter"
            onClick={() => setOpen(true)}
          />
        </div>

        <NewsletterModal open={open} setOpen={setOpen} />
      </div>

      {/* ── PHARMACY TRUST BAR ── */}
      <div className="bg-white border-t border-gray-200">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* GPhC Badge + pharmacy name */}
            <div className="flex items-center gap-4">
              <Image
                src="/Images/registered.png"
                width={70}
                height={70}
                alt="GPhC Registered"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900 footer-bottom-size">
                  Primed Pharmacy
                </p>
                <p className="text-xs text-gray-500 footer-bottom-size">
                  GPhC Registration:{" "}
                  <a
                    href="https://www.pharmacyregulation.org/registers/pharmacy/registrationnumber/1039469"
                    className="text-teal-600 hover:underline footer-bottom-size"
                    target="_blank"
                  >
                    1039469
                  </a>
                </p>
                <p className="text-xs text-gray-500 mt-0.5 footer-bottom-size">
                  Prescriber: Dr. Mihaela Coman — GMC No.{" "}
                  <a
                    href="https://www.gmc-uk.org/registrants/7099398"
                    className="text-teal-600 hover:underline"
                    target="_blank"
                  >
                    7099398
                  </a>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-gray-200"></div>

            {/* Description */}
            <p className="text-xs text-gray-500 max-w-md text-center md:text-left leading-relaxed footer-bottom-size">
              Primed Pharmacy is our partner pharmacy. All dispensing and
              shipping of medicines is completed by Primed Pharmacy a UK
              licensed, General Pharmaceutical Council registered Pharmacy.
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
            © 2026 The Online Weight Loss Clinic. All Rights Reserved
          </p>
          <p className="text-center sm:text-right footer-bottom-size">
            All consultations and prescribing is carried out by UK registered
            healthcare professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}
