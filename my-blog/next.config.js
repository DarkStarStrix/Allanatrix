/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['react-quill'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
