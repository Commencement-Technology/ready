/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "149917248.v2.pressablecdn.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
