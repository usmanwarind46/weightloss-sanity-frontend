import "./globals.css";
import "../styles/fonts.css";
import "../styles/lp.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CookieConsentInit from "../components/CookieConsent/CookieConsentInit";
import {
  initializeAttribution,
  readStoredAttribution,
} from "../lib/attribution";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (typeof window !== "undefined" && window._cl) {
        window._cl.pageview();
      }
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  useEffect(() => {
    // Agar consent pehle se diya hua hai toh chalao
    // Agar nahi — CookieConsentInit ka onConsent chalayega
    try {
      import("vanilla-cookieconsent").then((mod) => {
        const CC = mod.default || mod;
        if (CC.acceptedCategory("analytics")) {
          initializeAttribution();
        }
      });
    } catch {
      // Library load na ho toh bhi chalao
      initializeAttribution();
    }

    const saved = readStoredAttribution();
    if (saved) {
      console.log("=== OWLC ATTRIBUTION DEBUG ===");
      console.log("First Touch:", saved?.first_touch);
      console.log("Last Touch:", saved?.last_touch);
    }
  }, []);

  return (
    <>
      <CookieConsentInit />
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
