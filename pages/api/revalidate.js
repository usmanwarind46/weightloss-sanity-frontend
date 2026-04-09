export default async function handler(req, res) {
  try {
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // ✅ SAFE BODY HANDLING
    const body = req.body || {};

    console.log("Webhook Body:", body);

    const slug = body?.slug;

    // ✅ HANDLE MISSING SLUG (VERY IMPORTANT)
    let path = "/";

    if (slug && slug !== "home") {
      path = `/${slug}`;
    }

    console.log("Revalidating path:", path);

    await res.revalidate(path);

    return res.json({
      revalidated: true,
      path,
    });
  } catch (err) {
    console.error("❌ Revalidate Error:", err);
    return res.status(500).json({
      message: "Error revalidating",
      error: err.message,
    });
  }
}
