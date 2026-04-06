// components/Layout.js
import Head from "next/head";

export default function MetaLayout({
  children,
  title = "Start Online Consultation - Online Weight Loss Clinic",
  description = "Online Weight Loss Clinic provides MHRA-approved weight loss treatments in the UK that have clinically proven results",
  canonical,
  noIndex = true,

  // OG props — all fall back to sensible defaults
  ogTitle,
  ogDescription,
  ogImage = "/Images/og-default.webp",
  ogUrl,
  ogType = "website",
  ogSiteName = "Online Weight Loss Clinic",

  // Twitter Card
  twitterCard = "summary_large_image",
  twitterTitle,
  twitterDescription,
  twitterImage,
}) {
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedOgUrl = ogUrl || canonical;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDesc = twitterDescription || resolvedOgDescription;
  const resolvedTwitterImage = twitterImage || ogImage;

  return (
    <>
      <Head>
        {/* ── STANDARD ── */}
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        {/* ── OPEN GRAPH ── */}
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={ogSiteName} />
        <meta property="og:title" content={resolvedOgTitle} />
        <meta property="og:description" content={resolvedOgDescription} />
        <meta property="og:image" content={ogImage} />
        {resolvedOgUrl && <meta property="og:url" content={resolvedOgUrl} />}

        {/* ── TWITTER CARD ── */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={resolvedTwitterTitle} />
        <meta name="twitter:description" content={resolvedTwitterDesc} />
        <meta name="twitter:image" content={resolvedTwitterImage} />
      </Head>
      {children}
    </>
  );
}
