/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/start-consultation",
        destination:
          "https://weightloss-consultation.vercel.app/start-consultation/",
      },
      {
        source: "/start-consultation/:path*",
        destination:
          "https://weightloss-consultation.vercel.app/start-consultation/:path*",
      },
    ];
  },
};

export default nextConfig;
