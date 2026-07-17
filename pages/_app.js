import "./globals.css";
import "../styles/fonts.css";
import "../styles/lp.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CookieConsentInit from "../components/CookieConsent/CookieConsentInit";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window._cl) {
        window._cl.pageview();
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get("utm_source");

    if (utmSource) {
      // Paid traffic
      sessionStorage.setItem("utm_source", utmSource);
      sessionStorage.setItem("utm_medium", params.get("utm_medium") || "");
      sessionStorage.setItem("utm_campaign", params.get("utm_campaign") || "");
    } else {
      // Referrer se check karo
      const referrer = document.referrer;

      if (!referrer || referrer === "") {
        // Koi referrer nahi — Direct
        sessionStorage.setItem("utm_source", "direct");
        sessionStorage.setItem("utm_medium", "none");
        sessionStorage.setItem("utm_campaign", "none");
      } else if (
        referrer.includes("google") ||
        referrer.includes("bing") ||
        referrer.includes("yahoo") ||
        referrer.includes("duckduckgo")
      ) {
        // Search engine se aaya — Organic
        sessionStorage.setItem("utm_source", "organic");
        sessionStorage.setItem("utm_medium", "organic");
        sessionStorage.setItem("utm_campaign", "none");
      } else {
        // Kisi aur site se aaya — Referral
        sessionStorage.setItem("utm_source", referrer);
        sessionStorage.setItem("utm_medium", "referral");
        sessionStorage.setItem("utm_campaign", "none");
      }
    }

    console.log("=== UTM DEBUG ===");
    console.log("utm_source:", sessionStorage.getItem("utm_source"));
    console.log("utm_medium:", sessionStorage.getItem("utm_medium"));
    console.log("utm_campaign:", sessionStorage.getItem("utm_campaign"));
  }, []);

  return (
    <>
      <CookieConsentInit />
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
