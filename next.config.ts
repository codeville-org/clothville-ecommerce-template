import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Remote hosts allowed for next/image. The optional Unsplash demo set
    // (NEXT_PUBLIC_USE_UNSPLASH_DEMO=true) is served from images.unsplash.com.
    // Add your own production image host(s) here.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
