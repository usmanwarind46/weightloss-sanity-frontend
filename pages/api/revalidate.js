import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  try {
    // 🔐 SECURITY
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    console.log("🔥 Webhook Body:", body);

    const type = body?._type;
    const slug = body?.slug;
    const id = body?._id;

    const revalidatedPaths = [];

    // ─────────────────────────────
    // 🟢 PAGE (STATIC PAGES)
    // ─────────────────────────────
    if (type === "page") {
      const path = slug === "home" ? "/" : `/${slug}`;
      await res.revalidate(path);
      revalidatedPaths.push(path);
    }

    // ─────────────────────────────
    // 🟢 BLOG POST
    // ─────────────────────────────
    if (type === "post") {
      const path = `/guide/${slug}`;
      await res.revalidate(path);
      revalidatedPaths.push(path);
    }

    // ─────────────────────────────
    // 🔥 AUTHOR UPDATED
    // ─────────────────────────────
    if (type === "author") {
      // 1. Author page
      const authorPath = `/author/${slug}`;
      await res.revalidate(authorPath);
      revalidatedPaths.push(authorPath);

      // 2. All blog posts using this author
      const posts = await sanityClient.fetch(
        `*[_type == "post" && references($id)]{
          "slug": slug.current
        }`,
        { id },
      );

      for (const post of posts) {
        const path = `/guide/${post.slug}`;
        await res.revalidate(path);
        revalidatedPaths.push(path);
      }
    }

    // ─────────────────────────────
    // 🔥 EXPERT UPDATED
    // ─────────────────────────────
    if (type === "expert") {
      // 1. Expert page
      const expertPath = `/expert/${slug}`;
      await res.revalidate(expertPath);
      revalidatedPaths.push(expertPath);

      // 2. All blog posts using this expert
      const posts = await sanityClient.fetch(
        `*[_type == "post" && references($id)]{
          "slug": slug.current
        }`,
        { id },
      );

      for (const post of posts) {
        const path = `/guide/${post.slug}`;
        await res.revalidate(path);
        revalidatedPaths.push(path);
      }
    }

    // ─────────────────────────────
    // 🟡 GLOBAL SETTINGS
    // ─────────────────────────────
    if (type === "siteSettings") {
      await res.revalidate("/");
      revalidatedPaths.push("/");
    }

    console.log("✅ Revalidated Paths:", revalidatedPaths);

    return res.json({
      revalidated: true,
      paths: revalidatedPaths,
    });
  } catch (err) {
    console.error("❌ Revalidate Error:", err);
    return res.status(500).json({
      message: "Error revalidating",
      error: err.message,
    });
  }
}
