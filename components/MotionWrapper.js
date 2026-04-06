"use client";

import { motion } from "framer-motion";

// ─── Variants ───────────────────────────────────────────────

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// ─── Components ─────────────────────────────────────────────

/**
 * FadeUp
 * Wraps any element with a fade + slide-up on scroll.
 * Usage: <FadeUp><YourComponent /></FadeUp>
 */
export function FadeUp({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: fadeUpVariant.hidden,
        visible: {
          ...fadeUpVariant.visible,
          transition: {
            ...fadeUpVariant.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeLeft
 * Slides in from the left side.
 * Usage: <FadeLeft><YourContent /></FadeLeft>
 */
export function FadeLeft({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeRight
 * Slides in from the right side.
 * Usage: <FadeRight><YourContent /></FadeRight>
 */
export function FadeRight({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeAlternate
 * Automatically alternates left/right based on index.
 * Perfect for step-by-step or alternating image+text sections.
 * Usage: {items.map((item, i) => <FadeAlternate index={i}>...</FadeAlternate>)}
 */
export function FadeAlternate({
  children,
  className = "",
  index = 0,
  delay = 0,
}) {
  const fromLeft = index % 2 === 0;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: fromLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer
 * Wraps a grid/list and staggers its direct children.
 * Usage: <StaggerContainer><Card /><Card /></StaggerContainer>
 */
export function StaggerContainer({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainerVariant}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem
 * Must be a direct child of StaggerContainer.
 * hover     → soft lift (y: -6px)
 * hoverScale → subtle scale up (scale: 1.02)
 * Both can be used together.
 */
export function StaggerItem({
  children,
  className = "",
  hover = false,
  hoverScale = false,
}) {
  const hoverEffect = {
    ...(hover ? { y: -6 } : {}),
    ...(hoverScale ? { scale: 1.02 } : {}),
    ...(hover || hoverScale
      ? { boxShadow: "0 20px 40px rgba(0,0,0,0.10)" }
      : {}),
  };

  return (
    <motion.div
      className={className}
      variants={cardVariant}
      whileHover={Object.keys(hoverEffect).length ? hoverEffect : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverLift
 * Standalone hover lift for individual elements.
 * hover      → lift up (y: -6px)
 * hoverScale → scale up (scale: 1.02)
 */
export function HoverLift({
  children,
  className = "",
  hover = true,
  hoverScale = false,
}) {
  const hoverEffect = {
    ...(hover ? { y: -6 } : {}),
    ...(hoverScale ? { scale: 1.02 } : {}),
    boxShadow: "0 20px 40px rgba(0,0,0,0.10)",
  };

  return (
    <motion.div
      className={className}
      whileHover={hoverEffect}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}
