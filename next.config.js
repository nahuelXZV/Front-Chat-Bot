/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ["images.unsplash.com", "picsum.photos", "platform-lookaside.fbsbx.com", "graph.facebook.com", "th.bing.com", 'www.laespanolaaceites.com','placeralplato.com'],
  },
}

module.exports = nextConfig
