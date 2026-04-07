import Head from "next/head";

export default function MetaLayout({
  children,

  // 🔹 PAGE SEO
  seo = {},

  // 🔹 GLOBAL SEO
  globalSeo = {},

  // 🔹 PASSED CANONICAL (from page)
  canonical,

  autoSchemas,
}) {
  // ─────────────────────────────────────
  // 🔹 FALLBACK (YOUR ORIGINAL DEFAULTS)
  // ─────────────────────────────────────
  const FALLBACK_TITLE =
    "Start Online Consultation - Online Weight Loss Clinic";

  const FALLBACK_DESCRIPTION =
    "Online Weight Loss Clinic provides MHRA-approved weight loss treatments in the UK that have clinically proven results";

  // ─────────────────────────────────────
  // 🔹 TITLE (PAGE → GLOBAL → FALLBACK)
  // ─────────────────────────────────────
  let title =
    seo?.metaTitle && seo.metaTitle.trim() !== ""
      ? seo.metaTitle
      : globalSeo?.defaultTitle || FALLBACK_TITLE;

  // 🔹 Apply title template
  if (globalSeo?.titleTemplate && title) {
    title = globalSeo.titleTemplate.replace("%s", title);
  }

  // ─────────────────────────────────────
  // 🔹 DESCRIPTION
  // ─────────────────────────────────────
  const description =
    seo?.metaDescription ??
    globalSeo?.defaultDescription ??
    FALLBACK_DESCRIPTION;

  // ─────────────────────────────────────
  // 🔹 CANONICAL (PAGE → PROP → AUTO)
  // ─────────────────────────────────────
  let finalCanonical =
    seo?.canonical ??
    canonical ??
    (globalSeo?.siteUrl ? globalSeo.siteUrl : null);

  // ─────────────────────────────────────
  // 🔹 ROBOTS (CRITICAL FIX WITH ??)
  // ─────────────────────────────────────
  const noIndex = seo?.noIndex ?? globalSeo?.defaultNoIndex ?? false;

  const noFollow = seo?.noFollow ?? globalSeo?.defaultNoFollow ?? false;

  const robots =
    globalSeo?.robotsContent ??
    `${noIndex ? "noindex" : "index"}, ${noFollow ? "nofollow" : "follow"}`;

  // ─────────────────────────────────────
  // 🔹 OPEN GRAPH (AUTO FALLBACK)
  // ─────────────────────────────────────
  const ogTitle = seo?.ogTitle ?? title;

  const ogDescription = seo?.ogDescription ?? description;

  const ogImage =
    seo?.ogImage?.asset?.url ??
    globalSeo?.defaultOgImage?.asset?.url ??
    "/Images/og-default.webp";

  const ogUrl = finalCanonical;

  const ogType = globalSeo?.ogType ?? "website";

  const ogSiteName = globalSeo?.ogSiteName ?? "Online Weight Loss Clinic";

  // ─────────────────────────────────────
  // 🔹 TWITTER (AUTO FALLBACK)
  // ─────────────────────────────────────
  const twitterCard = globalSeo?.twitterCard ?? "summary_large_image";

  const twitterTitle = seo?.twitterTitle ?? ogTitle;

  const twitterDescription = seo?.twitterDescription ?? ogDescription;

  const twitterImage = seo?.twitterImage?.asset?.url ?? ogImage;

  // ─────────────────────────────────────
  // 🔹 RENDER
  // ─────────────────────────────────────
  return (
    <>
      <Head>
        {/* ───── BASIC ───── */}
        <title>{title}</title>
        <meta name="description" content={description} />

        {finalCanonical && <link rel="canonical" href={finalCanonical} />}

        <meta name="robots" content={robots} />

        {/* ───── OPEN GRAPH ───── */}
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content={ogSiteName} />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogUrl && <meta property="og:url" content={ogUrl} />}

        {/* ───── TWITTER ───── */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={twitterTitle} />
        <meta name="twitter:description" content={twitterDescription} />
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}

        {/* ───── EXTRA META TAGS ───── */}
        {globalSeo?.additionalMetaTags && (
          <div
            dangerouslySetInnerHTML={{
              __html: globalSeo.additionalMetaTags,
            }}
          />
        )}

        {/* ───── AUTO SCHEMA ───── */}
        {autoSchemas?.map((schema, i) => (
          <script
            key={`auto-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema),
            }}
          />
        ))}

        {/* ───── MANUAL SCHEMA (OVERRIDE) ───── */}
        {seo?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: seo.schema,
            }}
          />
        )}
      </Head>

      {children}
    </>
  );
}
