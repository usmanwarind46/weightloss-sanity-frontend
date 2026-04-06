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
        source: "/consultation",
        destination: "https://weightloss-consultation.vercel.app/consultation",
      },
      {
        source: "/consultation/:path*",
        destination:
          "https://weightloss-consultation.vercel.app/consultation/:path*",
      },
    ];
  },
};

export default nextConfig;
