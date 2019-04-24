/* eslint-disable no-unused-vars */
const winston = require('winston')
const path = require('path')
const { format } = winston
const { combine, json, label, timestamp, prettyPrint } = format

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const compose = require('lodash/fp/compose')
const merge = require('lodash/merge')

const withTypescript = require('@zeit/next-typescript')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

let composeFn = compose([withTypescript, withCSS, withSass])

const logger = winston.createLogger({
  format: combine(
    label({ label: '[next配置]' }),
    json(),
    timestamp(),
    prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'next.config.log' })
  ]
})

function resolve(dir) {
  return path.join(__dirname, dir)
}

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {}
}

module.exports = composeFn({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]'
  },
  webpack(config, options) {
    config.module.rules.forEach(rule => {
      if (String(rule.test) === String(/\.css$/)) {
        rule.use.forEach(u => {
          if (u.loader && u.loader === 'css-loader') {
            u.options.modules = false
          }
        })
      }
    })

    config.resolve.alias = merge(config.resolve.alias, {
      '@components': resolve('components'),
      '@pages': resolve('pages'),
      '@api': resolve('api'),
      '@config': resolve('config'),
      '@utils': resolve('utils'),
      '@store': resolve('store'),
      '@constant': resolve('constant'),
      '@hoc': resolve('components/hoc')
    })

    if (!options.isServer) {
      // logger.info(config)
    }

    return config
  }
})
