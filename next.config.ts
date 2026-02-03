import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
