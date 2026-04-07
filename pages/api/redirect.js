import { sanityClient } from "../../lib/sanity";

export default async function handler(req, res) {
  const redirects = await sanityClient.fetch(`
    *[_type == "redirect"]{
      from,
      to,
      type
    }
  `);

  res.status(200).json(redirects);
}
