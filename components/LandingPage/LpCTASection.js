import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LpCTASection() {
  return (
    <section className="w-full container mx-auto py-8 reg-font">
      <div className="rounded-3xl overflow-hidden bg-[#E0EDFF]">
        {/* 6+6 Grid — text left, image right */}
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[280px]">
          {/* Left col — Content */}
          <div className="flex flex-col justify-center px-8 sm:px-10 py-10">
            <h1 className="subHeading font-extrabold text-[#1a2240] leading-[1.2]  tracking-tight">
              Begin your medical
              <br />
              weight management
              <br />
              consultation
            </h1>

            <p className="subDescription max-w-md my-4 sm:my-8">
              Professional clinical service. Transparent pricing. No long-term
              commitment required.
            </p>

            <Link href="/start-consultation/">
              <button className="next-btn">
                Start Free Medical Assessment
                <span className="next-btn-arrow">
                  <ChevronRight />
                </span>
              </button>
            </Link>
          </div>

          {/* Right col — Image */}
          <div className="relative min-h-[220px] md:min-h-[280px] overflow-hidden">
            <Image
              src="/Lp-images/BeginYourMedical-right-img.png"
              alt="Two women in workout clothes"
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        {/* Blue Footer Bar */}
        <div
          style={{
            backgroundImage: "url('/Lp-images/save-bg.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="text-white px-4 sm:px-6 py-4 sm:py-5 flex flex-col items-center justify-center gap-2 mx-4 mb-4 rounded-2xl"
        >
          {/* Row 1 — Price */}
          <p className="text-base sm:text-3xl reg-font tracking-wide text-center">
            Starting from{" "}
            <span className="med-font text-base sm:text-3xl">£149/month</span>
          </p>

          {/* Row 2 — Perks */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-start sm:items-center gap-y-1.5 gap-x-6 text-sm sm:text-lg reg-font text-white w-full sm:w-auto">
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3dbf82] shrink-0">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5l2.5 2.5L8 3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Clinical consultation included
            </span>
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3dbf82] shrink-0">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5l2.5 2.5L8 3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Free delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#3dbf82] shrink-0">
                <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2 5l2.5 2.5L8 3"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LpCTASection;
