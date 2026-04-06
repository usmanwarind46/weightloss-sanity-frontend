import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const pricingItems = [
  {
    id: 1,
    icon: "/Lp-images/icon/Clinical-assessment-icon.png",
    title: "Clinical Assessment Included",
    price: "£0",
    body: "UK prescriber reviews your health profile and determines treatment suitability.",
  },
  {
    id: 2,
    icon: "/Lp-images/icon/injection-icon.png",
    title: "Treatment From",
    price: "£149/month",
    body: "The price you see includes consultation review, medication (if approved), and delivery. No surprise charges for 'express processing,' 'premium support,' or other add-ons you didn't request.",
  },
  {
    id: 3,
    icon: "/Lp-images/icon/delivery-icon.png",
    title: "Delivery Included",
    price: "£0",
    body: "Your medication is dispatched discreetly and delivered directly to your door. No additional delivery charges, no hidden logistics fees.",
  },
  {
    id: 4,
    icon: "/Lp-images/icon/ongoing-icon.png",
    title: "Ongoing Support Included",
    price: "£0",
    body: "Access to clinical support throughout your treatment journey. Our team is available to answer questions, address concerns, and guide you every step of the way.",
  },
];

export default function StartMyJourney() {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggle = (i) => setActiveIndex(activeIndex === i ? null : i);

  return (
    <section
      className="w-full pt-8 sm:pt-20 px-4"
      style={{ backgroundColor: "#E4F1F3" }}
    >
      <div className="container mx-auto">
        {/* Mobile only — heading on top */}
        <div className="lg:hidden flex flex-col gap-5 mb-6">
          <h2 className="subHeading font-semibold text-gray-900 leading-tight everyThingBr">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
          <p className="subDescription max-w-md">
            Clinical excellence at the UK's lowest prices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* LEFT col — desktop: heading + image | mobile: image only (order-3 = last) */}
          <div className="flex flex-col gap-5 order-3 lg:order-1">
            {/* Desktop only heading */}
            <div className="hidden lg:flex flex-col gap-5">
              <h2 className="subHeading font-semibold text-gray-900 leading-tight everyThingBr">
                Everything you need.
                <br />
                Nothing you don't.
              </h2>
              <p className="subDescription max-w-md">
                Clinical excellence at the UK's lowest prices.
              </p>
            </div>

            <div className="relative mt-0 lg:mt-4">
              <img
                src="/Lp-images/everything-left-img.png"
                alt="Doctor consultation"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentNode.style.display = "flex";
                  e.target.parentNode.style.alignItems = "center";
                  e.target.parentNode.style.justifyContent = "center";
                }}
              />
            </div>
          </div>

          {/* RIGHT col — accordion (order-1 = first on mobile, after heading) */}
          <div className="flex flex-col gap-4 order-1 lg:order-2">
            {pricingItems.map((item, i) => {
              const isOpen = activeIndex === i;
              return (
                <div
                  key={item.id}
                  onClick={() => toggle(i)}
                  className={`bg-white rounded-2xl px-5 py-4 flex gap-4 cursor-pointer transition-all duration-300 ${
                    isOpen
                      ? "shadow-sm items-start"
                      : "items-center hover:shadow-md hover:-translate-y-0.5"
                  }`}
                >
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: "#f0faf7" }}
                  >
                    <img
                      src={item.icon}
                      alt="icon"
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className="Everything_you_need_accordian_heading
reg-font text-gray-900 text-black"
                      >
                        {item.title}{" "}
                        {item.price && (
                          <span
                            style={{ color: "#4DB581" }}
                            className="bold-font"
                          >
                            - {item.price}
                          </span>
                        )}
                      </h3>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        style={{ color: "#585858" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen
                          ? "max-h-48 opacity-100 mt-2"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="subDescription !text-[#585858] mb-3">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center">
              <p className="text-center subDescription !text-[#585858] mt-2 max-w-[450px]">
                Optional lifestyle coaching available separately. Not mandatory.
              </p>
            </div>
            <div className="flex justify-center">
              <Link href="/start-consultation/">
                <button className="next-btn">
                  Start Your Consultation
                  <span className="next-btn-arrow">
                    <ChevronRight />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
