"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { X, CheckCircle2 } from "lucide-react";
import NextButton from "../ui/NextButton";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modal = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 340, damping: 28 },
  },
  exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.18 } },
};

const formVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

const thankVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 22, delay: 0.1 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export default function NewsletterModal({ open, setOpen }) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const handler = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      setOpen(false);
      setTimeout(() => {
        reset();
        setSubmitted(false);
      }, 400);
    }, 2500);
    return () => clearTimeout(timer);
  }, [submitted, setOpen, reset]);

  const onSubmit = (data) => {
    console.log("Newsletter subscription:", data);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      reset();
      setSubmitted(false);
    }, 400);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{
            backgroundColor: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
          }}
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #c8f5e0 0%, #aeecd1 100%)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-25"
              style={{
                background: "radial-gradient(circle, #34d399, transparent)",
              }}
            />

            <motion.button
              onClick={handleClose}
              className="absolute top-3 right-3 z-10 flex items-center justify-center cursor-pointer w-7 h-7 rounded-full bg-white/50 text-gray-500 hover:bg-white/80 hover:text-gray-800 transition-colors"
              whileHover={{ scale: 1.12, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <X size={14} />
            </motion.button>

            <div className="px-6 pt-7 pb-6 min-h-[160px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!submitted && (
                  <motion.div
                    key="form"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <h2 className="text-xl font-bold text-gray-900 text-center mb-5 tracking-tight">
                      Subscribe To Our Newsletter
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      {/* Row on desktop, stacked on mobile */}
                      <div className="flex flex-col sm:flex-row items-stretch gap-2">
                        {/* Name field + error */}
                        <div className="flex-1 flex flex-col">
                          <input
                            type="text"
                            placeholder="Name"
                            {...register("name", { required: "Required" })}
                            className={`w-full px-3 py-4 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 ${
                              errors.name ? "border-red-400" : "border-white/40"
                            }`}
                          />
                          {errors.name && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-red-500 pl-1 mt-1"
                            >
                              {errors.name.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Email field + error */}
                        <div className="flex-1 flex flex-col">
                          <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                              required: "Required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email",
                              },
                            })}
                            className={`w-full px-3 py-4 rounded-xl bg-white/70 border text-sm text-gray-800 placeholder-gray-400 outline-none transition-all focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 ${
                              errors.email
                                ? "border-red-400"
                                : "border-white/40"
                            }`}
                          />
                          {errors.email && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] text-red-500 pl-1 mt-1"
                            >
                              {errors.email.message}
                            </motion.p>
                          )}
                        </div>

                        {/* Subscribe button */}
                        <div className="flex justify-center sm:block sm:flex-shrink-0">
                          <NextButton
                            label="Subscribe"
                            type="submit"
                            props=""
                          />
                        </div>
                      </div>
                    </form>
                  </motion.div>
                )}

                {submitted && (
                  <motion.div
                    key="thankyou"
                    variants={thankVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center py-4 text-center gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: 0.15,
                      }}
                      className="flex items-center justify-center w-16 h-16 rounded-full bg-white/60 shadow"
                    >
                      <CheckCircle2
                        size={36}
                        className="text-emerald-600"
                        strokeWidth={1.8}
                      />
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-xl font-bold text-gray-900 tracking-tight"
                    >
                      Thank You!
                    </motion.h3>

                    {/* <motion.p
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.42 }}
                      className="text-sm text-gray-600 max-w-[240px]"
                    >
                      You're now subscribed. We'll keep you posted!
                    </motion.p> */}

                    <motion.div className="w-full h-1 bg-white/40 rounded-full overflow-hidden mt-2">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background:
                            "linear-gradient(90deg, #059669, #10b981)",
                        }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "linear" }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
