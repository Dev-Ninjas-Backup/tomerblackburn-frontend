import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tomerblackburn-backend.saikat.com.bd",
      },
    ],
  },
};

export default nextConfig;
