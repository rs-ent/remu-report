// next.config.mjs
const nextConfig = {
  reactStrictMode: true,
  distDir: 'functions/.next',
  output: "standalone",
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'prod-files-secure.s3.us-west-2.amazonaws.com'
    ],
  },
};

export default nextConfig;
