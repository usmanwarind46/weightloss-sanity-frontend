export default async function handler(req, res) {
  try {
    if (req.query.secret !== process.env.REVALIDATE_SECRET) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const slug = body?.slug;

    const path = slug === "home" ? "/" : `/${slug}`;

    console.log("Revalidating path:", path);

    await res.revalidate(path);

    return res.json({
      revalidated: true,
      path,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error revalidating");
  }
}
