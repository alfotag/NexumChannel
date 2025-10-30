import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'yesmagazine.it',
      },
      {
        protocol: 'https',
        hostname: '**.yesmagazine.it',
      },
    ],
  },
};

export default nextConfig;
