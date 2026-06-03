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

  const posts = await sanityClient.fetch(`
    *[_type == "post"]{
      "slug": slug.current,
      seo {
        noIndex
      },
      _updatedAt
    }
  `);

  const seo = await sanityClient.fetch(SEO_QUERY);

  const baseUrl =
    seo?.siteUrl ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://www.onlineweightlossclinic.co.uk";

  const normalizedBaseUrl = baseUrl.replace(/\/$/, "");

  // ─────────────────────────────
  // 🔹 FILTER NOINDEX PAGES
  // ─────────────────────────────
  const filteredPages = pages.filter((page) => {
    // 🔴 GLOBAL FIRST
    if (seo?.defaultNoIndex === true) {
      return false;
    }

    // 🟡 PAGE SECOND
    if (page?.seo?.noIndex === true) {
      return false;
    }

    return true;
  });

  // ─────────────────────────────
  // 🔹 BUILD PAGE URLs
  // ─────────────────────────────
  const pageUrls = filteredPages
    .map((page) => {
      let path = "";

      if (page.slug === "home") {
        path = "";
      } else if (page.slug === "weight-loss") {
        path = "weight-loss-treatments";
      } else if (["mounjaro", "wegovy"].includes(page.slug)) {
        path = `weight-loss-treatments/${page.slug}`;
      } else {
        path = page.slug;
      }

      // ✅ homepage = /
      // ✅ other pages = /page/
      const finalUrl = path
        ? `${normalizedBaseUrl}/${path}`
        : `${normalizedBaseUrl}/`;

      return `
        <url>
          <loc>${finalUrl}</loc>
          <lastmod>${page._updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
      `;
    })
    .join("");

  const postUrls = posts
    .filter((post) => {
      if (seo?.defaultNoIndex === true) return false;
      if (post?.seo?.noIndex === true) return false;
      if (!post.slug) return false;

      return true;
    })
    .map((post) => {
      const finalUrl = `${normalizedBaseUrl}/guide/${post.slug}`;

      return `
      <url>
        <loc>${finalUrl}</loc>
        <lastmod>${post._updatedAt}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.6</priority>
      </url>
    `;
    })
    .join("");

  // ─────────────────────────────
  // 🔹 CUSTOM ROUTES FROM SANITY
  // ─────────────────────────────
  const customRoutes = (seo?.sitemapCustomRoutes || [])
    .map((route) => {
      // ✅ make sure custom route starts with /
      const cleanRoute = route.startsWith("/") ? route : `/${route}`;

      return `
        <url>
          <loc>${normalizedBaseUrl}${cleanRoute}</loc>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
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
    ${postUrls}
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
