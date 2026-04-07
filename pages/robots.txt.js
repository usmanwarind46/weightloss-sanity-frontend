import { sanityClient } from "../lib/sanity";
import { SEO_QUERY } from "../lib/sanityQueries";

export async function getServerSideProps({ res }) {
  const seo = await sanityClient.fetch(SEO_QUERY);

  const siteUrl = seo?.siteUrl || "https://yourdomain.com";

  const allowAll = seo?.allowAll ?? true;

  const disallowPaths = seo?.disallowPaths || [];

  const sitemap = seo?.sitemapUrl || `${siteUrl}/sitemap.xml`;

  let content = "User-agent: *\n";

  // ───── ALLOW / DISALLOW ─────
  if (allowAll) {
    content += "Allow: /\n";
  }

  disallowPaths.forEach((path) => {
    content += `Disallow: ${path}\n`;
  });

  // ───── SITEMAP ─────
  content += `\nSitemap: ${sitemap}`;

  // ───── RESPONSE ─────
  res.setHeader("Content-Type", "text/plain");
  res.write(content);
  res.end();

  return {
    props: {},
  };
}

export default function Robots() {
  return null;
}
