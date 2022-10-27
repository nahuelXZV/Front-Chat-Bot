/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "platform-lookaside.fbsbx.com"],
  },
}

module.exports = nextConfig
