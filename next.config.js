/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optimized for Netlify deployment
  trailingSlash: true,
  images: {
    // Netlify handles image optimization
    unoptimized: false,
    domains: ['avidityid.com'],
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_NETLIFY_DEPLOY: process.env.NETLIFY ? 'true' : 'false',
  },
  // Custom headers for security and caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  // Experimental features for better performance
  experimental: {},
};

module.exports = nextConfig; 