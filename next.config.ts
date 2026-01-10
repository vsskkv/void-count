import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Turbopack config (empty since we don't need custom configuration)
  turbopack: {},
};

export default nextConfig;
