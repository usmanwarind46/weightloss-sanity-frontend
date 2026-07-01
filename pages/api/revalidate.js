export default async function handler(req, res) {
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { slug, type } = req.body || {};

    if (!slug) {
      return res.status(400).json({ message: "No slug provided" });
    }

    if (type === "post") {
      await res.revalidate(`/guide/${slug}`);
      await res.revalidate("/guide");
      return res.json({
        revalidated: true,
        paths: [`/guide/${slug}`, "/guide"],
      });
    }

    let path;

    if (type === "page") {
      const exceptions = {
        home: "/",
        "weight-loss": "/weight-loss-treatments",
        wegovy: "/weight-loss-treatments/wegovy",
        mounjaro: "/weight-loss-treatments/mounjaro",
        "wegovy-pill": "/weight-loss-treatments/wegovy-pill",
        "about-clinic": "/about-clinic",
        "frequently-asked-questions": "/frequently-asked-questions",
        "contact-us": "/contact-us",
        "privacy-policy": "/privacy-policy",
        "terms-conditions": "/terms-conditions",
        "refunds-returns": "/refunds-returns",
        "shipping-policy": "/shipping-policy",
        complaints: "/complaints",
        doctor: "/doctor",
        "off-label-prescribing": "/off-label-prescribing",
        "oral-medication": "/oral-medication",
        "price-match-guarantee": "/price-match-guarantee",
        "wegovy-tablet-1": "/wegovy-tablet-1",
        "wegovy-tablet-2": "/wegovy-tablet-2",
        "discounted-llp": "/discounted-llp",
      };

      path = exceptions[slug] ?? `/${slug}`;
    } else if (type === "author") {
      path = `/author/${slug}`;
    } else if (type === "expert") {
      path = `/expert/${slug}`;
    } else {
      path = `/${slug}`;
    }

    await res.revalidate(path);

    return res.json({ revalidated: true, path });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error revalidating" });
  }
}
