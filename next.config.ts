import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Proxy para Backend (evita CORS)
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'http://localhost:3001/users/:path*'
      },
      {
        source: '/api/profiles/:path*',
        destination: 'http://localhost:3001/profiles/:path*'
      },
      {
        source: '/api/exercises/:path*',
        destination: 'http://localhost:3001/exercises/:path*'
      },
      {
        source: '/api/routines/:path*',
        destination: 'http://localhost:3001/routines/:path*'
      }
    ];
  },

  // ✅ Optimización de imágenes externas
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'ui-avatars.com' }
    ]
  }
};

export default nextConfig;
