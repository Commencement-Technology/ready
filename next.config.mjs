/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "149917248.v2.pressablecdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "peach-junior-antelope-272.mypinata.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
      },
    ],
  },
  webpack(config, { nextRuntime }) {
    if (nextRuntime === "nodejs") {
      config.resolve.alias.canvas = false;
    }

    return config;
  },
};

export default nextConfig;
