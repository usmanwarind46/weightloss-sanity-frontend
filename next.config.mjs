/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  async redirects() {
    return [
      {
        source: "/start-consultation/:path*",
        destination:
          "https://weightloss-consultation.vercel.app/start-consultation/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
