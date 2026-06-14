import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hqsdmfmiawyxynyciwrx.supabase.co',
      },
    ],
  },
};

export default nextConfig;
