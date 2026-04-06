import { sanityClient } from "../lib/sanity";
import { PAGE_QUERY } from "../lib/sanityQueries";

export async function getStaticProps() {
  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "home",
  });

  return {
    props: { data },
    revalidate: 60,
  };
}

export default function TestPage({ data }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>Sanity Data Test</h1>

      <pre style={{ whiteSpace: "pre-wrap" }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
