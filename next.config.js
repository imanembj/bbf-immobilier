/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'img.youtube.com', 'i.ytimg.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.youtube.com',
      },
      {
        protocol: 'https',
        hostname: '**.ytimg.com',
      },
    ],
  },
  
  // Headers de sécurité (désactivé en dev pour Supabase)
  async headers() {
    // En développement, pas de CSP strict
    if (process.env.NODE_ENV === 'development') {
      return []
    }
    
    // En production, CSP avec Supabase autorisé
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.youtube.com https://youtube.com https://s.ytimg.com https://www.google.com https://kuula.co https://*.kuula.co",
              "style-src 'self' 'unsafe-inline' https://www.youtube.com https://fonts.googleapis.com",
              "img-src 'self' data: https: blob: https://i.ytimg.com https://img.youtube.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "connect-src 'self' https://www.google-analytics.com https://nxbdpjxasagdtrtntpha.supabase.co https://www.youtube.com https://youtube.com",
              "frame-src 'self' https://www.facebook.com https://www.instagram.com https://chambre-interdep-guyane-martinique.notaires.fr https://www.google.com https://maps.google.com https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://my.matterport.com https://matterport.com https://kuula.co https://*.kuula.co",
              "media-src 'self' https://www.youtube.com https://youtube.com https://*.googlevideo.com blob:",
              "child-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com",
            ].join('; ')
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
