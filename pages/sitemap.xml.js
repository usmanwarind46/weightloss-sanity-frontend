import { sanityClient } from "../lib/sanity";
import { SEO_QUERY } from "../lib/sanityQueries";

export async function getServerSideProps({ res }) {
  // ─────────────────────────────
  // 🔹 FETCH DATA
  // ─────────────────────────────
  const pages = await sanityClient.fetch(`
    *[_type == "page"]{
      "slug": slug.current,
      seo {
        noIndex
      },
      _updatedAt
    }
  `);

  const seo = await sanityClient.fetch(SEO_QUERY);

  const baseUrl = seo?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL;

  // ─────────────────────────────
  // 🔹 FILTER NOINDEX PAGES
  // ─────────────────────────────
  const filteredPages = pages.filter((page) =>
    page?.seo?.noIndex !== undefined
      ? !page.seo.noIndex
      : !(seo?.defaultNoIndex ?? false),
  );

  // ─────────────────────────────
  // 🔹 BUILD PAGE URLs
  // ─────────────────────────────
  const pageUrls = filteredPages
    .map((page) => {
      let path = "";

      if (page.slug === "home") {
        path = "";
      } else if (["mounjaro", "wegovy"].includes(page.slug)) {
        path = `weight-loss-treatments/${page.slug}`;
      } else {
        path = page.slug;
      }

      return `
        <url>
          <loc>${baseUrl}/${path}</loc>
          <lastmod>${page._updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.7</priority>
        </url>
      `;
    })
    .join("");

  // ─────────────────────────────
  // 🔹 CUSTOM ROUTES FROM SANITY
  // ─────────────────────────────
  const customRoutes = (seo?.sitemapCustomRoutes || [])
    .map((route) => {
      return `
        <url>
          <loc>${baseUrl}${route}</loc>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `;
    })
    .join("");

  // ─────────────────────────────
  // 🔹 FINAL XML
  // ─────────────────────────────
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pageUrls}
    ${customRoutes}
  </urlset>`;

  // ─────────────────────────────
  // 🔹 RESPONSE
  // ─────────────────────────────
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
