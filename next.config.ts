import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static prerendering — all pages rendered on-demand
  // This avoids SSR hook issues during build-time prerender
  experimental: {
    ppr: false,
  },
};

export default nextConfig;
