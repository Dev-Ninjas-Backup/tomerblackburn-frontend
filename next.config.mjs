/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tomerblackburn-backend.saikat.com.bd",
      },
      {
        protocol: "https",
        hostname: "floridayt.s3.eu-north-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "api.bburnbuilders.com",
      },
    ],
  },
};

export default nextConfig;
