/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src", "sass", "styles")],
  },
  pageExtensions: ["page.tsx", "api.ts", "api.tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.tunapconnect.com",
      },
      {
        protocol: "https",
        hostname: "tunapconnect-api.herokuapp.com",
      },
    ],
  },
};

module.exports = nextConfig;
