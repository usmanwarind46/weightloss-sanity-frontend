"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeUp, StaggerContainer, StaggerItem } from "../MotionWrapper";
import NextButton from "../ui/NextButton";

const steps = [
  {
    number: "1",
    title: "Clinical medical assessment",
    description: "Complete online health questionnaire (10 minutes)",
    image: "/Images/home-page-2.png",
  },
  {
    number: "2",
    title: "Personalised treatment plan",
    description: "UK prescriber reviews within 24 hours",
    image: "/Images/home-page-1.png",
  },
  {
    number: "3",
    title: "UK-regulated private clinic",
    description: "Discreet delivery in 1–2 days",
    image: "/Lp-images/wegovy-injection.png",
  },
];

export function LpHowItWorks() {
  return (
    <section id="how-it-works" className="py-10 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <FadeUp>
          <div className="text-center mb-10 md:mb-16">
            <h2 className="subHeading font-bold text-gray-900">
              Doctor-led weight loss, tailored to you
            </h2>
          </div>
        </FadeUp>

        {/* Cards */}
        <StaggerContainer className="grid md:grid-cols-3 gap-2 mb-12">
          {steps.map((step, index) => (
            <StaggerItem
              key={index}
              hover
              className="h-full rounded-3xl flex flex-col items-center justify-center text-center gap-4 "
            >
              <div
                className={`bg-[#F8F8F8] rounded-3xl flex flex-col justify-between text-center h-[660px] pt-8 overflow-hidden lp-tailored-column`}
              >
                <div className="p-8">
                  {/* Step Number */}
                  <div className="flex justify-center">
                    <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center mb-4">
                      <span className="text-gray-900 font-semibold">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex justify-center">
                    <h2 className="text-gray-700 min-h-[48px] lp-card-heading text-center mb-2 max-w-62 text-center">
                      {step.title}
                    </h2>
                  </div>
                  <p className="text-gray-700 mb-6 min-h-[48px] text-[15px] reg-font text-center lp-card-desc">
                    {step.description}
                  </p>
                </div>

                {/* Image */}
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={step.image}
                    alt={`Step ${step.number}`}
                    className={`w-full h-auto object-contain how-it-work-${index}`}
                  />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Footer */}
        <FadeUp delay={0.2}>
          <div className="text-center">
            <p className="text-gray-600 mb-6 text-lg md:text-xl">
              GPhC and MHRA registered Pharmacy with a UK clinical team
            </p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
              {/* ICO Badge */}
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline gap-0.5">
                    <Image
                      src="/Images/ico.png"
                      alt="ICO Badge"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div>
                  <Image
                    src="/Images/gphc.png"
                    alt="GPhC Badge"
                    width={100}
                    height={100}
                  />
                </div>
              </div>

              <div className="flex flex-col items-start">
                <Image
                  src="/Images/mhra.png"
                  alt="mhra Badge"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
