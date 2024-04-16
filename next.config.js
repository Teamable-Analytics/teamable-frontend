const dotenv = require('dotenv')

dotenv.config({
    path: '.env'
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
        BACKEND_URL: process.env.BACKEND_URL,
    },
}

module.exports = nextConfig
