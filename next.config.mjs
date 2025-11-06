/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fetchCache: true
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "spotcaredev.blob.core.windows.net",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
