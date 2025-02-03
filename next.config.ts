import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com', 'ui-avatars.com', 'lh3.googleusercontent.com'], // Add additional domains as needed
  },
};

export default nextConfig;
