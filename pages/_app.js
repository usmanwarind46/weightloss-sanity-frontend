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
    const utmMedium = params.get("utm_medium");
    const utmCampaign = params.get("utm_campaign");

    if (utmSource) {
      localStorage.setItem("utm_source", utmSource);
      localStorage.setItem("utm_medium", utmMedium || "");
      localStorage.setItem("utm_campaign", utmCampaign || "");
    } else if (!localStorage.getItem("utm_source")) {
      localStorage.setItem("utm_source", "organic");
      localStorage.setItem("utm_medium", "none");
      localStorage.setItem("utm_campaign", "none");
    }

    // Console mein dekho
    console.log("=== UTM DEBUG ===");
    console.log("utm_source:", localStorage.getItem("utm_source"));
    console.log("utm_medium:", localStorage.getItem("utm_medium"));
    console.log("utm_campaign:", localStorage.getItem("utm_campaign"));
  }, []);

  return (
    <>
      <CookieConsentInit />
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
