"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How are you the most affordable?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "Is lower price lower quality?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "What's included in the price?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    question: "How long is delivery?",
    answer:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const GRADIENT = "#4DB581";
const BORDER_DEFAULT = "#e5e7eb"; // gray-200

export function LpFAQSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-8 md:py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-6 md:mb-16">
          <h2 className="font-bold text-gray-900 title">
            Frequently Asked <span>Questions</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const isHovered = hoveredIndex === index;

            return (
              // Outer wrapper acts as the gradient border
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  padding: "1px",
                  borderRadius: "1rem",
                  background: isHovered || isOpen ? GRADIENT : BORDER_DEFAULT,
                  transition: "background 0.3s ease",
                }}
              >
                {/* Inner card */}
                <div
                  className={`rounded-2xl overflow-hidden transition-colors duration-300 ${
                    isOpen ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  {/* Trigger */}
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
                  >
                    <span className="font-semibold text-gray-900 pr-8 lp-faq-heading">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown
                        size={20}
                        className={`transition-colors duration-300 ${
                          isOpen ? "text-gray-900" : "text-gray-400"
                        }`}
                      />
                    </motion.div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed lp-faq-answer">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
