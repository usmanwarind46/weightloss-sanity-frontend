export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATION_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { slug } = req.body || {};

    if (!slug) {
      return res.status(400).json({ message: "No slug provided" });
    }

    // Map Sanity's "home" slug to the actual homepage route "/"
    const path = slug === "home" ? "/" : `/weight-loss-treatments/${slug}`;

    await res.revalidate(path);

    return res.json({ revalidated: true, path });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error revalidating" });
  }
}
