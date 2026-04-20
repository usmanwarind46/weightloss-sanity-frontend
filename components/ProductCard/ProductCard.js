"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Mounjaro",
    subtitle: "Tirzepatide",
    price: "£159.00",
    bgColor: "#5B6EE8",
    image: "/Images/mounjaro.png",
    features: [
      { text: "Dose titration every 4 weeks" },
      {
        text: "Clinically shown ",
        bold: "up to 22.5% reduction",
        suffix: " in body weight within 72 weeks",
      },
      { text: "Follows a dual agonist mechanism" },
    ],
  },
  {
    id: 2,
    name: "Wegovy",
    subtitle: "Semaglutide",
    price: "£219.00",
    bgColor: "#4A9E8E",
    image: "/Images/wegovy.png",
    features: [
      { text: "Once-weekly injection" },
      {
        text: "Clinically shown ",
        bold: "up to 15% reduction",
        suffix: " in body weight over 68 weeks",
      },
      { text: "GLP-1 receptor agonist" },
    ],
  },
  {
    id: 3,
    name: "Saxenda",
    subtitle: "Liraglutide",
    price: "£189.00",
    bgColor: "#7B5EA7",
    image: "/Images/saxenda.png",
    features: [
      { text: "Daily injection pen" },
      {
        text: "Average weight loss of ",
        bold: "5–7%",
        suffix: " body weight over 56 weeks",
      },
      { text: "Appetite regulation mechanism" },
    ],
  },
];

const CheckIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke={color} strokeOpacity="0.4" />
    <path
      d="M5.5 9L7.8 11.5L12.5 6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ProductCard({ product = products[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, boxShadow: "0 24px 60px rgba(0,0,0,0.13)" }}
      className="flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md w-full max-w-2xl bg-white items-stretch h-full"
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.09)" }}
    >
      {/* Left: Colored image panel */}
      <motion.div
        className="relative flex items-center justify-center shrink-0 w-full sm:w-[250px] h-[200px] sm:h-auto "
        style={{ backgroundColor: product.bgColor }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, rotate: -6, scale: 0.85 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[160px] h-[160px] sm:w-[200px] sm:h-[220px]"
        >
          <Image
            src={product?.image}
            alt={product?.imageAlt}
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Right: Content */}
      <div className="flex flex-col justify-between p-5 sm:p-6 flex-1">
        <div>
          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-1"
          >
            {product.name}{" "}
            <span className="text-gray-700 font-normal text-lg">
              ({product.subtitle})
            </span>
          </motion.h3>

          {/* Price */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.28 }}
            className="text-sm font-medium mb-4 wieght-card-font"
            style={{ color: "#4CAF8A" }}
          >
            Starting from{" "}
            <span className="underline underline-offset-2">
              {product.price}
            </span>
          </motion.p>

          {/* Features */}
          <ul className="flex flex-col gap-2.5 mb-5">
            {product.features.map((f, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32 + i * 0.08, duration: 0.35 }}
                className="flex items-start gap-2.5 text-gray-600 text-sm leading-snug wieght-card-font"
              >
                <span className="mt-0.5 shrink-0">
                  <CheckIcon color={product.bgColor} />
                </span>
                <span>
                  {f.text}
                  {f.bold && (
                    <strong className="text-gray-800 font-semibold">
                      {f.bold}
                    </strong>
                  )}
                  {f.suffix}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Link href={product.href}>
          <motion.button
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.35 }}
            whileHover={{ scale: 1.02, brightness: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl text-white text-sm font-semibold tracking-wide transition-all duration-200 cursor-pointer wieght-card-font"
            style={{
              background: `linear-gradient(135deg, #4CAF8A 0%, #3d9e7a 100%)`,
              boxShadow: "0 4px 16px rgba(76,175,138,0.35)",
            }}
          >
            View Treatment
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}
