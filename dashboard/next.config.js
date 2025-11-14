// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use remotePatterns for modern Next.js image configuration
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
};

module.exports = nextConfig; 
// next.config.js (The final configuration)
// next.config.js (The final configuration)
