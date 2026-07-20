import "./globals.css";
import "../styles/fonts.css";
import "../styles/lp.css";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CookieConsentInit from "../components/CookieConsent/CookieConsentInit";

const ATTRIBUTION_STORAGE_KEY = "owlc_attribution";
const ROOT_DOMAIN = "onlineweightlossclinic.co.uk";

const PAID_MEDIUMS = new Set([
  "cpc",
  "ppc",
  "paid",
  "paid_search",
  "paidsearch",
  "paid_social",
  "paidsocial",
  "social_paid",
  "display",
  "cpa",
  "cpv",
  "cpm",
]);

const ORGANIC_MEDIUMS = new Set([
  "organic",
  "organic_search",
  "organic_social",
  "social",
]);

const SEARCH_SOURCES = [
  "google",
  "bing",
  "yahoo",
  "duckduckgo",
  "baidu",
  "yandex",
  "ecosia",
  "gmb",
  "google_business",
  "google_business_profile",
];

const SOCIAL_SOURCES = [
  "facebook",
  "fb",
  "instagram",
  "ig",
  "meta",
  "linkedin",
  "tiktok",
  "twitter",
  "x",
  "youtube",
  "pinterest",
  "snapchat",
  "reddit",
];

function normalizeValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "_");
}

function includesSource(value, sources) {
  const normalized = normalizeValue(value);

  return sources.some(
    (source) =>
      normalized === source ||
      normalized.includes(`${source}.`) ||
      normalized.includes(`_${source}`) ||
      normalized.includes(`${source}_`),
  );
}

