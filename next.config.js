/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Disable image optimization for static export
  images: {
    unoptimized: true
  },

  // Set base path for GitHub Pages (will be /michaelplant.com)
  // Remove or modify this based on your actual repo name
  basePath: process.env.NODE_ENV === 'production' ? '' : '',

  // Ensure trailing slash for GitHub Pages compatibility
  trailingSlash: true,

  // Disable server-side features for pure static export
  experimental: {
    // This ensures all pages are statically generated
    isrMemoryCacheSize: 0,
  }
}

module.exports = nextConfig