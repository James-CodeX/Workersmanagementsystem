/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb'
        }
    },
    // Optimize for production
    productionBrowserSourceMaps: false,
    compress: true,
    poweredByHeader: false,
    // Reduce function size for Vercel
    swcMinify: true,
};

module.exports = nextConfig;
