export function generateSchema({ data, globalSeo, canonical }) {
  const schemas = [];

  const siteUrl = globalSeo?.siteUrl || "";
  const pageTitle = data?.seo?.metaTitle || data?.title;
  const description = data?.seo?.metaDescription || "";

  // ─────────────────────────────
  // 🟢 1. ORGANIZATION (GLOBAL)
  // ─────────────────────────────
  if (siteUrl) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Online Weight Loss Clinic",
      url: siteUrl,
    });
  }

  // ─────────────────────────────
  // 🟢 2. WEBPAGE (ALL PAGES)
  // ─────────────────────────────
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: description,
    url: canonical,
  });

  // ─────────────────────────────
  // 🟢 3. BREADCRUMB (AUTO FROM URL)
  // ─────────────────────────────
  if (canonical) {
    const parts = canonical.replace(siteUrl, "").split("/").filter(Boolean);

    const breadcrumbItems = [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
    ];

    parts.forEach((part, index) => {
      breadcrumbItems.push({
        "@type": "ListItem",
        position: index + 2,
        name: part.replace(/-/g, " "),
        item: `${siteUrl}/${parts.slice(0, index + 1).join("/")}`,
      });
    });

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    });
  }

  // ─────────────────────────────
  // 🟡 4. FAQ (IF EXISTS)
  // ─────────────────────────────
  const faqSection = data?.sections?.find((s) => s._type === "faqSection");

  if (faqSection) {
    const faqs = faqSection.categories
      ?.flatMap((cat) => cat.faqs)
      ?.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      }));

    if (faqs?.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs,
      });
    }
  }

  return schemas;
}
