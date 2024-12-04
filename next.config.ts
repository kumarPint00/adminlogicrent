// @ts-nocheck
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['via.placeholder.com'], // Add the required hostname(s) here
  },
};

export default nextConfig;
