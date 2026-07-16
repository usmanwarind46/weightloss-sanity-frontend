import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    content: (
      <div className="relative w-full h-full flex items-center justify-end">
        {/* Slide 1 — puri ek image */}
        <Image
          src="/images/hero-three.png"
          fill
          alt="Price match guarantee with weight loss result"
          className="object-contain"
          priority
        />

        {/* See All Treatments Button */}
        <Link
          href="/weight-loss-treatments"
          className="absolute top-17 right-6 z-20 flex items-center gap-2 bg-[#4565BF] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
        >
          See All Treatments
          <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs">
            ↗
          </span>
        </Link>
      </div>
    ),
  },
  {
    id: 2,
    content: (
      <div className="relative w-full h-full">
        {/* Badge + Box image */}
        <div className="absolute left-[-23px] bottom-0 w-[55%] h-full">
          <Image
            src="/images/hero-badge.png"
            fill
            alt="Product box with price match badge"
            className="object-contain object-bottom"
          />
        </div>

        {/* Graph card */}
        <div className="absolute top-8 right-21 w-[42%] bg-white rounded-2xl shadow-lg overflow-hidden">
          <Image
            src="/images/hero-graph.png"
            width={320}
            height={160}
            alt="Weight loss graph showing 25 lbs lost"
            className="w-full object-contain"
          />
        </div>

        {/* Description + Button */}
        <div className="absolute bottom-16 right-0 max-w-[52%]">
          <p className="text-md text-gray-600 mb-6 leading-relaxed">
            Expert-led treatment for safe and steady weight loss. Complete a
            quick assessment and get clinician approved guidance.
          </p>
          <Link
            href="/weight-loss-treatments"
            className="flex items-center gap-2 bg-[#4565BF] text-white px-4 py-2 rounded-full text-sm font-semibold w-fit shadow-md"
          >
            See All Treatments
            <span className="bg-white/20 rounded-full w-6 h-6 flex items-center justify-center text-xs">
              ↗
            </span>
          </Link>
        </div>
      </div>
    ),
  },
];

export function HeroTwo({ data }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #f0faf4 0%, #eef4ff 100%)",
        minHeight: "520px",
      }}
    >
      <div className="container mx-auto px-6 py-12 grid grid-cols-5 gap-8 items-center min-h-[520px]">
        {/* ── LEFT SIDE — static ── */}
        <div className="col-span-2 flex flex-col gap-6">
          <h1 className="text-4xl md:text-6xl lg:text-6xl semibold-font text-gray-900 leading-tight">
            Affordable <span className="text-[#4DB581]">Weight Loss,</span> Best
            <br />
            Price Guaranteed
          </h1>

          {/* Price Match Card */}
          <div className="border border-[#4565BF]/30 rounded-2xl p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#4565BF]/10 rounded-full flex items-center justify-center shrink-0">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#4565BF"
                  strokeWidth="2"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">
                  Price Match <span className="text-[#4DB581]">Guarantee</span>
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Found the same treatment cheaper at another weight loss
                  clinic? We will refund the difference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDE — sliding ── */}
        <div className="col-span-3 relative h-[520px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {slides[current].content}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === current ? "bg-[#4565BF] w-5" : "bg-gray-300 w-2"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
