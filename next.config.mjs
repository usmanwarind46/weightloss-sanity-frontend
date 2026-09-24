/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: false,
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/start-consultation",
          destination:
            "https://weightloss-consultation.vercel.app/start-consultation",
        },
        {
          source: "/start-consultation/:path*",
          destination:
            "https://weightloss-consultation.vercel.app/start-consultation/:path*",
        },
      ],
    };
  },

  async redirects() {
    return [
      { source: "/mounjaro/", destination: "/weight-loss-treatments/mounjaro/", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/guide/retatrutide-pens-starting-dose-insights-from-clinical-trials-uk", destination: "/weight-loss-treatments", permanent: true },
      { source: "/guide/wegovy-72mg-everything-you-need-to-know-about-the-new-dose", destination: "/guide/wegovy-7-2mg-everything-you-need-to-know-about-the-new-dose", permanent: true },
      { source: "/guide/retatrutide-side-effects-common-rare-long-term-risks", destination: "/weight-loss-treatments", permanent: true },
      { source: "/guide/how-to-take-retatrutide-injections-safely", destination: "/weight-loss-treatments", permanent: true },
      { source: "/guide/retatrutide-with-cjc-1295-and-ipamorelin", destination: "/weight-loss-treatments", permanent: true },
      { source: "/guide/retatrutide-pros-cons-effectiveness-safety", destination: "/weight-loss-treatments", permanent: true },
      { source: "/guide/what-is-retatrutide-uses-benefits-side-effects-guide-2026", destination: "/weight-loss-treatments", permanent: true },
    ];
  },
};

export default nextConfig;
