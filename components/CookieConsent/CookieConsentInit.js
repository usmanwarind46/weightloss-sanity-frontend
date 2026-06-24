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
      },

      onConsent: () => {
        if (CookieConsent.acceptedCategory("analytics")) {
          loadAnalyticsScripts();
        }
      },
      onChange: () => {
        if (CookieConsent.acceptedCategory("analytics")) {
          loadAnalyticsScripts();
        }
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
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}

let analyticsLoaded = false;

function loadAnalyticsScripts() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;

  // Activate every <script type="text/plain" data-cookiecategory="analytics"> on the page
  const scripts = document.querySelectorAll(
    'script[type="text/plain"][data-cookiecategory="analytics"]',
  );

  scripts.forEach((oldScript) => {
    const newScript = document.createElement("script");

    // copy any attributes (like src, async) except type
    for (const attr of oldScript.attributes) {
      if (attr.name !== "type") {
        newScript.setAttribute(attr.name, attr.value);
      }
    }

    if (oldScript.src) {
      newScript.src = oldScript.src;
    } else {
      newScript.textContent = oldScript.textContent;
    }

    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}
