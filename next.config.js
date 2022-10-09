// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    ...i18n,
    localeDetection: false,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
