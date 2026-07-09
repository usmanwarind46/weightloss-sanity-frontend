"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How are you the most affordable?",
    answer:
      "We aim to make prescription weight loss treatment more accessible by offering competitive prices without compromising on clinical care. Every order includes an online consultation, review by a qualified UK clinician and genuine prescription medication supplied through our UK partner pharmacy. This allows you to receive safe, clinician-led treatment at an affordable price.",
  },
  {
    question: "Is a lower price a sign of lower quality?",
    answer:
      "No. Our lower prices do not reflect lower quality. Every prescription is reviewed by a qualified UK clinician, and all medication is dispensed and shipped by our partner pharmacy, Primed Pharmacy, a UK licensed and General Pharmaceutical Council (GPhC) registered pharmacy.",
  },
  {
    question: "Can I cancel at any time?",
    answer:
      "You can cancel your order for a full refund before your medication has been dispensed. Once your medication has been dispensed, changes or cancellations may no longer be possible. After it has been dispatched, your order cannot be cancelled or refunded because prescription medicines cannot be supplied to another patient.",
  },
  {
    question: "What's included in the price?",
    answer:
      "Your order includes an online clinical assessment, review by a qualified UK clinician and, if approved, your prescription medication. You also receive clinical guidance on using your treatment safely, with ongoing support throughout your weight loss journey.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "We aim to approve and dispatch your order within 1 working day, often on the same day, once your online consultation has been reviewed. Orders are sent using a tracked next-day delivery service (or a two-day tracked service for Northern Ireland and the Channel Islands). While most orders are delivered within 48 hours of dispatch, occasional delays may occur that are outside our control.",
  },
  {
    question: "Is this a medical service?",
    answer:
      "Yes. Online Weight Loss Clinic provides a clinician-led prescribing service. Every consultation is individually reviewed by a qualified UK clinician to ensure treatment is safe and appropriate before a prescription is issued.",
  },
  {
    question: "Is treatment approval guaranteed?",
    answer:
      "No. Approval is not guaranteed. Every consultation is assessed on an individual basis by one of our clinicians. Treatment is only approved if it is considered clinically appropriate and suitable for your medical history and circumstances.",
  },
  {
    question: "Can I buy medication without a prescription?",
    answer:
      "No. Weight loss medications supplied by Online Weight Loss Clinic are prescription-only medicines. You must complete an online consultation, which will be reviewed by one of our qualified clinicians before any medication can be dispensed.",
  },
  {
    question: "What happens during the online consultation?",
    answer:
      "During your online consultation, you'll answer questions about your health, medical history and weight loss goals. A qualified UK clinician will review your information to determine whether treatment is clinically appropriate before approving a prescription, if suitable.",
  },
  {
    question: "Where does my weight loss medication come from?",
    answer:
      "All medication is dispensed and shipped by Primed Pharmacy, our UK licensed and GPhC-registered partner pharmacy. This helps ensure you receive genuine prescription medication supplied through a regulated UK pharmacy.",
  },
  {
    question:
      "What happens if my prescription is not approved after making payment?",
    answer:
      "If, following your clinical assessment, the clinician decides that treatment is not suitable for you, your medication will not be supplied. In these circumstances, your payment will be refunded in accordance with our policies.",
  },
  {
    question: "How is my order delivered?",
    answer:
      "Your order is securely packaged and delivered to your chosen address using a tracked delivery service. Once dispatched, you'll receive tracking details by email, allowing you to monitor your delivery and know when your medication is due to arrive.",
  },
  {
    question: "What is your refund policy?",
    answer: (
      <>
        If you decide to cancel before your medication has been dispensed, you
        may be eligible for a refund. Once a prescription medicine has been
        dispensed and labelled specifically for you, it cannot be returned or
        refunded. Exceptions may apply if your order is covered under our{" "}
        <a
          href="https://www.onlineweightlossclinic.co.uk/refunds-returns"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-600 underline hover:text-teal-800"
        >
          Refunds & Returns Policy
        </a>
        , such as when you receive a damaged or incorrect product.
      </>
    ),
  },
  {
    question: "What if I'm not home when my order is delivered?",
    answer:
      "If you're unavailable when delivery is attempted, the courier will follow their standard delivery procedures. If your order is returned to us because no one was available to receive it or an incorrect delivery address was provided, you will not be eligible for a refund or replacement. If you need delivery on a specific day, please let us know before your order is dispatched.",
  },
  {
    question: "What if I receive a damaged or faulty product?",
    answer: (
      <>
        If your injection pen or device is damaged or faulty, please email{" "}
        <a
          href="mailto:contact@onlineweightlossclinic.co.uk"
          className="text-teal-600 underline hover:text-teal-800"
        >
          contact@onlineweightlossclinic.co.uk
        </a>{" "}
        within 24–48 hours of discovering the issue and no later than 45 days
        after receiving your order. If the manufacturer confirms the fault, a
        replacement, refund or partial refund will be provided. Please note that
        the investigation can take up to 6 weeks, and you may need to place
        another order to avoid a gap in your treatment.
      </>
    ),
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
        <div className="max-w-4xl mx-auto">
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
      </div>
    </section>
  );
}
