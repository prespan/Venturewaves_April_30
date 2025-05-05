/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // Required for Railway Node deployments
  images: {
    domains: ['storage.googleapis.com', 'up.railway.app'], // Add any other domains if needed
  },
  experimental: {
    serverActions: true, // Optional: for Next.js experimental features
  },
};

module.exports = nextConfig;
