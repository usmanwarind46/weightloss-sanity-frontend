"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const GRADIENT = "linear-gradient(135deg, #76c8a1, #4b6bc1)";
const BORDER_DEFAULT = "#e5e7eb"; // gray-200

export function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const faqs = data?.faqs || [];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            dangerouslySetInnerHTML={{
              __html: data?.headingHtml,
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          />

          <p className="text-xl text-gray-600">{data?.subheading}</p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  padding: "1px",
                  borderRadius: "1rem",
                  background:
                    isHovered || isOpen
                      ? "linear-gradient(135deg, #76c8a1, #4b6bc1)"
                      : "#e5e7eb",
                }}
              >
                <div
                  className={`rounded-2xl overflow-hidden ${
                    isOpen ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-gray-900 pr-8">
                      {faq.question}
                    </span>

                    <ChevronDown
                      className={`${
                        isOpen ? "rotate-180" : ""
                      } transition-transform`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-gray-600 para-font">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
