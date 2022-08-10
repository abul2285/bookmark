const withAntdLess = require('next-plugin-antd-less');

/** @type {import('next').NextConfig} */

const nextConfig = withAntdLess({
  reactStrictMode: true,
  swcMinify: true,
  lessVarsFilePath: './styles/variables.less',
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    return config;
  },
});

module.exports = nextConfig;
