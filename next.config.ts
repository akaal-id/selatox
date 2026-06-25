import type { NextConfig } from "next";

/**
 * PT. Selatox Bio Pharma — Next.js configuration.
 * App Router, React 19, i18n-ready.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // Enable experimental features if needed for Next 15
  experimental: {},
};

export default nextConfig;
