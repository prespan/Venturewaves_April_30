/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'up.railway.app'],
  },
  output: 'standalone', // ADD THIS LINE
}

module.exports = nextConfig
