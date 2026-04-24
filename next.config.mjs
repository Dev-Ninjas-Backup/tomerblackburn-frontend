/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
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
    ],
  },
};

export default nextConfig;
