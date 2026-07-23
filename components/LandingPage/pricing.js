"use client";

import {
  BadgeCheck,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  Truck,
} from "lucide-react";
import Link from "next/link";

const trustPoints = [
  {
    title: "UK based clinical team",
    Icon: Stethoscope,
  },
  {
    title: "GPhC registered pharmacy",
    Icon: BadgeCheck,
  },
  {
    title: "Quick and discreet delivery",
    Icon: Truck,
  },
  {
    title: "MHRA licensed treatments",
    Icon: ShieldCheck,
  },
  {
    title: "Lowest prices in the UK",
    Icon: null,
    isPrice: true,
  },
];

export default function PricingComparison() {
  return (
    <section className="relative overflow-hidden bg-[#E4F1F3] py-16 sm:py-20 lg:py-24">
      {/* Soft background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#1f9e8c]/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#0c3a4a]/8 blur-[110px]"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="title reg-font">
            Lowest prices guaranteed in the <span>UK.</span>
          </h2>

          <p className="subDescription reg-font mx-auto max-w-xl text-center text-[#173f4c] sm:text-lg">
            Or we will refund the difference.
          </p>
        </div>

        {/* Main content */}
        <div className="relative mx-auto mt-10 max-w-4xl overflow-hidden rounded-[30px] bg-white shadow-[0_25px_75px_rgba(12,58,74,0.09)] sm:mt-12 sm:rounded-[36px]">
          {/* Blue and green gradient accent */}
          <div
            aria-hidden="true"
            className="h-[5px] w-full bg-gradient-to-r from-[#0c3a4a] via-[#178696] to-[#45b88c]"
          />

          {/* Subtle card glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-[#1f9e8c]/5 blur-[70px]"
          />

          <div className="relative px-6 py-10 sm:px-10 sm:py-12 lg:px-16 lg:py-14">
            <ul className="mx-auto grid max-w-3xl grid-cols-1 gap-x-16 gap-y-7 sm:grid-cols-2 sm:gap-y-9">
              {trustPoints.map(({ title, Icon, isPrice }, index) => (
                <li
                  key={title}
                  className={`group flex items-center gap-4 transition-transform duration-300 hover:translate-x-1 ${
                    index === trustPoints.length - 1
                      ? "sm:col-span-2 sm:justify-left"
                      : ""
                  }`}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#edf9f7] to-[#e3f4f0] text-[#1f9e8c] shadow-[0_8px_24px_rgba(31,158,140,0.10)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[#1f9e8c] group-hover:text-[#1f9e8c] group-hover:shadow-[0_12px_28px_rgba(31,158,140,0.20)] sm:h-13 sm:w-13">
                    {isPrice ? (
                      <span
                        aria-hidden="true"
                        className="med-font text-xl font-semibold leading-none"
                      >
                        £
                      </span>
                    ) : (
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.9}
                        className="h-6 w-6"
                      />
                    )}
                  </span>

                  <span className="reg-font text-base font-medium leading-snug text-[#173f4c] sm:text-lg">
                    {title}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10 flex justify-center sm:mt-12">
              <Link href="/weight-loss-treatments" className="next-btn group">
                Start Your Consultation
                <span className="next-btn-arrow">
                  <ChevronRight
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
