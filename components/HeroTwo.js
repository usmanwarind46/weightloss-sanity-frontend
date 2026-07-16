"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import NextButton from "./ui/NextButton";

const slides = [
  {
    id: 1,
    type: "woman",
    src: "/images/hero-three.png",
    alt: "Weight loss treatment product with model",
  },
  {
    id: 2,
    type: "graph",
  },
];

export function HeroTwo({ ctaLink = "/weight-loss-treatments" }) {
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const activeSlide = slides[current];

  // useEffect(() => {
  //   const timer = window.setInterval(() => {
  //     setCurrent((previous) => (previous + 1) % slides.length);
  //   }, 4500);

  //   return () => window.clearInterval(timer);
  // }, []);

  const handleTreatmentClick = () => {
    window.location.href = ctaLink;
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#f3faf7]">
      {/* Static background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/images/hero-background.jpg"
          fill
          priority
          sizes="100vw"
          alt=""
          className="object-cover object-center"
        />
      </div>

      {/* Background overlay */}
      <div
        className="
          pointer-events-none absolute inset-0 -z-10
          bg-[linear-gradient(105deg,rgba(247,252,249,0.78)_0%,rgba(242,248,255,0.55)_55%,rgba(239,250,245,0.3)_100%)]
        "
      />

      <div
        className="
          container relative mx-auto grid w-full
          grid-cols-1 items-center
          pb-10 pt-10

          sm:pb-12 sm:pt-12

          lg:h-[clamp(480px,calc(100svh-143px),550px)]
          lg:grid-cols-[41%_59%]
          lg:py-0

          xl:h-[clamp(500px,calc(100svh-143px),570px)]
          xl:grid-cols-[42%_58%]

          2xl:h-[clamp(520px,calc(100svh-143px),590px)]
        "
      >
        {/* Left content */}
        <div
          className="
            contents

            lg:relative
            lg:z-30
            lg:mx-0
            lg:flex
            lg:w-full
            lg:max-w-[520px]
            lg:flex-col
            lg:items-start
            lg:pr-5
            lg:text-left

            xl:pr-7
          "
        >
          {/* Heading — mobile order 1 */}
          <h1
            className="
              order-1
              m-0
              mx-auto
              w-full
              max-w-[520px]
              text-center
              text-[34px]
              font-semibold
              leading-[1.15]
              tracking-[-0.045em]
              text-[#171b25]

              min-[400px]:text-[38px]

              sm:text-[44px]

              md:text-[48px]

              lg:order-none
              lg:mx-0
              lg:text-left
              lg:text-[36px]

              xl:text-[45px]

              2xl:text-[60px]
            "
          >
            <span className="block">Affordable</span>

            <span className="block">
              <span className="text-[#49b984]">Weight Loss,</span> Best
            </span>

            <span className="block">Price Guaranteed</span>
          </h1>

          {/* Card and button — mobile order 3 */}
          <div
            className="
              order-3
              mx-auto
              mt-5
              flex
              w-full
              max-w-[420px]
              flex-col
              items-center

              lg:order-none
              lg:mx-0
              lg:mt-8
              lg:items-start

              xl:mt-9
            "
          >
            {/* Price Match Card */}
            <div
              className="
                w-full
                rounded-[13px]
                border
                border-[#4565bf]/40
                bg-white/60
                px-4
                py-4
                shadow-[0_14px_36px_rgba(52,79,120,0.06)]
                backdrop-blur-[5px]

                sm:px-5
                sm:py-[18px]
              "
            >
              <div className="flex items-start gap-3.5 text-left">
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#4565bf]/25
                    bg-white/90
                    text-[#4565bf]

                    sm:h-[44px]
                    sm:w-[44px]
                  "
                >
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>

                <div className="min-w-0 pt-0.5">
                  <p className="m-0 text-[14px] font-bold leading-5 text-[#2c303a] sm:text-[15px]">
                    Price Match{" "}
                    <span className="text-[#49b984]">Guarantee</span>
                  </p>

                  <p className="mb-0 mt-1.5 text-[10px] leading-[1.6] text-[#69707d] sm:text-[12px]">
                    Found the same treatment cheaper at another weight loss
                    clinic? We will refund the difference.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex w-full justify-center pt-4 lg:justify-start lg:pt-5">
              <NextButton
                label="View Treatments"
                onClick={handleTreatmentClick}
              />
            </div>
          </div>
        </div>

        {/* Slider — mobile order 2 */}
        <div
          className="
            order-2
            relative
            z-20
            mt-5
            h-[300px]
            w-full
            min-w-0

            min-[390px]:h-[340px]

            sm:mt-7
            sm:h-[420px]

            md:h-[460px]

            lg:order-none
            lg:mt-0
            lg:h-full
          "
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeSlide.id}
              initial={
                reduceMotion
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 1.035,
                      y: 14,
                      filter: "blur(9px)",
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={
                reduceMotion
                  ? {
                      opacity: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0.975,
                      y: -10,
                      filter: "blur(8px)",
                    }
              }
              transition={{
                opacity: {
                  duration: reduceMotion ? 0 : 0.42,
                  ease: "easeInOut",
                },
                scale: {
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
                y: {
                  duration: reduceMotion ? 0 : 0.55,
                  ease: [0.22, 1, 0.36, 1],
                },
                filter: {
                  duration: reduceMotion ? 0 : 0.4,
                  ease: "easeInOut",
                },
              }}
              className="
                absolute inset-0
                transform-gpu
                will-change-[opacity,transform,filter]
              "
            >
              {activeSlide.type === "woman" ? (
                <WomanSlide slide={activeSlide} />
              ) : (
                <GraphSlide />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function WomanSlide({ slide }) {
  return (
    <div className="relative h-full w-full">
      <div
        className="
          absolute inset-0
          px-1 py-2

          min-[390px]:px-3

          sm:px-6
          sm:py-3

          lg:inset-y-[3%]
          lg:left-[1%]
          lg:right-[1%]
          lg:p-0

          xl:left-[2%]
          xl:right-[2%]
        "
      >
        <Image
          src={slide.src}
          fill
          priority
          sizes="
            (max-width:639px) 100vw,
            (max-width:1023px) 90vw,
            58vw
          "
          alt={slide.alt}
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}

function GraphSlide() {
  return (
    <div className="relative h-full w-full">
      {/* Mobile layout */}
      <div className="relative mx-auto h-full w-full max-w-[560px] lg:hidden">
        {/* Product and badge */}
        <div
          className="
            absolute
            bottom-[18%]
            left-[-1%]
            h-[80%]
            w-[59%]

            min-[375px]:left-[-8%]

            min-[390px]:left-[-2%]
            min-[390px]:h-[86%]
            min-[390px]:w-[57%]

            sm:left-[3%]
            sm:h-[90%]
            sm:w-[54%]
          "
        >
          <Image
            src="/images/hero-badge.png"
            fill
            priority
            sizes="58vw"
            alt="Product box with price match guarantee badge"
            className="object-contain object-bottom"
          />
        </div>

        {/* Graph */}
        <div
          className="
            absolute
            right-[1%]
            top-[8%]
            w-[57%]
            overflow-hidden
            rounded-[10px]
            bg-white/95
            shadow-[0_12px_32px_rgba(55,78,117,0.12)]
            ring-1
            ring-[#dce7f6]

            min-[390px]:right-[2%]
            min-[390px]:w-[55%]

            sm:right-[5%]
            sm:top-[10%]
            sm:w-[48%]
            sm:rounded-[14px]
          "
        >
          <Image
            src="/images/hero-graph.png"
            width={800}
            height={500}
            priority
            alt="Weight loss graph showing 25 pounds lost"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Description */}
        <div
          className="
            absolute
            right-[1%]
            top-[59%]
            w-[51%]
            pl-2.5

            min-[390px]:right-[2%]
            min-[390px]:w-[49%]
            min-[390px]:pl-3

            sm:right-[6%]
            sm:top-[61%]
            sm:w-[43%]
            sm:pl-4
          "
        >
          <span className="absolute inset-y-0 left-0 w-px rounded-full bg-[#4565bf]" />

          <p
            className="
              reg-font
              m-0
              text-[7px]
              leading-[1.55]
              text-[#69707d]

              min-[390px]:text-[8px]

              sm:text-[10px]
              sm:leading-[1.7]
            "
          >
            Expert-led treatment for safe and steady weight loss. Complete a
            quick assessment and get clinician-approved guidance.
          </p>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="relative mx-auto hidden h-full w-full max-w-[790px] lg:block">
        {/* Product and badge */}
        <div
          className="
            absolute
            left-[2%]
            top-[3%]
            h-[91%]
            w-[54%]

            xl:left-[8%]
            xl:top-[2%]
            xl:h-[92%]
            xl:w-[53%]

            2xl:left-[10%]
            2xl:w-[52%]
          "
        >
          <Image
            src="/images/hero-badge.png"
            fill
            priority
            sizes="32vw"
            alt="Product box with price match guarantee badge"
            className="object-contain object-center"
          />
        </div>

        {/* Graph */}
        <div
          className="
            absolute
            right-[5%]
            top-[16%]
            w-[20%]
            overflow-hidden
            rounded-[15px]
            bg-white/95
            shadow-[0_16px_42px_rgba(55,78,117,0.13)]
            ring-1
            ring-[#dce7f6]

            xl:right-[6%]
            xl:top-[15%]
            xl:w-[39%]

            2xl:right-[7%]
            2xl:w-[38%]
          "
        >
          <Image
            src="/images/hero-graph.png"
            width={800}
            height={500}
            priority
            alt="Weight loss graph showing 25 pounds lost"
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Description */}
        <div
          className="
            absolute
            right-[6%]
            top-[61%]
            w-[37%]
            pl-5

            xl:right-[7%]
            xl:top-[60%]
            xl:w-[36%]

            2xl:right-[8%]
            2xl:w-[35%]
          "
        >
          <span className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-[#4565bf]" />

          <p
            className="
              reg-font
              m-0
              text-[12px]
              leading-[1.7]
              text-[#69707d]

              xl:text-[12px]

              2xl:text-[13px]
              2xl:leading-[1.8]
            "
          >
            Expert-led treatment for safe and steady weight loss. Complete a
            quick assessment and get clinician-approved guidance.
          </p>
        </div>
      </div>
    </div>
  );
}
