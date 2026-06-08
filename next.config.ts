import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['dev.zapp.web.id'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.zapp.web.id',
      },
    ],
  },
};

export default nextConfig;