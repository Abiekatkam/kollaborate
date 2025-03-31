import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.ufs.sh", // ✅ Allow all subdomains of ufs.sh
      },
    ],
  },
};

export default nextConfig;
