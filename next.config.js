/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: 'out',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  env: {
    NEXT_PUBLIC_STATIC_EXPORT: process.env.NEXT_PUBLIC_STATIC_EXPORT,
  },
  webpack: (config, { isServer }) => {
    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
  // Disable server-side features for static export
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig; 