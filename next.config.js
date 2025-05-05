/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['storage.googleapis.com', 'up.railway.app'],
  },
  // Add this server configuration to fix the 502 error
  serverRuntimeConfig: {
    hostname: '0.0.0.0',
    port: process.env.PORT || 3000,
  },
  // This experimental configuration ensures proper behavior on Railway
  experimental: {
    outputFileTracingRoot: undefined,
  }
};

module.exports = nextConfig;