import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Pages with @opennextjs/cloudflare
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
