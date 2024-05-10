const dotenv = require("dotenv")

dotenv.config({
  path: ".env",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })

    return config
  },
  env: {
    BACKEND_BASE_URI: process.env.BACKEND_BASE_URI,
  },
}

module.exports = nextConfig
