import Head from "next/head";

import MetaLayout from "../Meta/MetaLayout";
import { meta_url } from "../config/constants";
import {
  PAGE_QUERY,
  SEO_QUERY,
  SITE_SETTINGS_QUERY,
} from "../lib/sanityQueries";
import { sanityClient } from "../lib/sanity";
import { generateSchema } from "../lib/schemaGenerator";
import Link from "next/link";

export async function getStaticProps() {
  const seoSettings = await sanityClient.fetch(SEO_QUERY);

  const data = await sanityClient.fetch(PAGE_QUERY, {
    slug: "pre-lp-1",
  });

  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);

  return {
    props: {
      seoSettings,
      data,
      siteSettings,
    },
    // revalidate: 300,
  };
}






function PreLp1({ seoSettings, data, siteSettings }) {


  const autoSchemas = generateSchema({
    data,
    globalSeo: seoSettings,
    canonical: `${meta_url}/about-clinic/`,
  });
  return (
    <>
      <MetaLayout
        seo={data?.seo}
        globalSeo={seoSettings}
        canonical={`${meta_url}/about-clinic`}
        autoSchemas={autoSchemas}
      />
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      <div className="prelander">

<header>
  <div className="wrap">
    <img className="logo-img" src="/pre-lp-1-logo.png" alt="Online Weight Loss Clinic" />
  </div>
</header>

<main>
  <div className="wrap">
    <div className="grid">
      <div>
        <h1>Your <span className="accent">weight-loss plan</span>, built around you</h1>
        <div className="eyebrow-row">
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M20 6 9 17l-5-5"/></svg>
          GPhC &amp; MHRA regulated online pharmacy
        </div>
        <p className="sub">A UK-regulated clinical assessment and personalised treatment plan, delivered online with transparent pricing from the start.</p>
      </div>

      <div className="card-wrap">
        <div className="card-glow" aria-hidden="true"></div>
        <div className="card">
          <p className="gate">To see available weight loss plans, please confirm you&apos;re over 18</p>
          <Link className="cta-btn" href="/weight-loss-treatments">
            I&apos;m 18 or over
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <p className="microcopy">Subject to online medical assessment</p>
          <Link className="contact-link" href="/contact-us">Prefer to speak to someone first? Contact our care team</Link>
        </div>
      </div>
    </div>
  </div>
</main>

<footer>
  <p className="foot-line">© 2026 Online Weight Loss Clinic · GPhC-regulated · <Link href="/terms-conditions">Terms</Link> · <Link href="/privacy-policy">Privacy</Link></p>
</footer>

</div>
      <style jsx>{`
  .prelander{
    --page-bg:#ffffff;
    --ink:#172233;
    --ink-soft:#5b6472;
    --line:rgba(23,34,51,0.1);
    --blue:#4565bf;
    --green:#3fae79;
    --card-bg:#16223a;
    --card-text:#ffffff;
    --card-text-soft:rgba(255,255,255,0.72);
    --btn-ink:#16223a;
    --focus-ring:#4565bf;
  }
  @media (prefers-color-scheme: dark){
    .prelander:not([data-theme="light"]){
      --page-bg:#0d1420;
      --ink:#eef2fa;
      --ink-soft:#aab4c8;
      --line:rgba(174,197,242,0.16);
      --card-bg:#eef2fa;
      --card-text:#101828;
      --card-text-soft:rgba(16,24,40,0.65);
    }
  }
  .prelander[data-theme="dark"]{
    --page-bg:#0d1420;
    --ink:#eef2fa;
    --ink-soft:#aab4c8;
    --line:rgba(174,197,242,0.16);
    --card-bg:#eef2fa;
    --card-text:#101828;
    --card-text-soft:rgba(16,24,40,0.65);
  }

  *{box-sizing:border-box;}
  .prelander{
    margin:0;
    min-height:100vh;
    background:var(--page-bg);
    color:var(--ink);
    font-family:"Plus Jakarta Sans",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
    -webkit-font-smoothing:antialiased;
    line-height:1.5;
    display:flex;
    flex-direction:column;
  }
  .prelander :global(a){color:inherit;box-sizing:border-box;}
  h1{margin:0;font-weight:800;text-wrap:balance;}
  p{margin:0;}

  .wrap{max-width:980px;margin:0 auto;padding:0 24px;width:100%;}

  header{padding:28px 0;}
  .logo-img{height:56px;width:auto;display:block;}

  main{flex:1;display:flex;align-items:center;padding:24px 0 56px;}

  .grid{
    display:grid;
    grid-template-columns:1.15fr 0.85fr;
    gap:48px;
    align-items:center;
  }

  .eyebrow-row{
    display:flex;align-items:center;gap:8px;
    margin:18px 0 20px;
    font-size:0.86rem;font-weight:600;color:var(--ink-soft);
  }
  .eyebrow-row svg{width:16px;height:16px;flex:none;color:var(--green);}

  h1{
    font-size:clamp(2rem,4.2vw,2.7rem);
    color:var(--ink);
    letter-spacing:-0.015em;
    line-height:1.12;
  }
  h1 .accent{color:var(--blue);}

  .sub{
    font-size:1.02rem;
    color:var(--ink-soft);
    max-width:46ch;
    margin-top:20px;
  }

  .card-wrap{
    position:relative;
    isolation:isolate;
  }
  .card-glow{
    position:absolute;
    inset:-28px;
    z-index:-1;
    background:
      radial-gradient(closest-side, rgba(69,101,191,0.28), transparent 70%) 15% 20% / 65% 65% no-repeat,
      radial-gradient(closest-side, rgba(63,174,121,0.24), transparent 70%) 85% 80% / 65% 65% no-repeat;
    filter:blur(28px);
  }
  .card{
    background:var(--card-bg);
    border-radius:24px;
    padding:38px 34px;
    text-align:center;
    position:relative;
    border:1px solid rgba(255,255,255,0.06);
    box-shadow:
      0 2px 0 rgba(255,255,255,0.04) inset,
      0 30px 60px -20px rgba(20,30,55,0.45),
      0 12px 28px -14px rgba(69,101,191,0.35);
  }
  .card::before{
    content:"";
    position:absolute;
    inset:0;
    border-radius:inherit;
    padding:1.5px;
    background:linear-gradient(135deg, rgba(69,101,191,0.9), rgba(63,174,121,0.9));
    -webkit-mask:linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor;
    mask-composite:exclude;
    pointer-events:none;
  }
  .gate{
    font-size:1.02rem;
    font-weight:600;
    color:var(--card-text);
    margin-bottom:22px;
    line-height:1.4;
  }
  .prelander :global(.cta-btn){
    display:inline-flex;align-items:center;gap:10px;
    background:#ffffff;
    color:var(--btn-ink);
    font-weight:700;
    font-size:1rem;
    padding:15px 26px;
    border-radius:999px;
    border:none;
    cursor:pointer;
    text-decoration:none;
    width:100%;
    justify-content:center;
    transition:transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow:0 10px 24px -12px rgba(0,0,0,0.35);
  }
  .prelander :global(.cta-btn):hover{transform:translateY(-1px);box-shadow:0 14px 28px -12px rgba(0,0,0,0.4);}
  .prelander :global(.cta-btn):focus-visible{outline:3px solid var(--focus-ring);outline-offset:3px;}
  .prelander :global(.cta-btn) svg{width:16px;height:16px;flex:none;}

  .microcopy{
    margin-top:14px;
    font-size:0.76rem;
    color:var(--card-text-soft);
  }

  .prelander :global(.contact-link){
    display:block;
    text-align:center;
    margin-top:18px;
    font-size:0.86rem;
    color:var(--ink-soft);
    text-decoration:underline;
    text-underline-offset:3px;
  }

  footer{padding:0 0 28px;text-align:center;}
  .foot-line{font-size:0.76rem;color:var(--ink-soft);}
  .foot-line :global(a){text-decoration:underline;text-underline-offset:2px;}

  @media (max-width:800px){
    .grid{grid-template-columns:1fr;gap:32px;}
    .card{text-align:center;}
  }

 .prelander { min-height: 100svh; overflow-x: clip; }
 .logo-img { max-width: 100%; object-fit: contain; object-position: left; }
 footer { padding-left: 24px; padding-right: 24px; }
 @media (max-width: 400px) { .card { padding: 32px 24px; } }
 @media (prefers-reduced-motion: reduce) { .prelander :global(.cta-btn) { transition: none; } }
`}</style>
    </>
  );
}

export default PreLp1;
