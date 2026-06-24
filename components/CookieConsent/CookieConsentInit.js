"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

export default function CookieConsentInit() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom left",
          equalWeightButtons: false,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },

      categories: {
        necessary: {
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: "_gid" }, { name: "_cl_id" }],
          },
        },
        // marketing: {
        //   autoClear: {
        //     cookies: [{ name: "_fbp" }],
        //   },
        // },
      },

      language: {
        default: "en",
        translations: {
          en: {
            consentModal: {
              title: "We use cookies",
              description:
                "We use cookies to run essential parts of this site and to understand how it's used (Google Analytics, Google Tag Manager, CustomerLabs) so we can improve it. You can accept all cookies, reject the non-essential ones, or manage your preferences.",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              showPreferencesBtn: "Manage preferences",
            },
            preferencesModal: {
              title: "Cookie preferences",
              acceptAllBtn: "Accept all",
              acceptNecessaryBtn: "Reject all",
              savePreferencesBtn: "Save preferences",
              closeIconLabel: "Close",
              sections: [
                {
                  title: "Strictly necessary",
                  description:
                    "These cookies are essential for the website to function and cannot be switched off.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Analytics",
                  description:
                    "These cookies help us understand how visitors use the site (Google Analytics, Google Tag Manager, CustomerLabs) so we can improve it.",
                  linkedCategory: "analytics",
                },
                // {
                //   title: "Marketing",
                //   description:
                //     "These cookies are used to measure and improve the effectiveness of our advertising (Meta Pixel).",
                //   linkedCategory: "marketing",
                // },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
