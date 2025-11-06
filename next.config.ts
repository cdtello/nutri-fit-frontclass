import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Proxy para Backend (evita CORS)
  async rewrites() {
    return [
      {
        source: '/api/users/:path*',
        destination: 'http://34.229.144.19:3000/users/:path*'
      },
      {
        source: '/api/profiles/:path*',
        destination: 'http://34.229.144.19:3000/profiles/:path*'
      },
      {
        source: '/api/exercises/:path*',
        destination: 'http://34.229.144.19:3000/exercises/:path*'
      },
      {
        source: '/api/routines/:path*',
        destination: 'http://34.229.144.19:3000/routines/:path*'
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
