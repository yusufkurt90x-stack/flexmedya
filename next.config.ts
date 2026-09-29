import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      // Admin panelinden görsel yükleyebilmek için (varsayılan 1MB)
      bodySizeLimit: "5mb",
    },
  },
};

export default nextConfig;
