/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "flagcdn.com",
      "ui-avatars.com",
      "images.unsplash.com",
      "vetkonect.text.dev.vetkonect.com",
    ],
  },
  // experimental: {
  //   suppressHydrationWarning: true,
  // },
};

module.exports = nextConfig;
