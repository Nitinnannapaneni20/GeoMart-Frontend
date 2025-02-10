/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com', 'ui-avatars.com', 'lh3.googleusercontent.com'], // Add additional domains as needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig