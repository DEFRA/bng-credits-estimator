const path = require('path')
const nunjucks = require('nunjucks')
const config = require('../config/service')
const { version } = require('../../package.json')

module.exports = {
  plugin: require('@hapi/vision'),
  options: {
    engines: {
      njk: {
        compile: (src, options) => {
          const template = nunjucks.compile(src, options.environment)
          return context => template.render(context)
        }
      }
    },
    compileOptions: {
      environment: nunjucks.configure([
        path.join(__dirname, '..', 'views'),
        'node_modules/govuk-frontend/'
      ])
    },
    path: '../views',
    relativeTo: __dirname,
    isCached: !config.isDev,
    context: {
      appVersion: version,
      assetPath: '/static',
      serviceName: config.serviceName,
      pageTitle: `${config.serviceName} - GOV.UK`
    }
  }
}
