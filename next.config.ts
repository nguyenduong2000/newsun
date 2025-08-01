import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dienmaynewsun.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '160.191.87.31',
        port: '9000',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
