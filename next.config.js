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
        DJANGO_BACKEND_URI: process.env.DJANGO_BACKEND_URI,
    },
}

module.exports = nextConfig
