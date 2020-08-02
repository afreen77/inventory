// @ts-ignore
const withPlugins = require('next-compose-plugins')

const dev = process.env.NODE_ENV !== 'production'

if (dev) {
  console.log('Dev mode')
}

module.exports = withPlugins([], {
  poweredByHeader: false,
  dir: `${__dirname}/src`,
  distDir: dev ? '.next' : './dist',
  webpack: (config, { _dev, _isServer }) => {
    // Fixes npm packages that depend on `fs`, `dns` etc
    config.node = {
      fs: 'empty'
    }

    return config
  }
})
