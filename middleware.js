import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.nextUrl.pathname;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=*[_type=="redirect"]{from,to,type}`,
  );

  const data = await res.json();
  const redirects = data.result;

  const match = redirects.find((r) => r.from === url);

  if (match) {
    return NextResponse.redirect(
      new URL(match.to, req.url),
      parseInt(match.type),
    );
  }

  return NextResponse.next();
}
