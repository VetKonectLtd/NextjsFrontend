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
  async headers() {
    return [
      {
        source: "/:path*\.(jpg|jpeg|png|webp|avif|gif|svg|ico)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Expires",
            value: new Date(Date.now() + 31536000000).toUTCString(),
          },
        ],
      },
    ];
  },
  // experimental: {
  //   suppressHydrationWarning: true,
  // },
};

module.exports = nextConfig;
