"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NextButton from "./ui/NextButton";
import { motion, AnimatePresence } from "framer-motion";

export function Header({ data }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();

  // ✅ CMS DATA
  const navLinks = data?.navLinks || [];
  const logoUrl = data?.logo?.asset?.url;
  const topBarText = data?.topBarText;
  const topBarRightText = data?.topBarRightText;
  const ctaLabel = data?.ctaLabel || "Patient Login";
  const ctaLink = data?.ctaLink || "/start-consultation/login/";

  // ✅ Keep your business logic
  const dynamicCtaLabel =
    pathname === "/discounted-llp/" ? "Start my Journey" : ctaLabel;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`bg-white z-50 sticky top-0 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-none"
      }`}
    >
      {/* ───────── TOP BAR ───────── */}
      <div className="w-full bg-white/30 border-b border-gray-100 overflow-hidden">
        <div
          className="h-1 w-full"
          style={{
            height: "5px",
            width: "200%",
            background:
              "linear-gradient(to right, #76c8a1, #4b6bc1, #76c8a1, #4b6bc1)",
            animation: "gradientSlide 3s linear infinite",
          }}
        />

        <style>{`
          @keyframes gradientSlide {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>

        <div className="container py-2 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-0">
          <p className="text-xs sm:text-sm text-gray-600 tracking-wide text-center sm:text-left roboto-reg">
            {topBarText}
          </p>

          <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600">
            <span className="roboto-reg">{topBarRightText}</span>
          </div>
        </div>
      </div>

      {/* ───────── MAIN NAV ───────── */}
      <div className="container">
        <div className="flex justify-between items-center h-18 md:h-24 py-3 md:py-0">
          {/* LOGO */}
          <Link href="/" className="flex items-center shrink-0">
            {logoUrl && (
              <Image
                src={logoUrl}
                alt="Logo"
                width={150}
                height={150}
                className="w-32 md:w-44 h-auto"
              />
            )}
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-base lg:text-lg roboto-reg transition-colors duration-200 group
                  ${
                    isActive
                      ? "text-[#4B5FC0] font-semibold"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#4B5FC0] transition-all duration-200
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            {/* CTA */}
            <div className="hidden sm:block">
              <NextButton
                label={dynamicCtaLabel}
                onClick={() => window.open(ctaLink, "_blank")}
              />
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ───────── MOBILE MENU ───────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-100 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm roboto-reg transition-colors
                      ${
                        isActive
                          ? "bg-blue-50 text-[#4B5FC0] font-semibold"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4B5FC0]" />
                      )}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* MOBILE CTA */}
              <div className="pt-3 pb-1">
                <NextButton
                  label={dynamicCtaLabel}
                  onClick={() => window.open(ctaLink, "_blank")}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
