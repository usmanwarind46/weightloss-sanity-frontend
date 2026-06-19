import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiX, FiMail, FiCheckCircle, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import styles from "../styles/wegovy-signup-modal.module.css";

const CONTACT_API =
  "https://app.onlineweightlossclinic.co.uk/api/contact-submit";

const WegovySignupModal = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      ageConfirm: false,
    },
  });

  if (!isOpen) return null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const payload = {
        type: "wegovy-pill",
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

      toast.success("Form submitted successfully.");
      reset();

      setIsSubmitting(false);
      setIsSuccess(false);
      onClose?.();
    } catch (error) {
      toast.error(error?.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {isSubmitting && (
          <div className={styles.modalLoaderOverlay}>
            <div className={styles.modalLoaderBox}>
              <span className={styles.loaderSpinner}></span>
              <strong>Submitting...</strong>
              <p>Please wait while we save your details.</p>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className={styles.closeButton}
          aria-label="Close modal"
          disabled={isSubmitting}
        >
          <FiX />
        </button>

        <div className={styles.modalHeader}>
          <span className={styles.iconBadge}>
            <FiMail />
          </span>

          <div>
            <h2>Stay updated with Wegovy Pill information</h2>
            <p>
              Be the first to receive clear information and updates about the
              Wegovy pill and its availability in the UK.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.nameEmailGrid}>
            <div className={styles.fieldGroup}>
              <label htmlFor="fullName">Full name</label>

              <div className={styles.inputIconWrap}>
                <FiUser />
                <input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
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
                <p className={styles.errorText}>{errors.fullName.message}</p>
              )}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email">Email address</label>

              <div className={styles.inputIconWrap}>
                <FiMail />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email address is required.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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

          <div className="mt-3">
            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                disabled={isSubmitting}
                {...register("ageConfirm", {
                  required: "Please confirm you are over 16 years old.",
                })}
              />

              <span>I confirm I am over 16 years old.</span>
            </label>

            {errors.ageConfirm && (
              <p className={styles.errorText}>{errors.ageConfirm.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center mt-3 gap-4">
            <p className={styles.termsText}>
              By clicking Sign up you agree to our{" "}
              <a href="/privacy-policy" target="_blank">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="/terms-and-conditions" target="_blank">
                Terms and Conditions
              </a>
              .
            </p>

            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? (
                <span className={styles.buttonLoading}>
                  <span className={styles.buttonSpinner}></span>
                  Signing up...
                </span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>

          <div className={styles.trustNote}>
            <FiCheckCircle />
            <span>No spam. Only important treatment availability updates.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WegovySignupModal;
