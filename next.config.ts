import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "icons.llama.fi",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
 