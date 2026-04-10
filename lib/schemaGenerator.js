export function generateSchema({ data, globalSeo, canonical }) {
  const schemas = [];

  const siteUrl = globalSeo?.siteUrl || "";
  const pageTitle = data?.seo?.metaTitle || data?.title;
  const description = data?.seo?.metaDescription || "";

  // ─────────────────────────────
  // 🟢 1. ORGANIZATION
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
  // 🟢 2. WEBPAGE
  // ─────────────────────────────
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: description,
    url: canonical,
  });

  // ─────────────────────────────
  // 🔥 3. BLOG POSTING (IMPORTANT)
  // ─────────────────────────────
  const isBlog = data?._type === "post";

  if (isBlog) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",

      headline: data?.title,
      description: description,

      image: data?.image ? [data.image] : undefined,

      author: data?.author?.name
        ? {
            "@type": "Person",
            name: data.author.name,
          }
        : undefined,

      publisher: {
        "@type": "Organization",
        name: "Online Weight Loss Clinic",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/logo.png`,
        },
      },

      datePublished: data?.publishedAt,
      dateModified: data?.publishedAt,

      mainEntityOfPage: canonical,
    });
  }

  // ─────────────────────────────
  // 🟢 4. BREADCRUMB
  // ─────────────────────────────
  if (canonical) {
    const url = new URL(canonical);
    const parts = url.pathname.split("/").filter(Boolean);

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
  // 🟡 5. FAQ (EDITOR BASED DETECTION)
  // ─────────────────────────────
  if (data?.content) {
    const faqs = [];

    let currentQuestion = null;

    data.content.forEach((block) => {
      if (block._type === "block" && block.style === "h3") {
        currentQuestion = block.children?.[0]?.text;
      } else if (block._type === "block" && currentQuestion) {
        faqs.push({
          "@type": "Question",
          name: currentQuestion,
          acceptedAnswer: {
            "@type": "Answer",
            text: block.children?.map((c) => c.text).join(" "),
          },
        });
        currentQuestion = null;
      }
    });

    if (faqs.length) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs,
      });
    }
  }

  return schemas;
}
