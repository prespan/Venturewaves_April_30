/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // This is crucial for Railway deployment
    outputFileTracingRoot: undefined,
  },
  // This ensures the server listens on all interfaces
  server: {
    // Listen on all interfaces
    host: '0.0.0.0',
    // Use the PORT from environment or default to 3000
    port: process.env.PORT || 3000,
  },
}

module.exports = nextConfig