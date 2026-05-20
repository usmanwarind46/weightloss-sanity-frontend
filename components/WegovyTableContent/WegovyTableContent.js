"use client";

import React, { useEffect, useRef, useState } from "react";

const WegovyTableContent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [activeId, setActiveId] = useState("");

  const observerRef = useRef(null);

  const sections = data?.tabs || [];

  useEffect(() => {
    if (!sections.length) return;

    if (!activeId) {
      setActiveId(sections[0]?.id);
    }

    const handleIntersect = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.2,
    });

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);

      if (el) {
        observerRef.current.observe(el);
      }
    });

    return () => observerRef.current?.disconnect();
  }, [sections]);

  const handleClick = (id) => {
    const el = document.getElementById(id);

    if (!el) return;

    setActiveId(id);

    observerRef.current?.disconnect();

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    setTimeout(() => {
      sections.forEach(({ id: secId }) => {
        const elem = document.getElementById(secId);

        if (elem) {
          observerRef.current?.observe(elem);
        }
      });
    }, 1500);
  };

  return (
    <section className="mt-2 py-7 sm:py-15  bg-white rounded">
      <div className="mx-auto container">
        <div className="flex flex-col md:flex-row gap-6">
          <div
            className={`flex flex-col gap-2 self-start flex-1 w-full md:sticky md:top-32 ${isOpen ? "sticky top-0 z-50" : ""}`}
          >
            <div className="flex flex-col w-full border border-gray-300 rounded-tl-lg rounded-tr-lg overflow-hidden">
              {/* Header - always visible */}
              <div className="bg-[#c7d9f5] py-4 px-4 w-full flex items-center justify-between">
                <h3 className="text-[#1a2e4a] text-xl font-semibold">
                  Table of Content
                </h3>
                {/* Hamburger button - only on mobile */}
                <button
                  className="md:hidden flex flex-col gap-1.5 p-1"
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-label="Toggle Table of Contents"
                >
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
                  />
                  <span
                    className={`block w-5 h-0.5 bg-[#1a2e4a] transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                  />
                </button>
              </div>

              {/* TABS */}
              <ul
                className={`flex flex-col md:flex ${isOpen ? "flex" : "hidden"}`}
              >
                {sections.map(({ id, label }) => {
                  const isActive = activeId === id;
                  return (
                    <li key={id}>
                      <button
                        onClick={() => {
                          handleClick(id);
                          setIsOpen(false); // close on mobile after click
                        }}
                        className={`w-full text-left px-4 py-3 text-lg border-b border-gray-200 transition-all duration-200 cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis block
                ${
                  isActive
                    ? "bg-[#d4f0e8] text-[#1a3c30] med-font"
                    : "bg-white text-[#333] hover:bg-gray-50 reg-font"
                }`}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-5 items-start flex-[1.8]">
            {sections.map((section, index) => (
              <div
                key={section.id || index}
                id={section.id}
                className={`w-full flex flex-col gap-5 ${
                  index === sections.length - 1
                    ? "pb-5"
                    : "border-b border-gray-300 pb-5"
                } px-1 scroll-mt-34`}
              >
                {/* HEADING */}
                <div className="bg-blue-200 p-2 rounded-md">
                  <h2 className="text-xl sm:text-3xl font-bold text-black text-center">
                    {section.label}
                  </h2>
                </div>

                {/* SANITY HTML */}
                <div
                  className="mounjaro-content"
                  dangerouslySetInnerHTML={{
                    __html: section.htmlContent || "",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WegovyTableContent;
