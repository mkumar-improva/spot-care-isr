/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Enable/ensure tag-based revalidation and fetch caching behavior
    fetchCache: true
  },
  reactStrictMode: true,
  // Allow images from common CDN domains if needed later
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' }
    ]
  }
};

export default nextConfig;

