import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiMail, FiUser, FiArrowRight } from "react-icons/fi";
import toast from "react-hot-toast";
import styles from "../styles/wegovy-signup-modal.module.css";

const CONTACT_API =
  "https://app.onlineweightlossclinic.co.uk/api/contact-submit";

const WegovySignupModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape" && !isSubmitting) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSubmitting, onClose]);

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const payload = {
        type: "foundayo",
        firstName: data.fullName,
        email: data.email,
        company_id: 2,
      };

      const response = await fetch(CONTACT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message ||
            result?.errors?.email?.[0] ||
            result?.errors?.firstName?.[0] ||
            "Something went wrong. Please try again.",
        );
      }

      toast.success("You're on the list.");

      reset();
      onClose?.();
    } catch (error) {
      toast.error(
        error?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isSubmitting) {
      onClose?.();
    }
  };

  return (
    <div
      className={styles.modalOverlay}
      onMouseDown={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="foundayo-modal-title"
    >
      <div className={styles.modalCard}>
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          disabled={isSubmitting}
          aria-label="Close modal"
        >
          <FiX />
        </button>

        {/* Header */}
        <div className={styles.modalHeader}>
          {/* <div className={styles.iconBadge}>
            <FiMail />
          </div> */}

          <h2 id="foundayo-modal-title">
            Be the first to know when Foundayo is available
          </h2>

          <p>
            Add your details below and we’ll let you know when Foundayo becomes
            available in the UK.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.fieldsGrid}>
            {/* Full Name */}
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName">Full name</label>

              <div
                className={`${styles.inputWrap} ${
                  errors.fullName ? styles.inputError : ""
                }`}
              >
                <FiUser />

                <input
                  id="fullName"
                  type="text"
                  placeholder="Jane Smith"
                  autoComplete="name"
                  disabled={isSubmitting}
                  {...register("fullName", {
                    required: "Full name is required.",
                    minLength: {
                      value: 2,
                      message: "Full name must be at least 2 characters.",
                    },
                    pattern: {
                      value: /^[A-Za-z\s'-]+$/,
                      message: "Please enter a valid full name.",
                    },
                  })}
                />
              </div>

              {errors.fullName && (
                <p className={styles.errorText}>
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email address</label>

              <div
                className={`${styles.inputWrap} ${
                  errors.email ? styles.inputError : ""
                }`}
              >
                <FiMail />

                <input
                  id="email"
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email address is required.",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className={styles.errorText}>{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (
              <>
                <span className={styles.spinner} />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Keep Me Updated</span>
                <FiArrowRight />
              </>
            )}
          </button>

          {/* Terms */}
          <p className={styles.termsText}>
            By clicking <strong>Keep Me Updated</strong>, you agree to our{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms and Conditions
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default WegovySignupModal;