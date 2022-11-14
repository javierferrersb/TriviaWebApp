/** @type {import('next').NextConfig} */

const prod = process.env.NODE_ENV === "production";

const withPWA = require("next-pwa")({
    dest: "public",
    disable: prod ? false : true,
});

const nextConfig = withPWA({
    reactStrictMode: true,
    swcMinify: true,
});

module.exports = nextConfig;