function getHostname(url) {
  if (!url) return "";

  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

function isInternalHostname(hostname) {
  const normalized = String(hostname || "")
    .toLowerCase()
    .replace(/^www\./, "");

  return normalized === ROOT_DOMAIN || normalized.endsWith(`.${ROOT_DOMAIN}`);
}

function isSearchSource(value) {
  return includesSource(value, SEARCH_SOURCES);
}

function isSocialSource(value) {
  return includesSource(value, SOCIAL_SOURCES);
}

function getSearchEngine(value) {
  const normalized = normalizeValue(value);

  if (normalized.includes("google")) return "google";
  if (normalized.includes("bing")) return "bing";
  if (normalized.includes("yahoo")) return "yahoo";
  if (normalized.includes("duckduckgo")) return "duckduckgo";
  if (normalized.includes("baidu")) return "baidu";
  if (normalized.includes("yandex")) return "yandex";
  if (normalized.includes("ecosia")) return "ecosia";

  return "search_engine";
}

function getSocialPlatform(value) {
  const normalized = normalizeValue(value);

  if (
    normalized.includes("facebook") ||
    normalized === "fb" ||
    normalized.includes("l.facebook") ||
    normalized.includes("lm.facebook")
  ) {
    return "facebook";
  }

  if (normalized.includes("instagram") || normalized === "ig") {
    return "instagram";
  }

  if (normalized.includes("linkedin")) return "linkedin";
  if (normalized.includes("tiktok")) return "tiktok";

  if (
    normalized === "x" ||
    normalized.includes("twitter") ||
    normalized.includes("t.co")
  ) {
    return "x";
  }

  if (normalized.includes("youtube")) return "youtube";
  if (normalized.includes("pinterest")) return "pinterest";
  if (normalized.includes("snapchat")) return "snapchat";
  if (normalized.includes("reddit")) return "reddit";

  return "social";
}

function readStoredAttribution() {
  try {
    const stored = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveStoredAttribution(attribution) {
  try {
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(attribution));

    /*
     * Backward compatibility:
     * Existing forms agar purani UTM keys use kar rahe hain to woh
     * first-touch attribution read karte rahenge.
     */
    const firstTouch = attribution.first_touch;

    localStorage.setItem(
      "utm_source",
      firstTouch.utm_source || firstTouch.source,
    );
    localStorage.setItem(
      "utm_medium",
      firstTouch.utm_medium || firstTouch.medium,
    );
    localStorage.setItem(
      "utm_campaign",
      firstTouch.utm_campaign || firstTouch.campaign || "none",
    );
  } catch (error) {
    console.error("Unable to save attribution:", error);
  }
}

function detectAttribution() {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || "";
  const referrerHostname = getHostname(referrer);
  const isInternalReferrer = isInternalHostname(referrerHostname);

  const utmSource = params.get("utm_source") || "";
  const utmMedium = params.get("utm_medium") || "";
  const utmCampaign = params.get("utm_campaign") || "";
  const utmTerm = params.get("utm_term") || "";
  const utmContent = params.get("utm_content") || "";
  const utmId = params.get("utm_id") || "";

  const gclid = params.get("gclid") || "";
  const gbraid = params.get("gbraid") || "";
  const wbraid = params.get("wbraid") || "";
  const dclid = params.get("dclid") || "";
  const gadSource = params.get("gad_source") || "";
  const gadCampaignId = params.get("gad_campaignid") || "";

  const msclkid = params.get("msclkid") || "";

  const fbclid = params.get("fbclid") || "";
  const ttclid = params.get("ttclid") || "";
  const linkedInClickId = params.get("li_fat_id") || "";
  const twitterClickId = params.get("twclid") || "";

  const normalizedMedium = normalizeValue(utmMedium);

  const hasGooglePaidIdentifier = Boolean(
    gclid || gbraid || wbraid || gadSource || gadCampaignId,
  );

  const hasAnyTrackingSignal = Boolean(
    utmSource ||
    utmMedium ||
    utmCampaign ||
    utmTerm ||
    utmContent ||
    utmId ||
    gclid ||
    gbraid ||
    wbraid ||
    dclid ||
    gadSource ||
    gadCampaignId ||
    msclkid ||
    fbclid ||
    ttclid ||
    linkedInClickId ||
    twitterClickId,
  );

  let source = "direct";
  let medium = "none";
  let channel = "Direct";
  let paidStatus = "unknown";
  let confidence = "medium";
  let evidence = ["no_external_referrer_or_tracking_parameter"];

  /*
   * Google Ads identifiers take priority over UTMs because someone
   * could accidentally configure an incorrect UTM medium.
   */
  if (hasGooglePaidIdentifier) {
    source = "google";
    medium = "cpc";
    channel = "Paid Search";
    paidStatus = "paid";
    confidence = "high";
    evidence = [
      gclid && "gclid",
      gbraid && "gbraid",
      wbraid && "wbraid",
      gadSource && "gad_source",
      gadCampaignId && "gad_campaignid",
    ].filter(Boolean);
  } else if (dclid) {
    source = "google";
    medium = "display";
    channel = "Display";
    paidStatus = "paid";
    confidence = "high";
    evidence = ["dclid"];
  } else if (msclkid) {
    source = "bing";
    medium = "cpc";
    channel = "Paid Search";
    paidStatus = "paid";
    confidence = "high";
    evidence = ["msclkid"];
  } else if (utmMedium && PAID_MEDIUMS.has(normalizedMedium)) {
    source = normalizeValue(utmSource) || "unknown";
    medium = normalizedMedium;
    paidStatus = "paid";
    confidence = "high";
    evidence = ["paid_utm_medium"];

    if (isSocialSource(source)) {
      channel = "Paid Social";
    } else if (isSearchSource(source)) {
      channel = "Paid Search";
    } else if (normalizedMedium === "display") {
      channel = "Display";
    } else {
      channel = "Paid Other";
    }
  } else if (utmSource || utmMedium) {
    source = normalizeValue(utmSource) || "unknown";
    medium = normalizedMedium || "unknown";
    confidence = "high";
    evidence = ["manual_utm"];

    if (ORGANIC_MEDIUMS.has(normalizedMedium)) {
      paidStatus = "organic";

      if (isSocialSource(source)) {
        channel = "Organic Social";
      } else if (isSearchSource(source)) {
        channel = "Organic Search";
      } else {
        channel = "Organic";
      }
    } else if (normalizedMedium === "email") {
      channel = "Email";
      paidStatus = "unknown";
    } else if (normalizedMedium === "referral") {
      channel = "Referral";
      paidStatus = "organic";
    } else if (
      normalizedMedium === "affiliate" ||
      normalizedMedium === "affiliates"
    ) {
      channel = "Affiliates";
      paidStatus = "unknown";
    } else {
      channel = "Unassigned";
      paidStatus = "unknown";
    }
  } else if (fbclid) {
    /*
     * fbclid Facebook/Instagram click confirm karta hai,
     * lekin paid ad vs organic post guaranteed nahi.
     * Agreed reporting fallback: Organic Social.
     */
    source = isSocialSource(referrerHostname)
      ? getSocialPlatform(referrerHostname)
      : "meta";

    medium = "social";
    channel = "Organic Social";
    paidStatus = "unknown";
    confidence = "medium";
    evidence = ["fbclid"];
  } else if (ttclid) {
    source = "tiktok";
    medium = "social";
    channel = "Organic Social";
    paidStatus = "unknown";
    confidence = "medium";
    evidence = ["ttclid"];
  } else if (linkedInClickId) {
    source = "linkedin";
    medium = "social";
    channel = "Organic Social";
    paidStatus = "unknown";
    confidence = "medium";
    evidence = ["li_fat_id"];
  } else if (twitterClickId) {
    source = "x";
    medium = "social";
    channel = "Organic Social";
    paidStatus = "unknown";
    confidence = "medium";
    evidence = ["twclid"];
  } else if (!isInternalReferrer && isSearchSource(referrerHostname)) {
    source = getSearchEngine(referrerHostname);
    medium = "organic";
    channel = "Organic Search";
    paidStatus = "organic";
    confidence = "medium";
    evidence = ["search_engine_referrer"];
  } else if (!isInternalReferrer && isSocialSource(referrerHostname)) {
    source = getSocialPlatform(referrerHostname);
    medium = "social";
    channel = "Organic Social";
    paidStatus = "organic";
    confidence = "medium";
    evidence = ["social_referrer"];
  } else if (referrerHostname && !isInternalReferrer) {
    source = referrerHostname;
    medium = "referral";
    channel = "Referral";
    paidStatus = "organic";
    confidence = "medium";
    evidence = ["external_referrer"];
  } else if (isInternalReferrer) {
    /*
     * Main website → consultation ko new acquisition nahi samjhenge.
     */
    source = "internal";
    medium = "internal";
    channel = "Internal";
    paidStatus = "unknown";
    confidence = "high";
    evidence = ["internal_referrer"];
  }

  return {
    source,
    medium,
    channel,
    paid_status: paidStatus,
    confidence,
    evidence,

    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
    utm_id: utmId,

    click_ids: {
      gclid,
      gbraid,
      wbraid,
      dclid,
      msclkid,
      fbclid,
      ttclid,
      li_fat_id: linkedInClickId,
      twclid: twitterClickId,
    },

    google_ads: {
      gad_source: gadSource,
      gad_campaign_id: gadCampaignId,
    },

    landing_page: `${window.location.pathname}${window.location.search}`,
    landing_url: window.location.href,
    referrer,
    referrer_hostname: referrerHostname || null,
    captured_at: new Date().toISOString(),

    has_tracking_signal: hasAnyTrackingSignal,
    is_internal_referrer: isInternalReferrer,
  };
}

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
    const currentTouch = detectAttribution();
    const storedAttribution = readStoredAttribution();

    if (!storedAttribution?.first_touch) {
      /*
       * First ever visit:
       * First Touch aur Last Touch dono same honge.
       */
      saveStoredAttribution({
        first_touch: currentTouch,
        last_touch: currentTouch,
      });
    } else {
      /*
       * Last Touch sirf tab update hoga jab:
       * 1. URL mein tracking/campaign signal ho, ya
       * 2. User kisi external website/search/social platform se aya ho.
       *
       * Direct visit aur main website → consultation internal navigation
       * existing Last Touch ko overwrite nahi karegi.
       */
      const hasExternalReferrer =
        Boolean(currentTouch.referrer_hostname) &&
        !currentTouch.is_internal_referrer;

      const shouldUpdateLastTouch =
        currentTouch.has_tracking_signal || hasExternalReferrer;

      if (shouldUpdateLastTouch) {
        saveStoredAttribution({
          ...storedAttribution,
          last_touch: currentTouch,
        });
      } else {
        /*
         * Purani individual UTM keys ko canonical First Touch ke saath
         * synchronized rakho.
         */
        saveStoredAttribution(storedAttribution);
      }
    }

    const saved = readStoredAttribution();

    console.log("=== OWLC ATTRIBUTION DEBUG ===");
    console.log("First Touch:", saved?.first_touch);
    console.log("Last Touch:", saved?.last_touch);
  }, []);

  return (
    <>
      <CookieConsentInit />
      <Toaster position="top-center" />
      <Component {...pageProps} />
    </>
  );
}
